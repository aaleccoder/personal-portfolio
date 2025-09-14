import pocketbaseEnv from "@/utils/pocketbase.env";
import pb from "@/utils/server";

// Helper function to ensure admin authentication
const ensureAuth = async () => {
  if (!pb.authStore.isValid) {
    const email = process.env.POCKETBASE_USER;
    const password = process.env.POCKETBASE_PASSWORD;
    
    if (email && password) {
      try {
        await pb.admins.authWithPassword(email, password);
      } catch (error) {
        console.error('Failed to re-authenticate PocketBase admin:', error);
        throw new Error('PocketBase authentication failed');
      }
    } else {
      throw new Error('PocketBase admin credentials not configured');
    }
  }
};

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
  id: string;
  slug: string;
  created: string;
  updated: string;
  cover: string;
  tags: string[];
  starred: boolean;
  content: BlogTranslations;
}

export type BlogSummary = {
  id: string;
  slug: string;
  created: string;
  updated: string;
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
  id: string;
  startdate: string;
  enddate: string;
  content: ExperienceTranslations;
  Skills: string[];
};

export type Skills = {
  id: string;
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
  id: string;
  project_link: string;
  skills: string[];
  images: string[];
  content: ProjectTranslations;
  starred: boolean;
  date: Date;
};


export async function fetchConfiguration(): Promise<PortfolioProfile | null> {
  try {
    
    
    const configRecords = await pb.collection(pocketbaseEnv.pocketbase.collections.config).getFullList({
      filter: 'name = "main"'
    });


    if (configRecords.length > 0 && configRecords[0].content) {
      return typeof configRecords[0].content === "string" 
        ? JSON.parse(configRecords[0].content) 
        : configRecords[0].content;
    } else {
      throw new Error("Configuration not found");
    }
  } catch (error) {
    console.error("Configuration fetch error:", error);
    return null;
  }
}

let skillsCache: Promise<Skills[]> | null = null;

export async function fetchSkills(): Promise<Skills[]> {
  if (skillsCache) {
    return skillsCache;
  }

  skillsCache = (async () => {
    try {
      const skills = await pb.collection(pocketbaseEnv.pocketbase.collections.skills).getFullList();
      return skills as unknown as Skills[];
    } catch (err) {
      console.error("Skills fetch error:", err);
      return [];
    } finally {
      skillsCache = null;
    }
  })();

  return skillsCache;
}

export async function fetchProjects(
  limit?: number,
): Promise<{ projects: Project[]; total: number }> {
  try {
    
    
    const options: any = {
      sort: '-created',
    };
    
    if (limit) {
      options.perPage = limit;
    } else {
      options.perPage = 100;
    }

    const projectsResponse = await pb.collection(pocketbaseEnv.pocketbase.collections.projects).getList(1, options.perPage, options);

    const projects: Project[] = projectsResponse.items.map((project: any) => {
      // Parse the content field which contains the translations
      let content: ProjectTranslations = {};
      try {
        content = typeof project.content === 'string' 
          ? JSON.parse(project.content) 
          : project.content || {};
      } catch (error) {
        console.error(`Error parsing content for project ${project.id}:`, error);
        content = {};
      }

      return {
        id: project.id,
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
      total: projectsResponse.totalItems,
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
    
    
    const filterConditions = [];
    if (starred !== undefined) {
      filterConditions.push(`starred = ${starred}`);
    }

    const blogOptions: any = {
      sort: '-created',
      filter: filterConditions.join(' && '),
    };

    const response = await pb.collection(pocketbaseEnv.pocketbase.collections.blogs).getList(page, limit, blogOptions);

    const blogSummaries: BlogSummary[] = response.items.map((blog: any) => {
      // Parse the content field which contains the translations
      let content: BlogTranslations = {};
      try {
        content = typeof blog.content === 'string' 
          ? JSON.parse(blog.content) 
          : blog.content || {};
      } catch (error) {
        console.error(`Error parsing content for blog ${blog.id}:`, error);
        content = {};
      }

      return {
        id: blog.id,
        slug: blog.slug,
        created: blog.created,
        updated: blog.updated,
        cover: blog.cover,
        starred: blog.starred,
        tags: blog.tags,
        content: content,
      };
    });

    return { blogs: blogSummaries, total: response.totalItems };
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return { blogs: [], total: 0 };
  }
}

// Cache for blog requests to prevent duplicate calls
const blogCache = new Map<string, Promise<BlogEntry | null>>();

export async function fetchBlogBySlug(slug: string): Promise<BlogEntry | null> {
  // Check if we already have a pending request for this slug
  if (blogCache.has(slug)) {
    return blogCache.get(slug)!;
  }

  // Create the request promise
  const requestPromise = (async () => {
    try {
      const blogResponse = await pb.collection(pocketbaseEnv.pocketbase.collections.blogs).getFullList({
        filter: `slug = "${slug}"`
      });

      if (blogResponse.length === 0) {
        return null;
      }

      const blog = blogResponse[0];

      // Parse the content field which contains the translations
      let content: BlogTranslations = {};
      try {
        content = typeof blog.content === 'string' 
          ? JSON.parse(blog.content) 
          : blog.content || {};
      } catch (error) {
        console.error(`Error parsing content for blog ${blog.id}:`, error);
        content = {};
      }

      return {
        id: blog.id,
        slug: blog.slug,
        created: blog.created,
        updated: blog.updated,
        cover: blog.cover,
        tags: blog.tags || [],
        starred: blog.starred || false,
        content: content,
      };
    } catch (error: any) {
      if (error?.isAbort || error?.code === 20) {
        console.log(`Request for blog slug "${slug}" was cancelled (auto-cancellation)`);
        return null;
      }
      console.error(`Error fetching blog by slug ${slug}:`, error);
      return null;
    } finally {
      // Clean up cache after request completes
      blogCache.delete(slug);
    }
  })();

  // Store the promise in cache
  blogCache.set(slug, requestPromise);
  
  return requestPromise;
}

export async function fetchExperiences(): Promise<Experience[]> {
  try {
    
    
    const experiences = await pb.collection(pocketbaseEnv.pocketbase.collections.experiences).getFullList({
      sort: '-startdate'
    });

    const experiencesResponse: Experience[] = experiences.map((experience: any) => {
      let content: ExperienceTranslations = {};
      try {
        content = typeof experience.content === 'string' 
          ? JSON.parse(experience.content) 
          : experience.content || {};
      } catch (error) {
        console.error(`Error parsing content for experience ${experience.id}:`, error);
        content = {};
      }

      return {
        id: experience.id,
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
