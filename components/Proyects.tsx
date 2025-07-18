import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRightFromCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import { TechIcon } from "./ui/tech-icon";
import { getTechStack } from "@/lib/tech-stack";

export const Proyects = () => {
  const Proyects = [
    {
      number: "01",
      title: "Proyect 1",
      description: "Description of proyect 1",
      techStack: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"
      ],
      link: "https://example.com/proyect1",
      image: "https://placehold.co/600x400/png"
    },
    {
      number: "02",
      title: "Proyect 2",
      description: "Description of proyect 2",
      techStack: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"
      ],
      link: "https://example.com/proyect2",
      image: "https://placehold.co/600x400/png"
    },
    {
      number: "03",
      title: "Proyect 3",
      description: "Description of proyect 3",
      techStack: [
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
      ],
      link: "https://example.com/proyect3",
      image: "https://placehold.co/600x400/png"
    },
  ]
  const t = useTranslations('Proyects');

  return (
    <section className="w-full px-1 py-2 md:px-4 md:py-8">
      <Carousel className="w-full max-w-full cursor-pointer">
        <CarouselContent className="ml-0">
          {Proyects.map((proyect, index) => (
            <CarouselItem key={index} className="pl-1 md:pl-4">
              <div className="flex flex-col md:grid md:grid-cols-3 md:space-x-6 text-left space-y-2 md:space-y-0">
                <div className="space-y-2 relative flex flex-col items-center justify-center md:col-span-2 order-2 md:space-y-8">
                  <div className="relative w-full flex items-center justify-center px-6 md:px-0">
                    <CarouselPrevious className="md:hidden absolute left-1 z-10 bg-background/80 hover:bg-background w-8 h-8" />
                    <Image src={proyect.image} width={1024} height={512} alt="proyect image" className="rounded-xl w-full h-auto max-w-full" />
                    <CarouselNext className="md:hidden absolute right-1 z-10 bg-background/80 hover:bg-background w-8 h-8" />
                  </div>
                  <div className="hidden md:flex justify-end items-center gap-2 mt-4">
                    <CarouselPrevious className="relative top-auto left-auto right-auto translate-y-0 translate-x-0" />
                    <CarouselNext className="relative top-auto left-auto right-auto translate-y-0 translate-x-0" />
                  </div>
                </div>
                <Card className="bg-transparent shadow-none border-none space-y-4 md:space-y-10 mt-2 md:mt-0 order-1 px-1 md:px-0">
                  <CardHeader className="px-1 md:px-6 pb-2 md:pb-6">
                    <p className="text-xs md:text-base">Tech Stack:</p>
                    <p className="font-bebas-neue text-4xl md:text-7xl">{proyect.number}</p>
                    <CardTitle>
                      <p className="text-xl md:text-3xl">{proyect.title}</p>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 md:space-y-5 px-1 md:px-6">
                    <CardDescription className="text-sm md:text-lg">
                      {proyect.description}
                    </CardDescription>
                    <div className="flex flex-row items-center gap-1 md:gap-2">
                      <div className="flex flex-row space-x-1 md:space-x-2 bg-muted/50 p-1.5 md:p-4 rounded-xl md:rounded-2xl overflow-x-auto">
                        {proyect.techStack.map((icon, i) => {
                          const techData = getTechStack(icon);
                          return techData ? (
                            <TechIcon
                              key={i}
                              icon={techData.icon}
                              name={techData.name}
                              url={techData.url}
                            />
                          ) : (
                            <Image key={i} src={icon} alt="tech" width={20} height={20} className="w-5 h-5 md:w-7 md:h-7 flex-shrink-0" />
                          );
                        })}
                      </div>
                    </div>
                    <hr className="text-xl md:text-2xl bg-white" />
                    <div className="flex flex-row align-middle items-center justify-start space-x-2 md:space-x-5 mt-1 md:mt-2">
                      <p className="text-lg md:text-2xl">Links</p>
                      <Button>
                        <a href={proyect.link} target="_blank" rel="noopener noreferrer">
                          <ArrowUpRightFromCircleIcon />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}