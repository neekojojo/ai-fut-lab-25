
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import AnalysisHeader from './player-analysis/AnalysisHeader';
import AnalysisTabNav from './player-analysis/AnalysisTabNav';
import AnalysisContent from './player-analysis/AnalysisContent';
import AdvancedAnalysisView from './player-analysis/AdvancedAnalysisView';
import { 
  getPlayerStats, 
  getMockAnalysis, 
  getPlayerComparison, 
  getTrainingRecommendations 
} from './player-analysis/mockData';

interface PlayerAnalysisViewProps {
  videoFile: File;
  onResetAnalysis: () => void;
}

const PlayerAnalysisView: React.FC<PlayerAnalysisViewProps> = ({ videoFile, onResetAnalysis }) => {
  const [activeTab, setActiveTab] = useState('movement');
  const [viewMode, setViewMode] = useState<'tabs' | 'advanced'>('tabs');
  const { toast } = useToast();
  
  const playerStats = getPlayerStats();
  const mockAnalysis = getMockAnalysis();
  const playerComparison = getPlayerComparison();
  const trainingRecommendations = getTrainingRecommendations();
  
  useEffect(() => {
    toast({
      title: "تحليل متقدم جاهز",
      description: "استكشف أنماط الحركة التفصيلية ومقاييس الأداء عبر علامات التبويب المختلفة، بما في ذلك توافق اللاعب مع الأندية.",
    });
  }, []);

  if (viewMode === 'advanced') {
    return (
      <AdvancedAnalysisView 
        analysis={mockAnalysis.analysis} 
        onBack={() => setViewMode('tabs')} 
      />
    );
  }
  
  return (
    <div className="space-y-6 animate-fade-in">
      <AnalysisHeader onResetAnalysis={onResetAnalysis} />
      <AnalysisTabNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <AnalysisContent
        activeTab={activeTab}
        playerStats={playerStats}
        mockAnalysis={mockAnalysis}
        trainingRecommendations={trainingRecommendations}
        playerComparison={playerComparison}
        onViewAdvanced={() => setViewMode('advanced')}
      />
    </div>
  );
};

export default PlayerAnalysisView;
