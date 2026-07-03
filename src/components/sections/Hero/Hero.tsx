import { motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { useViewStore } from '@/store/viewStore'

export function Hero() {
  const startTransition = useViewStore((state) => state.startTransition)

  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_35%,rgba(205,164,52,0.12),transparent_70%)]"
      />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-5 block font-body text-xs font-semibold tracking-[0.35em] text-gold uppercase"
        >
          Barbería de autor
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-6xl leading-none tracking-wide text-bone md:text-8xl"
        >
          El corte justo,
          <br />
          <span className="text-gold">el turno preciso.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mx-auto mt-6 max-w-xl font-body text-bone-dim"
        >
          Cortes, barba y afeitado a navaja con los mejores profesionales.
          Elegí tu horario en menos de un minuto.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-10"
        >
          <Button onClick={startTransition}>Ver turnos disponibles</Button>
        </motion.div>
      </div>
    </section>
  )
}
