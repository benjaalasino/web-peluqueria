import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { fadeInUp, staggerContainer } from '@/lib/motionVariants'

interface SectionContainerProps {
  id: string
  eyebrow?: string
  title: string
  children: ReactNode
  className?: string
}

export function SectionContainer({ id, eyebrow, title, children, className }: SectionContainerProps) {
  return (
    <section id={id} className={cn('mx-auto max-w-6xl px-6 py-24 md:py-32', className)}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={fadeInUp} className="mb-14 text-center">
          {eyebrow && (
            <span className="mb-3 block font-body text-xs font-semibold tracking-[0.3em] text-gold uppercase">
              {eyebrow}
            </span>
          )}
          <h2 className="font-display text-4xl tracking-wide text-bone md:text-6xl">{title}</h2>
        </motion.div>
        {children}
      </motion.div>
    </section>
  )
}
