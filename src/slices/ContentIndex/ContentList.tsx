"use client";
import { Content, asImageSrc, isFilled } from "@prismicio/client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion, useSpring } from "framer-motion";
import { rotate } from "three/examples/jsm/nodes/Nodes.js";
gsap.registerPlugin(useGSAP, ScrollTrigger);

type ContentListProps = {
  items: Content.BlogPostDocument[] | Content.ProjectDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  viewMoreText?: Content.ContentIndexSlice["primary"]["view_more_text"];
  fallbackItemImage?: Content.ContentIndexSlice["primary"]["fallback_item_image"];
};

export default function ContentList({
  items,
  contentType,
  viewMoreText = "Read More",
  fallbackItemImage,
}: ContentListProps) {
  const component = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLLIElement> | null>([]);
  const urlPrefix = contentType === "Blog" ? "/blog" : "/project";

  const spring = {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  };

  const lastMousePos = useRef({ x: 0, y: 0, rotate: 0 });

  const mouseMove = (e: any) => {
    const { clientX, clientY } = e;
    const baseX = component.current!.getBoundingClientRect().left;
    const targetX = clientX - baseX - 110;
    const targetY = clientY - 160;

    const speed = Math.sqrt(Math.pow(targetX - lastMousePos.current.x, 2));
    const rotation = speed * (targetX > lastMousePos.current.x ? 1 : -1);

    mousePosition.rotate.set(rotation);
    mousePosition.x.set(targetX);
    mousePosition.y.set(targetY);
    lastMousePos.current = { x: targetX, y: targetY, rotate: rotation };
  };

  const mousePosition = {
    x: useSpring(window.innerWidth/2, spring),
    y: useSpring(window.innerHeight/2, spring),
    rotate: useSpring(0, spring),
  };

  return (
    <div ref={component}>
      <ul
        className="grid border-b border-b-slate-100"
        onMouseMove={(e) => mouseMove(e)}
      >
        {[...items].map(
          (item, index) =>
            isFilled.keyText(item.data.title) && (
              <li
                ref={(el) => {
                  itemsRef.current![index] = el!;
                }}
                key={index}
                className="list-item opacity-0f"
              >
                <Link
                  href={`${urlPrefix}/${item.uid}`}
                  aria-label={item.data.title}
                  className="group flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 md:flex-row"
                >
                  <div className="flex flex-col">
                    <span className="text-3xl font-bold ">
                      {item.data.title}
                    </span>
                    <div className="flex gap-3 text-yellow-400 text-lg font-bold flex-wrap">
                      {item.tags.map((tag, index) => (
                        <span key={index}>{tag}</span>
                      ))}{" "}
                    </div>
                  </div>
                  <span className="mt-5 md:mt-0 flex items-center gap-2 text-xl font-medium">
                    {viewMoreText} <MdArrowOutward />
                  </span>
                  <motion.div
                    style={{
                      x: mousePosition.x,
                      y: mousePosition.y,
                      rotate: mousePosition.rotate,
                      backgroundImage: `url(${item.data.hover_image.url})`,
                    }}
                    className="!pointer-events-none bg-cover bg-center h-[320px] w-[220px] opacity-0 group-hover:opacity-100 fixed top-0 rounded-xl"
                  ></motion.div>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
