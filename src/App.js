import React, { Suspense, useEffect } from "react";
import "./App.scss";
import { Canvas, useFrame } from "@react-three/fiber";
import Header from "./components/header";
import { Html, useGLTF } from "@react-three/drei";
import { Section } from "./components/section";
import { useRef } from "react";
import state from "./components/state";
import { useInView } from "react-intersection-observer";
import Footer from "./components/Footer";
import Menu from "./components/Menu";


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

  

const HTMLContent = ({bgColor ,domContent, children, modelPath, positionY}) => {

    const ref = useRef();
    useFrame(() => (ref.current.rotation.y += 0.005));
    const [refItem, inView] = useInView({
      threshold: 0,
    })

    useEffect(() => {
     inView && (document.body.style.background = bgColor)
    }, [inView])

   return (
     <> 
     <Section factor={1.5} offset={1}>
         <group position={[0, positionY, 0]}>
         <mesh position={[0, -35, 0]} ref={ref}>
             <Model modelPath={modelPath} />
         </mesh>
         <Html portal={domContent} fullscreen>
          <div className="container" ref={refItem}>
               {children}
          </div>
            
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
      <Menu />
      <Canvas
        colorManagement
        camera={{ position: [0, 0, 120], fov: 70 }}> 
        <Lights />
        <Suspense fallback={null}>

          <HTMLContent modelPath="/armchairYellow.gltf" positionY={250}
          domContent={domContent}
            bgColor={'#FCE883'}>
              <h1 className="title">Желтый</h1>
            <p>Статусная модель с обивкой из экокожи чёрного или коричневого цвета. Наполнителем служит пенополиуретан, толщина слоя обеспечивает комфортную мягкую посадку. Подлокотники снабжены комфортными мягкими накладками. Механизм качания фиксируется только в одном положении. На широком сидении в 51 см даже руководитель с весом до 120 кг будет чувствовать себя вполне удобно. А высоту посадочного места поможет отрегулировать газлифт с удобным рычагом. Каркас из чёрного пластика придаёт креслу элегантность и стиль.</p>
          </HTMLContent>
          <HTMLContent modelPath="/armchairGreen.gltf" positionY={0}
            domContent={domContent}
            bgColor={'#A8E4A0'}>
              <h1 className="title">Зеленый</h1>
            <p>Модель с эргономичной удобной спинкой, повторяющей форму позвоночника. Кресло обито искусственной или натуральной кожей бежевого, коричневого, чёрного цвета. Максимально допустимая нагрузка по весу — 120 кг. Изящно изогнутые хромированные подлокотники снабжены мягкими накладками. Модель имеет газлифт для регулирования высоты и настройку жёсткости качания. На стальной крестовине, покрытой хромом, закреплены ролики из полумягкого пластика, который не портит напольное покрытие. </p>
          </HTMLContent>
          <HTMLContent modelPath="/armchairGray.gltf" positionY={-250}
            bgColor={'#636567'}
            domContent={domContent}>
              <h1 className="title">Серый</h1>
            <p style={{color: 'white'}}>Офисное кресло для продвинутого руководителя с высокой сетчатой спинкой и мягким подголовником во всю ширину. Подлокотники металлические, дополнены мягкими вставками. Эргономичная форма спинки призвана снимать напряжение с позвоночника, а сетка обеспечивает свободный доступ воздуха к спине, что актуально в жаркую погоду. Каркас и крестовина выполнены из прочного металла, что гарантирует длительную службу кресла без шатания и скрипа. </p>
          </HTMLContent>


        </Suspense>
      </Canvas>
      <div className="scrollArea" ref={scrollArea} onScroll={onScroll}>
        <div style={{ position: 'sticky', top: 0}} ref= {domContent}></div>
        <div style={{height: `${state.sections * 100}vh`}}></div>
        <Footer />

      </div>
    </>
  );
}