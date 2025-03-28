
import { supabase } from '@/integrations/supabase/client';
import { 
  ExtendedPlayerStats, 
  SaudiLeagueTeam, 
  TeamCompatibilityResult 
} from './types';
import { 
  saudiLeagueTeams, 
  getSaudiLeagueTeams as getTeams 
} from './saudiLeagueData';
import { 
  calculatePositionFit, 
  generateRoleDescription 
} from './positionData';
import { 
  calculateTacticalFit, 
  determineStrengthsMatch 
} from './similarityUtils';

// Re-export for convenience
export { getTeams as getSaudiLeagueTeams };

// Main compatibility analysis function
export const analyzeTeamCompatibility = async (
  playerStats: ExtendedPlayerStats,
  playerPosition: string,
  playerStrengths: string[]
): Promise<TeamCompatibilityResult[]> => {
  // In production, fetch teams from Supabase
  // const { data: teams, error } = await supabase.from('saudi_league_teams').select('*');
  // if (error) throw error;
  
  // For now, use the mock data
  const teams = saudiLeagueTeams;
  
  // Calculate compatibility scores
  const results: TeamCompatibilityResult[] = teams.map(team => {
    // Calculate position fit (how much the team needs a player in this position)
    const positionFit = calculatePositionFit(playerPosition, team);
    
    // Calculate tactical fit (how well player attributes match team tactics)
    const tacticalFit = calculateTacticalFit(playerStats, team);
    
    // Determine strengths match (how player strengths address team weaknesses)
    const strengthsMatch = determineStrengthsMatch(playerStrengths, team.weaknesses);
    
    // Generate role description
    const roleDescription = generateRoleDescription(playerPosition, team);
    
    // Calculate overall compatibility score
    // 40% position fit, 40% tactical fit, 20% strengths match
    const strengthsMatchScore = Math.min(strengthsMatch.length * 10, 100);
    const compatibilityScore = Math.round(
      (positionFit * 0.4) + 
      (tacticalFit * 0.4) + 
      (strengthsMatchScore * 0.2)
    );
    
    return {
      team,
      compatibilityScore,
      strengthsMatch,
      roleDescription,
      positionFit,
      tacticalFit
    };
  });
  
  // Sort by compatibility score (descending)
  return results.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
};
