'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { CheckCircle2, Flame, Timer } from 'lucide-react';
import { MODULOS } from '@/lib/modulos';
import { leerProgreso, registrarVisitaHoy, type ProgresoUsuario } from '@/lib/progress';
import { CelebrationOverlay } from '@/components/onboarding/CelebrationOverlay';

export default function InicioApp() {
  const [progreso, setProgreso] = useState<ProgresoUsuario | null>(null);
  const [milestone, setMilestone] = useState<number | null>(null);

  useEffect(() => {
    const { progreso: p, milestone: m } = registrarVisitaHoy();
    setProgreso(p);
    if (m) setMilestone(m);
  }, []);

  if (!progreso) return null;

  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div className="mx-auto max-w-[420px] px-5 pb-24 pt-6">
        {/* Topbar */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link
            href="/app/perfil"
            className="flex min-w-0 items-center gap-2 rounded-full border-2 border-[#14161c] bg-[var(--surface)] py-1 pl-1 pr-3 hover:border-[color-mix(in_oklab,var(--accent-2)_40%,transparent)]"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-2)] font-bold text-white [font-family:var(--font-display)]">
              {(progreso.nombre?.charAt(0) ?? 'S').toUpperCase()}
            </span>
            <span className="truncate text-[14px] font-bold [font-family:var(--font-display)]">
              {progreso.nombre ?? 'Estudiante'}
            </span>
          </Link>
          <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] bg-[var(--surface-2)] px-3 py-1.5 text-[13px] font-bold text-[var(--gold)]">
            <Flame size={14} /> {progreso.currentStreak} {progreso.currentStreak === 1 ? 'día' : 'días'}
          </div>
        </div>

        {/* Hero racha — cálido, lo primero que se mira */}
        <div className="mb-4 rounded-[var(--radius-card)] border border-[#3a2a22] bg-gradient-to-br from-[#2a1e1b] to-[var(--surface)] p-5 text-center">
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-secondary)]">
            Tu racha
          </p>
          <p className="text-[38px] font-extrabold leading-none text-[var(--gold)] [font-family:var(--font-display)]">
            {progreso.currentStreak} 🔥
          </p>
          <p className="mt-2 text-[12px] text-[var(--text-secondary)]">
            {progreso.currentStreak > 0 ? '¡No la rompas hoy!' : 'Practica hoy y arranca tu racha.'}
          </p>
        </div>

        {/* Card destacada — Modo Examen */}
        <Link href="/app/examen">
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="mb-6 flex items-center justify-between rounded-[var(--radius-card)] border-2 border-[#14161c] bg-gradient-to-br from-[var(--accent)] to-[#c93a3a] p-5 shadow-[0_4px_0_0_#8e2828]"
          >
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.06em] text-white/85">Modo examen</p>
              <p className="mt-1 text-[17px] font-bold text-white [font-family:var(--font-display)]">
                Simulacro cronometrado →
              </p>
            </div>
            <Timer size={28} className="text-white/90" />
          </motion.div>
        </Link>

        {/* Camino de módulos — todos accesibles siempre, nunca bloqueados */}
        <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.06em] text-[var(--text-secondary)]">
          Tus módulos
        </p>
        <div className="flex flex-col gap-3">
          {MODULOS.map((m) => {
            const p = progreso.modulos[m.slug];
            const completado = p ? p.completadas >= p.total : false;
            const enProgreso = p && !completado;
            return (
              <Link key={m.slug} href={`/app/practicar/${m.slug}`}>
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-4 rounded-[var(--radius-card)] border-2 p-4 ${
                    completado
                      ? 'border-[var(--success)] bg-[color-mix(in_oklab,var(--success)_10%,var(--surface))]'
                      : 'border-[var(--surface-2)] bg-[var(--surface)]'
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] border-2 border-[#14161c] ${
                      completado ? 'bg-[var(--success)]' : enProgreso ? 'bg-[var(--accent)]' : 'bg-[var(--accent-2)]'
                    }`}
                  >
                    {completado ? (
                      <CheckCircle2 size={20} className="text-[#14161c]" />
                    ) : (
                      <span className="font-bold text-white [font-family:var(--font-display)]">
                        {m.nombre.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold [font-family:var(--font-display)]">{m.nombre}</p>
                    <p className="text-[12px] text-[var(--text-secondary)]">
                      {p ? `${p.completadas}/${p.total} correctas` : m.descripcion}
                    </p>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

      <CelebrationOverlay
        open={milestone !== null}
        title={`¡${milestone} días seguidos!`}
        message="Cada día que vuelves, la lógica se queda más grabada. Sigue así."
        ctaLabel="Vamos"
        onCta={() => setMilestone(null)}
        onDismiss={() => setMilestone(null)}
        intensity={milestone && milestone >= 30 ? 3 : 2}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--gold)_18%,var(--surface))]">
          <Flame size={30} className="text-[var(--gold)]" />
        </div>
      </CelebrationOverlay>
    </div>
  );
}
