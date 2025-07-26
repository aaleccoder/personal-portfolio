import { Project } from "@/app/api/proyects/route";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/dist/client/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";

export const ProyectsLandPage = ({ proyects }: { proyects: Project[] }) => {
  const locale = usePathname().split("/")[1];



  return (
    <div className="space-y-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-primary text-center transition-all duration-300 ease-in-out ">
        Proyects
      </h2>
      <div className="flex flex-col gap-4">
        {proyects.map((proyect, index) => (
          <div
            key={index}
            className="md:flex-row cursor-pointer p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm"
          >
            <div className="flex-shrink-0">
              <a
                href={proyect.project_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={proyect.images[0]}
                  alt={
                    proyect.translations.find(
                      (translation) => translation.lang == locale,
                    )?.name || "Project Image"
                  }
                  className="w-32 h-32 object-cover rounded"
                  width={128}
                  height={128}
                />
              </a>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">
                {
                  proyect.translations.find(
                    (translation) => translation.lang == locale,
                  )?.name
                }
              </h3>
              <p className="text-muted-foreground mb-2">
                {
                  proyect.translations.find(
                    (translation) => translation.lang === locale,
                  )?.description
                }
              </p>
              <div className="flex flex-wrap gap-1">
                {proyect.skills?.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-secondary/30  text-foreground rounded-xl text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <Link
          href="/projects"
          className="text-muted-foreground hover:underline flex flex-row space-x-2 hover:text-foreground transition-all duration-300"
        >
          <p>View Projects</p>
          <ExternalLinkIcon />
        </Link>
      </div>
    </div>
  );
};
