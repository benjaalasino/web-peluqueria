import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'
import { useBookingStore } from '@/store/bookingStore'
import { useViewStore } from '@/store/viewStore'
import { WizardProgress } from './WizardProgress'
import { StepService } from './steps/StepService'
import { StepBarber } from './steps/StepBarber'
import { StepDate } from './steps/StepDate'
import { StepTime } from './steps/StepTime'
import { StepContact } from './steps/StepContact'
import { StepConfirmation } from './steps/StepConfirmation'

const STEPS = [StepService, StepBarber, StepDate, StepTime, StepContact, StepConfirmation]

const variants = {
  enter: (direction: 1 | -1) => ({ opacity: 0, x: direction * 40 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: 1 | -1) => ({ opacity: 0, x: direction * -40 }),
}

export function BookingFlow() {
  const step = useBookingStore((s) => s.step)
  const direction = useBookingStore((s) => s.direction)
  const reset = useBookingStore((s) => s.reset)
  const returnToLanding = useViewStore((s) => s.returnToLanding)

  const StepComponent = STEPS[step]
  const isConfirmation = step === STEPS.length - 1

  function handleClose() {
    reset()
    returnToLanding()
  }

  return (
    <motion.div
      data-booking-flow
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-ink-950/95 px-6 py-16 backdrop-blur-md"
    >
      <div className="w-full max-w-2xl">
        {!isConfirmation && (
          <>
            <div className="mb-10 flex items-center justify-between">
              <div className="flex-1">
                <WizardProgress />
              </div>
              <button
                onClick={handleClose}
                aria-label="Cerrar"
                className="ml-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-gold-500/40 hover:text-gold-300"
              >
                <X size={18} />
              </button>
            </div>
          </>
        )}
        <div className="relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <StepComponent />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
