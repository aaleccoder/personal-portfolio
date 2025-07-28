import appwriteEnv from "@/utils/appwrite.env";
import client from "@/utils/server";
import { Databases, Models, Query } from "node-appwrite";
import { Storage } from "node-appwrite";

// Type Definitions

export interface BlogTranslationSummary {
  lang: string;
  title: string;
  summary: string;
};

export interface BlogTranslation {
  lang: string;
  title: string;
  summary: string;
  content: string;
};

export interface BlogEntry {
  $id: string;
  slug: string;
  $createdAt: string;
  $updatedAt: string;
  cover: string;
  tags: string[];
  starred: boolean;
  translations: BlogTranslation[];
};

export type BlogSummary = {
  $id: string;
  slug: string;
  $createdAt: string;
  $updatedAt: string;
  cover: string;
  translations: BlogTranslationSummary[];
  tags: string[];
  starred: boolean
};

type SocialLinks = {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
};

type TranslationEntry = {
  aboutMe: string;
};

type Translations = {
  [langCode: string]: TranslationEntry;
};

export type ExperienceTranslations = {
  Role: string;
  Description: string;
  lang: string;
};

export type Experience = {
  $id: string;
  startdate: string;
  role: string;
  enddate: string;
  company: string;
  translations: ExperienceTranslations[];
  skills: string[];
};

export type Skills = {
  $id: string;
  name: string;
  icon: string;
  profficiency: number;
};

export type PortfolioProfile = {
  profileImage: string;
  socialLinks: SocialLinks;
  contact: {
    email?: string;
    phoneNumber?: string;
  };
  translations: Translations;
};

export type Project = {
  $id: string;
  project_link: string;
  skills: string[];
  images: string[];
  translations: Models.Document[];
  starred: boolean;
  date: Date;
};

// Data Fetching Functions

export async function fetchConfiguration(): Promise<PortfolioProfile | null> {
  try {
    const database = new Databases(client);
    const configDocument = await database.getDocument(
      appwriteEnv.appwrite.databaseId,
      appwriteEnv.appwrite.config,
      appwriteEnv.appwrite.config_id,
    );

    if (configDocument && typeof configDocument.config === 'string') {
      return JSON.parse(configDocument.config);
    } else {
      throw new Error("Invalid configuration data structure");
    }
  } catch (error) {
    console.error("Configuration fetch error:", error);
    return null;
  }
}

export async function fetchSkills(): Promise<Skills[]> {
  try {
    const database = new Databases(client);
    const response = await database.listDocuments(
      appwriteEnv.appwrite.databaseId,
      appwriteEnv.appwrite.collections.skills,
    );
    return response.documents as unknown as Skills[];
  } catch (err) {
    console.error("Skills fetch error:", err);
    return [];
  }
}

export async function fetchProjects(limit?: number): Promise<{ projects: Project[]; total: number }> {
  try {
    const database = new Databases(client);

    const queries = [Query.orderDesc('$createdAt')];
    if (limit) {
      queries.push(Query.limit(limit));
    } else {
      queries.push(Query.limit(100)); // Fetch up to 100 projects if no limit is specified
    }

    const projectsResponse = await database.listDocuments(
      appwriteEnv.appwrite.databaseId,
      appwriteEnv.appwrite.collections.proyects,
      queries
    );

    const projectsWithTranslations: Project[] = await Promise.all(
      projectsResponse.documents.map(async (project) => {
        const projectTranslation = await database
          .listDocuments(
            appwriteEnv.appwrite.databaseId,
            appwriteEnv.appwrite.collections.proyectsTranslations,
            [Query.equal("projects", project.$id)],
          )
          .then((response) => response.documents);

        return {
          $id: project.$id,
          project_link: project.project_link,
          skills: project.skills,
          images: project.images,
          translations: projectTranslation,
          starred: project.starred,
          date: project.date,
        };
      })
    );

    return { projects: projectsWithTranslations, total: projectsResponse.total };
  } catch (error) {
    console.error("Error fetching projects with translations:", error);
    return { projects: [], total: 0 };
  }
}

export async function fetchBlogs(options: { page?: number; limit?: number; starred?: boolean } = {}): Promise<{ blogs: BlogSummary[]; total: number; }> {
  const { page = 1, limit = 10, starred } = options;
  try {
    const database = new Databases(client);

    const queries = [Query.orderDesc('$createdAt')];

    if (starred !== undefined) {
      queries.push(Query.equal('starred', starred));
    }

    const offset = (page - 1) * limit;
    queries.push(Query.limit(limit));
    queries.push(Query.offset(offset));

    const response = await database.listDocuments(
      appwriteEnv.appwrite.databaseId,
      appwriteEnv.appwrite.collections.blogs,
      queries
    );

    const blogSummaries: BlogSummary[] = await Promise.all(
      response.documents.map(async (blog) => {
        const blogTranslations = await database.listDocuments(
          appwriteEnv.appwrite.databaseId,
          appwriteEnv.appwrite.collections.blogTranslations,
          [Query.equal('blogs', blog.$id)]
        ).then((translationResponse) => translationResponse.documents);

        return {
          $id: blog.$id,
          title: blog.title,
          summary: blog.summary,
          date: blog.date,
          tags: blog.tags,
          slug: blog.slug,
          $createdAt: blog.$createdAt,
          $updatedAt: blog.$updatedAt,
          cover: blog.cover,
          starred: blog.starred,
          translations: blogTranslations.map((t) => ({
            title: t.title,
            summary: t.summary,
            lang: t.lang,
          })),
        };
      })
    );

    return { blogs: blogSummaries, total: response.total };
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return { blogs: [], total: 0 };
  }
}

export async function fetchBlogBySlug(slug: string): Promise<BlogEntry | null> {
  try {
    const database = new Databases(client);
    const storage = new Storage(client);

    const blogResponse = await database.listDocuments(
      appwriteEnv.appwrite.databaseId,
      appwriteEnv.appwrite.collections.blogs,
      [Query.equal('slug', slug)]
    );

    if (blogResponse.documents.length === 0) {
      return null;
    }

    const blog = blogResponse.documents[0];

    const translationsResponse = await database.listDocuments(
      appwriteEnv.appwrite.databaseId,
      appwriteEnv.appwrite.collections.blogTranslations,
      [Query.equal('blog_id', blog.$id)]
    );

    const translations: BlogTranslation[] = await Promise.all(
      translationsResponse.documents.map(async (t: any) => {
        try {
          const fileResponse = await storage.getFileDownload(
            appwriteEnv.appwrite.bucketBlogs,
            t.content
          );
          const content = Buffer.from(fileResponse as any).toString('utf-8');
          return { ...t, content };
        } catch (err) {
          console.error(`Error fetching markdown for fileId ${t.content}:`, err);
          return { ...t, content: 'Error loading content.' };
        }
      })
    );

    return {
      $id: blog.$id,
      slug: blog.slug,
      $createdAt: blog.$createdAt,
      $updatedAt: blog.$updatedAt,
      cover: blog.cover,
      tags: blog.tags || [],
      starred: blog.starred || false,
      translations,
    };
  } catch (error) {
    console.error(`Error fetching blog by slug ${slug}:`, error);
    return null;
  }
}

export async function fetchExperiences(): Promise<Experience[]> {
  try {
    const database = new Databases(client);

    const experiences = await database
      .listDocuments(
        appwriteEnv.appwrite.databaseId,
        appwriteEnv.appwrite.collections.experiences,
      )
      .then((response) => response.documents);

    const experiencesResponse: Experience[] = await Promise.all(
      experiences.map(async (experience) => {
        const translationDocs = await database
          .listDocuments(
            appwriteEnv.appwrite.databaseId,
            appwriteEnv.appwrite.collections.experienceTranslations,
            [Query.equal("experience", experience.$id)],
          )
          .then((response) => response.documents);

        const translations: ExperienceTranslations[] = translationDocs.map((doc: any) => ({
          Role: doc.Role,
          Description: doc.Description,
          lang: doc.lang,
        }));

        return {
          $id: experience.$id,
          role: experience.role,
          startdate: experience.startdate,
          enddate: experience.enddate,
          company: experience.company,
          translations: translations,
          skills: experience.skills,
        };
      }),
    );

    return experiencesResponse;
  } catch (err) {
    console.error("Experiences fetch error:", err);
    return [];
  }
}
