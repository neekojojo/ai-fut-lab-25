
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
  
  // تحديد الشارات المكتسبة بناء على تحليل اللاعب
  const earnedBadges = determineEarnedBadges(analysis);
  
  useEffect(() => {
    // إظهار إشعار عند اكتمال التحليل بنجاح
    if (analysis && earnedBadges.length > 0) {
      toast({
        title: "تم اكتمال التحليل بنجاح!",
        description: `حصلت على ${earnedBadges.length} شارة جديدة. تهانينا!`,
        className: "bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-primary/20",
      });
    }
  }, [analysis, earnedBadges.length, toast]);

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
      
      {/* عرض لوحة الإنجازات إذا كانت هناك شارات */}
      {earnedBadges.length > 0 && (
        <AnalysisAchievementsPanel badges={earnedBadges} />
      )}
      
      <PlayerAnalysisView videoFile={null} onResetAnalysis={onResetAnalysis} />
    </div>
  );
};

export default AnalysisResults;
