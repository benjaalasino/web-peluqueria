import { useRef } from 'react'
import { useMotionValue, useSpring } from 'motion/react'
import type { MouseEvent } from 'react'

const STRENGTH = 0.35
const MAX_OFFSET = 14

export function useMagneticButton(disabled = false) {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 })

  function onMouseMove(event: MouseEvent<HTMLButtonElement>) {
    if (disabled || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const offsetX = event.clientX - (rect.left + rect.width / 2)
    const offsetY = event.clientY - (rect.top + rect.height / 2)
    x.set(clamp(offsetX * STRENGTH, -MAX_OFFSET, MAX_OFFSET))
    y.set(clamp(offsetY * STRENGTH, -MAX_OFFSET, MAX_OFFSET))
  }

  function onMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return { ref, style: { x: springX, y: springY }, onMouseMove, onMouseLeave }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}
