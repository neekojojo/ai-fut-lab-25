
import type { PlayerAnalysis } from "@/components/AnalysisReport.d";
import { Badge } from "@/types/badges";

interface BadgeDefinition {
  name: string;
  description: string;
  level: "bronze" | "silver" | "gold";
  unlockCondition: (analysis: PlayerAnalysis) => boolean;
}

// Define analysis stages for progress tracking
export const ANALYSIS_STAGES = [
  "تحليل الفيديو",
  "اكتشاف اللاعب",
  "تحليل الحركة",
  "تقييم المهارات",
  "الإحصائيات والمقارنة",
  "إنشاء التقرير"
];

// Professional players for comparison
export const PROFESSIONAL_PLAYERS = [
  {
    name: "Cristiano Ronaldo",
    team: "Al Nassr",
    position: "Forward",
    skills: ["Finishing", "Heading", "Long shots", "Pace"]
  },
  {
    name: "Lionel Messi",
    team: "Inter Miami",
    position: "Forward",
    skills: ["Dribbling", "Passing", "Vision", "Finishing"]
  },
  {
    name: "Kylian Mbappé",
    team: "Real Madrid",
    position: "Forward",
    skills: ["Pace", "Finishing", "Dribbling", "Movement"]
  },
  {
    name: "Erling Haaland",
    team: "Manchester City",
    position: "Forward",
    skills: ["Finishing", "Strength", "Positioning", "Heading"]
  },
  {
    name: "Kevin De Bruyne",
    team: "Manchester City",
    position: "Midfielder",
    skills: ["Passing", "Vision", "Crossing", "Long shots"]
  },
  {
    name: "Luka Modric",
    team: "Real Madrid",
    position: "Midfielder",
    skills: ["Passing", "Vision", "Ball control", "Game intelligence"]
  },
  {
    name: "N'Golo Kanté",
    team: "Al-Ittihad",
    position: "Midfielder",
    skills: ["Tackling", "Interception", "Stamina", "Positioning"]
  },
  {
    name: "Mohamed Salah",
    team: "Liverpool",
    position: "Forward",
    skills: ["Finishing", "Pace", "Dribbling", "Positioning"]
  },
  {
    name: "Neymar Jr",
    team: "Al-Hilal",
    position: "Forward",
    skills: ["Dribbling", "Technique", "Passing", "Creativity"]
  },
  {
    name: "Karim Benzema",
    team: "Al-Ittihad",
    position: "Forward",
    skills: ["Finishing", "Link-up play", "Technical ability", "Intelligence"]
  }
];

export const AVAILABLE_BADGES: BadgeDefinition[] = [
  {
    name: "التحليل الأول",
    description: "أكمل أول تحليل للاعب بنجاح",
    level: "bronze",
    unlockCondition: () => true, // دائمًا متاح للتحليل الأول
  },
  {
    name: "تقنية متميزة",
    description: "حصل على تقييم عالٍ في المهارات التقنية",
    level: "silver",
    unlockCondition: (analysis) => (analysis.performance?.technical || 0) >= 85,
  },
  {
    name: "سرعة فائقة",
    description: "سجل قيم سرعة استثنائية في التحليل",
    level: "bronze",
    unlockCondition: (analysis) => (analysis.stats?.pace || 0) >= 80,
  },
  {
    name: "لياقة عالية",
    description: "أظهر مستويات لياقة بدنية ممتازة",
    level: "silver",
    unlockCondition: (analysis) => (analysis.stats?.stamina || 0) >= 85,
  },
  {
    name: "رؤية استراتيجية",
    description: "أظهر وعيًا تكتيكيًا متميزًا",
    level: "gold",
    unlockCondition: (analysis) => (analysis.performance?.tactical || 0) >= 90,
  },
  {
    name: "توازن مثالي",
    description: "أظهر توازنًا استثنائيًا في الحركة",
    level: "silver",
    unlockCondition: (analysis) => (analysis.stats?.balance || 0) >= 85,
  },
  {
    name: "رشاقة متميزة",
    description: "سجل مستويات رشاقة عالية",
    level: "bronze",
    unlockCondition: (analysis) => (analysis.stats?.agility || 0) >= 80,
  },
  {
    name: "تحكم كروي ممتاز",
    description: "أظهر قدرة استثنائية في السيطرة على الكرة",
    level: "gold",
    unlockCondition: (analysis) => (analysis.stats?.ballControl || 0) >= 90,
  },
  {
    name: "كفاءة حركة",
    description: "حقق كفاءة عالية في أنماط الحركة",
    level: "silver",
    unlockCondition: (analysis) => {
      const enhancedMovement = analysis.movements?.some(m => m.isActive) || false;
      return enhancedMovement && (analysis.stats?.agility || 0) >= 75;
    },
  },
  {
    name: "نجم المستقبل",
    description: "يظهر إمكانات واعدة للتطور المستقبلي",
    level: "gold",
    unlockCondition: (analysis) => (analysis.talentScore || 0) >= 85,
  }
];
