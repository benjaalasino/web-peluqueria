import { motion } from 'motion/react'
import type { Barber } from '@/data/barbers'

export function BarberCard({ barber }: { barber: Barber }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="rounded-2xl border border-white/10 bg-ink-800 p-8 text-center"
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold-500/40 font-display text-2xl text-gold-300">
        {barber.initials}
      </div>
      <p className="mt-5 font-display text-xl tracking-wide text-white">{barber.name}</p>
      <p className="mt-1 text-xs tracking-wide text-gold-400 uppercase">{barber.role}</p>
      <p className="mt-4 text-sm leading-relaxed text-white/60">{barber.bio}</p>
    </motion.div>
  )
}
