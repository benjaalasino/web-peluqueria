import { Backdrop } from '@/components/three/Backdrop'
import { Lighting } from '@/components/three/Lighting'
import { HairField } from '@/components/three/HairField'
import { Razor } from '@/components/three/Razor'
import { HAIR_STRAND_COUNT, type QualityTier } from '@/components/three/quality'

export function HeroScene({ tier }: { tier: QualityTier }) {
  return (
    <>
      <Backdrop />
      <Lighting />
      <HairField count={HAIR_STRAND_COUNT[tier]} />
      <group position={[-0.1, 0.25, 1.0]} rotation={[0.05, 0.1, -0.6]} scale={1.1}>
        <Razor />
      </group>
    </>
  )
}
