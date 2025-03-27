
import type { PlayerAnalysis } from "@/components/AnalysisReport.d";
import { PROFESSIONAL_PLAYERS } from "./constants";
import { generateInjuryRiskAssessment } from "./injuryRiskAnalysis";
import { determineEarnedBadges } from "./badgeService";

// Generate mock analysis data with enhanced details
export const generateEnhancedAnalysis = (): PlayerAnalysis => {
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
    id: "mock-analysis-" + Math.random().toString(36).substring(2, 9),
    playerName: "John Doe", // In a real app, we would detect or ask for the player's name
    position,
    timestamp: new Date().toISOString(),
    duration: 120, // 2 minutes analysis
    confidence: 0.85,
    marketValue,
    talentScore,
    stats: {
      pace: physicalScore,
      shooting: technicalScore - 5,
      passing: technicalScore + 5,
      dribbling: technicalScore,
      defending: tacticalScore,
      physical: physicalScore,
      stamina: physicalScore + 5,
      acceleration: physicalScore - 5,
      agility: physicalScore,
      balance: physicalScore - 3,
      ballControl: technicalScore + 2,
      decision: mentalScore,
      anticipation: mentalScore - 2,
      positioning: tacticalScore + 2,
      vision: mentalScore + 5,
      composure: mentalScore
    },
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
    },
    summary: "Player shows promising skills and attributes for their position.",
    advancedInsights: ["Good movement off the ball", "Strong spatial awareness"],
    movements: [],
    passes: [],
    heatmap: [],
    performanceScore: talentScore
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
