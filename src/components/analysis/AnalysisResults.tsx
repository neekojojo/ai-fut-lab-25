
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, BarChart3 } from 'lucide-react';
import AnalysisReport from '@/components/AnalysisReport';
import PlayerAnalysisView from '@/components/PlayerAnalysisView';
import { useToast } from '@/hooks/use-toast';
import { determineEarnedBadges } from '@/utils/analysis/badgeService';
import AnalysisAchievementsPanel from '@/components/player-analysis/AnalysisAchievementsPanel';

// Track whether analysis completion notification has been shown
let analysisCompletionShown = false;

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
  
  // Memoize badges determination to prevent re-calculation on every render
  const earnedBadges = React.useMemo(() => {
    if (!analysis) return [];
    return determineEarnedBadges(analysis);
  }, [analysis?.id]); // Only recalculate when analysis ID changes
  
  useEffect(() => {
    // Show notification only once per session and only if we have analysis data and badges
    if (analysis && earnedBadges.length > 0 && !analysisCompletionShown) {
      analysisCompletionShown = true;
      
      toast({
        title: "تم اكتمال التحليل بنجاح!",
        description: `حصلت على ${earnedBadges.length} شارة جديدة. تهانينا!`,
        className: "bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-primary/20",
        duration: 3000 // Short 3-second duration
      });
    }
  }, [analysis?.id]); // Only trigger when analysis ID changes

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
        duration: 2000 // Even shorter duration for this action toast
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
      
      {/* عرض لوحة الإنجازات إذا كانت هناك شارات */}
      {earnedBadges.length > 0 && (
        <AnalysisAchievementsPanel badges={earnedBadges} />
      )}
      
      <PlayerAnalysisView videoFile={null} onResetAnalysis={onResetAnalysis} />
    </div>
  );
};

export default AnalysisResults;
