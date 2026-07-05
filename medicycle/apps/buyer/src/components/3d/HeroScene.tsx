import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Stars, BakeShadows, Environment, Lightformer } from '@react-three/drei'
import { EffectComposer, Bloom, DepthOfField, Noise } from '@react-three/postprocessing'
import * as THREE from 'three'

function Capsule() {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <group ref={meshRef} scale={1.5}>
      {/* Top Half */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
        <meshPhysicalMaterial 
          color="#3399ff" 
          transparent 
          opacity={0.9} 
          roughness={0.1}
          transmission={0.5}
          thickness={0.5}
        />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial 
          color="#3399ff" 
          transparent 
          opacity={0.9} 
          roughness={0.1}
          transmission={0.5}
          thickness={0.5}
        />
      </mesh>

      {/* Bottom Half */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>
      <mesh position={[0, -1, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[0.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
      </mesh>

      {/* Center Ring */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.52, 0.52, 0.1, 32]} />
        <meshStandardMaterial color="#e0e0e0" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function Molecules() {
  const group = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <group ref={group}>
      {[...Array(12)].map((_, i) => (
        <mesh 
          key={i} 
          position={[
            Math.sin((i / 12) * Math.PI * 2) * 3,
            Math.cos((i / 12) * Math.PI * 2) * 2 + Math.sin(i * 100),
            Math.sin(i) * 2
          ]}
        >
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color="#3399ff" />
        </mesh>
      ))}
      {/* Connecting lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[new Float32Array([...Array(72)].map(() => (Math.random() - 0.5) * 8)), 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#3399ff" transparent opacity={0.2} />
      </lineSegments>
    </group>
  )
}

function GlassCard({ position, rotation, delay }: { position: [number, number, number], rotation: [number, number, number], delay: number }) {
  const mesh = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.2
    }
  })

  return (
    <mesh ref={mesh} position={position} rotation={rotation}>
      <boxGeometry args={[2, 3, 0.1]} />
      <meshPhysicalMaterial 
        roughness={0.2}
        transmission={1}
        thickness={0.5}
        color="#ffffff"
        opacity={0.3}
        transparent
      />
    </mesh>
  )
}

function Scene() {
  const mouse = useRef({ x: 0, y: 0 })
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    // Smooth mouse parallax
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, (state.mouse.x * Math.PI) / 10, 0.05)
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, (state.mouse.y * Math.PI) / 10, 0.05)
    
    if (group.current) {
      group.current.rotation.y = mouse.current.x
      group.current.rotation.x = -mouse.current.y
    }
  })

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Capsule />
      </Float>
      
      <Molecules />
      
      <GlassCard position={[-3, 1, -2]} rotation={[0.2, 0.5, -0.1]} delay={0} />
      <GlassCard position={[3, -1, -1]} rotation={[-0.2, -0.5, 0.1]} delay={1} />
      
      <Stars radius={10} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
    </group>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 h-full w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <spotLight position={[-10, -10, -10]} angle={0.15} penumbra={1} intensity={2} color="#3399ff" />
        
        <Environment preset="city">
          <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
        </Environment>

        <Scene />

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />
          <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
          <Noise opacity={0.03} />
        </EffectComposer>
        
        <BakeShadows />
      </Canvas>
    </div>
  )
}
