import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageBlock`.
 */
export type ImageBlockProps = SliceComponentProps<Content.ImageBlockSlice>;

/**
 * Component for "ImageBlock" Slices.
 */
const ImageBlock = ({ slice }: ImageBlockProps): JSX.Element => {
  return (
    <PrismicNextImage
      field={slice.primary.image}
      alt={slice.primary.image.alt ?? ("Image" as any)}
      className="rounded-lg border-2 border-slate-800 bg-slate-900"
    />
  );
};

export default ImageBlock;
