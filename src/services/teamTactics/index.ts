
import { analyzeTeamCompatibility, getSaudiLeagueTeams } from './compatibilityAnalyzer';
import type { 
  ExtendedPlayerStats, 
  SaudiLeagueTeam, 
  TeamCompatibilityResult 
} from './types';

// Export everything
export {
  analyzeTeamCompatibility,
  getSaudiLeagueTeams
};

// Export all types
export type { 
  ExtendedPlayerStats, 
  SaudiLeagueTeam, 
  TeamCompatibilityResult 
};

// Default export for backward compatibility
export default {
  analyzeTeamCompatibility,
  getSaudiLeagueTeams: () => getSaudiLeagueTeams()
};
