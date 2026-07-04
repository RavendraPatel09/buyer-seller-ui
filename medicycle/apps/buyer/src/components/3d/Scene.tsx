import { Canvas } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import { MedicalCapsule } from './MedicalCapsule'
import { FloatingDNA } from './FloatingDNA'
import { GradientMesh } from './GradientMesh'
import { Suspense, useEffect, useState } from 'react'

export function Scene() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <group 
            rotation={[
              mousePosition.y * 0.1, 
              mousePosition.x * 0.1, 
              0
            ]}
          >
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <MedicalCapsule position={[4, 0, 0]} />
            </Float>
            <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
              <FloatingDNA position={[-4, 0, -2]} scale={0.5} />
            </Float>
            <GradientMesh />
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}
