'use client';

// Momentos A (tras una victoria) y C (al abrir la app, ocasional): el mensaje
// que convierte "ya me está ayudando a mí" en "conozco a alguien que
// necesita esto". Nunca "invita a tus amigos" — siempre centrado en la otra
// persona. Botón secundario discreto, nunca oculto ni difícil de encontrar.

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import type { CopyReferido } from '@/lib/referral';

export interface ReferralPromptOverlayProps {
  open: boolean;
  copy: CopyReferido;
  onCompartir: () => void;
  onDescartar: () => void;
}

export function ReferralPromptOverlay({ open, copy, onCompartir, onDescartar }: ReferralPromptOverlayProps) {
  const reduce = useReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={copy.titulo}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onDescartar}
        >
          <motion.div
            className="flex w-full max-w-[360px] flex-col items-center gap-4 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent-2)_30%,transparent)] bg-[var(--surface)] p-7 text-center shadow-[var(--shadow-2)]"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.92, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
            transition={{ type: 'spring', duration: 0.45, bounce: 0.22 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent-2)_16%,var(--surface))]">
              <Sparkles size={26} className="text-[var(--accent-2)]" />
            </div>

            {copy.contexto && (
              <p className="text-[12px] font-bold uppercase tracking-[0.06em] text-[var(--accent)]">{copy.contexto}</p>
            )}

            <h2 className="text-balance text-[20px] font-bold leading-tight text-[var(--text-primary)] [font-family:var(--font-display)]">
              {copy.titulo}
            </h2>
            <p className="text-[14px] leading-relaxed text-[var(--text-secondary)]">{copy.cuerpo}</p>

            <button
              onClick={onCompartir}
              className="mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] border-2 border-[var(--bg)] bg-[var(--accent)] px-6 text-[15px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] transition-transform active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
            >
              {copy.cta}
              <ArrowRight size={17} strokeWidth={2.5} />
            </button>
            <button
              onClick={onDescartar}
              className="text-[13px] font-semibold text-[var(--text-secondary)] underline decoration-dotted underline-offset-4"
            >
              Ahora no
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
