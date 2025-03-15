
// Constants for football analysis

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

// Enhanced player comparison data
export const PROFESSIONAL_PLAYERS = [
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
export const AVAILABLE_BADGES = [
  {
    name: "Technical Genius",
    description: "Exceptional technical skills detected",
    level: "gold" as const,
    unlockCondition: (analysis: any) => analysis.performance.technical > 85
  },
  {
    name: "Physical Beast",
    description: "Outstanding physical attributes",
    level: "gold" as const,
    unlockCondition: (analysis: any) => analysis.performance.physical > 85
  },
  {
    name: "Tactical Mastermind",
    description: "Superior tactical understanding of the game",
    level: "gold" as const,
    unlockCondition: (analysis: any) => analysis.performance.tactical > 85
  },
  {
    name: "Mental Fortitude",
    description: "Exceptional mental strength and focus",
    level: "gold" as const,
    unlockCondition: (analysis: any) => analysis.performance.mental > 85
  },
  {
    name: "Rising Star",
    description: "High potential detected in analysis",
    level: "silver" as const,
    unlockCondition: (analysis: any) => analysis.talentScore > 80
  },
  {
    name: "Pro Potential",
    description: "Performance comparable to professional players",
    level: "silver" as const,
    unlockCondition: (analysis: any) => analysis.compatibilityScore > 80
  },
  {
    name: "Skillful Player",
    description: "Good all-around playing abilities",
    level: "bronze" as const,
    unlockCondition: (analysis: any) => analysis.talentScore > 70
  },
  {
    name: "Team Player",
    description: "Great awareness of teammates and positioning",
    level: "bronze" as const,
    unlockCondition: (analysis: any) => analysis.performance.tactical > 70
  }
];
