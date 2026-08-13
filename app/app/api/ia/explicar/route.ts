import { NextResponse } from 'next/server';

// BFF: la clave de DeepSeek vive SOLO aquí (variable de entorno de servidor,
// nunca NEXT_PUBLIC_). El cliente nunca la ve ni la toca — le pasamos el
// enunciado y recibe de vuelta un texto, nada más.
//
// Fail-safe: cualquier error (sin clave configurada, timeout, respuesta
// vacía, DeepSeek caído) devuelve 200 con el texto de repuesto (`fallback`)
// que ya trae cada ejercicio — el estudiante nunca se queda sin explicación
// ni ve un error técnico (regla dura: la app nunca bloquea al equivocarse).

const MODEL = process.env.AI_MODEL_DEEPSEEK || 'deepseek-chat';
const TIMEOUT_MS = 8000;
const MAX_TOKENS = 150;

interface BodyEsperado {
  enunciado: string;
  opciones: string[];
  correctaTexto: string;
  elegidaTexto: string | null;
  fallback: string;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as BodyEsperado | null;
  if (!body?.enunciado || !body?.correctaTexto || typeof body.fallback !== 'string') {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ explicacion: body.fallback });
  }

  const prompt = body.elegidaTexto
    ? `Ejercicio: "${body.enunciado}". Opciones: ${body.opciones?.join(', ')}. Respuesta correcta: "${body.correctaTexto}". El estudiante eligió "${body.elegidaTexto}", que es incorrecta.`
    : `Ejercicio: "${body.enunciado}". Opciones: ${body.opciones?.join(', ')}. Respuesta correcta: "${body.correctaTexto}". El estudiante no supo responder y pidió ver la explicación.`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        temperature: 0.5,
        messages: [
          {
            role: 'system',
            content:
              'Eres un tutor de álgebra para estudiantes de secundaria/bachillerato en LATAM (16 años). Explica en español latino neutro, tono cercano e instructivo, NUNCA condescendiente ni con lenguaje infantil, en menos de 45 palabras, el paso exacto donde se equivocó el estudiante — sin repetir el enunciado completo ni saludar. Ve directo al paso clave.',
          },
          { role: 'user', content: prompt },
        ],
      }),
      signal: controller.signal,
    });

    if (!res.ok) throw new Error(`DeepSeek respondió ${res.status}`);

    const data = await res.json();
    const explicacion: string | undefined = data?.choices?.[0]?.message?.content?.trim();
    if (!explicacion) throw new Error('Respuesta vacía');

    return NextResponse.json({ explicacion });
  } catch {
    return NextResponse.json({ explicacion: body.fallback });
  } finally {
    clearTimeout(timeout);
  }
}
