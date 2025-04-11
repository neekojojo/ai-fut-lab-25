import { PlayerAnalysis } from "@/types/playerAnalysis";
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

// Generate a basic injury risk assessment based on position and physical score
export const generateInjuryRiskAssessment = (position: string, physicalScore: number): InjuryRiskData => {
  // Base risk on position (goalkeepers have lower overall risk, forwards have higher)
  let baseRisk: number;
  
  switch (position.toLowerCase()) {
    case 'goalkeeper':
    case 'حارس مرمى':
      baseRisk = 55;
      break;
    case 'defender':
    case 'مدافع':
      baseRisk = 65;
      break;
    case 'midfielder':
    case 'وسط':
      baseRisk = 70;
      break;
    case 'forward':
    case 'مهاجم':
      baseRisk = 75;
      break;
    default:
      baseRisk = 70;
  }
  
  // Adjust for physical score (higher score = lower risk)
  const overallRisk = Math.max(30, Math.min(95, baseRisk - (physicalScore * 0.3)));
  
  // Define position-specific risk areas
  const areas: InjuryRiskArea[] = [];
  
  if (position.toLowerCase().includes('goal') || position.toLowerCase().includes('حارس')) {
    areas.push(
      {
        name: "الكتف",
        risk: Math.round(baseRisk + 5),
        recommendation: "تمارين تقوية عضلات الكتف والتمدد المنتظم"
      },
      {
        name: "رسغ اليد",
        risk: Math.round(baseRisk + 10),
        recommendation: "تمارين تقوية عضلات الرسغ واليد"
      }
    );
  }
  
  // Common injury areas for all positions
  areas.push(
    {
      name: "الركبة",
      risk: Math.round(overallRisk - 5),
      recommendation: "تمارين تقوية عضلات الفخذ والتوازن لحماية الركبة"
    },
    {
      name: "الكاحل",
      risk: Math.round(overallRisk + 2),
      recommendation: "تمارين مرونة وتوازن لتقوية مفصل الكاحل"
    },
    {
      name: "العضلات الخلفية",
      risk: Math.round(overallRisk),
      recommendation: "تمارين إطالة منتظمة وتقوية العضلات الخلفية"
    },
    {
      name: "الظهر السفلي",
      risk: Math.round(overallRisk - 10),
      recommendation: "تمارين ثبات الجذع وتقوية عضلات البطن"
    }
  );
  
  // Sort areas by risk (highest first)
  areas.sort((a, b) => b.risk - a.risk);
  
  // Generate injury prevention recommendations
  const recommendations = [
    "الالتزام بالإحماء الشامل قبل التدريبات والمباريات",
    "الاهتمام بفترات الراحة والاستشفاء بين التدريبات",
    "متابعة برنامج تغذية مناسب لتعزيز قوة العضلات والعظام",
    ...areas.map(area => area.recommendation)
  ];
  
  return {
    overall: overallRisk,
    areas,
    recommendations,
    history: []
  };
};

// Export default for backward compatibility
export default { calculateInjuryRisk, generateInjuryRiskAssessment };
