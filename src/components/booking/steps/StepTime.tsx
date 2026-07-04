import { motion } from 'motion/react'
import { getAvailableSlots } from '@/data/availability'
import { useBookingStore } from '@/store/bookingStore'
import { cn } from '@/lib/utils'

export function StepTime() {
  const barberId = useBookingStore((s) => s.barberId)
  const date = useBookingStore((s) => s.date)
  const time = useBookingStore((s) => s.time)
  const setTime = useBookingStore((s) => s.setTime)
  const next = useBookingStore((s) => s.next)

  const slots = barberId && date ? getAvailableSlots(barberId, date) : []

  return (
    <div>
      <h3 className="font-display text-3xl tracking-wide text-white">Elegí un horario</h3>
      {slots.length === 0 ? (
        <p className="mt-8 text-sm text-white/50">
          No hay horarios disponibles ese día. Volvé atrás y elegí otra fecha.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-3 gap-3 sm:grid-cols-5">
          {slots.map((slot) => (
            <motion.button
              key={slot}
              onClick={() => {
                setTime(slot)
                next()
              }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              className={cn(
                'rounded-lg border px-3 py-2 font-display text-lg tracking-wide transition-colors',
                time === slot
                  ? 'border-gold-500 bg-gold-500/10 text-gold-300'
                  : 'border-white/10 bg-ink-800 text-white/80 hover:border-gold-500/40',
              )}
            >
              {slot}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  )
}
