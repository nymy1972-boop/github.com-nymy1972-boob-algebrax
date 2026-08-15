export default function Page() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-16 text-[var(--text-primary)] [font-family:var(--font-body)]">
      <h1 className="text-[28px] font-bold [font-family:var(--font-display)]">Términos y Condiciones</h1>
      <p className="mt-2 text-[13px] text-[var(--text-secondary)]">Última actualización: agosto de 2026</p>

      <p className="mt-6 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        AlgebraX es operada por Nymy, persona natural, con domicilio en Canadá ("nosotros"). Al crear
        una cuenta o usar la app, aceptas estos términos.
      </p>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">1. Qué es AlgebraX</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        AlgebraX es una aplicación educativa de práctica de álgebra para estudiantes de secundaria y
        bachillerato. Ofrece un plan gratuito con acceso limitado y un plan Premium de pago con
        acceso completo a todos los módulos y al Modo Examen ilimitado.
      </p>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">2. Tu cuenta</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        <li>El acceso es passwordless: entras con un código que te enviamos por correo, no con contraseña.</li>
        <li>Eres responsable de mantener el acceso a tu correo seguro — quien entre a tu correo puede entrar a tu cuenta.</li>
        <li>No compartas tu cuenta con otra persona; es de uso personal.</li>
      </ul>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">3. Suscripción Premium</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        <li>La compra se procesa a través de Hotmart, con los precios y frecuencia (mensual o anual) que veas en el momento de pagar.</li>
        <li>El plan anual se renueva automáticamente al terminar el período, salvo que canceles antes.</li>
        <li>Puedes cancelar en cualquier momento desde el panel de compra de Hotmart — dejas de tener acceso al terminar el período ya pagado, sin más cobros.</li>
        <li>Condiciones de reembolso: ver nuestra <a href="/reembolsos" className="underline">Política de Reembolsos</a>.</li>
      </ul>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">4. Uso aceptable</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        No está permitido: intentar acceder a cuentas de otros estudiantes, revender o redistribuir
        el contenido de la app, ni usar automatización (bots) para abusar del servicio o del sistema
        de explicaciones con IA.
      </p>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">5. Contenido educativo, no una garantía de resultado</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        AlgebraX es una herramienta de práctica y refuerzo. No sustituye a un profesor ni garantiza
        una calificación específica en tu examen — el resultado depende de tu propio estudio y
        constancia.
      </p>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">6. Cambios al servicio</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        Podemos actualizar la app, agregar o quitar funciones, o modificar estos términos. Si un
        cambio afecta materialmente tu suscripción, te avisaremos por correo con anticipación
        razonable.
      </p>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">7. Menores de edad</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        Si eres menor de edad, la suscripción debe ser contratada por un adulto responsable (madre,
        padre o tutor) usando su propio método de pago.
      </p>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">8. Contacto</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        Preguntas sobre estos términos: <a href="mailto:soporte@algebrax.app" className="underline">soporte@algebrax.app</a>.
      </p>
    </div>
  );
}
