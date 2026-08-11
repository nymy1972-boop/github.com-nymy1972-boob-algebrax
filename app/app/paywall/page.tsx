'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Oferta } from '@/components/landing/Oferta';

// Paywall in-app — aparece DESPUÉS de la primera victoria (diagnóstico), nunca
// antes. Freemium (02C nicho Educación): siempre existe un camino gratis visible
// ("Seguir gratis por ahora") — la Constitución de AlgebraX prohíbe bloquear el
// acceso. El CTA de pago lleva a /entrar: el cobro real se resuelve ahí, tras
// crear la cuenta (Sesión 6 conecta Hotmart).

export default function PaywallPage() {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div className="mx-auto flex max-w-[1140px] items-center px-5 pt-6">
        <Link href="/onboarding" className="flex items-center gap-1.5 text-[14px] font-semibold text-[var(--text-secondary)]">
          <ArrowLeft size={16} /> Volver
        </Link>
      </div>

      <Oferta
        tituloMarked="Empieza gratis. Domina álgebra por [acento]$0.14 al día[/acento]"
        stack={{
          lineas: [
            { resultado: 'AlgebraX Premium: todos los módulos + Modo Examen ilimitado (12 meses)', valor: '$120' },
            { resultado: 'Reporte de errores comunes para repasar solo lo que fallas', valor: '$25' },
            { resultado: 'Simulacros cronometrados iguales a tu examen real', valor: '$19' },
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

      <div className="mx-auto max-w-[620px] px-5 pb-16 text-center">
        <Link
          href="/app"
          className="text-[15px] font-semibold text-[var(--text-secondary)] underline decoration-[var(--surface-2)] underline-offset-4 hover:text-[var(--text-primary)]"
        >
          Seguir gratis por ahora
        </Link>
      </div>
    </div>
  );
}
