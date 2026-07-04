import { useRef } from 'react'
import { useMotionValue, useSpring } from 'motion/react'

const STRENGTH = 0.35
const SPRING = { stiffness: 200, damping: 15, mass: 0.4 }

export function useMagneticButton() {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, SPRING)
  const springY = useSpring(y, SPRING)

  function handlePointerMove(e: React.PointerEvent) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    x.set(relX * STRENGTH)
    y.set(relY * STRENGTH)
  }

  function handlePointerLeave() {
    x.set(0)
    y.set(0)
  }

  return { ref, springX, springY, handlePointerMove, handlePointerLeave }
}
