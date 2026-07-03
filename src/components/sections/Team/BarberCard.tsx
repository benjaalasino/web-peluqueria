import { motion } from 'motion/react'
import type { Barber } from '@/data/barbers'
import { fadeInUp } from '@/lib/motionVariants'

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function BarberCard({ barber }: { barber: Barber }) {
  return (
    <motion.div variants={fadeInUp} className="group text-center">
      <div className="relative mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-gold/30 bg-[radial-gradient(circle_at_30%_20%,rgba(205,164,52,0.25),rgba(6,6,6,0.9))] transition-transform duration-300 group-hover:scale-105 group-hover:border-gold/70">
        <span className="font-display text-4xl tracking-wide text-gold">{initials(barber.name)}</span>
      </div>
      <h3 className="mt-5 font-display text-2xl tracking-wide text-bone">{barber.name}</h3>
      <p className="font-body text-xs font-semibold tracking-wide text-gold uppercase">{barber.role}</p>
      <p className="mx-auto mt-2 max-w-[22ch] font-body text-sm text-bone-dim">{barber.bio}</p>
    </motion.div>
  )
}
