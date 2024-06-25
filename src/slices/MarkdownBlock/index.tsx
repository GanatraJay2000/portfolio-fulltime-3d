import { Content } from "@prismicio/client";
import ReactMarkdown from "react-markdown";
import { SliceComponentProps } from "@prismicio/react";
import * as prismicR from "@prismicio/richtext";
import * as prismic from "@prismicio/client";
import rehypeRaw from "rehype-raw";
/**
 * Props for `MarkdownBlock`.
 */
export type MarkdownBlockProps =
  SliceComponentProps<Content.MarkdownBlockSlice>;

/**
 * Component for "MarkdownBlock" Slices.
 */
const MarkdownBlock = ({ slice }: MarkdownBlockProps): JSX.Element => {
  // const markdown = RichText.asText(slice.primary.markdown as any);
  const linkResolver = (doc: any) => `/${doc.uid}`;
  const markdownSerializer = prismicR.wrapMapSerializer({
    heading1: ({ children }) => `# ${children.join("")}\n\n`,
    heading2: ({ children }) => `## ${children.join("")}\n\n`,
    heading3: ({ children }) => `### ${children.join("")}\n\n`,
    heading4: ({ children }) => `#### ${children.join("")}\n\n`,
    heading5: ({ children }) => `##### ${children.join("")}\n\n`,
    heading6: ({ children }) => `###### ${children.join("")}\n\n`,
    paragraph: ({ children }) => `${children.join("")}\n\n`,
    preformatted: ({ text }) => `\`\`\`\n${text}\n\`\`\`\n\n`,
    strong: ({ children }) => `**${children.join("")}**`,
    em: ({ children }) => `_${children.join("")}_`,
    listItem: ({ children }) => `- ${children.join("")}\n`,
    oListItem: ({ children }) => `1. ${children.join("")}\n`,
    list: ({ children }) => `${children.join("")}\n`,
    oList: ({ children }) => `${children.join("")}\n`,
    image: ({ node }) =>
      node.linkTo
        ? `[![${node.alt}](${node.url})](${node.linkTo.url})\n\n`
        : `![${node.alt}](${node.url})\n\n`,
    embed: ({ node }) => `${node.oembed.html}\n\n`,
    hyperlink: ({ node, children }) =>
      `[${children.join("")}](${prismic.asLink(node.data, linkResolver)})`,
    label: ({ children }) => children.join(""),
    span: ({ text }) => text.replace("\n", "<br/>"),
  });

  const markdown = prismicR
    .serialize(slice.primary.markdown, markdownSerializer)
    .join("");
  return (
    <div className="prose prose-xl prose-slate prose-invert  max-w-full">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownBlock;
