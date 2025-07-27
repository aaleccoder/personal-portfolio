import ContentWrapper from "@/components/ContentWrapper";
import { Proyects } from "@/components/Proyects";

const fetchProjects = async () => {
  try {
    const response = await fetch(`${process.env.URL}/api/proyects`)
    const data = await response.json();
    return data.projectsResponseToClient;

  } catch (error) {
    console.error(error);
    return [];
  }
}




export default async function ProyectsPage() {

  const projects = await fetchProjects();
  console.log(projects);
  return (
    <main>
      <ContentWrapper>
        <Proyects proyects={projects} />
      </ContentWrapper>
    </main>
  )
}