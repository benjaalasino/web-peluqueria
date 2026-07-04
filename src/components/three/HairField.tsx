import { useMemo, useRef, forwardRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { Instances, Instance } from '@react-three/drei'
import { useResponsiveQuality } from '@/hooks/useResponsiveQuality'
import { useViewStore } from '@/store/viewStore'

const SCALP_CENTER = new THREE.Vector3(-1.15, 0.75, -0.3)
const SCALP_SPREAD = new THREE.Vector3(0.55, 0.4, 0.35)
// dirección dominante: la cabellera cae hacia abajo-izquierda
const PRIMARY_DIR = new THREE.Vector3(-0.5, -1, 0.05).normalize()
const UP = new THREE.Vector3(0, 1, 0)
const CONE_HALF_ANGLE = 0.42 // rad, ~24°: spread acotado para que lea como melena y no como erizo

interface Strand {
  root: THREE.Vector3
  baseQuaternion: THREE.Quaternion
  swayAxis: THREE.Vector3
  phase: number
  freq: number
  amplitude: number
  scaleY: number
  scaleXZ: number
}

function randomDirectionInCone(primary: THREE.Vector3, halfAngle: number): THREE.Vector3 {
  const arbitrary = Math.abs(primary.y) < 0.99 ? UP : new THREE.Vector3(1, 0, 0)
  const tangentA = new THREE.Vector3().crossVectors(primary, arbitrary).normalize()
  const tangentB = new THREE.Vector3().crossVectors(primary, tangentA).normalize()

  const angle = Math.random() * halfAngle
  const rot = Math.random() * Math.PI * 2
  const sinA = Math.sin(angle)

  return primary
    .clone()
    .multiplyScalar(Math.cos(angle))
    .add(tangentA.clone().multiplyScalar(Math.cos(rot) * sinA))
    .add(tangentB.clone().multiplyScalar(Math.sin(rot) * sinA))
    .normalize()
}

function buildStrands(count: number): Strand[] {
  const strands: Strand[] = []
  for (let i = 0; i < count; i++) {
    const dir = randomDirectionInCone(PRIMARY_DIR, CONE_HALF_ANGLE)

    const root = SCALP_CENTER.clone().add(
      new THREE.Vector3(
        (Math.random() * 2 - 1) * SCALP_SPREAD.x,
        (Math.random() * 2 - 1) * SCALP_SPREAD.y,
        (Math.random() * 2 - 1) * SCALP_SPREAD.z,
      ),
    )

    const height = 0.9 + Math.random() * 1.15
    const baseQuaternion = new THREE.Quaternion().setFromUnitVectors(UP, dir)
    const swayAngle = Math.random() * Math.PI * 2
    const swayAxis = new THREE.Vector3(Math.cos(swayAngle), 0, Math.sin(swayAngle))

    strands.push({
      root,
      baseQuaternion,
      swayAxis,
      phase: Math.random() * Math.PI * 2,
      freq: 0.5 + Math.random() * 0.5,
      amplitude: 0.03 + Math.random() * 0.05 + (height - 0.9) * 0.02,
      scaleY: height,
      scaleXZ: 0.7 + Math.random() * 0.9,
    })
  }
  return strands
}

type PositionMeshRef = THREE.Object3D

export const HairField = forwardRef<THREE.Group>(function HairField(_props, ref) {
  const { strandCount } = useResponsiveQuality()
  const reducedMotion = useViewStore((s) => s.reducedMotion)
  const strands = useMemo(() => buildStrands(strandCount), [strandCount])
  const instanceRefs = useRef<(PositionMeshRef | null)[]>([])
  const deltaQuat = useMemo(() => new THREE.Quaternion(), [])

  const geometry = useMemo(() => {
    const geo = new THREE.ConeGeometry(0.045, 1, 5, 1, true)
    geo.translate(0, 0.5, 0) // pivote en la base (raíz), la punta queda en +Y
    return geo
  }, [])
  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: '#4a3320', roughness: 0.6, metalness: 0.12 }),
    [],
  )

  useFrame((state) => {
    if (reducedMotion) return
    const t = state.clock.elapsedTime
    strands.forEach((strand, i) => {
      const node = instanceRefs.current[i]
      if (!node) return
      const angle = Math.sin(t * strand.freq + strand.phase) * strand.amplitude
      deltaQuat.setFromAxisAngle(strand.swayAxis, angle)
      node.quaternion.copy(strand.baseQuaternion).multiply(deltaQuat)
    })
  })

  return (
    <group ref={ref}>
      <Instances limit={strandCount} geometry={geometry} material={material}>
        {strands.map((strand, i) => (
          <Instance
            key={i}
            ref={(node: PositionMeshRef | null) => {
              instanceRefs.current[i] = node
            }}
            position={strand.root}
            quaternion={strand.baseQuaternion}
            scale={[strand.scaleXZ, strand.scaleY, strand.scaleXZ]}
          />
        ))}
      </Instances>
    </group>
  )
})
