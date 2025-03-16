
import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import AdvancedPlayerCharts from './AdvancedPlayerCharts';
import MovementAnalysis from './MovementAnalysis';

interface PlayerAnalysisViewProps {
  videoFile: File;
  onResetAnalysis: () => void;
}

const PlayerAnalysisView: React.FC<PlayerAnalysisViewProps> = ({ videoFile, onResetAnalysis }) => {
  const [activeTab, setActiveTab] = useState('movement');
  
  // Mock player stats for demonstration
  const mockPlayerStats = {
    avgSpeed: 15.2,
    maxSpeed: 28.5,
    avgAcceleration: 3.8,
    distanceCovered: 1250,
    balanceScore: 78,
    technicalScore: 82,
    physicalScore: 75,
    movementEfficiency: 80,
  };

  // Mock analysis data
  const mockAnalysis = {
    playerName: "Example Player",
    position: "Midfielder",
    marketValue: "$2.5M",
    talentScore: 85,
    strengths: ["Ball Control", "Passing", "Vision"],
    weaknesses: ["Aerial Duels", "Defensive Positioning"],
    performance: {
      technical: 82,
      physical: 75,
      tactical: 79,
      mental: 81,
    },
    recommendations: [
      "Focus on improving aerial ability",
      "Work on defensive positioning",
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
      dribbling: 88,
      tackling: 65,
      positioning: 76
    }
  };
  
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
      </div>
      
      <Card>
        <CardContent className="p-6">
          {activeTab === 'movement' ? (
            <MovementAnalysis analysis={mockAnalysis} />
          ) : (
            <AdvancedPlayerCharts playerStats={mockPlayerStats} playerName={mockAnalysis.playerName} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlayerAnalysisView;
