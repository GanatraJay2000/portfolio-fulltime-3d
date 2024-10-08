"use client";

import { useRef } from "react";
import { Content, KeyTextField } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Bounded from "@/components/Bounded";
// import Shapes from "./Shapes";
import Model from "./Model";
import Button from "@/components/Button";
gsap.registerPlugin(useGSAP);

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice }: HeroProps): JSX.Element => {
  const component = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".name-animation",
        { x: -100, rotate: -10 },
        {
          x: 0,
          rotate: 0,
          opacity: 1,
          ease: "elastic.out(1,0.3)",
          duration: 1,
          transformOrigin: "left top",
          stagger: {
            each: 0.1,
            from: "random",
          },
        }
      );

      tl.fromTo(
        ".job-title",
        { opacity: 0, y: 20, scale: 1.2 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "elastic.out(1,0.3)" },
        "-=.5"
      );

      tl.fromTo(
        ".job-subtitle",
        { opacity: 0, y: 20, scale: 1.2 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "elastic.out(1,0.3)" },
        "-=.5"
      );
    },
    { scope: component }
  );

  const renderLetters = (name: KeyTextField, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} inline-block opacity-0`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      ref={component}
    >
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 ">
        {/* <Shapes /> */}
        <Model />
        <div className="col-start-1 md:row-start-1 mt-4">
          <h1
            className="mb-8 my-title-clamp font-extrabold leading-none tracking-tighter"
            aria-label={
              slice.primary.first_name + " " + slice.primary.last_name
            }
          >
            <span className="block text-slate-300">
              {renderLetters(slice.primary.first_name, "first")}
            </span>
            <span className="-mt-[.2em] block text-slate-500">
              {renderLetters(slice.primary.last_name, "last")}
            </span>
          </h1>
          <span className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-200 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl">
            {slice.primary.tag_line}
          </span>
          <span className="job-subtitle bg-gradient-to-tr from-slate-500 via-slate-200 to-slate-500 bg-clip-text text-balance font-bold uppercase tracking-[.2em] text-transparent opacity-0">
            {slice.primary.sub_tag_line}
          </span>
          <div className="prose prose-lg prose-slate prose-invert mt-6">
            <PrismicRichText field={slice.primary.description} />
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              linkField={slice.primary.resume_button_link}
              label={slice.primary.resume_button_title}
            />
            <Button
              inverse
              linkField={slice.primary.works_button_link}
              label={slice.primary.works_button_title}
            />
          </div>
        </div>
      </div>
    </Bounded>
  );
};

export default Hero;
