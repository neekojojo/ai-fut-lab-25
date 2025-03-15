
import type { PlayerAnalysis } from "@/components/AnalysisReport.d";

// Function to generate injury risk assessment
export const generateInjuryRiskAssessment = (position: string, physicalScore: number): PlayerAnalysis["injuryRisk"] => {
  // Calculate overall risk (lower physical score = higher risk)
  const overallRisk = Math.max(10, 100 - physicalScore - Math.random() * 20);
  
  // Position-specific injury areas
  const forwardAreas = [
    { name: "Hamstrings", risk: Math.random() * 40 + 30, recommendation: "Focus on hamstring flexibility and strength exercises" },
    { name: "Ankles", risk: Math.random() * 30 + 20, recommendation: "Incorporate balance training to strengthen ankle stability" },
    { name: "Knees", risk: Math.random() * 30 + 20, recommendation: "Add knee stabilization exercises to your routine" }
  ];
  
  const midfielderAreas = [
    { name: "Calves", risk: Math.random() * 40 + 30, recommendation: "Regular calf stretching and strengthening" },
    { name: "Groin", risk: Math.random() * 30 + 20, recommendation: "Include adductor stretches and strength training" },
    { name: "Lower back", risk: Math.random() * 30 + 20, recommendation: "Core stability exercises to protect lower back" }
  ];
  
  const defenderAreas = [
    { name: "Knees", risk: Math.random() * 40 + 30, recommendation: "Focus on landing mechanics and knee stability exercises" },
    { name: "Shoulders", risk: Math.random() * 30 + 20, recommendation: "Incorporate upper body and rotator cuff strength work" },
    { name: "Ankles", risk: Math.random() * 30 + 20, recommendation: "Regular proprioception training for ankle stability" }
  ];
  
  const goalkeeperAreas = [
    { name: "Shoulders", risk: Math.random() * 40 + 30, recommendation: "Rotator cuff strengthening and mobility exercises" },
    { name: "Wrists", risk: Math.random() * 30 + 20, recommendation: "Wrist strengthening and flexibility exercises" },
    { name: "Lower back", risk: Math.random() * 30 + 20, recommendation: "Core stability to protect the lower back during dives" }
  ];
  
  // Select appropriate areas based on position
  let areas;
  if (position === "Forward") areas = forwardAreas;
  else if (position === "Midfielder") areas = midfielderAreas;
  else if (position === "Defender") areas = defenderAreas;
  else areas = goalkeeperAreas;
  
  // Sort areas by risk (highest first)
  areas.sort((a, b) => b.risk - a.risk);
  
  return {
    overall: overallRisk,
    areas
  };
};
