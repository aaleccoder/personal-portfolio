"use server";

import { Metadata } from "next";
import { Blog } from "@/components/Blogs";

const fetchBlogs = async () => {
  try {
    const response = await fetch(`${process.env.URL}/api/blog`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching blogs:", error);
  }
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale;

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

export default async function BlogsPage({ params }: { params: { locale: string } }) {
  const [blogs] = await Promise.all([fetchBlogs()]);

  return (
    <main className="font-sans transition-all duration-300 ease-in-out">
      <Blog blogs={blogs} />
    </main>
  )
}





