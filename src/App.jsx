import { useCallback, useEffect, useRef, useState } from 'react'

/* ═══════════════════════════════════════════════════════════════
   ⚙️  CONFIGURACIÓN — ajustá estos valores cuando tengas el video final
   ═══════════════════════════════════════════════════════════════ */
const VIDEO_SRC = '/penal.mp4'
const PAUSE_SCHEDULE_AT = 2 // [X] segundos → pausa del Paso 2 (Horarios de Reserva)
const PAUSE_CONFIRM_AT = 3.80 // [Y] segundos → pausa del Paso 3 (Confirmar Reserva)

// Imágenes nítidas que reemplazan al frame pausado del video en cada paso
const STILL_IMAGES = {
  intro: '/pausa-1.png',
  schedule: '/pausa-2.png',
  confirm: '/pausa-3.png',
}

// Imagen que se muestra al pasar el cursor sobre el césped en el Paso 1
const INTRO_HOVER_IMAGE = '/pausa-1-hover.png'
// Relación de aspecto del video/imágenes (para alinear el hotspot con object-cover)
const MEDIA_ASPECT = 1665 / 945
// Contorno del césped dentro de la imagen (% del ancho/alto de la imagen)
const FIELD_CLIP = 'polygon(37% 13%, 64% 13%, 75% 97%, 26% 97%)'
/* ═══════════════════════════════════════════════════════════════ */

const PHASES = {
  intro:    { label: 'Hacer Reserva',       caption: 'Elegí tu cancha y viví el partido', step: 1 },
  loading:  { label: '',                    caption: '',                                   step: 0 },
  schedule: { label: 'Horarios de Reserva', caption: 'Seleccioná el horario disponible',   step: 2 },
  confirm:  { label: 'Confirmar Reserva',   caption: 'Todo listo. Ejecutá el penal',       step: 3 },
  shooting: { label: '',                    caption: '',                                   step: 3 },
  done:     { label: '',                    caption: '',                                   step: 3 },
}

export default function App() {
  const videoRef = useRef(null)
  const rafRef = useRef(0)
  const [phase, setPhase] = useState('intro')
  const [videoReady, setVideoReady] = useState(false)
  const [fieldHover, setFieldHover] = useState(false)

  /* Reproduce el video y lo pausa con precisión de frame en `stopAt`.
     Si stopAt es null, corre hasta el final (el evento `ended` cierra el flujo). */
  const playTo = useCallback((stopAt, nextPhase) => {
    const video = videoRef.current
    if (!video) return

    setPhase('loading')
    video.play()

    if (stopAt == null) {
      setPhase('shooting')
      return
    }

    const tick = () => {
      if (video.currentTime >= stopAt) {
        video.pause()
        video.currentTime = stopAt
        setPhase(nextPhase)
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  const handleAction = () => {
    if (phase === 'intro') playTo(PAUSE_SCHEDULE_AT, 'schedule')
    else if (phase === 'schedule') playTo(PAUSE_CONFIRM_AT, 'confirm')
    else if (phase === 'confirm') playTo(null)
  }

  const reset = () => {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    setPhase('intro')
  }

  const { label, caption, step } = PHASES[phase]
  const interactive = ['schedule', 'confirm'].includes(phase) && videoReady

  return (
    <main className="relative h-full w-full overflow-hidden bg-[#050807]">
      {/* ── Video de fondo ─────────────────────────────────── */}
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setVideoReady(true)}
        onEnded={() => setPhase('done')}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
          videoReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* ── Imágenes nítidas sobre cada pausa ──────────────── */}
      {Object.entries(STILL_IMAGES).map(([stillPhase, src]) => (
        <img
          key={stillPhase}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            phase === stillPhase ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* ── Césped activado al pasar el cursor (Paso 1) ────── */}
      <img
        src={INTRO_HOVER_IMAGE}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          phase === 'intro' && fieldHover ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* ── Hotspot del césped: el campo entero es el botón ── */}
      {phase === 'intro' && (
        <div
          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `max(100vw, calc(100vh * ${MEDIA_ASPECT}))`,
            height: `max(100vh, calc(100vw / ${MEDIA_ASPECT}))`,
          }}
        >
          <button
            aria-label="Hacer reserva"
            disabled={!videoReady}
            onMouseEnter={() => setFieldHover(true)}
            onMouseLeave={() => setFieldHover(false)}
            onClick={() => {
              setFieldHover(false)
              handleAction()
            }}
            className="absolute inset-0 cursor-pointer"
            style={{ clipPath: FIELD_CLIP }}
          />
        </div>
      )}

      {/* ── Viñeta cinematográfica ─────────────────────────── */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          phase === 'shooting' ? 'opacity-40' : 'opacity-100'
        }`}
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 35%, rgb(0 0 0 / 0.55) 100%), linear-gradient(to top, rgb(0 0 0 / 0.6), transparent 30%, transparent 75%, rgb(0 0 0 / 0.5))',
        }}
      />

      {/* ── Marca ──────────────────────────────────────────── */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-6 animate-fade-in">
        <h1 className="font-display text-3xl tracking-[0.25em] text-white/95">
          LA CANCHA<span className="text-pitch-400">.</span>
        </h1>
        <StepIndicator current={step} />
      </header>

      {/* ── Pista del Paso 1 ───────────────────────────────── */}
      {phase === 'intro' && (
        <p
          className={`pointer-events-none absolute bottom-12 left-1/2 z-10 -translate-x-1/2 animate-fade-in-up
            font-body text-sm font-medium tracking-widest uppercase transition-colors duration-500
            ${fieldHover ? 'text-pitch-400' : 'text-white/70'}`}
        >
          {fieldHover ? 'Hacé clic para reservar' : 'Pasá el cursor sobre el césped'}
        </p>
      )}

      {/* ── Botón central flotante ─────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-6">
        {phase !== 'done' && phase !== 'intro' && (
          <>
            <div key={phase} className={interactive ? 'animate-fade-in-up' : ''}>
              <button
                onClick={handleAction}
                disabled={!interactive}
                className={`group pointer-events-auto relative rounded-full border border-white/25 bg-white/10 px-14 py-6
                  backdrop-blur-xl shadow-[0_8px_40px_rgb(0_0_0/0.45)] transition-opacity duration-300
                  ${interactive
                    ? 'animate-pulse-soft cursor-pointer hover:border-pitch-400/70 hover:bg-white/15 active:scale-95'
                    : 'pointer-events-none opacity-0'}`}
              >
                <span className="flex items-center gap-4 font-display text-3xl tracking-[0.18em] text-white sm:text-4xl">
                  {label}
                </span>
                {interactive && (
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-pitch-500/0 transition-colors duration-300 group-hover:bg-pitch-500/10" />
                )}
              </button>
            </div>

            {caption && (
              <p
                key={`caption-${phase}`}
                className="animate-fade-in-up font-body text-sm font-medium tracking-widest text-white/70 uppercase [animation-delay:120ms]"
              >
                {caption}
              </p>
            )}
          </>
        )}
      </div>

      {/* ── Modal de éxito ─────────────────────────────────── */}
      {phase === 'done' && <SuccessModal onReset={reset} />}
    </main>
  )
}

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-3" aria-label={`Paso ${current} de 3`}>
      {[1, 2, 3].map((s) => (
        <span
          key={s}
          className={`h-1.5 rounded-full transition-all duration-500 ${
            s === current
              ? 'w-10 bg-pitch-400'
              : s < current
                ? 'w-5 bg-pitch-400/50'
                : 'w-5 bg-white/25'
          }`}
        />
      ))}
    </div>
  )
}

function SuccessModal({ onReset }) {
  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="animate-modal-in mx-6 flex max-w-md flex-col items-center gap-5 rounded-3xl border border-white/15 bg-[#0b120e]/85 px-10 py-12 text-center shadow-[0_25px_80px_rgb(0_0_0/0.6)] backdrop-blur-2xl">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-pitch-500/15 ring-1 ring-pitch-400/40">
          <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 stroke-pitch-400" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <h2 className="font-display text-4xl tracking-[0.12em] text-white">
          ¡GOOOL!
        </h2>
        <p className="font-body text-lg font-medium text-white/85">
          Reserva completada con éxito
        </p>
        <p className="font-body text-sm text-white/55">
          Te enviamos la confirmación con todos los detalles de tu turno.
        </p>
        <button
          onClick={onReset}
          className="mt-2 cursor-pointer rounded-full bg-pitch-500 px-8 py-3 font-display text-xl tracking-[0.15em] text-[#03170b] transition-all duration-300 hover:bg-pitch-400 active:scale-95"
        >
          Reservar otra cancha
        </button>
      </div>
    </div>
  )
}
