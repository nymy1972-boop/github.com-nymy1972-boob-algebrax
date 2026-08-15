import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { enviarCorreoRachaEnRiesgo } from '@/lib/email';

// Disparador externo de retención (56-MOMENTOS-EMOCIONALES): sin esto, la
// app depende 100% de que el estudiante se acuerde solo de volver — el
// hallazgo que motivó esto. Cron diario (ver vercel.json) que avisa a quien
// tiene racha activa y todavía no practicó hoy, antes de que la pierda.
//
// Zona horaria: usa la fecha UTC del servidor como "ayer/hoy" — simplificación
// consciente para esta primera versión (el resto de `progress.ts` calcula el
// día en la zona LOCAL del estudiante). Con estudiantes repartidos en varios
// países LATAM, esto puede avisar unas horas antes o después del corte real
// de su día; no es crítico para un aviso de "todavía no practicaste hoy".
// Documentado como mejora futura, no bloqueante para el v1 de este disparador.

function fechaUTC(offsetDias: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + offsetDias);
  return d.toISOString().slice(0, 10);
}

export async function GET(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  const auth = request.headers.get('authorization');
  if (!secret || auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const supabase = createAdminClient();
  const ayer = fechaUTC(-1);

  const { data: filas, error } = await supabase
    .from('user_progress')
    .select('user_id, current_streak, last_active_on')
    .gt('current_streak', 0)
    .eq('last_active_on', ayer);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  let enviados = 0;
  let fallidos = 0;

  for (const fila of filas ?? []) {
    try {
      const { data: usuario } = await supabase.auth.admin.getUserById(fila.user_id);
      const email = usuario?.user?.email;
      if (!email) {
        fallidos += 1;
        continue;
      }
      const { data: link, error: linkError } = await supabase.auth.admin.generateLink({
        type: 'magiclink',
        email,
        options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://algebrax.app'}/entrar` },
      });
      if (linkError || !link?.properties?.action_link) {
        fallidos += 1;
        continue;
      }
      await enviarCorreoRachaEnRiesgo(email, fila.current_streak, link.properties.action_link);
      enviados += 1;
    } catch {
      fallidos += 1;
    }
  }

  return NextResponse.json({ ok: true, candidatos: filas?.length ?? 0, enviados, fallidos });
}
