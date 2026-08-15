'use client';

import { use, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Gem, Lightbulb, Lock, NotebookPen, Sparkles } from 'lucide-react';
import { getModulo, type PreguntaModulo } from '@/lib/modulos';
import { registrarAcierto, ejerciciosGratisHoy, leerProgreso, registrarEjercicioGratisHoy, GEMAS_POR_ACIERTO } from '@/lib/progress';
import { AciertoLottie } from '@/components/onboarding/AciertoLottie';
import { CelebrationOverlay } from '@/components/onboarding/CelebrationOverlay';
import { useExplicacionIA } from '@/lib/useExplicacionIA';
import { logEvent } from '@/lib/logEvent';
import { gemasQueFaltan, LIMITE_DIARIO_GRATIS, MODULO_GRATIS_SLUG, moduloDesbloqueado, umbralDelModulo, usePlan } from '@/lib/plan';
import { useReferralPrompt } from '@/lib/referral';
import { ReferralPromptOverlay } from '@/components/referral/ReferralPromptOverlay';
import { ShareSheet } from '@/components/referral/ShareSheet';

const PREGUNTAS_POR_SESION = 8;

export default function PracticarPage({ params }: { params: Promise<{ modulo: string }> }) {
  const { modulo: slug } = use(params);
  const router = useRouter();
  const modulo = getModulo(slug);

  const [verEjemplo, setVerEjemplo] = useState(true);
  const [preguntas, setPreguntas] = useState<PreguntaModulo[] | null>(null);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showAcierto, setShowAcierto] = useState(false);
  const [showGemas, setShowGemas] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [gemas, setGemas] = useState(0);
  const [terminado, setTerminado] = useState(false);
  // Ref (no state) porque el evento de cierre se dispara desde un setTimeout
  // cuyo closure quedaría con el valor de aciertos de un render anterior.
  const aciertosRef = useRef(0);
  const { plan, cargando: cargandoPlan } = usePlan();
  const esModuloGratis = slug === MODULO_GRATIS_SLUG;
  // Se congela AL ENTRAR (no se recalcula mientras se practica): el límite
  // gratis se avisa ANTES de empezar, nunca corta una sesión ya en marcha —
  // interrumpir a alguien que ya invirtió esfuerzo genera frustración y
  // cancelaciones. Si ya estaba al tope al abrir la pantalla, se bloquea aquí;
  // si no, la sesión completa (las 8 preguntas) se deja terminar siempre.
  const [restantesAlEntrar, setRestantesAlEntrar] = useState<number | null>(null);
  const [gemasAlEntrar, setGemasAlEntrar] = useState(0);
  const referido = useReferralPrompt();
  const flujoReferidoActivo = referido.abierto || referido.abiertoShare;
  const flujoReferidoActivoAntes = useRef(false);

  useEffect(() => {
    const p = leerProgreso();
    setRestantesAlEntrar(Math.max(0, LIMITE_DIARIO_GRATIS - ejerciciosGratisHoy(p)));
    setGemasAlEntrar(p.gemas);
  }, []);

  // El prompt/share puede pasar por 2 pantallas (mensaje → compartir); solo
  // navegamos a Inicio cuando TODO el flujo de referido ya se cerró.
  useEffect(() => {
    if (flujoReferidoActivoAntes.current && !flujoReferidoActivo && terminado) {
      router.push('/app');
    }
    flujoReferidoActivoAntes.current = flujoReferidoActivo;
  }, [flujoReferidoActivo, terminado, router]);

  function irAInicioTrasCompletar() {
    const abrioPrompt = referido.intentar({ contexto: '🔥 Mira lo que acabas de hacer' });
    if (!abrioPrompt) router.push('/app');
  }

  // Se genera SOLO en cliente (nunca en el render de servidor) para que cada
  // sesión de práctica traiga ejercicios nuevos, aunque el estudiante ya haya
  // completado este módulo antes.
  useEffect(() => {
    if (modulo) setPreguntas(modulo.generarPreguntas(PREGUNTAS_POR_SESION));
  }, [modulo]);

  const pregunta = preguntas?.[step];
  const progreso = preguntas ? Math.round((step / preguntas.length) * 100) : 0;

  const isWrong = selected !== null && pregunta && selected !== pregunta.correctaIndex;

  const textoExplicacion = useExplicacionIA(Boolean(isWrong), {
    enunciado: pregunta?.enunciado ?? '',
    opciones: pregunta?.opciones ?? [],
    correctaTexto: pregunta ? pregunta.opciones[pregunta.correctaIndex] : '',
    elegidaTexto: pregunta && selected !== null ? pregunta.opciones[selected] : null,
    fallback: pregunta?.pasoClave ?? '',
  });

  function siguiente() {
    if (!preguntas) return;
    setSelected(null);
    if (step + 1 < preguntas.length) {
      setStep((s) => s + 1);
    } else {
      logEvent('modulo_completado', { modulo: slug, aciertos: aciertosRef.current, total: preguntas.length });
      setTerminado(true);
    }
  }

  function handleSelect(index: number) {
    if (!pregunta || selected !== null) return;
    setSelected(index);
    const correct = index === pregunta.correctaIndex;
    if (correct) {
      aciertosRef.current += 1;
      setAciertos((n) => n + 1);
      setGemas((g) => g + GEMAS_POR_ACIERTO);
      registrarAcierto(slug, preguntas!.length);
      if (plan !== 'premium' && esModuloGratis) {
        registrarEjercicioGratisHoy();
      }
      setShowAcierto(true);
      setShowGemas(true);
      window.setTimeout(() => {
        setShowAcierto(false);
        setShowGemas(false);
        siguiente();
      }, 1250);
    }
  }

  const mensajeFinal = useMemo(() => {
    if (!modulo || !preguntas) return '';
    if (aciertos === preguntas.length) {
      return `Perfecto: ${aciertos} de ${preguntas.length}. Dominas ${modulo.nombre.toLowerCase()}. Ganaste ${gemas} gemas.`;
    }
    return `Acertaste ${aciertos} de ${preguntas.length} en ${modulo.nombre}. Ganaste ${gemas} gemas — vuelve cuando quieras, te esperan ejercicios nuevos.`;
  }, [aciertos, modulo, preguntas, gemas]);

  if (!modulo) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-[375px] flex-col items-center justify-center gap-4 px-5 text-center text-[var(--text-primary)]">
        <p>No encontramos ese módulo.</p>
        <Link href="/app" className="font-semibold text-[var(--accent-2)]">
          Volver al inicio
        </Link>
      </div>
    );
  }

  if (!cargandoPlan && !moduloDesbloqueado(slug, plan, gemasAlEntrar)) {
    const umbral = umbralDelModulo(slug) ?? 0;
    const faltan = gemasQueFaltan(gemasAlEntrar, umbral);
    return (
      <div className="mx-auto flex min-h-dvh max-w-[375px] flex-col items-center justify-center gap-6 px-5 text-center text-[var(--text-primary)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-card)] border-2 border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_14%,var(--surface))]">
          <Lock size={28} className="text-[var(--accent)]" />
        </div>
        <h1 className="text-[24px] font-bold leading-tight [font-family:var(--font-display)]">
          {modulo.nombre} todavía no está desbloqueado
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Con el plan gratis practicas {getModulo(MODULO_GRATIS_SLUG)?.nombre}. Tienes 2 caminos para
          desbloquear este módulo.
        </p>

        <div className="w-full rounded-[var(--radius-card)] border-2 border-[color-mix(in_oklab,var(--accent-2)_30%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_6%,var(--surface))] p-4 text-left">
          <p className="flex items-center gap-1.5 text-[13px] font-bold text-[var(--text-primary)]">
            <Gem size={14} className="text-[var(--accent-2)]" fill="currentColor" /> Practica y gánatelo
          </p>
          <p className="mt-1 text-[12px] leading-relaxed text-[var(--text-secondary)]">
            Te faltan <strong className="text-[var(--text-primary)]">{faltan} gemas</strong>. Se ganan
            practicando {getModulo(MODULO_GRATIS_SLUG)?.nombre} — una vez las juntas, este módulo se
            queda desbloqueado para siempre.
          </p>
        </div>

        <Link
          href={`/paywall?tema=${encodeURIComponent(modulo.nombre)}`}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
        >
          O desbloquéalo ya con Premium
          <ArrowRight size={18} strokeWidth={2.5} />
        </Link>
        <Link href="/app" className="text-[13px] font-semibold text-[var(--text-secondary)] underline decoration-dotted underline-offset-4">
          Volver a Inicio
        </Link>
      </div>
    );
  }

  if (!cargandoPlan && plan !== 'premium' && esModuloGratis && restantesAlEntrar === 0) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-[375px] flex-col items-center justify-center gap-6 px-5 text-center text-[var(--text-primary)]">
        <div className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-card)] border-2 border-[var(--gold)] bg-[color-mix(in_oklab,var(--gold)_14%,var(--surface))]">
          <Clock size={28} className="text-[var(--gold)]" />
        </div>
        <h1 className="text-[24px] font-bold leading-tight [font-family:var(--font-display)]">
          Ya practicaste tus {LIMITE_DIARIO_GRATIS} ejercicios de hoy
        </h1>
        <p className="text-[14px] text-[var(--text-secondary)]">
          Vuelve mañana para seguir gratis, o pasa a Premium para practicar sin límite todos los días.
        </p>
        <Link
          href="/paywall?tema=práctica ilimitada"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
        >
          Practicar sin límite
          <ArrowRight size={18} strokeWidth={2.5} />
        </Link>
        <Link href="/app" className="text-[13px] font-semibold text-[var(--text-secondary)] underline decoration-dotted underline-offset-4">
          Volver a Inicio
        </Link>
      </div>
    );
  }

  if (!verEjemplo && !preguntas) {
    return <div className="min-h-dvh bg-[var(--bg)]" />;
  }

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-dvh bg-[var(--bg)] text-[var(--text-primary)] [font-family:var(--font-body)]">
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-[var(--bg)] px-5 pb-3 pt-5">
        <Link href="/app" aria-label="Volver al inicio">
          <ArrowLeft size={20} />
        </Link>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--surface-2)]">
          <motion.div
            className="h-full rounded-full bg-[var(--accent)]"
            animate={{ width: `${progreso}%` }}
            transition={{ type: 'spring', duration: 0.4 }}
          />
        </div>
        {gemas > 0 && (
          <span className="flex shrink-0 items-center gap-1 text-[13px] font-bold text-[var(--accent-2)]">
            <Gem size={14} fill="currentColor" />
            {gemas}
          </span>
        )}
      </div>

      {verEjemplo ? (
        <div className="flex min-h-[75dvh] items-center justify-center py-10">
          <div className="mx-auto flex w-full max-w-[375px] flex-col gap-6 px-5">
            <p className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--accent-2)]">
              <Sparkles size={14} /> Antes de practicar, mira este ejemplo
            </p>
            <h1 className="text-[22px] font-bold leading-tight [font-family:var(--font-display)]">
              {modulo.ejemplo.enunciado}
            </h1>
            <div className="flex flex-col gap-3">
              {modulo.ejemplo.pasos.map((p, i) => (
                <div key={i} className="flex gap-3 rounded-[var(--radius-card)] border-2 border-[var(--surface-2)] bg-[var(--surface)] p-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--accent)_16%,var(--surface))] text-[13px] font-bold text-[var(--accent)] [font-family:var(--font-display)]">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{p.titulo}</p>
                    <p className="mt-0.5 text-[14px] text-[var(--text-secondary)]">{p.detalle}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2.5 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent-2)_30%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_8%,var(--surface))] p-3.5">
              <NotebookPen size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-[var(--accent-2)]" />
              <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">Ten papel y lápiz a la mano: </span>
                resuélvelo primero en tu hoja, así llegas listo al examen real.
              </p>
            </div>
            {plan !== 'premium' && esModuloGratis && restantesAlEntrar !== null && restantesAlEntrar > 0 && restantesAlEntrar <= PREGUNTAS_POR_SESION && (
              <div className="flex items-start gap-2.5 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--gold)_30%,transparent)] bg-[color-mix(in_oklab,var(--gold)_8%,var(--surface))] p-3.5">
                <Clock size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-[var(--gold)]" />
                <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">
                  <span className="font-semibold text-[var(--text-primary)]">Te quedan {restantesAlEntrar} ejercicios gratis hoy: </span>
                  esta sesión te los usa. Vuelve mañana o pasa a Premium para practicar sin límite.
                </p>
              </div>
            )}
            <button
              onClick={() => setVerEjemplo(false)}
              className="mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
            >
              Ahora inténtalo tú
              <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      ) : (
      <div className="flex min-h-[75dvh] items-center justify-center py-10">
        <div className="relative mx-auto flex w-full max-w-[375px] flex-col gap-6 px-5">
          <p className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--accent-2)]">
            <Sparkles size={14} /> El Descifrador de Pasos
          </p>
          <h1 className="text-[24px] font-bold leading-tight [font-family:var(--font-display)]">
            {pregunta?.enunciado}
          </h1>

          <div className="relative flex flex-col gap-3">
            <AciertoLottie active={showAcierto} />
            <AnimatePresence>
              {showGemas && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.8 }}
                  animate={{ opacity: 1, y: -18, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="pointer-events-none absolute left-1/2 top-0 z-10 flex -translate-x-1/2 items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--accent-2)_20%,var(--surface))] px-3 py-1 text-[13px] font-bold text-[var(--accent-2)]"
                >
                  <Gem size={14} fill="currentColor" />+{GEMAS_POR_ACIERTO}
                </motion.div>
              )}
            </AnimatePresence>
            {pregunta?.opciones.map((op, i) => {
              const isSelected = selected === i;
              const isCorrectChoice = i === pregunta.correctaIndex;
              const showAsCorrect = selected !== null && isCorrectChoice;
              const showAsWrong = isSelected && !isCorrectChoice;
              return (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                  whileTap={{ scale: selected === null ? 0.97 : 1, y: selected === null ? 2 : 0 }}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`flex items-center justify-between rounded-[var(--radius-button)] border-2 px-4 py-3.5 text-left text-[16px] font-semibold shadow-[0_4px_0_0_color-mix(in_oklab,var(--surface-2)_60%,black)] transition-colors ${
                    showAsCorrect
                      ? 'border-[var(--success)] bg-[color-mix(in_oklab,var(--success)_14%,var(--surface))] shadow-[0_4px_0_0_color-mix(in_oklab,var(--success)_45%,black)]'
                      : showAsWrong
                        ? 'border-[var(--accent-2)] bg-[color-mix(in_oklab,var(--accent-2)_10%,var(--surface))] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent-2)_45%,black)]'
                        : 'border-[var(--surface-2)] bg-[var(--surface)] hover:border-[color-mix(in_oklab,var(--accent-2)_40%,transparent)]'
                  }`}
                >
                  <span>{op}</span>
                  {showAsCorrect && <CheckCircle2 size={20} className="text-[var(--success)]" />}
                  {showAsWrong && <Lightbulb size={20} className="text-[var(--accent-2)]" />}
                </motion.button>
              );
            })}
          </div>

          {!isWrong && (
            <div className="flex items-start gap-2.5 rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent-2)_25%,transparent)] bg-[color-mix(in_oklab,var(--accent-2)_7%,var(--surface))] p-3.5">
              <NotebookPen size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-[var(--accent-2)]" />
              <p className="text-[13px] leading-relaxed text-[var(--text-secondary)]">
                <span className="font-semibold text-[var(--text-primary)]">Consejo: </span>
                resuélvelo en tu hoja antes de elegir.
              </p>
            </div>
          )}

          {isWrong && pregunta && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[var(--radius-card)] border border-[color-mix(in_oklab,var(--accent-2)_25%,transparent)] bg-[var(--surface-2)] p-4 text-[14px] leading-relaxed text-[var(--text-secondary)]"
            >
              <span className="font-semibold text-[var(--text-primary)]">¡Casi! </span>
              {textoExplicacion}
              <button
                onClick={siguiente}
                className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-button)] bg-[var(--accent)] text-[15px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] transition-transform active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
              >
                Entendido, sigamos
                <ArrowRight size={16} strokeWidth={2.5} />
              </button>
            </motion.div>
          )}
        </div>
      </div>
      )}

      <CelebrationOverlay
        open={terminado}
        title="¡Módulo completado!"
        message={mensajeFinal}
        ctaLabel="Volver al inicio"
        onCta={irAInicioTrasCompletar}
        onDismiss={irAInicioTrasCompletar}
        intensity={2}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--gold)_18%,var(--surface))]">
          <Sparkles size={28} className="text-[var(--gold)]" />
        </div>
      </CelebrationOverlay>

      {referido.copy && (
        <ReferralPromptOverlay
          open={referido.abierto}
          copy={referido.copy}
          onCompartir={referido.compartir}
          onDescartar={referido.descartar}
        />
      )}
      <ShareSheet open={referido.abiertoShare} codigo={referido.codigo} variante={referido.variante} onClose={referido.cerrarShare} />
    </div>
    </MotionConfig>
  );
}
