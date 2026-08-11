'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft, Clock, Trophy } from 'lucide-react';
import { MODULOS } from '@/lib/modulos';
import { CelebrationOverlay } from '@/components/onboarding/CelebrationOverlay';

const DURACION_SEGUNDOS = 4 * 60; // 4 min — simulacro corto, coherente con "10 min/día"

interface PreguntaExamen {
  moduloNombre: string;
  enunciado: string;
  opciones: string[];
  correctaIndex: number;
}

function armarPreguntas(): PreguntaExamen[] {
  return MODULOS.flatMap((m) =>
    m.preguntas.slice(0, 2).map((p) => ({
      moduloNombre: m.nombre,
      enunciado: p.enunciado,
      opciones: p.opciones,
      correctaIndex: p.correctaIndex,
    })),
  );
}

function formatTiempo(s: number): string {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

export default function ExamenPage() {
  const router = useRouter();
  const preguntas = useMemo(() => armarPreguntas(), []);
  const [step, setStep] = useState(0);
  const [respuestas, setRespuestas] = useState<(number | null)[]>(() => preguntas.map(() => null));
  const [segundosRestantes, setSegundosRestantes] = useState(DURACION_SEGUNDOS);
  const [terminado, setTerminado] = useState(false);

  useEffect(() => {
    if (terminado) return;
    if (segundosRestantes <= 0) {
      setTerminado(true);
      return;
    }
    const t = window.setTimeout(() => setSegundosRestantes((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [segundosRestantes, terminado]);

  const pregunta = preguntas[step];
  const progreso = Math.round((step / preguntas.length) * 100);
  const urgente = segundosRestantes <= 30;

  function responder(index: number) {
    setRespuestas((prev) => {
      const copia = [...prev];
      copia[step] = index;
      return copia;
    });
    if (step + 1 < preguntas.length) {
      window.setTimeout(() => setStep((s) => s + 1), 250);
    } else {
      window.setTimeout(() => setTerminado(true), 250);
    }
  }

  const reporte = useMemo(() => {
    const correctas = respuestas.filter((r, i) => r === preguntas[i]?.correctaIndex).length;
    const temasAFallar = Array.from(
      new Set(
        preguntas
          .filter((_, i) => respuestas[i] !== preguntas[i].correctaIndex)
          .map((p) => p.moduloNombre),
      ),
    );
    return { correctas, total: preguntas.length, temasAFallar };
  }, [respuestas, preguntas]);

  if (terminado) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-[375px] flex-col items-center justify-center gap-5 px-5 text-center text-[var(--text-primary)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-card)] border-2 border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_14%,var(--surface))]">
          <Trophy size={28} className="text-[var(--gold)]" />
        </div>
        <h1 className="text-[24px] font-bold [font-family:var(--font-display)]">Simulacro terminado</h1>
        <p className="text-[32px] font-bold tabular-nums [font-family:var(--font-display)]">
          {reporte.correctas}/{reporte.total}
        </p>
        {reporte.temasAFallar.length > 0 ? (
          <div className="w-full rounded-[var(--radius-card)] bg-[var(--surface)] p-4 text-left text-[14px] text-[var(--text-secondary)]">
            <p className="mb-2 font-semibold text-[var(--text-primary)]">Repasa antes del examen real:</p>
            <ul className="flex flex-col gap-1">
              {reporte.temasAFallar.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-[14px] text-[var(--text-secondary)]">Sin errores — vas muy bien preparado.</p>
        )}
        <button
          onClick={() => router.push('/app')}
          className="mt-2 flex h-12 w-full items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
        >
          Volver al inicio
        </button>
        <CelebrationOverlay
          open={reporte.correctas === reporte.total}
          title="¡Simulacro perfecto!"
          message="Respondiste todo bien y contra el reloj. Así se va a sentir tu examen real."
          ctaLabel="Genial"
          onCta={() => {}}
          onDismiss={() => {}}
          intensity={2}
          autoDismissMs={4000}
        />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-[var(--bg)] px-5 pb-3 pt-5">
        <Link href="/app" aria-label="Volver al inicio">
          <ArrowLeft size={20} />
        </Link>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
          <motion.div
            className="h-full rounded-full bg-[var(--accent)]"
            animate={{ width: `${progreso}%` }}
            transition={{ type: 'spring', duration: 0.4 }}
          />
        </div>
        <span
          className={`flex items-center gap-1 text-[14px] font-bold tabular-nums ${urgente ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
        >
          <Clock size={14} /> {formatTiempo(segundosRestantes)}
        </span>
      </div>

      <div className="flex min-h-[75dvh] items-center justify-center py-10">
        <div className="mx-auto flex w-full max-w-[375px] flex-col gap-6 px-5">
          <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--accent-2)]">
            {pregunta.moduloNombre}
          </p>
          <h1 className="text-[24px] font-bold leading-tight [font-family:var(--font-display)]">
            {pregunta.enunciado}
          </h1>
          <div className="flex flex-col gap-3">
            {pregunta.opciones.map((op, i) => (
              <motion.button
                key={i}
                whileTap={{ scale: 0.97 }}
                onClick={() => responder(i)}
                className="rounded-[var(--radius-button)] border-2 border-[var(--surface-2)] bg-[var(--surface)] px-4 py-3.5 text-left text-[16px] font-semibold hover:border-[color-mix(in_oklab,var(--accent-2)_40%,transparent)]"
              >
                {op}
              </motion.button>
            ))}
          </div>
          <p className="text-center text-[12px] text-[var(--text-secondary)]">
            Como en tu examen real: no te decimos si acertaste hasta el final.
          </p>
        </div>
      </div>
    </div>
  );
}
