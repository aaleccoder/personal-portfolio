const appwriteEnv = {
  appwrite: {
    endpoint: String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
    projectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
    apiKey: String(process.env.NEXT_PUBLIC_APPWRITE_API_KEY),
    databaseId: String(process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID),
    collections: {
      skills: "68c6c82b0017689f2e0e",
      proyects: "68c6cce800292a9573c0",
      experiences: "68c6cd6e0034eb8107a9",
      blogs: "68c6ce08000e8f10001a",
    },
    config: {
      config_collection: "68c6ce7c00234ea317c1",
      config_id: "68c6d03e000b5d56ecf6"
    },
    buckets: {
      bucketBlogs: "68c6cf0200331fbf23d0"
    }
  },
};

export default appwriteEnv;
