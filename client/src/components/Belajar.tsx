import * as Three from 'three';
import { useRef, useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';

export default function Belajar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Get canvas element
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize Three.js
    const scene = new Three.Scene();
    const camera = new Three.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new Three.WebGLRenderer({ canvas });

    // Set renderer properties
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.position.setZ(30);

    // Create torus and add to scene
    const geometry = new Three.TorusGeometry(10, 3, 16, 100);
    const material = new Three.MeshStandardMaterial({ 
      color: 0xFF6347,  
    });
    const torus = new Three.Mesh(geometry, material);
    scene.add(torus);

    const pointLight = new Three.PointLight(0xffffff);
    pointLight.position.set(5,5,5);

    const ambientLight = new Three.AmbientLight(0xffffff);

    const lightHelper = new Three.PointLightHelper(pointLight)

    scene.add(pointLight, ambientLight, lightHelper);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.01;
      torus.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      // Additional cleanup if needed
    };
  }, []);

  return <canvas ref={canvasRef} />;
}