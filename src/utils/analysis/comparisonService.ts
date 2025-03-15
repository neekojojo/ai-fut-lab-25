
import type { PlayerAnalysis } from "@/components/AnalysisReport.d";

// Function to compare with previous analyses
export const compareWithPreviousAnalyses = (currentAnalysis: PlayerAnalysis, previousAnalyses: PlayerAnalysis[]): any => {
  if (previousAnalyses.length === 0) return null;
  
  // Calculate average improvement
  const improvementAreas: Record<string, number> = {};
  
  // Compare technical scores
  improvementAreas.technical = currentAnalysis.performance.technical - 
    previousAnalyses.reduce((sum, analysis) => sum + analysis.performance.technical, 0) / previousAnalyses.length;
  
  // Compare physical scores
  improvementAreas.physical = currentAnalysis.performance.physical - 
    previousAnalyses.reduce((sum, analysis) => sum + analysis.performance.physical, 0) / previousAnalyses.length;
  
  // Compare tactical scores
  improvementAreas.tactical = currentAnalysis.performance.tactical - 
    previousAnalyses.reduce((sum, analysis) => sum + analysis.performance.tactical, 0) / previousAnalyses.length;
  
  // Compare mental scores
  improvementAreas.mental = currentAnalysis.performance.mental - 
    previousAnalyses.reduce((sum, analysis) => sum + analysis.performance.mental, 0) / previousAnalyses.length;
  
  // Calculate overall improvement
  const overallImprovement = (improvementAreas.technical + improvementAreas.physical + 
    improvementAreas.tactical + improvementAreas.mental) / 4;
  
  return {
    overallImprovement,
    improvementAreas
  };
};
