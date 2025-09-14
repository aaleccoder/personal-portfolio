"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { getPocketBaseFileUrl } from '@/lib/utils';
import pocketbaseEnv from '@/utils/pocketbase.env';

export type Skills = {
  id: string;
  name: string;
  icon: string;
  profficiency: 'low' | 'medium' | 'high';
};


export const SkillsComponent = ({ skills }: { skills: Skills[] }) => {
  const t = useTranslations("Skills");

  return (
    <section className="space-y-10">
      <h2 className="text-2xl md:text-3xl uppercase text-primary text-center transition-all duration-300 ease-in-out font-titles font-black">
        {t("title")}
      </h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 bg-muted/10">
          {skills.map((skill, index) => (
            <div
              key={skill.name + index}
              className="flex flex-col items-center justify-center p-4 rounded-lg shadow-md shadow-accent/50 bg-gradient-to-br to-primary/60 text-white transform hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              <i className={`devicon-${skill.name}-plain text-7xl`} ></i>
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
