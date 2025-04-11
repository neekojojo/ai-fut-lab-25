
import { DetectionResult } from './types';

export const analyzePlayerEyeMovement = async (videoFile: File): Promise<any> => {
  console.log("Analyzing eye movements in video:", videoFile.name);
  
  // Create deterministic yet randomized eye movement data based on video properties
  const fileSize = videoFile.size;
  const fileName = videoFile.name;
  
  // Use file properties to create deterministic "random" values
  const seed = fileSize % 1000;
  const fieldAwareness = 65 + (seed % 30);
  const decisionSpeed = 60 + ((seed * 17) % 35);
  const anticipation = 70 + ((seed * 13) % 25);
  
  // Simulate eye tracking analysis
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    fieldAwarenessScore: fieldAwareness,
    decisionSpeed: decisionSpeed,
    anticipationScore: anticipation,
    fixationCount: Math.floor(fileSize / 100000) + 15,
    averageFixationDuration: 250 + (seed % 150),
    sacadeVelocity: 400 + (seed % 200),
    focusPoints: [
      { x: 0.3, y: 0.4, duration: 450, intensity: 0.8 },
      { x: 0.7, y: 0.6, duration: 300, intensity: 0.7 },
      { x: 0.5, y: 0.2, duration: 500, intensity: 0.9 }
    ],
    rawData: null
  };
};

