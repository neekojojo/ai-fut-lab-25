
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import MovementAnalysis from '@/components/MovementAnalysis';
import AdvancedPlayerCharts from '@/components/AdvancedPlayerCharts';
import PlayerStatsAR from '@/components/ar/PlayerStatsAR';
import { PlayerStats } from '@/utils/dataProcessing/playerAnalysisTypes';
import { PlayerComparison, TrainingRecommendation } from '@/utils/ml/playerMLService';
import { PlayerAnalysis } from '@/components/AnalysisReport.d';

interface AnalysisContentProps {
  activeTab: string;
  playerStats: PlayerStats;
  mockAnalysis: PlayerAnalysis;
  trainingRecommendations: TrainingRecommendation[];
  playerComparison: PlayerComparison;
}

const AnalysisContent: React.FC<AnalysisContentProps> = ({
  activeTab,
  playerStats,
  mockAnalysis,
  trainingRecommendations,
  playerComparison
}) => {
  return (
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
  );
};

export default AnalysisContent;
