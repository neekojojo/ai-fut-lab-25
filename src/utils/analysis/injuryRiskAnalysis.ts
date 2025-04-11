
import { PlayerAnalysis } from '@/types/playerAnalysis';

/**
 * Generates an injury risk assessment based on player position and physical attributes
 * @param position The player's position
 * @param physicalScore The player's physical score
 */
export const generateInjuryRiskAssessment = (position: string, physicalScore: number) => {
  // Higher physical score means lower overall risk
  const overallRisk = Math.max(30, 100 - physicalScore);
  
  // Different positions have different risk areas
  const areasByPosition: Record<string, { name: string, baseRisk: number, recommendation: string }[]> = {
    'Forward': [
      { name: 'Hamstring', baseRisk: 75, recommendation: 'Increase hamstring strengthening exercises' },
      { name: 'Ankle', baseRisk: 65, recommendation: 'Practice landing technique and balance exercises' },
      { name: 'Knee', baseRisk: 60, recommendation: 'Focus on proper acceleration and deceleration mechanics' }
    ],
    'Midfielder': [
      { name: 'Groin', baseRisk: 70, recommendation: 'Implement adductor strengthening routine' },
      { name: 'Calf', baseRisk: 65, recommendation: 'Increase calf flexibility and strength training' },
      { name: 'Knee', baseRisk: 60, recommendation: 'Improve change of direction technique' }
    ],
    'Defender': [
      { name: 'Knee', baseRisk: 75, recommendation: 'Add lateral movement strengthening exercises' },
      { name: 'Ankle', baseRisk: 70, recommendation: 'Implement proper tackling technique training' },
      { name: 'Shoulder', baseRisk: 55, recommendation: 'Include upper body resistance training' }
    ],
    'Goalkeeper': [
      { name: 'Shoulder', baseRisk: 80, recommendation: 'Focus on rotator cuff strengthening' },
      { name: 'Wrist', baseRisk: 70, recommendation: 'Implement wrist stability exercises' },
      { name: 'Lower Back', baseRisk: 65, recommendation: 'Add core strengthening to training routine' }
    ]
  };
  
  // Default to midfielder if position not found
  const areas = areasByPosition[position] || areasByPosition['Midfielder'];
  
  // Adjust risk based on physical score
  const adjustedAreas = areas.map(area => {
    const adjustmentFactor = (100 - physicalScore) / 100;
    const risk = Math.max(20, Math.min(95, Math.round(area.baseRisk * adjustmentFactor)));
    return {
      name: area.name,
      risk,
      recommendation: area.recommendation
    };
  });
  
  // General recommendations based on overall risk
  const generalRecommendations = [
    'Maintain proper hydration throughout training and matches',
    'Ensure adequate recovery between intense training sessions',
    'Follow personalized warm-up and cool-down routines'
  ];
  
  // Add specific recommendations based on risk level
  if (overallRisk > 70) {
    generalRecommendations.push('Consider reduced training load during congested fixture periods');
    generalRecommendations.push('Implement additional recovery modalities like contrast therapy');
  } else if (overallRisk > 50) {
    generalRecommendations.push('Monitor training load carefully with weekly assessments');
  }
  
  return {
    overall: overallRisk,
    areas: adjustedAreas,
    recommendations: generalRecommendations
  };
};
