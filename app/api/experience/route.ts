import appwriteEnv from "@/utils/appwrite.env";
import client from "@/utils/supabase/appwrite/server";
import { Databases, Query, Models } from "node-appwrite";

type Experience = {
  $id: string;
  startdate: Date;
  role: string;
  enddate: Date;
  company: string;
  translations: Models.Document[];
  skills: string[];
};

export async function GET() {
  const database = new Databases(client);

  const experiencesResponse: Experience[] = [];

  const experiences = await database
    .listDocuments(
      appwriteEnv.appwrite.databaseId,
      appwriteEnv.appwrite.collections.experiences,
    )
    .then((response) => response.documents);

  await Promise.all(
    experiences.map(async (experience) => {
      const newExperience: Experience = {
        $id: experience.$id,
        role: experience.role,
        startdate: new Date(experience.startdate),
        enddate: new Date(experience.enddate),
        company: experience.company,
        translations: [],
        skills: experience.skills,
      };

      const experienceTranslation = await database
        .listDocuments(
          appwriteEnv.appwrite.databaseId,
          appwriteEnv.appwrite.collections.experienceTranslations,
          [Query.equal("experience", experience.$id)],
        )
        .then((response) => response.documents);

      newExperience.translations = experienceTranslation;

      experiencesResponse.push(newExperience);
    }),
  );

  console.log(experiencesResponse);

  return new Response(JSON.stringify(experiencesResponse), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
