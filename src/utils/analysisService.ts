// Mock service for AI football analysis
// In a real application, this would connect to OpenAI API

import { PlayerAnalysis } from "@/components/AnalysisReport.d";

// Enhanced analysis stages for more detailed feedback
export const ANALYSIS_STAGES = [
  "Uploading video",
  "Analyzing player movements",
  "Evaluating technical skills",
  "Assessing tactical awareness",
  "Analyzing physical attributes",
  "Predicting injury risks",
  "Calculating market value",
  "Comparing with professionals",
  "Generating badges and achievements",
  "Generating comprehensive report"
];

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
        setTimeout(() => {
          resolve({
            analysis: generateEnhancedAnalysis(),
            progressUpdates: (callback) => {
              progressCallbacks.push(callback);
            }
          });
        }, 1000);
      }
    }, 400); // Reduced from 600ms to 400ms for faster processing
  });
};

// Enhanced player comparison data
const PROFESSIONAL_PLAYERS = [
  {
    name: "Lionel Messi",
    position: "Forward",
    skills: {
      dribbling: 98,
      passing: 96,
      shooting: 94,
      speed: 85,
      stamina: 75
    }
  },
  {
    name: "Cristiano Ronaldo",
    position: "Forward",
    skills: {
      dribbling: 89,
      passing: 83,
      shooting: 95,
      speed: 89,
      stamina: 94
    }
  },
  {
    name: "Kevin De Bruyne",
    position: "Midfielder",
    skills: {
      dribbling: 88,
      passing: 97,
      shooting: 90,
      speed: 76,
      stamina: 87
    }
  },
  {
    name: "Virgil van Dijk",
    position: "Defender",
    skills: {
      dribbling: 72,
      passing: 85,
      shooting: 60,
      speed: 83,
      stamina: 90
    }
  },
  {
    name: "Alisson Becker",
    position: "Goalkeeper",
    skills: {
      reflexes: 93,
      positioning: 94,
      handling: 91,
      passing: 87,
      command: 92
    }
  }
];

// Possible badges that can be earned
const AVAILABLE_BADGES = [
  {
    name: "Technical Genius",
    description: "Exceptional technical skills detected",
    level: "gold" as const,
    unlockCondition: (analysis: PlayerAnalysis) => analysis.performance.technical > 85
  },
  {
    name: "Physical Beast",
    description: "Outstanding physical attributes",
    level: "gold" as const,
    unlockCondition: (analysis: PlayerAnalysis) => analysis.performance.physical > 85
  },
  {
    name: "Tactical Mastermind",
    description: "Superior tactical understanding of the game",
    level: "gold" as const,
    unlockCondition: (analysis: PlayerAnalysis) => analysis.performance.tactical > 85
  },
  {
    name: "Mental Fortitude",
    description: "Exceptional mental strength and focus",
    level: "gold" as const,
    unlockCondition: (analysis: PlayerAnalysis) => analysis.performance.mental > 85
  },
  {
    name: "Rising Star",
    description: "High potential detected in analysis",
    level: "silver" as const,
    unlockCondition: (analysis: PlayerAnalysis) => analysis.talentScore > 80
  },
  {
    name: "Pro Potential",
    description: "Performance comparable to professional players",
    level: "silver" as const,
    unlockCondition: (analysis: PlayerAnalysis) => analysis.compatibilityScore > 80
  },
  {
    name: "Skillful Player",
    description: "Good all-around playing abilities",
    level: "bronze" as const,
    unlockCondition: (analysis: PlayerAnalysis) => analysis.talentScore > 70
  },
  {
    name: "Team Player",
    description: "Great awareness of teammates and positioning",
    level: "bronze" as const,
    unlockCondition: (analysis: PlayerAnalysis) => analysis.performance.tactical > 70
  }
];

// Function to generate injury risk assessment
const generateInjuryRiskAssessment = (position: string, physicalScore: number): PlayerAnalysis["injuryRisk"] => {
  // Calculate overall risk (lower physical score = higher risk)
  const overallRisk = Math.max(10, 100 - physicalScore - Math.random() * 20);
  
  // Position-specific injury areas
  const forwardAreas = [
    { name: "Hamstrings", risk: Math.random() * 40 + 30, recommendation: "Focus on hamstring flexibility and strength exercises" },
    { name: "Ankles", risk: Math.random() * 30 + 20, recommendation: "Incorporate balance training to strengthen ankle stability" },
    { name: "Knees", risk: Math.random() * 30 + 20, recommendation: "Add knee stabilization exercises to your routine" }
  ];
  
  const midfielderAreas = [
    { name: "Calves", risk: Math.random() * 40 + 30, recommendation: "Regular calf stretching and strengthening" },
    { name: "Groin", risk: Math.random() * 30 + 20, recommendation: "Include adductor stretches and strength training" },
    { name: "Lower back", risk: Math.random() * 30 + 20, recommendation: "Core stability exercises to protect lower back" }
  ];
  
  const defenderAreas = [
    { name: "Knees", risk: Math.random() * 40 + 30, recommendation: "Focus on landing mechanics and knee stability exercises" },
    { name: "Shoulders", risk: Math.random() * 30 + 20, recommendation: "Incorporate upper body and rotator cuff strength work" },
    { name: "Ankles", risk: Math.random() * 30 + 20, recommendation: "Regular proprioception training for ankle stability" }
  ];
  
  const goalkeeperAreas = [
    { name: "Shoulders", risk: Math.random() * 40 + 30, recommendation: "Rotator cuff strengthening and mobility exercises" },
    { name: "Wrists", risk: Math.random() * 30 + 20, recommendation: "Wrist strengthening and flexibility exercises" },
    { name: "Lower back", risk: Math.random() * 30 + 20, recommendation: "Core stability to protect the lower back during dives" }
  ];
  
  // Select appropriate areas based on position
  let areas;
  if (position === "Forward") areas = forwardAreas;
  else if (position === "Midfielder") areas = midfielderAreas;
  else if (position === "Defender") areas = defenderAreas;
  else areas = goalkeeperAreas;
  
  // Sort areas by risk (highest first)
  areas.sort((a, b) => b.risk - a.risk);
  
  return {
    overall: overallRisk,
    areas
  };
};

// Function to determine earned badges based on analysis
const determineEarnedBadges = (analysis: PlayerAnalysis) => {
  return AVAILABLE_BADGES
    .filter(badge => badge.unlockCondition(analysis))
    .map(({ name, description, level }) => ({ name, description, level }));
};

// Generate mock analysis data with enhanced details
const generateEnhancedAnalysis = (): PlayerAnalysis => {
  const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"];
  const position = positions[Math.floor(Math.random() * positions.length)];
  
  // Detailed strengths based on position
  const forwardStrengths = [
    "Excellent finishing ability in one-on-one situations",
    "Great movement off the ball to create space",
    "Strong acceleration in the first 5 meters",
    "Powerful shot with minimal backlift",
    "Effective pressing from the front",
    "Creative dribbling in tight spaces",
    "Excellent aerial ability on attacking set pieces"
  ];
  
  const midfielderStrengths = [
    "Exceptional vision for through balls",
    "Consistent passing accuracy over long distances",
    "Effective at switching play to the opposite flank",
    "Good spatial awareness in congested midfield areas",
    "Strong at winning second balls",
    "Intelligent positioning to receive passes between lines",
    "Effective at delayed pressing to channel opponents"
  ];
  
  const defenderStrengths = [
    "Strong in aerial duels from defensive set pieces",
    "Excellent timing in tackles",
    "Good positional awareness to cut passing lanes",
    "Strong communication and organization of defensive line",
    "Effective at stepping out to intercept passes",
    "Good recovery pace to deal with counter-attacks",
    "Accurate long-range passing to initiate attacks"
  ];
  
  const goalkeeperStrengths = [
    "Quick reflexes for close-range shots",
    "Excellent positioning to narrow shooting angles",
    "Strong command of the penalty area",
    "Good distribution with both hands and feet",
    "Effective communication with the defense",
    "Brave in one-on-one situations",
    "Strong decision-making on when to leave the line"
  ];
  
  // Select position-specific strengths
  let positionStrengths;
  if (position === "Forward") positionStrengths = forwardStrengths;
  else if (position === "Midfielder") positionStrengths = midfielderStrengths;
  else if (position === "Defender") positionStrengths = defenderStrengths;
  else positionStrengths = goalkeeperStrengths;
  
  // Position-specific weaknesses
  const forwardWeaknesses = [
    "Sometimes wasteful with scoring opportunities",
    "Needs to improve defensive work rate when team loses possession",
    "Tendency to drift offside too frequently",
    "Limited aerial ability when defending set pieces",
    "Could improve link-up play with midfielders"
  ];
  
  const midfielderWeaknesses = [
    "Occasionally loses concentration during defensive transitions",
    "Could improve decision-making in the final third",
    "Needs to scan surroundings more frequently before receiving passes",
    "Inconsistent in defensive duels",
    "Stamina decreases noticeably in the final 15 minutes"
  ];
  
  const defenderWeaknesses = [
    "Occasionally gets dragged out of position",
    "Needs to improve decision-making under pressure",
    "Limited attacking contribution from set pieces",
    "Sometimes struggles against highly technical dribblers",
    "Could improve distribution under pressure"
  ];
  
  const goalkeeperWeaknesses = [
    "Sometimes hesitant when coming for crosses",
    "Distribution under pressure needs improvement",
    "Positioning for shots from distance could be better",
    "Occasionally slow to get down for low shots",
    "Command of penalty area inconsistent in crowded situations"
  ];
  
  // Select position-specific weaknesses
  let positionWeaknesses;
  if (position === "Forward") positionWeaknesses = forwardWeaknesses;
  else if (position === "Midfielder") positionWeaknesses = midfielderWeaknesses;
  else if (position === "Defender") positionWeaknesses = defenderWeaknesses;
  else positionWeaknesses = goalkeeperWeaknesses;
  
  // Position-specific recommendations
  const forwardRecommendations = [
    "Work on finishing drills from different angles and distances",
    "Practice quick changes of direction with the ball",
    "Develop awareness of defensive positioning when team loses possession",
    "Improve timing of runs to avoid offside situations",
    "Focus on link-up play in tight spaces"
  ];
  
  const midfielderRecommendations = [
    "Practice scanning before receiving passes with 'shoulder checks'",
    "Work on quick transition from defense to attack",
    "Develop set-piece delivery from different positions",
    "Improve defensive positioning during opposition counter-attacks",
    "Focus on high-intensity interval training to maintain stamina"
  ];
  
  const defenderRecommendations = [
    "Practice one-vs-one defensive situations with quick forwards",
    "Work on building attacks from the back under pressure",
    "Develop better communication with defensive partners",
    "Improve timing of challenges in different situations",
    "Focus on positional awareness during defensive transitions"
  ];
  
  const goalkeeperRecommendations = [
    "Practice claiming crosses in crowded penalty areas",
    "Work on distribution under pressure",
    "Develop quicker reactions for close-range shots",
    "Improve communication with the defense for set pieces",
    "Focus on positioning for shots from distance"
  ];
  
  // Select position-specific recommendations
  let positionRecommendations;
  if (position === "Forward") positionRecommendations = forwardRecommendations;
  else if (position === "Midfielder") positionRecommendations = midfielderRecommendations;
  else if (position === "Defender") positionRecommendations = defenderRecommendations;
  else positionRecommendations = goalkeeperRecommendations;
  
  // Position-specific detailed skills
  const skillsByPosition = {
    "Forward": {
      finishing: Math.floor(Math.random() * 30) + 60,
      dribbling: Math.floor(Math.random() * 30) + 60,
      movement: Math.floor(Math.random() * 30) + 60,
      pace: Math.floor(Math.random() * 30) + 60,
      strength: Math.floor(Math.random() * 30) + 60
    },
    "Midfielder": {
      passing: Math.floor(Math.random() * 30) + 60,
      vision: Math.floor(Math.random() * 30) + 60,
      technique: Math.floor(Math.random() * 30) + 60,
      workRate: Math.floor(Math.random() * 30) + 60,
      positioning: Math.floor(Math.random() * 30) + 60
    },
    "Defender": {
      tackling: Math.floor(Math.random() * 30) + 60,
      marking: Math.floor(Math.random() * 30) + 60,
      aerial: Math.floor(Math.random() * 30) + 60,
      positioning: Math.floor(Math.random() * 30) + 60,
      strength: Math.floor(Math.random() * 30) + 60
    },
    "Goalkeeper": {
      reflexes: Math.floor(Math.random() * 30) + 60,
      handling: Math.floor(Math.random() * 30) + 60,
      positioning: Math.floor(Math.random() * 30) + 60,
      communication: Math.floor(Math.random() * 30) + 60,
      distribution: Math.floor(Math.random() * 30) + 60
    }
  };
  
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
  
  // Find a comparable professional player
  const comparablePro = PROFESSIONAL_PLAYERS.find(player => player.position === position) || PROFESSIONAL_PLAYERS[0];
  
  // Randomly select 3-5 strengths and 2-4 weaknesses
  const shuffledStrengths = [...positionStrengths].sort(() => 0.5 - Math.random());
  const shuffledWeaknesses = [...positionWeaknesses].sort(() => 0.5 - Math.random());
  const shuffledRecommendations = [...positionRecommendations].sort(() => 0.5 - Math.random());
  
  const selectedStrengths = shuffledStrengths.slice(0, Math.floor(Math.random() * 3) + 3);
  const selectedWeaknesses = shuffledWeaknesses.slice(0, Math.floor(Math.random() * 3) + 2);
  const selectedRecommendations = shuffledRecommendations.slice(0, Math.floor(Math.random() * 2) + 3);
  
  // Generate base analysis
  const analysis: PlayerAnalysis = {
    playerName: "John Doe", // In a real app, we would detect or ask for the player's name
    position,
    marketValue,
    talentScore,
    strengths: selectedStrengths,
    weaknesses: selectedWeaknesses,
    detailedSkills: skillsByPosition[position],
    performance: {
      technical: technicalScore,
      physical: physicalScore,
      tactical: tacticalScore,
      mental: mentalScore
    },
    recommendations: selectedRecommendations,
    compatibilityScore: Math.floor(Math.random() * 30) + 65, // 65-95
    proComparison: {
      name: comparablePro.name,
      similarity: Math.floor(Math.random() * 30) + 40, // 40-70% similarity
      skills: comparablePro.skills
    }
  };
  
  // Add injury risk assessment
  const injuryRisk = generateInjuryRiskAssessment(position, physicalScore);
  
  // Determine earned badges
  const badges = determineEarnedBadges(analysis);
  
  // Add progress tracking (simulated)
  const progress = {
    lastAnalysis: new Date(),
    improvement: Math.floor(Math.random() * 15) + 1, // 1-15% improvement
    areas: [
      {
        skill: "Technical",
        before: technicalScore - Math.floor(Math.random() * 10),
        after: technicalScore
      },
      {
        skill: "Physical",
        before: physicalScore - Math.floor(Math.random() * 10),
        after: physicalScore
      },
      {
        skill: "Tactical",
        before: tacticalScore - Math.floor(Math.random() * 10),
        after: tacticalScore
      }
    ]
  };
  
  // Return the complete enhanced analysis
  return {
    ...analysis,
    injuryRisk,
    badges,
    progress
  };
};

// Function to compare with previous analyses
export const compareWithPreviousAnalyses = (currentAnalysis: PlayerAnalysis, previousAnalyses: PlayerAnalysis[]): any => {
  if (previousAnalyses.length === 0) return null;
  
  // Calculate average improvement
  const improvementAreas: Record<string, number> = {};
  
  // Compare technical scores
  improvementAreas.technical = currentAnalysis.performance.technical - 
    previousAnalyses.reduce((sum, analysis) => sum + analysis.performance.technical, 0) / previousAnalyses.length;
  
  // Compare physical scores
  improvementAreas.physical = currentAnalysis.performance.physical - 
    previousAnalyses.reduce((sum, analysis) => sum + analysis.performance.physical, 0) / previousAnalyses.length;
  
  // Compare tactical scores
  improvementAreas.tactical = currentAnalysis.performance.tactical - 
    previousAnalyses.reduce((sum, analysis) => sum + analysis.performance.tactical, 0) / previousAnalyses.length;
  
  // Compare mental scores
  improvementAreas.mental = currentAnalysis.performance.mental - 
    previousAnalyses.reduce((sum, analysis) => sum + analysis.performance.mental, 0) / previousAnalyses.length;
  
  // Calculate overall improvement
  const overallImprovement = (improvementAreas.technical + improvementAreas.physical + 
    improvementAreas.tactical + improvementAreas.mental) / 4;
  
  return {
    overallImprovement,
    improvementAreas
  };
};
