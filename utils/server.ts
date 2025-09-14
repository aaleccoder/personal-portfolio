import pocketbaseEnv from '@/utils/pocketbase.env';
import PocketBase from 'pocketbase';

const pb = new PocketBase(pocketbaseEnv.pocketbase.url);

// Admin authentication for server-side operations
const authenticateAdmin = async () => {
  try {
    const email = process.env.POCKETBASE_USER;
    const password = process.env.POCKETBASE_PASSWORD;
    
    if (!email || !password) {
      console.warn('PocketBase admin credentials not found in environment variables');
      return false;
    }

    await pb.admins.authWithPassword(email, password);
    console.log('PocketBase admin authenticated successfully');
    return true;
  } catch (error) {
    console.error('Failed to authenticate PocketBase admin:', error);
    return false;
  }
};

// Initialize admin authentication
authenticateAdmin();

export default pb;