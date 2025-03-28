
import { SaudiLeagueTeam } from './types';

// Mock data for Saudi League teams
export const saudiLeagueTeams: SaudiLeagueTeam[] = [
  {
    id: "al-hilal",
    name: "الهلال",
    logo: "https://placehold.co/100x100/png?text=Al-Hilal",
    formation: "4-2-3-1",
    playingStyle: "استحواذ على الكرة، ضغط عالي",
    strengths: ["التميز التقني", "عمق التشكيلة", "دفاع منظم"],
    weaknesses: ["الضعف أمام الهجمات المرتدة", "الاعتماد على النجوم"],
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
    name: "النصر",
    logo: "https://placehold.co/100x100/png?text=Al-Nassr",
    formation: "4-3-3",
    playingStyle: "هجوم مباشر، كثافة عالية",
    strengths: ["القوة الهجومية", "القوة البدنية", "الكرات الثابتة"],
    weaknesses: ["الانتقالات الدفاعية", "السيطرة على وسط الملعب"],
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
    name: "الأهلي",
    logo: "https://placehold.co/100x100/png?text=Al-Ahli",
    formation: "4-4-2",
    playingStyle: "هجمات مرتدة، دفاع متكتل",
    strengths: ["الصلابة الدفاعية", "الانتقالات السريعة", "اللعب على الأطراف"],
    weaknesses: ["الإبداع في وسط الملعب", "اختراق الدفاعات المتكتلة"],
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
    name: "الاتحاد",
    logo: "https://placehold.co/100x100/png?text=Al-Ittihad",
    formation: "4-2-3-1",
    playingStyle: "متوازن، سيطرة تقنية",
    strengths: ["الجودة التقنية", "المرونة التكتيكية", "وسط ملعب قوي"],
    weaknesses: ["نقص السرعة في الخلف", "كفاءة التسجيل"],
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
    name: "الشباب",
    logo: "https://placehold.co/100x100/png?text=Al-Shabab",
    formation: "3-5-2",
    playingStyle: "لعب على الأطراف، هيكل صلب",
    strengths: ["التفوق العددي على الأطراف", "الركلات الثابتة", "القوة البدنية"],
    weaknesses: ["الإبداع المركزي", "الاستحواذ ضد الفرق الكبيرة"],
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
