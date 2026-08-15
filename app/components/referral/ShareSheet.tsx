'use client';

// Hoja de compartir: mensaje editable + copiar/WhatsApp/nativo, y al lograrlo
// cambia a un estado de "gracias" humano (nunca "Compartido correctamente.").
// Se abre DESDE ReferralPromptOverlay o ReferralCard — nunca sola.

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Check, Copy, Heart, MessageCircle, Share2, X } from 'lucide-react';
import { linkDeReferido, mensajeParaCompartir, trackReferido } from '@/lib/referral';
import { registrarReferidoCompartido } from '@/lib/progress';

export interface ShareSheetProps {
  open: boolean;
  codigo: string | null;
  variante: string | null;
  onClose: () => void;
}

function brandColors(): string[] {
  if (typeof window === 'undefined') return [];
  const styles = getComputedStyle(document.documentElement);
  return ['--accent', '--gold', '--success'].map((t) => styles.getPropertyValue(t).trim()).filter(Boolean);
}

export function ShareSheet({ open, codigo, variante, onClose }: ShareSheetProps) {
  const [mensaje, setMensaje] = useState('');
  const [fase, setFase] = useState<'compartir' | 'gracias'>('compartir');
  const [copiado, setCopiado] = useState(false);
  const puedeNativo = useRef(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    setFase('compartir');
    setCopiado(false);
    setMensaje(mensajeParaCompartir(codigo));
    puedeNativo.current = typeof navigator !== 'undefined' && typeof navigator.share === 'function';
    trackReferido('share_sheet_abierto', { variante, tieneCuenta: Boolean(codigo) });
  }, [open, codigo, variante]);

  function marcarExito(medio: string) {
    registrarReferidoCompartido();
    trackReferido('compartido', { medio, variante });
    const colors = brandColors();
    if (!reduce) {
      confetti({ particleCount: 90, spread: 65, startVelocity: 28, origin: { y: 0.5 }, colors: colors.length ? colors : undefined });
    }
    setFase('gracias');
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(mensaje);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 2000);
      marcarExito('copiar');
    } catch {
      // silencioso — el textarea sigue seleccionable a mano
    }
  }

  function porWhatsapp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`, '_blank', 'noopener,noreferrer');
    marcarExito('whatsapp');
  }

  async function compartirNativo() {
    try {
      await navigator.share({ title: 'AlgebraX', text: mensaje, url: linkDeReferido(codigo) });
      marcarExito('nativo');
    } catch {
      // el usuario canceló el share sheet nativo — no es un error
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="flex w-full max-w-[420px] flex-col gap-5 rounded-t-[24px] border border-[color-mix(in_oklab,var(--text-tertiary)_20%,transparent)] bg-[var(--surface)] p-6 pb-8 shadow-[var(--shadow-2)] sm:rounded-[var(--radius-card)] sm:pb-6"
            initial={{ y: reduce ? 0 : 40, opacity: reduce ? 1 : 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: reduce ? 0 : 20, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.45, bounce: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            {fase === 'compartir' ? (
              <>
                <div className="flex items-center justify-between">
                  <p className="text-[16px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
                    Envíaselo tal cual, o cámbialo
                  </p>
                  <button onClick={onClose} aria-label="Cerrar" className="-m-2 flex h-9 w-9 items-center justify-center text-[var(--text-secondary)]">
                    <X size={18} />
                  </button>
                </div>

                <textarea
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  rows={4}
                  className="w-full resize-none rounded-[var(--radius-card)] border-2 border-[var(--surface-2)] bg-[var(--bg)] p-3.5 text-[14px] leading-relaxed text-[var(--text-primary)] outline-none focus:border-[color-mix(in_oklab,var(--accent-2)_45%,transparent)]"
                />

                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={porWhatsapp}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] border-2 border-[var(--bg)] bg-[#25D366] text-[15px] font-bold text-[#0b1a10] shadow-[0_4px_0_0_#178a45] transition-[background-color,box-shadow] active:translate-y-[2px] active:shadow-none disabled:opacity-40 [font-family:var(--font-display)]"
                  >
                    <MessageCircle size={18} strokeWidth={2.5} />
                    Enviar por WhatsApp
                  </button>

                  <div className="flex gap-2.5">
                    <button
                      onClick={copiar}
                      className="flex h-12 flex-1 items-center justify-center gap-2 rounded-[var(--radius-button)] border-2 border-[var(--surface-2)] bg-[var(--bg)] text-[14px] font-semibold text-[var(--text-primary)] transition-colors hover:border-[color-mix(in_oklab,var(--accent-2)_40%,transparent)] disabled:opacity-40"
                    >
                      {copiado ? <Check size={16} className="text-[var(--success)]" /> : <Copy size={16} />}
                      {copiado ? 'Copiado' : 'Copiar'}
                    </button>
                    {puedeNativo.current && (
                      <button
                        onClick={compartirNativo}
                        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-[var(--radius-button)] border-2 border-[var(--surface-2)] bg-[var(--bg)] text-[14px] font-semibold text-[var(--text-primary)] transition-colors hover:border-[color-mix(in_oklab,var(--accent-2)_40%,transparent)] disabled:opacity-40"
                      >
                        <Share2 size={16} />
                        Más opciones
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: reduce ? 1 : 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-2 text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent-2)_16%,var(--surface))]">
                  <Heart size={26} className="text-[var(--accent-2)]" fill="currentColor" />
                </div>
                <h3 className="text-[18px] font-bold leading-tight text-[var(--text-primary)] [font-family:var(--font-display)]">
                  Acabas de compartir algo que puede ayudar a alguien
                </h3>
                <p className="text-[14px] leading-relaxed text-[var(--text-secondary)]">
                  Quién sabe... quizás ese mensaje sea el comienzo de que alguien deje de pensar "no soy bueno para las matemáticas".
                </p>
                <button
                  onClick={onClose}
                  className="mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[15px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] transition-transform active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
                >
                  Seguir aprendiendo
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
