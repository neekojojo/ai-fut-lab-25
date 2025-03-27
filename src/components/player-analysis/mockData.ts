import { PlayerStats } from '@/utils/dataProcessing/playerAnalysisTypes';
import { PlayerComparison, TrainingRecommendation } from '@/utils/ml/playerMLService';
import { PlayerAnalysis } from '@/components/AnalysisReport.d';

export const getPlayerStats = (): PlayerStats => ({
  avgSpeed: 15.2,
  maxSpeed: 28.5,
  avgAcceleration: 3.8,
  distanceCovered: 1250,
  balanceScore: 78,
  technicalScore: 82,
  physicalScore: 75,
  movementEfficiency: 80,
});

export const getMockAnalysis = (): PlayerAnalysis => ({
  id: "analysis-1",
  playerName: "Alex Johnson",
  position: "Midfielder",
  timestamp: new Date().toISOString(),
  duration: 120,
  confidence: 0.85,
  stats: {
    pace: 82,
    shooting: 75,
    passing: 85,
    dribbling: 78,
    defending: 65,
    physical: 75,
    stamina: 80,
    acceleration: 83,
    agility: 76,
    balance: 72,
    ballControl: 79,
    decision: 74,
    anticipation: 71,
    positioning: 76,
    vision: 83,
    composure: 79
  },
  movements: [],
  passes: [],
  heatmap: [],
  strengths: [
    "Exceptional vision for through balls",
    "Consistent passing accuracy over long distances",
    "Effective at switching play to the opposite flank"
  ],
  weaknesses: [
    "Occasionally loses concentration during defensive transitions",
    "Could improve decision-making in the final third"
  ],
  summary: "A technically gifted midfielder with excellent passing range and vision.",
  advancedInsights: ["Shows great potential in central midfield role", "Excellent at creating chances"],
  recommendations: [
    "Practice scanning before receiving passes with 'shoulder checks'",
    "Work on quick transition from defense to attack",
  ],
  performanceScore: 82,
  // Added fields to match updated interface
  marketValue: "$2.5M",
  talentScore: 85,
  compatibilityScore: 80,
  performance: {
    technical: 82,
    physical: 75,
    tactical: 79,
    mental: 81,
  },
  detailedSkills: {
    passing: 85,
    shooting: 72,
    dribbling: 78,
    tackling: 65,
    positioning: 76
  }
});

export const getPlayerComparison = (): PlayerComparison => ({
  similarProfessionals: [
    {
      name: "Kevin De Bruyne",
      team: "Manchester City",
      position: "midfielder",
      similarity: 78,
      strengths: ["Vision", "Passing Range", "Set Pieces"]
    },
    {
      name: "Toni Kroos",
      team: "Real Madrid",
      position: "midfielder",
      similarity: 72,
      strengths: ["Ball Control", "Positional Awareness", "Long Passing"]
    },
    {
      name: "Mason Mount",
      team: "Manchester United",
      position: "midfielder",
      similarity: 68,
      strengths: ["Work Rate", "Technical Ability", "Versatility"]
    }
  ],
  similarityMetrics: [
    { category: "Passing", score: 78, description: "Excellent range of passing with good accuracy." },
    { category: "Vision", score: 82, description: "Great awareness of teammates' positioning." },
    { category: "Technique", score: 75, description: "Good ball control and first touch." },
    { category: "Positioning", score: 70, description: "Solid understanding of spatial awareness." },
    { category: "Decision Making", score: 65, description: "Sometimes hesitates in the final third." }
  ]
});

export const getTrainingRecommendations = (): TrainingRecommendation[] => ([
  {
    id: "tr-001",
    title: "Passing Precision Program",
    description: "Comprehensive program to improve all aspects of passing",
    category: "Technical",
    difficulty: 3,
    estimatedTimeInMinutes: 45,
    targetAreas: ["Passing", "Vision"],
    expectedImprovement: 15,
    // Additional properties needed by components
    area: "Passing Accuracy",
    intensity: "high",
    frequency: 3,
    duration: 45,
    exercises: [
      {
        name: "One-touch passing circuit",
        description: "Quick one-touch passing in triangles with movement",
        difficulty: "intermediate"
      },
      {
        name: "Long-range passing drill",
        description: "Practice 30-40 yard passes to moving targets",
        difficulty: "advanced"
      }
    ]
  },
  {
    id: "tr-002",
    title: "Defensive Awareness Training",
    description: "Sessions to improve defensive positioning and awareness",
    category: "Tactical",
    difficulty: 4,
    estimatedTimeInMinutes: 60,
    targetAreas: ["Defending", "Positioning"],
    expectedImprovement: 20,
    // Additional properties needed by components
    area: "Defensive Awareness",
    intensity: "medium",
    frequency: 2,
    duration: 30,
    exercises: [
      {
        name: "Defensive positioning drill",
        description: "Shadow defending scenarios with quick transitions",
        difficulty: "intermediate"
      },
      {
        name: "Zonal marking practice",
        description: "Group exercise focusing on maintaining defensive shape",
        difficulty: "intermediate"
      }
    ]
  },
  {
    id: "tr-003",
    title: "Decision Making Under Pressure",
    description: "Training to improve quick decision making in game situations",
    category: "Mental",
    difficulty: 3,
    estimatedTimeInMinutes: 40,
    targetAreas: ["Decision Making", "Composure"],
    expectedImprovement: 25,
    // Additional properties needed by components
    area: "Decision Making",
    intensity: "high",
    frequency: 3,
    duration: 40,
    exercises: [
      {
        name: "Small-sided games with constraints",
        description: "3v3 games with restrictions on touches and time",
        difficulty: "advanced"
      },
      {
        name: "Video analysis sessions",
        description: "Review of game decisions with coach feedback",
        difficulty: "beginner"
      }
    ]
  }
]);
