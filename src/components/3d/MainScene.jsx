import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF, Stats } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { useFrame } from '@react-three/fiber';

// Lazy load components
const SiliconBackground = lazy(() => import('./SiliconBackground'));
const DataStreams = lazy(() => import('./DataStreams'));
const FloatingElements = lazy(() => import('./FloatingElements'));

const LoadingFallback = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[#0A0E27]">
    <div className="text-electric animate-pulse">Loading 3D Scene...</div>
  </div>
);

const PerformanceMonitor = () => {
  const [showStats, setShowStats] = useState(false);
  
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'p') setShowStats(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return showStats ? <Stats /> : null;
};

const Scene = () => {
  const [quality, setQuality] = useState('high');
  
  useEffect(() => {
    const checkPerformance = () => {
      const fps = performance.now() / 1000;
      if (fps < 30 && quality === 'high') {
        setQuality('low');
      }
    };
    
    const interval = setInterval(checkPerformance, 5000);
    return () => clearInterval(interval);
  }, [quality]);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} fov={75} />
      <color attach="background" args={['#1A1E3D']} />
      <fog attach="fog" args={['#1A1E3D', 20, 40]} />
      
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} />

      <Suspense fallback={null}>
        <SiliconBackground quality={quality} />
        <DataStreams count={quality === 'high' ? 150 : 75} color="#00D4FF" />
        <DataStreams count={quality === 'high' ? 100 : 50} color="#6B46C1" />
        <FloatingElements quality={quality} />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />

      {quality === 'high' && (
        <EffectComposer>
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            height={256}
          />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
      )}
      
      <PerformanceMonitor />
    </>
  );
};

const MainScene = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{
          powerPreference: "high-performance",
          antialias: true,
          alpha: false
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default MainScene;
