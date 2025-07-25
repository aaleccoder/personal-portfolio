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

type Translations = {
  Role: string;
  Description: string;
  lang: string;
};

type Experience = {
  $id: string;
  startdate: string;
  role: string;
  enddate: string;
  company: string;
  translations: Translations[];
  skills: string[];
};

export const Story = () => {
  const t = useTranslations("Story");
  const locale = usePathname().split("/")[1];
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch("/api/experience");
        const data = await response.json();
        if (data && Array.isArray(data)) {
          setExperiences(data);
        } else {
          setExperiences([]);
        }
      } catch (err) {
        setError("Failed to fetch experiences");
        setExperiences([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  return (
    <section className="w-full space-y-4">
      <p className="text-2xl sm:text-3xl md:text-4xl text-primary text-center transition-all duration-300 ease-in-out">
        Past Experiences
      </p>
      <div className="w-full mx-auto space-y-4">
        {loading && (
          <p className="text-center text-muted-foreground">
            Loading experiences...
          </p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && experiences && experiences.length === 0 && (
          <p className="text-center text-muted-foreground">
            No experiences found.
          </p>
        )}
        {!loading &&
          !error &&
          experiences &&
          experiences.map((experience) => (
            <Card
              key={experience.$id}
              className="cursor-pointer hover:border hover:rounded-lg p-4   hover:shadow-lg transition-all duration-300 hover:scale-105 grid md:grid-cols-4 gap-0 w-full bg-transparent border-none shadow-none"
            >
              <CardHeader className="flex-shrink-0 w-full flex items-start">
                <p className="text-xs text-muted-foreground whitespace-nowrap uppercase">
                  {experience.startdate.split("T")[0]}
                  {experience.enddate
                    ? ` - ${experience.enddate.split("T")[0]}`
                    : ""}
                </p>
              </CardHeader>
              <div className="col-span-3 space-y-">
                <CardHeader>
                  <CardTitle className="text-md text-foreground group-hover:text-primary transition-colors">
                    {
                      experience.translations.find(
                        (element) => element.lang === locale,
                      )?.Role
                    }
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    <p>{experience.company}</p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mt-2 text-xs text-muted-foreground">
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
