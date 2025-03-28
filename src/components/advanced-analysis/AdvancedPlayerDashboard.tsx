import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlayerAnalysis } from '@/types/playerAnalysis';
import { AdvancedMetricsPanel } from './AdvancedMetricsPanel';
import { PlayerComparisonChart } from './PlayerComparisonChart';
import { DevelopmentTracker } from './DevelopmentTracker';
import { TrainingPlanGenerator } from './TrainingPlanGenerator';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AdvancedPlayerDashboardProps {
  analysis: PlayerAnalysis;
  previousAnalyses?: PlayerAnalysis[];
}

const AdvancedPlayerDashboard: React.FC<AdvancedPlayerDashboardProps> = ({ 
  analysis, 
  previousAnalyses = [] 
}) => {
  const [activeTab, setActiveTab] = useState('metrics');
  const { toast } = useToast();
  
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
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="metrics">المقاييس المتقدمة</TabsTrigger>
          <TabsTrigger value="comparison">المقارنة بين اللاعبين</TabsTrigger>
          <TabsTrigger value="development">تطور الأداء</TabsTrigger>
          <TabsTrigger value="training">خطة التدريب</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="mt-6">
          <AdvancedMetricsPanel analysis={analysis} />
        </TabsContent>

        <TabsContent value="comparison" className="mt-6">
          <PlayerComparisonChart 
            currentAnalysis={analysis} 
            otherAnalyses={previousAnalyses} 
          />
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
      </Tabs>
    </div>
  );
};

export default AdvancedPlayerDashboard;
