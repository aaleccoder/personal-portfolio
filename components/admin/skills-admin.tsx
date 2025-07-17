"use client";
import { Edit, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import AddSkillButton from "./add-skill-button";
import { toast } from "sonner";


type Skill = {
  $id: string;
  name: string;
  icon: string;
};

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const fetchSkills = async () => {
      const response = await fetch("/api/skills", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSkills(data);
    }

    fetchSkills();
  }, [])

  const handleDeleteSkill = async (skillId: string) => {
    const response = await fetch(`/api/skills/${skillId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      toast("Skill deleted successfully!", {
        description: `Skill with ID ${skillId} has been removed.`,
      });
      setSkills(skills.filter(skill => skill.$id !== skillId));
    }
  };

  return (
    <section className="flex flex-col items-center justify-center mx-auto w-full">
      <div className="flex flex-row justify-between items-center w-full max-w-6xl px-4 py-6">
        <h1 className="text-3xl">Skills Admin</h1>
        <AddSkillButton />
      </div>
      <div className="flex justify-center mx-auto min-w-full">
        <Table className="min-w-full mt-4 table-fixed">
          <TableHeader className="">
            <TableRow className="items-center justify-center text-center bg-muted">
              <TableHead className="px-4 py-2 text-center">Icon</TableHead>
              <TableHead className="px-4 py-2 text-center">Name</TableHead>
              <TableHead className="px-4 py-2 text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((skill) => (
              <TableRow key={skill.$id} className="mx-auto">
                <TableCell className="px-4 py-2 td_skills">
                  <Image width={32} height={32} src={skill.icon} alt={skill.name} className="justify-center mx-auto" />
                </TableCell>
                <TableCell className="px-4 py-2 td_skills">{skill.name}</TableCell>
                <TableCell className="flex gap-2 px-4 py-2 td_skills mx-auto">
                  <Button variant="secondary" className="cursor-pointer" ><Edit /></Button>
                  <Button variant="destructive" className="cursor-pointer" onClick={() => handleDeleteSkill(skill.$id)}><Trash /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
