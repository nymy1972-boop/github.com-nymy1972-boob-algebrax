'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Oferta } from '@/components/landing/Oferta';
import { CheckCustom, StickyCtaMobile } from '@/components/landing/ui';

// Paywall in-app — aparece DESPUÉS de la primera victoria (diagnóstico), nunca
// antes. Freemium (02C nicho Educación): siempre existe un camino gratis visible
// ("Seguir gratis por ahora") — la Constitución de AlgebraX prohíbe bloquear el
// acceso. El CTA de pago lleva a /entrar: el cobro real se resuelve ahí, tras
// crear la cuenta (Sesión 6 conecta Hotmart).
//
// Ajustado con la revisión de "reglas de paywall" que trajo el usuario (Gemini):
// SE ADOPTARON → headline orientado a RESULTADO (no features) + personalización
// dinámica según el tema débil del diagnóstico (mismo patrón que ya usa el
// onboarding y la sección "app por dentro").
// SE DESCARTARON (documentado, no ejecutado en silencio):
//   - Timeline "Hoy → Día 5 → Día 7" de un trial con cobro automático: asume
//     un modelo de TRIAL que NO es el nuestro. Decidimos Freemium sin fecha de
//     cobro automático (Sesión 1, 02C) precisamente para eliminar el miedo
//     "me van a cobrar y se me va a olvidar cancelar" de raíz — no hace falta
//     el timeline si no hay cobro que temer.
//   - Rating "4.8/5 de 2,000 estudiantes" + testimonio de "Sofi M.": son datos
//     INVENTADOS. El SO prohíbe testimonios/ratings falsos (19-PAGINA-DE-VENTAS,
//     regla dura: "una landing con testimonios falsos es fraude"). Cuando existan
//     3+ testimonios reales, se agregan — mientras tanto la prueba social es
//     honesta (la garantía, verificable).
//   - Pop-up de "exit-intent" con oferta de rescate al tocar la X: technique
//     válida en general, pero en este paywall ya existe una salida sin fricción
//     ("Seguir gratis por ahora") — meter un pop-up de último segundo encima
//     de esa salida ya-generosa se sentiría como un dark pattern, algo que la
//     Constitución de la app prohíbe explícitamente.

const TEMA_LABELS: Record<string, string> = {
  'Ecuaciones básicas': 'las ecuaciones básicas',
  'Despejes con signos': 'los despejes con signos',
  Factorización: 'la factorización',
};

function PaywallContent() {
  const params = useSearchParams();
  const temaRaw = params.get('tema');
  const tema = temaRaw ? (TEMA_LABELS[temaRaw] ?? temaRaw) : null;
  const reduce = useReducedMotion();

  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div className="mx-auto flex max-w-[1140px] items-center px-5 pt-6">
        <Link href="/onboarding" className="flex items-center gap-1.5 text-[14px] font-semibold text-[var(--text-secondary)]">
          <ArrowLeft size={16} /> Volver
        </Link>
      </div>

      {/* Hero orientado a RESULTADO — personalizado con el tema débil del diagnóstico si existe */}
      <motion.div
        id="hero"
        initial={{ opacity: 0, y: reduce ? 0 : 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0.2 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-[620px] px-5 pb-8 pt-6 text-center">
        <h1 className="text-balance text-[28px] font-bold leading-[1.15] [font-family:var(--font-display)] md:text-[36px]">
          {tema ? (
            <>
              Tu plan para practicar <span className="text-[var(--accent)]">{tema}</span> está listo
            </>
          ) : (
            <>
              Practica álgebra entrenando <span className="text-[var(--accent)]">10 min al día</span>
            </>
          )}
        </h1>
        <p className="mx-auto mt-3 max-w-[440px] text-[15px] text-[var(--text-secondary)]">
          Ese hueco en el estómago cuando dicen "examen sorpresa" — se va cuando entiendes el porqué de cada paso, no solo la respuesta.
        </p>

        <ul className="mx-auto mt-6 flex max-w-[400px] flex-col gap-3 text-left">
          <li className="flex items-start gap-3 text-[15px]">
            <CheckCustom />
            <span>
              <strong className="font-semibold">El Descifrador de Pasos:</strong> explicación interactiva del porqué de cada paso, no solo la respuesta
            </span>
          </li>
          <li className="flex items-start gap-3 text-[15px]">
            <CheckCustom />
            <span>Simulacros cronometrados: sin cámara, sin copiar — practicas sin ese vacío de quedarte en blanco</span>
          </li>
          <li className="flex items-start gap-3 text-[15px]">
            <CheckCustom />
            <span>Entrena a tu ritmo y entra a clase con confianza</span>
          </li>
        </ul>

        {/* Prueba social honesta — nunca un rating o testimonio inventado (19-PAGINA-DE-VENTAS) */}
        <div className="mx-auto mt-6 flex max-w-[400px] items-center justify-center gap-2 rounded-full border border-[color-mix(in_oklab,var(--success)_30%,transparent)] bg-[color-mix(in_oklab,var(--success)_8%,var(--surface))] px-4 py-2 text-[13px] font-semibold text-[var(--success)]">
          <ShieldCheck size={16} />
          Garantía de satisfacción de 7 días
        </div>
      </motion.div>

      <Oferta
        kicker="TU PLAN"
        tituloMarked="Practica álgebra a tu ritmo desde [acento]$0.14 al día[/acento]"
        garantiaCorta="Garantía de satisfacción de 7 días"
        stack={{
          lineas: [
            { resultado: 'AlgebraX Premium: todos los módulos + Modo Examen ilimitado (12 meses)', valor: '$120' },
            { resultado: 'Reporte de errores comunes para repasar solo lo que fallas', valor: '$25' },
            { resultado: 'Simulacros cronometrados para practicar como en una evaluación', valor: '$19' },
          ],
          totalTachado: '$164',
          nota: 'Hoy: $3.33/mes (se cobra $39.99/año)',
        }}
        anual={{
          nombre: 'Anual',
          badge: 'MÁS POPULAR',
          precioMes: '$3.33',
          totalAnual: 'Se cobra $39.99/año',
          ahorro: 'El equivalente a 4 meses gratis vs. mensual',
          descomposicionDia: 'menos de $0.14 al día',
          ctaLabel: 'Quiero Premium',
          ctaHref: '/entrar?plan=anual',
          features: [
            'Todos los módulos de álgebra desbloqueados',
            'Modo Examen ilimitado con temporizador',
            'Reporte de errores comunes para repasar',
            'Sin publicidad ni límites diarios',
          ],
        }}
        mensual={{
          nombre: 'Mensual',
          precioMes: '$4.99',
          ctaLabel: 'Quiero Premium mensual',
          ctaHref: '/entrar?plan=mensual',
          features: [
            'Todos los módulos de álgebra desbloqueados',
            'Modo Examen ilimitado con temporizador',
            'Cancelas cuando quieras',
          ],
        }}
      />

      <div id="cta-final" className="mx-auto max-w-[620px] px-5 pb-16 text-center">
        <Link
          href="/app"
          className="text-[15px] font-semibold text-[var(--text-secondary)] underline decoration-[var(--surface-2)] underline-offset-4 hover:text-[var(--text-primary)]"
        >
          Seguir gratis por ahora
        </Link>
      </div>

      <StickyCtaMobile labelComercial="Quiero Premium" href="/entrar?plan=anual" labelPre="Ver plan y precios" />
    </div>
  );
}

export default function PaywallPage() {
  return (
    <Suspense fallback={null}>
      <PaywallContent />
    </Suspense>
  );
}
