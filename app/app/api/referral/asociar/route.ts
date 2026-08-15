import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createAdminClient } from '@/lib/supabase/admin';

// Asocia una cuenta recién logueada con el código de quien la invitó
// (profiles.referred_by). Se llama una sola vez, justo tras un login exitoso
// (ver lib/referral.ts → asociarReferidoSiAplica). Nunca crítico: si falla,
// el login ya sucedió igual — esto solo es atribución para medir el growth
// loop, no debe poder romper el acceso de nadie.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const codigo = typeof body?.codigo === 'string' ? body.codigo.trim().toUpperCase() : null;
  if (!codigo) {
    return NextResponse.json({ error: 'Falta el código' }, { status: 400 });
  }

  // Identifica al usuario que está llamando (su propia sesión, vía cookies).
  let response = NextResponse.next();
  const supabaseSesion = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    },
  );
  const {
    data: { user },
  } = await supabaseSesion.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Sin sesión' }, { status: 401 });
  }

  const admin = createAdminClient();

  // El código debe existir y no puede ser el del propio usuario (auto-referido).
  const { data: referidor } = await admin.from('profiles').select('id, referral_code').eq('referral_code', codigo).maybeSingle();
  if (!referidor || referidor.id === user.id) {
    return NextResponse.json({ ok: false, reason: 'codigo_invalido' }, { status: 200 });
  }

  // Solo se asocia si el usuario nuevo TODAVÍA no tiene referred_by (primera vez gana).
  const { data: propio } = await admin.from('profiles').select('referred_by').eq('id', user.id).maybeSingle();
  if (propio?.referred_by) {
    return NextResponse.json({ ok: false, reason: 'ya_asociado' }, { status: 200 });
  }

  await admin.from('profiles').update({ referred_by: codigo }).eq('id', user.id);
  await admin.from('event_log').insert({
    user_id: referidor.id,
    event_name: 'referral_signup_attributed',
    properties: { nuevo_usuario: user.id, codigo },
  });

  return NextResponse.json({ ok: true });
}
