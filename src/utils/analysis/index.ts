
import type { PlayerAnalysis } from "@/components/AnalysisReport.d";
import { ANALYSIS_STAGES } from "./constants";
import { generateEnhancedAnalysis } from "./analysisMockGenerator";
import { compareWithPreviousAnalyses } from "./comparisonService";

// This function simulates the video processing and AI analysis
// In a production environment, this would call the OpenAI API
export const analyzeFootballVideo = (videoFile: File): Promise<{analysis: PlayerAnalysis, progressUpdates: (callback: (progress: number, stage: string) => void) => void}> => {
  return new Promise((resolve) => {
    let progress = 0;
    const progressCallbacks: ((progress: number, stage: string) => void)[] = [];
    
    // Simulate progress updates - made slightly faster
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 7) + 3; // Faster increments
      if (progress > 100) progress = 100;
      
      const stageIndex = Math.min(
        Math.floor((progress / 100) * ANALYSIS_STAGES.length),
        ANALYSIS_STAGES.length - 1
      );
      
      progressCallbacks.forEach(callback => 
        callback(progress, ANALYSIS_STAGES[stageIndex])
      );
      
      if (progress === 100) {
        clearInterval(interval);
        
        // Add a slight delay before completing to show 100%
        setTimeout(() => {
          resolve({
            analysis: generateEnhancedAnalysis(),
            progressUpdates: (callback) => {
              progressCallbacks.push(callback);
            }
          });
        }, 1000);
      }
    }, 400); // Reduced from 600ms to 400ms for faster processing
  });
};

// Re-export the comparison service
export { compareWithPreviousAnalyses } from "./comparisonService";
