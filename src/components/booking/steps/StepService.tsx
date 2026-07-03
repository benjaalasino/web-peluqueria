import { services } from '@/data/services'
import { useBookingStore } from '@/store/bookingStore'
import { SelectCard } from '@/components/ui/SelectCard'

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0,
})

export function StepService() {
  const serviceId = useBookingStore((s) => s.serviceId)
  const setService = useBookingStore((s) => s.setService)
  const next = useBookingStore((s) => s.next)

  return (
    <div className="flex flex-col gap-3">
      {services.map((service) => (
        <SelectCard
          key={service.id}
          selected={serviceId === service.id}
          onClick={() => {
            setService(service.id)
            next()
          }}
          title={service.name}
          subtitle={`${service.description} · ${service.durationMin} min`}
          meta={<span className="font-body text-sm font-semibold text-gold">{currencyFormatter.format(service.priceARS)}</span>}
        />
      ))}
    </div>
  )
}
