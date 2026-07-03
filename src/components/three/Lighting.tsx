import { Environment, Lightformer } from '@react-three/drei'

export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.12} color="#3a2f22" />
      <directionalLight position={[2.4, 3, 3.2]} intensity={3.4} color="#f2d488" />
      <directionalLight position={[-3, 0.6, -2.5]} intensity={1.6} color="#8fb0c9" />
      <directionalLight position={[0, -2, 2]} intensity={0.4} color="#e8c968" />
      <Environment resolution={64}>
        <Lightformer intensity={3} color="#f2d488" position={[2.4, 3, 3.2]} scale={[3, 3, 1]} />
        <Lightformer intensity={1.2} color="#8fb0c9" position={[-3, 0.6, -2.5]} scale={[3, 3, 1]} />
        <Lightformer intensity={0.5} color="#e8c968" position={[0, -2, 2]} scale={[2, 2, 1]} />
      </Environment>
    </>
  )
}
