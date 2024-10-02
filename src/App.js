import React, { Suspense, useEffect } from "react";
import "./App.scss";
import { Canvas, useFrame } from "@react-three/fiber";
import Header from "./components/header";
import { Html, useGLTF } from "@react-three/drei";
import { Section } from "./components/section";
import { useRef } from "react";
import state from "./components/state";



  const Model = ({ modelPath }) => {
    const gltf = useGLTF(modelPath, true);
    return <primitive object={gltf.scene} dispose={null}/>;
  }

  const Lights = () => (
    <>
      <ambientLight intensity={1.0} />
      <directionalLight position={[10, 10, 7]} intensity={4.5} />
    </>
  );

  

const HTMLContent = ({ domContent, children, modelPath, positionY}) => {

    const ref = useRef();
    useFrame(() => (ref.current.rotation.y += 0.005));

   return (
     <> 
     <Section factor={1.5} offset={1}>
         <group position={[0, positionY, 0]}>
         <mesh position={[0, -35, 0]} ref={ref}>
             <Model modelPath={modelPath} />
         </mesh>
         <Html portal={domContent} fullscreen>
          {children}
         </Html>
       </group>
     </Section>
    </>
   )
  }

export default function App() {
  const domContent = useRef();
  const scrollArea = useRef();
  const onScroll = (e) => (state.top.current = e.target.scrollTop);
  useEffect(() => void onScroll({target: scrollArea.current}), [])


  return (
    <>
      <Header />
      <Canvas
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}> 
        <Lights />
        <Suspense fallback={null}>

          <HTMLContent modelPath="/armchairYellow.gltf" positionY={250}
          domContent={domContent}
          >
            <div className="container">
              <h1 className="title">Желтый</h1>
            </div>
          </HTMLContent>
          <HTMLContent modelPath="/armchairGreen.gltf" positionY={0}
            domContent={domContent}>
            <div className="container">
              <h1 className="title">Зеленый</h1>
            </div>
          </HTMLContent>


        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ position: 'sticky', top: 0}} ref= {domContent}></div>
        <div style={{height: `${state.pages * 100}vh`}}></div>
      </div>
    </>
  );
}