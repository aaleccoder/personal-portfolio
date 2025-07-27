import appwriteEnv from "@/utils/appwrite.env";
import client from "@/utils/supabase/appwrite/server";
import { Databases, Query, Storage } from "node-appwrite";

export type BlogsTranslation = {
  lang: string;
  content: string;
  title: string;
  summary: string;
};

export type Blogs = {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  tags: string[];
  slug: string;
  cover: string;
};

export type BlogsResponse = Pick<Blogs, "tags" | "slug" | "cover"> & {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  translations: BlogsTranslation[];
};

// ...existing code...

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  try {
    const { params } = context;
    const resolvedParams = await params;
    const database = new Databases(client);

    const blogList = await database.listDocuments(
      appwriteEnv.appwrite.databaseId,
      appwriteEnv.appwrite.collections.blogs,
      [Query.equal("slug", resolvedParams.slug)]
    ).then((response) => response.documents) as Blogs[];

    if (!blogList || blogList.length === 0) {
      return new Response("Blog not found", { status: 404 });
    }

    const blog = blogList[0];

    const blogsTranslation: BlogsTranslation[] = await database.listDocuments(
      appwriteEnv.appwrite.databaseId,
      appwriteEnv.appwrite.collections.blogTranslations,
      [Query.equal("blogs", blog.$id)]
    ).then((response) => response.documents) as BlogsTranslation[];

    const translationsWithContent = await Promise.all(blogsTranslation.map(async (translation) => {
      try {
        const bucketId = appwriteEnv.appwrite.bucketBlogs;
        const fileId = translation.content;
        const fileResponse = await new Storage(client).getFileDownload(bucketId, fileId);
        const content = Buffer.from(fileResponse).toString("utf-8");
        return { ...translation, content };
      } catch (err) {
        console.error(`Error fetching markdown for fileId ${translation.content}:`, err);
        return translation;
      }
    }));

    const blogResponse: BlogsResponse = {
      $id: blog.$id,
      $createdAt: blog.$createdAt,
      $updatedAt: blog.$updatedAt,
      tags: blog.tags,
      slug: blog.slug,
      translations: translationsWithContent,
      cover: blog.cover,
    };

    return new Response(JSON.stringify(blogResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching blog by slug:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
