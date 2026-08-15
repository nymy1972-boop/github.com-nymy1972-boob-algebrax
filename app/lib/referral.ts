'use client';

// Sistema de recomendación (growth loop): "ya me está ayudando a mí, quizás
// ayude a alguien que conozco" — NUNCA "ayuda a que la app crezca". El estado
// de cooldown/variante vive en el mismo ProgresoUsuario sincronizado de
// lib/progress.ts (misma caché local + nube que racha/gemas); este archivo
// solo decide CUÁNDO mostrar el mensaje y QUÉ decir, más los helpers de
// compartir. El código de referido y `referred_by` viven en `profiles`
// (identidad, no progreso) — se leen/escriben aparte, ver abajo.

import { useCallback, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  asignarVarianteReferidoSiFalta,
  diasEntre,
  hoyLocal,
  leerProgreso,
  registrarPromptDeReferidoDescartado,
  registrarPromptDeReferidoMostrado,
  type ProgresoUsuario,
} from '@/lib/progress';
import { logEvent } from '@/lib/logEvent';

export type VarianteReferido = 'A' | 'B' | 'C';

export interface CopyReferido {
  contexto?: string; // solo Momento A: "Mira lo que acabas de hacer"
  titulo: string;
  cuerpo: string;
  cta: string;
}

/** 3 variantes para A/B testing — todas centradas en LA OTRA PERSONA, nunca
 * en "ayúdanos a crecer" (regla dura del feature, no negociable). */
const VARIANTES: Record<VarianteReferido, CopyReferido> = {
  A: {
    titulo: '¿Conoces a alguien que piensa que "no es bueno para las matemáticas"?',
    cuerpo: 'Tal vez no necesita ser más inteligente. Tal vez necesita que alguien le explique las cosas de otra manera.',
    cta: 'Ayudarlo a descubrir AlgebraX',
  },
  B: {
    titulo: 'Piensa en esa persona que siempre dice: "Yo no entiendo matemáticas."',
    cuerpo: 'Puede que AlgebraX sea justo lo que necesita.',
    cta: 'Compartir AlgebraX',
  },
  C: {
    titulo: 'No cierres esto todavía. Piensa en alguien que odia las matemáticas.',
    cuerpo: 'Ahora imagina que por fin encuentra una forma de entenderlas.',
    cta: 'Enviarle AlgebraX',
  },
};

const TODAS_LAS_VARIANTES: VarianteReferido[] = ['A', 'B', 'C'];

export function elegirVarianteAlAzar(): VarianteReferido {
  return TODAS_LAS_VARIANTES[Math.floor(Math.random() * TODAS_LAS_VARIANTES.length)];
}

export function copyDeVariante(v: VarianteReferido, contexto?: string): CopyReferido {
  return { ...VARIANTES[v], contexto };
}

const COOLDOWN_DIAS = 4;

/** ¿Se puede mostrar el mensaje ahora? `requiereVictoriaPrevia`: para el
 * Momento C (al abrir la app) — no interrumpe la primerísima vez que alguien
 * entra, solo después de una señal mínima de que la app ya le sirvió. Los
 * Momentos A (tras un acierto/módulo/examen) no necesitan este chequeo
 * porque YA se llaman justo después de una victoria real. */
export function puedeMostrarPromptReferido(p: ProgresoUsuario, opts: { requiereVictoriaPrevia?: boolean } = {}): boolean {
  const hoy = hoyLocal();
  if (p.lastReferralPrompt === hoy) return false; // nunca 2 veces el mismo día
  if (opts.requiereVictoriaPrevia && p.totalEjercicios < 3 && p.currentStreak < 1) return false;

  const ultimoContacto = [p.referralDismissedAt, p.lastReferralPrompt].filter(Boolean).sort().pop() ?? null;
  if (!ultimoContacto) return true; // primera vez
  return diasEntre(ultimoContacto, hoy) >= COOLDOWN_DIAS;
}

// ── Código de referido + atribución (profiles.referral_code / referred_by) ──

function codigoAlAzar(): string {
  const alfabeto = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sin 0/O/1/I, menos confusión al leerlo en voz alta
  let out = '';
  for (let i = 0; i < 7; i++) out += alfabeto[Math.floor(Math.random() * alfabeto.length)];
  return out;
}

/** Trae el código de referido del usuario logueado; lo crea si no existe.
 * null si no hay sesión (preview anónimo no puede referir — no tiene a dónde
 * atribuirle el crédito). */
export async function obtenerOCrearCodigoReferido(): Promise<string | null> {
  const supabase = createClient();
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) return null;

  const { data: perfil } = await supabase.from('profiles').select('referral_code').eq('id', userId).maybeSingle();
  if (perfil?.referral_code) return perfil.referral_code;

  for (let intento = 0; intento < 3; intento++) {
    const candidato = codigoAlAzar();
    const { error } = await supabase.from('profiles').update({ referral_code: candidato }).eq('id', userId);
    if (!error) return candidato;
  }
  return null;
}

const CLAVE_REF_PENDIENTE = 'algebrax_ref_pendiente';

/** Captura `?ref=CODIGO` de la URL (llamar en cualquier página de entrada:
 * landing, onboarding) y lo guarda para atribuirlo cuando la persona cree su
 * cuenta más adelante — puede tardar varias pantallas en pasar. */
export function capturarCodigoDeUrl(): void {
  if (typeof window === 'undefined') return;
  const ref = new URLSearchParams(window.location.search).get('ref');
  if (!ref) return;
  window.localStorage.setItem(CLAVE_REF_PENDIENTE, JSON.stringify({ codigo: ref, guardadoEl: Date.now() }));
}

const REF_PENDIENTE_VIGENCIA_MS = 30 * 24 * 60 * 60 * 1000; // 30 días

function leerCodigoPendiente(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(CLAVE_REF_PENDIENTE);
    if (!raw) return null;
    const { codigo, guardadoEl } = JSON.parse(raw) as { codigo: string; guardadoEl: number };
    if (Date.now() - guardadoEl > REF_PENDIENTE_VIGENCIA_MS) return null;
    return codigo || null;
  } catch {
    return null;
  }
}

/** Llamar justo después de un login/registro exitoso. Server-side asocia
 * `referred_by` en el nuevo perfil y registra el evento — best-effort, nunca
 * bloquea el login si falla. */
export async function asociarReferidoSiAplica(): Promise<void> {
  const codigo = leerCodigoPendiente();
  if (!codigo) return;
  try {
    await fetch('/api/referral/asociar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo }),
    });
    window.localStorage.removeItem(CLAVE_REF_PENDIENTE);
  } catch {
    // silencioso: no es crítico para el login
  }
}

/** Sin código (preview anónimo, sin cuenta) igual da un link válido — solo
 * que sin atribución. Nunca bloquea a alguien que quiere ayudar a otro por
 * no tener cuenta todavía. */
export function linkDeReferido(codigo: string | null): string {
  const origen = typeof window !== 'undefined' ? window.location.origin : 'https://algebrax.app';
  return codigo ? `${origen}/?ref=${codigo}` : origen;
}

export function mensajeParaCompartir(codigo: string | null): string {
  return `Encontré esta app para aprender matemáticas de una forma mucho más sencilla. Creo que podría ayudarte. Échale un vistazo a AlgebraX 👇\n${linkDeReferido(codigo)}`;
}

// ── Tracking (reutiliza event_log — mismo pipeline que ya lee /admin) ──────

export function trackReferido(evento: string, extra: Record<string, unknown> = {}) {
  logEvent(`referral_${evento}`, extra);
}

// ── Hook compartido — una sola fuente de verdad para las 3 pantallas que
//    pueden disparar el prompt (Inicio, Práctica, Examen). ──────────────────

export function useReferralPrompt() {
  const [abierto, setAbierto] = useState(false);
  const [abiertoShare, setAbiertoShare] = useState(false);
  const [copy, setCopy] = useState<CopyReferido | null>(null);
  const [codigo, setCodigo] = useState<string | null>(null);
  const [variante, setVariante] = useState<VarianteReferido | null>(null);

  /** Intenta abrir el prompt (Momento A o C) respetando cooldown/frecuencia.
   * Devuelve true si lo abrió — quien llama (ej. la pantalla de examen) puede
   * usarlo para posponer una navegación y no encimar el modal con el cambio
   * de pantalla. */
  const intentar = useCallback((opts: { requiereVictoriaPrevia?: boolean; contexto?: string } = {}): boolean => {
    const p = leerProgreso();
    if (!puedeMostrarPromptReferido(p, opts)) return false;
    const v = p.referralVariant ?? elegirVarianteAlAzar();
    if (!p.referralVariant) asignarVarianteReferidoSiFalta(v);
    setVariante(v);
    setCopy(copyDeVariante(v, opts.contexto));
    registrarPromptDeReferidoMostrado();
    trackReferido('prompt_mostrado', { variante: v, momento: opts.contexto ? 'A' : 'C' });
    setAbierto(true);
    return true;
  }, []);

  const compartir = useCallback(() => {
    setAbierto(false);
    trackReferido('cta_clicked', { variante });
    obtenerOCrearCodigoReferido().then(setCodigo);
    setAbiertoShare(true);
  }, [variante]);

  /** Momento B (tarjeta del dashboard): va directo a compartir, sin el modal intermedio. */
  const compartirDirecto = useCallback(() => {
    trackReferido('cta_clicked', { origen: 'dashboard_card' });
    obtenerOCrearCodigoReferido().then(setCodigo);
    setAbiertoShare(true);
  }, []);

  const descartar = useCallback(() => {
    setAbierto(false);
    registrarPromptDeReferidoDescartado();
    trackReferido('descartado', { variante });
  }, [variante]);

  return {
    abierto,
    abiertoShare,
    copy,
    codigo,
    variante,
    intentar,
    compartir,
    compartirDirecto,
    descartar,
    cerrarShare: () => setAbiertoShare(false),
  };
}
