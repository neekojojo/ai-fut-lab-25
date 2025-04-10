
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
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
import { ProfessionalPlayer } from '@/types/playerAnalysis';

// Track whether the welcome message has been shown
let welcomeMessageShown = false;

interface PlayerAnalysisViewProps {
  videoFile: File;
  onResetAnalysis: () => void;
}

const PlayerAnalysisView: React.FC<PlayerAnalysisViewProps> = ({ videoFile, onResetAnalysis }) => {
  const [activeTab, setActiveTab] = useState('clubs'); // Set default tab to clubs
  const [viewMode, setViewMode] = useState<'tabs' | 'advanced'>('tabs');
  const { toast } = useToast();
  
  // Memoize data to prevent recreation on every render
  const playerStats = React.useMemo(() => getPlayerStats(), []);
  const mockAnalysis = React.useMemo(() => getMockAnalysis(), []);
  const playerComparison = React.useMemo<ProfessionalPlayer[]>(() => 
    getPlayerComparison().similarProfessionals.map(player => ({
      ...player,
      similarity: player.match // Add missing similarity property
    })), []
  );
  const trainingRecommendations = React.useMemo(() => 
    getTrainingRecommendations(), []
  );
  
  useEffect(() => {
    // Show welcome message only once per session
    if (!welcomeMessageShown) {
      welcomeMessageShown = true;
      
      toast({
        title: "تحليل متقدم جاهز",
        description: "استكشف أنماط الحركة التفصيلية ومقاييس الأداء عبر علامات التبويب المختلفة، بما في ذلك توافق اللاعب مع الأندية.",
        className: "bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-primary/20",
        duration: 4000
      });
    }
  }, []);

  // Memoize the handler to avoid recreating it on every render
  const handleViewAdvanced = React.useCallback(() => {
    console.log("Opening advanced view mode");
    setViewMode('advanced');
    
    // Add toast notification - but only when actually changing modes
    toast({
      title: "تم فتح التحليل المتقدم",
      description: "تم الانتقال إلى عرض التحليل المتقدم للحركة",
      duration: 2000
    });
  }, [toast]);

  // Render advanced analysis view when viewMode is 'advanced'
  if (viewMode === 'advanced') {
    console.log("Rendering advanced analysis view");
    return (
      <div className="animate-fade-in">
        <AdvancedAnalysisView 
          analysis={mockAnalysis.analysis} 
          onBack={() => {
            console.log("Going back to tabs view");
            setViewMode('tabs');
          }} 
        />
      </div>
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
