import { useRef } from 'react'
import type * as THREE from 'three'
import { Lighting } from './Lighting'
import { Razor } from './Razor'
import { HairField } from './HairField'
import { CameraRig } from './CameraRig'

export function HeroScene() {
  const hairGroupRef = useRef<THREE.Group>(null)
  const razorGroupRef = useRef<THREE.Group>(null)

  return (
    <>
      <CameraRig hairGroupRef={hairGroupRef} razorGroupRef={razorGroupRef} />
      <Lighting />
      <HairField ref={hairGroupRef} />
      <Razor ref={razorGroupRef} />
    </>
  )
}
