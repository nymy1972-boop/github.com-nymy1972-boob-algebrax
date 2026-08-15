export default function Page() {
  return (
    <div className="mx-auto max-w-[640px] px-6 py-16 text-[var(--text-primary)] [font-family:var(--font-body)]">
      <h1 className="text-[28px] font-bold [font-family:var(--font-display)]">Aviso sobre Inteligencia Artificial</h1>
      <p className="mt-2 text-[13px] text-[var(--text-secondary)]">Última actualización: agosto de 2026</p>

      <p className="mt-6 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        AlgebraX usa un modelo de IA de un proveedor externo (DeepSeek) para una única función:
        generar una explicación adicional cuando fallas un ejercicio de práctica.
      </p>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">Qué datos se envían a la IA</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        Solo el texto del ejercicio y tu respuesta incorrecta. Nunca enviamos tu nombre, correo, ni
        ningún dato que te identifique — la consulta a la IA es anónima desde el punto de vista del
        proveedor.
      </p>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">Qué pasa si la IA falla</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        Si el servicio de IA no responde o falla, la app muestra una explicación de repuesto
        preparada por nosotros — nunca te deja sin explicación ni bloquea tu práctica.
      </p>

      <h2 className="mt-8 text-[18px] font-bold [font-family:var(--font-display)]">Límites de la explicación con IA</h2>
      <p className="mt-3 text-[14px] leading-relaxed text-[var(--text-secondary)]">
        La explicación es una ayuda de estudio generada automáticamente. Aunque revisamos que el
        contenido matemático sea correcto en nuestros ejercicios, una explicación de IA puede
        ocasionalmente redactarse de forma imperfecta. Si ves algo que no tiene sentido, repórtalo a{' '}
        <a href="mailto:soporte@algebrax.app" className="underline">soporte@algebrax.app</a>.
      </p>

      <p className="mt-8 text-[13px] leading-relaxed text-[var(--text-secondary)]">
        Los ejercicios y módulos de AlgebraX están escritos y curados por nosotros — la IA no genera
        ejercicios nuevos, solo explica los que ya existen.
      </p>
    </div>
  );
}
