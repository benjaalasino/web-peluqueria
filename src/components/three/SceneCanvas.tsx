import { Suspense, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { useResponsiveQuality } from '@/hooks/useResponsiveQuality'

export function SceneCanvas({ children }: { children: ReactNode }) {
  const quality = useResponsiveQuality()

  return (
    <Canvas
      dpr={quality.dpr}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0.2, 6], fov: 35 }}
      className="!absolute !inset-0"
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  )
}
