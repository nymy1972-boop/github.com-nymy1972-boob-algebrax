'use client';

import { Camera, CircleHelp, AlarmClock, Ban } from 'lucide-react';
import { Hero } from '@/components/landing/Hero';
import { Problema } from '@/components/landing/Problema';
import { Agitacion } from '@/components/landing/Agitacion';
import { Solucion } from '@/components/landing/Solucion';
import { AppPorDentro } from '@/components/landing/AppPorDentro';
import { Oferta } from '@/components/landing/Oferta';
import { Garantia } from '@/components/landing/Garantia';
import { Faq } from '@/components/landing/Faq';
import { CtaFinal } from '@/components/landing/CtaFinal';
import { FooterLegal } from '@/components/landing/FooterLegal';
import { StickyCtaMobile } from '@/components/landing/ui';

// Modelo 2 (onboarding-first / freemium, nicho Educación de 02C): el CTA lleva
// a /onboarding — el cobro se cierra después, en el paywall in-app (Sesión 4).
const CTA_HREF = '/onboarding';
const CTA_LABEL = 'Crear mi cuenta gratis';

export default function Home() {
  return (
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      {/* 1. HERO */}
      <Hero
        appName="AlgebraX"
        loginHref="/entrar"
        h1Marked="[acento]Entiende el porqué[/acento] y aprueba tu examen de álgebra"
        subtitleMarked="El Descifrador de Pasos te muestra [b]dónde te pierdes[/b], no solo la respuesta."
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
        socialProof={<span>Garantía Hotmart de 7 días — sin preguntas</span>}
        visualPlaceholderSugerencia="captura del diagnóstico exprés mostrando en qué paso se equivocó el estudiante"
      />

      {/* 2. PROBLEMA */}
      <Problema
        titulo="¿Te suena?"
        preguntas={[
          { icon: Camera, textoMarked: '¿Copias en Photomath y te quedas en blanco en el examen?' },
          { icon: CircleHelp, textoMarked: '¿Te da vergüenza preguntar en clase y quedar como el tonto?' },
          { icon: AlarmClock, textoMarked: '¿Sientes un nudo en el estómago cuando anuncian examen sorpresa?' },
          { icon: Ban, textoMarked: '¿Odias que las apps te bloqueen justo cuando más necesitas practicar?' },
        ]}
      />

      {/* 3. AGITACIÓN */}
      <Agitacion
        frases={[
          'Cada semana que pasa sin entender, [b]se acumula más miedo[/b] al examen final.',
          'En 6 meses vas a estar en el mismo lugar — pero con [acento]6 meses menos[/acento] para prepararte.',
          'Copiar la tarea no te salva en el examen: ahí no hay cámara ni Photomath.',
        ]}
        contraste={{
          labelHoy: 'Hoy',
          hoy: 'Copias la tarea a las 10 PM y sigues sin entender nada.',
          labelFuturo: 'Si nada cambia',
          futuro: 'Mismo miedo al examen — con menos tiempo para arreglarlo.',
        }}
      />

      {/* 4. SOLUCIÓN */}
      <Solucion
        tituloMarked="El método que sí te enseña [acento]a pensar[/acento]"
        mecanismo="el Descifrador de Pasos"
        bigIdeaMarked="No es que seas malo para los números — es que nadie te mostró [b]en qué paso te perdiste[/b]. El Descifrador te lo señala, y te explica el porqué."
        pasos={[
          { titulo: 'Eliges el ejercicio', detalle: 'El que te bloqueó en la tarea o en clase.' },
          { titulo: 'El Descifrador señala tu error', detalle: 'Te muestra en qué paso exacto y por qué.' },
          { titulo: 'Practicas sin miedo', detalle: 'Resuelves uno parecido tú solo, sin castigos.' },
        ]}
        antesDespues={{
          labelAntes: 'Antes',
          antes: 'Copiabas la respuesta y llegabas al examen en blanco.',
          labelDespues: 'Después',
          despues: 'Entiendes la lógica y resuelves el ejercicio tú mismo.',
        }}
      />

      {/* 5. LA APP POR DENTRO — placeholders honestos (app interna: Sesión 5, PENDIENTE en ESTADO.md) */}
      <AppPorDentro
        tituloMarked="Así se ve [acento]tu progreso[/acento] día a día"
        frames={[
          { label: 'Tu diagnóstico en 3 preguntas', nombrePantalla: 'Diagnóstico' },
          { label: 'El paso exacto donde te confundiste', nombrePantalla: 'Descifrador de Pasos' },
          { label: 'Tu racha y tus módulos del día', nombrePantalla: 'Inicio' },
          { label: 'Practica contrarreloj como en el examen real', nombrePantalla: 'Modo Examen' },
        ]}
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
      />

      {/* 6. OFERTA — freemium sin trial (02C nicho Educación): CTA lleva a /onboarding */}
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
          ctaLabel: CTA_LABEL,
          ctaHref: CTA_HREF,
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
          ctaLabel: CTA_LABEL,
          ctaHref: CTA_HREF,
          features: [
            'Todos los módulos de álgebra desbloqueados',
            'Modo Examen ilimitado con temporizador',
            'Cancelas cuando quieras',
          ],
        }}
      />

      {/* 7. GARANTÍA */}
      <Garantia
        nombre="la Garantía del Primer Paso Entendido"
        condicionMarked="Si en 7 días no entiendes [b]al menos un paso[/b] que antes te bloqueaba, escribes un correo y te devolvemos todo."
        pisoLegal="Respaldada por la garantía Hotmart de 7 días"
      />

      {/* 8. FAQ */}
      <Faq
        items={[
          {
            pregunta: '¿Para qué pagar si busco la respuesta gratis en TikTok o YouTube?',
            respuestaMarked:
              'Un video te explica una vez; el Descifrador [b]te corrige en tu propio ejercicio[/b], las veces que necesites.',
          },
          {
            pregunta: '¿Es otra app infantil que voy a desinstalar en 3 días?',
            respuestaMarked:
              'No hay vidas ni castigos, y está hecha para tu nivel de secundaria/bachillerato — no para niños de primaria.',
          },
          {
            pregunta: '¿Los ejercicios se parecen a los de mi colegio?',
            respuestaMarked:
              'Sí: álgebra básica (ecuaciones, despejes, factorización), el temario que realmente te toman en examen.',
          },
          {
            pregunta: '¿Qué pasa si no tengo tarjeta propia para pagar?',
            respuestaMarked:
              'Puedes [b]empezar gratis sin tarjeta[/b]; cuando quieras más práctica, tus papás activan Premium en un clic.',
          },
          {
            pregunta: '¿Qué pasa si no me sirve?',
            respuestaMarked:
              'Tienes la Garantía del Primer Paso Entendido: [b]un correo y te devolvemos todo[/b].',
          },
        ]}
      />

      {/* 9. CTA FINAL */}
      <CtaFinal
        h2Marked="Entra a tu examen [acento]sin miedo[/acento]"
        futurePacingMarked="Imagina abrir la hoja de examen y saber exactamente qué hacer en cada ejercicio, sin buscar tu teléfono."
        ctaLabel={CTA_LABEL}
        ctaHref={CTA_HREF}
        recap="Garantía del Primer Paso Entendido · Empieza gratis, sin tarjeta"
        psMarked="PS: AlgebraX te muestra el paso exacto donde te pierdes con el Descifrador de Pasos — no solo la respuesta. Empieza gratis hoy, sin tarjeta, y si en 7 días no entiendes al menos un paso nuevo, te devolvemos todo con la Garantía del Primer Paso Entendido."
      />

      {/* 10. FOOTER LEGAL — páginas legales reales: Sesión 6 (47-LEGAL-FISCAL) */}
      <FooterLegal
        appName="AlgebraX"
        soporteEmail="soporte@algebrax.app"
        enlaces={[
          { label: 'Privacidad', href: '/privacidad' },
          { label: 'Términos y Condiciones', href: '/terminos' },
          { label: 'Reembolsos', href: '/reembolsos' },
          { label: 'Aviso de IA', href: '/aviso-ia' },
        ]}
      />

      <StickyCtaMobile labelComercial={CTA_LABEL} href={CTA_HREF} />
    </div>
  );
}
