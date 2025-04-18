// src/components/Card3D.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { TextureLoader } from 'three';
import { useLoader, useFrame } from '@react-three/fiber'; // import useFrame dari @react-three/fiber
import * as THREE from 'three'; // pastikan THREE diimpor untuk akses ke namespace-nya

const CardModel = () => {
  // Menggunakan gambar sebagai texture untuk kartu
  const texture = useLoader(TextureLoader, '/spades_ace.png'); // Path relatif langsung ke folder public
  const cardRef = useRef<THREE.Mesh>(null!); // Referensi untuk kontrol rotasi kartu

  // Efek animasi rotasi perlahan
  useFrame(() => {
    if (cardRef.current) {
      cardRef.current.rotation.y += 0.005; // Rotasi perlahan pada sumbu Y (kanan)
    }
  });

  return (
    <mesh ref={cardRef} rotation={[0, Math.PI / 6, 0]}> {/* Rotasi 30 derajat pada sumbu Y (kanan) */}
      <boxGeometry args={[2.5, 3.5, 0.1]} /> {/* Ukuran persegi panjang */}
      <meshStandardMaterial map={texture} metalness={0.1} roughness={0.4} />
    </mesh>
  );
};

export default function Card3D() {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 0, 6] }}>
        {/* Cahaya ambient untuk pencahayaan dasar */}
        <ambientLight intensity={1} /> {/* Cahaya ambient dengan intensitas lebih tinggi */}

        {/* Cahaya directional untuk pencahayaan lebih fokus pada objek */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} // Menambah intensitas cahaya agar kartu lebih terang
          castShadow={true} 
        />
        
        {/* Point light tambahan untuk pencahayaan tambahan */}
        <pointLight 
          position={[0, 2, 0]} 
          intensity={1} // Meningkatkan intensitas point light
          distance={10}
        />

        <Suspense fallback={null}>
          <CardModel />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
