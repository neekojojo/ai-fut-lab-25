
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, LineChart } from 'lucide-react';
import PlayerAnalysisView from '@/components/PlayerAnalysisView';

interface AnalysisResultsProps {
  analysis: any;
  onResetAnalysis: () => void;
  onAdvancedAnalysis: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  analysis,
  onResetAnalysis,
  onAdvancedAnalysis
}) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">نتائج التحليل</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onResetAnalysis}>
            تحليل فيديو جديد
          </Button>
          <Button onClick={onAdvancedAnalysis} className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>التحليل المتقدم</span>
          </Button>
        </div>
      </div>
      
      <PlayerAnalysisView videoFile={null as any} onResetAnalysis={onResetAnalysis} />
    </div>
  );
};

export default AnalysisResults;
