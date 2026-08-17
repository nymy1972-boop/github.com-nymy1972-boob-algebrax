export default function Page() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-16 text-[var(--text-primary)] [font-family:var(--font-body)]">
      <h1 className="text-[28px] font-bold [font-family:var(--font-display)]">Política de Privacidad</h1>
      <p className="mt-2 text-[13px] text-[var(--text-secondary)]">Última actualización: agosto de 2026</p>

      <p className="mt-6 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        AlgebraX es operada por Nymy, persona natural, con domicilio en Canadá ("nosotros"). Esta
        política explica qué datos recogemos cuando usas la aplicación, para qué los usamos y qué
        derechos tienes sobre ellos.
      </p>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">1. Qué datos recogemos</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        <li>Tu correo electrónico, para crear tu cuenta y enviarte el acceso (no usamos contraseñas).</li>
        <li>Tu nombre y grado escolar, si los ingresas durante el onboarding.</li>
        <li>Tu progreso dentro de la app: racha, módulos practicados, aciertos, resultados de exámenes.</li>
        <li>Datos técnicos básicos (tipo de dispositivo, errores de la app) para poder corregir fallos.</li>
        <li>Si compras Premium, Hotmart procesa el pago directamente — nosotros nunca vemos ni guardamos tu tarjeta.</li>
      </ul>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">2. Para qué los usamos</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        <li>Darte acceso a tu cuenta y guardar tu progreso entre sesiones y dispositivos.</li>
        <li>Personalizar qué módulo te recomendamos según tus resultados.</li>
        <li>Enviarte correos de acceso o relacionados con tu compra — nunca marketing sin tu permiso.</li>
        <li>Mejorar la app corrigiendo errores y midiendo qué funciona.</li>
      </ul>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">3. Inteligencia artificial</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        Cuando fallas un ejercicio, la app puede enviar el texto de la pregunta y tu respuesta a un
        proveedor externo de IA (DeepSeek) para generar una explicación. No enviamos tu nombre,
        correo ni ningún otro dato personal en esa consulta — solo el contenido matemático del
        ejercicio. Más detalle en nuestro <a href="/aviso-ia" className="underline">Aviso sobre IA</a>.
      </p>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">4. Con quién compartimos datos</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        No vendemos tus datos a nadie. Los compartimos solo con los proveedores que necesitamos para
        operar la app: Supabase (base de datos y autenticación), Hotmart (procesamiento de pagos),
        Resend (envío de correos) y DeepSeek (explicaciones de IA, sin datos personales). Cada uno
        procesa los datos únicamente para prestarnos su servicio.
      </p>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">5. Tus derechos</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        Puedes pedirnos en cualquier momento: acceder a tus datos, corregirlos, o eliminar tu cuenta
        y todo tu historial de forma permanente. Escríbenos a{' '}
        <a href="mailto:nymy1972@gmail.com" className="underline">nymy1972@gmail.com</a> y lo
        resolvemos en un plazo razonable (máximo 30 días).
      </p>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">6. Menores de edad</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        AlgebraX está pensada para estudiantes de secundaria/bachillerato, muchos de ellos menores de
        edad. La compra de la suscripción debe hacerla un adulto responsable (madre, padre o tutor),
        usando su propio método de pago. Si eres menor y quieres usar la app, pide a un adulto que
        cree la cuenta o autorice su uso.
      </p>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">7. Seguridad</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        Tus datos están protegidos con acceso restringido por cuenta (cada estudiante solo puede ver
        su propia información) y conexiones cifradas. Ningún sistema es 100% infalible, pero tomamos
        medidas razonables para proteger tu información.
      </p>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">8. Contacto</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        Para cualquier pregunta sobre privacidad, escribe a{' '}
        <a href="mailto:nymy1972@gmail.com" className="underline">nymy1972@gmail.com</a>.
      </p>
    </div>
  );
}
