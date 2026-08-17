export default function Page() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-16 text-[var(--text-primary)] [font-family:var(--font-body)]">
      <h1 className="text-[28px] font-bold [font-family:var(--font-display)]">Política de Reembolsos</h1>
      <p className="mt-2 text-[13px] text-[var(--text-secondary)]">Última actualización: agosto de 2026</p>

      <p className="mt-6 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        Tu compra de AlgebraX Premium se procesa a través de Hotmart. Las condiciones de reembolso
        aplicables son las que Hotmart tiene vigentes para este producto en el momento de tu compra
        — puedes consultarlas directamente en tu recibo de compra o en la plataforma de Hotmart.
      </p>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">Cómo pedir tu reembolso</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        <li>Escríbenos a soporte@algebrax.app con el correo que usaste para comprar.</li>
        <li>Confirmamos tu compra y procesamos la devolución por el mismo medio de pago, a través de Hotmart.</li>
        <li>El dinero puede tardar unos días hábiles en reflejarse, según tu banco o método de pago.</li>
      </ol>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">Suscripción anual</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        Puedes cancelar la renovación automática en cualquier momento desde Hotmart — seguirás
        teniendo acceso hasta el final del período ya pagado. Fuera del plazo de reembolso vigente
        de Hotmart, la suscripción no es reembolsable proporcionalmente.
      </p>

      <p className="mt-8 text-[13px] leading-relaxed text-[var(--text-secondary)]">
        Si tienes dudas sobre el plazo o las condiciones exactas de tu compra, escríbenos a{' '}
        <a href="mailto:soporte@algebrax.app" className="underline">soporte@algebrax.app</a> y te
        confirmamos con la información real de tu transacción.
      </p>
    </div>
  );
}
