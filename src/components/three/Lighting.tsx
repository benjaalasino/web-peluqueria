import { Sparkles } from '@react-three/drei'

export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <spotLight
        position={[2.5, 3.2, 4]}
        angle={0.5}
        penumbra={0.55}
        intensity={14}
        color="#fff3d6"
        castShadow={false}
      />
      {/* luz de relleno sobre la cabellera */}
      <pointLight position={[-1.6, 1.4, 1.6]} intensity={3.2} color="#fff3d6" distance={7} decay={2} />
      {/* rim cobrizo por debajo de la melena */}
      <pointLight position={[-2.6, -1, -0.8]} intensity={1.1} color="#c9773f" distance={6} decay={2} />
      {/* brillo extra sobre la navaja */}
      <pointLight position={[1.8, -0.8, 2]} intensity={1.4} color="#e9d18b" distance={6} decay={2} />
      <Sparkles count={40} scale={[6, 4, 3]} size={1.5} speed={0.15} opacity={0.25} color="#e9d18b" />
    </>
  )
}
