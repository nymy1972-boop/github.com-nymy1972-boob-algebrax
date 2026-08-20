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
  referralPromptSeen: boolean; // ya vio el mensaje de recomendación al menos una vez
  referralDismissedAt: string | null; // YYYY-MM-DD del último "ahora no" — arranca el cooldown
  lastReferralPrompt: string | null; // YYYY-MM-DD de la última vez que se mostró (cualquier momento)
  referralSharedCount: number; // veces que tocó compartir de verdad (no solo vio el mensaje)
  referralVariant: 'A' | 'B' | 'C' | null; // variante de copy asignada una sola vez (A/B testing)
}

/** Gemas por acierto — la recompensa visible de cada respuesta correcta. */
export const GEMAS_POR_ACIERTO = 10;
export const META_SEMANAL_DEFAULT = 30;

export function hoyLocal(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function diasEntre(a: string, b: string): number {
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
  referralPromptSeen: false,
  referralDismissedAt: null,
  lastReferralPrompt: null,
  referralSharedCount: 0,
  referralVariant: null,
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

/** true si hay cuenta real (progreso sincronizado en la nube); false en preview anónimo. */
export async function hayCuentaReal(): Promise<boolean> {
  return (await idUsuarioActual()) !== null;
}

async function idUsuarioActual(): Promise<string | null> {
  if (idUsuarioCacheado !== undefined) return idUsuarioCacheado;
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  idUsuarioCacheado = data.user?.id ?? null;
  return idUsuarioCacheado;
}

// Las gemas NUNCA van en este objeto: desde la auditoría 2026-08-17, la
// columna `gemas` de `user_progress` tiene el UPDATE revocado para el rol
// `authenticated` (migración `proteger_gemas_server_side`) — solo se puede
// sumar mediante la función `sumar_gemas_seguro()` (ver
// `empujarGemasEnSegundoPlano`). Incluir `gemas` en un upsert normal hace que
// Postgres rechace el UPDATE completo (no solo esa columna), así que se
// omite aquí a propósito.
function filaUserProgress(userId: string, p: ProgresoUsuario) {
  return {
    user_id: userId,
    nombre: p.nombre,
    grado: p.grado,
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
    referral_prompt_seen: p.referralPromptSeen,
    referral_dismissed_at: p.referralDismissedAt,
    last_referral_prompt: p.lastReferralPrompt,
    referral_shared_count: p.referralSharedCount,
    referral_variant: p.referralVariant,
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

/** Única vía para sumar gemas después de creada la cuenta — llama a la
 * función `sumar_gemas_seguro()` de Supabase (SECURITY DEFINER, valida el
 * rango y suma sobre el valor REAL en la base, no sobre lo que mande el
 * cliente). Best-effort: la UI ya avanzó de forma optimista con el cálculo
 * local: si esto falla, se reintenta solo en el próximo `sincronizarAlAbrir`. */
function empujarGemasEnSegundoPlano(delta: number) {
  if (typeof window === 'undefined') return;
  idUsuarioActual()
    .then(async (userId) => {
      if (!userId) return;
      const supabase = createClient();
      await supabase.rpc('sumar_gemas_seguro', { cantidad: delta });
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
    // Primera sincronización de esta cuenta: INSERT plano (no upsert), único
    // momento en que el cliente SÍ puede escribir `gemas` directamente — así
    // no se pierden las que se ganaron en el diagnóstico del onboarding,
    // antes de tener sesión. De aquí en adelante, solo `sumar_gemas_seguro()`
    // puede moverlas (ver `empujarGemasEnSegundoPlano`). No se combina con
    // `empujarANubeEnSegundoPlano` (evita una carrera: si el upsert normal
    // llegara primero, crearía la fila sin gemas y este insert fallaría por
    // choque de clave, perdiéndolas).
    supabase
      .from('user_progress')
      .insert({ ...filaUserProgress(userId, local), gemas: local.gemas })
      .then(
        () => {},
        () => {},
      );
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
    referralPromptSeen: fila.referral_prompt_seen,
    referralDismissedAt: fila.referral_dismissed_at,
    lastReferralPrompt: fila.last_referral_prompt,
    referralSharedCount: fila.referral_shared_count,
    referralVariant: fila.referral_variant,
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
  empujarGemasEnSegundoPlano(GEMAS_POR_ACIERTO);
  return actualizado;
}

/** Suma gemas (diagnóstico del onboarding sin cuenta, o reporte del examen con cuenta). */
export function sumarGemas(cantidad: number): ProgresoUsuario {
  const p = leerProgreso();
  const actualizado: ProgresoUsuario = { ...p, gemas: p.gemas + cantidad };
  guardar(actualizado);
  empujarGemasEnSegundoPlano(cantidad);
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

// ── Sistema de referidos (lib/referral.ts orquesta CUÁNDO; esto es el CÓMO) ─

export function registrarPromptDeReferidoMostrado(): ProgresoUsuario {
  const p = leerProgreso();
  const actualizado: ProgresoUsuario = { ...p, referralPromptSeen: true, lastReferralPrompt: hoyLocal() };
  guardar(actualizado);
  return actualizado;
}

export function registrarPromptDeReferidoDescartado(): ProgresoUsuario {
  const p = leerProgreso();
  const actualizado: ProgresoUsuario = { ...p, referralDismissedAt: hoyLocal() };
  guardar(actualizado);
  return actualizado;
}

export function registrarReferidoCompartido(): ProgresoUsuario {
  const p = leerProgreso();
  const actualizado: ProgresoUsuario = { ...p, referralSharedCount: p.referralSharedCount + 1 };
  guardar(actualizado);
  return actualizado;
}

export function asignarVarianteReferidoSiFalta(variante: 'A' | 'B' | 'C'): ProgresoUsuario {
  const p = leerProgreso();
  if (p.referralVariant) return p;
  const actualizado: ProgresoUsuario = { ...p, referralVariant: variante };
  guardar(actualizado);
  return actualizado;
}
