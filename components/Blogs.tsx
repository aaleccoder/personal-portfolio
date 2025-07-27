"use client";
import { BlogSummary } from "@/app/api/blog/route";
import { usePathname } from "next/navigation";
import MarkdownHooks from "react-markdown"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownIcon, ArrowUpIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";



export const Blog = ({ blogs }: { blogs: BlogSummary[] }) => {
  const allTags = Array.from(new Set(blogs.flatMap(blog => Array.isArray(blog.tags) ? blog.tags : [])));

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const locale = usePathname().split("/")[1] || "en";

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedBlogs = [...blogs].sort((a, b) => {
    const dateA = new Date(a.$updatedAt).getTime();
    const dateB = new Date(b.$updatedAt).getTime();
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
      const dateA = new Date(a.$updatedAt).getTime();
      const dateB = new Date(b.$updatedAt).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
    setBlogsState(sorted);
  }, [sortOrder, blogs, selectedTags]);

  const getTranslations = (blog: BlogSummary) => {
    return blog.translations.find((translation) => translation.lang === locale);
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
                  const translations = blog.translations.map(t => t.title.toLowerCase());
                  return translations.some(title => title.includes(searchTerm));
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
        <div className="md:grid md:grid-cols-3 lg:grid-cols-4">

          {blogsState.map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.$id} className="block mb-6">
              <Card key={blog.$id} className="cursor-pointer hover:border hover:rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 gap-0 w-full">
                <CardHeader>
                  <Image src={blog.cover} alt={getTranslations(blog)?.title || "blog image"} width={500} height={300} className="object-cover" />
                  <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{getTranslations(blog)?.title || "Blog Title"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-lg mb-2">{getTranslations(blog)?.summary || "No summary available."}</CardDescription>
                </CardContent>
                <CardFooter>
                  {Array.isArray(blog.tags) && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {blog.tags.map(tag => (
                        <span key={tag} className="bg-accent text-xs px-2 py-1 rounded">{tag}</span>
                      ))}
                    </div>
                  )}
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div >
  )
}