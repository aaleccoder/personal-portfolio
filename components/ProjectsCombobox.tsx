"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Project } from "@/app/api/proyects/route"
import { CarouselApi } from "@/components/ui/carousel"
import { Models } from "node-appwrite"

export function ProjectsCombobox({ projects, api, locale }: { projects: Project[], api: CarouselApi | undefined, locale: string }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")


  const getProjectTranslation = (project: Project) => {
    const translation = project.translations?.find((t: Models.Document) => t.lang === locale);
    return {
      name: translation?.name || project.translations?.[0]?.name || "",
      description: translation?.description || project.translations?.[0]?.description || ""
    };
  }

  React.useEffect(() => {
    if (!api) {
      return
    }

    const onSelect = () => {
      const selectedProject = projects[api.selectedScrollSnap()]
      if (selectedProject) {
        setValue(getProjectTranslation(selectedProject).name)
      }
    }

    onSelect()
    api.on("select", onSelect)

    return () => {
      api.off("select", onSelect)
    }
  }, [api, projects, locale])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value || "Select project..."}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[40vh] p-0">
        <Command>
          <CommandInput placeholder="Search project..." />
          <CommandList>
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup>
              {projects.map((project, index) => {
                const { name, description } = getProjectTranslation(project);
                return (
                  <CommandItem
                    key={project.$id}
                    value={name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                      api?.scrollTo(index)
                    }}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    <div className="text-center">
                      <p>{name}</p>
                      <p className="text-sm text-muted-foreground">{description.slice(0, 50)}...</p>
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}