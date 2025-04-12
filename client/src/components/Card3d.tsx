import {Canvas} from "@react-three/fiber";
import {OrbitControls} from "@react-three/drei";
import {Suspense} from "react";

const CardModel = () => {
  return (
    <mesh rotation={[0.2, 0.5, 0]}>
      <boxGeometry args ={[2.5, 3.5, 0.1]}/>
      <meshStandardMaterial color = "white"/>
    </mesh>
  );
};

export default function Card3D() {
  return(
    <div className="w-full h-[500px]">
      <Canvas camera = {{position: [0,0,6]}}>
        <ambientLight />
        <directionalLight position={[0,0,5]}/>
        <Suspense fallback={null}>
          <CardModel/>
          <OrbitControls enableZoom={false}/>
        </Suspense>
      </Canvas>
    </div>
  )
}