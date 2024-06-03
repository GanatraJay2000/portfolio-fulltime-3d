import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Contact`.
 */
export type ContactProps = SliceComponentProps<Content.ContactSlice>;

/**
 * Component for "Contact" Slices.
 */
const Contact = ({ slice }: ContactProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=""
    >
      <div className="flex justify-center items-center flex-col text-center text-balance">
        <Heading as="h1" size="xl">
          {slice.primary.title}
        </Heading>
        <div className="prose prose-xl prose-slate prose-invert max-w-full mb-10">
          {slice.primary.subtitle}
        </div>
        <Button
          linkField={slice.primary.ctalink}
          label={slice.primary.ctatitle}
        />
      </div>
    </Bounded>
  );
};

export default Contact;
