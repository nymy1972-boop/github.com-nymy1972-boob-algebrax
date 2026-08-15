'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Check, CheckCircle2, Flame, Gem, Lock, Timer } from 'lucide-react';
import { MODULOS } from '@/lib/modulos';
import { ejerciciosGratisHoy, registrarVisitaHoy, sincronizarAlAbrir, type ProgresoUsuario } from '@/lib/progress';
import { LIMITE_DIARIO_GRATIS, MODULO_GRATIS_SLUG, usePlan } from '@/lib/plan';
import { CelebrationOverlay } from '@/components/onboarding/CelebrationOverlay';

const INICIALES_DIA = ['L', 'M', 'X', 'J', 'V', 'S', 'D']; // semana empieza lunes

function fechaLocal(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Deriva qué días de ESTA semana (lun-dom) cayeron dentro de la racha actual.
 * No requiere guardar historial: la racha es consecutiva por definición, así
 * que basta contar hacia atrás desde `lastActiveOn`. TODO Sesión 6: cuando
 * exista `user_progress` en Supabase, reemplazar por el historial real.
 */
function calcularSemana(progreso: ProgresoUsuario) {
  const hoy = new Date();
  const diaSemanaHoy = (hoy.getDay() + 6) % 7; // 0 = lunes
  const lunes = new Date(hoy);
  lunes.setDate(hoy.getDate() - diaSemanaHoy);

  const rachaFechas = new Set<string>();
  if (progreso.lastActiveOn) {
    const fin = new Date(progreso.lastActiveOn);
    for (let i = 0; i < progreso.currentStreak; i++) {
      const d = new Date(fin);
      d.setDate(fin.getDate() - i);
      rachaFechas.add(fechaLocal(d));
    }
  }

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(lunes);
    d.setDate(lunes.getDate() + i);
    const clave = fechaLocal(d);
    return {
      inicial: INICIALES_DIA[i],
      completado: rachaFechas.has(clave),
      esHoy: clave === fechaLocal(hoy),
      esFuturo: d > hoy,
    };
  });
}

export default function InicioApp() {
  const [progreso, setProgreso] = useState<ProgresoUsuario | null>(null);
  const [milestone, setMilestone] = useState<number | null>(null);
  const { plan } = usePlan();

  useEffect(() => {
    (async () => {
      await sincronizarAlAbrir();
      const { progreso: p, milestone: m } = registrarVisitaHoy();
      setProgreso(p);
      if (m) setMilestone(m);
    })();
  }, []);

  if (!progreso) return null;

  const semana = calcularSemana(progreso);

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
          <div className="flex shrink-0 items-center gap-2">
            {progreso.gemas > 0 && (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_oklab,var(--accent-2)_35%,transparent)] bg-[var(--surface-2)] px-3 py-1.5 text-[13px] font-bold text-[var(--accent-2)]">
                <Gem size={14} fill="currentColor" /> {progreso.gemas}
              </div>
            )}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[color-mix(in_oklab,var(--gold)_35%,transparent)] bg-[var(--surface-2)] px-3 py-1.5 text-[13px] font-bold text-[var(--gold)]">
              <Flame size={14} /> {progreso.currentStreak} {progreso.currentStreak === 1 ? 'día' : 'días'}
            </div>
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

          {/* Calendario semanal — visualiza el patrón, no solo el número */}
          <div className="mt-4 flex justify-between gap-1.5">
            {semana.map((d, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-[10px] font-semibold text-[var(--text-secondary)]">{d.inicial}</span>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    d.completado
                      ? 'border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_22%,var(--surface))]'
                      : d.esHoy
                        ? 'border-[color-mix(in_oklab,var(--accent)_55%,transparent)] bg-transparent'
                        : d.esFuturo
                          ? 'border-[var(--surface-2)] bg-transparent'
                          : 'border-[var(--surface-2)] bg-[var(--surface-2)]'
                  }`}
                >
                  {d.completado && <Check size={14} strokeWidth={3} className="text-[var(--gold)]" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card destacada — Modo Examen (Premium) */}
        <Link href={plan === 'premium' ? '/app/examen' : '/paywall?tema=Modo Examen'}>
          <motion.div
            whileTap={{ scale: 0.98 }}
            className="mb-6 flex items-center justify-between rounded-[var(--radius-card)] border-2 border-[#14161c] bg-gradient-to-br from-[var(--accent)] to-[#c93a3a] p-5 shadow-[0_4px_0_0_#8e2828]"
          >
            <div>
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-white/85">
                Modo examen {plan !== 'premium' && <Lock size={11} />}
              </p>
              <p className="mt-1 text-[17px] font-bold text-white [font-family:var(--font-display)]">
                {plan === 'premium' ? 'Simulacro cronometrado →' : 'Desbloquea el simulacro →'}
              </p>
            </div>
            <Timer size={28} className="text-white/90" />
          </motion.div>
        </Link>

        {/* Camino de módulos — el básico es gratis; el resto pide Premium (candado visible, nunca oculto) */}
        <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.06em] text-[var(--text-secondary)]">
          Tus módulos
        </p>
        <div className="flex flex-col gap-3">
          {MODULOS.map((m) => {
            const p = progreso.modulos[m.slug];
            const completado = p ? p.completadas >= p.total : false;
            const enProgreso = p && !completado;
            const esGratis = m.slug === MODULO_GRATIS_SLUG;
            const bloqueado = plan !== 'premium' && !esGratis;
            const restantesGratis = esGratis && plan !== 'premium' ? Math.max(0, LIMITE_DIARIO_GRATIS - ejerciciosGratisHoy(progreso)) : null;
            return (
              <Link key={m.slug} href={bloqueado ? `/paywall?tema=${encodeURIComponent(m.nombre)}` : `/app/practicar/${m.slug}`}>
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
                    ) : bloqueado ? (
                      <Lock size={18} className="text-white" />
                    ) : (
                      <span className="font-bold text-white [font-family:var(--font-display)]">
                        {m.nombre.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold [font-family:var(--font-display)]">{m.nombre}</p>
                    <p className="text-[12px] text-[var(--text-secondary)]">
                      {bloqueado
                        ? 'Desbloquea con Premium'
                        : restantesGratis !== null
                          ? `${restantesGratis} ejercicios gratis hoy`
                          : p
                            ? `${p.completadas}/${p.total} correctas`
                            : m.descripcion}
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
