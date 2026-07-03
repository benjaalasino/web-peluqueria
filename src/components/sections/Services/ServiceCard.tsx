import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react'
import type { MouseEvent } from 'react'
import type { Service } from '@/data/services'
import { fadeInUp } from '@/lib/motionVariants'

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

export function ServiceCard({ service }: { service: Service }) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { stiffness: 220, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 220, damping: 20 })
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const glow = useMotionTemplate`radial-gradient(220px circle at ${glowX}% ${glowY}%, rgba(205,164,52,0.15), transparent 70%)`

  function onMouseMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 14)
    rotateX.set((0.5 - py) * 14)
    glowX.set(px * 100)
    glowY.set(py * 100)
  }

  function onMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      variants={fadeInUp}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative rounded-2xl border border-bone-dim/10 bg-ink-raised p-7"
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl" style={{ background: glow }} />
      <div className="relative">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-display text-2xl tracking-wide text-bone">{service.name}</h3>
          <span className="whitespace-nowrap font-body text-sm font-semibold text-gold">
            {currencyFormatter.format(service.priceARS)}
          </span>
        </div>
        <p className="mt-3 font-body text-sm text-bone-dim">{service.description}</p>
        <p className="mt-4 font-body text-xs tracking-wide text-bone-dim/70 uppercase">{service.durationMin} min</p>
      </div>
    </motion.div>
  )
}
