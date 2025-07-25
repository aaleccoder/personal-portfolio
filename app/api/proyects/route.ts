import appwriteEnv from "@/utils/appwrite.env";
import client from "@/utils/supabase/appwrite/server";
import { data } from "motion/react-client";
import { NextRequest } from "next/server";
import { Databases, ID } from "node-appwrite";




export async function GET() {
  const database = new Databases(client);
  const proyects = await database.listDocuments(appwriteEnv.appwrite.databaseId, appwriteEnv.appwrite.collections.proyects);
  return new Response(JSON.stringify(proyects), {
    headers: {
      "Content-Type": "application/json"
    }
  });
}

export async function POST(request: NextRequest) {
  const database = new Databases(client);
  try {
    const body = await request.json();


    const response = await database.createDocument(appwriteEnv.appwrite.databaseId, appwriteEnv.appwrite.collections.proyects, ID.unique(), body);

    if (response) {
      return new Response(JSON.stringify(response), {
        status: 201,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  } catch (error) {
    console.error("Error creating document:", error);
    return new Response(JSON.stringify({ error: "Failed to create document" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}