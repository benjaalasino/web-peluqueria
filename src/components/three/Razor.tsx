import { useMemo, forwardRef } from 'react'
import * as THREE from 'three'

function buildBladeShape() {
  const shape = new THREE.Shape()
  shape.moveTo(0, 0.16)
  shape.lineTo(1.8, 0.1)
  shape.quadraticCurveTo(2.15, 0.02, 1.8, -0.14)
  shape.lineTo(0, -0.1)
  shape.closePath()
  return shape
}

export const Razor = forwardRef<THREE.Group>(function Razor(_props, ref) {
  const bladeGeometry = useMemo(() => {
    const shape = buildBladeShape()
    return new THREE.ExtrudeGeometry(shape, { depth: 0.03, bevelEnabled: true, bevelSize: 0.01, bevelThickness: 0.01, bevelSegments: 2 })
  }, [])

  return (
    <group ref={ref} position={[1.35, -1.1, -0.3]} rotation={[0, 0.2, -0.42]} scale={0.62}>
      {/* mango */}
      <mesh position={[-1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow={false}>
        <cylinderGeometry args={[0.16, 0.13, 1.5, 24]} />
        <meshStandardMaterial color="#0d0d0d" roughness={0.55} metalness={0.3} />
      </mesh>
      <mesh position={[-1.05, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.165, 0.165, 0.06, 24]} />
        <meshStandardMaterial color="#c9a227" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* hoja */}
      <group position={[-0.25, 0, 0]}>
        <mesh geometry={bladeGeometry}>
          <meshStandardMaterial color="#c7c7cf" roughness={0.22} metalness={0.95} />
        </mesh>
        {/* filo dorado */}
        <mesh position={[0.9, -0.12, 0.015]}>
          <boxGeometry args={[1.8, 0.015, 0.02]} />
          <meshStandardMaterial
            color="#e9d18b"
            emissive="#c9a227"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={1}
          />
        </mesh>
      </group>
    </group>
  )
})
