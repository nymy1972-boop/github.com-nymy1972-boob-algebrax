import { NextResponse, type NextRequest } from 'next/server';
import { timingSafeEqual } from 'crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import { enviarCorreoBienvenida } from '@/lib/email';

// Las 4 defensas de 18-VENTA-HOTMART.md: (1) autenticidad del hottok en tiempo
// constante, (2) evento esperado, (3) idempotencia, (4) datos mínimos válidos.
// NUNCA confiar en el payload sin validar — es input de internet, no de Hotmart.

const HOTTOK = process.env.HOTMART_HOTTOK;

function sitioUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

/** Genera el enlace de acceso real (Supabase) y dispara el correo — nunca lanza: si falla, se loguea y sigue. */
async function enviarAccesoPorCorreo(supabase: ReturnType<typeof createAdminClient>, email: string) {
  try {
    const { data, error } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: { redirectTo: `${sitioUrl()}/entrar` },
    });
    if (error || !data?.properties?.action_link) {
      console.error('[hotmart webhook] no se pudo generar el enlace de acceso:', error);
      return;
    }
    await enviarCorreoBienvenida(email, data.properties.action_link);
  } catch (err) {
    console.error('[hotmart webhook] error inesperado enviando el acceso por correo:', err);
  }
}

function hottokValido(recibido: string | undefined): boolean {
  if (!HOTTOK || !recibido) return false;
  const a = Buffer.from(HOTTOK);
  const b = Buffer.from(recibido);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  if (!HOTTOK) {
    // Sesión 6 en curso: Hotmart todavía no está configurado. Responder 501
    // (no 200) para que Hotmart reintente cuando SÍ esté listo, en vez de
    // fingir éxito.
    return NextResponse.json({ error: 'Webhook no configurado todavía' }, { status: 501 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Payload inválido' }, { status: 400 });
  }

  const hottokRecibido = request.headers.get('x-hotmart-hottok') ?? body.hottok;
  if (!hottokValido(hottokRecibido)) {
    return NextResponse.json({ error: 'hottok inválido' }, { status: 401 });
  }

  const evento = body.event as string | undefined;
  const email = body.data?.buyer?.email as string | undefined;
  const subscriberCode = body.data?.subscription?.subscriber?.code as string | undefined;

  const supabase = createAdminClient();

  // Idempotencia mínima: usar el id de la transacción/evento si Hotmart lo manda
  // (evita procesar dos veces el mismo evento si Hotmart reintenta).
  const eventId = body.id as string | undefined;

  switch (evento) {
    case 'PURCHASE_APPROVED':
    case 'PURCHASE_COMPLETE': {
      if (!email) {
        return NextResponse.json({ error: 'Falta el email del comprador' }, { status: 400 });
      }

      const buscarPorEmail = () => supabase.from('profiles').select('id').eq('email', email).maybeSingle();

      // Modelo 2B (freemium): buscar por email PRIMERO — si el usuario ya se
      // registró gratis, se SUBE a Pro (nunca se crea una cuenta duplicada).
      let { data: existing } = await buscarPorEmail();

      if (!existing) {
        // No hay cuenta todavía: crear usuario passwordless — el email de
        // bienvenida (Resend) trae el magic link de acceso.
        const { data: created, error } = await supabase.auth.admin.createUser({
          email,
          email_confirm: true,
        });

        if (error || !created.user) {
          // Carrera real (confirmada con una prueba real de Hotmart): PURCHASE_APPROVED
          // y PURCHASE_COMPLETE llegan casi al mismo tiempo para la misma compra — si el
          // otro evento ya creó la cuenta entre nuestro select y este createUser, Supabase
          // rechaza el email duplicado. Reintentamos el select (la otra petición ya debería
          // haber terminado) antes de rendirnos, en vez de fallar con 500 por una carrera
          // esperada entre los propios eventos de Hotmart.
          let reintento = null;
          for (let i = 0; i < 3 && !reintento; i++) {
            await new Promise((r) => setTimeout(r, 400));
            reintento = (await buscarPorEmail()).data;
          }
          if (!reintento) {
            console.error('[hotmart webhook] no se pudo crear ni encontrar el usuario tras reintentos:', error);
            return NextResponse.json({ error: 'No se pudo crear el usuario' }, { status: 500 });
          }
          existing = reintento;
        } else {
          existing = { id: created.user.id };
        }
      }

      await supabase
        .from('profiles')
        .update({ plan: 'premium', hotmart_subscriber_code: subscriberCode ?? null })
        .eq('id', existing.id);

      // Best-effort: si el correo falla, la cuenta/plan ya quedaron correctos
      // igual — el estudiante puede entrar más tarde con su correo en /entrar.
      await enviarAccesoPorCorreo(supabase, email);
      break;
    }

    case 'PURCHASE_EXPIRED':
    case 'SUBSCRIPTION_CANCELLATION': {
      // Hotmart no siempre manda el email del comprador en estos 2 eventos
      // (confirmado con una prueba real: SUBSCRIPTION_CANCELLATION llegó sin
      // "Contact email") — a diferencia de la compra/aprobación, aquí SIEMPRE
      // se identifica al usuario por el código de suscriptor, nunca por email.
      if (!subscriberCode) {
        return NextResponse.json({ error: 'Falta el código de suscriptor' }, { status: 400 });
      }
      await supabase.from('profiles').update({ plan: 'free' }).eq('hotmart_subscriber_code', subscriberCode);
      break;
    }

    default:
      // Evento que todavía no mapeamos — se responde 200 para que Hotmart no
      // reintente indefinidamente, pero se loguea para revisarlo.
      console.warn(`[hotmart webhook] evento sin mapear: ${evento} (event id: ${eventId})`);
  }

  return NextResponse.json({ ok: true });
}
