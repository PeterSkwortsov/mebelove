import React, { Suspense } from "react";
import "./App.scss";
import { Canvas, useFrame } from "@react-three/fiber";
import Header from "./components/header";
import { Html, useGLTF } from "@react-three/drei";
import { Section } from "./components/section";
import { useRef } from "react";

export default function App() {

  const Model = () => {
    const gltf = useGLTF("/armchairYellow.gltf", true);
    return <primitive object={gltf.scene} dispose={null}/>;
  }

  const Lights = () => (
    <>
      <ambientLight intensity={1.0} />
      <directionalLight position={[10, 10, 7]} intensity={4.5} />
    </>
  );

  

  const HTMLContent = () => (


  

    <Section factor={1.5} offset={1}>
      <group position={[0, 250, 0]}>
        <mesh position={[0, -35, 0]} >
          <Model />
        </mesh>
        <Html fullscreen>
          <div className="container">
            <h1 className="title">Hello</h1>
          </div>
        </Html>
      </group>
    </Section>
  );


  return (
    <>
      <Header />
      <Canvas
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}> 
        <Lights />
        <Suspense fallback={null}>
          <HTMLContent />
        </Suspense>
      </Canvas>
    </>
  );
}