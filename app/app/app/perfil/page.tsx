'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Flame, Gem, LogOut, Sparkles } from 'lucide-react';
import { MODULOS } from '@/lib/modulos';
import { cerrarSesionLocal, leerProgreso, type ProgresoUsuario } from '@/lib/progress';

export default function PerfilPage() {
  const router = useRouter();
  const [progreso, setProgreso] = useState<ProgresoUsuario | null>(null);

  useEffect(() => {
    setProgreso(leerProgreso());
  }, []);

  if (!progreso) return null;

  function salir() {
    cerrarSesionLocal();
    router.push('/');
  }

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
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3">
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
        <p className="mt-3 text-center text-[11px] leading-relaxed text-[var(--text-secondary)]">
          ⚠️ Hoy tu progreso vive en este dispositivo. Cerrar sesión lo borra — las cuentas reales (que sincronizan entre dispositivos) llegan en la Sesión 6.
        </p>
      </div>
    </div>
  );
}
