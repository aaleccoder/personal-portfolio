"use client";
import { BlogsResponse } from "@/app/api/blog/[slug]/route"
import { usePathname } from "next/navigation";
import MarkdownHooks from "react-markdown";
import remarkGfm from 'remark-gfm'
import rehypeStarryNight from 'rehype-starry-night'


export const BlogEntry = ({ blog }: { blog: BlogsResponse }) => {

  const locale = usePathname().split("/")[1] || "en";

  const getTranslations = (blog: BlogsResponse) => {
    return blog.translations.find((translation) => translation.lang === locale);
  }
  return (
    <article className="w-full px-4 py-8">
      <h1 className="justify-start items-start text-4xl font-bold mb-4 text-start">{getTranslations(blog)?.title}</h1>
      <h2 className="text-xl font-semibold mb-2 text-muted-foreground">{getTranslations(blog)?.summary}</h2>
      <MarkdownHooks remarkPlugins={[remarkGfm]}>{getTranslations(blog)?.content || ""}</MarkdownHooks>
    </article>
  )

}