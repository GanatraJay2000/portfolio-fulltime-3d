import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `ImageGallery`.
 */
export type ImageGalleryProps = SliceComponentProps<Content.ImageGallerySlice>;

/**
 * Component for "ImageGallery" Slices.
 */
const ImageGallery = ({ slice }: ImageGalleryProps): JSX.Element => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {slice.items.map((item, index) => (
        <PrismicNextImage
          key={index}
          field={item.image}
          alt={item.image.alt ?? ("Image" as any)}
          className="rounded-lg block m-0 p-0"
        />
      ))}
    </div>
  );
};

export default ImageGallery;
