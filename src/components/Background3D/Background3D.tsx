import { Canvas } from '@react-three/fiber'
import Particles from './Particles'

export default function Background3D() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <ambientLight intensity={0.3} />
      <Particles />
      <mesh position={[-5, 3, -3]} scale={0.3}>
        <icosahedronGeometry />
        <meshStandardMaterial color="#E95420" roughness={0.5} metalness={0.3} transparent opacity={0.08} wireframe />
      </mesh>
      <mesh position={[5, -3, -4]} scale={0.35}>
        <dodecahedronGeometry />
        <meshStandardMaterial color="#77216F" roughness={0.5} metalness={0.3} transparent opacity={0.06} wireframe />
      </mesh>
    </Canvas>
  )
}