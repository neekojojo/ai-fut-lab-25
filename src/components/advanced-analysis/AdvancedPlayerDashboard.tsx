
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayerAnalysis } from '@/types/playerAnalysis';
import { AdvancedMetricsPanel } from './AdvancedMetricsPanel';
import { PlayerComparisonChart } from './player-comparison/PlayerComparisonChart'; // Fixed import path
import { DevelopmentTracker } from './DevelopmentTracker';
import { TrainingPlanGenerator } from './TrainingPlanGenerator';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import StrengthsWeaknessesPanel from '@/components/player-analysis/StrengthsWeaknessesPanel';
import PerformanceOverviewPanel from '@/components/player-analysis/PerformanceOverviewPanel';
import InjuryRiskPanel from '@/components/player-analysis/InjuryRiskPanel';
import ComprehensiveSkillsPanel from '@/components/player-analysis/ComprehensiveSkillsPanel';
import ProfessionalComparisonPanel from '@/components/player-analysis/ProfessionalComparisonPanel';
import AdvancedPlayerReportPanel from '@/components/player-analysis/AdvancedPlayerReportPanel';
import { generateInjuryRiskAssessment } from '@/utils/analysis/injuryRiskAnalysis';

interface AdvancedPlayerDashboardProps {
  analysis: PlayerAnalysis;
  previousAnalyses?: PlayerAnalysis[];
}

const AdvancedPlayerDashboard: React.FC<AdvancedPlayerDashboardProps> = ({ 
  analysis, 
  previousAnalyses = [] 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();
  
  // Generate default strengths if not present
  const strengthsData = analysis.strengths || [
    'Good distribution with both hands and feet',
    'Strong command of the penalty area',
    'Strong decision-making on when to leave the line',
    'Excellent positioning to narrow shooting angles'
  ];

  // Generate default weaknesses if not present
  const weaknessesData = analysis.weaknesses || [
    'Sometimes hesitant when coming for crosses',
    'Command of penalty area inconsistent in crowded situations',
    'Occasionally slow to get down for low shots'
  ];

  // Generate injury risk data if not present
  const injuryRiskData = analysis.injuryRisk || 
    generateInjuryRiskAssessment(analysis.position || 'Goalkeeper', analysis.stats?.physical || 75);
  
  const handleExportData = () => {
    toast({
      title: "تم تصدير البيانات",
      description: "تم تصدير بيانات التحليل بنجاح",
    });
  };
  
  const handleShareAnalysis = () => {
    toast({
      title: "تمت المشاركة",
      description: "تم نسخ رابط المشاركة إلى الحافظة",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">{analysis.playerName}</h2>
          <p className="text-muted-foreground">{analysis.position} • تحليل متقدم</p>
        </div>
        <div className="flex space-x-2 rtl:space-x-reverse">
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            تصدير البيانات
          </Button>
          <Button variant="outline" size="sm" onClick={handleShareAnalysis}>
            <Share2 className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            مشاركة
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="advanced-metrics">المقاييس المتقدمة</TabsTrigger>
          <TabsTrigger value="comparison">المقارنة بين اللاعبين</TabsTrigger>
          <TabsTrigger value="development">تطور الأداء</TabsTrigger>
          <TabsTrigger value="training">خطة التدريب</TabsTrigger>
          <TabsTrigger value="comprehensive">التقرير الشامل</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StrengthsWeaknessesPanel strengths={strengthsData} weaknesses={weaknessesData} />
            <PerformanceOverviewPanel 
              compatibilityScore={analysis.compatibilityScore}
              position={analysis.position}
              primaryMetrics={{
                technical: analysis.performance?.technical || 67,
                physical: analysis.performance?.physical || 71,
                tactical: analysis.performance?.tactical || 81,
                mental: analysis.performance?.mental || 67
              }}
            />
            <InjuryRiskPanel injuryRisk={injuryRiskData} />
          </div>
        </TabsContent>

        <TabsContent value="advanced-metrics" className="mt-6">
          <AdvancedMetricsPanel analysis={analysis} />
        </TabsContent>

        <TabsContent value="comparison" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfessionalComparisonPanel />
            <PlayerComparisonChart 
              currentAnalysis={analysis} 
              otherAnalyses={previousAnalyses} 
            />
          </div>
        </TabsContent>

        <TabsContent value="development" className="mt-6">
          <DevelopmentTracker 
            analyses={[...previousAnalyses, analysis].sort((a, b) => 
              new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            )} 
          />
        </TabsContent>

        <TabsContent value="training" className="mt-6">
          <TrainingPlanGenerator analysis={analysis} />
        </TabsContent>

        <TabsContent value="comprehensive" className="mt-6">
          <div className="space-y-6">
            <AdvancedPlayerReportPanel analysis={analysis} />
            <ComprehensiveSkillsPanel />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedPlayerDashboard;
