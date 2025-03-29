import { DetectionResult } from './types';
import { IdentifiedPlayer, IdentifiedTeam } from './playerIdentification';
import { getCombinedPlayerIdentification, getCombinedTeamIdentification } from './kaggle';
import { extractFramesAtTimestamps } from './frameExtraction';
import * as faceapi from 'face-api.js';

// Create a deterministic hash for the player identification based on detection results
const createPlayerIdentificationHash = (detectionResult: DetectionResult): string => {
  const playerPositions = detectionResult.playerPositions;
  // Take a sample of player positions for consistent hashing
  const positionSample = playerPositions.slice(0, Math.min(3, playerPositions.length));
  
  // Create a string representation of the sample
  const positionStr = positionSample.map(pos => {
    // Use only stable properties for the hash
    const x = pos.bbox?.x || 0;
    const y = pos.bbox?.y || 0;
    return `${pos.frameNumber}-${x.toFixed(0)}-${y.toFixed(0)}`;
  }).join('|');
  
  return positionStr;
};

// Cache for player identification results
const playerIdentificationCache = new Map<string, {
  players: IdentifiedPlayer[],
  teams: IdentifiedTeam[]
}>();

// Main function to identify players with deterministic results
export const identifyPlayersInDetectionResult = async (
  detectionResult: DetectionResult,
  videoFile: File
): Promise<{
  players: IdentifiedPlayer[],
  teams: IdentifiedTeam[]
}> => {
  // Create a deterministic hash for this specific detection result
  const identificationHash = createPlayerIdentificationHash(detectionResult);
  const videoHash = `${videoFile.name}-${videoFile.size}`;
  const cacheKey = `${videoHash}-${identificationHash}`;
  
  // Check cache first
  if (playerIdentificationCache.has(cacheKey)) {
    console.log("Using cached player identification results");
    return playerIdentificationCache.get(cacheKey)!;
  }
  
  // 1. Extract a frame from the video for image analysis using face recognition
  const frames = await extractFramesAtTimestamps(videoFile, [5]); // Extract frame at 5 seconds
  const frameData = frames.length > 0 ? new Uint8Array(frames[0].data.data.buffer) : new Uint8Array();
  
  console.log(`استخراج إطار من الفيديو للتعرف على اللاعبين: ${frameData.byteLength} بايت`);
  
  // 2. Get identified players from different data sources
  let identifiedPlayers = await getCombinedPlayerIdentification(detectionResult);
  let identifiedTeams = await getCombinedTeamIdentification(detectionResult);
  
  console.log(`تم تحديد ${identifiedPlayers.length} لاعبين و ${identifiedTeams.length} فرق من البيانات الأساسية`);
  
  // 3. Sort players and teams by confidence score for consistent ordering
  identifiedPlayers.sort((a, b) => {
    // First sort by confidence score (high to low)
    if (b.confidenceScore !== a.confidenceScore) {
      return b.confidenceScore - a.confidenceScore;
    }
    // Then by name (alphabetically) for consistent tie-breaking
    return a.name.localeCompare(b.name);
  });
  
  identifiedTeams.sort((a, b) => {
    // First sort by confidence score (high to low)
    if (b.confidenceScore !== a.confidenceScore) {
      return b.confidenceScore - a.confidenceScore;
    }
    // Then by name (alphabetically) for consistent tie-breaking
    return a.name.localeCompare(b.name);
  });
  
  // Cache the results
  const result = { players: identifiedPlayers, teams: identifiedTeams };
  playerIdentificationCache.set(cacheKey, result);
  
  return result;
};

// Also make search functions deterministic by using consistent sorting
export const searchPlayersByName = async (
  name: string,
  limit: number = 5
): Promise<IdentifiedPlayer[]> => {
  // استخدام الدالة المعرفة مسبقًا للبحث عن اللاعبين في قاعدة بيانات Kaggle
  const kaggleResults = await import('./kaggle/playerDataConverters')
    .then(module => module.searchKagglePlayersByName(name))
    .catch(() => []);
  
  // Sort results deterministically
  return kaggleResults
    .sort((a, b) => {
      // Calculate exact match score (1 if exact match, 0 otherwise)
      const aExactMatch = a.name.toLowerCase() === name.toLowerCase() ? 1 : 0;
      const bExactMatch = b.name.toLowerCase() === name.toLowerCase() ? 1 : 0;
      
      // First sort by exact match
      if (aExactMatch !== bExactMatch) {
        return bExactMatch - aExactMatch;
      }
      
      // Then by whether name is contained
      const aContains = a.name.toLowerCase().includes(name.toLowerCase()) ? 1 : 0;
      const bContains = b.name.toLowerCase().includes(name.toLowerCase()) ? 1 : 0;
      
      if (aContains !== bContains) {
        return bContains - aContains;
      }
      
      // Then by confidence score
      if (b.confidenceScore !== a.confidenceScore) {
        return b.confidenceScore - a.confidenceScore;
      }
      
      // Finally alphabetically for consistent results
      return a.name.localeCompare(b.name);
    })
    .slice(0, limit);
};

// Make team search deterministic using the same pattern
export const searchTeamsByName = async (
  name: string,
  limit: number = 5
): Promise<IdentifiedTeam[]> => {
  // استخدام الدالة المعرفة مسبقًا للبحث عن الفرق في قاعدة بيانات Kaggle
  const kaggleResults = await import('./kaggle/teamDataConverters')
    .then(module => module.searchKaggleTeamsByName(name))
    .catch(() => []);
  
  // Sort results deterministically
  return kaggleResults
    .sort((a, b) => {
      // Use the same deterministic sorting logic as in searchPlayersByName
      const aExactMatch = a.name.toLowerCase() === name.toLowerCase() ? 1 : 0;
      const bExactMatch = b.name.toLowerCase() === name.toLowerCase() ? 1 : 0;
      
      if (aExactMatch !== bExactMatch) {
        return bExactMatch - aExactMatch;
      }
      
      const aContains = a.name.toLowerCase().includes(name.toLowerCase()) ? 1 : 0;
      const bContains = b.name.toLowerCase().includes(name.toLowerCase()) ? 1 : 0;
      
      if (aContains !== bContains) {
        return bContains - aContains;
      }
      
      if (b.confidenceScore !== a.confidenceScore) {
        return b.confidenceScore - a.confidenceScore;
      }
      
      return a.name.localeCompare(b.name);
    })
    .slice(0, limit);
};
