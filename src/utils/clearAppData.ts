
import { supabase } from '@/integrations/supabase/client';

/**
 * Clears all application data from localStorage and logs out the user
 * @returns Promise that resolves when all operations are complete
 */
export const clearAllAppData = async (): Promise<void> => {
  try {
    // Clear localStorage
    const preserveKeys = ['vite-ui-theme']; // Keys to preserve if needed
    Object.keys(localStorage).forEach(key => {
      if (!preserveKeys.includes(key)) {
        localStorage.removeItem(key);
      }
    });
    
    // Log out user if signed in
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }

    console.log('All application data cleared successfully');
  } catch (error) {
    console.error('Error clearing application data:', error);
    throw error;
  }
}
