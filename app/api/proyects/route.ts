import appwriteEnv from "@/utils/appwrite.env";
import client from "@/utils/supabase/appwrite/server";
import { NextRequest } from "next/server";
import { Databases, ID, Models, Query } from "node-appwrite";

export type Project = {
  $id: string;
  project_link: string;
  skills: string[];
  images: string[];
  translations: Models.Document[];
};

export async function GET() {
  try {
    const database = new Databases(client);

    // Fetch all projects
    const projectsResponse = await database
      .listDocuments(
        appwriteEnv.appwrite.databaseId,
        appwriteEnv.appwrite.collections.proyects,
      )
      .then((response) => response.documents);

    const projectsResponseToClient: Project[] = [];

    await Promise.all(
      projectsResponse.map(async (project) => {
        const newProject: Project = {
          $id: project.$id,
          project_link: project.project_link,
          skills: project.skills,
          images: project.images,
          translations: [],
        };

        const projectTranslation = await database
          .listDocuments(
            appwriteEnv.appwrite.databaseId,
            appwriteEnv.appwrite.collections.proyectsTranslations,
            [Query.equal("projects", project.$id)],
          )
          .then((response) => response.documents);

        newProject.translations = projectTranslation;

        projectsResponseToClient.push(newProject);
      }),
    );

    return new Response(
      JSON.stringify({
        projectsResponseToClient,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching projects with translations:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch projects" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
