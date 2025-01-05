"use client";

import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import { useState } from "react";
import { Photo, RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

/**
 * Props for `ImageGallery`.
 */
export type ImageGalleryProps = SliceComponentProps<Content.ImageGallerySlice>;

/**
 * Component for "ImageGallery" Slices.
 */
const ImageGallery = ({ slice }: ImageGalleryProps): JSX.Element => {
  const [index, setIndex] = useState(-1);
  const photos: Photo[] = slice.items.map((item) => ({
    src: item.image.url!!,
    alt: item.image.alt ?? ("Image" as any),
    width: item.image.dimensions?.width ?? 1080,
    height: item.image.dimensions?.height ?? 810,
  }));

  return (
    <div className="">
      <RowsPhotoAlbum
        photos={photos}
        targetRowHeight={120}
        onClick={({ index }) => setIndex(index)}
      />

      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </div>
  );
};

export default ImageGallery;
