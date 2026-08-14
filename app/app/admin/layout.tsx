import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

// Guardián de admin: el middleware ya exige sesión para cualquier ruta fuera
// de PUBLIC_PATHS, pero eso solo prueba "hay alguien logueado" — el panel
// necesita probar "es EL DUEÑO". La verificación real pasa aquí, en el
// servidor, comparando el email de la sesión (que viene firmado por Supabase,
// no editable por el cliente) contra ADMIN_EMAIL. Ocultar la ruta en el menú
// NO es seguridad (eso es un IDOR) — este chequeo sí lo es.
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const adminEmail = process.env.ADMIN_EMAIL;
  if (!user || !adminEmail || user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
    redirect('/entrar');
  }

  return <>{children}</>;
}
