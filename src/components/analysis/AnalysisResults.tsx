
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import AnalysisReport from '@/components/AnalysisReport';
import PlayerAnalysisView from '@/components/PlayerAnalysisView';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResultsProps {
  analysis: any;
  onResetAnalysis: () => void;
  onAdvancedAnalysis?: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  analysis, 
  onResetAnalysis,
  onAdvancedAnalysis 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAdvancedAnalysis = () => {
    // Check if onAdvancedAnalysis prop exists and call it
    if (onAdvancedAnalysis) {
      onAdvancedAnalysis();
    } else {
      // Navigate to the advanced analysis page with the analysis ID
      navigate(`/advanced-analysis/${analysis.id}`);
      
      toast({
        title: "فتح التحليل المتقدم",
        description: "جاري فتح التحليل المتقدم للاعب",
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onResetAnalysis} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          العودة
        </Button>
        
        <Button onClick={handleAdvancedAnalysis} className="gap-2">
          <BarChart3 className="h-4 w-4" />
          التحليل المتقدم
        </Button>
      </div>
      
      <PlayerAnalysisView videoFile={null} onResetAnalysis={onResetAnalysis} />
    </div>
  );
};

export default AnalysisResults;
