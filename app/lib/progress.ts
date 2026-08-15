'use client';

// Progreso: localStorage es la CACHÉ rápida (lectura/escritura síncrona, la UI
// nunca espera una respuesta de red); Supabase (`user_progress`/`module_progress`)
// es la fuente de verdad para quien tiene cuenta real — sin esto, un estudiante
// que YA PAGA pierde su racha/gemas/historial al cambiar de celular o borrar
// datos del navegador, motivo directo de cancelación. `sincronizarAlAbrir()` se
// llama UNA vez al entrar a /app: si hay nube, la nube gana (se sobreescribe el
// caché local); si no hay nube todavía, se sube lo local. Cada escritura
// posterior (`guardar()`) empuja a la nube en segundo plano, sin bloquear la UI
// ni cambiar la firma síncrona de las funciones que ya consume el resto de la
// app. Sin sesión (preview anónimo "Seguir gratis por ahora"), todo sigue
// siendo 100% local — igual que antes.

import { createClient } from '@/lib/supabase/client';

const KEY = 'algebrax_progress_v1';

export interface ModuloProgreso {
  completadas: number; // preguntas correctas acumuladas
  total: number;
}

export interface ProgresoUsuario {
  nombre: string | null;
  grado: string | null;
  gemas: number;
  currentStreak: number;
  mejorRacha: number; // récord histórico — nunca baja, es lo que cuesta perder
  lastActiveOn: string | null; // YYYY-MM-DD en zona local
  modulos: Record<string, ModuloProgreso>;
  totalEjercicios: number; // aciertos acumulados de por vida — nunca se resetea
  creadoEn: string | null; // fecha de la primera visita — "llevas X días con AlgebraX"
  metaSemanal: number; // desafío propio, editable en Perfil (configuración que se acumula/personaliza)
  ejerciciosSemana: number; // aciertos de la semana en curso, contra la meta
  semanaId: string | null; // "YYYY-Www" — cuándo cambia, se resetea ejerciciosSemana
  ejerciciosHoyGratis: number; // intentos de HOY en el módulo gratis, contra LIMITE_DIARIO_GRATIS (lib/plan.ts)
  diaEjerciciosGratis: string | null; // YYYY-MM-DD — cuándo cambia, se resetea ejerciciosHoyGratis
}

/** Gemas por acierto — la recompensa visible de cada respuesta correcta. */
export const GEMAS_POR_ACIERTO = 10;
export const META_SEMANAL_DEFAULT = 30;

function hoyLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function diasEntre(a: string, b: string): number {
  const ms = new Date(b).getTime() - new Date(a).getTime();
  return Math.round(ms / 86400000);
}

/** ISO week id ("2026-W33") — misma semana = mismo desafío, semana nueva = reinicia. */
function semanaActual(): string {
  const d = new Date();
  const objetivo = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diaSemana = (objetivo.getDay() + 6) % 7; // lunes=0
  objetivo.setDate(objetivo.getDate() - diaSemana + 3);
  const primerJueves = new Date(objetivo.getFullYear(), 0, 4);
  const semana = 1 + Math.round(((objetivo.getTime() - primerJueves.getTime()) / 86400000 - 3 + ((primerJueves.getDay() + 6) % 7)) / 7);
  return `${objetivo.getFullYear()}-W${String(semana).padStart(2, '0')}`;
}

const DEFAULT_PROGRESO: ProgresoUsuario = {
  nombre: null,
  grado: null,
  gemas: 0,
  currentStreak: 0,
  mejorRacha: 0,
  lastActiveOn: null,
  modulos: {},
  totalEjercicios: 0,
  creadoEn: null,
  metaSemanal: META_SEMANAL_DEFAULT,
  ejerciciosSemana: 0,
  semanaId: null,
  ejerciciosHoyGratis: 0,
  diaEjerciciosGratis: null,
};

export function leerProgreso(): ProgresoUsuario {
  if (typeof window === 'undefined') return DEFAULT_PROGRESO;
  try {
    const raw = window.localStorage.getItem(KEY);
    const base = raw ? ({ ...DEFAULT_PROGRESO, ...JSON.parse(raw) } as ProgresoUsuario) : { ...DEFAULT_PROGRESO };
    if (!base.creadoEn) {
      base.creadoEn = hoyLocal();
      // Solo local: es un valor calculado al leer, no una acción real del
      // usuario — empujarlo a la nube aquí pisaría un progreso real que
      // `sincronizarAlAbrir()` todavía no tuvo tiempo de jalar (race
      // condition real, encontrada y corregida en verificación).
      guardarLocal(base);
    }
    return base;
  } catch {
    return DEFAULT_PROGRESO;
  }
}

function guardarLocal(p: ProgresoUsuario) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify(p));
}

function guardar(p: ProgresoUsuario) {
  guardarLocal(p);
  empujarANubeEnSegundoPlano(p);
}

// ── Sincronización con Supabase (solo si hay sesión real) ──────────────────

let idUsuarioCacheado: string | null | undefined; // undefined = sin consultar aún

async function idUsuarioActual(): Promise<string | null> {
  if (idUsuarioCacheado !== undefined) return idUsuarioCacheado;
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  idUsuarioCacheado = data.user?.id ?? null;
  return idUsuarioCacheado;
}

function filaUserProgress(userId: string, p: ProgresoUsuario) {
  return {
    user_id: userId,
    nombre: p.nombre,
    grado: p.grado,
    gemas: p.gemas,
    current_streak: p.currentStreak,
    mejor_racha: p.mejorRacha,
    last_active_on: p.lastActiveOn,
    total_ejercicios: p.totalEjercicios,
    creado_en: p.creadoEn,
    meta_semanal: p.metaSemanal,
    ejercicios_semana: p.ejerciciosSemana,
    semana_id: p.semanaId,
    ejercicios_hoy_gratis: p.ejerciciosHoyGratis,
    dia_ejercicios_gratis: p.diaEjerciciosGratis,
    updated_at: new Date().toISOString(),
  };
}

/** Best-effort: nunca bloquea la UI ni lanza si falla (sin sesión, o sin red). */
function empujarANubeEnSegundoPlano(p: ProgresoUsuario) {
  if (typeof window === 'undefined') return;
  idUsuarioActual()
    .then(async (userId) => {
      if (!userId) return;
      const supabase = createClient();
      await supabase.from('user_progress').upsert(filaUserProgress(userId, p));
      const modulos = Object.entries(p.modulos);
      if (modulos.length > 0) {
        await supabase.from('module_progress').upsert(
          modulos.map(([slug, m]) => ({
            user_id: userId,
            modulo_slug: slug,
            completadas: m.completadas,
            total: m.total,
            updated_at: new Date().toISOString(),
          })),
        );
      }
    })
    .catch(() => {});
}

/** Llamar UNA vez al entrar a /app (pantalla de llegada tras login). Si hay
 * progreso en la nube, GANA sobre el caché local (protege a quien cambió de
 * dispositivo); si no hay nube, sube el local (ej. lo que trajo del onboarding
 * en este mismo dispositivo antes de crear la cuenta). */
export async function sincronizarAlAbrir(): Promise<ProgresoUsuario> {
  const local = leerProgreso();
  const userId = await idUsuarioActual();
  if (!userId) return local;

  const supabase = createClient();
  const [{ data: fila }, { data: filasModulos }] = await Promise.all([
    supabase.from('user_progress').select('*').eq('user_id', userId).maybeSingle(),
    supabase.from('module_progress').select('*').eq('user_id', userId),
  ]);

  if (!fila) {
    empujarANubeEnSegundoPlano(local);
    return local;
  }

  const modulos: Record<string, ModuloProgreso> = {};
  for (const m of filasModulos ?? []) {
    modulos[m.modulo_slug] = { completadas: m.completadas, total: m.total };
  }

  const deNube: ProgresoUsuario = {
    nombre: fila.nombre ?? local.nombre,
    grado: fila.grado ?? local.grado,
    gemas: fila.gemas,
    currentStreak: fila.current_streak,
    mejorRacha: fila.mejor_racha,
    lastActiveOn: fila.last_active_on,
    modulos,
    totalEjercicios: fila.total_ejercicios,
    creadoEn: fila.creado_en ?? local.creadoEn,
    metaSemanal: fila.meta_semanal,
    ejerciciosSemana: fila.ejercicios_semana,
    semanaId: fila.semana_id,
    ejerciciosHoyGratis: fila.ejercicios_hoy_gratis,
    diaEjerciciosGratis: fila.dia_ejercicios_gratis,
  };
  window.localStorage.setItem(KEY, JSON.stringify(deNube));
  return deNube;
}

/** Igual algoritmo que actualizarRacha() de 24-GAMIFICACION.md, sin freeze todavía. */
export function registrarVisitaHoy(): { progreso: ProgresoUsuario; milestone: number | null } {
  const p = leerProgreso();
  const hoy = hoyLocal();

  if (p.lastActiveOn === hoy) {
    return { progreso: p, milestone: null };
  }

  const nuevaRacha = p.lastActiveOn && diasEntre(p.lastActiveOn, hoy) === 1 ? p.currentStreak + 1 : 1;
  const actualizado: ProgresoUsuario = {
    ...p,
    currentStreak: nuevaRacha,
    mejorRacha: Math.max(p.mejorRacha, nuevaRacha),
    lastActiveOn: hoy,
  };
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
  const semana = semanaActual();
  const mismaSemanaAntes = p.semanaId === semana;
  const actualizado: ProgresoUsuario = {
    ...p,
    gemas: p.gemas + GEMAS_POR_ACIERTO,
    totalEjercicios: p.totalEjercicios + 1,
    semanaId: semana,
    ejerciciosSemana: (mismaSemanaAntes ? p.ejerciciosSemana : 0) + 1,
    modulos: {
      ...p.modulos,
      [moduloSlug]: { completadas: Math.min(actual.completadas + 1, totalPreguntas), total: totalPreguntas },
    },
  };
  guardar(actualizado);
  return actualizado;
}

/** Para el diagnóstico del onboarding (todavía sin cuenta): suma gemas sin tocar módulos. */
export function sumarGemas(cantidad: number): ProgresoUsuario {
  const p = leerProgreso();
  const actualizado: ProgresoUsuario = { ...p, gemas: p.gemas + cantidad };
  guardar(actualizado);
  return actualizado;
}

/** Meta semanal editable — el estudiante define su propio desafío (Perfil). */
export function guardarMetaSemanal(meta: number): ProgresoUsuario {
  const p = leerProgreso();
  const actualizado: ProgresoUsuario = { ...p, metaSemanal: Math.max(5, Math.min(200, meta)) };
  guardar(actualizado);
  return actualizado;
}

/** Días desde la primera visita — "llevas X días con AlgebraX", crece solo, nunca baja. */
export function diasDesdeCreacion(p: ProgresoUsuario): number {
  if (!p.creadoEn) return 0;
  return Math.max(0, diasEntre(p.creadoEn, hoyLocal()));
}

/** Cuántos ejercicios del módulo gratis lleva HOY (se resetea solo al cambiar el día). */
export function ejerciciosGratisHoy(p: ProgresoUsuario): number {
  return p.diaEjerciciosGratis === hoyLocal() ? p.ejerciciosHoyGratis : 0;
}

/** Suma un intento de hoy contra el tope diario del módulo gratis. */
export function registrarEjercicioGratisHoy(): ProgresoUsuario {
  const p = leerProgreso();
  const hoy = hoyLocal();
  const previos = p.diaEjerciciosGratis === hoy ? p.ejerciciosHoyGratis : 0;
  const actualizado: ProgresoUsuario = { ...p, ejerciciosHoyGratis: previos + 1, diaEjerciciosGratis: hoy };
  guardar(actualizado);
  return actualizado;
}
