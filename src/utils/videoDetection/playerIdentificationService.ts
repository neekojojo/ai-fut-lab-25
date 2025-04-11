
import { identifyPlayersInDetectionResult } from './playerIdentifier';

export const identifyPlayer = async (videoFile: File) => {
  console.log("Identifying player in video:", videoFile.name);
  
  // Mock detection result
  const mockDetectionResult = {
    count: 1,
    confidence: 0.85,
    frameResults: [],
    playerPositions: []
  };
  
  // Get player identification using the identifier service
  const identification = await identifyPlayersInDetectionResult(mockDetectionResult, videoFile);
  
  // Return the first player from the results, or a default if none found
  if (identification.players.length > 0) {
    const player = identification.players[0];
    return {
      id: player.id,
      name: player.name,
      confidence: player.confidenceScore
    };
  }
  
  return {
    id: "player-1",
    name: "Player 1",
    confidence: 0.85
  };
};
