"use server";

import { Metadata } from "next";
import { Blog } from "@/components/Blogs";
import ContentWrapper from "@/components/ContentWrapper";
import { fetchBlogs } from "@/lib/data";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  const metadataByLocale = {
    en: {
      title: "Blog - Daeralysdev",
      description: "Read my latest thoughts on web development, technology, and software engineering. And other nerdy things, and any of my thoughts :)",
    },
    es: {
      title: "Blog - Daeralysdev",
      description: "Lee mis últimas reflexiones sobre desarrollo web, tecnología e ingeniería de software. Y otras cosas nerds, y cualquiera de mis pensamientos :)",
    },
  };

  const activeMetadata = metadataByLocale[locale as keyof typeof metadataByLocale] || metadataByLocale.en;

  return {
    title: activeMetadata.title,
    description: activeMetadata.description,
    openGraph: {
      title: activeMetadata.title,
      description: activeMetadata.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: activeMetadata.title,
      description: activeMetadata.description,
    },
  };
}

interface BlogsPageProps {
  searchParams: Promise<{ page?: string; limit?: string; starred?: string }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const resolvedSearchParams = await searchParams;

  const currentPage = parseInt(resolvedSearchParams.page || '1');
  const itemsPerPage = parseInt(resolvedSearchParams.limit || '10');
  const starredFilter = resolvedSearchParams.starred ? resolvedSearchParams.starred === 'true' : undefined;

  const { blogs, total } = await fetchBlogs({ page: currentPage, limit: itemsPerPage, starred: starredFilter });

  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));

  return (
    <main className="font-sans transition-all duration-300 ease-in-out">
      <ContentWrapper>
        <Blog
          blogs={blogs}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </ContentWrapper>
    </main>
  )
}


