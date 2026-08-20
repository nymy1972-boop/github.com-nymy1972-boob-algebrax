import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Modelo Freemium/onboarding-first (ESTADO.md → Sesión 1): el funnel completo
// es público, INCLUIDO /app — "Seguir gratis por ahora" nunca debe pedir
// cuenta (regla dura de la Constitución del Producto: "la app nunca bloquea
// el acceso"). Sin sesión, /app sigue funcionando con progreso 100% local
// (lib/progress.ts) y `usePlan()` devuelve 'free' por defecto — el gate real
// de qué se puede practicar ya lo hacen las propias pantallas (moduloAccesible/
// examenDesbloqueado), no este middleware. Este archivo solo protege lo que
// de verdad REQUIERE una cuenta (hoy: nada fuera de auth misma).
//
// Auditoría 2026-08-17: se encontró que /app había quedado FUERA de esta
// lista (bug real, no intencional) — cualquier visitante sin cuenta era
// redirigido a /entrar al tocar "Seguir gratis por ahora", rompiendo la
// promesa freemium. Corregido agregando /app de vuelta.
const PUBLIC_PATHS = ['/', '/onboarding', '/paywall', '/entrar', '/privacidad', '/terminos', '/reembolsos', '/aviso-ia', '/app'];

export async function middleware(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    },
  );

  // IMPORTANTE: nada de lógica entre createServerClient y getUser() — getUser()
  // valida el JWT contra Supabase y dispara el refresh si expiró.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isPublic = PUBLIC_PATHS.some((p) => path === p || (p !== '/' && path.startsWith(p + '/')));

  if (!user && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = '/entrar';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  // /api/* queda fuera: cada ruta hace su PROPIA autorización (hottok del
  // webhook, CRON_SECRET del cron, nada en la de IA que ya es server-only) —
  // dejarlas pasar por este guard de sesión-de-navegador las redirigía a
  // /entrar con 307 en vez de ejecutarlas (bug real, encontrado al probar
  // el cron de recordatorios: Hotmart nunca habría podido llegar al webhook).
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|webp)$).*)'],
};
