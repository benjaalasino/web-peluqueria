import { useMotionValue } from 'motion/react'

/** Motion values crudos de posición del puntero; no disparan re-render en cada movimiento. */
export function useCursorMotionValues() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  function handlePointerMove(e: React.PointerEvent) {
    x.set(e.clientX)
    y.set(e.clientY)
  }

  return { x, y, handlePointerMove }
}
