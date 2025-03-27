
import { supabase } from '@/integrations/supabase/client';

/**
 * Service to proxy API calls through Supabase Edge Functions to protect API keys
 */
export const apiProxyService = {
  /**
   * Call the FIFA/Opta API proxy edge function
   * @param endpoint The specific endpoint to call
   * @param params Optional parameters for the API call
   */
  callOptaApi: async (endpoint: string, params?: Record<string, any>) => {
    try {
      const { data, error } = await supabase.functions.invoke('opta-fifa-api', {
        body: { endpoint, params }
      });
      
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      console.error('Error calling Opta/FIFA API:', error);
      throw error;
    }
  },
  
  /**
   * Call the Transfer Market API proxy edge function
   * @param endpoint The specific endpoint to call
   * @param params Optional parameters for the API call
   */
  callTransferMarketApi: async (endpoint: string, params?: Record<string, any>) => {
    try {
      const { data, error } = await supabase.functions.invoke('transfer-market-api', {
        body: { endpoint, params }
      });
      
      if (error) throw new Error(error.message);
      return data;
    } catch (error) {
      console.error('Error calling Transfer Market API:', error);
      throw error;
    }
  }
};
