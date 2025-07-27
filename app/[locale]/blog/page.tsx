"use server";

import { Metadata } from "next";
import { Blog } from "@/components/Blogs";
import ContentWrapper from "@/components/ContentWrapper";

const fetchBlogs = async (page: number = 1, limit: number = 10, starred?: boolean) => {
  try {
    let url = `${process.env.URL}/api/blog?page=${page}&limit=${limit}`;
    if (starred !== undefined) {
      url += `&starred=${starred}`;
    }
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching blogs:", error);
    return [];
  }
}

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
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; limit?: string; starred?: string }>;
}

// Promise params
export default async function BlogsPage({ params, searchParams }: BlogsPageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const currentPage = parseInt(resolvedSearchParams.page || '1');
  const itemsPerPage = parseInt(resolvedSearchParams.limit || '10');
  const starredFilter = resolvedSearchParams.starred ? resolvedSearchParams.starred === 'true' : undefined;

  const [blogs] = await Promise.all([fetchBlogs(currentPage, itemsPerPage, starredFilter)]);

  // For now, we'll assume total pages based on current results
  // In a real app, you'd get this from the API response
  const totalPages = Math.max(1, Math.ceil(blogs.length / itemsPerPage));

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


