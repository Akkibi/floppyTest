import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

interface CubesProps {
  currentPosition: number;
  setPosition: React.Dispatch<React.SetStateAction<number>>;
  ammount: number;
}

const Cubes = ({ currentPosition, setPosition, ammount }: CubesProps) => {
  const meshRefs = useRef<THREE.Mesh[]>([]);
  let spacing = 3;
  if (window.innerWidth < 768) {
    spacing = 2.1;
  }
  const { nodes } = useGLTF("./models/tv.gltf") as any;

  meshRefs.current = [];

  useGSAP(() => {
    meshRefs.current.forEach((mesh, index) => {
      const posx = (index - currentPosition) * spacing;
      const scale = Math.max(10 - Math.abs(posx) * 1.5, 0);
      const rot = Math.PI * posx * 0.1;

      gsap.to(mesh.position, {
        x: posx,
        duration: 0.5,
        ease: "power.inOut",
        overwrite: true,
      });
      gsap.to(mesh.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 0.5,
        ease: "power.inOut",
        overwrite: true,
      });
      gsap.to(mesh.rotation, {
        x: rot,
        y: rot,
        z: rot,
        duration: 0.5,
        ease: "power.inOut",
        overwrite: true,
      });
    });
  }, [currentPosition, meshRefs.current]);

  const items = Array.from({ length: ammount }).map((_, i) => {
    return (
      <group
        dispose={null}
        key={i}
        onClick={() => setPosition(i)}
        ref={(el: any) => {
          if (el) meshRefs.current[i] = el;
        }}
      >
        <group scale={[0.3, 0.3, 0.3]}>
          <mesh
            position={nodes.retro_tv_body__0.position}
            geometry={nodes.retro_tv_body__0.geometry}
            material={
              new THREE.MeshStandardMaterial({
                color: `hsl(${i * 30}, 100%, 50%)`,
              })
            }
          />
          <mesh
            position={nodes.screen__0.position}
            geometry={nodes.screen__0.geometry}
            material={
              new THREE.MeshStandardMaterial({
                emissive: `hsl(${i * 30}, 100%, 20%)`,
                color: `hsl(${i * 30}, 100%, 80%)`,
              })
            }
          />
          <mesh
            position={nodes.dial_01__0.position}
            geometry={nodes.dial_01__0.geometry}
            material={
              new THREE.MeshStandardMaterial({
                color: `hsl(${i * 30}, 100%, 50%)`,
              })
            }
          />
          <mesh
            position={nodes.dial_02__0.position}
            geometry={nodes.dial_02__0.geometry}
            material={
              new THREE.MeshStandardMaterial({
                color: `hsl(${i * 30}, 100%, 50%)`,
              })
            }
          />
          <mesh
            position={nodes.dial_03__0.position}
            geometry={nodes.dial_03__0.geometry}
            material={
              new THREE.MeshStandardMaterial({
                color: `hsl(${i * 30}, 100%, 50%)`,
              })
            }
          />
          <mesh
            position={nodes.knob_01__0.position}
            geometry={nodes.knob_01__0.geometry}
            material={
              new THREE.MeshStandardMaterial({
                color: `hsl(${i * 30}, 100%, 50%)`,
              })
            }
          />
          <mesh
            position={nodes.knob_02__0.position}
            geometry={nodes.knob_02__0.geometry}
            material={
              new THREE.MeshStandardMaterial({
                color: `hsl(${i * 30}, 100%, 50%)`,
              })
            }
          />
        </group>
      </group>
    );
  });
  return <>{items}</>;
};

export default Cubes;
