"use server";

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
export default async function BlogsPage() {
  const [blogs] = await Promise.all([fetchBlogs()]);

  return (
    <main className="font-sans transition-all duration-300 ease-in-out">
      <Blog blogs={blogs} />
    </main>
  )
}





