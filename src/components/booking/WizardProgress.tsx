import { ChevronLeft } from 'lucide-react'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useBookingStore } from '@/store/bookingStore'

export function WizardProgress() {
  const step = useBookingStore((s) => s.step)
  const back = useBookingStore((s) => s.back)

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={back}
        disabled={step === 0}
        aria-label="Volver"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-gold-500/40 hover:text-gold-300 disabled:opacity-0"
      >
        <ChevronLeft size={18} />
      </button>
      <ProgressBar step={step} />
    </div>
  )
}
