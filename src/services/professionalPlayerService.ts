
import { apiProxyService } from './apiProxyService';
import { PlayerComparison } from '@/utils/ml/playerMLService';
import { toast } from '@/components/ui/use-toast';

export interface ProfessionalPlayer {
  id: string;
  name: string;
  position: string;
  team: string;
  league: string;
  nationality: string;
  marketValue: string;
  age: number;
  stats: {
    [key: string]: number;
  };
  imageUrl?: string;
}

export const professionalPlayerService = {
  /**
   * Search for professional players
   * @param query The search query (player name)
   */
  searchPlayers: async (query: string): Promise<ProfessionalPlayer[]> => {
    try {
      // Try to get from Transfer Market API first
      const data = await apiProxyService.callTransferMarketApi('players/search', { query });
      return transformTransferMarketData(data);
    } catch (error) {
      console.error('Error searching for players:', error);
      // Fallback to FIFA/Opta API if Transfer Market fails
      try {
        const data = await apiProxyService.callOptaApi('players/search', { name: query });
        return transformOptaData(data);
      } catch (fallbackError) {
        console.error('Both APIs failed for player search:', fallbackError);
        toast({
          title: "Search Failed",
          description: "Could not fetch professional player data",
          variant: "destructive",
        });
        return [];
      }
    }
  },
  
  /**
   * Get detailed information about a player
   * @param playerId The ID of the player
   * @param source The source API (transfer-market or opta-fifa)
   */
  getPlayerDetails: async (playerId: string, source: 'transfer-market' | 'opta-fifa'): Promise<ProfessionalPlayer | null> => {
    try {
      if (source === 'transfer-market') {
        const data = await apiProxyService.callTransferMarketApi('players/details', { id: playerId });
        const players = transformTransferMarketData([data]);
        return players[0] || null;
      } else {
        const data = await apiProxyService.callOptaApi('players/details', { id: playerId });
        const players = transformOptaData([data]);
        return players[0] || null;
      }
    } catch (error) {
      console.error(`Error getting player details from ${source}:`, error);
      toast({
        title: "Failed to Load",
        description: "Could not fetch player details",
        variant: "destructive",
      });
      return null;
    }
  },
  
  /**
   * Get similar professional players to compare with the user's analysis
   * @param attributes The attributes to match (speed, technical, etc.)
   * @param position Optional position filter
   */
  getSimilarPlayers: async (
    attributes: Record<string, number>,
    position?: string
  ): Promise<PlayerComparison | null> => {
    try {
      // This would be a more advanced API call that uses machine learning on the server
      // For now, we'll use a simplified approach
      const players = await apiProxyService.callTransferMarketApi('players/similar', { 
        attributes,
        position
      });
      
      // If there's no data or the API call failed, return null
      if (!players || !Array.isArray(players)) return null;
      
      // Transform the data into the format expected by our application
      const transformedPlayers = transformTransferMarketData(players);
      
      // Map to the PlayerComparison format
      const playerComparison: PlayerComparison = {
        similarProfessionals: transformedPlayers.map(player => ({
          name: player.name,
          team: player.team,
          position: player.position.toLowerCase(),
          similarity: Math.round(Math.random() * 30) + 70, // Mock similarity score between 70-100
          strengths: Object.entries(player.stats)
            .filter(([_, value]) => value > 85)
            .map(([key]) => key.charAt(0).toUpperCase() + key.slice(1))
            .slice(0, 3) // Take the top 3 strengths
        })),
        similarityMetrics: [
          {
            category: "Speed & Acceleration",
            score: Math.round(attributes.speed || attributes.maxSpeed || 75),
            description: `Your explosive speed matches professional standards.`
          },
          {
            category: "Technical Ability",
            score: Math.round(attributes.technical || 70),
            description: `Your technical skills are developing well.`
          },
          {
            category: "Physical Attributes",
            score: Math.round(attributes.physical || 80),
            description: `Physically, you're comparable to professionals in your position.`
          },
          {
            category: "Movement Efficiency",
            score: Math.round(attributes.efficiency || attributes.movementEfficiency || 65),
            description: `Your movement efficiency is approaching professional standards.`
          },
          {
            category: "Decision Making",
            score: Math.round(attributes.mental || 60),
            description: `Work on tactical awareness to improve decision making.`
          }
        ]
      };
      
      return playerComparison;
    } catch (error) {
      console.error('Error getting similar players:', error);
      toast({
        title: "Comparison Failed",
        description: "Unable to compare with professional players",
        variant: "destructive",
      });
      return null;
    }
  }
};

// Helper functions to transform API data
function transformTransferMarketData(data: any[]): ProfessionalPlayer[] {
  // In a real implementation, this would properly map the Transfer Market API response
  return data.map(player => ({
    id: player.id || String(Math.random()),
    name: player.name || 'Unknown Player',
    position: player.position || 'Unknown',
    team: player.team || player.club || 'Unknown Team',
    league: player.league || 'Unknown League',
    nationality: player.nationality || 'Unknown',
    marketValue: player.marketValue || player.value || '€0',
    age: player.age || 0,
    stats: player.stats || {
      pace: Math.round(Math.random() * 20) + 80,
      shooting: Math.round(Math.random() * 20) + 80,
      passing: Math.round(Math.random() * 20) + 80,
      dribbling: Math.round(Math.random() * 20) + 80,
      defending: Math.round(Math.random() * 20) + 80,
      physical: Math.round(Math.random() * 20) + 80
    },
    imageUrl: player.imageUrl || `https://via.placeholder.com/150?text=${encodeURIComponent(player.name || 'Player')}`
  }));
}

function transformOptaData(data: any[]): ProfessionalPlayer[] {
  // In a real implementation, this would properly map the Opta/FIFA API response
  return data.map(player => ({
    id: player.id || String(Math.random()),
    name: player.name || player.fullName || 'Unknown Player',
    position: player.position || 'Unknown',
    team: player.team || player.club || 'Unknown Team',
    league: player.league || player.competition || 'Unknown League',
    nationality: player.nationality || player.country || 'Unknown',
    marketValue: player.marketValue || '€0',
    age: player.age || 0,
    stats: player.stats || player.attributes || {
      pace: Math.round(Math.random() * 20) + 80,
      shooting: Math.round(Math.random() * 20) + 80,
      passing: Math.round(Math.random() * 20) + 80,
      dribbling: Math.round(Math.random() * 20) + 80,
      defending: Math.round(Math.random() * 20) + 80,
      physical: Math.round(Math.random() * 20) + 80
    },
    imageUrl: player.imageUrl || player.image || `https://via.placeholder.com/150?text=${encodeURIComponent(player.name || 'Player')}`
  }));
}
