import { useEffect } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, X } from 'lucide-react'
import { WizardProgress } from '@/components/booking/WizardProgress'
import { StepService } from '@/components/booking/steps/StepService'
import { StepBarber } from '@/components/booking/steps/StepBarber'
import { StepDate } from '@/components/booking/steps/StepDate'
import { StepTime } from '@/components/booking/steps/StepTime'
import { StepContact } from '@/components/booking/steps/StepContact'
import { StepConfirmation } from '@/components/booking/steps/StepConfirmation'
import { stepVariants } from '@/lib/motionVariants'
import { STEP_COUNT, useBookingStore } from '@/store/bookingStore'
import { useViewStore } from '@/store/viewStore'

const STEPS = [StepService, StepBarber, StepDate, StepTime, StepContact, StepConfirmation]

export function BookingFlow() {
  const step = useBookingStore((s) => s.step)
  const direction = useBookingStore((s) => s.direction)
  const back = useBookingStore((s) => s.back)
  const returnToLanding = useViewStore((s) => s.returnToLanding)

  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  const StepComponent = STEPS[step]
  const isConfirmation = step === STEP_COUNT - 1
  const canGoBack = step > 0 && !isConfirmation

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-ink/97 backdrop-blur-2xl"
      data-testid="booking-flow"
    >
      <div className="mx-auto flex min-h-full max-w-xl flex-col px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          {canGoBack ? (
            <button
              type="button"
              onClick={back}
              className="flex items-center gap-1.5 font-body text-sm text-bone-dim transition-colors hover:text-gold"
            >
              <ArrowLeft size={16} /> Atrás
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={returnToLanding}
            aria-label="Cerrar reserva"
            className="rounded-full p-2 text-bone-dim transition-colors hover:text-gold"
          >
            <X size={20} />
          </button>
        </div>

        <WizardProgress step={step} />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div key={step} custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit">
            <StepComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
