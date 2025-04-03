
import React, { useState } from 'react';
import { PlayerAnalysis } from '@/types/playerAnalysis';
import { PlayerSelector } from './PlayerSelector';
import { TechnicalComparison } from './TechnicalComparison';
import { RadarComparison } from './RadarComparison';
import { ComparisonSummary } from './ComparisonSummary';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface PlayerComparisonChartProps {
  currentAnalysis: PlayerAnalysis;
  otherAnalyses: PlayerAnalysis[];
}

export const PlayerComparisonChart: React.FC<PlayerComparisonChartProps> = ({ 
  currentAnalysis, 
  otherAnalyses 
}) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(
    otherAnalyses.length > 0 ? otherAnalyses[0].id : null
  );

  const selectedPlayer = otherAnalyses.find(p => p.id === selectedPlayerId);
  
  if (otherAnalyses.length === 0) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>لا يوجد لاعبين للمقارنة</AlertTitle>
        <AlertDescription>
          قم بتحليل المزيد من اللاعبين لتمكين ميزة المقارنة.
        </AlertDescription>
      </Alert>
    );
  }
  
  // Calculate average difference for the ComparisonSummary component
  const calculateAverageDifference = () => {
    if (!selectedPlayer) return 0;
    
    let totalDiff = 0;
    let count = 0;
    
    // Calculate difference in core skills
    if (currentAnalysis.stats && selectedPlayer.stats) {
      const stats = ['pace', 'shooting', 'passing', 'dribbling', 'defending', 'physical'];
      
      stats.forEach(stat => {
        const current = currentAnalysis.stats[stat as keyof typeof currentAnalysis.stats] || 0;
        const other = selectedPlayer.stats[stat as keyof typeof selectedPlayer.stats] || 0;
        
        totalDiff += current - other;
        count++;
      });
    }
    
    // Calculate difference in performance metrics
    if (currentAnalysis.performance && selectedPlayer.performance) {
      const performances = ['technical', 'physical', 'tactical', 'mental'];
      
      performances.forEach(perf => {
        const current = currentAnalysis.performance?.[perf as keyof typeof currentAnalysis.performance] || 0;
        const other = selectedPlayer.performance?.[perf as keyof typeof selectedPlayer.performance] || 0;
        
        totalDiff += current - other;
        count++;
      });
    }
    
    return count > 0 ? totalDiff / count : 0;
  };

  const averageDifference = calculateAverageDifference();
  
  // Create data for technical comparison chart
  const createTechnicalComparisonData = () => {
    if (!selectedPlayer) return [];
    
    return [
      { 
        skill: 'تمرير', 
        [currentAnalysis.playerName]: currentAnalysis.stats?.passing || 0, 
        [selectedPlayer.playerName]: selectedPlayer.stats?.passing || 0 
      },
      { 
        skill: 'تسديد', 
        [currentAnalysis.playerName]: currentAnalysis.stats?.shooting || 0, 
        [selectedPlayer.playerName]: selectedPlayer.stats?.shooting || 0 
      },
      { 
        skill: 'مراوغة', 
        [currentAnalysis.playerName]: currentAnalysis.stats?.dribbling || 0, 
        [selectedPlayer.playerName]: selectedPlayer.stats?.dribbling || 0 
      },
      { 
        skill: 'دفاع', 
        [currentAnalysis.playerName]: currentAnalysis.stats?.defending || 0, 
        [selectedPlayer.playerName]: selectedPlayer.stats?.defending || 0 
      },
      { 
        skill: 'بدنية', 
        [currentAnalysis.playerName]: currentAnalysis.stats?.physical || 0, 
        [selectedPlayer.playerName]: selectedPlayer.stats?.physical || 0 
      }
    ];
  };

  // Create data for radar comparison chart
  const createRadarComparisonData = () => {
    if (!selectedPlayer) return [];
    
    return [
      { 
        attribute: 'تقنية', 
        [currentAnalysis.playerName]: currentAnalysis.performance?.technical || 0, 
        [selectedPlayer.playerName]: selectedPlayer.performance?.technical || 0 
      },
      { 
        attribute: 'بدنية', 
        [currentAnalysis.playerName]: currentAnalysis.performance?.physical || 0, 
        [selectedPlayer.playerName]: selectedPlayer.performance?.physical || 0 
      },
      { 
        attribute: 'تكتيكية', 
        [currentAnalysis.playerName]: currentAnalysis.performance?.tactical || 0, 
        [selectedPlayer.playerName]: selectedPlayer.performance?.tactical || 0 
      },
      { 
        attribute: 'ذهنية', 
        [currentAnalysis.playerName]: currentAnalysis.performance?.mental || 0, 
        [selectedPlayer.playerName]: selectedPlayer.performance?.mental || 0 
      },
      { 
        attribute: 'سرعة', 
        [currentAnalysis.playerName]: currentAnalysis.stats?.pace || 0, 
        [selectedPlayer.playerName]: selectedPlayer.stats?.pace || 0 
      },
      { 
        attribute: 'تحمل', 
        [currentAnalysis.playerName]: currentAnalysis.stats?.stamina || 0, 
        [selectedPlayer.playerName]: selectedPlayer.stats?.stamina || 0 
      }
    ];
  };

  const technicalComparisonData = createTechnicalComparisonData();
  const radarComparisonData = createRadarComparisonData();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 rtl:space-x-reverse">
        <div className="w-full md:w-1/3">
          <PlayerSelector 
            currentAnalysis={currentAnalysis}
            selectedPlayer={selectedPlayer}
            otherAnalyses={otherAnalyses}
            selectedPlayerId={selectedPlayerId}
            onSelectPlayer={setSelectedPlayerId}
            averageDifference={averageDifference}
          />
        </div>

        <div className="w-full md:w-2/3">
          <TechnicalComparison 
            currentAnalysis={currentAnalysis}
            selectedPlayer={selectedPlayer}
            technicalComparisonData={technicalComparisonData}
          />
        </div>
      </div>

      {selectedPlayer && (
        <RadarComparison 
          currentAnalysis={currentAnalysis}
          selectedPlayer={selectedPlayer}
          radarComparisonData={radarComparisonData}
        />
      )}
    </div>
  );
};
