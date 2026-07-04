import { motion } from 'motion/react'
import { barbers } from '@/data/barbers'
import { useBookingStore } from '@/store/bookingStore'
import { cn } from '@/lib/utils'

export function StepBarber() {
  const barberId = useBookingStore((s) => s.barberId)
  const setBarber = useBookingStore((s) => s.setBarber)
  const next = useBookingStore((s) => s.next)

  return (
    <div>
      <h3 className="font-display text-3xl tracking-wide text-white">Elegí tu barbero</h3>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {barbers.map((barber) => (
          <motion.button
            key={barber.id}
            onClick={() => {
              setBarber(barber.id)
              next()
            }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'rounded-xl border p-5 text-center transition-colors',
              barberId === barber.id
                ? 'border-gold-500 bg-gold-500/10'
                : 'border-white/10 bg-ink-800 hover:border-gold-500/40',
            )}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/40 font-display text-lg text-gold-300">
              {barber.initials}
            </div>
            <p className="mt-3 font-display text-base tracking-wide text-white">{barber.name}</p>
            <p className="mt-1 text-[11px] tracking-wide text-gold-400 uppercase">{barber.role}</p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
