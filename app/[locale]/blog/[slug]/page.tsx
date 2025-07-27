"use server";

import { BlogsResponse } from "@/app/api/blog/[slug]/route";

import { BlogEntry } from "@/components/BlogEntry";


const fetchBlogEntry = async (slug: string) => {
  try {
    const res = await fetch(`${process.env.URL}/api/blog/${slug}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}


export default async function BlogEntryPage({ params }: { params: { slug: string } }) {
  const [blogEntryData] = await Promise.all([fetchBlogEntry(await params.slug)]);

  return (
    <section className="w-full
     font-sans transition-all duration-300 ease-in-out gap-6 space-y-4">
      <BlogEntry blog={blogEntryData} />
    </section>
  )
}