
import { VideoAnalysisResult } from '../playerIdentification';
import { sportsVideoAnalysisDatabase } from './mockData';
import { PlayerMovementAnalysis } from './types';

/**
 * البحث عن بيانات تحليل فيديو رياضي استناداً إلى معرف اللاعب
 */
export const getSportsVideoAnalysisDataByPlayerId = (playerId: string) => {
  return sportsVideoAnalysisDatabase.filter(data => data.player_id === playerId);
};

/**
 * البحث عن بيانات تحليل فيديو رياضي استناداً إلى اسم اللاعب
 */
export const getSportsVideoAnalysisByPlayerName = (playerName: string) => {
  return sportsVideoAnalysisDatabase.filter(data => 
    data.player_name.toLowerCase().includes(playerName.toLowerCase())
  );
};

/**
 * البحث عن بيانات تحليل فيديو رياضي استناداً إلى اسم الفريق
 */
export const getSportsVideoAnalysisByTeam = (teamName: string) => {
  return sportsVideoAnalysisDatabase.filter(data => 
    data.team_name.toLowerCase().includes(teamName.toLowerCase())
  );
};

/**
 * تحليل حركة اللاعب باستخدام بيانات تحليل الفيديو الرياضي
 */
export const analyzePlayerMovementFromVideoData = (playerId: string): PlayerMovementAnalysis => {
  const playerData = getSportsVideoAnalysisDataByPlayerId(playerId);
  
  if (playerData.length === 0) {
    return {
      avgSpeed: 0,
      successRate: 0,
      confidenceScore: 0,
      events: []
    };
  }
  
  // حساب متوسط السرعة
  const avgSpeed = playerData.reduce((sum, data) => sum + data.movement_speed, 0) / playerData.length;
  
  // حساب متوسط معدل النجاح
  const avgSuccessRate = playerData.reduce((sum, data) => sum + data.success_rate, 0) / playerData.length;
  
  // حساب متوسط مستوى الثقة
  const avgConfidence = playerData.reduce((sum, data) => sum + data.confidence_score, 0) / playerData.length;
  
  // تجميع الأحداث وعددها
  const eventCounts: Record<string, number> = {};
  playerData.forEach(data => {
    if (eventCounts[data.event_type]) {
      eventCounts[data.event_type]++;
    } else {
      eventCounts[data.event_type] = 1;
    }
  });
  
  const events = Object.entries(eventCounts).map(([type, count]) => ({ type, count }));
  
  return {
    avgSpeed,
    successRate: avgSuccessRate,
    confidenceScore: avgConfidence,
    events
  };
};

/**
 * تحليل بيانات اللاعب من مجموعات بيانات تحليل الفيديو
 */
export const analyzePlayerFromVideoDatasets = (playerId: string): VideoAnalysisResult | null => {
  const playerData = getSportsVideoAnalysisDataByPlayerId(playerId);
  
  if (playerData.length === 0) {
    return null;
  }
  
  const analysis = analyzePlayerMovementFromVideoData(playerId);
  const firstPlayerData = playerData[0];
  
  return {
    playerId: firstPlayerData.player_id,
    playerName: firstPlayerData.player_name,
    teamName: firstPlayerData.team_name,
    movement: {
      avgSpeed: analysis.avgSpeed,
      successRate: analysis.successRate,
      confidenceScore: analysis.confidenceScore
    },
    events: analysis.events
  };
};

/**
 * البحث عن بيانات تحليل الفيديو حسب اسم اللاعب
 */
export const findVideoAnalysisByPlayerName = (playerName: string): VideoAnalysisResult[] => {
  const playerDataList = getSportsVideoAnalysisByPlayerName(playerName);
  const uniquePlayerIds = [...new Set(playerDataList.map(data => data.player_id))];
  
  return uniquePlayerIds
    .map(playerId => analyzePlayerFromVideoDatasets(playerId))
    .filter((result): result is VideoAnalysisResult => result !== null);
};

/**
 * البحث عن بيانات تحليل الفيديو حسب اسم الفريق
 */
export const findVideoAnalysisByTeamName = (teamName: string): VideoAnalysisResult[] => {
  const teamDataList = getSportsVideoAnalysisByTeam(teamName);
  const uniquePlayerIds = [...new Set(teamDataList.map(data => data.player_id))];
  
  return uniquePlayerIds
    .map(playerId => analyzePlayerFromVideoDatasets(playerId))
    .filter((result): result is VideoAnalysisResult => result !== null);
};
