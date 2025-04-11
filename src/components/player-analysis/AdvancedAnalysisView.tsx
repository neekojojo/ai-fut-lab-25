
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BarChart3, Dumbbell, LineChart, Target, Users } from 'lucide-react';
import MovementAnalysisTab from './advanced-tabs/MovementAnalysisTab';
import TechnicalAnalysisTab from './advanced-tabs/TechnicalAnalysisTab';
import ClubCompatibilityTab from './advanced-tabs/ClubCompatibilityTab';
import PerformanceReportsPanel from './PerformanceReportsPanel';

interface AdvancedAnalysisViewProps {
  analysis: any;
  onBack: () => void;
}

const AdvancedAnalysisView: React.FC<AdvancedAnalysisViewProps> = ({ analysis, onBack }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">التحليل المتقدم للاعب</h1>
        </div>
      </div>
      
      <Tabs defaultValue="movement" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="movement" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>تحليل الحركة</span>
          </TabsTrigger>
          <TabsTrigger value="technical" className="flex items-center gap-2">
            <Dumbbell className="h-4 w-4" />
            <span>التحليل الفني</span>
          </TabsTrigger>
          <TabsTrigger value="clubs" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>توافق الأندية</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span>التقارير الشاملة</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="movement" className="space-y-6">
          <MovementAnalysisTab analysis={analysis} />
        </TabsContent>
        
        <TabsContent value="technical" className="space-y-6">
          <TechnicalAnalysisTab analysis={analysis} />
        </TabsContent>
        
        <TabsContent value="clubs" className="space-y-6">
          <ClubCompatibilityTab analysis={analysis} />
        </TabsContent>
        
        <TabsContent value="reports" className="space-y-6">
          <PerformanceReportsPanel analysis={analysis} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalysisView;
