
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
  const [activeTab, setActiveTab] = useState('clubs'); // Set default tab to clubs
  const [viewMode, setViewMode] = useState<'tabs' | 'advanced'>('tabs');
  const { toast } = useToast();
  
  const playerStats = getPlayerStats();
  const mockAnalysis = getMockAnalysis();
  const playerComparison = getPlayerComparison().similarProfessionals; // Get the array from the PlayerComparison object
  const trainingRecommendations = getTrainingRecommendations();
  
  useEffect(() => {
    toast({
      title: "تحليل متقدم جاهز",
      description: "استكشف أنماط الحركة التفصيلية ومقاييس الأداء عبر علامات التبويب المختلفة، بما في ذلك توافق اللاعب مع الأندية.",
      className: "bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-primary/20",
    });
  }, [toast]);

  // معالج لعرض التحليل المتقدم للحركة
  const handleViewAdvanced = () => {
    console.log("Switching to advanced view mode");
    setViewMode('advanced');
  };

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
      <div className="bg-gradient-to-r from-primary/5 to-transparent p-4 rounded-lg shadow-sm border border-primary/10">
        <AnalysisHeader onResetAnalysis={onResetAnalysis} />
      </div>
      
      <div className="bg-white dark:bg-gray-900/50 shadow-sm rounded-lg overflow-hidden border border-primary/10">
        <AnalysisTabNav activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="p-4">
          <AnalysisContent
            activeTab={activeTab}
            playerStats={playerStats}
            mockAnalysis={mockAnalysis}
            trainingRecommendations={trainingRecommendations}
            playerComparison={playerComparison}
            onViewAdvanced={handleViewAdvanced}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerAnalysisView;
