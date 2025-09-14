"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { BlogSummary } from '@/lib/data';
import { getPocketBaseFileUrl } from '@/lib/utils';
import pocketbaseEnv from '@/utils/pocketbase.env';



interface BlogProps {
  blogs: BlogSummary[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const Blog = ({ blogs, currentPage = 1, totalPages = 1 }: BlogProps) => {
  const allTags = Array.from(new Set(blogs.flatMap(blog => Array.isArray(blog.tags) ? blog.tags : [])));

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const locale = usePathname().split("/")[1] || "en";
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedBlogs = [...blogs].sort((a, b) => {
    const dateA = new Date(a.updated).getTime();
    const dateB = new Date(b.updated).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  const [blogsState, setBlogsState] = useState<BlogSummary[]>(sortedBlogs);

  useEffect(() => {
    let filtered = [...blogs];
    if (selectedTags.length > 0) {
      filtered = filtered.filter(blog =>
        Array.isArray(blog.tags) && blog.tags.some(tag => selectedTags.includes(tag))
      );
    }
    const sorted = filtered.sort((a, b) => {
      const dateA = new Date(a.updated).getTime();
      const dateB = new Date(b.updated).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setBlogsState(sorted);
  }, [sortOrder, blogs, selectedTags]);

  const getTranslations = (blog: BlogSummary) => {
    const translation = blog.content[locale];
    const fallbackTranslation = blog.content['en'] || Object.values(blog.content)[0];

    return {
      title: translation?.title || fallbackTranslation?.title || "Blog Title",
      summary: translation?.summary || fallbackTranslation?.summary || "No summary available.",
    };
  }

  return (
    <div>
      <section className="gap-6 space-y-4">
        <div>
          <div className="flex flex-row items-center col-span-3 lg:col-span-4 mb-4 border shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md px-3 py-2 gap-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search blog..."
              className="flex-1 bg-transparent outline-none border-none text-foreground placeholder:text-muted-foreground p-0"
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filteredBlogs = blogs.filter(blog => {
                  const allTitles = Object.values(blog.content).map(translation => translation.title.toLowerCase());
                  return allTitles.some(title => title.includes(searchTerm));
                });
                setBlogsState(filteredBlogs);
              }}
            />
          </div>
          <div className="mb-4">
            <div className="flex gap-4 items-center">
              <div className="w-[12rem]">
                <Select>
                  <SelectTrigger className="w-full">
                    <p className="text-white">Tags</p>
                  </SelectTrigger>
                  <SelectContent>
                    {allTags.map(tag => (
                      <div key={tag} className="flex items-center gap-2 px-2 py-1 hover:bg-accent hover:text-accent-foreground cursor-pointer" onClick={e => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedTags.includes(tag)}
                          onCheckedChange={checked => {
                            if (checked) {
                              setSelectedTags([...selectedTags, tag]);
                            } else {
                              setSelectedTags(selectedTags.filter(t => t !== tag));
                            }
                          }}
                        />
                        <span>{tag}</span>
                      </div>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={sortOrder} onValueChange={(value) => setSortOrder(value as "asc" | "desc")}>
                  <SelectTrigger className="w-[12rem] cursor-pointer">
                    <SelectValue>
                      <div className="flex items-center gap-2">
                        {sortOrder === "asc" ? <ArrowUpIcon className="w-4 h-4" /> : <ArrowDownIcon className="w-4 h-4" />}
                        Recency {sortOrder === "asc" ? "(Oldest)" : "(Newest)"}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="asc">
                      <div className="flex items-center gap-2">
                        <ArrowUpIcon className="w-4 h-4" />
                        Recency (Oldest)
                      </div>
                    </SelectItem>
                    <SelectItem value="desc">
                      <div className="flex items-center gap-2">
                        <ArrowDownIcon className="w-4 h-4" />
                        Recency (Newest)
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {blogsState.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.id} className="block">
              <Card key={blog.id} className="hover:border hover:rounded-3xl hover:border-primary p-4 hover:shadow-lg transition-all duration-300 cursor-pointer gap-0 w-full bg-card hover:scale-102 hover:bg-transparent rounded-xl">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-1/3 sm:min-w-[200px] h-full">
                    <Image
                      src={getPocketBaseFileUrl(pocketbaseEnv.pocketbase.collections.blogs, blog.id, blog.cover)}
                      alt={getTranslations(blog).title || "blog image"}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full sm:rounded-l-lg"
                    />
                  </div>
                  <div className="flex-1 py-6">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {getTranslations(blog).title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground text-base mb-2 line-clamp-3">
                        {getTranslations(blog).summary}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="flex flex-col items-start gap-2">
                      {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {blog.tags.map(tag => (
                            <span key={tag} className="bg-accent text-xs px-2 py-1 rounded">{tag}</span>
                          ))}
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground">
                        {new Date(blog.updated).toLocaleDateString()}
                      </div>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set('page', (currentPage - 1).toString());
              router.push(`${window.location.pathname}?${params.toString()}`);
            }}
            disabled={currentPage <= 1}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
          >
            Previous
          </button>

          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set('page', (currentPage + 1).toString());
              router.push(`${window.location.pathname}?${params.toString()}`);
            }}
            disabled={currentPage >= totalPages}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}