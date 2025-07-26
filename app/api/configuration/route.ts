import appwriteEnv from "@/utils/appwrite.env";
import client from "@/utils/supabase/appwrite/server";
import { Databases } from "node-appwrite";

type SocialLinks = {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  website?: string;
};

type TranslationEntry = {
  aboutMe: string;
};

type Translations = {
  [langCode: string]: TranslationEntry; // e.g. 'en', 'es', 'fr-CA'
};

export type PortfolioProfile = {
  profileImage: string;
  socialLinks: SocialLinks;
  contact: {
    email?: string;
    phoneNumber?: string;
  };
  translations: Translations;
};

export async function GET() {
  try {
    const database = new Databases(client);
    const config = await database.getDocument(
      appwriteEnv.appwrite.databaseId,
      appwriteEnv.appwrite.config,
      appwriteEnv.appwrite.config_id,
    );

    return new Response(JSON.stringify({ config }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
    });
  }
}
