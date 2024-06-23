import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import "./index.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import Cubes from "./Cubes.tsx";

function Main() {
  const [position, setPosition] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const [ammount, setAmmount] = useState(5);

  const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      setPosition((prev) => Math.min(prev + 1, ammount - 1));
    } else if (e.key === "ArrowLeft") {
      setPosition((prev) => Math.max(prev - 1, 0));
    }
  };

  const handleScroll = debounce((e: WheelEvent) => {
    setPosition((prev) => {
      if (e.deltaY > 0) {
        return Math.min(prev + 1, ammount - 1);
      } else if (e.deltaY < 0) {
        return Math.max(prev - 1, 0);
      } else if (e.deltaX > 0) {
        return Math.min(prev + 1, ammount - 1);
      } else if (e.deltaX < 0) {
        return Math.max(prev - 1, 0);
      }
      return prev;
    });
  }, 50);

  const changeAmmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmmount(parseInt(e.currentTarget.value));
  };

  useGSAP(() => {
    gsap.to(rootRef.current, {
      background: `linear-gradient(0deg, hsla(${
        (position * 30) % 360
      }, 100%, 85%, 0.5) 0%, hsla(${
        (position * 30) % 360
      }, 100%, 90%, 0.5) 50%, hsla(${
        (position * 30) % 360
      }, 100%, 85%, 0.5) 100%), linear-gradient(90deg, hsl(${
        (position - 2) * 30
      }, 100%, 85%) 0%, hsl(${(position * 30) % 360}, 100%, 90%) 50%, hsl(${
        (position + 2) * 30
      }, 100%, 85%) 100%)`,
      duration: 0.5,
      ease: "power.inOut",
      overwrite: true,
    });
  }, [position, rootRef.current]);

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="h-full w-full" ref={rootRef}>
      <div className="absolute p-5 font-mono z-10">
        <p className="text-xl font-black">Hello i'm Akira Valade</p>
        <h2 className="text-sm">
          This is a fun project to introduce myself to React Three fiber + GSAP
        </h2>
        <input
          onChange={(e) => {
            changeAmmount(e);
          }}
          type="number"
          placeholder="Count"
          className="text-xl text-white bg-black px-2 min-w-[6rem] py-1 mt-2 max-w-min"
          id="number"
          name="number"
          min="1"
          max="100"
        />
      </div>
      <Canvas>
        <ambientLight intensity={0.5} color="white" />
        <directionalLight color="white" position={[2, 2, 5]} />
        <directionalLight color="white" position={[-2, 2, 5]} />
        <Cubes
          currentPosition={position}
          setPosition={setPosition}
          ammount={ammount}
        />
      </Canvas>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<Main />);
