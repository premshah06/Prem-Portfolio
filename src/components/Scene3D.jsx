import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/* ── Wireframe shape ──────────────────────────────────────────────────────── */
function Shape({ position, color, type, scale = 1, speed = 1, rotOffset = 0 }) {
  const mesh = useRef();

  const geo = useMemo(() => {
    switch (type) {
      case 'torus': return new THREE.TorusGeometry(1, 0.28, 6, 24);
      case 'oct':   return new THREE.OctahedronGeometry(1, 0);
      case 'tet':   return new THREE.TetrahedronGeometry(1, 0);
      case 'box':   return new THREE.BoxGeometry(1.5, 1.5, 1.5);
      default:      return new THREE.IcosahedronGeometry(1, 1);
    }
  }, [type]);

  const mat = useMemo(() => new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity: 0.30,
  }), [color]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.elapsedTime;
    mesh.current.rotation.x = t * 0.07 * speed + rotOffset;
    mesh.current.rotation.y = t * 0.11 * speed + rotOffset;
  });

  return (
    <Float speed={1.4 * speed} rotationIntensity={0.18} floatIntensity={0.65}>
      <mesh ref={mesh} position={position} scale={scale} geometry={geo} material={mat} />
    </Float>
  );
}

/* ── Camera: mouse parallax + scroll depth ───────────────────────────────── */
function CameraRig() {
  const mouse  = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);

  useEffect(() => {
    const onMove   = (e) => {
      mouse.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => { scroll.current = window.scrollY; };
    window.addEventListener('mousemove', onMove,   { passive: true });
    window.addEventListener('scroll',   onScroll,  { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll',   onScroll);
    };
  }, []);

  useFrame(({ camera }) => {
    const tx = mouse.current.x * 1.4;
    const ty = mouse.current.y * 0.75 - scroll.current * 0.0014;
    const tz = 10 - Math.min(scroll.current * 0.002, 3);

    camera.position.x += (tx - camera.position.x) * 0.04;
    camera.position.y += (ty - camera.position.y) * 0.04;
    camera.position.z += (tz - camera.position.z) * 0.04;
    camera.lookAt(0, camera.position.y * 0.35, 0);
  });

  return null;
}

/* ── Scene graph ─────────────────────────────────────────────────────────── */
function Scene() {
  const shapes = useMemo(() => [
    /* near  z: -2 to -4 */
    { id:  1, position: [ -7.0,  3.5,  -3 ], color: '#0369a1', type: 'ico',   scale: 0.9, speed: 0.70, rotOffset: 0.0 },
    { id:  2, position: [  8.0, -2.5,  -2 ], color: '#6d28d9', type: 'torus', scale: 0.8, speed: 0.50, rotOffset: 1.2 },
    /* mid   z: -5 to -9 */
    { id:  3, position: [ -5.0, -5.5,  -6 ], color: '#9a4500', type: 'oct',   scale: 1.2, speed: 0.60, rotOffset: 2.4 },
    { id:  4, position: [  6.0,  5.5,  -5 ], color: '#0284c7', type: 'tet',   scale: 1.0, speed: 0.80, rotOffset: 0.8 },
    { id:  5, position: [  1.0,  7.5,  -7 ], color: '#065f46', type: 'ico',   scale: 0.7, speed: 0.45, rotOffset: 3.1 },
    { id:  6, position: [ -9.0,  0.0,  -8 ], color: '#7c3aed', type: 'box',   scale: 0.8, speed: 0.55, rotOffset: 1.8 },
    /* far   z: -10 to -16 */
    { id:  7, position: [  9.0,  2.0, -11 ], color: '#c2600a', type: 'oct',   scale: 1.8, speed: 0.30, rotOffset: 0.5 },
    { id:  8, position: [ -7.0,  8.5, -13 ], color: '#0284c7', type: 'ico',   scale: 2.2, speed: 0.22, rotOffset: 2.0 },
    { id:  9, position: [  4.0, -9.0, -14 ], color: '#7c3aed', type: 'torus', scale: 2.0, speed: 0.18, rotOffset: 1.0 },
    { id: 10, position: [-10.0, -7.0, -10 ], color: '#047857', type: 'tet',   scale: 1.5, speed: 0.28, rotOffset: 3.5 },
    { id: 11, position: [  2.0,  3.0,  -4 ], color: '#c2600a', type: 'ico',   scale: 0.5, speed: 1.10, rotOffset: 0.3 },
    { id: 12, position: [ -3.0, -3.0, -12 ], color: '#0369a1', type: 'torus', scale: 1.6, speed: 0.25, rotOffset: 4.2 },
  ], []);

  return (
    <>
      <CameraRig />
      {shapes.map(s => <Shape key={s.id} {...s} />)}
      <EffectComposer>
        <Bloom
          intensity={0.25}
          luminanceThreshold={0.08}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

/* ── Canvas wrapper ──────────────────────────────────────────────────────── */
export default function Scene3D() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
