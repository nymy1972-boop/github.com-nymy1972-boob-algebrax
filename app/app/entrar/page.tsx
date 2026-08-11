'use client';

// Login/registro passwordless (26-AUTH-MODERNO: magic link/OTP como método
// primario para apps vendidas por Hotmart; Google como complemento). Supabase
// se conecta de verdad en la Sesión 6 (requiere el proyecto real del usuario) —
// por ahora la UI queda lista y honesta: no finge un login exitoso.

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Mail } from 'lucide-react';

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
            className="flex h-12 w-full items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
          >
            Enviarme el enlace mágico
          </button>
          <div className="my-1 flex items-center gap-3 text-[12px] text-[var(--text-secondary)]">
            <span className="h-px flex-1 bg-[var(--surface-2)]" /> o <span className="h-px flex-1 bg-[var(--surface-2)]" />
          </div>
          <button
            type="button"
            className="flex h-12 w-full items-center justify-center rounded-[var(--radius-button)] border-2 border-[var(--surface-2)] bg-[var(--surface)] text-[15px] font-semibold text-[var(--text-primary)]"
          >
            Continuar con Google
          </button>
        </form>
      ) : (
        <div className="w-full rounded-[var(--radius-card)] border-2 border-[var(--success)] bg-[color-mix(in_oklab,var(--success)_10%,var(--surface))] p-5 text-[14px] text-[var(--text-primary)]">
          Te enviamos un enlace a <strong>{email}</strong>. Ábrelo desde tu correo para entrar.
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
