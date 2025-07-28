import appwriteEnv from '@/utils/appwrite.env';
import { Client, Databases, Account } from 'node-appwrite';

const client = new Client();

client
  .setEndpoint(appwriteEnv.appwrite.endpoint)
  .setProject(appwriteEnv.appwrite.projectId)
  .setKey(appwriteEnv.appwrite.apiKey);

export default client;