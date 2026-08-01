import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { useIsMobile, useMousePosition, usePrefersReducedMotion } from '../../hooks'

type Vec3 = [number, number, number]

interface HeroSceneProps {
  ambient?: boolean
  className?: string
}

function NeuralParticles({ count = 120, ambient = false }: { count?: number; ambient?: boolean }) {
  const ref = useRef<THREE.Points>(null)
  const mouse = useMousePosition()

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    const width = ambient ? 18 : 14
    const height = ambient ? 12 : 10
    const depth = ambient ? 12 : 10

    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * width
      arr[i * 3 + 1] = (Math.random() - 0.5) * height
      arr[i * 3 + 2] = (Math.random() - 0.5) * depth
    }
    return arr
  }, [ambient, count])

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.y = state.clock.elapsedTime * 0.035 + mouse.x * 0.28
    ref.current.rotation.x = mouse.y * 0.2
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={ambient ? 0.03 : 0.035}
        color="#00E5FF"
        transparent
        opacity={ambient ? 0.58 : 0.75}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function FloatingCube({
  position,
  scale = 0.45,
  color = '#00E5FF',
}: {
  position: Vec3
  scale?: number
  color?: string
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!ref.current) return
    ref.current.rotation.x = state.clock.elapsedTime * 0.35
    ref.current.rotation.y = state.clock.elapsedTime * 0.45
  })

  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.2}
          roughness={0.15}
          metalness={0.85}
          emissive={color}
          emissiveIntensity={0.35}
        />
      </mesh>
    </Float>
  )
}

function GlassRing({
  color = '#8B5CF6',
  radius = 1.15,
  tube = 0.025,
  rotation = [Math.PI / 3, 0.2, 0],
  spin = 0.15,
}: {
  color?: string
  radius?: number
  tube?: number
  rotation?: Vec3
  spin?: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.2
    ref.current.rotation.z += delta * spin
  })

  return (
    <mesh ref={ref} rotation={rotation}>
      <torusGeometry args={[radius, tube, 16, 128]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.65}
        transparent
        opacity={0.55}
        roughness={0.2}
        metalness={0.9}
      />
    </mesh>
  )
}

function EnergyRibbon({ color, rotation }: { color: string; rotation: Vec3 }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.12
    ref.current.rotation.z += delta * 0.1
  })

  return (
    <mesh ref={ref} rotation={rotation} scale={1.45}>
      <torusKnotGeometry args={[0.86, 0.008, 160, 8, 2, 3]} />
      <meshBasicMaterial color={color} transparent opacity={0.28} depthWrite={false} />
    </mesh>
  )
}

function OrbitingShard({
  radius,
  speed,
  phase,
  color,
  scale,
}: {
  radius: number
  speed: number
  phase: number
  color: string
  scale: number
}) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime * speed + phase
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.9) * 0.55, Math.sin(t) * 0.75)
    ref.current.rotation.x += delta * 1.6
    ref.current.rotation.y += delta * 1.2
  })

  return (
    <mesh ref={ref} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.42}
        metalness={0.85}
        roughness={0.2}
        transparent
        opacity={0.72}
      />
    </mesh>
  )
}

function CyberSphere({ ambient = false, mobile = false }: { ambient?: boolean; mobile?: boolean }) {
  const mouse = useMousePosition()
  const group = useRef<THREE.Group>(null)

  const basePosition = useMemo<Vec3>(() => {
    if (!ambient) return [1.6, 0, -0.55]
    return mobile ? [0, -0.25, -0.45] : [1.4, -0.05, -0.55]
  }, [ambient, mobile])

  const sphereScale = ambient ? (mobile ? 0.78 : 1.08) : 0.9

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    const driftX = THREE.MathUtils.clamp(Math.sin(t * 0.28) * 0.14 + mouse.x * 0.12, -0.22, 0.22)
    const driftY = THREE.MathUtils.clamp(Math.cos(t * 0.24) * 0.12 + mouse.y * 0.1, -0.18, 0.18)

    group.current.position.set(basePosition[0] + driftX, basePosition[1] + driftY, basePosition[2])
    group.current.rotation.y = t * 0.14 + mouse.x * 0.35
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * 0.24, 0.05)
    group.current.rotation.z = Math.sin(t * 0.16) * 0.06
  })

  return (
    <group ref={group} position={basePosition} scale={sphereScale}>
      <Sphere args={[1.35, 72, 72]}>
        <MeshDistortMaterial
          color="#101522"
          emissive="#00E5FF"
          emissiveIntensity={ambient ? 0.34 : 0.28}
          roughness={0.22}
          metalness={0.78}
          transparent
          opacity={ambient ? 0.68 : 0.55}
          distort={0.32}
          speed={1.85}
        />
      </Sphere>
      <Sphere args={[1.57, 36, 36]}>
        <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={ambient ? 0.16 : 0.12} />
      </Sphere>

      <EnergyRibbon color="#00E5FF" rotation={[0.4, 0.2, 0.7]} />
      <EnergyRibbon color="#8B5CF6" rotation={[1.1, -0.4, -0.35]} />
      <GlassRing color="#8B5CF6" radius={1.16} spin={0.16} />
      <GlassRing color="#22D3EE" radius={1.38} rotation={[1.15, -0.35, 0.45]} spin={-0.12} />
      <GlassRing color="#00E5FF" radius={1.72} tube={0.018} rotation={[0.25, 1.05, -0.15]} spin={0.1} />

      {ambient && (
        <>
          <OrbitingShard radius={2.15} speed={0.85} phase={0.4} color="#22D3EE" scale={0.09} />
          <OrbitingShard radius={2.45} speed={0.62} phase={2.1} color="#8B5CF6" scale={0.075} />
          <OrbitingShard radius={1.98} speed={1.08} phase={4.6} color="#00E5FF" scale={0.065} />
        </>
      )}
    </group>
  )
}

function SceneContent({ mobile, ambient }: { mobile: boolean; ambient: boolean }) {
  const particleCount = ambient ? (mobile ? 80 : 180) : mobile ? 60 : 140

  return (
    <>
      <color attach="background" args={['#050816']} />
      <fog attach="fog" args={['#050816', 6, ambient ? 20 : 18]} />
      <ambientLight intensity={ambient ? 0.42 : 0.35} />
      <pointLight position={[4, 3, 4]} intensity={1.25} color="#00E5FF" />
      <pointLight position={[-4, -2, 2]} intensity={0.95} color="#8B5CF6" />
      <pointLight position={[0, 4, -2]} intensity={0.45} color="#22D3EE" />
      <CyberSphere ambient={ambient} mobile={mobile} />
      <NeuralParticles count={particleCount} ambient={ambient} />
      {!mobile && (
        <>
          <FloatingCube position={[-3.4, 1.5, -1]} color="#00E5FF" />
          <FloatingCube position={[3.6, -1.35, -0.6]} scale={0.35} color="#8B5CF6" />
          <FloatingCube position={[2.3, 1.9, -2]} scale={0.28} color="#22D3EE" />
          <FloatingCube position={[-2.9, -1.65, -1.5]} scale={0.32} color="#8B5CF6" />
        </>
      )}
    </>
  )
}

/** Lazy-friendly immersive R3F background. Ambient mode keeps the sphere fixed site-wide. */
export default function HeroScene({
  ambient = false,
  className = 'absolute inset-0 -z-10',
}: HeroSceneProps) {
  const mobile = useIsMobile()
  const reduced = usePrefersReducedMotion()

  if (reduced) {
    return (
      <div className={`${className} bg-bg`} aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,229,255,0.12),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,92,246,0.15),_transparent_55%)]" />
      </div>
    )
  }

  return (
    <div className={className} aria-hidden>
      <Canvas
        dpr={[1, mobile ? 1.25 : 1.5]}
        camera={{ position: [0, 0, ambient ? 5.4 : 5.1], fov: ambient ? 42 : 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={null}>
          <SceneContent mobile={mobile} ambient={ambient} />
        </Suspense>
      </Canvas>
      <div
        className={
          ambient
            ? 'pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_45%,_transparent_0%,_rgba(5,8,22,0.14)_42%,_rgba(5,8,22,0.86)_100%)]'
            : 'pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg'
        }
      />
    </div>
  )
}
