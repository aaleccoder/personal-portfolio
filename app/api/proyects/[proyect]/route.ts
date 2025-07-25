import appwriteEnv from "@/utils/appwrite.env";
import client from "@/utils/supabase/appwrite/server";
import { Databases } from "node-appwrite";



export default async function PUT(req: Request, { params }: { params: { proyect: string } }) {
  try {
    const body = await req.json();
    const { proyect } = await params;
    console.log(proyect);
    console.log(body);
    const { name, description, project_link, image, skills } = body;
    const updatedProyect = {
      name,
      description,
      project_link,
      image,
      skills,
    };

    const database = new Databases(client);
    const response = await database.updateDocument(
      appwriteEnv.appwrite.databaseId,
      appwriteEnv.appwrite.collections.proyects,
      proyect,
      updatedProyect
    );

    return new Response(JSON.stringify(response), {
      status: 204,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}