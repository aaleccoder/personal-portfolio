import appwriteEnv from "@/utils/appwrite.env";
import client from "@/utils/server";
import { Databases, Models, Query } from "node-appwrite";
import { Storage } from "node-appwrite";

// Type Definitions

export type BlogTranslations = {
  [langCode: string]: {
    title: string;
    summary: string;
    content: string;
  };
};

export interface BlogTranslationSummary {
  lang: string;
  title: string;
  summary: string;
}

export interface BlogTranslation {
  lang: string;
  title: string;
  summary: string;
  content: string;
}

export interface BlogEntry {
  $id: string;
  slug: string;
  $createdAt: string;
  $updatedAt: string;
  cover: string;
  tags: string[];
  starred: boolean;
  content: BlogTranslations;
}

export type BlogSummary = {
  $id: string;
  slug: string;
  $createdAt: string;
  $updatedAt: string;
  cover: string;
  content: BlogTranslations;
  tags: string[];
  starred: boolean;
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
  [langCode: string]: {
    role: string;
    description: string;
  };
};

export type Experience = {
  $id: string;
  startdate: string;
  enddate: string;
  content: ExperienceTranslations;
  Skills: string[];
};

export type Skills = {
  $id: string;
  name: string;
  icon: string;
  profficiency: 'low' | 'medium' | 'high';
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

export type ProjectTranslations = {
  [langCode: string]: {
    name: string;
    description: string;
  };
};

export type Project = {
  $id: string;
  project_link: string;
  skills: string[];
  images: string[];
  content: ProjectTranslations;
  starred: boolean;
  date: Date;
};


export async function fetchConfiguration(): Promise<PortfolioProfile | null> {
  try {
    const database = new Databases(client);
    const configDocument = await database.getDocument(
      appwriteEnv.appwrite.databaseId,
      appwriteEnv.appwrite.config.config_collection,
      appwriteEnv.appwrite.config.config_id,
    );

    if (configDocument && typeof configDocument.content === "string") {
      return JSON.parse(configDocument.content);
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

export async function fetchProjects(
  limit?: number,
): Promise<{ projects: Project[]; total: number }> {
  try {
    const database = new Databases(client);

    const queries = [Query.orderDesc("$createdAt")];
    if (limit) {
      queries.push(Query.limit(limit));
    } else {
      queries.push(Query.limit(100)); // Fetch up to 100 projects if no limit is specified
    }

    const projectsResponse = await database.listDocuments(
      appwriteEnv.appwrite.databaseId,
      appwriteEnv.appwrite.collections.proyects,
      queries,
    );

    const projects: Project[] = projectsResponse.documents.map((project) => {
      // Parse the content field which contains the translations
      let content: ProjectTranslations = {};
      try {
        content = typeof project.content === 'string' 
          ? JSON.parse(project.content) 
          : project.content || {};
      } catch (error) {
        console.error(`Error parsing content for project ${project.$id}:`, error);
        content = {};
      }

      return {
        $id: project.$id,
        project_link: project.project_link,
        skills: project.skills,
        images: project.images,
        content: content,
        starred: project.starred,
        date: project.date,
      };
    });

    return {
      projects: projects,
      total: projectsResponse.total,
    };
  } catch (error) {
    console.error("Error fetching projects:", error);
    return { projects: [], total: 0 };
  }
}

export async function fetchBlogs(
  options: { page?: number; limit?: number; starred?: boolean } = {},
): Promise<{ blogs: BlogSummary[]; total: number }> {
  const { page = 1, limit = 10, starred } = options;
  try {
    const database = new Databases(client);

    const queries = [Query.orderDesc("$createdAt")];

    if (starred !== undefined) {
      queries.push(Query.equal("starred", starred));
    }

    const offset = (page - 1) * limit;
    queries.push(Query.limit(limit));
    queries.push(Query.offset(offset));

    const response = await database.listDocuments(
      appwriteEnv.appwrite.databaseId,
      appwriteEnv.appwrite.collections.blogs,
      queries,
    );

    const blogSummaries: BlogSummary[] = response.documents.map((blog) => {
      // Parse the content field which contains the translations
      let content: BlogTranslations = {};
      try {
        content = typeof blog.content === 'string' 
          ? JSON.parse(blog.content) 
          : blog.content || {};
      } catch (error) {
        console.error(`Error parsing content for blog ${blog.$id}:`, error);
        content = {};
      }

      return {
        $id: blog.$id,
        slug: blog.slug,
        $createdAt: blog.$createdAt,
        $updatedAt: blog.$updatedAt,
        cover: blog.cover,
        starred: blog.starred,
        tags: blog.tags,
        content: content,
      };
    });

    return { blogs: blogSummaries, total: response.total };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { blogs: [], total: 0 };
  }
}

export async function fetchBlogBySlug(slug: string): Promise<BlogEntry | null> {
  try {
    const database = new Databases(client);

    const blogResponse = await database.listDocuments(
      appwriteEnv.appwrite.databaseId,
      appwriteEnv.appwrite.collections.blogs,
      [Query.equal("slug", slug)],
    );

    if (blogResponse.documents.length === 0) {
      return null;
    }

    const blog = blogResponse.documents[0];

    // Parse the content field which contains the translations
    let content: BlogTranslations = {};
    try {
      content = typeof blog.content === 'string' 
        ? JSON.parse(blog.content) 
        : blog.content || {};
    } catch (error) {
      console.error(`Error parsing content for blog ${blog.$id}:`, error);
      content = {};
    }

    return {
      $id: blog.$id,
      slug: blog.slug,
      $createdAt: blog.$createdAt,
      $updatedAt: blog.$updatedAt,
      cover: blog.cover,
      tags: blog.tags || [],
      starred: blog.starred || false,
      content: content,
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

    const experiencesResponse: Experience[] = experiences.map((experience) => {
      let content: ExperienceTranslations = {};
      try {
        content = typeof experience.content === 'string' 
          ? JSON.parse(experience.content) 
          : experience.content || {};
      } catch (error) {
        console.error(`Error parsing content for experience ${experience.$id}:`, error);
        content = {};
      }

      return {
        $id: experience.$id,
        startdate: experience.startdate,
        enddate: experience.enddate,
        content: content,
        Skills: experience.Skills,
      };
    });

    return experiencesResponse;
  } catch (err) {
    console.error("Experiences fetch error:", err);
    return [];
  }
}
