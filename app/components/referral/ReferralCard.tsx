'use client';

// Momento B: tarjeta compacta y permanente en Inicio — nunca un modal, así
// que no necesita cooldown propio. El "×" solo la oculta por esta sesión
// (no escribe estado), vuelve a aparecer en la próxima visita.

import { useState } from 'react';
import { motion } from 'motion/react';
import { HeartHandshake, X } from 'lucide-react';

export interface ReferralCardProps {
  onAbrir: () => void;
}

export function ReferralCard({ onAbrir }: ReferralCardProps) {
  const [oculta, setOculta] = useState(false);
  if (oculta) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-6 overflow-hidden rounded-[var(--radius-card)] border-2 border-[color-mix(in_oklab,var(--accent-2)_28%,transparent)] bg-gradient-to-br from-[color-mix(in_oklab,var(--accent-2)_10%,var(--surface))] to-[var(--surface)] p-4"
    >
      <button
        onClick={() => setOculta(true)}
        aria-label="Cerrar"
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center text-[var(--text-secondary)]"
      >
        <X size={15} />
      </button>
      <div className="flex items-start gap-3 pr-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[color-mix(in_oklab,var(--accent-2)_18%,var(--surface))]">
          <HeartHandshake size={20} className="text-[var(--accent-2)]" />
        </div>
        <div className="flex-1">
          <p className="text-[14px] font-bold leading-snug text-[var(--text-primary)] [font-family:var(--font-display)]">
            Tú ya estás aprendiendo.
          </p>
          <p className="mt-0.5 text-[13px] leading-snug text-[var(--text-secondary)]">
            ¿Conoces a alguien que todavía dice "las matemáticas no son lo mío"?
          </p>
        </div>
      </div>
      <button
        onClick={onAbrir}
        className="mt-3 flex h-10 w-full items-center justify-center gap-1.5 rounded-[var(--radius-button)] border-2 border-[color-mix(in_oklab,var(--accent-2)_35%,transparent)] bg-[var(--surface)] text-[13px] font-bold text-[var(--accent-2)] [font-family:var(--font-display)]"
      >
        Ayudar a alguien →
      </button>
    </motion.div>
  );
}
