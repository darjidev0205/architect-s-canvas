import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function FloatingKnot() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = t * 0.18;
    ref.current.rotation.y = t * 0.22;
    ref.current.position.y = Math.sin(t * 0.6) * 0.2;
  });

  return (
    <mesh ref={ref} scale={1.4}>
      <torusKnotGeometry args={[1, 0.28, 220, 32]} />
      <meshStandardMaterial
        color="#7dd3fc"
        emissive="#3b82f6"
        emissiveIntensity={0.35}
        metalness={0.9}
        roughness={0.18}
        wireframe
      />
    </mesh>
  );
}

function Particles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
    }
    return arr;
  }, [count]);

  useFrame((s) => {
    if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#a78bfa" sizeAttenuation transparent opacity={0.7} />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#60a5fa" />
      <pointLight position={[-5, -2, -3]} intensity={0.8} color="#c084fc" />
      <FloatingKnot />
      <Particles />
    </Canvas>
  );
}
