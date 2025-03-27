
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
  playerName: "Alex Johnson",
  position: "Midfielder",
  marketValue: "$2.5M",
  talentScore: 85,
  strengths: [
    "Exceptional vision for through balls",
    "Consistent passing accuracy over long distances",
    "Effective at switching play to the opposite flank"
  ],
  weaknesses: [
    "Occasionally loses concentration during defensive transitions",
    "Could improve decision-making in the final third"
  ],
  performance: {
    technical: 82,
    physical: 75,
    tactical: 79,
    mental: 81,
  },
  recommendations: [
    "Practice scanning before receiving passes with 'shoulder checks'",
    "Work on quick transition from defense to attack",
  ],
  compatibilityScore: 80,
  movements: [
    { name: "Sprint", current: 85, previous: 78, alternative: 90 },
    { name: "Agility", current: 72, previous: 70, alternative: 75 },
    { name: "Balance", current: 68, previous: 65, alternative: 72 },
    { name: "Coordination", current: 75, previous: 71, alternative: 80 },
    { name: "Acceleration", current: 80, previous: 75, alternative: 85 },
  ],
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
    area: "Passing Accuracy",
    intensity: "high",
    frequency: 3,
    duration: 45,
    expectedImprovement: 15,
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
    area: "Defensive Awareness",
    intensity: "medium",
    frequency: 2,
    duration: 30,
    expectedImprovement: 20,
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
    area: "Decision Making",
    intensity: "high",
    frequency: 3,
    duration: 40,
    expectedImprovement: 25,
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
