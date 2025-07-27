import { Metadata } from "next";
import ContentWrapper from "@/components/ContentWrapper";
import HomeClient from "@/components/HomeClient";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  const metadataByLocale = {
    en: {
      title: "Daeralysdev - Full Stack Developer",
      description: "Welcome to my personal portfolio. I'm a full stack developer passionate about creating amazing web experiences with modern technologies.",
    },
    es: {
      title: "Daeralysdev - Desarrollador Full Stack",
      description: "Bienvenido a mi portafolio personal. Soy un desarrollador full stack apasionado por crear experiencias web increíbles con tecnologías modernas.",
    },
  };

  const activeMetadata = metadataByLocale[locale as keyof typeof metadataByLocale] || metadataByLocale.en;

  return {
    title: activeMetadata.title,
    description: activeMetadata.description,
    openGraph: {
      title: activeMetadata.title,
      description: activeMetadata.description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: activeMetadata.title,
      description: activeMetadata.description,
    },
  };
}

async function fetchConfiguration() {
  try {
    const response = await fetch(`${process.env.URL}/api/configuration`, {
      method: "GET",
      cache: "no-store"
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch configuration: ${response.statusText}`);
    }
    const data = await response.json();
    if (data && data.config && data.config.config) {
      return JSON.parse(data.config.config);
    } else {
      throw new Error("Invalid configuration data structure");
    }
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to fetch configuration";
    console.error("Configuration fetch error:", err);
    return null;
  }
}

async function fetchSkills() {
  try {
    const response = await fetch(`${process.env.URL}/api/skills`, {
      method: "GET",
      cache: "no-store"
    });
    const data = await response.json();
    return data.documents || [];
  } catch (err) {
    console.error("Skills fetch error:", err);
    return [];
  }
}

async function fetchProyects() {
  try {
    const response = await fetch(`${process.env.URL}/api/proyects?starred=true`, {
      method: "GET",
      cache: "no-store"
    });
    const data = await response.json();
    if (
      data &&
      data.projectsResponseToClient &&
      Array.isArray(data.projectsResponseToClient) &&
      data.projectsResponseToClient.length > 0
    ) {
      return data.projectsResponseToClient;
    } else {
      return [];
    }
  } catch (err) {
    console.error("Proyects fetch error:", err);
    return [];
  }
}

async function fetchBlogs() {
  try {
    const response = await fetch(`${process.env.URL}/api/blog?starred=true`, {
      method: "GET",
      cache: "no-store"
    });
    const data = await response.json();
    return data || [];
  } catch (err) {
    console.error("Blogs fetch error:", err);
    return [];
  }
}

async function fetchExperiences() {
  try {
    const response = await fetch(`${process.env.URL}/api/experience`, {
      method: "GET",
      cache: "no-store"
    });
    const data = await response.json();
    if (data && Array.isArray(data)) {
      return data;
    } else if (data?.documents) {
      return data.documents;
    } else {
      return [];
    }
  } catch (err) {
    console.error("Experiences fetch error:", err);
    return [];
  }
}

export default async function Home() {
  const [skills, experiences, proyects, configuration, blogs] = await Promise.all([
    fetchSkills(),
    fetchExperiences(),
    fetchProyects(),
    fetchConfiguration(),
    fetchBlogs()
  ]);
  return (
    <ContentWrapper>
      <HomeClient skills={skills} experiences={experiences} proyects={proyects} configuration={configuration} blogs={blogs} />
    </ContentWrapper>
  )
}