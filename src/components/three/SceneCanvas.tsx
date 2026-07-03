import { Suspense, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'

export function SceneCanvas({ dpr, children }: { dpr: [number, number]; children: ReactNode }) {
  return (
    <Canvas dpr={dpr} camera={{ position: [0, 0, 5], fov: 35 }} gl={{ antialias: true, alpha: false }}>
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  )
}
