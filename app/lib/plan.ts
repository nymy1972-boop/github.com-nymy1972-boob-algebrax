'use client';

// Plan real del estudiante (Free/Premium) — Constitución del Producto (ESTADO.md):
// "Free: práctica limitada diaria del módulo básico. Premium: todos los módulos +
// Modo Examen + reportes de errores + práctica ilimitada." Sin cuenta (preview
// anónimo de "Seguir gratis por ahora") siempre es Free. `profiles.plan` es la
// única fuente de verdad para Premium — el webhook de Hotmart es el único que
// lo cambia (RLS: el propio usuario no puede subirse el plan).

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { MODULOS } from '@/lib/modulos';

export type Plan = 'free' | 'premium';

/** El único módulo abierto en el plan gratis — el primero, el más básico. */
export const MODULO_GRATIS_SLUG = MODULOS[0].slug;

/** Tope de ejercicios/día en el módulo gratis — pasado esto, paywall con valor, no error. */
export const LIMITE_DIARIO_GRATIS = 15;

// Segunda vía de desbloqueo (pedido explícito del usuario, 2026-08-15): además
// de Premium, practicar mucho el módulo gratis (que es lo único que da gemas
// sin pagar) también desbloquea, PARA SIEMPRE, el resto del contenido — un
// camino de esfuerzo real, no un descuento disfrazado. Umbrales crecientes:
// lo más barato de desbloquear es el siguiente módulo, lo más caro es el
// simulacro completo (el ítem de mayor valor).
export const UMBRAL_GEMAS_DESPEJES = 300; // ≈ 30 aciertos, ~2 días de práctica gratis
export const UMBRAL_GEMAS_FACTORIZACION = 700; // ≈ 70 aciertos, ~5 días
export const UMBRAL_GEMAS_EXAMEN = 1200; // ≈ 120 aciertos, ~8 días — el más valioso, el más caro

/** Gemas que le faltan a un umbral (nunca negativo). */
export function gemasQueFaltan(gemas: number, umbral: number): number {
  return Math.max(0, umbral - gemas);
}

export function umbralDelModulo(slug: string): number | null {
  if (slug === 'despejes') return UMBRAL_GEMAS_DESPEJES;
  if (slug === 'factorizacion') return UMBRAL_GEMAS_FACTORIZACION;
  return null; // el módulo gratis no tiene umbral — ya está abierto
}

export function moduloDesbloqueado(slug: string, plan: Plan, gemas: number): boolean {
  if (plan === 'premium' || slug === MODULO_GRATIS_SLUG) return true;
  const umbral = umbralDelModulo(slug);
  return umbral !== null && gemas >= umbral;
}

export function examenDesbloqueado(plan: Plan, gemas: number): boolean {
  return plan === 'premium' || gemas >= UMBRAL_GEMAS_EXAMEN;
}

export function usePlan(): { plan: Plan; cargando: boolean } {
  const [plan, setPlan] = useState<Plan>('free');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let activo = true;
    const supabase = createClient();
    supabase.auth
      .getUser()
      .then(async ({ data }) => {
        if (!data.user) {
          if (activo) setCargando(false);
          return;
        }
        const { data: perfil } = await supabase
          .from('profiles')
          .select('plan')
          .eq('id', data.user.id)
          .maybeSingle();
        if (activo) setPlan(perfil?.plan === 'premium' ? 'premium' : 'free');
      })
      .catch(() => {})
      .finally(() => {
        if (activo) setCargando(false);
      });
    return () => {
      activo = false;
    };
  }, []);

  return { plan, cargando };
}
