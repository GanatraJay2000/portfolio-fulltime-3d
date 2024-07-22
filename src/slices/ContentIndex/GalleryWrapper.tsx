"use client";

import { motion, useSpring } from "framer-motion";
import Image from "next/image";

function GalleryWrapper() {
  const items = [
    "https://images.unsplash.com/photo-1612198273689-b437f53152ca?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHw5fHxzdG9ja3MlMjBhcHB8ZW58MHx8fHwxNzE4NTA4MTg2fDA&ixlib=rb-4.0.3&q=85&rect=978%2C0%2C2222%2C4000&w=220&h=320&fit=crop&exp=-10",
    "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMzc0NjN8MHwxfHNlYXJjaHw3fHxkYXRhJTIwc3RydWN0dXJlc3xlbnwwfHx8fDE3MTg2NjI1NDd8MA&ixlib=rb-4.0.3&q=85&rect=1500%2C0%2C2425%2C3617&w=220&h=320&fit=crop&exp=-10",
    "https://images.prismic.io/portfolio-fulltime-3d/Zlj3u6WtHYXtT8vp_nisplogo.png?auto=format%2Ccompress&fit=crop&w=220&h=320&exp=-10",
    "https://images.prismic.io/portfolio-fulltime-3d/Zlj_e6WtHYXtT8xF_josh.png?auto=format%2Ccompress&fit=crop&w=220&h=320&exp=-10",
    "https://images.prismic.io/portfolio-fulltime-3d/ZlkEeKWtHYXtT8yG_dd.png?auto=format%2Ccompress&fit=crop&w=220&h=320&exp=-10",
    "https://images.prismic.io/portfolio-fulltime-3d/Zm4x_Zm069VX1x9A_Screenshot2024-06-15195947.png?auto=format%2Ccompress&fit=crop&w=220&h=320&exp=-10",
  ];
  const spring = {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };

  const mouseMove = (e: any) => {
    const { clientX, clientY } = e;
    const targetX = clientX - 110;
    const targetY = clientY - 160;
    mousePosition.x.set(targetX);
    mousePosition.y.set(targetY);
  };

  const mousePosition = {
    x: useSpring(0, spring),
    y: useSpring(0, spring),
  };

  return (
    <div className="overflow-hidden" onMouseMove={(e) => mouseMove(e)}>
      {items.map((handle, i) => {
        return (
          <div className="h-[20vh] group" key={i}>
            <div className="w-full h-full relative">Demo demo demo</div>
            <motion.div
              style={{
                x: mousePosition.x,
                y: mousePosition.y,
                backgroundImage: `url(${handle})`,
              }}
              className="pointer-events-none h-[320px] w-[220px] opacity-0 group-hover:opacity-100 fixed top-0 rounded-xl"
            ></motion.div>
          </div>
        );
      })}
    </div>
  );
}

export default GalleryWrapper;
