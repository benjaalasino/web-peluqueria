import { useMemo } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { getAvailableSlots } from '@/data/availability'
import { useBookingStore } from '@/store/bookingStore'

export function StepTime() {
  const barberId = useBookingStore((s) => s.barberId)
  const date = useBookingStore((s) => s.date)
  const time = useBookingStore((s) => s.time)
  const setTime = useBookingStore((s) => s.setTime)
  const next = useBookingStore((s) => s.next)

  const slots = useMemo(
    () => (barberId && date ? getAvailableSlots(barberId, date) : []),
    [barberId, date],
  )

  if (slots.length === 0) {
    return (
      <p className="rounded-xl border border-bone-dim/15 bg-ink-raised p-6 text-center font-body text-bone-dim">
        No quedan horarios disponibles ese día. Volvé atrás y elegí otra fecha.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
      {slots.map((slot) => (
        <motion.button
          key={slot}
          type="button"
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            setTime(slot)
            next()
          }}
          className={cn(
            'rounded-xl border px-3 py-3 text-center font-body text-sm font-medium transition-colors',
            time === slot
              ? 'border-gold bg-gold/10 text-gold'
              : 'border-bone-dim/15 bg-ink-raised text-bone hover:border-gold/40',
          )}
        >
          {slot}
        </motion.button>
      ))}
    </div>
  )
}
