import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import { Sphere } from '@react-three/drei'

export function FloatingDNA({ count = 20, ...props }: any) {
  const groupRef = useRef<Group>(null)

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = i / count
      const angle = t * Math.PI * 4
      const y = (t - 0.5) * 10
      const radius = 2
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius
      
      temp.push({ position: [x, y, z], phase: Math.random() * Math.PI * 2 })
    }
    return temp
  }, [count])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005
      groupRef.current.children.forEach((child, i) => {
        const time = state.clock.elapsedTime
        child.position.x += Math.sin(time + particles[i].phase) * 0.005
        child.position.z += Math.cos(time + particles[i].phase) * 0.005
      })
    }
  })

  return (
    <group ref={groupRef} {...props}>
      {particles.map((data, i) => (
        <Sphere key={i} args={[0.2, 16, 16]} position={data.position as [number, number, number]}>
          <meshPhysicalMaterial 
            color={i % 2 === 0 ? "#00E5FF" : "#ffffff"}
            emissive={i % 2 === 0 ? "#00E5FF" : "#000000"}
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      ))}
    </group>
  )
}
