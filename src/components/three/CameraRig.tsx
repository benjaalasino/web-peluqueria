import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useResponsiveQuality } from '@/hooks/useResponsiveQuality'
import { useViewStore } from '@/store/viewStore'

const REST_POSITION = new THREE.Vector3(0, 0.2, 6)
const ZOOM_TARGET = new THREE.Vector3(-0.55, 0.15, 1.8)
const REST_FOV = 35
const ZOOM_FOV = 52
const PARALLAX_STRENGTH = 0.4
const TRANSITION_DURATION = 1.9

function setGroupOpacity(group: THREE.Object3D | null, opacity: number) {
  if (!group) return
  group.traverse((obj) => {
    const mesh = obj as THREE.Mesh
    if (mesh.isMesh && mesh.material) {
      const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      materials.forEach((mat) => {
        const m = mat as THREE.Material
        m.transparent = true
        m.opacity = opacity
      })
    }
  })
}

interface CameraRigProps {
  hairGroupRef: React.RefObject<THREE.Group | null>
  razorGroupRef: React.RefObject<THREE.Group | null>
}

export function CameraRig({ hairGroupRef, razorGroupRef }: CameraRigProps) {
  const mouse = useMousePosition()
  const { parallax } = useResponsiveQuality()
  const view = useViewStore((s) => s.view)
  const reducedMotion = useViewStore((s) => s.reducedMotion)
  const completeTransition = useViewStore((s) => s.completeTransition)
  const transitionStart = useRef<number | null>(null)
  const restTarget = useRef(new THREE.Vector3())
  const baseRazorRotationZ = useRef<number | null>(null)

  useFrame((state) => {
    const { camera } = state
    const perspectiveCamera = camera as THREE.PerspectiveCamera

    if (view === 'landing') {
      transitionStart.current = null
      setGroupOpacity(hairGroupRef.current, 1)
      setGroupOpacity(razorGroupRef.current, 1)
      if (razorGroupRef.current && baseRazorRotationZ.current !== null) {
        razorGroupRef.current.rotation.z = baseRazorRotationZ.current
      }
      if (perspectiveCamera.fov !== REST_FOV) {
        perspectiveCamera.fov = REST_FOV
        perspectiveCamera.updateProjectionMatrix()
      }

      const enableParallax = parallax && !reducedMotion
      restTarget.current.set(
        REST_POSITION.x + (enableParallax ? mouse.current.x * PARALLAX_STRENGTH : 0),
        REST_POSITION.y + (enableParallax ? -mouse.current.y * PARALLAX_STRENGTH * 0.6 : 0),
        REST_POSITION.z,
      )
      camera.position.lerp(restTarget.current, 0.06)
      camera.lookAt(0, -0.1, 0)
      return
    }

    if (view === 'transitioning') {
      if (razorGroupRef.current && baseRazorRotationZ.current === null) {
        baseRazorRotationZ.current = razorGroupRef.current.rotation.z
      }
      if (transitionStart.current === null) transitionStart.current = state.clock.elapsedTime
      const elapsed = state.clock.elapsedTime - transitionStart.current
      const t = THREE.MathUtils.clamp(elapsed / TRANSITION_DURATION, 0, 1)

      // fase 1: corte (0 - 0.22) — la navaja gira como si cortara un mechón
      const cutT = THREE.MathUtils.smoothstep(t, 0, 0.22)
      if (razorGroupRef.current && baseRazorRotationZ.current !== null) {
        razorGroupRef.current.rotation.z = baseRazorRotationZ.current - cutT * 0.6
      }

      // fase 2: zoom (0.12 - 0.72) — la cámara avanza hacia la cabellera
      const zoomT = THREE.MathUtils.smoothstep(t, 0.12, 0.72)
      camera.position.lerpVectors(REST_POSITION, ZOOM_TARGET, zoomT)
      perspectiveCamera.fov = THREE.MathUtils.lerp(REST_FOV, ZOOM_FOV, zoomT)
      perspectiveCamera.updateProjectionMatrix()
      camera.lookAt(-0.55, 0, 0)

      // fase 3: cortina (0.55 - 1) — mechones y navaja se desvanecen a negro
      const fadeT = THREE.MathUtils.smoothstep(t, 0.55, 1)
      setGroupOpacity(hairGroupRef.current, 1 - fadeT)
      setGroupOpacity(razorGroupRef.current, 1 - fadeT)

      if (t >= 1) completeTransition()
      return
    }

    // view === 'booking': cámara asentada, escena queda oculta detrás del overlay
  })

  return null
}
