
import { PositionMappings } from './types';

// Map player position to compatible team positions
export const positionMappings: PositionMappings = {
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

// Role descriptions by formation and position
export const formationRoles: Record<string, Record<string, string>> = {
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

// Generates a role description for a player in a specific team
export function generateRoleDescription(playerPosition: string, team: import('./types').SaudiLeagueTeam): string {
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
  const teamFormationRoles = formationRoles[team.formation] || {};
  const roleDescription = teamFormationRoles[genericPosition] || 
    `Play as a ${genericPosition} in ${team.name}'s ${team.formation} system`;
  
  // Add team playing style context
  return `${roleDescription}. Adapt to ${team.name}'s ${team.playingStyle} approach.`;
}

// Calculate position fit score
export function calculatePositionFit(playerPosition: string, team: import('./types').SaudiLeagueTeam): number {
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
}
