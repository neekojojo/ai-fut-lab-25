
import React from 'react';
import { ProfessionalPlayer } from '@/types/playerAnalysis';
import {
  StatsTabContent,
  MovementTabContent,
  InsightsTabContent,
  SimilarPlayersTabContent,
  TrainingTabContent,
  ClubsTabContent
} from './tab-contents';

interface AnalysisContentProps {
  activeTab: string;
  playerStats: any;
  mockAnalysis: { analysis: any };
  trainingRecommendations: any[];
  playerComparison: ProfessionalPlayer[];
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
  // Ensure trainingRecommendations is an array
  const safeTrainingRecommendations = Array.isArray(trainingRecommendations) ? trainingRecommendations : [];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'stats':
        return <StatsTabContent playerStats={playerStats} analysis={mockAnalysis.analysis} />;
      
      case 'movement':
        return <MovementTabContent analysis={mockAnalysis.analysis} onViewAdvanced={onViewAdvanced} />;
      
      case 'insights':
        return <InsightsTabContent analysis={mockAnalysis.analysis} />;
      
      case 'similar-players':
        return <SimilarPlayersTabContent playerComparison={playerComparison} />;
      
      case 'training':
        return <TrainingTabContent recommendations={safeTrainingRecommendations} />;
      
      case 'clubs':
        return <ClubsTabContent playerAnalysis={mockAnalysis.analysis} />;
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderTabContent()}
    </div>
  );
};

export default AnalysisContent;
