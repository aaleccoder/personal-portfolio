"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { ArrowUpRightFromCircleIcon, HomeIcon } from "lucide-react";
import { Button } from "./ui/button";
import { TechIcon } from "./ui/tech-icon";
import { getTechStack } from "@/lib/tech-stack";
import { Project } from "@/app/api/proyects/route";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ProjectsCombobox } from "@/components/ProjectsCombobox";
import { Link } from "@/i18n/navigation";
import React from "react";

import { useLocale } from "next-intl";
import { Models } from "node-appwrite";

export const Proyects = ({ proyects }: { proyects: Project[] }) => {
  const t = useTranslations("Proyects");
  const [api, setApi] = React.useState<CarouselApi>();
  const locale = useLocale();

  return (
    <section className="w-full px-1 py-2 md:px-4 md:py-8">
      <div className="mb-4 flex items-center space-x-2 mt-16 md:mt-0 justify-center">
        <Link href="/">
          <Button variant="outline" size="icon">
            <HomeIcon className="h-4 w-4" />
          </Button>
        </Link>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage>
                <ProjectsCombobox projects={proyects} api={api} locale={locale} />
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Carousel setApi={setApi} className="w-full max-w-full cursor-pointer mt-4">
        <CarouselContent className="ml-0">
          {proyects.map((proyect, index) => {
            const getProjectTranslation = (project: Project) => {
              const translation = project.translations?.find((t: Models.Document) => t.lang === locale);
              return {
                name: translation?.name || project.translations?.[0]?.name || "Untitled",
                description: translation?.description || project.translations?.[0]?.description || "No description available."
              };
            }
            const { name, description } = getProjectTranslation(proyect);
            const shortDescription = description.length > 255 ? description.slice(0, 255) + "..." : description;
            const hasMultipleImages = proyect.images && proyect.images.length > 1;
            return (
              <CarouselItem key={index} className="pl-1 md:pl-4">
                <div className="flex flex-col md:grid md:grid-cols-3 md:space-x-6 text-left space-y-2 md:space-y-0">
                  {/* Images first on mobile, second on desktop */}
                  <div className="space-y-2 relative flex flex-col items-center justify-center md:col-span-2 order-1 md:order-2 md:space-y-8">
                    <div className="relative w-full flex items-center justify-center px-6 md:px-0">
                      <CarouselPrevious className="md:hidden absolute left-1 z-10 bg-background/80 hover:bg-background w-8 h-8" />
                      {hasMultipleImages ? (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Image
                              src={proyect.images?.[0] || "/vercel.svg"}
                              width={64}
                              height={64}
                              alt="project image"
                              className="rounded-xl cursor-pointer w-[70vh]"
                            />
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>{name}</DialogTitle>
                            </DialogHeader>
                            <Carousel className="w-full relative">
                              <CarouselContent>
                                {proyect.images.map((img, i) => (
                                  <CarouselItem key={i}>
                                    <div className="p-1 flex items-center justify-center">
                                      <Image
                                        src={img}
                                        width={1200}
                                        height={800}
                                        alt={`project image ${i + 1}`}
                                        className="rounded-xl object-contain w-[70vh]"
                                      />
                                    </div>
                                  </CarouselItem>
                                ))}
                              </CarouselContent>
                              <CarouselPrevious className="left-4" />
                              <CarouselNext className="right-4" />
                            </Carousel>
                          </DialogContent>
                        </Dialog>
                      ) : (
                        <Image
                          src={proyect.images?.[0] || "/vercel.svg"}
                          width={64}
                          height={64}
                          alt="project image"
                          className="rounded-xl w-[70vh]"
                        />
                      )}
                      <CarouselNext className="md:hidden absolute right-1 z-10 bg-background/80 hover:bg-background w-8 h-8" />
                    </div>
                    <div className="hidden md:flex justify-end items-center gap-2 mt-4">
                      <CarouselPrevious className="relative top-auto left-auto right-auto translate-y-0 translate-x-0" />
                      <CarouselNext className="relative top-auto left-auto right-auto translate-y-0 translate-x-0" />
                    </div>
                  </div>
                  {/* Content second on mobile, first on desktop */}
                  <Card className="bg-transparent shadow-none border-none space-y-4 md:space-y-10 mt-2 md:mt-0 order-2 md:order-1 px-1 md:px-0">
                    <CardHeader className="px-1 md:px-6 pb-2 md:pb-6">
                      <CardTitle>
                        <p className="text-xl md:text-3xl">{name}</p>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 md:space-y-5 px-1 md:px-6">
                      <Dialog>
                        <DialogTrigger asChild>
                          <CardDescription className="text-sm md:text-lg cursor-pointer">
                            {shortDescription}
                          </CardDescription>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{name}</DialogTitle>
                          </DialogHeader>
                          <DialogDescription>
                            {description}
                          </DialogDescription>
                        </DialogContent>
                      </Dialog>
                      <div className="flex flex-row items-center gap-1 md:gap-2">
                        <span className="text-xs md:text-base">Tech Stack:</span>
                        <div className="flex flex-row space-x-1 md:space-x-2 bg-muted/50 p-1.5 md:p-4 rounded-xl md:rounded-2xl overflow-x-auto">
                          {proyect.skills.map((skill, i) => {
                            const techData = getTechStack(skill);
                            return techData ? (
                              <TechIcon
                                key={i}
                                icon={techData.icon}
                                name={techData.name}
                                url={techData.url}
                              />
                            ) : (
                              <span key={i} className="px-2 py-1 bg-muted rounded">{skill}</span>
                            );
                          })}
                        </div>
                      </div>
                      <hr className="text-xl md:text-2xl bg-white" />
                      <div className="flex flex-row align-middle items-center justify-start space-x-2 md:space-x-5 mt-1 md:mt-2">
                        <p className="text-lg md:text-2xl">Links</p>
                        <Button>
                          <a
                            href={proyect.project_link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ArrowUpRightFromCircleIcon />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
