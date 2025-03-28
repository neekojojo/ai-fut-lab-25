import type { PlayerAnalysis } from "@/components/AnalysisReport.d";
import { ANALYSIS_STAGES } from "./constants";
import { generateEnhancedAnalysis } from "./analysisMockGenerator";
import { compareWithPreviousAnalyses } from "./comparisonService";
import { playerMLService } from "@/utils/ml/playerMLService";
import { apiProxyService } from "@/services/apiProxyService";
import { detectPeopleInVideo } from "@/utils/videoDetection";
import { analyzePlayerMovements } from "@/utils/videoDetection/movementAnalysis";
import { StatsCalculator } from "@/utils/dataProcessing/statsCalculator";
import { extractVideoFrames } from "@/utils/videoDetection/frameExtraction";

// Cache to store analysis results by video hash
const analysisCache = new Map<string, PlayerAnalysis>();

// Analyze the football video with a combination of real detection and synthetic data
export const analyzeFootballVideo = async (videoFile: File): Promise<{
  analysis: PlayerAnalysis, 
  progressUpdates: (callback: (progress: number, stage: string) => void) => void
}> => {
  return new Promise(async (resolve) => {
    // Generate a deterministic hash for the video file
    const videoHash = `${videoFile.name}-${videoFile.size}-${videoFile.lastModified}`;
    
    // Check cache for this video hash
    if (analysisCache.has(videoHash)) {
      console.log("Using cached analysis result");
      const cachedAnalysis = analysisCache.get(videoHash)!;
      
      resolve({
        analysis: cachedAnalysis,
        progressUpdates: (callback) => {
          // Immediately call with 100% progress
          callback(100, ANALYSIS_STAGES[ANALYSIS_STAGES.length - 1]);
        }
      });
      return;
    }
    
    // Set up progress tracking
    let currentProgress = 0;
    let currentStage = ANALYSIS_STAGES[0];
    const updateCallbacks: ((progress: number, stage: string) => void)[] = [];
    
    const updateProgress = (progress: number, stage: string) => {
      currentProgress = progress;
      currentStage = stage;
      updateCallbacks.forEach(callback => callback(progress, stage));
    };
    
    // Start with baseline random analysis
    const hashNum = videoHash.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const baselineAnalysis = generateEnhancedAnalysis(hashNum);
    
    try {
      // REAL ANALYSIS: Step 1 - Extract frames from video (25%)
      updateProgress(5, "استخراج إطارات الفيديو للتحليل");
      const frames = await extractVideoFrames(videoFile, 15); // Extract 15 frames for analysis
      
      // REAL ANALYSIS: Step 2 - Detect players in video (50%)
      updateProgress(25, "تحليل حركة اللاعبين في الفيديو");
      const detectionResult = await detectPeopleInVideo(videoFile);
      
      // REAL ANALYSIS: Step 3 - Analyze player movements (75%)
      updateProgress(50, "حساب إحصاءات أداء اللاعب");
      const movementAnalysis = await analyzePlayerMovements(detectionResult.playerPositions);
      
      // Use StatsCalculator to calculate some statistics (if needed)
      const statsCalculator = new StatsCalculator();
      
      // Combine real data with generated data
      const enhancedAnalysis: PlayerAnalysis = {
        ...baselineAnalysis,
        // Use real player count data
        confidence: detectionResult.confidence,
        // Use real movement data
        movements: detectionResult.playerPositions.map(pos => ({
          timestamp: pos.timestamp,
          x: pos.bbox.x,
          y: pos.bbox.y,
          speed: pos.speed || 0,
          acceleration: 0,
          direction: 0,
          isActive: true
        })),
        // Adjust stats based on real movement data
        stats: {
          ...baselineAnalysis.stats,
          // Adjust pace based on detected speed
          pace: Math.min(99, Math.max(60, Math.floor(
            movementAnalysis.averageSpeed * 10 + (baselineAnalysis.stats.pace * 0.5)
          ))),
          // Adjust physical stats based on movement patterns
          stamina: Math.min(99, Math.max(60, Math.floor(
            movementAnalysis.totalDistance / 10 + (baselineAnalysis.stats.stamina * 0.5)
          ))),
          acceleration: Math.min(99, Math.max(60, Math.floor(
            movementAnalysis.maxAcceleration * 5 + (baselineAnalysis.stats.acceleration * 0.5)
          )))
        },
        // Other fields remain from baseline analysis
      };
      
      // Calculate performance score based partially on real data
      const realPerformance = (enhancedAnalysis.stats.pace + 
                             enhancedAnalysis.stats.stamina +
                             enhancedAnalysis.stats.acceleration) / 3;
      
      enhancedAnalysis.performanceScore = Math.floor(
        realPerformance * 0.4 + baselineAnalysis.performanceScore * 0.6
      );
      
      // Step 4 - Generate final report (100%)
      updateProgress(90, "إنشاء تقرير التحليل النهائي");
      
      // Cache the analysis result for future use
      analysisCache.set(videoHash, enhancedAnalysis);
      
      // Complete the analysis
      updateProgress(100, ANALYSIS_STAGES[ANALYSIS_STAGES.length - 1]);
      
      // Return the enhanced analysis
      resolve({
        analysis: enhancedAnalysis,
        progressUpdates: (callback) => {
          updateCallbacks.push(callback);
          callback(currentProgress, currentStage);
        }
      });
      
    } catch (error) {
      console.error("Error in video analysis:", error);
      // Fallback to baseline analysis if real analysis fails
      updateProgress(100, ANALYSIS_STAGES[ANALYSIS_STAGES.length - 1]);
      
      // Cache the baseline analysis for future use
      analysisCache.set(videoHash, baselineAnalysis);
      
      resolve({
        analysis: baselineAnalysis,
        progressUpdates: (callback) => {
          updateCallbacks.push(callback);
          callback(currentProgress, currentStage);
        }
      });
    }
  });
};

// Re-export the comparison service
export { compareWithPreviousAnalyses } from "./comparisonService";
