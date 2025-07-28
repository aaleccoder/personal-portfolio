import { Metadata } from "next";
import ContentWrapper from "@/components/ContentWrapper";
import HomeClient from "@/components/HomeClient";
import { fetchBlogs, fetchConfiguration, fetchExperiences, fetchProjects, fetchSkills } from "@/lib/data";

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

export default async function Home() {
  const [skills, experiences, projectsData, configuration, blogsData] = await Promise.all([
    fetchSkills(),
    fetchExperiences(),
    fetchProjects(6), // Fetching 6 projects for the homepage
    fetchConfiguration(),
    fetchBlogs({ limit: 4, starred: true }) // Fetching 4 starred blogs for the homepage
  ]);

  const { projects } = projectsData;
  const { blogs } = blogsData;

  return (
    <ContentWrapper>
      <HomeClient skills={skills} experiences={experiences} projects={projects} configuration={configuration} blogs={blogs} />
    </ContentWrapper>
  )
}