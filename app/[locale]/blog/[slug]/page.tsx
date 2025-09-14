"use server";

import { Metadata } from "next";
import { BlogEntry } from "@/components/BlogEntry";
import ContentWrapper from "@/components/ContentWrapper";
import { fetchBlogBySlug } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string; locale: string }>;
}

export async function generateMetadata({ params }: Props) {
  const blogEntryData = await fetchBlogBySlug((await params).slug);

  if (!blogEntryData || !blogEntryData.content || Object.keys(blogEntryData.content).length === 0) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const locale = (await params).locale;
  const translation = blogEntryData.content[locale];
  const fallbackTranslation = blogEntryData.content['en'] || Object.values(blogEntryData.content)[0];

  const activeTranslation = translation || fallbackTranslation;

  return {
    title: activeTranslation.title,
    description: activeTranslation.summary || activeTranslation.title,
    openGraph: {
      title: activeTranslation.title,
      description: activeTranslation.summary || activeTranslation.title,
      type: "article",
      publishedTime: blogEntryData.created,
      modifiedTime: blogEntryData.updated,
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



export default async function BlogEntryPage({ params }: Props) {
  const blogEntryData = await fetchBlogBySlug((await params).slug);

  return (
    <main className="w-full
     font-sans transition-all duration-300 ease-in-out gap-6 space-y-4">
      <ContentWrapper>
        <BlogEntry blog={blogEntryData} />
      </ContentWrapper>
    </main>
  )
}