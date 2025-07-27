const appwriteEnv = {
  appwrite: {
    endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
    projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    apiKey: String(process.env.NEXT_PUBLIC_APPWRITE_API_KEY),
    databaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    collections: {
      skills: String(process.env.NEXT_PUBLIC_APPWRITE_SKILLS_COLLECTION_ID),
      proyects: String(process.env.NEXT_PUBLIC_APPWRITE_PROYECTS_COLLECTION_ID),
      experiences: String(
        process.env.NEXT_PUBLIC_APPWRITE_EXPERIENCES_COLLECTION_ID,
      ),
      experienceTranslations: String(
        process.env.NEXT_PUBLIC_APPWRITE_EXPERIENCESTRANSLATIONS_COLLECTION_ID,
      ),
      proyectsTranslations: String(
        process.env.NEXT_PUBLIC_APPWRITE_PROYECTSTRANSLATIONS_COLLECTIONS_ID,
      ),
      blogs: String(
        process.env.NEXT_PUBLIC_APPWRITE_BLOG_COLLECTION_ID),
      blogTranslations: String(
        process.env.NEXT_PUBLIC_APPWRITE_BLOG_TRANSLATIONS_COLLECTION_ID,
      ),
      newsLetter: String(process.env.NEXT_PUBLIC_APPWRITE_NEWSLETTER)
    },

    bucketBlogs: String(
      process.env.NEXT_PUBLIC_APPWRITE_BLOGS_BUCKET_ID
    ),
    config: String(process.env.NEXT_PUBLIC_APPWRITE_CONFIG),
    config_id: String(process.env.NEXT_PUBLIC_APPWRITE_CONFIG_ID),
  },
};

export default appwriteEnv;
