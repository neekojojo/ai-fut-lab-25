
// Mock service for AI football analysis
// In a real application, this would connect to OpenAI API

import { PlayerAnalysis } from "@/components/AnalysisReport";

// Mock analysis stages
export const ANALYSIS_STAGES = [
  "Uploading video",
  "Analyzing player movements",
  "Evaluating technical skills",
  "Assessing tactical awareness",
  "Analyzing physical attributes",
  "Calculating market value",
  "Generating comprehensive report"
];

// This function simulates the video processing and AI analysis
// In a production environment, this would call the OpenAI API
export const analyzeFootballVideo = (videoFile: File): Promise<{analysis: PlayerAnalysis, progressUpdates: (callback: (progress: number, stage: string) => void) => void}> => {
  return new Promise((resolve) => {
    let progress = 0;
    const progressCallbacks: ((progress: number, stage: string) => void)[] = [];
    
    // Simulate progress updates
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 5) + 1;
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
        setTimeout(() => {
          resolve({
            analysis: generateMockAnalysis(),
            progressUpdates: (callback) => {
              progressCallbacks.push(callback);
            }
          });
        }, 1000);
      }
    }, 600);
  });
};

// Generate mock analysis data
const generateMockAnalysis = (): PlayerAnalysis => {
  const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"];
  const strengths = [
    "Excellent ball control and dribbling ability",
    "Strong acceleration and sprint speed",
    "Accurate passing in tight spaces",
    "Good spatial awareness and positioning",
    "Effective at pressing and defensive transitions",
    "Powerful shot with both feet",
    "Exceptional aerial ability",
    "Leadership qualities on the field"
  ];
  
  const weaknesses = [
    "Needs to improve defensive workrate",
    "Tendency to hold onto the ball too long",
    "Limited weaker foot capabilities",
    "Occasionally loses focus during matches",
    "Could improve decision making under pressure",
    "Injury prone due to playing style",
    "Needs better stamina for full 90 minutes"
  ];
  
  const recommendations = [
    "Focus on improving stamina with high-intensity interval training",
    "Work on weaker foot finishing exercises daily",
    "Develop better defensive positioning through tactical training sessions",
    "Practice decision-making in pressured situations with game simulations",
    "Add strength training to reduce injury susceptibility"
  ];
  
  // Randomize scores within reasonable ranges
  const technicalScore = Math.floor(Math.random() * 30) + 60; // 60-90
  const physicalScore = Math.floor(Math.random() * 30) + 60; // 60-90
  const tacticalScore = Math.floor(Math.random() * 30) + 60; // 60-90
  const mentalScore = Math.floor(Math.random() * 30) + 60; // 60-90
  
  // Calculate overall talent score based on the averages
  const talentScore = Math.floor(
    (technicalScore + physicalScore + tacticalScore + mentalScore) / 4
  );
  
  // Generate random market value between €500K and €50M
  const marketValueBase = Math.floor(Math.random() * 495) + 5; // 5-500
  const marketValueUnit = marketValueBase >= 100 ? 'M' : 'K';
  const marketValue = marketValueBase >= 100 
    ? `€${(marketValueBase / 10).toFixed(1)}M` 
    : `€${marketValueBase}0K`;
  
  // Randomly select 3-5 strengths and 2-4 weaknesses
  const shuffledStrengths = [...strengths].sort(() => 0.5 - Math.random());
  const shuffledWeaknesses = [...weaknesses].sort(() => 0.5 - Math.random());
  const shuffledRecommendations = [...recommendations].sort(() => 0.5 - Math.random());
  
  const selectedStrengths = shuffledStrengths.slice(0, Math.floor(Math.random() * 3) + 3);
  const selectedWeaknesses = shuffledWeaknesses.slice(0, Math.floor(Math.random() * 3) + 2);
  const selectedRecommendations = shuffledRecommendations.slice(0, Math.floor(Math.random() * 2) + 3);
  
  return {
    playerName: "John Doe", // In a real app, we would detect or ask for the player's name
    position: positions[Math.floor(Math.random() * positions.length)],
    marketValue,
    talentScore,
    strengths: selectedStrengths,
    weaknesses: selectedWeaknesses,
    performance: {
      technical: technicalScore,
      physical: physicalScore,
      tactical: tacticalScore,
      mental: mentalScore
    },
    recommendations: selectedRecommendations,
    compatibilityScore: Math.floor(Math.random() * 30) + 65 // 65-95
  };
};
