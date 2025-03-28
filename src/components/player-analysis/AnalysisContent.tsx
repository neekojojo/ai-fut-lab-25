
import React from 'react';
import StatsPanel from './StatsPanel';
import MovementPanel from './MovementPanel';
import InsightsPanel from './InsightsPanel';
import SimilarPlayersPanel from './SimilarPlayersPanel';
import TrainingRecommendationsPanel from './TrainingRecommendationsPanel';
import ClubCompatibilityPanel from './ClubCompatibilityPanel';
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface AnalysisContentProps {
  activeTab: string;
  playerStats: any;
  mockAnalysis: { analysis: any };
  trainingRecommendations: any;
  playerComparison: any[];
  onViewAdvanced: () => void;
}

const AnalysisContent: React.FC<AnalysisContentProps> = ({ 
  activeTab, 
  playerStats, 
  mockAnalysis, 
  trainingRecommendations, 
  playerComparison,
  onViewAdvanced 
}) => {
  return (
    <div className="space-y-6">
      {activeTab === 'stats' && <StatsPanel stats={playerStats} analysis={mockAnalysis.analysis} />}
      
      {activeTab === 'movement' && (
        <div className="space-y-6">
          <MovementPanel analysis={mockAnalysis.analysis} />
          <div className="text-center">
            <Button onClick={onViewAdvanced} variant="outline" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              عرض تحليل الحركة المتقدم
            </Button>
          </div>
        </div>
      )}
      
      {activeTab === 'insights' && <InsightsPanel analysis={mockAnalysis.analysis} />}
      
      {activeTab === 'similar-players' && <SimilarPlayersPanel playerComparison={playerComparison} />}
      
      {activeTab === 'training' && <TrainingRecommendationsPanel recommendations={trainingRecommendations} />}
      
      {activeTab === 'clubs' && <ClubCompatibilityPanel playerAnalysis={mockAnalysis.analysis} />}
    </div>
  );
};

export default AnalysisContent;
