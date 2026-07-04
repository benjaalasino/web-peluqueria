import type { ReactNode } from 'react'
import { motion } from 'motion/react'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'span'
}

export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </Component>
  )
}

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  )
}

export const revealItemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}
