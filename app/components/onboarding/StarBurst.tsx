'use client';

// Celebración Nivel 1 (sutil) — para una acción FRECUENTE: acertar una pregunta
// del diagnóstico. NO es un hito real (eso es CelebrationOverlay); por eso es
// corta (600ms), no bloquea, y no dispara confetti de pantalla completa.
// Referencia: 11-DISENO-EMOCIONAL.md "niveles de intensidad" + 56 (jamás un
// toast genérico para lo frecuente, jamás un takeover para lo frecuente).

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Star } from 'lucide-react';

const PARTICLES = [
  { x: -34, y: -28, delay: 0, size: 14 },
  { x: 30, y: -34, delay: 0.03, size: 18 },
  { x: -16, y: -44, delay: 0.06, size: 12 },
  { x: 18, y: -18, delay: 0.02, size: 10 },
  { x: 0, y: -48, delay: 0.05, size: 16 },
];

export function StarBurst({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <AnimatePresence>
        {active &&
          PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className="absolute"
              initial={{ opacity: 0, x: 0, y: 0, scale: 0.3, rotate: 0 }}
              animate={
                reduceMotion
                  ? { opacity: [0, 1, 0] }
                  : { opacity: [0, 1, 0], x: p.x, y: p.y, scale: [0.3, 1, 0.7], rotate: 90 }
              }
              transition={{ duration: 0.6, delay: p.delay, ease: 'easeOut' }}
            >
              <Star size={p.size} fill="var(--gold, #ffb020)" color="var(--gold, #ffb020)" />
            </motion.span>
          ))}
      </AnimatePresence>
    </div>
  );
}
