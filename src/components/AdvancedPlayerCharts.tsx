
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayerStats } from '@/utils/dataProcessing/playerDataAnalysis';
import { TrainingRecommendation, PlayerComparison } from '@/utils/ml/playerMLService';
import { PerformanceProfile } from './charts/PerformanceProfile';
import { PerformanceDistribution } from './charts/PerformanceDistribution';
import { OverallStats } from './charts/OverallStats';
import { ProComparison } from './charts/ProComparison';
import { TrainingRecommendations } from './charts/TrainingRecommendations';
import { ProgressCharts } from './charts/ProgressCharts';

interface AdvancedPlayerChartsProps {
  playerStats: PlayerStats;
  playerName?: string;
  playerPosition?: string;
  trainingRecommendations?: TrainingRecommendation[];
  playerComparison?: PlayerComparison;
}

export const AdvancedPlayerCharts: React.FC<AdvancedPlayerChartsProps> = ({
  playerStats,
  playerName = "Player",
  playerPosition,
  trainingRecommendations,
  playerComparison,
}) => {
  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comparison">Pro Comparison</TabsTrigger>
          <TabsTrigger value="training">Training Impact</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PerformanceProfile playerStats={playerStats} playerName={playerName} />
            <PerformanceDistribution playerStats={playerStats} />
          </div>
          <OverallStats playerStats={playerStats} />
        </TabsContent>
        
        <TabsContent value="comparison" className="space-y-4">
          <ProComparison 
            playerComparison={playerComparison} 
            playerStats={playerStats}
            playerPosition={playerPosition}
          />
        </TabsContent>
        
        <TabsContent value="training" className="space-y-4">
          <TrainingRecommendations trainingRecommendations={trainingRecommendations} />
        </TabsContent>
        
        <TabsContent value="progress" className="space-y-4">
          <ProgressCharts />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPlayerCharts;
