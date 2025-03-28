
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnalysisReport from '@/components/AnalysisReport';
import PlayerDigitalIdentity from '@/components/player-analysis/PlayerDigitalIdentity';
import type { PlayerAnalysis } from '@/components/AnalysisReport.d';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Activity, ChartBar, BarChart3 } from 'lucide-react';

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
  
  // Add default values for the new profile fields if they're not provided
  const enhancedAnalysis = {
    ...analysis,
    age: analysis.age || 23,
    country: analysis.country || 'United States',
    city: analysis.city || 'New York',
    height: analysis.height || '6\'1" (185cm)',
    weight: analysis.weight || '175lbs (79kg)',
    preferredFoot: analysis.preferredFoot || 'Right'
  };

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            <div className="md:col-span-1 bg-white/60 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <PlayerDigitalIdentity analysis={enhancedAnalysis} />
            </div>
            <div className="md:col-span-2 bg-white/60 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4 shadow-sm">
              <AnalysisReport analysis={analysis} />
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
