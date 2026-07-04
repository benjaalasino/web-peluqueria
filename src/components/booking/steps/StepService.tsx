import { motion } from 'motion/react'
import { services } from '@/data/services'
import { useBookingStore } from '@/store/bookingStore'
import { cn } from '@/lib/utils'

export function StepService() {
  const serviceId = useBookingStore((s) => s.serviceId)
  const setService = useBookingStore((s) => s.setService)
  const next = useBookingStore((s) => s.next)

  return (
    <div>
      <h3 className="font-display text-3xl tracking-wide text-white">Elegí un servicio</h3>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <motion.button
            key={service.id}
            onClick={() => {
              setService(service.id)
              next()
            }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              'rounded-xl border p-5 text-left transition-colors',
              serviceId === service.id
                ? 'border-gold-500 bg-gold-500/10'
                : 'border-white/10 bg-ink-800 hover:border-gold-500/40',
            )}
          >
            <p className="font-display text-lg tracking-wide text-white">{service.name}</p>
            <p className="mt-1 text-xs text-white/50">{service.description}</p>
            <div className="mt-3 flex justify-between text-xs">
              <span className="text-white/40">{service.durationMin} min</span>
              <span className="text-gold-300">${service.priceARS.toLocaleString('es-AR')}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
