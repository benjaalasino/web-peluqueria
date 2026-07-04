import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import type { Service } from '@/data/services'

const SPRING = { stiffness: 200, damping: 20, mass: 0.5 }

export function ServiceCard({ service }: { service: Service }) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, SPRING)
  const springRotateY = useSpring(rotateY, SPRING)
  const glowX = useTransform(springRotateY, [-8, 8], [0, 100])
  const glowY = useTransform(springRotateX, [8, -8], [0, 100])

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * 16)
    rotateX.set((0.5 - py) * 16)
  }

  function handlePointerLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800 p-8"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(240px circle at ${gx}% ${gy}%, rgba(201,162,39,0.18), transparent 70%)`,
          ),
        }}
      />
      <p className="font-display text-2xl tracking-wide text-white">{service.name}</p>
      <p className="mt-3 text-sm leading-relaxed text-white/60">{service.description}</p>
      <div className="mt-6 flex items-baseline justify-between border-t border-white/10 pt-4">
        <span className="text-xs tracking-wide text-white/40">{service.durationMin} min</span>
        <span className="font-display text-xl text-gold-300">
          ${service.priceARS.toLocaleString('es-AR')}
        </span>
      </div>
    </motion.div>
  )
}
