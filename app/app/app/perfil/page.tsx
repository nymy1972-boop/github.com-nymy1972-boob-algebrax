'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Award, CalendarDays, Cloud, Flame, Gem, ListChecks, LogOut, Sparkles, Target } from 'lucide-react';
import { MODULOS } from '@/lib/modulos';
import {
  cerrarSesionLocal,
  diasDesdeCreacion,
  guardarMetaSemanal,
  hayCuentaReal,
  sincronizarAlAbrir,
  type ProgresoUsuario,
} from '@/lib/progress';

export default function PerfilPage() {
  const router = useRouter();
  const [progreso, setProgreso] = useState<ProgresoUsuario | null>(null);
  const [editandoMeta, setEditandoMeta] = useState(false);
  const [sincronizado, setSincronizado] = useState(false);

  useEffect(() => {
    sincronizarAlAbrir().then(setProgreso);
    hayCuentaReal().then(setSincronizado);
  }, []);

  if (!progreso) return null;

  function salir() {
    cerrarSesionLocal();
    router.push('/');
  }

  function cambiarMeta(delta: number) {
    if (!progreso) return;
    setProgreso(guardarMetaSemanal(progreso.metaSemanal + delta));
  }

  const dias = diasDesdeCreacion(progreso);
  const metaProgreso = Math.min(100, Math.round((progreso.ejerciciosSemana / progreso.metaSemanal) * 100));

  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div className="mx-auto max-w-[420px] px-5 pb-16 pt-6">
        <Link href="/app" className="mb-6 flex items-center gap-1.5 text-[14px] font-semibold text-[var(--text-secondary)]">
          <ArrowLeft size={16} /> Volver
        </Link>

        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--accent-2)] text-[26px] font-bold text-white [font-family:var(--font-display)]">
            {(progreso.nombre?.charAt(0) ?? 'S').toUpperCase()}
          </span>
          <h1 className="text-[22px] font-bold [font-family:var(--font-display)]">{progreso.nombre ?? 'Estudiante'}</h1>
          {progreso.grado && <p className="text-[13px] text-[var(--text-secondary)]">{progreso.grado}</p>}
          <span className="rounded-full border border-[var(--surface-2)] bg-[var(--surface)] px-3 py-1 text-[12px] font-semibold text-[var(--text-secondary)]">
            Plan Free
          </span>
          {dias > 0 && (
            <p className="flex items-center gap-1 text-[12px] text-[var(--text-secondary)]">
              <CalendarDays size={13} /> Llevas {dias} {dias === 1 ? 'día' : 'días'} con AlgebraX
            </p>
          )}
        </div>

        <div className="mb-3 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[#3a2a22] bg-gradient-to-br from-[#2a1e1b] to-[var(--surface)] p-4">
            <Flame size={24} className="text-[var(--gold)]" />
            <div>
              <p className="text-[18px] font-extrabold leading-none text-[var(--gold)] [font-family:var(--font-display)]">
                {progreso.currentStreak}
              </p>
              <p className="mt-1 text-[11px] text-[var(--text-secondary)]">{progreso.currentStreak === 1 ? 'día' : 'días'} de racha</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent-2)_30%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_8%,var(--surface))] p-4">
            <Gem size={24} className="text-[var(--accent-2)]" fill="currentColor" />
            <div>
              <p className="text-[18px] font-extrabold leading-none text-[var(--accent-2)] [font-family:var(--font-display)]">
                {progreso.gemas}
              </p>
              <p className="mt-1 text-[11px] text-[var(--text-secondary)]">gemas ganadas</p>
            </div>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 rounded-[var(--radius-card)] border-2 border-[var(--surface-2)] bg-[var(--surface)] p-4">
            <Award size={22} className="text-[var(--text-secondary)]" />
            <div>
              <p className="text-[16px] font-extrabold leading-none text-[var(--text-primary)] [font-family:var(--font-display)]">
                {progreso.mejorRacha}
              </p>
              <p className="mt-1 text-[11px] text-[var(--text-secondary)]">récord de racha</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-[var(--radius-card)] border-2 border-[var(--surface-2)] bg-[var(--surface)] p-4">
            <ListChecks size={22} className="text-[var(--text-secondary)]" />
            <div>
              <p className="text-[16px] font-extrabold leading-none text-[var(--text-primary)] [font-family:var(--font-display)]">
                {progreso.totalEjercicios}
              </p>
              <p className="mt-1 text-[11px] text-[var(--text-secondary)]">ejercicios resueltos en total</p>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-[var(--radius-card)] border-2 border-[var(--surface-2)] bg-[var(--surface)] p-4">
          <div className="mb-2 flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.06em] text-[var(--text-secondary)]">
              <Target size={14} /> Tu desafío de la semana
            </p>
            <button
              onClick={() => setEditandoMeta((v) => !v)}
              className="text-[11px] font-semibold text-[var(--accent-2)] underline decoration-dotted underline-offset-4"
            >
              {editandoMeta ? 'Listo' : 'Ajustar'}
            </button>
          </div>
          <p className="mb-2 text-[13px] text-[var(--text-secondary)]">
            {progreso.ejerciciosSemana} de {progreso.metaSemanal} ejercicios esta semana
          </p>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
            <div
              className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-500"
              style={{ width: `${metaProgreso}%` }}
            />
          </div>
          {editandoMeta && (
            <div className="mt-3 flex items-center justify-center gap-4">
              <button
                onClick={() => cambiarMeta(-5)}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--surface-2)] text-[16px] font-bold text-[var(--text-primary)]"
              >
                −
              </button>
              <span className="text-[15px] font-bold text-[var(--text-primary)] [font-family:var(--font-display)]">
                {progreso.metaSemanal}
              </span>
              <button
                onClick={() => cambiarMeta(5)}
                className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[var(--surface-2)] text-[16px] font-bold text-[var(--text-primary)]"
              >
                +
              </button>
            </div>
          )}
        </div>

        <p className="mb-3 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.06em] text-[var(--text-secondary)]">
          <Sparkles size={14} /> Tu progreso por módulo
        </p>
        <div className="mb-8 flex flex-col gap-3">
          {MODULOS.map((m) => {
            const p = progreso.modulos[m.slug];
            return (
              <div key={m.slug} className="rounded-[var(--radius-card)] border-2 border-[var(--surface-2)] bg-[var(--surface)] p-4">
                <p className="font-bold [font-family:var(--font-display)]">{m.nombre}</p>
                <p className="text-[12px] text-[var(--text-secondary)]">
                  {p ? `${p.completadas}/${p.total} correctas` : 'Todavía no empiezas'}
                </p>
              </div>
            );
          })}
        </div>

        <button
          onClick={salir}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] border-2 border-[var(--surface-2)] bg-[var(--surface)] text-[15px] font-semibold text-[var(--accent)]"
        >
          <LogOut size={16} strokeWidth={2.5} />
          Cerrar sesión
        </button>
        <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] leading-relaxed text-[var(--text-secondary)]">
          {sincronizado ? (
            <>
              <Cloud size={12} /> Tu racha, gemas e historial están guardados en tu cuenta — abre AlgebraX en cualquier celular y ahí van a estar.
            </>
          ) : (
            'Tu progreso vive en este dispositivo. Crea tu cuenta para no perderlo si cambias de celular.'
          )}
        </p>
      </div>
    </div>
  );
}
