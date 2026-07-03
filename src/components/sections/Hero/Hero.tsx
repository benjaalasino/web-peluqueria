import { useState } from 'react'
import { motion } from 'motion/react'
import { Button } from '@/components/ui/Button'
import { useViewStore } from '@/store/viewStore'
import { SceneCanvas } from '@/components/three/SceneCanvas'
import { HeroScene } from '@/components/three/HeroScene'
import { StaticHeroFallback } from '@/components/three/StaticHeroFallback'
import { detectQualityTier, DPR_CAP } from '@/components/three/quality'
import { hasWebGLSupport } from '@/lib/webglSupport'

export function Hero() {
  const startTransition = useViewStore((state) => state.startTransition)
  const [tier] = useState(detectQualityTier)
  const [webglOK] = useState(hasWebGLSupport)

  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink">
      <div className="absolute inset-0">
        {webglOK ? (
          <SceneCanvas dpr={DPR_CAP[tier]}>
            <HeroScene tier={tier} />
          </SceneCanvas>
        ) : (
          <StaticHeroFallback />
        )}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(6,6,6,0.85),transparent_55%)]"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative z-10"
      >
        <Button onClick={startTransition}>Reservar turnos</Button>
      </motion.div>
    </section>
  )
}
