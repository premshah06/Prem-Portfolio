import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const DataStreams = ({ count = 100, color = '#00D4FF' }) => {
  const mesh = useRef();
  const light = useRef();

  // Generate random particles
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      const x = Math.random() * 100 - 50;
      const y = Math.random() * 100 - 50;
      const z = Math.random() * 100 - 50;

      temp.push({ time, factor, speed, x, y, z });
    }
    return temp;
  }, [count]);

  // Create particle geometry
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particles.length * 3);
    
    particles.forEach((particle, i) => {
      positions.set([particle.x, particle.y, particle.z], i * 3);
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [particles]);

  // Animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    particles.forEach((particle, i) => {
      const i3 = i * 3;
      const position = mesh.current.geometry.attributes.position.array;

      // Update particle position
      position[i3] = particle.x + Math.sin(particle.time + time * particle.speed) * particle.factor;
      position[i3 + 1] = particle.y + Math.cos(particle.time + time * particle.speed) * particle.factor;
      position[i3 + 2] = particle.z + Math.sin(particle.time + time * particle.speed) * particle.factor;
    });

    mesh.current.geometry.attributes.position.needsUpdate = true;

    // Rotate light
    if (light.current) {
      light.current.position.set(
        Math.sin(time) * 50,
        Math.cos(time) * 50,
        Math.sin(time * 2) * 50
      );
    }
  });

  return (
    <group>
      <pointLight ref={light} distance={100} intensity={4} color={color} />
      <points ref={mesh} geometry={particleGeometry}>
        <pointsMaterial
          size={0.15}
          color={color}
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
};

export default DataStreams;
