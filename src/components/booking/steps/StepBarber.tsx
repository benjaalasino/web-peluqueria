import { barbers } from '@/data/barbers'
import { useBookingStore } from '@/store/bookingStore'
import { SelectCard } from '@/components/ui/SelectCard'

export function StepBarber() {
  const barberId = useBookingStore((s) => s.barberId)
  const setBarber = useBookingStore((s) => s.setBarber)
  const next = useBookingStore((s) => s.next)

  return (
    <div className="flex flex-col gap-3">
      {barbers.map((barber) => (
        <SelectCard
          key={barber.id}
          selected={barberId === barber.id}
          onClick={() => {
            setBarber(barber.id)
            next()
          }}
          title={barber.name}
          subtitle={`${barber.role} — ${barber.bio}`}
        />
      ))}
    </div>
  )
}
