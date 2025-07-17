import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

import * as z from "zod";
import { Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  icon: z.string().url("Icon must be a valid URL"),
})

export default function AddSkillButton() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      icon: "",
    }
  })

  const handleCreateSkillForm = async (data: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      toast.success("Skill added successfully!");
      form.reset();
    } else {
      const errorData = await response.json();
      toast.error(`Error adding skill: ${errorData.message}`);
    }
  }

  return (
    <Dialog>
      <DialogTrigger className="flex flex-row items-center rounded bg-primary p-2"><Plus /> <p>Add Skill</p></DialogTrigger>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogTitle className="text-3xl">Add a new skill</DialogTitle>
          <DialogDescription>
            Please enter the details of the new skill you want to add.
          </DialogDescription>
          <FormProvider {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(handleCreateSkillForm)}>
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Name</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Skill Name" className="border-accent focus:bg-primary/30  w-full" {...field} />
                  </FormControl>
                  <FormDescription className="/70">
                    Enter the name of the skill.
                  </FormDescription>
                </FormItem>
              )}>
              </FormField>
              <FormField control={form.control} name="icon" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Icon</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Icon URL" className="border-accent focus:bg-primary/30 w-full" {...field} />
                  </FormControl>
                  <FormDescription className="/70">
                    Enter the URL of the skill icon.
                  </FormDescription>
                </FormItem>
              )}>
              </FormField>
              <Button type="submit">Add Skill</Button>

            </form>
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
