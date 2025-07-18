import { ExternalLinkIcon } from "lucide-react"
import { div } from "motion/react-client"
import Link from "next/dist/client/link"
import Image from "next/image"



export const ProyectsLandPage = () => {

  const Proyects = [
    {
      name: "Proyect 1",
      description: "This is the description for Proyect 1",
      image: "https://placehold.co/600x400",
      link: "https://example.com/proyect1",
      techStack: ["React", "TypeScript", "TailwindCSS"]
    },
    {
      name: "Proyect 2",
      description: "This is the description for Proyect 2",
      image: "https://placehold.co/600x400",
      link: "https://example.com/proyect2",
      techStack: ["React", "TypeScript", "TailwindCSS"]
    }
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-xl text-center text-muted-foreground md:hidden">Proyects</h2>
      <div className="flex flex-col gap-4">
        {Proyects.map((proyect, index) => (
          <div key={index} className="cursor-pointer border rounded-lg p-4 hover:shadow-lg transition-all duration-300 hover:scale-105 flex gap-4">
            <div className="flex-shrink-0">
              <a href={proyect.link} target="_blank" rel="noopener noreferrer">
                <Image
                  src={proyect.image}
                  alt={proyect.name}
                  className="w-32 h-32 object-cover rounded"
                  width={128}
                  height={128}
                />
              </a>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-2">{proyect.name}</h3>
              <p className="text-muted-foreground mb-2">{proyect.description}</p>
              <div className="flex flex-wrap gap-1">
                {proyect.techStack?.map((tech, techIndex) => (
                  <span key={techIndex} className="px-2 py-1 bg-secondary/30  text-foreground rounded-xl text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <Link href="/projects" className="text-foreground hover:underline flex flex-row space-x-2 hover:scale-105 transition-all duration-300"><p>View Projects</p><ExternalLinkIcon /></Link>
      </div>
    </div>
  )
}