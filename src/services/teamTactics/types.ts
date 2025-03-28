
// Extended PlayerStats interface to include all properties needed
export interface ExtendedPlayerStats {
  // Original PlayerStats properties
  avgSpeed: number;
  maxSpeed: number;
  avgAcceleration: number;
  distanceCovered: number;
  balanceScore: number;
  technicalScore: number;
  physicalScore: number;
  movementEfficiency: number;
  
  // Additional properties for analysis
  passing?: number;
  ballControl?: number;
  vision?: number;
  pace?: number;
  stamina?: number;
  physical?: number;
  positioning?: number;
  anticipation?: number;
  decision?: number;
}

// Interface for Saudi League team data
export interface SaudiLeagueTeam {
  id: string;
  name: string;
  logo: string;
  formation: string;
  playingStyle: string;
  strengths: string[];
  weaknesses: string[];
  positionNeeds: {
    [key: string]: number; // position: priority level (1-10)
  };
  tacticalProfile: {
    possession: number;
    pressing: number;
    counterAttack: number;
    buildUp: number;
    defensiveOrganization: number;
  };
}

// Interface for team compatibility result
export interface TeamCompatibilityResult {
  team: SaudiLeagueTeam;
  compatibilityScore: number;
  strengthsMatch: string[];
  roleDescription: string;
  positionFit: number;
  tacticalFit: number;
}

// Position mappings type
export type PositionMappings = {
  [key: string]: string[];
};
