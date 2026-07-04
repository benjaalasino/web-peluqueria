import { useMemo } from 'react'
import { AnimatePresence } from 'motion/react'
import { useViewStore } from '@/store/viewStore'
import { SceneCanvas } from '@/components/three/SceneCanvas'
import { HeroScene } from '@/components/three/HeroScene'
import { StaticHeroFallback } from '@/components/three/StaticHeroFallback'
import { hasWebGLSupport } from '@/lib/webglSupport'
import { HeroOverlay } from './HeroOverlay'

export function Hero({ onCursorActiveChange }: { onCursorActiveChange: (active: boolean) => void }) {
  const view = useViewStore((s) => s.view)
  const startTransition = useViewStore((s) => s.startTransition)
  const webglSupported = useMemo(() => hasWebGLSupport(), [])

  return (
    <div id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 40%, rgba(201,162,39,0.14), transparent 70%), radial-gradient(120% 100% at 50% 100%, #0a0a0a, #000)',
        }}
      />
      {webglSupported ? (
        <SceneCanvas>
          <HeroScene />
        </SceneCanvas>
      ) : (
        <StaticHeroFallback />
      )}
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <HeroOverlay
            key="hero-overlay"
            onCta={startTransition}
            onCursorEnter={() => onCursorActiveChange(true)}
            onCursorLeave={() => onCursorActiveChange(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
