'use client';

import { useRef, useLayoutEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei/core';
import * as THREE from 'three';

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url); // no clone

  const groupRef = useRef<THREE.Object3D>(null!);

  useLayoutEffect(() => {
    if (!groupRef.current || !scene) return;

    requestAnimationFrame(() => {
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);

      {/* (overrides blender attributes)
      scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          (child as THREE.Mesh).material = new THREE.MeshStandardMaterial({
            color: '#c52424',
            metalness: 0.8,
            roughness: 0.3,
            emissive: '#c52424',
            emissiveIntensity: 0.1,
          });
        }
      });
      */}

      const size = box.getSize(new THREE.Vector3()).length();
      const scaleFactor = 4 / size;
      scene.scale.setScalar(scaleFactor);

      //have to rotate so it doesn't lay flat
      scene.rotation.x = Math.PI / 2;


      groupRef.current?.add(scene);
    });
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5; // ~0.5 radians/sec
    }
  });

  return <group ref={groupRef} />;
}

export default function ModelViewerPage() {
  return (
      <div className="w-16 h-16">
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 2, 20]} intensity={1} />
          <Model url="/models/logo-3D.glb" />
        </Canvas>
      </div>
  );
}
