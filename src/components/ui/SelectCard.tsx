import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SelectCardProps {
  selected: boolean
  onClick: () => void
  title: string
  subtitle?: string
  meta?: ReactNode
}

export function SelectCard({ selected, onClick, title, subtitle, meta }: SelectCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'group relative flex w-full items-center justify-between gap-4 rounded-xl border p-5 text-left transition-colors',
        selected
          ? 'border-gold bg-gold/10'
          : 'border-bone-dim/15 bg-ink-raised hover:border-gold/40',
      )}
    >
      <div>
        <p className="font-display text-xl tracking-wide text-bone">{title}</p>
        {subtitle && <p className="mt-1 font-body text-sm text-bone-dim">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {meta}
        <span
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors',
            selected ? 'border-gold bg-gold text-ink' : 'border-bone-dim/30 text-transparent',
          )}
        >
          <Check size={14} strokeWidth={3} />
        </span>
      </div>
    </motion.button>
  )
}
