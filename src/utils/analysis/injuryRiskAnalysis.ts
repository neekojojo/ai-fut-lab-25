
import { PlayerAnalysis } from "@/components/AnalysisReport.d";
import { InjuryRiskArea, InjuryRiskData } from "@/types/badges";

// Calculate injury risk based on player stats and performance
export const calculateInjuryRisk = (
  analysis: PlayerAnalysis
): InjuryRiskData => {
  // Calculate overall injury risk score (0-100)
  // Higher values = higher risk
  const getStatsValue = (key: string) => {
    return analysis.stats?.[key] || 75;
  };
  
  // Base the calculation on various physical stats
  const staminaScore = getStatsValue('stamina');
  const strengthScore = getStatsValue('strength');
  const balanceScore = getStatsValue('balance');
  const agilityScore = getStatsValue('agility');
  
  // Calculate overall injury risk (inverse relationship with physical stats)
  const overallRisk = Math.round(
    100 - ((staminaScore + strengthScore + balanceScore + agilityScore) / 4) * 0.8
  );
  
  // Define specific risk areas
  const areas: InjuryRiskArea[] = [
    {
      name: "الركبة",
      risk: Math.round(100 - balanceScore * 0.9),
      recommendation: "تمارين تقوية عضلات الفخذ والتوازن لحماية الركبة"
    },
    {
      name: "الكاحل",
      risk: Math.round(100 - agilityScore * 0.85),
      recommendation: "تمارين مرونة وتوازن لتقوية مفصل الكاحل"
    },
    {
      name: "العضلات الخلفية",
      risk: Math.round(100 - staminaScore * 0.8),
      recommendation: "تمارين إطالة منتظمة وتقوية العضلات الخلفية"
    },
    {
      name: "الظهر السفلي",
      risk: Math.round(100 - strengthScore * 0.75),
      recommendation: "تمارين ثبات الجذع وتقوية عضلات البطن"
    }
  ];
  
  // Sort areas by risk (highest first)
  areas.sort((a, b) => b.risk - a.risk);
  
  // Generate injury prevention recommendations
  const recommendations = [
    "الالتزام بالإحماء الشامل قبل التدريبات والمباريات",
    "الاهتمام بفترات الراحة والاستشفاء بين التدريبات",
    "متابعة برنامج تغذية مناسب لتعزيز قوة العضلات والعظام",
    ...areas.map(area => area.recommendation)
  ];
  
  // Simulated injury history
  const history = [
    {
      type: "إصابة الكاحل",
      date: "2022-08-15",
      duration: "3 أسابيع"
    },
    {
      type: "شد عضلي",
      date: "2023-02-20",
      duration: "10 أيام"
    }
  ];
  
  return {
    overall: overallRisk,
    areas,
    recommendations,
    history
  };
};
