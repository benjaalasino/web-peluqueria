import { useMemo, forwardRef } from 'react'
import * as THREE from 'three'

function buildBladeGeometry() {
  const length = 1.9
  const width = 0.34
  const shape = new THREE.Shape()
  shape.moveTo(0, 0)
  shape.lineTo(length * 0.82, width * 0.06)
  shape.lineTo(length, -width * 0.42)
  shape.lineTo(length * 0.82, -width)
  shape.lineTo(0, -width * 0.94)
  shape.closePath()

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: 0.05,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
    curveSegments: 8,
  })
  geometry.center()
  return geometry
}

function buildHandleGeometry() {
  return new THREE.CylinderGeometry(0.095, 0.14, 1.7, 32, 1)
}

export const Razor = forwardRef<THREE.Group>(function Razor(_props, ref) {
  const bladeGeometry = useMemo(() => buildBladeGeometry(), [])
  const handleGeometry = useMemo(() => buildHandleGeometry(), [])

  return (
    <group ref={ref} rotation={[0, 0, THREE.MathUtils.degToRad(-18)]}>
      <mesh geometry={bladeGeometry} position={[1.05, 0.1, 0]} castShadow={false}>
        <meshPhysicalMaterial
          color="#e8c968"
          metalness={1}
          roughness={0.18}
          clearcoat={0.6}
          clearcoatRoughness={0.15}
        />
      </mesh>
      <mesh geometry={handleGeometry} position={[-0.75, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#1a1613" metalness={0.15} roughness={0.55} />
      </mesh>
      <mesh position={[-1.55, 0, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#1a1613" metalness={0.15} roughness={0.55} />
      </mesh>
    </group>
  )
})
