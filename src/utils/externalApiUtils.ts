
import { apiProxyService } from '@/services/apiProxyService';

/**
 * Utility functions for integrating with external APIs
 */
export const externalApiUtils = {
  /**
   * Fetch player market value from Transfermarkt API
   * @param playerName The player's name to look up
   */
  fetchPlayerMarketValue: async (playerName: string): Promise<{
    value: string;
    currency: string;
    lastUpdated: string;
  }> => {
    try {
      const data = await apiProxyService.callTransferMarketApi('players/search', { name: playerName });
      
      // Process and return the result
      if (data && data.length > 0) {
        return {
          value: data[0].marketValue || 'Unknown',
          currency: data[0].marketValueCurrency || 'EUR',
          lastUpdated: data[0].updatedAt || new Date().toISOString(),
        };
      }
      
      return {
        value: 'Unknown',
        currency: 'EUR',
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Error fetching player market value:', error);
      // Return default values when API is unavailable
      return {
        value: 'Unavailable',
        currency: 'EUR',
        lastUpdated: new Date().toISOString(),
      };
    }
  },
  
  /**
   * Fetch player statistics from FIFA API
   * @param playerName The player's name to look up
   */
  fetchPlayerStats: async (playerName: string): Promise<{
    matches: number;
    goals: number;
    assists: number;
    successfulPasses: number;
    ranking: number;
  }> => {
    try {
      const data = await apiProxyService.callOptaApi('players', { name: playerName });
      
      // Process and return the result
      if (data && data.player) {
        return {
          matches: data.player.matches || 0,
          goals: data.player.goals || 0,
          assists: data.player.assists || 0,
          successfulPasses: data.player.successfulPasses || 0,
          ranking: data.player.ranking || 0,
        };
      }
      
      return {
        matches: 0,
        goals: 0,
        assists: 0,
        successfulPasses: 0,
        ranking: 0,
      };
    } catch (error) {
      console.error('Error fetching player statistics:', error);
      // Return default values when API is unavailable
      return {
        matches: 0,
        goals: 0,
        assists: 0,
        successfulPasses: 0,
        ranking: 0,
      };
    }
  },
  
  /**
   * Cache management utilities
   */
  cache: {
    /**
     * Store data in local cache with expiry time
     */
    store: (key: string, data: any, expiryMinutes: number = 60): void => {
      const item = {
        data,
        expiry: Date.now() + (expiryMinutes * 60 * 1000),
      };
      localStorage.setItem(`cache_${key}`, JSON.stringify(item));
    },
    
    /**
     * Retrieve data from cache if not expired
     */
    get: (key: string): any | null => {
      const itemStr = localStorage.getItem(`cache_${key}`);
      if (!itemStr) return null;
      
      try {
        const item = JSON.parse(itemStr);
        if (Date.now() > item.expiry) {
          localStorage.removeItem(`cache_${key}`);
          return null;
        }
        return item.data;
      } catch (e) {
        localStorage.removeItem(`cache_${key}`);
        return null;
      }
    },
    
    /**
     * Get data with automatic refresh if expired
     */
    getOrFetch: async (key: string, fetchFn: () => Promise<any>, expiryMinutes: number = 60): Promise<any> => {
      const cachedData = externalApiUtils.cache.get(key);
      if (cachedData) return cachedData;
      
      const freshData = await fetchFn();
      externalApiUtils.cache.store(key, freshData, expiryMinutes);
      return freshData;
    }
  },
  
  /**
   * Performance utilities
   */
  performance: {
    /**
     * Use WebGL acceleration for processing if available
     */
    isWebGLAvailable: (): boolean => {
      try {
        const canvas = document.createElement('canvas');
        return !!(window.WebGLRenderingContext && 
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
      } catch (e) {
        return false;
      }
    },
    
    /**
     * Measure execution time of a function
     */
    measureExecutionTime: async <T>(fn: () => Promise<T>): Promise<{ result: T, timeMs: number }> => {
      const start = performance.now();
      const result = await fn();
      const timeMs = performance.now() - start;
      return { result, timeMs };
    }
  }
};
