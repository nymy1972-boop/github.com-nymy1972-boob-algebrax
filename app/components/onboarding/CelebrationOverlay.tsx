'use client';

// Celebración Nivel 2/3 — para un HITO REAL: terminar el diagnóstico completo
// (la primera victoria de AlgebraX). Confetti con los colores de la marca,
// tap-to-dismiss, auto-dismiss, respeta prefers-reduced-motion.
// Adaptado del componente canónico de 56-MOMENTOS-EMOCIONALES.md a los tokens de AlgebraX.

import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

function brandColors(): string[] {
  if (typeof window === 'undefined') return [];
  const styles = getComputedStyle(document.documentElement);
  return ['--accent', '--gold', '--success']
    .map((token) => styles.getPropertyValue(token).trim())
    .filter((value) => value.length > 0);
}

export interface CelebrationOverlayProps {
  open: boolean;
  title: string;
  message: string;
  ctaLabel: string;
  onCta: () => void;
  onDismiss: () => void;
  intensity?: 1 | 2 | 3;
  autoDismissMs?: number;
  children?: ReactNode;
}

export function CelebrationOverlay({
  open,
  title,
  message,
  ctaLabel,
  onCta,
  onDismiss,
  intensity = 2,
  autoDismissMs = 8000,
  children,
}: CelebrationOverlayProps) {
  const reduceMotion = useReducedMotion();
  const firedRef = useRef(false);

  const fireConfetti = useCallback(() => {
    if (reduceMotion || firedRef.current) return;
    firedRef.current = true;
    const colors = brandColors();
    const bursts = intensity;
    for (let i = 0; i < bursts; i++) {
      window.setTimeout(() => {
        confetti({
          particleCount: 80 + intensity * 40,
          spread: 70,
          startVelocity: 32,
          origin: { x: bursts === 1 ? 0.5 : i / Math.max(bursts - 1, 1), y: 0.4 },
          colors: colors.length > 0 ? colors : undefined,
          disableForReducedMotion: true,
        });
      }, i * 250);
    }
    navigator.vibrate?.(intensity >= 2 ? [30, 40, 30] : 20);
  }, [intensity, reduceMotion]);

  useEffect(() => {
    if (!open) {
      firedRef.current = false;
      return;
    }
    const timer = window.setTimeout(onDismiss, autoDismissMs);
    return () => window.clearTimeout(timer);
  }, [open, autoDismissMs, onDismiss]);

  const spring = { type: 'spring' as const, duration: 0.5, bounce: reduceMotion ? 0 : 0.25 };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/70 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onDismiss}
        >
          <motion.div
            className="flex w-full max-w-[343px] flex-col items-center gap-4 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--gold)_30%,transparent)] bg-[var(--surface)] p-7 text-center shadow-[var(--shadow-2)]"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.95 }}
            transition={spring}
            onAnimationComplete={fireConfetti}
            onClick={(event) => event.stopPropagation()}
          >
            {children}
            <h2 className="text-[22px] font-bold leading-tight text-[var(--text-primary)] [font-family:var(--font-display)]">
              {title}
            </h2>
            <p className="text-[14px] leading-relaxed text-[var(--text-secondary)]">{message}</p>
            <button
              onClick={onCta}
              className="mt-1 flex h-12 w-full items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] px-6 text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] transition-transform active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
            >
              {ctaLabel}
            </button>
            <p aria-live="polite" className="sr-only">
              {title}. {message}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
