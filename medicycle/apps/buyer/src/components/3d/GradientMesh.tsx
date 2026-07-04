import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export function GradientMesh() {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -10]} scale={15}>
      <planeGeometry args={[2, 2, 64, 64]} />
      <meshPhysicalMaterial 
        color="#0a0a0a"
        emissive="#00E5FF"
        emissiveIntensity={0.2}
        wireframe={true}
        transparent
        opacity={0.15}
      />
    </mesh>
  )
}
