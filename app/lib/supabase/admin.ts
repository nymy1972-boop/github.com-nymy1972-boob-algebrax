import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Cliente SOLO SERVIDOR: usa la SECRET KEY, salta RLS (bypassrls).
 * NUNCA importar este archivo desde un componente 'use client' ni exponer
 * SUPABASE_SECRET_KEY con el prefijo NEXT_PUBLIC_. Uso exclusivo: webhooks
 * (Hotmart), jobs de servidor, rate limiting.
 */
export function createAdminClient() {
  return createSupabaseClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SECRET_KEY!, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
