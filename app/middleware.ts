import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Modelo Freemium/onboarding-first (ESTADO.md → Sesión 1): el funnel completo
// (/, /onboarding, /paywall, /entrar, /privacidad, etc.) es público. Solo /app
// exige sesión — y hoy /app todavía corre con progreso local (Sesión 5); este
// middleware queda listo para cuando /app pase a depender de la cuenta real.

const PUBLIC_PATHS = ['/', '/onboarding', '/paywall', '/entrar', '/privacidad', '/terminos', '/reembolsos', '/aviso-ia'];

export async function middleware(request: NextRequest) {
  // Mientras Supabase no esté conectado (Sesión 6 en curso), no bloquear nada:
  // /app sigue funcionando con progreso local (lib/progress.ts). En cuanto las
  // env vars existan, este guard deja de aplicar y el flujo real entra en vigor.
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
