'use client';

// Las 3 preguntas del diagnóstico exprés — la "primera victoria" de AlgebraX (ver
// ESTADO.md / Constitución del Producto). Acertar = celebración sutil (StarBurst
// + gemas, Nivel 1). Fallar NUNCA bloquea ni resta "vidas": no hay X roja de
// error — se explica el paso exacto con tono de "casi lo tienes" y se sigue
// (regla dura de la Constitución + feedback explícito del usuario: "amabilidad
// instructiva", nada de sonido/color de error agresivo). El tema en el que el
// usuario falla alimenta el mensaje de reconocimiento y el plan personalizado.
// Los ejercicios son deliberadamente fácil→intermedio: la meta del diagnóstico
// es que el estudiante SIENTA que puede, no que se enfrente a algo difícil.

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Gem, Lightbulb, NotebookPen } from 'lucide-react';
import { StarBurst } from './StarBurst';
import { sumarGemas, GEMAS_POR_ACIERTO } from '@/lib/progress';

export interface PreguntaDiagnostico {
  tema: string;
  enunciado: string;
  opciones: string[];
  correctaIndex: number;
  explicacion: string;
}

export const PREGUNTAS: PreguntaDiagnostico[] = [
  {
    tema: 'Ecuaciones básicas',
    enunciado: 'Resuelve: x + 8 = 15',
    opciones: ['x = 7', 'x = 23', 'x = -7', 'x = 8'],
    correctaIndex: 0,
    explicacion: 'Mira lo que pasa cuando pasamos el +8 al otro lado: cambia de signo → x = 15 − 8 = 7.',
  },
  {
    tema: 'Despejes con signos',
    enunciado: 'Despeja x: 3x − 4 = 11',
    opciones: ['x = 5', 'x = 2.33', 'x = 21/3', 'x = -5'],
    correctaIndex: 0,
    explicacion: 'Mira lo que pasa cuando pasamos el −4 al otro lado: cambia de signo → 3x = 15, luego divides entre 3.',
  },
  {
    tema: 'Factorización',
    enunciado: 'Factoriza: x² + 5x + 6',
    opciones: ['(x+2)(x+3)', '(x+1)(x+6)', '(x+5)(x+1)', '(x-2)(x-3)'],
    correctaIndex: 0,
    explicacion: 'Mira cómo se arma: buscas 2 números que multiplicados den 6 y sumados den 5 → son 2 y 3.',
  },
];

interface Props {
  step: number;
  onAnswer: (correct: boolean, tema: string) => void;
}

export function Diagnostico({ step, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showStars, setShowStars] = useState(false);
  const [showGemas, setShowGemas] = useState(false);
  const pregunta = PREGUNTAS[step];

  function handleSelect(index: number) {
    if (selected !== null) return;
    setSelected(index);
    const correct = index === pregunta.correctaIndex;
    if (correct) {
      setShowStars(true);
      setShowGemas(true);
      sumarGemas(GEMAS_POR_ACIERTO);
      window.setTimeout(() => {
        setSelected(null);
        setShowStars(false);
        setShowGemas(false);
        onAnswer(true, pregunta.tema);
      }, 800);
    }
  }

  function continuar() {
    setSelected(null);
    onAnswer(false, pregunta.tema);
  }

  // Atajo de teclado 1-4: mismo criterio que el tap (bloqueado tras elegir).
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const n = Number(e.key);
      if (n >= 1 && n <= pregunta.opciones.length) handleSelect(n - 1);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, pregunta]);

  // Sentinel -1: el estudiante se traba y pide ver la respuesta en vez de
  // adivinar — cuenta como fallo (mismo camino que una opción incorrecta),
  // nunca lo deja bloqueado en la pregunta.
  function handleSkip() {
    if (selected !== null) return;
    setSelected(-1);
  }

  const isWrong = selected !== null && selected !== pregunta.correctaIndex;

  // Énfasis del titular en superficies de conversión (52-COPY): el dato clave
  // — el resultado que el ejercicio pide encontrar — se resalta en --accent.
  const partesEnunciado = pregunta.enunciado.split(' ');
  const datoClave = partesEnunciado.pop();

  return (
    <div className="relative mx-auto flex w-full max-w-[375px] flex-col gap-6 px-5">
      <div className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--text-secondary)_22%,transparent)] bg-[var(--surface-2)] p-5 shadow-[inset_0_3px_14px_rgba(0,0,0,0.55)]">
      <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--accent-2)]">
        {pregunta.tema}
      </p>
      <div className="mt-3 h-px w-10 bg-gradient-to-r from-[var(--accent-2)] to-transparent" />
      <h1 className="mt-3 text-[24px] font-bold leading-tight text-[var(--text-primary)] [font-family:var(--font-display)]">
        {partesEnunciado.join(' ')} <span className="text-[var(--accent)]">{datoClave}</span>
      </h1>

      <div className="relative mt-5 flex flex-col gap-3">
        <div className="relative">
          <StarBurst active={showStars} />
          <AnimatePresence>
            {showGemas && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.8 }}
                animate={{ opacity: 1, y: -18, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="pointer-events-none absolute left-1/2 top-0 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--accent-2)_20%,var(--surface))] px-3 py-1 text-[13px] font-bold text-[var(--accent-2)]"
              >
                <Gem size={14} fill="currentColor" />+{GEMAS_POR_ACIERTO}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {pregunta.opciones.map((op, i) => {
          const isSelected = selected === i;
          const isCorrectChoice = i === pregunta.correctaIndex;
          const showAsCorrect = selected !== null && isCorrectChoice;
          const showAsWrong = isSelected && !isCorrectChoice;
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.25 }}
              whileTap={{ scale: selected === null ? 0.97 : 1, y: selected === null ? 2 : 0 }}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`flex items-center gap-3 rounded-[var(--radius-button)] border-2 px-4 py-3.5 text-left text-[16px] font-semibold shadow-[0_4px_0_0_color-mix(in_oklab,var(--surface-2)_30%,black)] transition-colors ${
                showAsCorrect
                  ? 'border-[var(--success)] bg-[color-mix(in_oklab,var(--success)_14%,var(--surface))] text-[var(--text-primary)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--success)_45%,black)]'
                  : showAsWrong
                    ? 'border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_12%,var(--surface))] text-[var(--text-primary)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--gold)_45%,black)]'
                    : 'border-[var(--surface-2)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[color-mix(in_oklab,var(--accent-2)_40%,transparent)]'
              }`}
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-[8px] border text-[12px] font-bold ${
                  showAsWrong
                    ? 'border-[var(--gold)] bg-[var(--gold)] text-[var(--bg)]'
                    : 'border-[color-mix(in_oklab,var(--accent-2)_40%,transparent)] bg-transparent text-[var(--accent-2)]'
                }`}
              >
                {i + 1}
              </span>
              <span className="flex-1">{op}</span>
              {showAsCorrect && <CheckCircle2 size={20} className="shrink-0 text-[var(--success)]" />}
              {showAsWrong && <Lightbulb size={20} className="shrink-0 text-[var(--gold)]" />}
            </motion.button>
          );
        })}
      </div>
      </div>

      <div aria-live="polite">
        {!isWrong && (
          <div className="flex items-start gap-2.5 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent-2)_25%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_7%,var(--surface))] p-3.5">
            <NotebookPen size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-[var(--accent-2)]" />
            <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--text-primary)]">Consejo: </span>
              resuélvelo en una hoja antes de elegir — así practicas como en el examen real.
            </p>
          </div>
        )}

        {isWrong && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--gold)_25%,transparent)] bg-[var(--surface-2)] p-4 text-[14px] leading-relaxed text-[var(--text-secondary)]"
          >
            <span className="font-semibold text-[var(--text-primary)]">¡Casi! </span>
            {pregunta.explicacion}
            <button
              onClick={continuar}
              className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[15px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] transition-transform active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
            >
              Entendido, sigamos
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
          </motion.div>
        )}
      </div>

      {selected === null && (
        <button
          onClick={handleSkip}
          className="self-center text-[13px] font-semibold text-[var(--text-secondary)] underline decoration-dotted underline-offset-4"
        >
          No lo sé, sigamos
        </button>
      )}
    </div>
  );
}
