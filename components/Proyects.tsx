"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useTranslations } from "next-intl";
import { Github } from "lucide-react";
import { Project } from "@/app/api/proyects/route";
import React from "react";

import { useLocale } from "next-intl";
import { Models } from "node-appwrite";
import Link from "next/link";

export const Proyects = ({ proyects }: { proyects: Project[] }) => {
  const t = useTranslations("Proyects");
  const locale = useLocale();

  const getProjectTranslation = (project: Project) => {
    const translation = project.translations?.find(
      (t: Models.Document) => t.lang === locale,
    );
    return {
      name:
        translation?.name ||
        project.translations?.[0]?.name ||
        t('defaults.untitled'),
      description:
        translation?.description ||
        project.translations?.[0]?.description ||
        t('defaults.noDescription'),
    };
  };

  // Sort projects by year in descending order
  const sortedProjects = [...proyects].sort((a, b) => {
    const yearA = new Date(a.date).getFullYear();
    const yearB = new Date(b.date).getFullYear();
    return yearB - yearA;
  });

  return (
    <section className="w-full md:max-w-7xl mx-auto md:px-4 py-8">
      <div className="w-full md:max-w-7xl overflow-hidden">
        <Table className="w-full table-fixed">
          <TableHeader>
            <TableRow className="border-b border-border">
              <TableHead className="md:w-1/5 w-40 font-semibold text-foreground py-4 px-3">
                {t('tableHeaders.year')}
              </TableHead>
              <TableHead className="md:w-1/5 w-40 font-semibold text-foreground py-4 px-3">
                {t('tableHeaders.projectName')}
              </TableHead>
              <TableHead className="md:w-1/5 w-[40vh] font-semibold text-foreground py-4 px-3">
                {t('tableHeaders.description')}
              </TableHead>
              <TableHead className="md:w-1/5 w-40 font-semibold text-foreground py-4 px-3">
                {t('tableHeaders.skills')}
              </TableHead>
              <TableHead className="md:w-1/5 w-64 text-right font-semibold text-foreground py-4 px-3">
                {t('tableHeaders.link')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedProjects.map((project) => {
              const { name, description } = getProjectTranslation(project);
              return (
                <TableRow
                  key={project.$id}
                  className="border-b border-border last:border-b-0"
                >
                  <TableCell className="md:w-1/5 w-40 text-muted-foreground py-4 px-3 align-top min-h-[60px]">
                    {new Date(project.date).getFullYear() || '-'}
                  </TableCell>
                  <TableCell className="md:w-1/5 w-40 text-muted-foreground py-4 px-3 align-top min-h-[60px]">
                    <div className="w-full overflow-hidden">
                      <div className="md:break-all md:word-break-break-all md:overflow-wrap-anywhere md:hyphens-auto md:leading-relaxed md:whitespace-pre-wrap">{name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="md:w-1/5 !w-[40vh] max-w-[40vh] text-muted-foreground py-4 px-3 align-top min-h-[60px]">
                    <div className="w-full overflow-hidden">
                      <div className="">
                        <p className="max-h-full overflow-y-auto word-break-break-all overflow-wrap-anywhere hyphens-auto leading-relaxed whitespace-pre-wrap">{description}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="md:w-1/5 w-40 text-muted-foreground py-4 px-3 align-top min-h-[60px]">
                    <div className="w-full overflow-hidden">
                      <div className="flex flex-wrap gap-1">
                        {project.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-secondary/20 text-muted-foreground rounded-full font-medium break-words"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="md:w-1/5 w-64 text-muted-foreground py-4 px-3 align-top text-right min-h-[60px]">
                    <div className="w-full overflow-hidden">
                      <div className="md:break-all md:word-break-break-all md:overflow-wrap-anywhere md:hyphens-auto md:leading-relaxed md:whitespace-pre-wrap">
                        <Link
                          href={project.project_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline font-medium flex items-center gap-1 justify-end"
                          title={project.project_link}
                        >
                          {new URL(project.project_link).hostname.includes('github.com') ? (
                            <>
                              <Github className="h-4 w-4" />
                              <span>github.com</span>
                            </>
                          ) : (
                            new URL(project.project_link).hostname.replace('www.', '')
                          )}
                        </Link>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </section>


  );
};
