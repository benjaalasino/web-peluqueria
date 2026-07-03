import { addDays, format, isSameDay, isSunday } from 'date-fns'
import { es } from 'date-fns/locale'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { useBookingStore } from '@/store/bookingStore'

const DAYS_AHEAD = 14

export function StepDate() {
  const date = useBookingStore((s) => s.date)
  const setDate = useBookingStore((s) => s.setDate)
  const next = useBookingStore((s) => s.next)

  const days = Array.from({ length: DAYS_AHEAD }, (_, i) => addDays(new Date(), i + 1))
  const selected = date ? new Date(`${date}T00:00:00`) : undefined

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
      {days.map((day) => {
        const closed = isSunday(day)
        const isSelected = selected && isSameDay(day, selected)
        return (
          <motion.button
            key={day.toISOString()}
            type="button"
            disabled={closed}
            whileTap={closed ? undefined : { scale: 0.96 }}
            onClick={() => {
              setDate(format(day, 'yyyy-MM-dd'))
              next()
            }}
            className={cn(
              'flex flex-col items-center rounded-xl border px-3 py-4 transition-colors',
              closed && 'cursor-not-allowed border-bone-dim/10 opacity-30',
              !closed && isSelected && 'border-gold bg-gold/10',
              !closed && !isSelected && 'border-bone-dim/15 bg-ink-raised hover:border-gold/40',
            )}
          >
            <span className="font-body text-xs tracking-wide text-bone-dim uppercase">
              {format(day, 'EEE', { locale: es })}
            </span>
            <span className="mt-1 font-display text-2xl text-bone">{format(day, 'd')}</span>
            <span className="font-body text-[11px] text-bone-dim">{format(day, 'MMM', { locale: es })}</span>
          </motion.button>
        )
      })}
      <p className="col-span-full mt-1 font-body text-xs text-bone-dim/70">Cerrado los domingos.</p>
    </div>
  )
}
