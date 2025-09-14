const pocketbaseEnv = {
  pocketbase: {
    url: String(process.env.NEXT_PUBLIC_POCKETBASE_URL || 'http://localhost:8090'),
    collections: {
      skills: "skills",
      projects: "projects",
      experiences: "experiences",
      blogs: "blogs",
      config: "config"
    }
  },
};

export default pocketbaseEnv;
