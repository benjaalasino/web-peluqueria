import { STEP_COUNT } from '@/store/bookingStore'
import { cn } from '@/lib/utils'

const LABELS = ['Servicio', 'Barbero', 'Fecha', 'Hora', 'Datos', 'Listo']

export function WizardProgress({ step }: { step: number }) {
  return (
    <div className="mb-10">
      <div className="flex h-1 gap-1.5 overflow-hidden rounded-full bg-bone-dim/10">
        {Array.from({ length: STEP_COUNT }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-full flex-1 rounded-full transition-colors duration-300',
              i <= step ? 'bg-gold' : 'bg-transparent',
            )}
          />
        ))}
      </div>
      <p className="mt-3 font-body text-xs font-semibold tracking-[0.25em] text-gold uppercase">
        {LABELS[step]}
      </p>
    </div>
  )
}
