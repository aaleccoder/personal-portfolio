import { Project } from "@/app/api/proyects/route";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/dist/client/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { Models } from "node-appwrite";
import { useTranslations } from "next-intl";

export const ProyectsLandPage = ({ proyects }: { proyects: Project[] }) => {
  const t = useTranslations("Proyects");
  const locale = usePathname().split("/")[1];

  const getProjectTranslation = (project: Project) => {
    const translation = project.translations?.find(
      (t: Models.Document) => t.lang === locale,
    );
    return {
      name:
        translation?.name ||
        project.translations?.[0]?.name ||
        "Untitled",
      description:
        translation?.description ||
        project.translations?.[0]?.description ||
        "No description available.",
    };
  };

  return (
    <section className="w-full space-y-4">
      <p className="text-2xl md:text-3xl text-primary text-center transition-all duration-300 ease-in-out font-titles font-black uppercase">
        {t("title")}
      </p>
      <div className="w-full mx-auto space-y-4">
        {proyects.map((proyect, index) => {
          const { name, description } = getProjectTranslation(proyect);
          return (
            <Link
              key={index}
              href={proyect.project_link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:border hover:rounded-3xl hover:border-primary hover:shadow-lg transition-all duration-300 w-full bg-card hover:bg-transparent rounded-xl flex gap-4 px-6 py-4 "
            >
              <div className="rounded-xl">
                <Image
                  src={proyect.images[0]}
                  alt={name || "Project Image"}
                  className="object-cover w-[16rem] h-full rounded-md"
                  width={256}
                  height={256}
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex-shrink-0 w-full flex items-start">
                  <h3 className="text-xl font-semibold text-foreground !group-hover:text-primary transition-colors">
                    {name}
                  </h3>
                </div>
                <div>
                  <p className="text-muted-foreground text-lg mb-2">
                    {description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {proyect.skills?.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-secondary/30 text-foreground rounded-xl"
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
