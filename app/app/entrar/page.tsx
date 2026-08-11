'use client';

// Login/registro passwordless (26-AUTH-MODERNO: magic link/OTP como método
// primario para apps vendidas por Hotmart; Google como complemento). Supabase
// se conecta de verdad en la Sesión 6 (requiere el proyecto real del usuario) —
// por ahora la UI queda lista y honesta: no finge un login exitoso.

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Mail, Send } from 'lucide-react';

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

function EntrarForm() {
  const params = useSearchParams();
  const plan = params.get('plan');
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) return;
    // TODO Sesión 6: conectar Supabase Auth (magic link) cuando exista el proyecto real.
    setEnviado(true);
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[375px] flex-col items-center justify-center gap-6 px-5 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-[var(--radius-card)] bg-[var(--accent)]">
        <Mail size={24} className="text-[var(--bg)]" />
      </div>
      <h1 className="text-[24px] font-bold leading-tight text-[var(--text-primary)] [font-family:var(--font-display)]">
        {plan === 'gratis' ? 'Crea tu cuenta gratis' : 'Entra con tu correo'}
      </h1>
      <p className="text-[14px] text-[var(--text-secondary)]">
        Sin contraseñas que recordar: te mandamos un enlace mágico a tu correo.
      </p>

      {!enviado ? (
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@correo.com"
            className="h-12 w-full rounded-[var(--radius-button)] border-2 border-[var(--surface-2)] bg-[var(--surface)] px-4 text-[16px] text-[var(--text-primary)] outline-none focus:border-[var(--accent-2)]"
          />
          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
          >
            <Send size={16} strokeWidth={2.5} />
            Enviarme el enlace mágico
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
      ) : (
        <div className="flex w-full items-start gap-3 rounded-[var(--radius-card)] border-2 border-[var(--success)] bg-[color-mix(in_oklab,var(--success)_10%,var(--surface))] p-5 text-left text-[14px] text-[var(--text-primary)]">
          <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-[var(--success)]" />
          <span>
            Te enviamos un enlace a <strong>{email}</strong>. Ábrelo desde tu correo para entrar.
          </span>
        </div>
      )}

      <p className="text-[11px] leading-relaxed text-[var(--text-secondary)]">
        ⚠️ Cuentas reales: se conectan en la Sesión 6 del proyecto (cuando exista Supabase). Por ahora estás probando el flujo.
      </p>
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
