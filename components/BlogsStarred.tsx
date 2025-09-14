import { ExternalLinkIcon } from "lucide-react";
import Link from "next/dist/client/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { BlogSummary } from "@/lib/data";

interface BlogsStarredProps {
  blogs?: BlogSummary[];
  limit?: number;
}

export const BlogsStarred = ({ blogs, limit }: BlogsStarredProps) => {
  const t = useTranslations("Blogs");
  const locale = usePathname().split("/")[1];

  const starredBlogs = blogs?.filter(blog => blog.starred) || [];

  const displayedBlogs = limit ? starredBlogs.slice(0, limit) : starredBlogs;

  const getBlogTranslation = (blog: BlogSummary) => {
    const translation = blog.content[locale];
    const fallbackTranslation = blog.content['en'] || Object.values(blog.content)[0];

    return {
      title: translation?.title || fallbackTranslation?.title || "Untitled",
      summary: translation?.summary || fallbackTranslation?.summary || "No summary available.",
    };
  };

  if (displayedBlogs.length === 0) {
    return null;
  }

  return (
    <section className="w-full space-y-4">
      <p className="text-2xl md:text-3xl text-primary text-center transition-all duration-300 ease-in-out font-titles font-black uppercase">
        {t("title")}
      </p>
      <div className="w-full mx-auto space-y-4">
        {displayedBlogs.map((blog, index) => {
          const { title, summary } = getBlogTranslation(blog);
          return (
            <Link
              key={index}
              href={`/blog/${blog.slug}`}
              rel="noopener noreferrer"
              className="hover:border hover:rounded-3xl hover:border-primary hover:shadow-lg transition-all duration-300 w-full bg-card hover:bg-transparent rounded-xl flex flex-col md:flex-row gap-4 px-4 py-4 md:px-6 md:py-4"
            >
              <div className="rounded-xl w-full md:w-auto">
                <Image
                  src={blog.cover}
                  alt={title || "Blog Image"}
                  className="object-cover w-full md:w-[16rem] h-48 md:h-full rounded-md"
                  width={256}
                  height={256}
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex-shrink-0 w-full flex items-start">
                  <h3 className="text-xl font-bold">
                    {title}
                  </h3>
                </div>
                <div>
                  <p className="text-muted-foreground mt-2">
                    {summary}
                  </p>
                </div>
                <div className="flex flex-col flex-wrap gap-2 mt-4">
                  {blog.tags?.map((tag: string, tagIndex: number) => (
                    <span
                      key={tagIndex}
                      className="bg-primary/20 text-primary text-xs font-semibold px-2.5 py-1 rounded-full w-fit"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
        <Link
          href="/blog"
          className="text-muted-foreground hover:underline flex flex-row space-x-2 hover:text-foreground transition-all duration-300"
        >
          <p>View Blogs</p>
          <ExternalLinkIcon />
        </Link>
      </div>
    </section>
  );
};