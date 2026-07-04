import { motion, type MotionValue } from 'motion/react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

interface CustomCursorProps {
  x: MotionValue<number>
  y: MotionValue<number>
  active: boolean
}

export function CustomCursor({ x, y, active }: CustomCursorProps) {
  const isCoarsePointer = useMediaQuery('(pointer: coarse)')

  if (isCoarsePointer) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-50 -translate-x-1/2 -translate-y-1/2 text-gold-400 mix-blend-difference"
      style={{ x, y, scale: active ? 1.3 : 1 }}
      animate={{ opacity: active ? 1 : 0.7 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 4 L20 12 L4 20 L8 12 Z"
          fill="currentColor"
        />
      </svg>
    </motion.div>
  )
}
