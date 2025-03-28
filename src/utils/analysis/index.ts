
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
  // Setup progress tracking variables
  let currentProgress = 0;
  let currentStage = ANALYSIS_STAGES[0];
  const updateCallbacks: Array<(progress: number, stage: string) => void> = [];
  
  // Function to update progress
  const updateProgress = (progress: number, stage: string) => {
    console.log(`Analysis progress: ${progress}%, stage: ${stage}`);
    currentProgress = progress;
    currentStage = stage;
    // Immediately call all registered callbacks with new progress
    updateCallbacks.forEach(callback => callback(progress, stage));
  };

  return new Promise(async (resolve) => {
    // Generate a deterministic hash for the video file
    const videoHash = `${videoFile.name}-${videoFile.size}-${videoFile.lastModified}`;
    
    // Check cache for this video hash
    if (analysisCache.has(videoHash)) {
      console.log("Using cached analysis result");
      const cachedAnalysis = analysisCache.get(videoHash)!;
      
      // Immediately resolve with cached analysis
      resolve({
        analysis: cachedAnalysis,
        progressUpdates: (callback) => {
          // Register callback
          updateCallbacks.push(callback);
          // Immediately call with 100% progress
          setTimeout(() => {
            callback(100, ANALYSIS_STAGES[ANALYSIS_STAGES.length - 1]);
          }, 50);
        }
      });
      return;
    }
    
    // Initial progress update
    updateProgress(0, "بدء تحليل الفيديو");
    
    // Start with baseline random analysis
    const hashNum = videoHash.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const baselineAnalysis = generateEnhancedAnalysis(hashNum);
    
    // Immediately provide the result object with the progress update function
    const result = {
      analysis: baselineAnalysis,
      progressUpdates: (callback: (progress: number, stage: string) => void) => {
        // Add callback to the list
        updateCallbacks.push(callback);
        // Immediately call with current progress
        callback(currentProgress, currentStage);
      }
    };
    
    resolve(result);
    
    // Create a new Promise to handle the analysis process
    const performAnalysis = async () => {
      try {
        // Step 1 - Extract frames from video (15%)
        updateProgress(5, "استخراج إطارات الفيديو للتحليل");
        const frames = await extractVideoFrames(videoFile, 15);
        updateProgress(15, "اكتمل استخراج الإطارات");
        
        // Step 2 - Detect players in video (35%)
        updateProgress(20, "تحليل حركة اللاعبين في الفيديو");
        const detectionResult = await detectPeopleInVideo(videoFile);
        updateProgress(35, "اكتمل تحليل حركة اللاعبين");
        
        // Step 3 - Analyze player movements (60%)
        updateProgress(40, "حساب إحصاءات أداء اللاعب");
        const movementAnalysis = await analyzePlayerMovements(detectionResult.playerPositions);
        updateProgress(60, "اكتملت حسابات الأداء");
        
        // Use StatsCalculator to calculate some statistics
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
        };
        
        // Calculate performance score based partially on real data
        const realPerformance = (enhancedAnalysis.stats.pace + 
                              enhancedAnalysis.stats.stamina +
                              enhancedAnalysis.stats.acceleration) / 3;
        
        enhancedAnalysis.performanceScore = Math.floor(
          realPerformance * 0.4 + baselineAnalysis.performanceScore * 0.6
        );
        
        // Step 4 - Generate final report (90%)
        updateProgress(80, "إنشاء تقرير التحليل النهائي");
        
        // Update the analysis in the result
        result.analysis = enhancedAnalysis;
        
        // Cache the analysis result
        analysisCache.set(videoHash, enhancedAnalysis);
        
        // Complete the analysis
        updateProgress(95, "جاري تنسيق النتائج النهائية");
        setTimeout(() => {
          updateProgress(100, ANALYSIS_STAGES[ANALYSIS_STAGES.length - 1]);
        }, 500);
        
        return enhancedAnalysis;
      } catch (error) {
        console.error("Error in video analysis:", error);
        // Fallback to baseline analysis if real analysis fails
        updateProgress(100, ANALYSIS_STAGES[ANALYSIS_STAGES.length - 1]);
        return baselineAnalysis;
      }
    };
    
    // Start the analysis process asynchronously
    performAnalysis();
  });
};

// Re-export the comparison service
export { compareWithPreviousAnalyses } from "./comparisonService";
