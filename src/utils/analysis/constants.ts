
import type { PlayerAnalysis } from "@/components/AnalysisReport.d";
import { Badge } from "@/types/badges";

interface BadgeDefinition {
  name: string;
  description: string;
  level: "bronze" | "silver" | "gold";
  unlockCondition: (analysis: PlayerAnalysis) => boolean;
}

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
