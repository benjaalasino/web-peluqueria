import type { ReactNode } from 'react'
import type { HTMLMotionProps } from 'motion/react'
import { motion } from 'motion/react'
import { useMagneticButton } from '@/hooks/useMagneticButton'
import { cn } from '@/lib/utils'

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'ghost'
  children: ReactNode
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  const { ref, springX, springY, handlePointerMove, handlePointerLeave } = useMagneticButton()

  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{ x: springX, y: springY }}
      className={cn(
        'group relative isolate overflow-hidden rounded-full px-8 py-4 font-display text-lg tracking-wide uppercase transition-colors',
        variant === 'primary'
          ? 'bg-gold-500 text-ink-950 hover:bg-gold-400'
          : 'border border-gold-500/40 text-gold-300 hover:border-gold-400',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.55)_50%,transparent_80%)] bg-[length:250%_100%] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-shine"
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
