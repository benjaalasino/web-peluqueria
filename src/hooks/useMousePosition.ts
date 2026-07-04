import { useEffect, useRef } from 'react'

/** Posición normalizada del mouse en [-1, 1], leída via ref para no re-renderizar en cada movimiento. */
export function useMousePosition() {
  const position = useRef({ x: 0, y: 0 })

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      position.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      }
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [])

  return position
}
