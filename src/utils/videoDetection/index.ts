
export const analyzePlayerEyeMovement = async (videoFile: any) => {
  // Mock implementation
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    scanFrequency: 12.4, // scans per minute
    focusTime: 0.35, // seconds
    peripheralAwareness: 85,
    targetIdentification: 88,
    fieldAwarenessScore: 82.5,
    decisionSpeed: 86.2,
    anticipationScore: 78.9,
    visualScanFrequency: 12.4,
    fixationDuration: 0.35
  };
};

// Re-export functions from videoDetection.ts
export * from '../videoDetection';
