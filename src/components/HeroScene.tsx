import * as THREE from 'three';
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

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
      <sphereGeometry args={[2.5, 64, 64]} />
      <MeshDistortMaterial
        color="#C2410C"
        distort={0.4}
        speed={2}
        transparent
        opacity={0.15}
        roughness={0.2}
      />
    </mesh>
  );
}

function FloatingAccents() {
  return (
    <>
      <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, 2, -3]} scale={0.4}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#C9A87C" transparent opacity={0.6} wireframe />
        </mesh>
      </Float>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh position={[4, -2, -1]} scale={0.3}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#FAF3E0" transparent opacity={0.4} wireframe />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-4, -1, -2]} scale={0.5}>
          <torusGeometry args={[0.5, 0.2, 16, 32]} />
          <meshStandardMaterial color="#C2410C" transparent opacity={0.3} wireframe />
        </mesh>
      </Float>
    </>
  );
}

function ParticleField({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const temp = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 20;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 20;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0005;
      pointsRef.current.rotation.x += 0.0002;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 3} args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#C9A87C" transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

export function HeroScene() {
  const [particleCount, setParticleCount] = useState(200);

  useEffect(() => {
    const handleResize = () => {
      setParticleCount(window.innerWidth < 768 ? 80 : 200);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} color="#C2410C" intensity={2} decay={2} />
      <pointLight position={[-5, 3, -5]} color="#FAF3E0" intensity={0.8} decay={2} />
      <AmbientOrb />
      <FloatingAccents />
      <ParticleField count={particleCount} />
    </Canvas>
  );
}
