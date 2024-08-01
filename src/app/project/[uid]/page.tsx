import { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/prismicio";
import ContentBody from "@/components/ContentBody";
import { metadata } from "@/app/layout";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("project", params.uid)
    .catch(() => notFound());
  
  const blogPosts = await client.getAllByType("blog_post", {
    orderings: {
      field: "my.blog_post.date",
      direction: "desc",
    },
  });
  
  
  return <ContentBody page={page} recentPosts={ blogPosts.slice(0, 3)} />;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("project", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title ?? metadata.title,
    description: page.data.meta_description ?? metadata.description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("project");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
