"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

type Skills = {
  $id: string;
  name: string;
  icon: string;
  profficiency: number;
};

export const SkillsComponent = () => {
  const t = useTranslations("Skills");

  const [skills, setSkills] = useState<Skills[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await fetch("/api/skills", {
        method: "GET",
      });
      const data = await response.json();
      setSkills(data.documents);
    };

    fetchSkills();
  }, []);

  return (
    <section className="space-y-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-primary text-center transition-all duration-300 ease-in-out">
        {t("title")}
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-muted/10">
          {skills.map((skill, index) => (
            <div
              key={skill.name + index}
              className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md shadow-accent/50 bg-gradient-to-br to-primary/60 text-white transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <Image
                width={72}
                height={72}
                src={skill.icon}
                alt={skill.name}
                className="w-12 h-12 mb-2 md:w-16 md:h-16"
              />
              <p className="text-sm md:text-base font-medium text-center">
                {skill.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
