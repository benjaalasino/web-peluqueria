import { motion } from 'motion/react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { useMagneticButton } from '@/hooks/useMagneticButton'
import { cn } from '@/lib/utils'
import { prefersReducedMotion } from '@/lib/reducedMotion'

type NativeButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onAnimationStart' | 'onAnimationEnd' | 'onDrag' | 'onDragStart' | 'onDragEnd'
>

interface ButtonProps extends NativeButtonProps {
  children: ReactNode
  variant?: 'primary' | 'ghost'
}

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  const magnetic = useMagneticButton(prefersReducedMotion())

  return (
    <motion.button
      ref={magnetic.ref}
      style={magnetic.style}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      whileTap={{ scale: 0.96 }}
      className={cn(
        'group relative isolate overflow-hidden rounded-full px-8 py-3.5 font-body text-sm font-medium tracking-wide uppercase transition-colors',
        variant === 'primary' && 'bg-gold text-ink hover:bg-gold-bright',
        variant === 'ghost' && 'border border-bone-dim/30 text-bone hover:border-gold/60 hover:text-gold',
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0 bg-[linear-gradient(110deg,transparent_40%,rgba(255,255,255,0.5)_50%,transparent_60%)] bg-[length:200%_100%] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-shine"
      />
    </motion.button>
  )
}
