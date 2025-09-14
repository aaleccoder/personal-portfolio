import ContentWrapper from "@/components/ContentWrapper";
import { Proyects } from "@/components/Proyects";
import { fetchProjects } from "@/lib/data";

export default async function ProyectsPage() {
  const { projects } = await fetchProjects();
  return (
    <main suppressHydrationWarning>
      <ContentWrapper>
        <Proyects proyects={projects} />
      </ContentWrapper>
    </main>
  )
}