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
