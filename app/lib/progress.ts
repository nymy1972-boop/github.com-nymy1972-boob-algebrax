'use client';

// Progreso local (racha + módulos) — hasta que exista Supabase (Sesión 6) el
// estado vive en localStorage, mismo patrón que la lógica canónica de
// 24-GAMIFICACION.md §"Timezone" (el "hoy" se calcula en la zona del usuario).
// TODO Sesión 6: migrar esto a `user_progress` en Supabase (RPC atómica,
// streak freeze, milestones server-side) sin cambiar la UI que lo consume.

const KEY = 'algebrax_progress_v1';

export interface ModuloProgreso {
  completadas: number; // preguntas correctas acumuladas
  total: number;
}

export interface ProgresoUsuario {
  nombre: string | null;
  grado: string | null;
  currentStreak: number;
  lastActiveOn: string | null; // YYYY-MM-DD en zona local
  modulos: Record<string, ModuloProgreso>;
}

function hoyLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function diasEntre(a: string, b: string): number {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.round(ms / 86400000);
}

const DEFAULT_PROGRESO: ProgresoUsuario = {
  nombre: null,
  grado: null,
  currentStreak: 0,
  lastActiveOn: null,
  modulos: {},
};

export function leerProgreso(): ProgresoUsuario {
  if (typeof window === 'undefined') return DEFAULT_PROGRESO;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT_PROGRESO;
    return { ...DEFAULT_PROGRESO, ...JSON.parse(raw) } as ProgresoUsuario;
  } catch {
    return DEFAULT_PROGRESO;
  }
}

function guardar(p: ProgresoUsuario) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify(p));
}

/** Igual algoritmo que actualizarRacha() de 24-GAMIFICACION.md, sin freeze todavía. */
export function registrarVisitaHoy(): { progreso: ProgresoUsuario; milestone: number | null } {
  const p = leerProgreso();
  const hoy = hoyLocal();

  if (p.lastActiveOn === hoy) {
    return { progreso: p, milestone: null };
  }

  const nuevaRacha = p.lastActiveOn && diasEntre(p.lastActiveOn, hoy) === 1 ? p.currentStreak + 1 : 1;
  const actualizado: ProgresoUsuario = { ...p, currentStreak: nuevaRacha, lastActiveOn: hoy };
  guardar(actualizado);

  const milestone = [7, 30, 100, 365].includes(nuevaRacha) ? nuevaRacha : null;
  return { progreso: actualizado, milestone };
}

export function guardarNombre(nombre: string): ProgresoUsuario {
  const p = leerProgreso();
  const actualizado: ProgresoUsuario = { ...p, nombre: nombre.trim() };
  guardar(actualizado);
  return actualizado;
}

export function guardarGrado(grado: string): ProgresoUsuario {
  const p = leerProgreso();
  const actualizado: ProgresoUsuario = { ...p, grado };
  guardar(actualizado);
  return actualizado;
}

export function cerrarSesionLocal() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(KEY);
}

export function registrarAcierto(moduloSlug: string, totalPreguntas: number): ProgresoUsuario {
  const p = leerProgreso();
  const actual = p.modulos[moduloSlug] ?? { completadas: 0, total: totalPreguntas };
  const actualizado: ProgresoUsuario = {
    ...p,
    modulos: {
      ...p.modulos,
      [moduloSlug]: { completadas: Math.min(actual.completadas + 1, totalPreguntas), total: totalPreguntas },
    },
  };
  guardar(actualizado);
  return actualizado;
}
