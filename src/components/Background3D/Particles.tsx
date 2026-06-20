import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ count = 300 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 40
      p[i * 3 + 1] = (Math.random() - 0.5) * 30
      p[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5
    }
    return p
  }, [count])

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.003
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#E95420" transparent opacity={0.2} sizeAttenuation depthWrite={false} />
    </points>
  )
}