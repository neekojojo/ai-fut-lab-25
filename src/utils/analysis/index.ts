
import type { PlayerAnalysis } from "@/components/AnalysisReport.d";
import { ANALYSIS_STAGES } from "./constants";
import { generateEnhancedAnalysis } from "./analysisMockGenerator";
import { compareWithPreviousAnalyses } from "./comparisonService";
import { playerMLService } from "@/utils/ml/playerMLService";
import { apiProxyService } from "@/services/apiProxyService";

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
        setTimeout(async () => {
          const analysis = generateEnhancedAnalysis();
          
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
          
          resolve({
            analysis: analysis,
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
