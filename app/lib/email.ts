import { Resend } from 'resend';

// Envío de correo transaccional (Resend). Server-only: la API key nunca debe
// llegar al frontend. Si Resend no está configurado o el envío falla, NUNCA
// se lanza — el webhook de Hotmart ya cobró y debe responder 200 igual; el
// correo es best-effort (18-VENTA-HOTMART: la cuenta ya quedó creada/subida
// a premium aunque el correo falle, así el estudiante puede entrar con
// "¿Olvidaste tu acceso?" en /entrar usando el mismo correo de la compra).

function sitioUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return 'http://localhost:3000';
}

export async function enviarCorreoBienvenida(email: string, magicLink: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY no configurada — no se envió el correo de bienvenida a', email);
    return;
  }

  const resend = new Resend(apiKey);
  const from = process.env.EMAIL_FROM ?? 'onboarding@resend.dev';

  try {
    await resend.emails.send({
      from: `AlgebraX <${from}>`,
      to: email,
      subject: 'Ya tienes acceso a AlgebraX Premium',
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
          <h1 style="font-size: 22px; margin-bottom: 12px;">¡Listo! Ya tienes AlgebraX Premium</h1>
          <p style="font-size: 15px; line-height: 1.6; color: #444;">
            Gracias por tu compra. Toca el botón para entrar directo a tu cuenta — no necesitas
            contraseña, este enlace te abre la sesión.
          </p>
          <p style="margin: 28px 0;">
            <a href="${magicLink}" style="display: inline-block; background: #FF4D4D; color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 700;">
              Entrar a AlgebraX
            </a>
          </p>
          <p style="font-size: 13px; color: #888;">
            Si el botón no funciona, ve a ${sitioUrl()}/entrar y entra con este mismo correo (${email}).
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error('[email] Falló el envío del correo de bienvenida:', err);
  }
}

/** Disparador externo de retención (56-MOMENTOS-EMOCIONALES): a alguien con
 * racha activa que NO practicó ayer, se le avisa antes de que la pierda —
 * tono de aviso, no de culpa. Enviado por el cron diario, ver
 * app/api/cron/recordatorios/route.ts. */
export async function enviarCorreoRachaEnRiesgo(email: string, racha: number, magicLink: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY no configurada — no se envió el recordatorio de racha a', email);
    return;
  }

  const resend = new Resend(apiKey);
  const from = process.env.EMAIL_FROM ?? 'onboarding@resend.dev';

  try {
    await resend.emails.send({
      from: `AlgebraX <${from}>`,
      to: email,
      subject: `Tu racha de ${racha} ${racha === 1 ? 'día' : 'días'} está a punto de romperse`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
          <h1 style="font-size: 22px; margin-bottom: 12px;">No rompas tu racha de ${racha} ${racha === 1 ? 'día' : 'días'}</h1>
          <p style="font-size: 15px; line-height: 1.6; color: #444;">
            Todavía no practicas hoy. Con 10 minutos la mantienes viva — no hace falta más.
          </p>
          <p style="margin: 28px 0;">
            <a href="${magicLink}" style="display: inline-block; background: #FF4D4D; color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 700;">
              Practicar ahora
            </a>
          </p>
          <p style="font-size: 13px; color: #888;">
            Si el botón no funciona, ve a ${sitioUrl()}/entrar y entra con este mismo correo (${email}).
          </p>
        </div>
      `,
    });
  } catch (err) {
    console.error('[email] Falló el envío del recordatorio de racha:', err);
  }
}
