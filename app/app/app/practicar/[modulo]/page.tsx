'use client';

import { use, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import { getModulo } from '@/lib/modulos';
import { registrarAcierto } from '@/lib/progress';
import { StarBurst } from '@/components/onboarding/StarBurst';
import { CelebrationOverlay } from '@/components/onboarding/CelebrationOverlay';

export default function PracticarPage({ params }: { params: Promise<{ modulo: string }> }) {
  const { modulo: slug } = use(params);
  const router = useRouter();
  const modulo = getModulo(slug);

  const [verEjemplo, setVerEjemplo] = useState(true);
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showStars, setShowStars] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const pregunta = modulo?.preguntas[step];
  const progreso = modulo ? Math.round((step / modulo.preguntas.length) * 100) : 0;

  const isWrong = selected !== null && pregunta && selected !== pregunta.correctaIndex;

  function siguiente() {
    if (!modulo) return;
    setSelected(null);
    if (step + 1 < modulo.preguntas.length) {
      setStep((s) => s + 1);
    } else {
      setTerminado(true);
    }
  }

  function handleSelect(index: number) {
    if (!pregunta || selected !== null) return;
    setSelected(index);
    const correct = index === pregunta.correctaIndex;
    if (correct) {
      setAciertos((n) => n + 1);
      registrarAcierto(slug, modulo!.preguntas.length);
      setShowStars(true);
      window.setTimeout(() => {
        setShowStars(false);
        siguiente();
      }, 700);
    }
  }

  const mensajeFinal = useMemo(() => {
    if (!modulo) return '';
    if (aciertos === modulo.preguntas.length) {
      return `Perfecto: ${aciertos} de ${modulo.preguntas.length}. Dominas ${modulo.nombre.toLowerCase()}.`;
    }
    return `Acertaste ${aciertos} de ${modulo.preguntas.length} en ${modulo.nombre}. Vas mejorando — vuelve mañana a reforzar.`;
  }, [aciertos, modulo]);

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

  return (
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
            <button
              onClick={() => setVerEjemplo(false)}
              className="mt-1 flex h-12 w-full items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent)] text-[16px] font-bold text-[var(--bg)] shadow-[0_4px_0_0_color-mix(in_oklab,var(--accent)_65%,black)] active:translate-y-[2px] active:shadow-none [font-family:var(--font-display)]"
            >
              Ahora inténtalo tú
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
            <StarBurst active={showStars} />
            {pregunta?.opciones.map((op, i) => {
              const isSelected = selected === i;
              const isCorrectChoice = i === pregunta.correctaIndex;
              const showAsCorrect = selected !== null && isCorrectChoice;
              const showAsWrong = isSelected && !isCorrectChoice;
              return (
                <motion.button
                  key={i}
                  whileTap={{ scale: selected === null ? 0.97 : 1 }}
                  onClick={() => handleSelect(i)}
                  disabled={selected !== null}
                  className={`flex items-center justify-between rounded-[var(--radius-button)] border-2 px-4 py-3.5 text-left text-[16px] font-semibold transition-colors ${
                    showAsCorrect
                      ? 'border-[var(--success)] bg-[color-mix(in_oklab,var(--success)_14%,var(--surface))]'
                      : showAsWrong
                        ? 'border-[var(--accent)] bg-[color-mix(in_oklab,var(--accent)_12%,var(--surface))]'
                        : 'border-[var(--surface-2)] bg-[var(--surface)] hover:border-[color-mix(in_oklab,var(--accent-2)_40%,transparent)]'
                  }`}
                >
                  <span>{op}</span>
                  {showAsCorrect && <CheckCircle2 size={20} className="text-[var(--success)]" />}
                  {showAsWrong && <XCircle size={20} className="text-[var(--accent)]" />}
                </motion.button>
              );
            })}
          </div>

          {isWrong && pregunta && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[var(--radius-card)] bg-[var(--surface-2)] p-4 text-[14px] leading-relaxed text-[var(--text-secondary)]"
            >
              <span className="font-semibold text-[var(--text-primary)]">Así se resuelve: </span>
              {pregunta.pasoClave}
              <button
                onClick={siguiente}
                className="mt-3 flex h-11 w-full items-center justify-center rounded-[var(--radius-button)] bg-[var(--accent-2)] text-[15px] font-bold text-white [font-family:var(--font-display)]"
              >
                Entendido, sigamos
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
        onCta={() => router.push('/app')}
        onDismiss={() => router.push('/app')}
        intensity={2}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--gold)_18%,var(--surface))]">
          <Sparkles size={28} className="text-[var(--gold)]" />
        </div>
      </CelebrationOverlay>
    </div>
  );
}
