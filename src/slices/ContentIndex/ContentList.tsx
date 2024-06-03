"use client";
import { Content, asImageSrc, isFilled } from "@prismicio/client";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
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
  const component = useRef(null);
  const itemsRef = useRef<Array<HTMLLIElement> | null>([]);
  const revealRef = useRef(null);

  const [currentItem, setCurrentItem] = React.useState<number | null>(null);

  const urlPrefix = contentType === "Blog" ? "/blog" : "/project";

  const lastMousePos = useRef({ x: 0, y: 0 });

  // useGSAP(
  //   (context, contextSafe) => {
  //     const handleMouseMove = contextSafe!((e: MouseEvent) => {
  //       const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
  //       const speed = Math.sqrt(
  //         Math.pow(mousePos.x - lastMousePos.current.x, 2)
  //       );

  //       if (currentItem !== null) {
  //         const maxY = window.scrollY + window.innerHeight - 350;
  //         const maxX = window.innerWidth - 250;
  //         gsap.to(revealRef.current, {
  //           opacity: 1,
  //           x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
  //           y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
  //           rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
  //           ease: "back.out(2)",
  //           duration: 1.3,
  //         });
  //       }
  //       lastMousePos.current = mousePos;
  //     });

  //     window.addEventListener("mousemove", handleMouseMove);

  //     return () => {
  //       window.removeEventListener("mousemove", handleMouseMove);
  //     };
  //   },
  //   { scope: component, dependencies: [currentItem] }
  // );

  useGSAP(
    (context, contextSafe) => {
      itemsRef.current?.forEach((item, index) => {
        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: "elastic.out(1, 0.3)",
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100px",
              end: "bottom center",
              toggleActions: "play none none none",
            },
          }
        );
      });
    },
    {
      scope: component,
    }
  );

  useEffect(() => {
    // Mouse move event listener
    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
      // Calculate speed and direction
      const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

      let ctx = gsap.context(() => {
        // Animate the image holder
        if (currentItem !== null) {
          const maxY = window.scrollY + window.innerHeight - 350;
          const maxX = window.innerWidth - 250;

          gsap.to(revealRef.current, {
            opacity: 1,
            x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
            rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1), // Apply rotation based on speed and direction
            ease: "back.out(2)",
            duration: 1.3,
          });
          // gsap.to(revealRef.current, {
          //   opacity: hovering ? 1 : 0,
          //   visibility: "visible",
          //   ease: "power3.out",
          //   duration: 0.4,
          // });
        }
        lastMousePos.current = mousePos;
        return () => ctx.revert(); // cleanup!
      }, component);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [currentItem]);

  const contentImages = [...items].map((item) => {
    const image = isFilled.image(item.data.hover_image)
      ? item.data.hover_image
      : fallbackItemImage;
    return asImageSrc(image, {
      fit: "crop",
      w: 220,
      h: 320,
      exp: -10,
    });
  });

  useEffect(() => {
    contentImages.forEach((url) => {
      if (!url) return;
      const img = new Image();
      img.src = url;
    });
  }, [contentImages]);

  return (
    <div ref={component}>
      <ul
        className="grid border-b border-b-slate-100"
        onMouseLeave={() => setCurrentItem(null)}
      >
        {[...items].map(
          (item, index) =>
            isFilled.keyText(item.data.title) && (
              <li
                ref={(el) => {
                  itemsRef.current![index] = el!;
                }}
                key={index}
                onMouseEnter={() => setCurrentItem(index)}
                className="list-item opacity-0f"
              >
                <Link
                  href={`${urlPrefix}/${item.uid}`}
                  aria-label={item.data.title}
                  className="flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-200 md:flex-row"
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
                </Link>
              </li>
            )
        )}
      </ul>

      {/* Hover Element */}
      <div
        ref={revealRef}
        className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
        style={{
          backgroundImage:
            currentItem !== null ? `url(${contentImages[currentItem]})` : ``,
        }}
      ></div>
    </div>
  );
}
