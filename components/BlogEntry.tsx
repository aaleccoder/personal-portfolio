"use client";
import { BlogsResponse } from "@/app/api/blog/[slug]/route"
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Comments from "@/components/Comments";


export const BlogEntry = ({ blog }: { blog: BlogsResponse }) => {

  const locale = usePathname().split("/")[1] || "en";

  const getTranslations = (blog: BlogsResponse) => {
    return blog.translations.find((translation) => translation.lang === locale);
  }
  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const translation = getTranslations(blog);

  return (
    <article className="w-full mx-auto px-4 py-8">
      <header className="mb-6 border-b pb-4">
        <h1 className="text-4xl font-bold mb-2 text-start text-primary">{translation?.title}</h1>
        <h2 className="text-xl font-semibold mb-2 text-muted-foreground">{translation?.summary}</h2>
        <div className="flex flex-col gap-4 text-sm text-muted-foreground mt-2">
          <div className="flex gap-4">
            <span>
              {locale === "en" ? "Created at" : locale === "es" ? "Creado el" : "Created at"}: {formatDate(blog.$createdAt)}
            </span>
            <span>
              {locale === "en" ? "Updated at" : locale === "es" ? "Actualizado el" : "Updated at"}: {formatDate(blog.$updatedAt)}
            </span>
          </div>
          <div className="flex gap-4">
            <p>{locale === "en" ? "Published by" : locale === "es" ? "Publicado por" : "Published by"} Raúl Alejandro Pérez Acosta</p>
          </div>
        </div>
      </header>
      <section className="prose prose-invert prose-lg max-w-none">
        <ReactMarkdown>{translation?.content || ""}</ReactMarkdown>
      </section>

      <section>
        <Comments />
      </section>

      <footer className="mt-12 pt-8 border-t border-border">
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-lg font-semibold text-muted-foreground">
            {locale === "en" ? "Share this article" : locale === "es" ? "Compartir este artículo" : "Share this article"}
          </h3>
          <div className="flex gap-3">
            <button
              onClick={() => {
                const url = typeof window !== 'undefined' ? window.location.href : '';
                const text = translation?.title || '';
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
              }}
              className="p-2 rounded-md bg-transparent hover:bg-accent transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </button>

            <button
              onClick={() => {
                const url = typeof window !== 'undefined' ? window.location.href : '';
                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
              }}
              className="p-2 rounded-md bg-transparent hover:bg-accent transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>

            <button
              onClick={() => {
                const url = typeof window !== 'undefined' ? window.location.href : '';
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
              }}
              className="p-2 rounded-md bg-transparent hover:bg-accent transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  onClick={async () => {
                    if (typeof window !== 'undefined' && navigator.share) {
                      try {
                        await navigator.share({
                          title: translation?.title || '',
                          text: translation?.summary || '',
                          url: window.location.href,
                        });
                      } catch (error) {
                        // User cancelled share or error occurred
                      }
                    } else if (typeof window !== 'undefined') {
                      const url = window.location.href;
                      await navigator.clipboard.writeText(url);
                    }
                  }}
                  className="p-2 rounded-md bg-transparent hover:bg-accent transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6L8.684 7.658m0 0a3 3 0 10-2.684 2.684m2.684-2.684l6.316 3.158m-6.316 0L15.368 9.658m0 0a3 3 0 111.342-2.684 3 3 0 01-.316 1.342m0 2.684L15.368 12m0 0l-6.316 3.158" />
                  </svg>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto">
                <div className="text-sm">
                  {locale === "en" ? "Link copied!" : locale === "es" ? "¡Enlace copiado!" : "Link copied!"}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </footer>
    </article>
  )

}