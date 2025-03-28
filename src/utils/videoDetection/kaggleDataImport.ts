import { IdentifiedPlayer, IdentifiedTeam } from './playerIdentification';
import type { DetectionResult } from './types';

// نوع بيانات يمثل بيانات لاعب من Kaggle
export interface KagglePlayerData {
  player_id: string;
  name: string;
  team: string;
  position: string;
  nationality: string;
  age: number;
  height_cm: number;
  weight_kg: number;
  overall_rating: number;
  potential: number;
  value_eur: number;
  wage_eur: number;
  preferred_foot: string;
  weak_foot: number;
  skill_moves: number;
  international_reputation: number;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physic: number;
}

// نوع جديد للبيانات المستوردة من مجموعات بيانات تحليل الفيديو الرياضي
export interface SportsVideoAnalysisData {
  analysis_id: string;
  match_id: string;
  player_id: string;
  player_name: string;
  team_name: string;
  event_type: string;
  timestamp: number;
  field_position_x: number;
  field_position_y: number;
  movement_speed: number;
  success_rate: number;
  confidence_score: number;
}

// قاعدة بيانات Kaggle للاعبين (سيتم استبدالها بالاستيراد الحقيقي لاحقاً)
const kagglePlayerDatabase: KagglePlayerData[] = [
  {
    player_id: "k001",
    name: "محمد صلاح",
    team: "ليفربول",
    position: "RW",
    nationality: "مصر",
    age: 31,
    height_cm: 175,
    weight_kg: 73,
    overall_rating: 89,
    potential: 89,
    value_eur: 65000000,
    wage_eur: 350000,
    preferred_foot: "اليسار",
    weak_foot: 3,
    skill_moves: 4,
    international_reputation: 4,
    pace: 90,
    shooting: 87,
    passing: 82,
    dribbling: 90,
    defending: 45,
    physic: 75
  },
  {
    player_id: "k002",
    name: "كريم بنزيما",
    team: "الاتحاد",
    position: "ST",
    nationality: "فرنسا",
    age: 35,
    height_cm: 185,
    weight_kg: 81,
    overall_rating: 88,
    potential: 88,
    value_eur: 35000000,
    wage_eur: 450000,
    preferred_foot: "اليمين",
    weak_foot: 4,
    skill_moves: 4,
    international_reputation: 5,
    pace: 80,
    shooting: 88,
    passing: 83,
    dribbling: 87,
    defending: 39,
    physic: 78
  },
  {
    player_id: "k003",
    name: "رونالدو",
    team: "النصر",
    position: "ST",
    nationality: "البرتغال",
    age: 38,
    height_cm: 187,
    weight_kg: 85,
    overall_rating: 86,
    potential: 86,
    value_eur: 20000000,
    wage_eur: 400000,
    preferred_foot: "اليمين",
    weak_foot: 4,
    skill_moves: 5,
    international_reputation: 5,
    pace: 85,
    shooting: 92,
    passing: 79,
    dribbling: 85,
    defending: 34,
    physic: 75
  },
  {
    player_id: "k004",
    name: "نيمار",
    team: "الهلال",
    position: "LW",
    nationality: "البرازيل",
    age: 31,
    height_cm: 175,
    weight_kg: 68,
    overall_rating: 87,
    potential: 87,
    value_eur: 40000000,
    wage_eur: 380000,
    preferred_foot: "اليمين",
    weak_foot: 5,
    skill_moves: 5,
    international_reputation: 5,
    pace: 87,
    shooting: 83,
    passing: 85,
    dribbling: 93,
    defending: 30,
    physic: 61
  },
  {
    player_id: "k005",
    name: "سالم الدوسري",
    team: "الهلال",
    position: "RW",
    nationality: "المملكة العربية السعودية",
    age: 31,
    height_cm: 168,
    weight_kg: 65,
    overall_rating: 82,
    potential: 82,
    value_eur: 15000000,
    wage_eur: 120000,
    preferred_foot: "اليمين",
    weak_foot: 3,
    skill_moves: 4,
    international_reputation: 2,
    pace: 88,
    shooting: 82,
    passing: 80,
    dribbling: 85,
    defending: 40,
    physic: 70
  },
  {
    player_id: "k006",
    name: "سعود عبدالحميد",
    team: "النصر",
    position: "GK",
    nationality: "المملكة العربية السعودية",
    age: 29,
    height_cm: 190,
    weight_kg: 85,
    overall_rating: 80,
    potential: 81,
    value_eur: 10000000,
    wage_eur: 80000,
    preferred_foot: "اليمين",
    weak_foot: 2,
    skill_moves: 1,
    international_reputation: 1,
    pace: 50,
    shooting: 20,
    passing: 60,
    dribbling: 30,
    defending: 25,
    physic: 75
  }
];

// قاعدة بيانات Kaggle للفرق
const kaggleTeamDatabase = [
  {
    team_id: "kt001",
    name: "الهلال",
    league: "دوري روشن السعودي",
    country: "المملكة العربية السعودية",
    attack: 85,
    midfield: 83,
    defense: 82,
    overall: 84,
    team_logo: "alhilal.png"
  },
  {
    team_id: "kt002",
    name: "النصر",
    league: "دوري روشن السعودي",
    country: "المملكة العربية السعودية",
    attack: 84,
    midfield: 82,
    defense: 80,
    overall: 82,
    team_logo: "alnasser.png"
  },
  {
    team_id: "kt003",
    name: "الاتحاد",
    league: "دوري روشن السعودي",
    country: "المملكة العربية السعودية",
    attack: 83,
    midfield: 81,
    defense: 80,
    overall: 81,
    team_logo: "alittihad.png"
  },
  {
    team_id: "kt004",
    name: "ليفربول",
    league: "الدوري الإنجليزي الممتاز",
    country: "إنجلترا",
    attack: 88,
    midfield: 85,
    defense: 86,
    overall: 86,
    team_logo: "liverpool.png"
  }
];

// مجموعة بيانات تحليل الفيديو الرياضي (بيانات تجريبية)
const sportsVideoAnalysisDatabase: SportsVideoAnalysisData[] = [
  {
    analysis_id: "sva001",
    match_id: "m2023_01",
    player_id: "k001",
    player_name: "محمد صلاح",
    team_name: "ليفربول",
    event_type: "تمريرة",
    timestamp: 1235,
    field_position_x: 75.5,
    field_position_y: 32.1,
    movement_speed: 21.3,
    success_rate: 0.92,
    confidence_score: 0.95
  },
  {
    analysis_id: "sva002",
    match_id: "m2023_01",
    player_id: "k002",
    player_name: "كريم بنزيما",
    team_name: "الاتحاد",
    event_type: "تسديدة",
    timestamp: 2145,
    field_position_x: 85.3,
    field_position_y: 50.2,
    movement_speed: 18.7,
    success_rate: 0.78,
    confidence_score: 0.89
  },
  {
    analysis_id: "sva003",
    match_id: "m2023_02",
    player_id: "k003",
    player_name: "رونالدو",
    team_name: "النصر",
    event_type: "عرضية",
    timestamp: 1892,
    field_position_x: 82.6,
    field_position_y: 12.4,
    movement_speed: 22.5,
    success_rate: 0.85,
    confidence_score: 0.91
  },
  {
    analysis_id: "sva004",
    match_id: "m2023_02",
    player_id: "k004",
    player_name: "نيمار",
    team_name: "الهلال",
    event_type: "مراوغة",
    timestamp: 2356,
    field_position_x: 65.8,
    field_position_y: 22.7,
    movement_speed: 24.1,
    success_rate: 0.95,
    confidence_score: 0.97
  },
  {
    analysis_id: "sva005",
    match_id: "m2023_03",
    player_id: "k005",
    player_name: "سالم الدوسري",
    team_name: "الهلال",
    event_type: "استحواذ",
    timestamp: 1457,
    field_position_x: 45.2,
    field_position_y: 38.9,
    movement_speed: 19.6,
    success_rate: 0.88,
    confidence_score: 0.93
  },
  {
    analysis_id: "sva006",
    match_id: "m2023_03",
    player_id: "k006",
    player_name: "سعود عبدالحميد",
    team_name: "النصر",
    event_type: "تصدي",
    timestamp: 2567,
    field_position_x: 12.3,
    field_position_y: 50.1,
    movement_speed: 15.2,
    success_rate: 0.91,
    confidence_score: 0.94
  }
];

/**
 * تحويل بيانات لاعب Kaggle إلى تنسيق IdentifiedPlayer
 */
export const convertKaggleToIdentifiedPlayer = (player: KagglePlayerData): IdentifiedPlayer => {
  return {
    id: player.player_id,
    name: player.name,
    team: player.team,
    nationality: player.nationality,
    position: player.position,
    number: "", // بيانات Kaggle لا تشمل رقم اللاعب عادة
    confidenceScore: 0.95, // افتراض درجة ثقة عالية لبيانات Kaggle
    physicalAttributes: {
      height: player.height_cm,
      weight: player.weight_kg,
      speed: player.pace,
      agility: player.dribbling,
      stamina: player.physic
    }
  };
};

/**
 * البحث عن لاعبين في قاعدة بيانات Kaggle
 */
export const searchKagglePlayersByName = (name: string): IdentifiedPlayer[] => {
  // بحث بسيط عن اسم اللاعب
  const matchingPlayers = kagglePlayerDatabase.filter(
    player => player.name.toLowerCase().includes(name.toLowerCase())
  );
  
  // تحويل النتائج إلى النسق المطلوب
  return matchingPlayers.map(player => convertKaggleToIdentifiedPlayer(player));
};

/**
 * البحث عن لاعبين في قاعدة بيانات Kaggle استناداً إلى خصائص الفيديو
 */
export const identifyPlayerFromKaggle = (result: DetectionResult): IdentifiedPlayer[] => {
  // عادةً سنستخدم معالجة أكثر تعقيدًا هنا للمقارنة بين بيانات الكشف وقاعدة البيانات
  // للعرض التوضيحي، سنعود بمجرد عينة من اللاعبين
  
  const candidates = [...kagglePlayerDatabase]
    .sort(() => 0.5 - Math.random()) // ترتيب عشوائي
    .slice(0, 3) // أخذ أول 3 لاعبين
    .map((player, index) => {
      // إنشاء درجة ثقة وهمية مع تناقص حسب الترتيب
      const confidenceScores = [0.92, 0.78, 0.65];
      
      return {
        ...convertKaggleToIdentifiedPlayer(player),
        confidenceScore: confidenceScores[index]
      };
    });
  
  return candidates;
};

/**
 * البحث عن فريق في قاعدة بيانات Kaggle استناداً إلى الاسم
 */
export const searchKaggleTeamsByName = (name: string): IdentifiedTeam[] => {
  // بحث بسيط عن اسم الفريق
  const matchingTeams = kaggleTeamDatabase.filter(
    team => team.name.toLowerCase().includes(name.toLowerCase())
  );
  
  // تحويل النتائج إلى النسق المطلوب
  return matchingTeams.map(team => ({
    id: team.team_id,
    name: team.name,
    country: team.country,
    league: team.league,
    colors: [], // بيانات الألوان غير متاحة في قاعدة البيانات الحالية
    logo: team.team_logo,
    confidenceScore: 0.9
  }));
};

/**
 * البحث عن فريق في قاعدة بيانات Kaggle استناداً إلى خصائص الفيديو
 */
export const identifyTeamFromKaggle = (result: DetectionResult): IdentifiedTeam[] => {
  // عادةً سنستخدم معالجة أكثر تعقيدًا هنا للمقارنة بين بيانات الكشف وقاعدة البيانات
  // للعرض التوضيحي، سنعود بمجرد عينة من الفرق
  
  const candidates = [...kaggleTeamDatabase]
    .sort(() => 0.5 - Math.random()) // ترتيب عشوائي
    .slice(0, 2) // أخذ أول فريقين
    .map((team, index) => {
      // إنشاء درجة ثقة وهمية مع تناقص حسب الترتيب
      const confidenceScores = [0.89, 0.74];
      
      return {
        id: team.team_id,
        name: team.name,
        country: team.country,
        league: team.league,
        colors: [], // بيانات الألوان غير متاحة في قاعدة البيانات الحالية
        logo: team.team_logo,
        confidenceScore: confidenceScores[index]
      };
    });
  
  return candidates;
};

/**
 * البحث عن بيانات تحليل فيديو رياضي استناداً إلى معرف اللاعب
 */
export const getSportsVideoAnalysisDataByPlayerId = (playerId: string): SportsVideoAnalysisData[] => {
  return sportsVideoAnalysisDatabase.filter(data => data.player_id === playerId);
};

/**
 * البحث عن بيانات تحليل فيديو رياضي استناداً إلى اسم اللاعب
 */
export const getSportsVideoAnalysisByPlayerName = (playerName: string): SportsVideoAnalysisData[] => {
  return sportsVideoAnalysisDatabase.filter(data => 
    data.player_name.toLowerCase().includes(playerName.toLowerCase())
  );
};

/**
 * البحث عن بيانات تحليل فيديو رياضي استناداً إلى اسم الفريق
 */
export const getSportsVideoAnalysisByTeam = (teamName: string): SportsVideoAnalysisData[] => {
  return sportsVideoAnalysisDatabase.filter(data => 
    data.team_name.toLowerCase().includes(teamName.toLowerCase())
  );
};

/**
 * تحليل حركة اللاعب باستخدام بيانات تحليل الفيديو الرياضي
 */
export const analyzePlayerMovementFromVideoData = (playerId: string): {
  avgSpeed: number;
  successRate: number;
  confidenceScore: number;
  events: { type: string; count: number }[]
} => {
  const playerData = getSportsVideoAnalysisDataByPlayerId(playerId);
  
  if (playerData.length === 0) {
    return {
      avgSpeed: 0,
      successRate: 0,
      confidenceScore: 0,
      events: []
    };
  }
  
  // حساب متوسط السرعة
  const avgSpeed = playerData.reduce((sum, data) => sum + data.movement_speed, 0) / playerData.length;
  
  // حساب متوسط معدل النجاح
  const avgSuccessRate = playerData.reduce((sum, data) => sum + data.success_rate, 0) / playerData.length;
  
  // حساب متوسط مستوى الثقة
  const avgConfidence = playerData.reduce((sum, data) => sum + data.confidence_score, 0) / playerData.length;
  
  // تجميع الأحداث وعددها
  const eventCounts: Record<string, number> = {};
  playerData.forEach(data => {
    if (eventCounts[data.event_type]) {
      eventCounts[data.event_type]++;
    } else {
      eventCounts[data.event_type] = 1;
    }
  });
  
  const events = Object.entries(eventCounts).map(([type, count]) => ({ type, count }));
  
  return {
    avgSpeed,
    successRate: avgSuccessRate,
    confidenceScore: avgConfidence,
    events
  };
};

/**
 * دالة تجمع بين مصادر البيانات المختلفة للحصول على أفضل النتائج
 */
export const getCombinedPlayerIdentification = (result: DetectionResult): IdentifiedPlayer[] => {
  // الحصول على النتائج من قواعد البيانات المختلفة
  const kaggleResults = identifyPlayerFromKaggle(result);
  
  // يمكن أن نضيف مزيداً من مصادر البيانات هنا في المستقبل
  
  // دمج النتائج، مع إزالة التكرارات المحتملة
  // (في التنفيذ الحقيقي، قد نستخدم خوارزمية أكثر تعقيدًا للدمج)
  return kaggleResults;
};

/**
 * دالة تجمع بين مصادر البيانات المختلفة للفرق للحصول على أفضل النتائج
 */
export const getCombinedTeamIdentification = (result: DetectionResult): IdentifiedTeam[] => {
  // الحصول على النتائج من قواعد البيانات المختلفة
  const kaggleResults = identifyTeamFromKaggle(result);
  
  // يمكن أن نضيف مزيداً من مصادر البيانات هنا في المستقبل
  
  // دمج النتائج، مع إزالة التكرارات المحتملة
  return kaggleResults;
};
