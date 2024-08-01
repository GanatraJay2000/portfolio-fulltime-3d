import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content, DateField, isFilled } from "@prismicio/client";
import Tags from "@/components/Tags";
import { cn } from "@/util/cn";
import Link from "next/link";

export default async function ContentBody({
  page,
  recentPosts,
}: {
  page: Content.BlogPostDocument | Content.ProjectDocument;
  recentPosts?: Content.BlogPostDocument[];
}) {
  return (
    <Bounded as="article">
      <div className="flex flex-col md:flex-row gap-10 md:w-10/12 mx-auto">
        <BodyContent className="grow" page={page} />
        <div className="md:w-3/12 flex flex-col gap-10">
          <div className="rounded-xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 w-full ">
            My <Link className="text-blue-500 whitespace-nowrap" target="_blank" href="https://showcase.jayganatra.com">UI Showcase!</Link>
          </div>
          
          <div className="">
            <Heading as="h6" size="sm" className="w-auto my-5">
              Recent Blogs
            </Heading>
            {
              recentPosts?.map((post) => (
                <div className="rounded-xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 w-full mb-5" key={post.id}>
                  <Link href={`/blog/${post.uid}`}>
                    
                      <h1 className="text-xl mb-4">
                        {post.data.title}
                      </h1>
                      <Tags tags={post.tags} className="text-sm" />
                    
                  </Link>
                </div>
              ))
            }
            
          </div>
        </div>
      </div>
    </Bounded>
  );
}

function BodyContent ({ page, className }: { page: Content.BlogPostDocument | Content.ProjectDocument, className?: string }) {
    
  function formatDate(date: DateField) {
    if (isFilled.date(date)) {
      const dateOptions: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Intl.DateTimeFormat("en-US", dateOptions).format(
        new Date(date)
      );
    }
  }

  const formattedDate = formatDate(page.data.date);
  
  return (
    <div className={cn("rounded-xl border-2 border-slate-800 bg-slate-900 px-4 py-10 md:px-8 md:pt-20 md:pb-10 w-full min-[905px]:w-[90ch] mx-auto", className)}>
        <Heading as="h1" size="md">
          {page.data.title}
        </Heading>

        <Tags tags={page.tags} />

        <p className="mt-8 border-b border-slate-600 text-xl font-medium text-slate-300">
          {formattedDate}
        </p>
        <div className="prose prose-lg prose-invert mt-12 w-full max-w-none md:mt-20">
          <SliceZone slices={page.data.slices} components={components} />
        </div>
      </div>
  )
}
