import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const TechElement = ({ position, text, color = '#00D4FF', scale = 1 }) => {
  const mesh = useRef();
  const initialPosition = position;

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Floating animation
    mesh.current.position.y = initialPosition[1] + Math.sin(time) * 0.2;
    
    // Slow rotation
    mesh.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    mesh.current.rotation.y = Math.cos(time * 0.2) * 0.1;
  });

  return (
    <group ref={mesh} position={position} scale={scale}>
      <Text
        color={color}
        fontSize={0.5}
        maxWidth={2}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        font="https://fonts.gstatic.com/s/jetbrainsmono/v13/tDbY2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKxTOlOV.woff"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};

const FloatingElements = () => {
  const elements = [
    { text: "ML", position: [-5, 2, -5], color: '#6B46C1' },
    { text: "AI", position: [5, -2, -3], color: '#00D4FF' },
    { text: "Data", position: [-3, -1, -4], color: '#FFB800' },
    { text: "Cloud", position: [4, 3, -6], color: '#00FF88' },
    { text: "React", position: [-4, 4, -5], color: '#00D4FF' },
    { text: "Python", position: [3, 1, -4], color: '#6B46C1' },
  ];

  return (
    <group>
      {elements.map((element, index) => (
        <TechElement
          key={index}
          position={element.position}
          text={element.text}
          color={element.color}
        />
      ))}
    </group>
  );
};

export default FloatingElements;
