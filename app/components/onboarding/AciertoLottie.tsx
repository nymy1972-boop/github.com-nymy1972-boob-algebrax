'use client';

// Celebración Nivel 1 (frecuente): reemplaza el StarBurst con la animación
// Lottie premium del usuario para cada respuesta correcta. Se mantiene
// COMPACTA y NO bloqueante a propósito — un takeover de pantalla completa en
// cada acierto violaría "celebrar solo hitos reales" (11-DISENO-EMOCIONAL.md);
// el CelebrationOverlay de pantalla completa queda reservado para completar
// el módulo. `prefers-reduced-motion` muestra solo el frame final (estático).

import { useRef } from 'react';
import Lottie, { type LottieRefCurrentProps } from 'lottie-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import acierto from '@/public/lottie/acierto-premium.json';

// La animación original dura 3s a velocidad normal — demasiado para un
// refuerzo FRECUENTE (una pregunta correcta). 2.4x la deja en ~1.25s: se
// sigue viendo premium pero no frena el ritmo de práctica.
const VELOCIDAD = 2.4;

export function AciertoLottie({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion();
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="h-40 w-40"
          >
            {reduceMotion ? (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--success)_16%,var(--surface))]">
                <div className="h-10 w-10 rounded-full bg-[var(--success)]" />
              </div>
            ) : (
              <Lottie
                lottieRef={lottieRef}
                animationData={acierto}
                loop={false}
                autoplay
                onDOMLoaded={() => lottieRef.current?.setSpeed(VELOCIDAD)}
                className="h-full w-full"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
