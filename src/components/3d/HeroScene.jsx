import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

const FloatingParticles = () => {
  const count = 100;
  const positions = useRef([]);
  const speeds = useRef([]);
  const points = useRef();

  // Initialize positions and speeds
  React.useEffect(() => {
    positions.current = new Float32Array(count * 3);
    speeds.current = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 10;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 10;
      speeds.current[i] = Math.random() * 0.02 + 0.01;
    }
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positionArray = points.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positionArray[i3 + 1] += speeds.current[i];
      
      if (positionArray[i3 + 1] > 5) {
        positionArray[i3 + 1] = -5;
      }
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions.current}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00D4FF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const DataCube = () => {
  const meshRef = useRef();

  useFrame((state) => {
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.x += 0.003;
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <mesh ref={meshRef}>
        <boxGeometry args={[2, 2, 2]} />
        <meshPhysicalMaterial
          color="#6B46C1"
          transmission={0.7}
          thickness={0.5}
          roughness={0.2}
          metalness={0.5}
        />
      </mesh>
    </Float>
  );
};

const HeroScene = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={75} />
        <Environment preset="city" />
        
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />
        
        <DataCube />
        <FloatingParticles />
        
        <fog attach="fog" args={['#1A1E3D', 10, 20]} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
