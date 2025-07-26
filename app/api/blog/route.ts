import appwriteEnv from "@/utils/appwrite.env";
import client from "@/utils/supabase/appwrite/server";
import { NextResponse } from "next/server";
import { Databases, Models, Query, Storage } from "node-appwrite";


export type BlogTranslationSummary = {
  lang: string;
  title: string;
  summary: string;
};

export type BlogSummary = {
  $id: string;
  slug: string;
  $createdAt: string;
  $updatedAt: string;
  cover: string;
  translations: BlogTranslationSummary[];
  tags: string[];
};


export async function GET() {
  try {
    const database = new Databases(client);
    const blogs = await database.listDocuments(
      appwriteEnv.appwrite.databaseId,
      appwriteEnv.appwrite.collections.blogs
    ).then((response) => response.documents);

    const blogSummaries: BlogSummary[] = await Promise.all(
      blogs.map(async (blog: any) => {
        const translations = await database.listDocuments(
          appwriteEnv.appwrite.databaseId,
          appwriteEnv.appwrite.collections.blogTranslations,
          [Query.equal("blogs", blog.$id)]
        ).then((response) => response.documents);
        const translationSummaries: BlogTranslationSummary[] = translations.map((t: any) => ({
          lang: t.lang,
          title: t.title ?? "",
          summary: t.summary ?? ""
        }));
        return {
          $id: blog.$id,
          slug: blog.slug,
          cover: blog.cover,
          $createdAt: blog.$createdAt,
          $updatedAt: blog.$updatedAt,
          translations: translationSummaries,
          tags: blog.tags || []
        };
      })
    );

    return new Response(JSON.stringify(blogSummaries), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      }
    });
  } catch (error) {
    console.error("Error fetching blog summaries:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
