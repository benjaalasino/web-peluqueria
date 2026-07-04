import { useEffect } from 'react'
import { useReducedMotion as useMotionReducedMotion } from 'motion/react'
import { useViewStore } from '@/store/viewStore'

/** Fuente única de verdad para prefers-reduced-motion, sincronizada al viewStore. */
export function useSyncReducedMotion() {
  const prefersReduced = useMotionReducedMotion()
  const setReducedMotion = useViewStore((s) => s.setReducedMotion)

  useEffect(() => {
    setReducedMotion(Boolean(prefersReduced))
  }, [prefersReduced, setReducedMotion])
}
