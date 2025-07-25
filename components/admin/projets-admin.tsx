"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Edit, Plus, Trash } from "lucide-react";
import { ProjectFormDialog } from "./add-project-button";

type Proyect = {
  $id: string;
  name: string;
  description: string;
  project_link: string;
  image: string;
  skills: string[];
};

export const ProjectsAdmin = () => {
  const [proyects, setProyects] = useState<Proyect[]>([]);

  useEffect(() => {
    const fetchProyects = async () => {
      const response = await fetch("/api/proyects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setProyects(Array.isArray(data) ? data : data.documents || []);
    };

    fetchProyects();
  }, []);

  return (
    <section className="flex flex-col p-5">
      <h1 className="text-2xl font-bold mb-4">Proyectos</h1>
      <div className="flex justify-end mb-4">
        <ProjectFormDialog>
          <button className="flex flex-row items-center rounded bg-primary p-2">
            <Plus /> <p>Add Project</p>
          </button>
        </ProjectFormDialog>
      </div>
      <div className="space-y-4 md:grid md:grid-cols-2 md:gap-4">
        {proyects.map((proyect) => (
          <Card
            key={proyect.$id}
            className="flex flex-col h-[75vh] max-h-[40rem] overflow-hidden"
          >
            <div className="flex-1 flex flex-col overflow-hidden">
              <CardHeader className="flex flex-col h-[7.5rem] overflow-hidden">
                <Image width={1920} height={1080} src={proyect.image} alt={proyect.name} className="w-64 h-[6.5rem] object-cover rounded-md" />
              </CardHeader>
              <CardContent className="flex-1 flex flex-col h-[8.5rem] overflow-auto">
                <CardTitle className="truncate text-lg md:text-xl font-bold" title={proyect.name}>{proyect.name}</CardTitle>
                <p className="text-sm break-words line-clamp-3 overflow-hidden">{proyect.description}</p>
              </CardContent>
            </div>
            <CardFooter className="flex flex-col space-y-3 justify-end items-end mt-auto h-[8rem] min-h-[7rem]">
              <a
                href={proyect.project_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline truncate self-start mb-1"
                title={proyect.project_link}
              >
                View Project
              </a>
              <div className="flex justify-start items-start gap-2 w-full flex-wrap max-h-[2.5rem] overflow-auto">
                {proyect.skills.map((skill) => (
                  <span key={skill} className="rounded-md bg-primary p-2 text-xs truncate max-w-[5rem]" title={skill}>
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex justify-end items-end w-full space-x-4">
                <ProjectFormDialog mode="edit" project={proyect}>
                  <Button variant="outline" className="">
                    <Edit />
                  </Button>
                </ProjectFormDialog>
                <Button variant="destructive" className="">
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
