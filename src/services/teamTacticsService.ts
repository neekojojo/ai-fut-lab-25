
// This file is maintained for backwards compatibility
// It re-exports everything from the refactored module
import teamTactics, { 
  ExtendedPlayerStats, 
  SaudiLeagueTeam, 
  TeamCompatibilityResult,
  analyzeTeamCompatibility,
  getSaudiLeagueTeams
} from './teamTactics';

export {
  analyzeTeamCompatibility,
  getSaudiLeagueTeams
};

export type {
  ExtendedPlayerStats,
  SaudiLeagueTeam,
  TeamCompatibilityResult
};

export default teamTactics;
