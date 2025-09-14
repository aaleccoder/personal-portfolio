"use client";
import { BlogEntry as BlogEntryType } from "@/lib/data";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Comments from "@/components/Comments";
import { Clipboard } from "lucide-react";
import { toast } from "sonner";
import { getPocketBaseFileUrl } from '@/lib/utils';
import pocketbaseEnv from '@/utils/pocketbase.env';

export const BlogEntry = ({ blog }: { blog: BlogEntryType | null }) => {

  const locale = usePathname().split("/")[1] || "en";

  if (!blog) {
    return <div>Blog post not found.</div>;
  }

  const getTranslations = (blog: BlogEntryType) => {
    const translation = blog.content[locale];
    const fallbackTranslation = blog.content['en'] || Object.values(blog.content)[0];

    return translation || fallbackTranslation || null;
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

  if (!translation) {
    const handleSwitchToEnglish = () => {
      const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
      const englishUrl = currentUrl.replace(`/${locale}/`, '/en/');
      window.location.href = englishUrl;
    };

    const isDevelopment = typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1' ||
        window.location.hostname.includes('localhost'));

    return (
      <article className="w-full mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="max-w-md">
            <div className="mb-6 p-4 bg-accent/50 rounded-lg border border-border">
              <h2 className="text-2xl font-bold mb-4 text-muted-foreground">
                {locale === "es" ? "Contenido no disponible" : "Content not available"}
              </h2>
              <p className="text-muted-foreground mb-4">
                {locale === "es"
                  ? "Este contenido no está disponible en español."
                  : "This content is not available in your preferred language."}
              </p>

              {isDevelopment && (
                <p className="text-sm text-muted-foreground/80 mb-4">
                  {locale === "es"
                    ? "Nota: La traducción automática no funciona en desarrollo (localhost)."
                    : "Note: Automatic translation doesn't work in development (localhost)."}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4 justify-center">
              <button
                onClick={handleSwitchToEnglish}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                {locale === "es" ? "Ver versión en inglés" : "View English version"}
              </button>

              {!isDevelopment && (
                <button
                  onClick={() => {
                    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
                    const englishUrl = currentUrl.replace(`/${locale}/`, '/en/');
                    window.open(`https://translate.google.com/translate?sl=en&tl=${locale}&u=${encodeURIComponent(englishUrl)}`, '_blank');
                  }}
                  className="px-4 py-2 border border-border rounded-md hover:bg-accent transition-colors"
                >
                  {locale === "es" ? "Traducir con Google" : "Translate with Google"}
                </button>
              )}
            </div>

            <div className="mt-6 text-sm text-muted-foreground/70">
              <p>
                {locale === "es"
                  ? "Puedes cambiar al idioma inglés para ver el contenido original."
                  : "You can switch to English to view the original content."}
              </p>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="w-full mx-auto px-4 py-8">
      <header className="mb-6 border-b pb-4">
        {blog.cover && (
          <div className="mb-6">
            <img
              src={getPocketBaseFileUrl(pocketbaseEnv.pocketbase.collections.blogs, blog.id, blog.cover)}
              alt={translation?.title || "Blog cover"}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        <h1 className="text-4xl font-titles uppercase font-black mb-2 text-start text-primary">{translation?.title}</h1>
        <h2 className="text-xl font-semibold mb-2 text-muted-foreground">{translation?.summary}</h2>
        <div className="flex flex-col gap-4 text-sm text-muted-foreground mt-2">
          <div className="flex gap-4">
            <span>
              {locale === "en" ? "Created at" : locale === "es" ? "Creado el" : "Created at"}: {formatDate(blog.created)}
            </span>
            <span>
              {locale === "en" ? "Updated at" : locale === "es" ? "Actualizado el" : "Updated at"}: {formatDate(blog.updated)}
            </span>
          </div>
          <div className="flex gap-4">
            <p>{locale === "en" ? "Published by" : locale === "es" ? "Publicado por" : "Published by"} Raúl Alejandro Pérez Acosta</p>
          </div>
        </div>
      </header>
      <section className="prose prose-invert prose-lg max-w-none">
        <ReactMarkdown
          // @ts-ignore
          components={{
            // @ts-ignore
            img: ({ src, alt }) => (
              <img
                src={src}
                alt={alt || "Image"}
                className="w-full max-w-2xl mx-auto h-auto rounded-lg shadow-md my-4"
                style={{ maxHeight: '400px', objectFit: 'cover' }}
              />
            ),
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold mt-6 mb-4 text-primary">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold mt-5 mb-3 text-primary">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-bold mt-4 mb-2 text-primary">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="mb-4 leading-relaxed">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside mb-4 ml-4">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside mb-4 ml-4">{children}</ol>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground">
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <code className="bg-accent/50 px-1 py-0.5 rounded text-sm">{children}</code>
            ),
            pre: ({ children }) => (
              <pre className="bg-accent/50 p-4 rounded-lg overflow-x-auto my-4">
                {children}
              </pre>
            )
          }}
        >
          {translation?.content || ""}
        </ReactMarkdown>
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
                  toast.success(
                    locale === "en" ? "Link copied!" : locale === "es" ? "¡Enlace copiado!" : "Link copied!"
                  );
                }
              }}
              className="p-2 rounded-md bg-transparent hover:bg-accent transition-colors"
            >
              <Clipboard />
            </button>
          </div>
        </div>
      </footer>
    </article>
  )

}