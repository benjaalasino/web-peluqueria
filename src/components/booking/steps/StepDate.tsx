import { useBookingStore } from '@/store/bookingStore'
import { DatePicker } from '../DatePicker'

export function StepDate() {
  const date = useBookingStore((s) => s.date)
  const setDate = useBookingStore((s) => s.setDate)
  const next = useBookingStore((s) => s.next)

  return (
    <div>
      <h3 className="font-display text-3xl tracking-wide text-white">Elegí una fecha</h3>
      <p className="mt-1 text-sm text-white/50">Cerrado los domingos.</p>
      <div className="mt-8">
        <DatePicker
          selectedDate={date}
          onSelect={(dateISO) => {
            setDate(dateISO)
            next()
          }}
        />
      </div>
    </div>
  )
}
