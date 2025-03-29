
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

// Enhanced cache to store analysis results by video hash
const analysisCache = new Map<string, PlayerAnalysis>();

// Log cache size for debugging
const logCacheStatus = () => {
  console.log(`Analysis cache contains ${analysisCache.size} entries`);
};

// Analyze the football video with consistent deterministic results
export const analyzeFootballVideo = async (videoFile: File): Promise<FootballVideoAnalysisResult> => {
  // Setup progress tracking 
  const progressTracker = new ProgressTracker(DETAILED_STAGES[0]);
  let isAnalysisRunning = false;
  
  // Generate a deterministic hash for the video file
  const videoHash = await generateVideoHash(videoFile);
  
  // Add console logs for debugging
  console.log("Starting video analysis for:", videoFile.name);
  console.log("Deterministic video hash:", videoHash);
  logCacheStatus();
  
  // Check cache for this video hash
  if (analysisCache.has(videoHash)) {
    console.log("CACHE HIT: Using cached analysis result for video:", videoFile.name);
    const cachedAnalysis = analysisCache.get(videoHash)!;
    
    // Immediately resolve with cached analysis but simulate progress
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
  
  console.log("CACHE MISS: Generating new analysis for:", videoFile.name);
  
  // Start with deterministic baseline analysis based on video properties
  const hashNum = await createDeterministicSeed(videoFile);
  const baselineAnalysis = generateEnhancedAnalysis(hashNum);
  
  console.log("Generated baseline analysis with deterministic seed:", hashNum);
  
  // Return result object immediately with function to register progress callbacks
  const resultObj = {
    analysis: baselineAnalysis,
    progressUpdates: (callback: ProgressCallback) => {
      // Register the callback
      progressTracker.registerCallback(callback);
      
      // If analysis hasn't started yet, start it now
      if (!isAnalysisRunning) {
        isAnalysisRunning = true;
        console.log("Starting full deterministic analysis process");
        performAnalysis(
          videoFile, 
          baselineAnalysis, 
          progressTracker, 
          (hash, analysis) => {
            console.log("Caching analysis result for hash:", hash);
            analysisCache.set(hash, analysis);
            logCacheStatus();
          },
          videoHash
        ).then(analysis => {
          // Update the analysis in the result object when complete
          resultObj.analysis = analysis;
          console.log("Analysis completed successfully with deterministic results");
        });
      }
    }
  };
  
  return resultObj;
};

// Re-export comparison service and constants for backward compatibility
export { compareWithPreviousAnalyses } from "./comparisonService";
export { ANALYSIS_STAGES } from "./constants";
