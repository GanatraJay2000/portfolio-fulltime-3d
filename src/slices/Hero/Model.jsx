import { useLoader, useFrame } from "@react-three/fiber";
import {
  GLTFLoader,
  DRACOLoader,
  KTX2Loader,
} from "three/examples/jsm/Addons.js";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import { Html, useProgress } from "@react-three/drei";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

function Model() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0 ">
      <Canvas
        className="z-0"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={<Loader />}>
          {/* <CoffeeModel /> */}
          <MyModel
            assetPath="/assets/coffee.glb"
            position={[3, -2, 3]}
            scale={[35, 35, 35]}
            rotation={[0, 0, 0]}
            rotateAnim={[0, 2.5, 0]}
          />
          <MyModel
            assetPath="/assets/sol_re.glb"
            position={[-3, -3, 4]}
            scale={[0.25, 0.25, 0.25]}
            rotation={[0, 0, 0]}
            speed={0.7}
          />
          <MyModel
            assetPath="/assets/sharingan_re.glb"
            scale={[0.5, 0.5, 0.5]}
            position={[5, 2, 3]}
            rotation={[0, Math.PI / 2, 0]}
            rotateAnim={[2.5, 1.5, 0.5]}
          />
          <MyModel
            assetPath="/assets/straw_hat_re.glb"
            scale={[0.75, 0.75, 0.75]}
            position={[4, 4, 4]}
            rotation={[Math.PI / 4 - 0.85, 0, 0]}
            speed={1}
            rotateAnim={[1, 1, 1]}
          />
          <MyModel
            assetPath="/assets/linkedIn.glb"
            scale={[0.75, 0.75, 0.75]}
            position={[0, -0.5, 4]}
            speed={1}
          />
          <MyModel
            assetPath="/assets/aws.glb"
            scale={[0.75, 0.75, 0.75]}
            position={[-3, 4, -1]}
            speed={1.5}
          />
          <MyModel
            assetPath="/assets/react.glb"
            scale={[0.75, 0.75, 0.75]}
            position={[1, 4, -4]}
            speed={3}
            rotateAnim={[0, 2, 0]}
          />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="forest" />
        </Suspense>
      </Canvas>
    </div>
  );
}
function Loader() {
  const { progress } = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function MyModel({
  assetPath,
  position,
  scale,
  rotation,
  rotateAnim = [0, 0, 0],
  speed = 0,
  floatIntensity = 5,
}) {
  // const gltf = useLoader(GLTFLoader, assetPath);
  const myMesh = useRef(null);
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/assets/draco/");

  // const ktx2Loader = new KTX2Loader();
  // ktx2Loader.setTranscoderPath("https://unpkg.com/browse/three@0.167.1/examples/jsm/libs/basis/");

  const gltf = useLoader(GLTFLoader, assetPath, (loader) => {
    loader.setDRACOLoader(dracoLoader);
  });

  useFrame(({ clock }) => {
    myMesh.current.rotation.x = clock.getElapsedTime() * rotateAnim[0];
    myMesh.current.rotation.y = clock.getElapsedTime() * rotateAnim[1];
    myMesh.current.rotation.z = clock.getElapsedTime() * rotateAnim[2];
  });

  return (
    <Float speed={speed} floatIntensity={floatIntensity}>
      <primitive
        ref={myMesh}
        object={gltf.scene}
        scale={scale}
        position={position}
        rotation={rotation}
      />
    </Float>
  );
}

export default Model;
