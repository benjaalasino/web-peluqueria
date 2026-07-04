import { motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { heroCopy } from './heroCopy'

export function HeroOverlay({
  onCta,
  onCursorEnter,
  onCursorLeave,
}: {
  onCta: () => void
  onCursorEnter: () => void
  onCursorLeave: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4 } }}
      className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-sm tracking-[0.35em] text-gold-400 uppercase"
      >
        {heroCopy.eyebrow}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-6 max-w-3xl font-display text-5xl leading-tight tracking-wide text-white md:text-7xl"
      >
        {heroCopy.title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-6 max-w-xl text-base text-white/60 md:text-lg"
      >
        {heroCopy.subtitle}
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-10"
        onPointerEnter={onCursorEnter}
        onPointerLeave={onCursorLeave}
      >
        <Button onClick={onCta}>{heroCopy.cta}</Button>
      </motion.div>
    </motion.div>
  )
}
