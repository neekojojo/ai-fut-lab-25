
import React from 'react';
import AnalysisReport from '@/components/AnalysisReport';
import DevelopmentPlanList from '@/components/DevelopmentPlanList';
import type { PlayerAnalysis } from '@/components/AnalysisReport.d';

interface AnalysisResultsProps {
  analysis: PlayerAnalysis;
  onResetAnalysis: () => void;
  onAdvancedAnalysis: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  analysis,
  onResetAnalysis,
  onAdvancedAnalysis
}) => {
  const planItems = [
    { text: "Build the initial prototype" },
    { text: "Integrate Google AutoML for advanced player analysis" },
    { text: "Add Kaggle data integration for player and club information" },
    { text: "Implement advanced ML models (Random Forest, Neural Networks)" },
    { text: "Develop comprehensive scouting reports with player comparisons" },
    { text: "Create training drills based on player performance data" },
    { text: "Design personalized training program with weekly schedules" }
  ];

  return (
    <div className="space-y-8">
      <AnalysisReport analysis={analysis} />
      
      <div className="w-full">
        <DevelopmentPlanList 
          items={planItems}
          approvedBy="dtfuniquetshirt"
        />
      </div>
      
      <div className="flex justify-center space-x-4">
        <button
          onClick={onResetAnalysis}
          className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Analyze Another Video
        </button>
        
        <button
          onClick={onAdvancedAnalysis}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          Advanced Movement Analysis
        </button>
      </div>
    </div>
  );
};

export default AnalysisResults;
