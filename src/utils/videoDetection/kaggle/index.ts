
// Export types
export * from './types';

// Export mock data
export { 
  kagglePlayerDatabase, 
  kaggleTeamDatabase, 
  sportsVideoAnalysisDatabase 
} from './mockData';

// Export player data converters
export {
  convertKaggleToIdentifiedPlayer,
  searchKagglePlayersByName,
  identifyPlayerFromKaggle
} from './playerDataConverters';

// Export team data converters
export {
  searchKaggleTeamsByName,
  identifyTeamFromKaggle
} from './teamDataConverters';

// Export video analysis functions
export {
  getSportsVideoAnalysisDataByPlayerId,
  getSportsVideoAnalysisByPlayerName,
  getSportsVideoAnalysisByTeam,
  analyzePlayerMovementFromVideoData,
  analyzePlayerFromVideoDatasets,
  findVideoAnalysisByPlayerName,
  findVideoAnalysisByTeamName
} from './videoAnalysis';

// Combined data identification functions
import { DetectionResult } from '../types';
import { IdentifiedPlayer, IdentifiedTeam } from '../playerIdentification';
import { identifyPlayerFromKaggle } from './playerDataConverters';
import { identifyTeamFromKaggle } from './teamDataConverters';

/**
 * دالة تجمع بين مصادر البيانات المختلفة للحصول على أفضل النتائج
 */
export const getCombinedPlayerIdentification = (result: DetectionResult): IdentifiedPlayer[] => {
  // الحصول على النتائج من قواعد البيانات المختلفة
  const kaggleResults = identifyPlayerFromKaggle(result);
  
  // يمكن أن نضيف مزيداً من مصادر البيانات هنا في المستقبل
  
  // دمج النتائج، مع إزالة التكرارات المحتملة
  return kaggleResults;
};

/**
 * دالة تجمع بين مصادر البيانات المختلفة للفرق للحصول على أفضل النتائج
 */
export const getCombinedTeamIdentification = (result: DetectionResult): IdentifiedTeam[] => {
  // الحصول على النتائج من قواعد البيانات المختلفة
  const kaggleResults = identifyTeamFromKaggle(result);
  
  // يمكن أن نضيف مزيداً من مصادر البيانات هنا في المستقبل
  
  // دمج النتائج، مع إزالة التكرارات المحتملة
  return kaggleResults;
};
