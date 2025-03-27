
import React from 'react';
import AnalysisReport from '@/components/AnalysisReport';
import PlayerDigitalIdentity from '@/components/player-analysis/PlayerDigitalIdentity';
import type { PlayerAnalysis } from '@/components/AnalysisReport.d';
import { Separator } from '@/components/ui/separator';

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
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <PlayerDigitalIdentity analysis={analysis} />
        </div>
        <div className="md:col-span-2">
          <AnalysisReport analysis={analysis} />
        </div>
      </div>
      
      <Separator />
      
      <div className="flex justify-center space-x-4 rtl:space-x-reverse">
        <button
          onClick={onResetAnalysis}
          className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          تحليل فيديو آخر
        </button>
        
        <button
          onClick={onAdvancedAnalysis}
          className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md hover:bg-primary/90 transition-colors"
        >
          تحليل الحركة المتقدم
        </button>
      </div>
    </div>
  );
};

export default AnalysisResults;
