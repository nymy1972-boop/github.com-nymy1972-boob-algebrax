'use client';

// Las 3 preguntas del diagnóstico exprés — la "primera victoria" de AlgebraX (ver
// ESTADO.md / Constitución del Producto). Acertar = celebración sutil (StarBurst,
// Nivel 1). Fallar NUNCA bloquea ni resta "vidas" — se explica el paso exacto y se
// sigue (regla dura de la Constitución: "la app nunca bloquea/penaliza por
// equivocarse"). El tema en el que el usuario falla alimenta el mensaje de
// reconocimiento y el plan personalizado.

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';
import { StarBurst } from './StarBurst';

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
    explicacion: 'El 8 pasa restando al otro lado: x = 15 − 8 = 7.',
  },
  {
    tema: 'Despejes con signos',
    enunciado: 'Despeja x: 3x − 4 = 11',
    opciones: ['x = 5', 'x = 2.33', 'x = 21/3', 'x = -5'],
    correctaIndex: 0,
    explicacion: 'Primero sumas 4 en ambos lados (3x = 15), luego divides entre 3.',
  },
  {
    tema: 'Factorización',
    enunciado: 'Factoriza: x² + 5x + 6',
    opciones: ['(x+2)(x+3)', '(x+1)(x+6)', '(x+5)(x+1)', '(x-2)(x-3)'],
    correctaIndex: 0,
    explicacion: 'Buscas 2 números que multiplicados den 6 y sumados den 5: son 2 y 3.',
  },
];

interface Props {
  step: number;
  onAnswer: (correct: boolean, tema: string) => void;
}

export function Diagnostico({ step, onAnswer }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showStars, setShowStars] = useState(false);
  const pregunta = PREGUNTAS[step];

  function handleSelect(index: number) {
    if (selected !== null) return;
    setSelected(index);
    const correct = index === pregunta.correctaIndex;
    if (correct) {
      setShowStars(true);
      window.setTimeout(() => {
        setSelected(null);
        setShowStars(false);
        onAnswer(true, pregunta.tema);
      }, 700);
    }
  }

  function continuar() {
    setSelected(null);
    onAnswer(false, pregunta.tema);
  }

  const isWrong = selected !== null && selected !== pregunta.correctaIndex;

  return (
    <div className="relative mx-auto flex w-full max-w-[375px] flex-col gap-6 px-5">
      <p className="text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--accent-2)]">
        {pregunta.tema}
      </p>
      <h1 className="text-[24px] font-bold leading-tight text-[var(--text-primary)] [font-family:var(--font-display)]">
        {pregunta.enunciado}
      </h1>

      <div className="relative flex flex-col gap-3">
        <div className="relative">
          <StarBurst active={showStars} />
        </div>
        {pregunta.opciones.map((op, i) => {
          const isSelected = selected === i;
          const isCorrectChoice = i === pregunta.correctaIndex;
          const showAsCorrect = selected !== null && isCorrectChoice;
          const showAsWrong = isSelected && !isCorrectChoice;
          return (
            <motion.button
              key={i}
              whileTap={{ scale: selected === null ? 0.97 : 1 }}
              onClick={() => handleSelect(i)}
              disabled={selected !== null}
              className={`flex items-center justify-between rounded-[var(--radius-button)] border-2 px-4 py-3.5 text-left text-[16px] font-semibold transition-colors ${
                showAsCorrect
                  ? 'border-[var(--success)] bg-[color-mix(in_oklab,var(--success)_14%,var(--surface))] text-[var(--text-primary)]'
                  : showAsWrong
                    ? 'border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_12%,var(--surface))] text-[var(--text-primary)]'
                    : 'border-[var(--surface-2)] bg-[var(--surface)] text-[var(--text-primary)] hover:border-[color-mix(in_oklab,var(--accent-2)_40%,transparent)]'
              }`}
            >
              <span>{op}</span>
              {showAsCorrect && <CheckCircle2 size={20} className="text-[var(--success)]" />}
              {showAsWrong && <XCircle size={20} className="text-[var(--accent)]" />}
            </motion.button>
          );
        })}
      </div>

      {isWrong && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[var(--radius-card)] bg-[var(--surface-2)] p-4 text-[14px] leading-relaxed text-[var(--text-secondary)]"
        >
          <span className="font-semibold text-[var(--text-primary)]">Así se resuelve: </span>
          {pregunta.explicacion}
          <button
            onClick={continuar}
            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent-2)] text-[15px] font-bold text-white [font-family:var(--font-display)]"
          >
            Entendido, sigamos
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </motion.div>
      )}
    </div>
  );
}
