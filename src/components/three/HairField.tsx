import { useMemo } from 'react'
import * as THREE from 'three'
import { Instances, Instance } from '@react-three/drei'

const GOLD_BROWNS = ['#1c140f', '#241a13', '#160f0b', '#2c2016']

function buildStrandGeometry() {
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0.11, -0.55, 0.03),
    new THREE.Vector3(-0.05, -1.05, -0.03),
    new THREE.Vector3(0.07, -1.55, 0.02),
  ])
  return new THREE.TubeGeometry(curve, 16, 1, 5, false)
}

interface StrandTransform {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  color: string
}

function buildTransforms(count: number): StrandTransform[] {
  return Array.from({ length: count }, () => {
    // full-frame coverage: hair fills the whole viewport, not just a central lock
    const rootX = THREE.MathUtils.randFloat(-2.8, 2.8)
    const rootY = THREE.MathUtils.randFloat(-1.6, 2.4)
    const rootZ = THREE.MathUtils.randFloat(-0.8, 0.8)
    const lengthScale = THREE.MathUtils.randFloat(0.7, 1.1)
    const thickness = THREE.MathUtils.randFloat(0.008, 0.016)
    const twist = THREE.MathUtils.randFloat(-0.25, 0.25)
    const tiltZ = THREE.MathUtils.randFloat(-0.12, 0.12)
    return {
      position: [rootX, rootY, rootZ],
      rotation: [0, twist, tiltZ],
      scale: [thickness, lengthScale, thickness],
      color: GOLD_BROWNS[Math.floor(Math.random() * GOLD_BROWNS.length)],
    }
  })
}

export function HairField({ count }: { count: number }) {
  const geometry = useMemo(() => buildStrandGeometry(), [])
  const transforms = useMemo(() => buildTransforms(count), [count])

  return (
    <Instances geometry={geometry} limit={count}>
      <meshStandardMaterial roughness={0.55} metalness={0.05} />
      {transforms.map((t, i) => (
        <Instance key={i} position={t.position} rotation={t.rotation} scale={t.scale} color={t.color} />
      ))}
    </Instances>
  )
}
