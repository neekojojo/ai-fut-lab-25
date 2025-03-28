
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnalysisReport from '@/components/AnalysisReport';
import type { PlayerAnalysis } from '@/components/AnalysisReport.d';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, ChartBar, BarChart3, Eye } from 'lucide-react';

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
  const navigate = useNavigate();
  
  const handleOpenAdvancedDashboard = () => {
    // Navigate to advanced analysis page with the analysis id
    if (analysis.id) {
      navigate(`/advanced-analysis/${analysis.id}`);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="border-none shadow-lg overflow-hidden bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
        <CardContent className="p-0">
          <div className="p-6">
            <div className="bg-white/60 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <AnalysisReport analysis={analysis} />

              {analysis.talentScore && (
                <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="h-5 w-5 text-indigo-500" />
                    <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-300">تحليل حركة العين وتقييم الموهبة</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">مؤشر الموهبة:</span>
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          {analysis.talentScore}
                        </span>
                        <span className="text-sm text-muted-foreground mr-1">/100</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full" 
                        style={{ width: `${analysis.talentScore}%` }}
                      ></div>
                    </div>
                    
                    <Separator className="my-2" />
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">الوعي بالملعب</span>
                        <span className="text-sm font-semibold">{analysis.stats.vision}/100</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">سرعة اتخاذ القرار</span>
                        <span className="text-sm font-semibold">{analysis.stats.decision}/100</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">القدرة على التوقع</span>
                        <span className="text-sm font-semibold">{analysis.stats.anticipation || Math.round(analysis.stats.vision * 0.7 + analysis.stats.decision * 0.3)}/100</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">التركيز الذهني</span>
                        <span className="text-sm font-semibold">{analysis.stats.composure}/100</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <Separator className="my-2 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          <div className="flex justify-center space-x-4 rtl:space-x-reverse p-4 bg-white/40 dark:bg-black/10 backdrop-blur-sm">
            <button
              onClick={onResetAnalysis}
              className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors hover:bg-primary/10 rounded-lg"
            >
              تحليل فيديو آخر
            </button>
            
            <button
              onClick={onAdvancedAnalysis}
              className="px-4 py-2 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-colors shadow-sm"
            >
              التحليل المتقدم للحركة
            </button>
            
            <button
              onClick={handleOpenAdvancedDashboard}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-colors shadow-sm flex items-center"
            >
              <ChartBar className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0" />
              لوحة التحليل المتقدم
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysisResults;
