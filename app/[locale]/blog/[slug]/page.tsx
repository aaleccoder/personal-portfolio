"use server";

import { Metadata } from "next";
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

export async function generateMetadata({ params }: { params: { slug: string; locale: string } }): Promise<Metadata> {
  const blogEntryData: BlogsResponse = await fetchBlogEntry(params.slug);

  if (!blogEntryData || !blogEntryData.translations || blogEntryData.translations.length === 0) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const translation = blogEntryData.translations.find(t => t.lang === params.locale);

  const activeTranslation = translation || blogEntryData.translations[0];

  return {
    title: activeTranslation.title,
    description: activeTranslation.summary || activeTranslation.title,
    openGraph: {
      title: activeTranslation.title,
      description: activeTranslation.summary || activeTranslation.title,
      type: "article",
      publishedTime: blogEntryData.$createdAt,
      modifiedTime: blogEntryData.$updatedAt,
      images: blogEntryData.cover ? [blogEntryData.cover] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: activeTranslation.title,
      description: activeTranslation.summary || activeTranslation.title,
      images: blogEntryData.cover ? [blogEntryData.cover] : [],
    },
  };
}

export default async function BlogEntryPage({ params }: { params: { slug: string } }) {
  const [blogEntryData] = await Promise.all([fetchBlogEntry(params.slug)]);

  return (
    <section className="w-full
     font-sans transition-all duration-300 ease-in-out gap-6 space-y-4">
      <BlogEntry blog={blogEntryData} />
    </section>
  )
}