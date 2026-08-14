'use client';

// Fuente única de eventos de uso (36-ANALITICA-Y-EVENTOS): cada acción real del
// estudiante se registra en `event_log` — el backoffice lee de ahí, nunca de
// números inventados. Fire-and-forget: si falla (sin conexión, RLS, etc.) no
// interrumpe la experiencia del estudiante — la app nunca se rompe por métricas.

import { createClient } from '@/lib/supabase/client';

export function logEvent(eventName: string, properties: Record<string, unknown> = {}) {
  const supabase = createClient();
  supabase.auth.getUser().then(({ data }) => {
    supabase
      .from('event_log')
      .insert({ user_id: data.user?.id ?? null, event_name: eventName, properties })
      .then(() => {});
  });
}
