import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { motion } from 'motion/react'
import { Checkmark } from '@/components/ui/Checkmark'
import { Button } from '@/components/ui/Button'
import { services } from '@/data/services'
import { barbers } from '@/data/barbers'
import { useBookingStore } from '@/store/bookingStore'
import { useViewStore } from '@/store/viewStore'

export function StepConfirmation() {
  const record = useBookingStore((s) => s.confirmedRecord)
  const reset = useBookingStore((s) => s.reset)
  const returnToLanding = useViewStore((s) => s.returnToLanding)

  const service = services.find((s) => s.id === record?.serviceId)
  const barber = barbers.find((b) => b.id === record?.barberId)

  function handleClose() {
    reset()
    returnToLanding()
  }

  return (
    <div className="flex flex-col items-center text-center">
      <Checkmark />
      <motion.h3
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 font-display text-3xl tracking-wide text-white"
      >
        ¡Turno confirmado!
      </motion.h3>
      {record && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 space-y-1 text-sm text-white/60"
        >
          <p>{service?.name}</p>
          <p>
            con {barber?.name} ·{' '}
            {format(new Date(`${record.date}T00:00:00`), "d 'de' MMMM", { locale: es })} a las{' '}
            {record.time}
          </p>
        </motion.div>
      )}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-10">
        <Button variant="ghost" onClick={handleClose}>
          Volver al inicio
        </Button>
      </motion.div>
    </div>
  )
}
