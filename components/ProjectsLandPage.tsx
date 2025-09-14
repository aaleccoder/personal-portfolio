import { ExternalLinkIcon } from "lucide-react";
import Link from "next/dist/client/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { useTranslations } from "next-intl";
import { Project } from "@/lib/data";
import { getPocketBaseFileUrl } from '@/lib/utils';
import pocketbaseEnv from '@/utils/pocketbase.env';

export const ProjectsLandPage = ({ projects }: { projects: Project[] }) => {
  const t = useTranslations("Projects");
  const locale = usePathname().split("/")[1];

  const getProjectTranslation = (project: Project) => {
    const translation = project.content[locale];
    const fallbackTranslation = project.content['en'] || Object.values(project.content)[0];

    return {
      name: translation?.name || fallbackTranslation?.name || "Untitled",
      description: translation?.description || fallbackTranslation?.description || "No description available.",
    };
  };

  return (
    <section className="w-full space-y-4">
      <p className="text-2xl md:text-3xl text-primary text-center transition-all duration-300 ease-in-out font-titles font-black uppercase">
        {t("title")}
      </p>
      <div className="w-full mx-auto space-y-4">
        {projects.map((project: Project, index: number) => {
          const { name, description } = getProjectTranslation(project);
          return (
            <Link
              key={index}
              href={project.project_link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:border hover:rounded-3xl hover:border-primary hover:shadow-lg transition-all duration-300 w-full bg-card hover:bg-transparent rounded-xl flex flex-col md:flex-row gap-4 px-4 py-4 md:px-6 md:py-4"
            >
              <div className="w-full md:w-1/3 h-48 md:h-auto rounded-lg overflow-hidden">
                <Image
                  src={getPocketBaseFileUrl(pocketbaseEnv.pocketbase.collections.projects, project.id, project.images[0])}
                  alt={name}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full md:w-2/3 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold">{name}</h3>
                  <p className="text-muted-foreground mt-2">{description}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.skills.map((tech: string, techIndex: number) => (
                    <span
                      key={techIndex}
                      className="bg-primary/20 text-primary text-xs font-semibold px-2.5 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
        <Link
          href="/projects"
          className="text-muted-foreground hover:underline flex flex-row space-x-2 hover:text-foreground transition-all duration-300"
        >
          <p>View Projects</p>
          <ExternalLinkIcon />
        </Link>
      </div>
    </section>
  );
};
