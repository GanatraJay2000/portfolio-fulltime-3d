import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Video`.
 */
export type VideoProps = SliceComponentProps<Content.VideoSlice>;

/**
 * Component for "Video" Slices.
 */
const Video = ({ slice }: VideoProps): JSX.Element => {
  const cNames = {
    Landscape: "w-full aspect-[16/9]",
    Portrait: "w-1/4 aspect-[8/16]",
    Square: "w-1/2 aspect-[1/1]",
  };
  type Orientation = "Landscape" | "Portrait" | "Square";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* h-[calc(100vh-4rem)] */}
      <div className="flex justify-center my-10">
        <iframe
          className={`bg-red-100 rounded-2xl  ${cNames[slice.primary.orientation as Orientation]}`}
          src={slice.primary.url as string}
          title="YouTube video player"
          allow="autoplay;"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default Video;
