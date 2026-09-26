"use client";

import { Canvas, extend } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import Band from "@/components/band";

extend({ MeshLineGeometry, MeshLineMaterial });
useGLTF.preload("/assets/3d/card.glb");
useTexture.preload("/assets/images/tag_texture.png");
useTexture.preload("/assets/images/card_design_original.jpg");

if (typeof window !== "undefined") {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    const msg = args[0];
    if (typeof msg === "string") {
      if (
        msg.includes("THREE.Clock") ||
        msg.includes("deprecated parameters") ||
        msg.includes("THREE.WebGLProgram")
      ) {
        return;
      }
    }
    originalWarn(...args);
  };
}

/**
 * The interactive 3D lanyard badge scene (physics + lighting).
 * Rendered inside the portfolio hero; the card is draggable.
 */
export default function BadgeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 13], fov: 25 }}
      style={{ backgroundColor: "transparent" }}
    >
      <ambientLight intensity={Math.PI} />
      <Physics debug={false} interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
        <Band />
      </Physics>
      <Environment blur={0.75}>
        <Lightformer
          intensity={2}
          color="white"
          position={[0, -1, 5]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[-1, -1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[1, 1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={10}
          color="white"
          position={[-10, 0, 14]}
          rotation={[0, Math.PI / 2, Math.PI / 3]}
          scale={[100, 10, 1]}
        />
      </Environment>
    </Canvas>
  );
}