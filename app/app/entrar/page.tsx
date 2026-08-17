'use client';

// Login/registro passwordless (26-AUTH-MODERNO: OTP por email como método
// primario para apps vendidas por Hotmart — la cuenta se crea con el correo
// de la compra, no con un teléfono). Antes solo mandaba un enlace mágico: el
// estudiante tenía que salir de la app, abrir el correo y volver — pedido
// explícito del usuario (2026-08-11): que se sienta más simple y directo.
// Ahora el correo trae un CÓDIGO (ver CODIGO_LARGO) que se escribe en la misma
// pantalla, sin cambiar de pestaña ni copiar/pegar un enlace. Conectado a
// Supabase Auth real (signInWithOtp/verifyOtp) — requiere que la plantilla de
// correo "Magic Link" en el dashboard de Supabase incluya {{ .Token }} para
// que el código aparezca en el cuerpo del correo (si solo trae el enlace,
// igual funciona tocándolo, pero no muestra el código a escribir).

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, KeyRound, Loader2, Mail } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { asociarReferidoSiAplica } from '@/lib/referral';

/** El mark oficial de Google (4 colores) — estándar en botones "Continuar con Google". */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.81.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.96v2.33A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.95 10.7A5.4 5.4 0 0 1 3.67 9c0-.59.1-1.17.28-1.7V4.97H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.03z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.51.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.97L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58z" />
    </svg>
  );
}

// Supabase envía el código real en 8 dígitos (confirmado en la app, no en la
// documentación — el valor "6" que aparece en varias guías de Supabase es
// para el flujo de teléfono/SMS, no coincide con lo que llega por correo).
const CODIGO_LARGO = 8;

/** Fila de 6 casillas para el código — cada dígito en su propio input, con
 * autoavance al escribir y retroceso con Backspace (patrón estándar de
 * verificación por código, sin pegar/copiar nada). */
function CodigoInput({ valor, onChange }: { valor: string; onChange: (v: string) => void }) {
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  function setDigito(i: number, d: string) {
    const limpio = d.replace(/\D/g, '').slice(-1);
    const siguiente = valor.split('');
    siguiente[i] = limpio;
    onChange(siguiente.join('').slice(0, CODIGO_LARGO));
    if (limpio && i < CODIGO_LARGO - 1) refs.current[i + 1]?.focus();
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !valor[i] && i > 0) refs.current[i - 1]?.focus();
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const pegado = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODIGO_LARGO);
    if (!pegado) return;
    e.preventDefault();
    onChange(pegado);
    refs.current[Math.min(pegado.length, CODIGO_LARGO - 1)]?.focus();
  }

  return (
    <div className="flex w-full justify-between gap-1.5" onPaste={handlePaste}>
      {Array.from({ length: CODIGO_LARGO }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          autoFocus={i === 0}
          inputMode="numeric"
          maxLength={1}
          value={valor[i] ?? ''}
          onChange={(e) => setDigito(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          aria-label={`Dígito ${i + 1} de ${CODIGO_LARGO}`}
          className="h-14 w-full rounded-[var(--radius-button)] border-2 border-[var(--surface-2)] bg-[var(--surface)] text-center text-[18px] font-bold text-[var(--text-primary)] outline-none focus:border-[var(--accent-2)] [font-family:var(--font-display)]"
        />
      ))}
    </div>
  );
}

function EntrarForm() {
  const router = useRouter();
  const params = useSearchParams();
  const plan = params.get('plan');
  const [email, setEmail] = useState('');
  const [paso, setPaso] = useState<'correo' | 'codigo'>('correo');
  const [codigo, setCodigo] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Camino alterno: si el estudiante toca el enlace del correo en vez de
  // escribir el código, Supabase redirige aquí con la sesión en el hash de la
  // URL (#access_token=...). El cliente de Supabase la detecta y la guarda
  // SOLO si se crea una instancia en esta pantalla al cargar — por eso este
  // efecto existe aunque no haga nada más: sin él, ese enlace no completaba
  // el login (quedaba con el hash en la URL, sin sesión real).
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        asociarReferidoSiAplica();
        router.push('/app');
      }
    });
  }, [router]);

  async function handleEnviarCodigo(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@') || cargando) return;
    setCargando(true);
    setError(null);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        // Si tocan el enlace del correo en vez de escribir el código, que
        // vuelvan a /entrar — es la única pantalla que sabe recibir la sesión.
        emailRedirectTo:
          typeof window !== 'undefined' ? `${window.location.origin}/entrar` : undefined,
      },
    });
    setCargando(false);
    if (err) {
      setError('No pudimos enviar el código. Revisa tu correo e intenta de nuevo.');
      return;
    }
    setPaso('codigo');
  }

  async function handleVerificarCodigo(e: React.FormEvent) {
    e.preventDefault();
    if (codigo.length !== CODIGO_LARGO || cargando) return;
    setCargando(true);
    setError(null);
    const supabase = createClient();
    const { error: err } = await supabase.auth.verifyOtp({ email, token: codigo, type: 'email' });
    setCargando(false);
    if (err) {
      setError('Ese código no es válido o ya venció. Pide uno nuevo.');
      setCodigo('');
      return;
    }
    asociarReferidoSiAplica();
    router.push('/app');
  }

  const codigoCompleto = codigo.length === CODIGO_LARGO;

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[375px] flex-col items-center justify-center gap-6 px-5 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-card)] bg-[var(--accent)]">
        {paso === 'correo' ? (
          <Mail size={24} className="text-[var(--bg)]" />
        ) : (
          <KeyRound size={24} className="text-[var(--bg)]" />
        )}
      </div>

      {paso === 'correo' ? (
        <>
          <h1 className="text-[24px] font-bold leading-tight text-[var(--text-primary)] [font-family:var(--font-display)]">
            {plan === 'gratis' ? 'Crea tu cuenta gratis' : 'Entra con tu correo'}
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)]">
            Sin contraseñas que recordar: te mandamos un código a tu correo.
          </p>

          <form onSubmit={handleEnviarCodigo} className="flex w-full flex-col gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="h-12 w-full rounded-[var(--radius-button)] border-2 border-[var(--surface-2)] bg-[var(--surface)] px-4 text-[16px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-2)]"
            />
            {error && <p className="text-[13px] text-[var(--gold)]">{error}</p>}
            <button
              type="submit"
              disabled={cargando}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] active:translate-y-[2px] active:shadow-none disabled:opacity-60 [font-family:var(--font-display)]"
            >
              {cargando ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>
                  Enviarme el código
                  <KeyRound size={16} strokeWidth={2.5} />
                </>
              )}
            </button>
            <div className="my-1 flex items-center gap-3 text-[12px] text-[var(--text-secondary)]">
              <span className="h-px flex-1 bg-[var(--surface-2)]" /> o <span className="h-px flex-1 bg-[var(--surface-2)]" />
            </div>
            <button
              type="button"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] border-2 border-[var(--surface-2)] bg-[var(--surface)] text-[15px] font-semibold text-[var(--text-primary)]"
            >
              <GoogleIcon />
              Continuar con Google
            </button>
          </form>
        </>
      ) : (
        <>
          <h1 className="text-[24px] font-bold leading-tight text-[var(--text-primary)] [font-family:var(--font-display)]">
            Revisa tu correo
          </h1>
          <p className="text-[14px] text-[var(--text-secondary)]">
            Te enviamos un mensaje a <strong className="text-[var(--text-primary)]">{email}</strong>.
          </p>

          <div className="flex w-full items-start gap-2.5 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent-2)_30%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_8%,var(--surface))] p-3.5 text-left">
            <Mail size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-[var(--accent-2)]" />
            <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">
              <span className="font-semibold text-[var(--text-primary)]">La forma más rápida: </span>
              abre ese correo y toca el botón para entrar — no hace falta escribir nada. Si prefieres, también puedes escribir el código de abajo.
            </p>
          </div>

          <form onSubmit={handleVerificarCodigo} className="flex w-full flex-col gap-4">
            <CodigoInput valor={codigo} onChange={setCodigo} />
            {error && <p className="text-[13px] text-[var(--gold)]">{error}</p>}
            <button
              type="submit"
              disabled={!codigoCompleto || cargando}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] active:translate-y-[2px] active:shadow-none disabled:opacity-40 [font-family:var(--font-display)]"
            >
              {cargando ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <>
                  <CheckCircle2 size={18} strokeWidth={2.5} />
                  Entrar
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setPaso('correo');
                setCodigo('');
              }}
              className="text-[13px] font-semibold text-[var(--text-secondary)] underline decoration-dotted underline-offset-4"
            >
              Usar otro correo o reenviar el código
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default function EntrarPage() {
  return (
    <Suspense fallback={null}>
      <EntrarForm />
    </Suspense>
  );
}
