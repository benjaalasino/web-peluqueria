import { useCallback, useEffect, useRef, useState } from 'react'

/* ═══════════════════════════════════════════════════════════════
   ⚙️  CONFIGURACIÓN — ajustá estos valores cuando tengas el video final
   ═══════════════════════════════════════════════════════════════ */
const VIDEO_SRC = '/penal.mp4'
const PAUSE_SCHEDULE_AT = 2 // [X] segundos → pausa del Paso 2 (Horarios de Reserva)
const PAUSE_CONFIRM_AT = 3.91 // [Y] segundos → pausa del Paso 3 (Confirmar Reserva)

// Imágenes nítidas que reemplazan al frame pausado del video en cada paso
// (el Paso 3 es una pausa real del video, sin imagen)
const STILL_IMAGES = [
  { src: '/pausa-1.png', phases: ['intro', 'form'] },
  { src: '/pausa-2.png', phases: ['days', 'schedule'] },
]

// Imagen que se muestra al pasar el cursor sobre el césped en el Paso 1
const INTRO_HOVER_IMAGE = '/pausa-1-hover.png'
// Imagen con los días pintados en el césped (aparece lento tras la 1ª pausa)
const SCHEDULE_DAYS_IMAGE = '/pausa-2-dias.png'
// Imagen con los horarios pintados en el césped (aparece al elegir el día)
const SCHEDULE_OPTIONS_IMAGE = '/pausa-2-opciones.png'
// Pelota con "Confirmar Reserva" escrito — es el botón del Paso 3
const BALL_IMAGE = '/confirmar-reserva.png'

// Relación de aspecto del video/imágenes (para alinear hotspots con object-cover)
const MEDIA_ASPECT = 1665 / 945
// Contorno del césped dentro de la imagen del Paso 1 (% del ancho/alto)
const FIELD_CLIP = 'polygon(37% 13%, 64% 13%, 75% 97%, 26% 97%)'

// Zonas de cada horario pintado en el césped (% de la imagen).
// Deben coincidir con `spots` en scripts/extract-glyphs.mjs, que genera
// los /glow-XX.png (el número recortado en blanco) a partir de estas zonas.
const HOUR_SPOTS = [
  { hour: '19', left: 3,    top: 60,   width: 18, height: 21 },
  { hour: '20', left: 28,   top: 62.5, width: 20, height: 19.5 },
  { hour: '21', left: 53,   top: 61.5, width: 17, height: 21.5 },
  { hour: '22', left: 76.5, top: 63,   width: 20, height: 20 },
]

// Zonas de cada día pintado en el césped (% de la imagen).
// También deben coincidir con `spots` en scripts/extract-glyphs.mjs.
const DAY_SPOTS = [
  { day: 'LUN', left: 5.5,  top: 56.5, width: 12.5, height: 13 },
  { day: 'MAR', left: 18.5, top: 57,   width: 13.5, height: 13.5 },
  { day: 'MIE', left: 33,   top: 57.5, width: 12,   height: 14 },
  { day: 'JUE', left: 45,   top: 58,   width: 10.8, height: 14 },
  { day: 'VIE', left: 58.5, top: 58.5, width: 11,   height: 14 },
  { day: 'SAB', left: 70,   top: 59,   width: 11.5, height: 14 },
  { day: 'DOM', left: 82,   top: 60,   width: 15,   height: 14 },
]

// Pelota-botón sobre el frame del segundo 3.91: centro (% del video)
// y ancho (% del ancho). Al hover crece un poco.
const BALL_CENTER = { x: 51, y: 50 }
const BALL_WIDTH = 17.5
/* ═══════════════════════════════════════════════════════════════ */

// Replica la geometría de object-cover para que los % coincidan con la imagen
const coverStyle = {
  width: `max(100vw, calc(100vh * ${MEDIA_ASPECT}))`,
  height: `max(100vh, calc(100vw / ${MEDIA_ASPECT}))`,
}

const spotRect = ({ left, top, width, height }) => ({
  left: `${left}%`,
  top: `${top}%`,
  width: `${width}%`,
  height: `${height}%`,
})

export default function App() {
  const videoRef = useRef(null)
  const rafRef = useRef(0)
  const [phase, setPhase] = useState('intro')
  const [videoReady, setVideoReady] = useState(false)
  const [fieldHover, setFieldHover] = useState(false)
  const [ballHover, setBallHover] = useState(false)
  const [player, setPlayer] = useState(null)
  const [hoverDay, setHoverDay] = useState(null)
  const [hoverHour, setHoverHour] = useState(null)
  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedHour, setSelectedHour] = useState(null)

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

  const reset = () => {
    const video = videoRef.current
    if (video) {
      video.pause()
      video.currentTime = 0
    }
    setPlayer(null)
    setSelectedDay(null)
    setSelectedHour(null)
    setPhase('intro')
  }

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
      {STILL_IMAGES.map(({ src, phases }) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            phases.includes(phase) ? 'opacity-100' : 'opacity-0'
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

      {/* ── Días que aparecen lento en el césped (Paso 2) ──── */}
      <img
        src={SCHEDULE_DAYS_IMAGE}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover ease-out ${
          phase === 'days'
            ? 'opacity-100 transition-opacity duration-[2800ms]'
            : 'opacity-0 transition-opacity duration-500'
        }`}
      />

      {/* ── Horarios que aparecen lento en el césped (Paso 3) ── */}
      <img
        src={SCHEDULE_OPTIONS_IMAGE}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover ease-out ${
          phase === 'schedule'
            ? 'opacity-100 transition-opacity duration-[2800ms]'
            : 'opacity-0 transition-opacity duration-500'
        }`}
      />

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

      {/* ── Capa interactiva alineada a la imagen ──────────── */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        style={coverStyle}
      >
        {/* Paso 1: el césped entero es el botón */}
        {phase === 'intro' && (
          <button
            aria-label="Hacer reserva"
            disabled={!videoReady}
            onMouseEnter={() => setFieldHover(true)}
            onMouseLeave={() => setFieldHover(false)}
            onClick={() => {
              setFieldHover(false)
              setPhase('form')
            }}
            className="pointer-events-auto absolute inset-0 cursor-pointer"
            style={{ clipPath: FIELD_CLIP }}
          />
        )}

        {/* Paso 2: cada día se ilumina al hover; al click pasan los horarios */}
        {phase === 'days' && (
          <>
            {DAY_SPOTS.map((spot) => (
              <img
                key={`glow-${spot.day}`}
                src={`/glow-${spot.day}.png`}
                alt=""
                className={`absolute transition-opacity duration-300 ${
                  hoverDay === spot.day ? 'opacity-90' : 'opacity-0'
                }`}
                style={spotRect(spot)}
              />
            ))}
            {DAY_SPOTS.map((spot) => (
              <button
                key={spot.day}
                aria-label={`Reservar el ${spot.day}`}
                onMouseEnter={() => setHoverDay(spot.day)}
                onMouseLeave={() => setHoverDay(null)}
                onClick={() => {
                  setHoverDay(null)
                  setSelectedDay(spot.day)
                  setPhase('schedule')
                }}
                className="pointer-events-auto absolute cursor-pointer"
                style={spotRect(spot)}
              />
            ))}
          </>
        )}

        {/* Paso 3: cada horario se ilumina al hover y confirma al click */}
        {phase === 'schedule' && (
          <>
            {HOUR_SPOTS.map((spot) => (
              <img
                key={`glow-${spot.hour}`}
                src={`/glow-${spot.hour}.png`}
                alt=""
                className={`absolute transition-opacity duration-300 ${
                  hoverHour === spot.hour ? 'opacity-90' : 'opacity-0'
                }`}
                style={spotRect(spot)}
              />
            ))}
            {HOUR_SPOTS.map((spot) => (
              <button
                key={spot.hour}
                aria-label={`Reservar turno a las ${spot.hour}`}
                onMouseEnter={() => setHoverHour(spot.hour)}
                onMouseLeave={() => setHoverHour(null)}
                onClick={() => {
                  setHoverHour(null)
                  setSelectedHour(spot.hour)
                  playTo(PAUSE_CONFIRM_AT, 'confirm')
                }}
                className="pointer-events-auto absolute cursor-pointer"
                style={spotRect(spot)}
              />
            ))}
          </>
        )}

        {/* Paso 4: se ve la pelota normal del video; al pasar el cursor
            aparece encima la pelota más grande con el texto, y es el botón */}
        {phase === 'confirm' && (
          <button
            aria-label="Confirmar reserva"
            onMouseEnter={() => setBallHover(true)}
            onMouseLeave={() => setBallHover(false)}
            onClick={() => {
              setBallHover(false)
              playTo(null)
            }}
            className="group pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${BALL_CENTER.x}%`,
              top: `${BALL_CENTER.y}%`,
              width: `${BALL_WIDTH}%`,
            }}
          >
            <img
              src={BALL_IMAGE}
              alt=""
              className="h-auto w-full scale-100 opacity-0 blur-[0.8px] brightness-[0.82] drop-shadow-[0_10px_30px_rgb(0_0_0/0.55)]
                transition-all duration-300 ease-out group-hover:scale-[1.1] group-hover:opacity-100"
            />
          </button>
        )}
      </div>

      {/* ── Frases guía ────────────────────────────────────── */}
      {(phase === 'intro' || phase === 'confirm') && (
        <p
          key={`hint-${phase}`}
          className={`pointer-events-none absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-fade-in-up
            text-center font-body text-sm font-medium tracking-widest uppercase transition-colors duration-500
            ${(phase === 'intro' ? fieldHover : ballHover) ? 'text-pitch-400' : 'text-white/70'}`}
        >
          {phase === 'intro'
            ? fieldHover
              ? 'Haz clic para comenzar'
              : 'Pasá el cursor sobre la cancha'
            : 'Clickea la pelota para confirmar'}
        </p>
      )}

      {/* ── Formulario de datos antes de comenzar ──────────── */}
      {phase === 'form' && (
        <FormModal
          onClose={() => setPhase('intro')}
          onSubmit={(data) => {
            setPlayer(data)
            playTo(PAUSE_SCHEDULE_AT, 'days')
          }}
        />
      )}

      {/* ── Modal de éxito ─────────────────────────────────── */}
      {phase === 'done' && (
        <SuccessModal
          name={player?.nombre}
          day={selectedDay}
          hour={selectedHour}
          onReset={reset}
        />
      )}
    </main>
  )
}

const INPUT_CLASS = `w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 font-body text-sm
  text-white placeholder-white/35 outline-none transition-colors duration-200
  focus:border-pitch-400/60 focus:bg-white/10`

function FormModal({ onClose, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    onSubmit({
      nombre: fd.get('nombre').trim(),
      apellido: fd.get('apellido').trim(),
      email: fd.get('email').trim(),
      telefono: fd.get('telefono').trim(),
    })
  }

  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="animate-modal-in mx-6 flex w-full max-w-md flex-col gap-4 rounded-3xl border border-white/15
          bg-[#0b120e]/85 px-8 py-10 shadow-[0_25px_80px_rgb(0_0_0/0.6)] backdrop-blur-2xl"
      >
        <h2 className="text-center font-display text-3xl tracking-[0.15em] text-white">
          TUS DATOS
        </h2>
        <p className="mb-2 text-center font-body text-sm text-white/55">
          Completá tus datos para entrar a la cancha
        </p>
        <div className="grid grid-cols-2 gap-3">
          <input name="nombre" required placeholder="Nombre" autoFocus className={INPUT_CLASS} />
          <input name="apellido" required placeholder="Apellido" className={INPUT_CLASS} />
        </div>
        <input name="email" type="email" required placeholder="Email" className={INPUT_CLASS} />
        <input name="telefono" type="tel" required placeholder="Teléfono" className={INPUT_CLASS} />
        <button
          type="submit"
          className="mt-3 cursor-pointer rounded-full bg-pitch-500 px-8 py-3 font-display text-xl tracking-[0.15em]
            text-[#03170b] transition-all duration-300 hover:bg-pitch-400 active:scale-95"
        >
          Comenzar
        </button>
      </form>
    </div>
  )
}

function SuccessModal({ name, day, hour, onReset }) {
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
          {name ? `${name}, tu` : 'Tu'} cancha te espera
          {day ? ` el ${day}` : ''}
          {hour ? ` a las ${hour}:00 hs` : ''}.
        </p>
        <button
          onClick={onReset}
          className="mt-2 cursor-pointer rounded-full bg-pitch-500 px-8 py-3 font-display text-xl tracking-[0.15em] text-[#03170b] transition-all duration-300 hover:bg-pitch-400 active:scale-95"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  )
}
