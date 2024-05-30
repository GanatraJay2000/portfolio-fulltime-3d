"use client";
import { cn } from "@/util/cn";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

type AvatarProps = {
  image: ImageField;
  className?: string;
};

export default function Avatar({ image, className }: AvatarProps) {
  const component = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: component });
  const windowMouseMoved = contextSafe((e: any) => {
    if (!component.current) return;

    const componentRect = component.current.getBoundingClientRect();
    const componentCenterX = componentRect.left + componentRect.width / 2;
    let componentPercent = {
      x: (e.clientX - componentCenterX) / componentRect.width / 2,
    };
    let distFromCenter = 1 - Math.abs(componentPercent.x);

    // gsap.to(goodRef.current, { rotation: 180 });
    gsap
      .timeline({
        defaults: {
          duration: 0.5,
          ease: "power3.inOut",
          overwrite: "auto",
        },
      })
      .to(
        ".avatar",
        {
          rotation: gsap.utils.clamp(-2, 2, 4 * componentPercent.x),
          duration: 0.5,
        },
        0
      )
      .to(
        ".highlight",
        {
          opacity: distFromCenter - 0.7,
          x: (-10 * 20) & componentPercent.x,
          duration: 0.5,
        },
        0
      );
  });

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined")
        window.addEventListener("mousemove", windowMouseMoved);
    };
  }, [windowMouseMoved]);

  useGSAP(
    (context, contextSafe) => {
      gsap.fromTo(
        ".avatar",
        {
          opacity: 0,
          scale: 1.4,
        },
        { opacity: 1, scale: 1, duration: 1.3, ease: "power3.inOut" }
      );
    },
    { scope: component }
  );

  return (
    <div ref={component} className={cn("relative h-full w-full", className)}>
      <div className="avatar overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0">
        <PrismicNextImage
          field={image}
          className="avatar-image h-full w-full object-fill"
          imgixParams={{ q: 90 }}
        />
        <div className="highlight absolute inset-0 hidden w-full scale-110 bg-radient-to-tr from-transparent via-white to-transparent opacity-0 md:block z-10"></div>
      </div>
    </div>
  );
}
