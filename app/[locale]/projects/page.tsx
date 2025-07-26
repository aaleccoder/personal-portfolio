import { Proyects } from "@/components/Proyects";

async function fetchProyects() {
  try {
    const response = await fetch(`${process.env.URL}/api/proyects`, {
      method: "GET",
      cache: "no-store"
    });
    const data = await response.json();
    if (
      data &&
      data.projectsResponseToClient &&
      Array.isArray(data.projectsResponseToClient) &&
      data.projectsResponseToClient.length > 0
    ) {
      return data.projectsResponseToClient;
    } else {
      return [];
    }
  } catch (err) {
    console.error("Proyects fetch error:", err);
    return [];
  }
}

export default async function ProyectsPage() {
  const proyects = await fetchProyects();
  return (
    <Proyects proyects={proyects} />
  )
}