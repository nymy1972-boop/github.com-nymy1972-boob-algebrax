'use client';

import { useEffect, useRef, useState } from 'react';

// El texto de repuesto (`fallback`) se muestra DE INMEDIATO — nunca hay
// spinner ni espera visible. Si DeepSeek responde a tiempo, el texto se
// reemplaza en su lugar por la explicación personalizada. Si falla, tarda
// demasiado, o la clave no está configurada, el fallback se queda tal cual:
// el estudiante nunca nota la diferencia entre "con IA" y "sin IA".

interface Params {
  enunciado: string;
  opciones: string[];
  correctaTexto: string;
  elegidaTexto: string | null;
  fallback: string;
}

export function useExplicacionIA(activo: boolean, params: Params) {
  const [texto, setTexto] = useState(params.fallback);
  const pedidoRef = useRef(false);

  useEffect(() => {
    if (!activo) {
      pedidoRef.current = false;
      return;
    }
    if (pedidoRef.current) return;
    pedidoRef.current = true;
    setTexto(params.fallback);

    const controller = new AbortController();
    fetch('/api/ia/explicar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.explicacion) setTexto(data.explicacion);
      })
      .catch(() => {
        // silencioso: el fallback ya está en pantalla
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activo]);

  return texto;
}
