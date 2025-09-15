import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const SiliconBackground = () => {
  // Generate grid points
  const count = 1000;
  const gridSize = 50;
  
  const points = useMemo(() => {
    const points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * gridSize;
      const y = (Math.random() - 0.5) * gridSize;
      const z = (Math.random() - 0.5) * 10;
      points.set([x, y, z], i * 3);
    }
    return points;
  }, []);

  // Create grid lines
  const gridLines = useMemo(() => {
    const lines = [];
    const size = gridSize / 2;
    const divisions = 20;
    const step = size * 2 / divisions;

    // Create horizontal and vertical lines
    for (let i = -size; i <= size; i += step) {
      // Horizontal lines
      lines.push(
        new THREE.Vector3(-size, i, 0),
        new THREE.Vector3(size, i, 0)
      );
      // Vertical lines
      lines.push(
        new THREE.Vector3(i, -size, 0),
        new THREE.Vector3(i, size, 0)
      );
    }

    return new Float32Array(lines.flatMap(v => [v.x, v.y, v.z]));
  }, []);

  // Animation
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      Math.sin(time / 2) * 2 + 15,
      0.01
    );
  });

  return (
    <group>
      {/* Grid points */}
      <Points positions={points}>
        <PointMaterial
          transparent
          color="#00D4FF"
          size={0.1}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.2}
        />
      </Points>

      {/* Grid lines */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={gridLines.length / 3}
            array={gridLines}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00D4FF"
          transparent
          opacity={0.1}
          linewidth={1}
        />
      </lineSegments>
    </group>
  );
};

export default SiliconBackground;
