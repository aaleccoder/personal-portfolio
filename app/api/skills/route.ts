import appwriteEnv from "@/utils/appwrite.env";
import client from "@/utils/supabase/appwrite/server";
import { Databases } from "node-appwrite";

export async function GET() {
  const database = new Databases(client);
  const skills = await database.listDocuments(
    appwriteEnv.appwrite.databaseId,
    appwriteEnv.appwrite.collections.skills,
  );
  return new Response(JSON.stringify(skills), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
