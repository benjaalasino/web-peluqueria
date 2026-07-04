import { motion } from 'motion/react'

const STEP_LABELS = ['Servicio', 'Barbero', 'Fecha', 'Hora', 'Datos', 'Listo']

export function ProgressBar({ step }: { step: number }) {
  return (
    <div className="w-full">
      <div className="relative h-1 w-full overflow-hidden rounded-full bg-ink-700">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-copper-500 to-gold-400"
          initial={false}
          animate={{ width: `${(step / (STEP_LABELS.length - 1)) * 100}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
      <div className="mt-3 flex justify-between text-xs tracking-wide text-white/50">
        {STEP_LABELS.map((label, i) => (
          <span
            key={label}
            className={i <= step ? 'text-gold-300' : undefined}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}
