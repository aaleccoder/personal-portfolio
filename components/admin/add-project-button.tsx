
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FormProvider, useForm } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";



// --- Types ---
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  project_link: z.string().url("URL must be a valid URL"),
  image: z.string().url("Image must be a valid URL"),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  id: z.string().optional(),
});

type ProjectFormData = z.infer<typeof formSchema>;
type Project = ProjectFormData;

import { PropsWithChildren } from "react";

export const ProjectFormDialog = ({
  project,
  onSubmit,
  mode = "add",
  children
}: PropsWithChildren<{
  project?: Project;
  onSubmit?: (data: ProjectFormData) => Promise<void>;
  mode?: "add" | "edit";
}>) => {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: project || {
      name: "",
      description: "",
      project_link: "",
      image: "",
      skills: []
    }
  });

  const [skillInput, setSkillInput] = useState("");

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    if (onSubmit) {
      await onSubmit(data);
      return;
    }
    const response = await fetch("/api/proyects" + (mode === "edit" && project?.id ? `/${project.id}` : ""), {
      method: mode === "edit" ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      toast.success(`Project ${mode === "edit" ? "updated" : "added"} successfully!`);
      form.reset();
    } else {
      const errorData = await response.json();
      toast.error(`Error ${mode === "edit" ? "updating" : "adding"} project: ${errorData.message}`);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="overflow-y-auto max-h-[90vh]">
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-3xl">{mode === "edit" ? "Edit project" : "Add a new project"}</DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Update the details of the project."
              : "Please enter the details of the new project you want to add."}
          </DialogDescription>
          <FormProvider {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Project Name" className="border-accent focus:bg-primary/30 w-full" {...field} />
                  </FormControl>
                  <FormDescription className="/70">
                    Enter the name of the project.
                  </FormDescription>
                </FormItem>
              )} />
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Description</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Project Description" className="border-accent focus:bg-primary/30 w-full" {...field} />
                  </FormControl>
                  <FormDescription className="/70">
                    Enter a short description of the project.
                  </FormDescription>
                </FormItem>
              )} />
              <FormField control={form.control} name="project_link" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Project Link</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://yourproject.com" className="border-accent focus:bg-primary/30 w-full" {...field} />
                  </FormControl>
                  <FormDescription className="/70">
                    Enter the URL of the project.
                  </FormDescription>
                </FormItem>
              )} />
              <FormField control={form.control} name="image" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Image URL</FormLabel>
                  <FormControl>
                    <Input type="url" placeholder="https://yourimage.com/image.png" className="border-accent focus:bg-primary/30 w-full" {...field} />
                  </FormControl>
                  <FormDescription className="/70">
                    Enter the URL of the project image.
                  </FormDescription>
                </FormItem>
              )} />
              <FormField control={form.control} name="skills" render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="font-bold">Skills</FormLabel>
                    <FormControl>
                      <div>
                        <div className="flex gap-2">
                          <Input
                            type="text"
                            placeholder="Add a skill and press Enter or +"
                            className="border-accent focus:bg-primary/30 w-full"
                            value={skillInput}
                            onChange={e => setSkillInput(e.target.value)}
                            onKeyDown={e => {
                              if ((e.key === "Enter" || e.key === "," || e.key === "+") && skillInput.trim()) {
                                e.preventDefault();
                                if (!field.value.includes(skillInput.trim())) {
                                  field.onChange([...field.value, skillInput.trim()]);
                                }
                                setSkillInput("");
                              }
                            }}
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                              if (skillInput.trim() && !field.value.includes(skillInput.trim())) {
                                field.onChange([...field.value, skillInput.trim()]);
                                setSkillInput("");
                              }
                            }}
                          >+
                          </Button>
                        </div>
                        {/* Display added skills as chips */}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {field.value.map((skill: string, idx: number) => (
                            <span key={skill + idx} className="flex items-center bg-primary/20 px-2 py-1 rounded text-sm">
                              {skill}
                              <button
                                type="button"
                                className="ml-1 text-red-500 hover:text-red-700"
                                onClick={() => {
                                  const newSkills = field.value.filter((s: string, i: number) => i !== idx);
                                  field.onChange(newSkills);
                                }}
                                aria-label={`Remove ${skill}`}
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription className="/70">
                      Enter the skills required for this project. Add each skill and press Enter or the + button. Click × to remove.
                    </FormDescription>
                  </FormItem>
                );
              }} />
              <Button type="submit">{mode === "edit" ? "Update Project" : "Add Project"}</Button>
            </form>
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

// Backward compatible AddProjectButton
export const AddProjectButton = () => {
  return (
    <ProjectFormDialog mode="add">
      <button className="flex flex-row items-center rounded bg-primary p-2">
        <Plus /> <p>Add Project</p>
      </button>
    </ProjectFormDialog>
  );
};
