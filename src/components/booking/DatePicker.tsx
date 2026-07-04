import { addDays, format, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'
import { motion } from 'motion/react'
import { isDayClosed } from '@/data/availability'
import { cn } from '@/lib/utils'

const DAYS_AHEAD = 14

export function DatePicker({
  selectedDate,
  onSelect,
}: {
  selectedDate?: string
  onSelect: (dateISO: string) => void
}) {
  const today = new Date()
  const days = Array.from({ length: DAYS_AHEAD }, (_, i) => addDays(today, i))

  return (
    <div className="grid grid-cols-4 gap-3 sm:grid-cols-7">
      {days.map((day) => {
        const dateISO = format(day, 'yyyy-MM-dd')
        const closed = isDayClosed(dateISO)
        const selected = selectedDate ? isSameDay(day, new Date(`${selectedDate}T00:00:00`)) : false

        return (
          <motion.button
            key={dateISO}
            disabled={closed}
            onClick={() => onSelect(dateISO)}
            whileHover={closed ? undefined : { y: -3 }}
            whileTap={closed ? undefined : { scale: 0.96 }}
            className={cn(
              'flex flex-col items-center rounded-lg border p-3 transition-colors',
              closed && 'cursor-not-allowed border-white/5 text-white/20',
              !closed &&
                (selected
                  ? 'border-gold-500 bg-gold-500/10 text-gold-300'
                  : 'border-white/10 bg-ink-800 text-white/80 hover:border-gold-500/40'),
            )}
          >
            <span className="text-[10px] tracking-wide uppercase">
              {format(day, 'EEE', { locale: es })}
            </span>
            <span className="mt-1 font-display text-lg">{format(day, 'd')}</span>
          </motion.button>
        )
      })}
    </div>
  )
}
