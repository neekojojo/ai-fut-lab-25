
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import AdvancedPlayerCharts from './AdvancedPlayerCharts';
import MovementAnalysis from './MovementAnalysis';
import PlayerStatsAR from './ar/PlayerStatsAR';
import { PlayerStats } from '@/utils/dataProcessing/playerAnalysisTypes';
import { PlayerComparison, TrainingRecommendation } from '@/utils/ml/playerMLService';
import { useToast } from '@/components/ui/use-toast';

interface PlayerAnalysisViewProps {
  videoFile: File;
  onResetAnalysis: () => void;
}

const PlayerAnalysisView: React.FC<PlayerAnalysisViewProps> = ({ videoFile, onResetAnalysis }) => {
  const [activeTab, setActiveTab] = useState('movement');
  const { toast } = useToast();
  
  // Comprehensive player stats based on position data
  const playerStats: PlayerStats = {
    avgSpeed: 15.2,
    maxSpeed: 28.5,
    avgAcceleration: 3.8,
    distanceCovered: 1250,
    balanceScore: 78,
    technicalScore: 82,
    physicalScore: 75,
    movementEfficiency: 80,
  };

  // Mock analysis data with expanded details
  const mockAnalysis = {
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
  };

  // Player comparison data for Pro Comparison tab
  const playerComparison: PlayerComparison = {
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
  };

  // Training recommendations data for Training Impact tab
  const trainingRecommendations: TrainingRecommendation[] = [
    {
      area: "Passing Accuracy",
      intensity: "High",
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
      intensity: "Medium",
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
      intensity: "High",
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
  ];
  
  useEffect(() => {
    // Show a toast when the component mounts to guide the user
    toast({
      title: "Advanced Analysis Ready",
      description: "Explore detailed movement patterns and performance metrics across different tabs.",
    });
  }, []);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Advanced Player Analysis</h2>
        <button
          onClick={onResetAnalysis}
          className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Back to Summary
        </button>
      </div>
      
      <div className="flex space-x-1 bg-muted rounded-lg p-1">
        <button
          className={`flex-1 px-4 py-2 text-sm rounded-md ${
            activeTab === 'movement' ? 'bg-background shadow-sm' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('movement')}
        >
          Movement Analysis
        </button>
        <button
          className={`flex-1 px-4 py-2 text-sm rounded-md ${
            activeTab === 'charts' ? 'bg-background shadow-sm' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('charts')}
        >
          Performance Charts
        </button>
        <button
          className={`flex-1 px-4 py-2 text-sm rounded-md ${
            activeTab === 'ar' ? 'bg-background shadow-sm' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('ar')}
        >
          AR Visualization
        </button>
      </div>
      
      <Card>
        <CardContent className="p-6">
          {activeTab === 'movement' ? (
            <MovementAnalysis analysis={mockAnalysis} />
          ) : activeTab === 'charts' ? (
            <AdvancedPlayerCharts 
              playerStats={playerStats} 
              playerName={mockAnalysis.playerName} 
              trainingRecommendations={trainingRecommendations}
              playerComparison={playerComparison}
            />
          ) : (
            <PlayerStatsAR playerStats={playerStats} playerName={mockAnalysis.playerName} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerAnalysisView;
