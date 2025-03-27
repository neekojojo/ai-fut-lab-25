
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

// This function integrates real video processing with the mock analysis
export const analyzeFootballVideo = (videoFile: File): Promise<{analysis: PlayerAnalysis, progressUpdates: (callback: (progress: number, stage: string) => void) => void}> => {
  return new Promise((resolve) => {
    let progress = 0;
    const progressCallbacks: ((progress: number, stage: string) => void)[] = [];
    
    // Generate a deterministic hash for the video file
    const videoHash = `${videoFile.name}-${videoFile.size}-${videoFile.lastModified}`;
    
    // Check if we've already analyzed this video
    if (analysisCache.has(videoHash)) {
      console.log("Using cached analysis result for the video");
      
      // Simulate quick progress updates for cached results
      const interval = setInterval(() => {
        progress += 20; // Faster progress for cached results
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
          
          // Return cached result after showing 100% progress
          setTimeout(() => {
            resolve({
              analysis: analysisCache.get(videoHash)!,
              progressUpdates: (callback) => {
                progressCallbacks.push(callback);
              }
            });
          }, 500);
        }
      }, 100);
      
      return;
    }
    
    // Simulate progress updates for new analysis
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
        setTimeout(async () => {
          try {
            // Perform real people detection on the video
            console.log("Starting real video analysis with people detection...");
            const detectionResult = await detectPeopleInVideo(videoFile);
            
            // Use the video hash as seed for generateEnhancedAnalysis
            const hashNum = videoHash.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
            const baseAnalysis = generateEnhancedAnalysis(hashNum);
            
            // If we have player positions, analyze player movements
            let playerMovements = baseAnalysis.movements;
            if (detectionResult.playerPositions && detectionResult.playerPositions.length > 0) {
              const movementAnalysis = analyzePlayerMovements(detectionResult.playerPositions);
              if (movementAnalysis) {
                // Convert movement data to the format expected by the PlayerAnalysis interface
                playerMovements = Array.from({length: 5}, (_, i) => ({
                  x: i * 20,
                  y: Math.floor(movementAnalysis.speeds[i % movementAnalysis.speeds.length] || 50),
                  timestamp: i * 1000,
                  speed: movementAnalysis.speeds[i % movementAnalysis.speeds.length] || 0,
                  name: ['Sprint', 'Agility', 'Balance', 'Coordination', 'Acceleration'][i],
                  current: movementAnalysis.speeds[i % movementAnalysis.speeds.length] || 50,
                  previous: (movementAnalysis.speeds[i % movementAnalysis.speeds.length] || 50) - 10,
                  alternative: (movementAnalysis.speeds[i % movementAnalysis.speeds.length] || 50) + 10
                }));
              }
            }
            
            // Integrate real detection data with base analysis
            const analysis: PlayerAnalysis = {
              ...baseAnalysis,
              // Update with real data from detection
              confidence: detectionResult.confidence,
              movements: playerMovements,
              // Adjust performance metrics based on detection
              performance: {
                ...baseAnalysis.performance,
                physical: Math.round(
                  (baseAnalysis.performance.physical + detectionResult.confidence * 100) / 2
                )
              }
            };
            
            // 🆕 استدعاء واجهات البرمجة الخارجية لإثراء التحليل
            try {
              // محاولة استدعاء واجهة برمجة FIFA Opta
              const optaData = await apiProxyService.callOptaApi('players/statistics', {
                name: analysis.playerName,
                position: analysis.position
              }).catch(err => {
                console.log("تعذر استدعاء واجهة برمجة FIFA Opta:", err);
                return null;
              });
              
              if (optaData) {
                console.log("تم استلام بيانات FIFA Opta بنجاح:", optaData);
                // إثراء التحليل بالبيانات الجديدة إذا كانت متوفرة
                analysis.stats = {
                  ...analysis.stats,
                  ...optaData.stats
                };
              }
              
              // محاولة استدعاء واجهة برمجة Transfer Market
              const transferMarketData = await apiProxyService.callTransferMarketApi('players/market-value', {
                name: analysis.playerName
              }).catch(err => {
                console.log("تعذر استدعاء واجهة برمجة Transfer Market:", err);
                return null;
              });
              
              if (transferMarketData) {
                console.log("تم استلام بيانات Transfer Market بنجاح:", transferMarketData);
                // إضافة معلومات القيمة السوقية إذا كانت متوفرة
                analysis.marketData = transferMarketData;
              }
              
              // استدعاء خدمة المقارنة للحصول على لاعبين مشابهين
              const attributes = {
                pace: analysis.stats.pace || 70,
                shooting: analysis.stats.shooting || 65,
                passing: analysis.stats.passing || 68,
                dribbling: analysis.stats.dribbling || 72,
                defending: analysis.stats.defending || 60,
                physical: analysis.stats.physical || 75
              };
              
              const similarPlayers = await playerMLService.getSimilarPlayers(attributes, analysis.position);
              if (similarPlayers) {
                analysis.similarPlayers = similarPlayers.similarProfessionals;
              }
              
            } catch (error) {
              console.error("حدث خطأ أثناء استدعاء واجهات البرمجة الخارجية:", error);
            }
            
            // Cache the analysis result for future use
            analysisCache.set(videoHash, analysis);
            
            resolve({
              analysis: analysis,
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
        }, 1000);
      }
    }, 400);
  });
};

// Re-export the comparison service
export { compareWithPreviousAnalyses } from "./comparisonService";
