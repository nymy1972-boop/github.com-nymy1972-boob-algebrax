import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

// BFF: la clave de DeepSeek vive SOLO aquí (variable de entorno de servidor,
// nunca NEXT_PUBLIC_). El cliente nunca la ve ni la toca — le pasamos el
// enunciado y recibe de vuelta un texto, nada más.
//
// Fail-safe: cualquier error (sin clave configurada, timeout, respuesta
// vacía, DeepSeek caído) devuelve 200 con el texto de repuesto (`fallback`)
// que ya trae cada ejercicio — el estudiante nunca se queda sin explicación
// ni ve un error técnico (regla dura: la app nunca bloquea al equivocarse).
//
// Auditoría 2026-08-17: esta ruta no exigía sesión (correcto — el módulo
// gratis y el adelanto de cada módulo son anónimos, así que "requiere login"
// no es la defensa que corresponde aquí) PERO tampoco tenía NINGUNA barrera:
// cualquier script fuera de la app podía llamarla directo y gastar el
// presupuesto de DeepSeek sin que nadie abriera AlgebraX. Dos capas simples,
// sin infraestructura nueva: (1) exige que el origen de la petición sea la
// propia app (bloquea scripts/curl externos — un fetch real del navegador
// siempre manda Origin), (2) límite de frecuencia por IP en memoria
// (best-effort: se reinicia si la función serverless se recicla, pero corta
// el abuso sostenido dentro de la misma instancia).

const MODEL = process.env.AI_MODEL_DEEPSEEK || 'deepseek-chat';
const TIMEOUT_MS = 8000;
const MAX_TOKENS = 150;
const LIMITE_POR_MINUTO = 20;
// Circuit-breaker de costo (48-RIGOR-DE-ENTREGA): el límite por IP es best-effort
// (en memoria, se puede esquivar rotando de IP) y el chequeo de Origin no detiene
// a un atacante deliberado (un script puede mandar cualquier Origin, esa cabecera
// solo la hace cumplir el navegador real). Este es el tope DURO global, contra la
// tabla real ai_calls — 1000 respuestas reales/día es ~20-30x el uso orgánico
// esperado en esta etapa, deja margen amplio y sigue acotando el peor caso.
const LIMITE_DIARIO_GLOBAL = 1000;

const contadorPorIp = new Map<string, { conteo: number; desde: number }>();

function origenValido(request: Request): boolean {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function dentroDelLimite(request: Request): boolean {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'desconocida';
  const ahora = Date.now();
  const entrada = contadorPorIp.get(ip);
  if (!entrada || ahora - entrada.desde > 60_000) {
    contadorPorIp.set(ip, { conteo: 1, desde: ahora });
    return true;
  }
  if (entrada.conteo >= LIMITE_POR_MINUTO) return false;
  entrada.conteo += 1;
  return true;
}

/** true si ya se alcanzó el tope diario global de respuestas reales de IA. Si la
 *  medición falla, NO bloquea (falla a favor del estudiante, no del ahorro). */
async function circuitBreakerActivo(): Promise<boolean> {
  try {
    const inicioDelDia = new Date();
    inicioDelDia.setUTCHours(0, 0, 0, 0);
    const { count, error } = await createAdminClient()
      .from('ai_calls')
      .select('id', { count: 'exact', head: true })
      .eq('exito', true)
      .gte('created_at', inicioDelDia.toISOString());
    if (error) return false;
    return (count ?? 0) >= LIMITE_DIARIO_GLOBAL;
  } catch {
    return false;
  }
}

interface BodyEsperado {
  enunciado: string;
  opciones: string[];
  correctaTexto: string;
  elegidaTexto: string | null;
  fallback: string;
}

/** Registro best-effort para medir costo/uso real de IA (DIM 6 de la auditoría) — nunca bloquea ni lanza. */
function registrarLlamadaIA(datos: {
  exito: boolean;
  fallback: boolean;
  tokensPrompt?: number;
  tokensCompletado?: number;
  duracionMs: number;
}) {
  try {
    createAdminClient()
      .from('ai_calls')
      .insert({
        ruta: 'ia/explicar',
        modelo: MODEL,
        exito: datos.exito,
        fallback: datos.fallback,
        tokens_prompt: datos.tokensPrompt ?? null,
        tokens_completado: datos.tokensCompletado ?? null,
        duracion_ms: datos.duracionMs,
      })
      .then(
        () => {},
        () => {},
      );
  } catch {
    // best-effort — nunca debe afectar la respuesta real al estudiante
  }
}

export async function POST(request: Request) {
  const inicio = Date.now();
  const body = (await request.json().catch(() => null)) as BodyEsperado | null;
  if (!body?.enunciado || !body?.correctaTexto || typeof body.fallback !== 'string') {
    return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
  }

  // Ni origen ni límite son "críticos" para el estudiante real: si algo de
  // esto bloquea, cae al mismo fallback honesto que ya usa la ruta — nunca
  // un error técnico, solo se le niega el "extra" de la IA.
  if (!origenValido(request) || !dentroDelLimite(request)) {
    registrarLlamadaIA({ exito: false, fallback: true, duracionMs: Date.now() - inicio });
    return NextResponse.json({ explicacion: body.fallback });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    registrarLlamadaIA({ exito: false, fallback: true, duracionMs: Date.now() - inicio });
    return NextResponse.json({ explicacion: body.fallback });
  }

  if (await circuitBreakerActivo()) {
    registrarLlamadaIA({ exito: false, fallback: true, duracionMs: Date.now() - inicio });
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

    registrarLlamadaIA({
      exito: true,
      fallback: false,
      tokensPrompt: data?.usage?.prompt_tokens,
      tokensCompletado: data?.usage?.completion_tokens,
      duracionMs: Date.now() - inicio,
    });
    return NextResponse.json({ explicacion });
  } catch {
    registrarLlamadaIA({ exito: false, fallback: true, duracionMs: Date.now() - inicio });
    return NextResponse.json({ explicacion: body.fallback });
  } finally {
    clearTimeout(timeout);
  }
}
