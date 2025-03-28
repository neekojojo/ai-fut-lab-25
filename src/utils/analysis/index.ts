
import type { PlayerAnalysis } from "@/components/AnalysisReport.d";
import { ANALYSIS_STAGES } from "./constants";
import { generateEnhancedAnalysis } from "./analysisMockGenerator";
import { compareWithPreviousAnalyses } from "./comparisonService";
import { playerMLService } from "@/utils/ml/playerMLService";
import { apiProxyService } from "@/services/apiProxyService";
import { createDeterministicSeed, generateVideoHash } from "./videoUtils";
import { ProgressTracker, ProgressCallback, DETAILED_STAGES } from "./progressTracker";
import { performAnalysis } from "./analysisProcessor";

// Type definition for the return value of analyzeFootballVideo
export interface FootballVideoAnalysisResult {
  analysis: PlayerAnalysis;
  progressUpdates: (callback: ProgressCallback) => void;
}

// Cache to store analysis results by video hash
const analysisCache = new Map<string, PlayerAnalysis>();

// Analyze the football video with a combination of real detection and synthetic data
export const analyzeFootballVideo = async (videoFile: File): Promise<FootballVideoAnalysisResult> => {
  // Setup progress tracking 
  const progressTracker = new ProgressTracker(DETAILED_STAGES[0]);
  let isAnalysisRunning = false;
  
  // Generate a deterministic hash for the video file with enhanced properties
  const videoHash = await generateVideoHash(videoFile);
  
  // Check cache for this video hash
  if (analysisCache.has(videoHash)) {
    console.log("Using cached analysis result for video:", videoFile.name);
    const cachedAnalysis = analysisCache.get(videoHash)!;
    
    // Immediately resolve with cached analysis but simulate progress with more detailed stages
    return {
      analysis: cachedAnalysis,
      progressUpdates: (callback) => {
        // Register callback
        progressTracker.registerCallback(callback);
        
        // Simulate progress for cached results
        progressTracker.simulateCachedProgress();
      }
    };
  }
  
  // Start with baseline random analysis with enhanced determinism based on video properties
  const hashNum = await createDeterministicSeed(videoFile);
  const baselineAnalysis = generateEnhancedAnalysis(hashNum);
  
  // Return result object immediately with function to register progress callbacks
  const resultObj = {
    analysis: baselineAnalysis,
    progressUpdates: (callback: ProgressCallback) => {
      // Register the callback
      progressTracker.registerCallback(callback);
      
      // If analysis hasn't started yet, start it now
      if (!isAnalysisRunning) {
        isAnalysisRunning = true;
        performAnalysis(
          videoFile, 
          baselineAnalysis, 
          progressTracker, 
          (hash, analysis) => analysisCache.set(hash, analysis),
          videoHash
        ).then(analysis => {
          // Update the analysis in the result object when complete
          resultObj.analysis = analysis;
        });
      }
    }
  };
  
  return resultObj;
};

// Re-export comparison service and constants for backward compatibility
export { compareWithPreviousAnalyses } from "./comparisonService";
export { ANALYSIS_STAGES } from "./constants";
