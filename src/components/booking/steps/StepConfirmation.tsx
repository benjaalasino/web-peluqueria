import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { motion } from 'motion/react'
import { services } from '@/data/services'
import { barbers } from '@/data/barbers'
import { Button } from '@/components/ui/Button'
import { useBookingStore } from '@/store/bookingStore'
import { useViewStore } from '@/store/viewStore'

export function StepConfirmation() {
  const record = useBookingStore((s) => s.lastConfirmed)
  const reset = useBookingStore((s) => s.reset)
  const returnToLanding = useViewStore((s) => s.returnToLanding)

  const service = services.find((s) => s.id === record?.serviceId)
  const barber = barbers.find((b) => b.id === record?.barberId)

  return (
    <div className="flex flex-col items-center text-center">
      <motion.svg
        viewBox="0 0 64 64"
        className="h-16 w-16"
        initial="hidden"
        animate="show"
      >
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          className="text-gold"
          variants={{ hidden: { pathLength: 0 }, show: { pathLength: 1, transition: { duration: 0.6, ease: 'easeOut' } } }}
        />
        <motion.path
          d="M19 33.5 L27.5 42 L45 22"
          fill="none"
          stroke="currentColor"
          strokeWidth={3.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            show: { pathLength: 1, opacity: 1, transition: { duration: 0.45, delay: 0.55, ease: 'easeOut' } },
          }}
        />
      </motion.svg>

      <h3 className="mt-6 font-display text-3xl tracking-wide text-bone">¡Turno confirmado!</h3>

      {record && service && barber && (
        <div className="mt-6 w-full rounded-xl border border-bone-dim/15 bg-ink-raised p-6 text-left font-body text-sm text-bone-dim">
          <Row label="Servicio" value={service.name} />
          <Row label="Con" value={barber.name} />
          <Row
            label="Cuándo"
            value={`${format(new Date(`${record.date}T00:00:00`), "EEEE d 'de' MMMM", { locale: es })} a las ${record.time}`}
          />
          <Row label="A nombre de" value={record.contact.name} />
        </div>
      )}

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => {
            reset()
          }}
        >
          Reservar otro turno
        </Button>
        <Button
          className="w-full"
          onClick={() => {
            reset()
            returnToLanding()
          }}
        >
          Volver al inicio
        </Button>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between border-b border-bone-dim/10 py-2 capitalize last:border-0">
      <span className="text-xs tracking-wide text-bone-dim/70 uppercase">{label}</span>
      <span className="text-bone">{value}</span>
    </div>
  )
}
