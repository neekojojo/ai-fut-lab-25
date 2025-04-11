
import { PlayerAnalysis } from '@/types/playerAnalysis';

// Types for team tactics service
export interface ExtendedPlayerStats {
  avgSpeed: number;
  maxSpeed: number;
  avgAcceleration: number;
  distanceCovered: number;
  balanceScore: number;
  technicalScore: number;
  physicalScore: number;
  movementEfficiency: number;
  passing: number;
  ballControl: number;
  vision: number;
  pace: number;
  stamina: number;
  physical: number;
  positioning: number;
  anticipation: number;
  decision: number;
  [key: string]: number;
}

export interface SaudiLeagueTeam {
  id: string;
  name: string;
  logo: string;
  formation: string;
  playingStyle: string;
  strengths: string[];
  weaknesses: string[];
  requiredAttributes: {
    [position: string]: {
      [attribute: string]: number;
    };
  };
}

export interface TeamCompatibilityResult {
  team: SaudiLeagueTeam;
  compatibilityScore: number;
  positionFit: number;
  tacticalFit: number;
  roleDescription: string;
  strengthsMatch: string[];
}

// Mock data for Saudi League teams
const saudiLeagueTeams: SaudiLeagueTeam[] = [
  {
    id: 'al-hilal',
    name: 'الهلال',
    logo: 'https://example.com/logos/al-hilal.png',
    formation: '4-2-3-1',
    playingStyle: 'هجومي مسيطر',
    strengths: [
      'هجمات سريعة',
      'استحواذ طويل',
      'ضغط عالي'
    ],
    weaknesses: [
      'ضعف في الهجمات المرتدة',
      'دفاع غير متماسك أحياناً'
    ],
    requiredAttributes: {
      'Forward': {
        'pace': 80,
        'shooting': 85,
        'technical': 80
      },
      'Midfielder': {
        'passing': 85,
        'vision': 80,
        'tactical': 85
      },
      'Defender': {
        'defending': 85,
        'strength': 80,
        'positioning': 85
      },
      'Goalkeeper': {
        'reflexes': 85,
        'positioning': 80,
        'handling': 80
      }
    }
  },
  {
    id: 'al-nassr',
    name: 'النصر',
    logo: 'https://example.com/logos/al-nassr.png',
    formation: '4-3-3',
    playingStyle: 'هجومي مباشر',
    strengths: [
      'هجمات مرتدة سريعة',
      'تسديدات من خارج منطقة الجزاء',
      'قوة في الكرات الثابتة'
    ],
    weaknesses: [
      'استحواذ غير مستقر',
      'مساحات دفاعية كبيرة'
    ],
    requiredAttributes: {
      'Forward': {
        'pace': 85,
        'shooting': 85,
        'physical': 75
      },
      'Midfielder': {
        'passing': 80,
        'stamina': 85,
        'physical': 80
      },
      'Defender': {
        'pace': 75,
        'strength': 85,
        'aerial': 80
      },
      'Goalkeeper': {
        'reflexes': 80,
        'distribution': 85,
        'commanding': 80
      }
    }
  },
  {
    id: 'al-ahli',
    name: 'الأهلي',
    logo: 'https://example.com/logos/al-ahli.png',
    formation: '4-4-2',
    playingStyle: 'متوازن',
    strengths: [
      'تنظيم دفاعي متماسك',
      'هجمات جانبية فعالة',
      'عمل جماعي منظم'
    ],
    weaknesses: [
      'بطء في التحول من الدفاع للهجوم',
      'عدم فعالية في اختراق الدفاعات المغلقة'
    ],
    requiredAttributes: {
      'Forward': {
        'shooting': 80,
        'heading': 80,
        'movement': 85
      },
      'Midfielder': {
        'work-rate': 85,
        'passing': 80,
        'tactical': 85
      },
      'Defender': {
        'tackling': 85,
        'positioning': 85,
        'concentration': 80
      },
      'Goalkeeper': {
        'positioning': 85,
        'communication': 85,
        'reflexes': 80
      }
    }
  }
];

export const getSaudiLeagueTeams = (): SaudiLeagueTeam[] => {
  return saudiLeagueTeams;
};

// Analyze team compatibility based on player stats and position
export const analyzeTeamCompatibility = (
  playerStats: ExtendedPlayerStats,
  playerPosition: string,
  playerStrengths: string[]
): TeamCompatibilityResult[] => {
  const teams = getSaudiLeagueTeams();
  const results: TeamCompatibilityResult[] = [];
  
  for (const team of teams) {
    // Calculate position fit
    const positionRequirements = team.requiredAttributes[playerPosition] || {};
    let positionFitScore = 0;
    let positionFactorsCount = 0;
    
    for (const [attribute, requiredValue] of Object.entries(positionRequirements)) {
      if (playerStats[attribute]) {
        positionFitScore += Math.min(100, (playerStats[attribute] / requiredValue) * 100);
        positionFactorsCount++;
      }
    }
    
    const positionFit = positionFactorsCount > 0 
      ? Math.min(100, positionFitScore / positionFactorsCount)
      : 60; // Default if no position requirements found
    
    // Calculate tactical fit
    let tacticalFit = 70; // Base compatibility
    
    // Style compatibility boost
    if (team.playingStyle.includes('هجومي') && playerStats.pace > 80) {
      tacticalFit += 10;
    }
    
    if (team.playingStyle.includes('متوازن') && playerStats.positioning > 80) {
      tacticalFit += 10;
    }
    
    if (team.playingStyle.includes('دفاعي') && playerStats.defending > 80) {
      tacticalFit += 10;
    }
    
    // Find matching strengths
    const strengthsMatch = playerStrengths.filter(playerStrength => 
      team.strengths.some(teamStrength => 
        teamStrength.toLowerCase().includes(playerStrength.toLowerCase()) ||
        playerStrength.toLowerCase().includes(teamStrength.toLowerCase())
      )
    );
    
    if (strengthsMatch.length > 0) {
      tacticalFit += strengthsMatch.length * 5;
    }
    
    // Overall compatibility
    const compatibilityScore = Math.round((positionFit * 0.6) + (tacticalFit * 0.4));
    
    // Role description based on team and position
    const roleDescription = generateRoleDescription(team, playerPosition);
    
    results.push({
      team,
      compatibilityScore,
      positionFit,
      tacticalFit,
      roleDescription,
      strengthsMatch
    });
  }
  
  // Sort by compatibility score (highest first)
  return results.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
};

// Generate a role description based on team and position
const generateRoleDescription = (team: SaudiLeagueTeam, playerPosition: string): string => {
  const descriptions: {[key: string]: {[key: string]: string}} = {
    'al-hilal': {
      'Forward': 'يُتوقع منك تسجيل الأهداف والمشاركة في بناء الهجمات. التركيز على الحركة داخل منطقة الجزاء والاستفادة من التمريرات العرضية.',
      'Midfielder': 'دورك الأساسي هو التحكم في إيقاع اللعب والمساهمة في الاستحواذ. مطلوب منك تقديم تمريرات دقيقة وخلق الفرص للمهاجمين.',
      'Defender': 'ستكون مسؤولاً عن بناء الهجمات من الخلف مع الحفاظ على تنظيم دفاعي متماسك. مطلوب منك الالتزام التكتيكي العالي.',
      'Goalkeeper': 'مطلوب منك المشاركة في بناء الهجمات وبدء الاستحواذ، بالإضافة إلى مهاراتك التقليدية في حماية المرمى.'
    },
    'al-nassr': {
      'Forward': 'دورك الأساسي هو استغلال المساحات خلف دفاعات الخصم والتمركز المناسب لإنهاء الهجمات المرتدة.',
      'Midfielder': 'مطلوب منك تغطية مساحات واسعة والمشاركة في الدفاع والهجوم. التركيز على التمريرات السريعة والمباشرة.',
      'Defender': 'ستحتاج إلى سرعة جيدة للتعامل مع المساحات الكبيرة خلفك. مطلوب منك الصلابة في المواجهات الفردية.',
      'Goalkeeper': 'دورك مهم في بدء الهجمات المرتدة بتوزيعات سريعة ودقيقة. مطلوب منك الحذر من الخروج المتكرر.'
    },
    'al-ahli': {
      'Forward': 'يُتوقع منك العمل كجزء من ثنائي هجومي مع التركيز على التواجد داخل منطقة الجزاء واستغلال الكرات العرضية.',
      'Midfielder': 'دورك الأساسي هو العمل الجماعي والتغطية الدفاعية مع المشاركة في بناء الهجمات بشكل منظم.',
      'Defender': 'مطلوب منك الالتزام التكتيكي العالي والتنظيم الدفاعي المتماسك. التركيز على التمركز الصحيح.',
      'Goalkeeper': 'دورك مهم في قيادة الخط الدفاعي وتنظيمه. مطلوب منك التواصل المستمر مع المدافعين.'
    }
  };
  
  return descriptions[team.id]?.[playerPosition] || 
    'ستكون جزءًا مهمًا من تشكيلة الفريق، مع دور يتناسب مع مهاراتك وقدراتك الفنية والبدنية.';
};

const teamTacticsService = {
  getSaudiLeagueTeams,
  analyzeTeamCompatibility
};

export default teamTacticsService;
