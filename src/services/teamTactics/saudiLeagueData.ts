
import { SaudiLeagueTeam } from './types';

// Mock data for Saudi League teams
export const saudiLeagueTeams: SaudiLeagueTeam[] = [
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

// Function to get all Saudi League teams
export function getSaudiLeagueTeams(): SaudiLeagueTeam[] {
  // In a real implementation, this would fetch data from Supabase or another data source
  // For now, return the mock data
  return saudiLeagueTeams;
}
