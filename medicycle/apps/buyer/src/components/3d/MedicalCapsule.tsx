import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

export function MedicalCapsule(props: any) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5
      meshRef.current.rotation.z += delta * 0.2
      // subtle floating
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} {...props}>
      <capsuleGeometry args={[1, 3, 32, 32]} />
      <meshPhysicalMaterial 
        color="#00E5FF"
        transmission={0.9}
        opacity={1}
        metalness={0.1}
        roughness={0.1}
        ior={1.5}
        thickness={0.5}
        transparent
      />
    </mesh>
  )
}
