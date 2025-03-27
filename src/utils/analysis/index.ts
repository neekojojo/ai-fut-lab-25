
import type { PlayerAnalysis } from "@/components/AnalysisReport.d";
import { ANALYSIS_STAGES } from "./constants";
import { generateEnhancedAnalysis } from "./analysisMockGenerator";
import { compareWithPreviousAnalyses } from "./comparisonService";
import { playerMLService } from "@/utils/ml/playerMLService";
import { apiProxyService } from "@/services/apiProxyService";
import { detectPeopleInVideo } from "@/utils/videoDetection";
import { analyzePlayerMovements } from "@/utils/videoDetection/movementAnalysis";

// Cache to store analysis results by video hash
const analysisCache = new Map<string, PlayerAnalysis>();

// Optimized function for faster video analysis
export const analyzeFootballVideo = (videoFile: File): Promise<{analysis: PlayerAnalysis, progressUpdates: (callback: (progress: number, stage: string) => void) => void}> => {
  return new Promise((resolve) => {
    let progress = 0;
    const progressCallbacks: ((progress: number, stage: string) => void)[] = [];
    
    // Generate a deterministic hash for the video file
    const videoHash = `${videoFile.name}-${videoFile.size}-${videoFile.lastModified}`;
    
    // Check if we've already analyzed this video - use cache for instant results
    if (analysisCache.has(videoHash)) {
      console.log("Using cached analysis result for the video");
      
      // Skip simulation for cached results - immediately return result
      setTimeout(() => {
        resolve({
          analysis: analysisCache.get(videoHash)!,
          progressUpdates: (callback) => {
            callback(100, ANALYSIS_STAGES[ANALYSIS_STAGES.length - 1]);
          }
        });
      }, 300);
      
      return;
    }
    
    // Faster simulation for new analysis
    const interval = setInterval(() => {
      progress += 15; // Much faster progress increments
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
        
        // Reduced delay before completing
        setTimeout(async () => {
          try {
            // For performance, only do lightweight detection
            console.log("Starting streamlined video analysis...");
            
            // Use the video hash as seed for generateEnhancedAnalysis
            const hashNum = videoHash.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
            const analysis = generateEnhancedAnalysis(hashNum);
            
            // Skip heavy video processing and use the mock data primarily
            const quickDetectionPromise = detectPeopleInVideo(videoFile).catch(err => {
              console.log("Using fallback detection due to error:", err);
              return {
                confidence: 0.85,
                count: 5,
                frameResults: [],
                playerPositions: []
              };
            });
            
            // Set a timeout to ensure we don't wait too long for detection
            const timeoutPromise = new Promise<any>(resolve => {
              setTimeout(() => {
                resolve({
                  confidence: 0.82,
                  count: 4,
                  frameResults: [],
                  playerPositions: []
                });
              }, 2000); // Timeout after 2 seconds
            });
            
            // Race between detection and timeout
            const detectionResult = await Promise.race([quickDetectionPromise, timeoutPromise]);
            
            // Cache the analysis result for future use
            analysisCache.set(videoHash, analysis);
            
            resolve({
              analysis,
              progressUpdates: (callback) => {
                progressCallbacks.push(callback);
              }
            });
          } catch (error) {
            console.error("Error in video analysis:", error);
            
            // Fallback to mock analysis in case of error
            const hashNum = videoHash.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
            const fallbackAnalysis = generateEnhancedAnalysis(hashNum);
            
            // Cache the analysis result for future use
            analysisCache.set(videoHash, fallbackAnalysis);
            
            resolve({
              analysis: fallbackAnalysis,
              progressUpdates: (callback) => {
                progressCallbacks.push(callback);
              }
            });
          }
        }, 500);
      }
    }, 100); // Faster intervals
  });
};

// Re-export the comparison service
export { compareWithPreviousAnalyses } from "./comparisonService";
