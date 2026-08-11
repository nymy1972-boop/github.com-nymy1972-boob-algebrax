'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Gem, Trophy, X } from 'lucide-react';
import Link from 'next/link';
import { Diagnostico, PREGUNTAS } from '@/components/onboarding/Diagnostico';
import { CelebrationOverlay } from '@/components/onboarding/CelebrationOverlay';
import { GEMAS_POR_ACIERTO, guardarGrado, guardarNombre } from '@/lib/progress';

type Fase = 'nombre' | 'grado' | 'dolor' | 'diagnostico' | 'celebracion' | 'plan';

const GRADOS = ['7° y 8°', '9° y 10°', '11° / último año', 'Ya salí del colegio'];

const DOLORES = [
  'Quedarme en blanco en el examen',
  'No entender los pasos, solo copiarlos',
  'Que se rían si pregunto en clase',
  'No tener tiempo para estudiar',
];

const TOTAL_PASOS = 3 + PREGUNTAS.length; // nombre + grado + dolor + 3 preguntas

export default function OnboardingPage() {
  const router = useRouter();
  const [fase, setFase] = useState<Fase>('nombre');
  const [nombre, setNombre] = useState('');
  const [grado, setGrado] = useState<string | null>(null);
  const [dolores, setDolores] = useState<string[]>([]);
  const [diagStep, setDiagStep] = useState(0);
  const [temaDebil, setTemaDebil] = useState<string | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const [gemas, setGemas] = useState(0);

  const pasoActual =
    fase === 'nombre'
      ? 0
      : fase === 'grado'
        ? 1
        : fase === 'dolor'
          ? 2
          : fase === 'diagnostico'
            ? 3 + diagStep
            : TOTAL_PASOS;
  const progreso = Math.min(100, Math.round((pasoActual / TOTAL_PASOS) * 100));

  function confirmarNombre(e: React.FormEvent) {
    e.preventDefault();
    const limpio = nombre.trim();
    if (!limpio) return;
    guardarNombre(limpio);
    setFase('grado');
  }

  function elegirGrado(g: string) {
    setGrado(g);
    guardarGrado(g);
    setFase('dolor');
  }

  function toggleDolor(d: string) {
    setDolores((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]));
  }

  function confirmarDolores() {
    if (dolores.length === 0) return;
    setFase('diagnostico');
  }

  /** Control y libertad (Nielsen): siempre hay un paso atrás, en TODAS las fases. */
  function volver() {
    if (fase === 'grado') setFase('nombre');
    else if (fase === 'dolor') setFase('grado');
    else if (fase === 'diagnostico') {
      if (diagStep > 0) setDiagStep((s) => s - 1);
      else setFase('dolor');
    }
  }

  function handleAnswer(correct: boolean, tema: string) {
    if (correct) {
      setAciertos((n) => n + 1);
      setGemas((g) => g + GEMAS_POR_ACIERTO);
    }
    if (!correct && !temaDebil) setTemaDebil(tema);

    if (diagStep + 1 < PREGUNTAS.length) {
      setDiagStep((s) => s + 1);
    } else {
      setFase('celebracion');
    }
  }

  const reconocimiento = useMemo(() => {
    if (dolores.length === 0) return '';
    if (!temaDebil) {
      return 'Respondiste las 3 sin fallar — tienes buena base. Tu reto real está en los simulacros de examen, donde el tiempo aprieta.';
    }
    return `No es que seas malo para los números — es que nadie te mostró bien "${temaDebil}". Eso es exactamente lo que vamos a arreglar primero.`;
  }, [dolores, temaDebil]);

  const temaDelPlan = temaDebil ?? 'Simulacro de examen';

  return (
    <MotionConfig reducedMotion="user">
    <div
      className="relative min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]"
      style={{
        backgroundImage:
          'radial-gradient(480px 320px at 50% 0%, color-mix(in oklab, var(--accent-2) 8%, transparent) 0%, transparent 70%)',
      }}
    >
      {/* Barra de progreso — siempre visible, con "Paso X de Y" explícito (feedback: evita abandono por incertidumbre) */}
      <div className="sticky top-0 z-10 bg-[var(--bg)] px-5 pb-3 pt-5">
        <div className="mx-auto flex w-full max-w-[375px] items-center gap-3">
          {/* Control y libertad (Nielsen): volver un paso, o salir del onboarding — en TODAS las fases previas al plan */}
          {fase === 'grado' || fase === 'dolor' || fase === 'diagnostico' ? (
            <button
              onClick={volver}
              aria-label="Volver al paso anterior"
              className="-m-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text-secondary)]"
            >
              <ArrowLeft size={20} />
            </button>
          ) : fase !== 'plan' ? (
            <Link
              href="/"
              aria-label="Salir del onboarding"
              className="-m-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--surface)] text-[var(--text-secondary)]"
            >
              <X size={20} />
            </Link>
          ) : (
            <span className="w-11 shrink-0" />
          )}
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
            <motion.div
              className="h-full rounded-full bg-[var(--accent)]"
              animate={{ width: `${progreso}%` }}
              transition={{ type: 'spring', duration: 0.4 }}
            />
          </div>
          {fase !== 'plan' && (
            <span className="shrink-0 text-[12px] font-semibold text-[var(--text-secondary)]">
              Paso {Math.min(pasoActual + 1, TOTAL_PASOS)} de {TOTAL_PASOS}
            </span>
          )}
          {gemas > 0 && (
            <span className="flex shrink-0 items-center gap-1 text-[13px] font-bold text-[var(--accent-2)]">
              <Gem size={14} fill="currentColor" />
              {gemas}
            </span>
          )}
        </div>
      </div>

      <div className="flex min-h-[calc(100dvh-92px)] items-start justify-center pt-8 pb-6 sm:pt-12">
        <AnimatePresence mode="wait">
          {fase === 'nombre' && (
            <motion.div
              key="nombre"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="mx-auto flex w-full max-w-[375px] flex-col gap-6 px-5"
            >
              <h1 className="text-[24px] font-bold leading-tight [font-family:var(--font-display)]">
                ¿Cómo te llamas?
              </h1>
              <form onSubmit={confirmarNombre} className="flex flex-col gap-3">
                <input
                  autoFocus
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  className="h-12 w-full rounded-[var(--radius-button)] border-2 border-[var(--surface-2)] bg-[var(--surface)] px-4 text-[16px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-2)]"
                />
                <button
                  type="submit"
                  disabled={!nombre.trim()}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] active:translate-y-[2px] active:shadow-none disabled:opacity-40 [font-family:var(--font-display)]"
                >
                  Continuar
                  <ArrowRight size={18} strokeWidth={2.5} />
                </button>
              </form>
            </motion.div>
          )}

          {fase === 'grado' && (
            <motion.div
              key="grado"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="mx-auto flex w-full max-w-[375px] flex-col gap-6 px-5"
            >
              <h1 className="text-[24px] font-bold leading-tight [font-family:var(--font-display)]">
                ¿En qué grado estás?
              </h1>
              <div className="flex flex-col gap-3">
                {GRADOS.map((g) => (
                  <motion.button
                    key={g}
                    whileTap={{ scale: 0.97, y: 2 }}
                    onClick={() => elegirGrado(g)}
                    className="rounded-[var(--radius-button)] border-2 border-[var(--surface-2)] bg-[var(--surface)] px-4 py-3.5 text-left text-[16px] font-semibold shadow-[0_4px_0_0_color-mix(in_oklab,var(--surface-2)_30%,black)] hover:border-[color-mix(in_oklab,var(--accent-2)_40%,transparent)]"
                  >
                    {g}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {fase === 'dolor' && (
            <motion.div
              key="dolor"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              className="mx-auto flex w-full max-w-[375px] flex-col gap-6 px-5"
            >
              <h1 className="text-[24px] font-bold leading-tight [font-family:var(--font-display)]">
                ¿Qué te preocupa más de tu próximo examen de álgebra?
              </h1>
              <p className="-mt-4 text-[13px] text-[var(--text-secondary)]">Elige todas las que apliquen.</p>
              <div className="flex flex-col gap-3">
                {DOLORES.map((d) => {
                  const marcado = dolores.includes(d);
                  return (
                    <motion.button
                      key={d}
                      whileTap={{ scale: 0.97, y: 2 }}
                      onClick={() => toggleDolor(d)}
                      className={`flex items-center justify-between rounded-[var(--radius-button)] border-2 px-4 py-3.5 text-left text-[16px] font-semibold transition-colors ${
                        marcado
                          ? 'border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_12%,var(--surface))] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_45%,black)]'
                          : 'border-[var(--surface-2)] bg-[var(--surface)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--surface-2)_30%,black)] hover:border-[color-mix(in_oklab,var(--accent-2)_40%,transparent)]'
                      }`}
                    >
                      {d}
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[6px] border-2 ${
                          marcado ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--surface-2)]'
                        }`}
                      >
                        {marcado && <Check size={13} strokeWidth={3} className="text-[var(--bg)]" />}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
              <button
                onClick={confirmarDolores}
                disabled={dolores.length === 0}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] active:translate-y-[2px] active:shadow-none disabled:opacity-40 [font-family:var(--font-display)]"
              >
                Continuar
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </motion.div>
          )}

          {fase === 'diagnostico' && (
            <motion.div
              key={`diag-${diagStep}`}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
            >
              <Diagnostico step={diagStep} onAnswer={handleAnswer} />
            </motion.div>
          )}

          {fase === 'plan' && (
            <motion.div
              key="plan"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto flex w-full max-w-[375px] flex-col items-center gap-5 px-5 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-card)] border-2 border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_14%,var(--surface))]">
                <Trophy size={28} className="text-[var(--gold)]" />
              </div>
              <h1 className="text-[24px] font-bold leading-tight [font-family:var(--font-display)]">
                Tu plan de 10 min/día está listo
              </h1>
              <p className="text-[15px] text-[var(--text-secondary)]">
                Empezamos por <span className="font-semibold text-[var(--text-primary)]">{temaDelPlan}</span> — acertaste {aciertos} de {PREGUNTAS.length} en el diagnóstico.
                {grado && (
                  <>
                    {' '}
                    Ajustado al nivel de <span className="font-semibold text-[var(--text-primary)]">{grado}</span>.
                  </>
                )}
              </p>
              {gemas > 0 && (
                <div className="flex items-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--accent-2)_30%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_10%,var(--surface))] px-4 py-2 text-[15px] font-bold text-[var(--accent-2)]">
                  <Gem size={16} fill="currentColor" />
                  Ganaste {gemas} gemas
                </div>
              )}
              <button
                onClick={() => router.push(`/paywall${temaDebil ? `?tema=${encodeURIComponent(temaDebil)}` : ''}`)}
                className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
              >
                Ver mi plan completo
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <CelebrationOverlay
        open={fase === 'celebracion'}
        title="¡Diagnóstico completado!"
        message={reconocimiento}
        ctaLabel="Ver mi plan"
        onCta={() => setFase('plan')}
        onDismiss={() => setFase('plan')}
        intensity={2}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--gold)_18%,var(--surface))]">
          <Trophy size={30} className="text-[var(--gold)]" />
        </div>
      </CelebrationOverlay>
    </div>
    </MotionConfig>
  );
}
