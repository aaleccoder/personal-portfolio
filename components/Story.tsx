import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import { Experience } from "@/lib/data";

export const Story = ({ experiences }: { experiences: Experience[] }) => {
  const t = useTranslations("Story");
  const locale = usePathname().split("/")[1];

  const getExperienceTranslation = (experience: Experience) => {
    const translation = experience.content[locale];
    const fallbackTranslation = experience.content['en'] || Object.values(experience.content)[0];

    console.log("Here", experience.Skills);

    return {
      role: translation?.role || fallbackTranslation?.role || "Unknown Role",
      description: translation?.description || fallbackTranslation?.description || "No description available.",
    };
  };

  return (
    <section className="w-full space-y-4">
      <p className="text-2xl  uppercase md:text-3xl text-primary text-center transition-all duration-300 ease-in-out font-titles font-black">
        {t("title")}
      </p>
      <div className="w-full mx-auto space-y-4">
        {experiences &&
          experiences.map((experience) => {
            const { role, description } = getExperienceTranslation(experience);
            return (
              <Card
                key={experience.id}
                className="hover:border hover:rounded-3xl hover:border-primary p-4 hover:shadow-lg transition-all duration-300 gap-0 w-full hover:bg-transparent"
              >
                <CardHeader className="flex-shrink-0 w-full flex items-start">
                  <CardTitle className="text-xl font-semibold text-foreground !group-hover:text-primary transition-colors">
                    {role}
                  </CardTitle>
                </CardHeader>
                <div className="col-span-3 space-y-2">
                  <CardHeader>
                    <CardDescription className="text-muted-foreground text-lg mb-2">
                      <p className="text-muted-foreground text-base whitespace-nowrap">
                        {new Date(experience.startdate.split(" ")[0]).toLocaleString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                        {experience.enddate
                          ? ` - ${new Date(experience.enddate.split(" ")[0]).toLocaleString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}`
                          : " - Present"}
                      </p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {description}
                    </p>
                  </CardContent>
                  <CardFooter className="">
                    <div className="flex flex-wrap gap-1">
                      {experience.Skills?.map((tech, techIndex) => (
                        <p
                          key={techIndex}
                          className="bg-primary/20 text-primary text-xs font-semibold px-2.5 py-1 rounded-full"
                        >
                          {tech}
                        </p>
                      ))}
                    </div>
                  </CardFooter>
                </div>
              </Card>
            );
          })}
      </div>
    </section>
  );
};
