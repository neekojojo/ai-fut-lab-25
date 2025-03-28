
import { supabase } from '@/integrations/supabase/client';
import { PlayerStats } from '@/utils/dataProcessing/playerDataAnalysis';

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

// Mock data for Saudi League teams
const saudiLeagueTeams: SaudiLeagueTeam[] = [
  {
    id: "al-hilal",
    name: "Al-Hilal",
    logo: "https://placehold.co/100x100/png?text=Al-Hilal",
    formation: "4-2-3-1",
    playingStyle: "Possession-based, high press",
    strengths: ["Technical excellence", "Squad depth", "Organized defense"],
    weaknesses: ["Vulnerability to counter-attacks", "Dependency on star players"],
    positionNeeds: {
      "CF": 4,
      "CDM": 7,
      "CB": 5,
      "RB": 8
    },
    tacticalProfile: {
      possession: 85,
      pressing: 80,
      counterAttack: 60,
      buildUp: 90,
      defensiveOrganization: 75
    }
  },
  {
    id: "al-nassr",
    name: "Al-Nassr",
    logo: "https://placehold.co/100x100/png?text=Al-Nassr",
    formation: "4-3-3",
    playingStyle: "Direct attacking, high intensity",
    strengths: ["Attacking prowess", "Physicality", "Set pieces"],
    weaknesses: ["Defensive transitions", "Midfield control"],
    positionNeeds: {
      "CM": 9,
      "CB": 7,
      "LW": 5,
      "RB": 6
    },
    tacticalProfile: {
      possession: 70,
      pressing: 75,
      counterAttack: 85,
      buildUp: 65,
      defensiveOrganization: 60
    }
  },
  {
    id: "al-ahli",
    name: "Al-Ahli",
    logo: "https://placehold.co/100x100/png?text=Al-Ahli",
    formation: "4-4-2",
    playingStyle: "Counter-attacking, compact defense",
    strengths: ["Defensive solidity", "Fast transitions", "Wide play"],
    weaknesses: ["Creativity in midfield", "Breaking down deep blocks"],
    positionNeeds: {
      "AM": 9,
      "ST": 6,
      "LB": 7,
      "CM": 8
    },
    tacticalProfile: {
      possession: 55,
      pressing: 65,
      counterAttack: 90,
      buildUp: 60,
      defensiveOrganization: 80
    }
  },
  {
    id: "al-ittihad",
    name: "Al-Ittihad",
    logo: "https://placehold.co/100x100/png?text=Al-Ittihad",
    formation: "4-2-3-1",
    playingStyle: "Balanced, technical control",
    strengths: ["Technical quality", "Tactical flexibility", "Strong midfield"],
    weaknesses: ["Lack of pace at the back", "Finishing efficiency"],
    positionNeeds: {
      "ST": 9,
      "CB": 8,
      "RW": 7,
      "LB": 5
    },
    tacticalProfile: {
      possession: 75,
      pressing: 70,
      counterAttack: 65,
      buildUp: 80,
      defensiveOrganization: 70
    }
  },
  {
    id: "al-shabab",
    name: "Al-Shabab",
    logo: "https://placehold.co/100x100/png?text=Al-Shabab",
    formation: "3-5-2",
    playingStyle: "Wing play, solid structure",
    strengths: ["Wide overloads", "Set pieces", "Athletic prowess"],
    weaknesses: ["Central creativity", "Possession against top teams"],
    positionNeeds: {
      "CM": 9,
      "CB": 6,
      "CF": 8,
      "WB": 7
    },
    tacticalProfile: {
      possession: 60,
      pressing: 75,
      counterAttack: 80,
      buildUp: 65,
      defensiveOrganization: 75
    }
  }
];

// Map player position to compatible team positions
const positionMappings: { [key: string]: string[] } = {
  "Forward": ["ST", "CF", "LW", "RW"],
  "Striker": ["ST", "CF"],
  "Winger": ["LW", "RW"],
  "Attacking Midfielder": ["AM", "CAM"],
  "Midfielder": ["CM", "CDM", "AM"],
  "Central Midfielder": ["CM"],
  "Defensive Midfielder": ["CDM", "CM"],
  "Defender": ["CB", "LB", "RB", "WB"],
  "Center Back": ["CB"],
  "Full Back": ["LB", "RB", "WB"],
  "Goalkeeper": ["GK"]
};

// Calculate cosine similarity between two vectors
const calculateCosineSimilarity = (vectorA: number[], vectorB: number[]): number => {
  if (vectorA.length !== vectorB.length) {
    throw new Error("Vectors must have the same dimension");
  }
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    normA += vectorA[i] * vectorA[i];
    normB += vectorB[i] * vectorB[i];
  }
  
  if (normA === 0 || normB === 0) {
    return 0;
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
};

// Calculate position fit score
const calculatePositionFit = (playerPosition: string, team: SaudiLeagueTeam): number => {
  // Get team positions that match the player position
  const compatiblePositions = positionMappings[playerPosition] || [];
  
  if (compatiblePositions.length === 0) return 0;
  
  // Calculate average position need score for compatible positions
  let totalNeed = 0;
  let positionsCount = 0;
  
  for (const position of compatiblePositions) {
    if (team.positionNeeds[position]) {
      totalNeed += team.positionNeeds[position];
      positionsCount++;
    }
  }
  
  return positionsCount > 0 ? (totalNeed / positionsCount) * 10 : 0;
};

// Calculate tactical fit score based on player stats and team profile
const calculateTacticalFit = (playerStats: PlayerStats, team: SaudiLeagueTeam): number => {
  // Create player tactical vector
  const playerTacticalVector = [
    // Technical values
    playerStats.passing / 100 * 100,
    playerStats.ballControl / 100 * 100,
    playerStats.vision / 100 * 100,
    
    // Physical values
    playerStats.pace / 100 * 100,
    playerStats.stamina / 100 * 100,
    playerStats.physical / 100 * 100,
    
    // Tactical values
    playerStats.positioning / 100 * 100,
    playerStats.anticipation / 100 * 100,
    playerStats.decision / 100 * 100
  ];
  
  // Create team tactical vector that corresponds to player attributes
  const teamTacticalVector = [
    // Technical values that match with player attributes
    team.tacticalProfile.buildUp / 100 * 100,
    team.tacticalProfile.possession / 100 * 100,
    team.tacticalProfile.buildUp / 100 * 100,
    
    // Physical values that match with player attributes
    team.tacticalProfile.counterAttack / 100 * 100,
    team.tacticalProfile.pressing / 100 * 100,
    team.tacticalProfile.defensiveOrganization / 100 * 100,
    
    // Tactical values that match with player attributes
    team.tacticalProfile.defensiveOrganization / 100 * 100,
    team.tacticalProfile.pressing / 100 * 100,
    team.tacticalProfile.buildUp / 100 * 100
  ];
  
  // Calculate similarity
  return calculateCosineSimilarity(playerTacticalVector, teamTacticalVector) * 100;
};

// Determine strengths match
const determineStrengthsMatch = (playerStrengths: string[], teamWeaknesses: string[]): string[] => {
  // In a real implementation, this would use NLP for semantic matching
  // For now, use simple keyword matching
  const matches: string[] = [];
  
  const keywordMap: { [key: string]: string[] } = {
    "Technical": ["Creativity", "Technical quality", "Ball control", "Passing"],
    "Passing": ["Creativity in midfield", "Technical quality", "Midfield control"],
    "Speed": ["Pace", "Fast transitions", "Counter-attacking"],
    "Physical": ["Physicality", "Athletic", "Strength"],
    "Tactical": ["Tactical awareness", "Positioning", "Game intelligence"],
    "Finishing": ["Finishing efficiency", "Goal scoring", "Attacking prowess"]
  };
  
  for (const playerStrength of playerStrengths) {
    for (const teamWeakness of teamWeaknesses) {
      // Check for direct match
      if (teamWeakness.toLowerCase().includes(playerStrength.toLowerCase())) {
        matches.push(`Your ${playerStrength} addresses ${teamWeakness}`);
        continue;
      }
      
      // Check for semantic match using the keyword map
      const keywords = Object.keys(keywordMap);
      for (const keyword of keywords) {
        if (playerStrength.toLowerCase().includes(keyword.toLowerCase())) {
          const relatedConcepts = keywordMap[keyword];
          for (const concept of relatedConcepts) {
            if (teamWeakness.toLowerCase().includes(concept.toLowerCase())) {
              matches.push(`Your ${playerStrength} could help with "${teamWeakness}"`);
              break;
            }
          }
        }
      }
    }
  }
  
  return matches;
};

// Generate role description
const generateRoleDescription = (playerPosition: string, team: SaudiLeagueTeam): string => {
  const formations: { [key: string]: { [key: string]: string } } = {
    "4-2-3-1": {
      "Striker": "Lead the attack as the main goal threat, link up with attacking midfielders",
      "Winger": "Provide width and creativity from wide areas, cut inside to support attacks",
      "Attacking Midfielder": "Create chances as the team's primary playmaker behind the striker",
      "Central Midfielder": "Control the tempo and distribute the ball in a balanced role",
      "Defensive Midfielder": "Shield the defense and start attacks from deep positions",
      "Full Back": "Provide width in attack while maintaining defensive responsibilities",
      "Center Back": "Lead the defensive line and build attacks from the back",
      "Goalkeeper": "Start the team's build-up play and organize the defense"
    },
    "4-3-3": {
      "Striker": "Central focal point for attacks with emphasis on finishing",
      "Winger": "Attack from wide positions, providing pace and creativity in the final third",
      "Midfielder": "Play in a dynamic midfield three, balancing attack and defense",
      "Defensive Midfielder": "Anchor the midfield three, focusing on defensive coverage",
      "Full Back": "Overlap with wingers to create overloads in wide areas",
      "Center Back": "Defend against counter-attacks with emphasis on covering space",
      "Goalkeeper": "Quick distribution to initiate counter-attacks"
    },
    "4-4-2": {
      "Striker": "Work as part of a strike partnership, with shared defensive responsibilities",
      "Winger": "Traditional wide role with crossing ability and tracking back",
      "Midfielder": "Box-to-box role with emphasis on work rate and positioning",
      "Full Back": "Provide occasional attacking support while focusing on defensive solidity",
      "Center Back": "Traditional defending with emphasis on partnership and aerial ability",
      "Goalkeeper": "Command the penalty area and organize defensive shape"
    },
    "3-5-2": {
      "Striker": "Work as part of a strike partnership with movement to create space",
      "Midfielder": "Control central areas with emphasis on ball retention",
      "Defensive Midfielder": "Shield the back three and distribute play",
      "Full Back": "Wing-back role with significant attacking and defensive responsibilities",
      "Center Back": "Part of a back three, requiring good distribution and covering ability",
      "Goalkeeper": "Involved in build-up play with good distribution skills"
    }
  };
  
  // Get generic position (simplify from specific to general)
  let genericPosition = playerPosition;
  for (const [general, specific] of Object.entries(positionMappings)) {
    for (const pos of specific) {
      if (pos === playerPosition || playerPosition.includes(pos)) {
        genericPosition = general;
        break;
      }
    }
  }
  
  // Get formation-specific role
  const formationRoles = formations[team.formation] || {};
  const roleDescription = formationRoles[genericPosition] || 
    `Play as a ${genericPosition} in ${team.name}'s ${team.formation} system`;
  
  // Add team playing style context
  return `${roleDescription}. Adapt to ${team.name}'s ${team.playingStyle} approach.`;
};

// Main compatibility analysis function
export const analyzeTeamCompatibility = async (
  playerStats: PlayerStats,
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

// Export the main function and types
export default {
  analyzeTeamCompatibility,
  getSaudiLeagueTeams: () => saudiLeagueTeams
};
