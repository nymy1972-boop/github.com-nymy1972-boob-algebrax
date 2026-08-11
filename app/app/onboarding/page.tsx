'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy } from 'lucide-react';
import { Diagnostico, PREGUNTAS } from '@/components/onboarding/Diagnostico';
import { CelebrationOverlay } from '@/components/onboarding/CelebrationOverlay';

type Fase = 'dolor' | 'diagnostico' | 'celebracion' | 'plan';

const DOLORES = [
  'Quedarme en blanco en el examen',
  'No entender los pasos, solo copiarlos',
  'Que se rían si pregunto en clase',
  'No tener tiempo para estudiar',
];

const TOTAL_PASOS = 1 + PREGUNTAS.length; // dolor + 3 preguntas

export default function OnboardingPage() {
  const router = useRouter();
  const [fase, setFase] = useState<Fase>('dolor');
  const [dolor, setDolor] = useState<string | null>(null);
  const [diagStep, setDiagStep] = useState(0);
  const [temaDebil, setTemaDebil] = useState<string | null>(null);
  const [aciertos, setAciertos] = useState(0);

  const pasoActual = fase === 'dolor' ? 0 : fase === 'diagnostico' ? 1 + diagStep : TOTAL_PASOS;
  const progreso = Math.min(100, Math.round((pasoActual / TOTAL_PASOS) * 100));

  function elegirDolor(d: string) {
    setDolor(d);
    setFase('diagnostico');
  }

  function handleAnswer(correct: boolean, tema: string) {
    if (correct) setAciertos((n) => n + 1);
    if (!correct && !temaDebil) setTemaDebil(tema);

    if (diagStep + 1 < PREGUNTAS.length) {
      setDiagStep((s) => s + 1);
    } else {
      setFase('celebracion');
    }
  }

  const reconocimiento = useMemo(() => {
    if (!dolor) return '';
    if (!temaDebil) {
      return 'Respondiste las 3 sin fallar — tienes buena base. Tu reto real está en los simulacros de examen, donde el tiempo aprieta.';
    }
    return `No es que seas malo para los números — es que nadie te mostró bien "${temaDebil}". Eso es exactamente lo que vamos a arreglar primero.`;
  }, [dolor, temaDebil]);

  const temaDelPlan = temaDebil ?? 'Simulacro de examen';

  return (
    <div className="relative min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      {/* Barra de progreso — siempre visible (regla 3 de 02B) */}
      <div className="sticky top-0 z-10 bg-[var(--bg)] px-5 pb-3 pt-5">
        <div className="mx-auto h-2 w-full max-w-[375px] overflow-hidden rounded-full bg-[var(--surface-2)]">
          <motion.div
            className="h-full rounded-full bg-[var(--accent)]"
            animate={{ width: `${progreso}%` }}
            transition={{ type: 'spring', duration: 0.4 }}
          />
        </div>
      </div>

      <div className="flex min-h-[70dvh] items-center justify-center py-10">
        <AnimatePresence mode="wait">
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
              <div className="flex flex-col gap-3">
                {DOLORES.map((d) => (
                  <motion.button
                    key={d}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => elegirDolor(d)}
                    className="rounded-[var(--radius-button)] border-2 border-[var(--surface-2)] bg-[var(--surface)] px-4 py-3.5 text-left text-[16px] font-semibold hover:border-[color-mix(in_oklab,var(--accent-2)_40%,transparent)]"
                  >
                    {d}
                  </motion.button>
                ))}
              </div>
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
              </p>
              <button
                onClick={() => router.push('/paywall')}
                className="mt-2 flex h-12 w-full items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
              >
                Ver mi plan completo
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
  );
}
