import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AmbientOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0, -2]}>
      <sphereGeometry args={[2, 64, 64]} />
      <MeshDistortMaterial color="#C2410C" distort={0.4} speed={2} opacity={0.15} transparent />
    </mesh>
  );
}

function FloatingAccents() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, 2, -1]}>
          <icosahedronGeometry args={[0.3]} />
          <meshStandardMaterial color="#FAF3E0" />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[4, 1.5, -3]}>
          <torusGeometry args={[0.2, 0.08, 16, 32]} />
          <meshStandardMaterial color="#C9A87C" />
        </mesh>
      </Float>
      <Float speed={1} rotationIntensity={2} floatIntensity={3}>
        <mesh position={[-2, -1.5, -2]}>
          <icosahedronGeometry args={[0.4]} />
          <meshStandardMaterial color="#C2410C" />
        </mesh>
      </Float>
    </>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 80 : 200;
  
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
      pointsRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial color="#C9A87C" opacity={0.3} size={0.02} transparent sizeAttenuation />
    </Points>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full" gl={{ alpha: true }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} color="#C2410C" intensity={1.5} />
        <pointLight position={[-5, 3, -5]} color="#FAF3E0" intensity={0.5} />
        <AmbientOrb />
        <FloatingAccents />
        <ParticleField />
      </Canvas>
    </div>
  );
}
