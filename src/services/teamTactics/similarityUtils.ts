
import { ExtendedPlayerStats, SaudiLeagueTeam } from './types';

// Calculate cosine similarity between two vectors
export const calculateCosineSimilarity = (vectorA: number[], vectorB: number[]): number => {
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

// Calculate tactical fit score based on player stats and team profile
export const calculateTacticalFit = (playerStats: ExtendedPlayerStats, team: SaudiLeagueTeam): number => {
  // Create player tactical vector
  const playerTacticalVector = [
    // Technical values
    (playerStats.passing || 70) / 100 * 100,
    (playerStats.ballControl || 70) / 100 * 100,
    (playerStats.vision || 70) / 100 * 100,
    
    // Physical values
    (playerStats.pace || 70) / 100 * 100,
    (playerStats.stamina || 70) / 100 * 100,
    (playerStats.physical || 70) / 100 * 100,
    
    // Tactical values
    (playerStats.positioning || 70) / 100 * 100,
    (playerStats.anticipation || 70) / 100 * 100,
    (playerStats.decision || 70) / 100 * 100
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

// Determine strengths match between player and team
export const determineStrengthsMatch = (playerStrengths: string[], teamWeaknesses: string[]): string[] => {
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
