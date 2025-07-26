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
import { Models } from "node-appwrite";
import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";

type Translations = {
  Role: string;
  Description: string;
  lang: string;
};

export type Experience = {
  $id: string;
  startdate: string;
  role: string;
  enddate: string;
  company: string;
  translations: Translations[];
  skills: string[];
};

export const Story = ({ experiences }: { experiences: Experience[] }) => {
  const t = useTranslations("Story");
  const locale = usePathname().split("/")[1];

  return (
    <section className="w-full space-y-4">
      <p className="text-2xl sm:text-3xl md:text-4xl text-primary text-center transition-all duration-300 ease-in-out">
        Past Experiences
      </p>
      <div className="w-full mx-auto space-y-4">
        {experiences &&
          experiences.map((experience) => (
            <Card
              key={experience.$id}
              className="cursor-pointer hover:border hover:rounded-lg p-4   hover:shadow-lg transition-all duration-300 hover:scale-105 gap-0 w-full"
            >
              <CardHeader className="flex-shrink-0 w-full flex items-start">
                <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {
                    experience.translations.find(
                      (element) => element.lang === locale,
                    )?.Role
                  }
                </CardTitle>
                <p className="text-xs text-muted-foreground whitespace-nowrap uppercase">
                  {experience.startdate.split("T")[0]}
                  {experience.enddate
                    ? ` - ${experience.enddate.split("T")[0]}`
                    : ""}
                </p>
              </CardHeader>
              <div className="col-span-3 space-y-">
                <CardHeader>
                  <CardDescription className="text-muted-foreground text-lg mb-2">
                    <p>{experience.company}</p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {
                      experience.translations.find(
                        (element) => element.lang === locale,
                      )?.Description
                    }
                  </p>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-wrap gap-1">
                    {experience.skills?.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-secondary/30  text-foreground rounded-xl text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardFooter>
              </div>
            </Card>
          ))}
      </div>
    </section>
  );
};
