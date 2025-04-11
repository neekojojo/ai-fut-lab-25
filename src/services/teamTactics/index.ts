
import type { PlayerStats } from '@/types/playerStats';

export interface ExtendedPlayerStats extends PlayerStats {
  technicalAbility: number;
  tacticalAwareness: number;
  physicalAttributes: number;
  mentalStrength: number;
}

export interface SaudiLeagueTeam {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  formation: string;
  playingStyle: string;
  strengthAreas: string[];
}

export interface TeamCompatibilityResult {
  teamId: string;
  teamName: string;
  compatibilityScore: number;
  positionFit: number;
  tacticalFit: number;
  styleFit: number;
  strengthMatch: string[];
  improvementAreas: string[];
}

export const getSaudiLeagueTeams = (): SaudiLeagueTeam[] => {
  return [
    {
      id: "al-hilal",
      name: "الهلال",
      logo: "/teams/al-hilal.png",
      primaryColor: "#0057B8",
      secondaryColor: "#FFFFFF",
      formation: "4-2-3-1",
      playingStyle: "Possession-based",
      strengthAreas: ["Technical", "Passing", "Control"]
    },
    {
      id: "al-nassr",
      name: "النصر",
      logo: "/teams/al-nassr.png",
      primaryColor: "#FFCC00",
      secondaryColor: "#0F4C81",
      formation: "4-3-3",
      playingStyle: "Counter-attacking",
      strengthAreas: ["Speed", "Finishing", "Transitions"]
    },
    {
      id: "al-ahli",
      name: "الأهلي",
      logo: "/teams/al-ahli.png",
      primaryColor: "#00A651",
      secondaryColor: "#FFFFFF",
      formation: "4-4-2",
      playingStyle: "Balanced",
      strengthAreas: ["Organization", "Teamwork", "Defending"]
    },
    {
      id: "al-ittihad",
      name: "الاتحاد",
      logo: "/teams/al-ittihad.png",
      primaryColor: "#000000",
      secondaryColor: "#FFD700",
      formation: "3-5-2",
      playingStyle: "Aggressive Pressing",
      strengthAreas: ["Pressing", "Physicality", "Set Pieces"]
    }
  ];
};

export default {
  getSaudiLeagueTeams
};
