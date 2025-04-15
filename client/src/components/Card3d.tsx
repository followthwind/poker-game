// src/components/Card3D.tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';

const CardModel = () => {
  // Menggunakan gambar sebagai texture
  const texture = useLoader(TextureLoader, '/spades_ace.png'); // Path relatif langsung ke folder public

  return (
    <mesh rotation={[0.2, 0.5, 0]}>
      <boxGeometry args={[2.5, 3.5, 0.1]} /> {/* Ukuran persegi panjang */}
      <meshStandardMaterial 
        map={texture} 
        metalness={0.8} 
        roughness={0.2} 
        envMapIntensity={1}
      />
    </mesh>
  );
};

export default function Card3D() {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 0, 6] }}>
        {/* Cahaya Ambient untuk pencahayaan dasar */}
        <ambientLight intensity={0.5} /> {/* Menambahkan sedikit pencahayaan ambient */}

        {/* Cahaya Directional di atas objek yang tidak ikut berputar */}
        <directionalLight 
          position={[0, 5, 0]} 
          intensity={1.5} // Meningkatkan intensitas cahaya agar lebih terang
          castShadow={true} 
          // Pastikan tidak mengubah rotasi cahaya, biarkan tetap di posisi yang tetap
        />
        
        {/* Point light tambahan untuk memberikan pencahayaan lebih merata */}
        <pointLight 
          position={[0, 2, 0]} 
          intensity={0.8} 
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
