'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Gem, Home, Lock, NotebookPen, Trophy, XCircle } from 'lucide-react';
import { MODULOS, type PreguntaModulo } from '@/lib/modulos';
import { CelebrationOverlay } from '@/components/onboarding/CelebrationOverlay';
import { sumarGemas, GEMAS_POR_ACIERTO } from '@/lib/progress';
import { logEvent } from '@/lib/logEvent';
import { usePlan } from '@/lib/plan';

const DURACION_SEGUNDOS = 4 * 60; // 4 min — simulacro corto, coherente con "10 min/día"

interface PreguntaExamen {
  moduloNombre: string;
  enunciado: string;
  opciones: string[];
  correctaIndex: number;
  pasoClave: string;
}

/** 2 preguntas GENERADAS al azar por módulo — banco prácticamente infinito, cada simulacro es distinto. */
function armarPreguntas(): PreguntaExamen[] {
  return MODULOS.flatMap((m) =>
    m.generarPreguntas(2).map((p: PreguntaModulo) => ({
      moduloNombre: m.nombre,
      enunciado: p.enunciado,
      opciones: p.opciones,
      correctaIndex: p.correctaIndex,
      pasoClave: p.pasoClave,
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
  const [iniciado, setIniciado] = useState(false);
  const [preguntas, setPreguntas] = useState<PreguntaExamen[]>([]);
  const [step, setStep] = useState(0);
  const [respuestas, setRespuestas] = useState<(number | null)[]>([]);
  const [segundosRestantes, setSegundosRestantes] = useState(DURACION_SEGUNDOS);
  const [terminado, setTerminado] = useState(false);
  const [seleccionado, setSeleccionado] = useState<number | null>(null);
  const gemasAsignadas = useRef(false);
  const { plan, cargando: cargandoPlan } = usePlan();

  function empezar() {
    const nuevas = armarPreguntas();
    setPreguntas(nuevas);
    setRespuestas(nuevas.map(() => null));
    setIniciado(true);
  }

  useEffect(() => {
    if (!iniciado || terminado) return;
    if (segundosRestantes <= 0) {
      setTerminado(true);
      return;
    }
    const t = window.setTimeout(() => setSegundosRestantes((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [segundosRestantes, terminado, iniciado]);

  const pregunta = preguntas[step];
  const progreso = Math.round((step / preguntas.length) * 100);
  const urgente = segundosRestantes <= 30;

  function responder(index: number) {
    if (seleccionado !== null) return;
    setSeleccionado(index);
    setRespuestas((prev) => {
      const copia = [...prev];
      copia[step] = index;
      return copia;
    });
    if (step + 1 < preguntas.length) {
      window.setTimeout(() => {
        setSeleccionado(null);
        setStep((s) => s + 1);
      }, 350);
    } else {
      window.setTimeout(() => setTerminado(true), 350);
    }
  }

  const reporte = useMemo(() => {
    const correctas = respuestas.filter((r, i) => r === preguntas[i]?.correctaIndex).length;
    const revision = preguntas.map((p, i) => ({
      ...p,
      tuRespuesta: respuestas[i],
      acertaste: respuestas[i] === p.correctaIndex,
    }));
    const temasAFallar = Array.from(new Set(revision.filter((r) => !r.acertaste).map((r) => r.moduloNombre)));
    return { correctas, total: preguntas.length, temasAFallar, revision };
  }, [respuestas, preguntas]);

  useEffect(() => {
    if (terminado && !gemasAsignadas.current) {
      gemasAsignadas.current = true;
      sumarGemas(reporte.correctas * GEMAS_POR_ACIERTO);
      logEvent('examen_completado', { correctas: reporte.correctas, total: reporte.total });
    }
  }, [terminado, reporte.correctas, reporte.total]);

  if (!cargandoPlan && plan !== 'premium') {
    return (
      <div className="mx-auto flex min-h-dvh max-w-[375px] flex-col items-center justify-center gap-6 px-5 text-center text-[var(--text-primary)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-card)] border-2 border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_14%,var(--surface))]">
          <Lock size={28} className="text-[var(--accent)]" />
        </div>
        <h1 className="text-[24px] font-bold leading-tight [font-family:var(--font-display)]">
          El Modo Examen es Premium
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Simulacros cronometrados iguales a tu examen real, ilimitados. Desbloquéalo junto con todos
          los módulos.
        </p>
        <Link
          href="/paywall?tema=Modo Examen"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
        >
          Ver planes Premium
          <ArrowRight size={18} strokeWidth={2.5} />
        </Link>
        <Link href="/app" className="text-[13px] font-semibold text-[var(--text-secondary)] underline decoration-dotted underline-offset-4">
          Volver a Inicio
        </Link>
      </div>
    );
  }

  if (!iniciado) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-[375px] flex-col items-center justify-center gap-6 px-5 text-center text-[var(--text-primary)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-card)] border-2 border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_14%,var(--surface))]">
          <Clock size={28} className="text-[var(--accent)]" />
        </div>
        <h1 className="text-[24px] font-bold leading-tight [font-family:var(--font-display)]">
          Simulacro cronometrado: {Math.round(DURACION_SEGUNDOS / 60)} minutos
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          {MODULOS.length * 2} preguntas mezcladas de tus 3 módulos. No sabrás si acertaste hasta el final — igual que en tu examen real.
        </p>
        <div className="flex items-start gap-2.5 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent-2)_30%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_8%,var(--surface))] p-3.5 text-left">
          <NotebookPen size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-[var(--accent-2)]" />
          <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">
            <span className="font-semibold text-[var(--text-primary)]">Ten papel y lápiz a la mano: </span>
            resuelve cada ejercicio en tu hoja antes de elegir la respuesta.
          </p>
        </div>
        <button
          onClick={empezar}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
        >
          Empezar simulacro
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>
      </div>
    );
  }

  if (terminado) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-[420px] flex-col items-center gap-5 px-5 pb-16 pt-10 text-center text-[var(--text-primary)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-card)] border-2 border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_14%,var(--surface))]">
          <Trophy size={28} className="text-[var(--gold)]" />
        </div>
        <h1 className="text-[24px] font-bold [font-family:var(--font-display)]">Simulacro terminado</h1>
        <p className="text-[32px] font-bold tabular-nums [font-family:var(--font-display)]">
          {reporte.correctas}/{reporte.total}
        </p>
        {reporte.correctas > 0 && (
          <div className="flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--accent-2)_30%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_10%,var(--surface))] px-4 py-2 text-[15px] font-bold text-[var(--accent-2)]">
            <Gem size={16} fill="currentColor" />
            Ganaste {reporte.correctas * GEMAS_POR_ACIERTO} gemas
          </div>
        )}
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

        {/* Revisión pregunta por pregunta — el procedimiento de CADA error, no solo el tema */}
        <div className="flex w-full flex-col gap-3 text-left">
          <p className="text-[12px] font-bold uppercase tracking-[0.06em] text-[var(--text-secondary)]">
            Revisión completa
          </p>
          {reporte.revision.map((r, i) => (
            <div
              key={i}
              className={`rounded-[var(--radius-card)] border-2 p-4 ${
                r.acertaste
                  ? 'border-[color-mix(in_oklab,var(--success)_35%,transparent)] bg-[var(--surface)]'
                  : 'border-[color-mix(in_oklab,var(--accent)_40%,transparent)] bg-[color-mix(in_oklab,var(--accent)_6%,var(--surface))]'
              }`}
            >
              <div className="mb-1 flex items-center gap-2">
                {r.acertaste ? (
                  <CheckCircle2 size={16} className="text-[var(--success)]" />
                ) : (
                  <XCircle size={16} className="text-[var(--accent)]" />
                )}
                <span className="text-[11px] font-bold uppercase tracking-[0.05em] text-[var(--text-secondary)]">
                  {r.moduloNombre}
                </span>
              </div>
              <p className="font-semibold [font-family:var(--font-display)]">{r.enunciado}</p>
              {!r.acertaste && (
                <p className="mt-1 text-[13px] text-[var(--text-secondary)]">
                  Tu respuesta: <span className="text-[var(--accent)]">{r.opciones[r.tuRespuesta ?? -1] ?? 'sin responder'}</span>
                  {' · '}Correcta: <span className="text-[var(--success)]">{r.opciones[r.correctaIndex]}</span>
                </p>
              )}
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">Procedimiento: </span>
                {r.pasoClave}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push('/app')}
          className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
        >
          <Home size={18} strokeWidth={2.5} />
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
            {pregunta.opciones.map((op, i) => {
              const estaSeleccionada = seleccionado === i;
              return (
                <motion.button
                  key={i}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => responder(i)}
                  disabled={seleccionado !== null}
                  aria-pressed={estaSeleccionada}
                  className={`rounded-[var(--radius-button)] border-2 px-4 py-3.5 text-left text-[16px] font-semibold transition-colors ${
                    estaSeleccionada
                      ? 'border-[var(--accent-2)] bg-[color-mix(in_oklab,var(--accent-2)_12%,var(--surface))]'
                      : 'border-[var(--surface-2)] bg-[var(--surface)] hover:border-[color-mix(in_oklab,var(--accent-2)_40%,transparent)]'
                  }`}
                >
                  {op}
                </motion.button>
              );
            })}
          </div>
          <p className="text-center text-[12px] text-[var(--text-secondary)]">
            Como en tu examen real: no te decimos si acertaste hasta el final.
          </p>
        </div>
      </div>
    </div>
  );
}
