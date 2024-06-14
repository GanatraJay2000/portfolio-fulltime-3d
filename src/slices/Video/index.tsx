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
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {/* h-[calc(100vh-4rem)] */}
      <div className="flex justify-center my-10">
        <iframe
          className="w-1/4 aspect-[8/16] bg-red-100"
          src="https://www.youtube.com/embed/4eW92xNGQ-g?si=lS0ujXEcLUxYAlyx"
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
