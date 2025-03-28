
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Zap, TrendingUp } from "lucide-react";
import MovementAnalysisChart from '../../player-movement/MovementAnalysisChart';
import PerformanceMetricsSection from './PerformanceMetricsSection';

interface PerformanceMetricsTabProps {
  movementData: any[];
  speedZones: {
    walking: number;
    jogging: number;
    running: number;
    sprinting: number;
  };
  analysis: any;
}

const PerformanceMetricsTab: React.FC<PerformanceMetricsTabProps> = ({
  movementData,
  speedZones,
  analysis
}) => {
  return (
    <div className="grid grid-cols-1 gap-6">
      <MovementAnalysisChart 
        movementData={movementData}
        speedZones={speedZones}
        sprintCount={12}
        efficiencyScore={78}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>تحليل متقدم للأداء الفني</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-primary mb-2 flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  دقة الحركة
                </h3>
                <p className="text-3xl font-bold">{analysis.performance?.technical || 82}%</p>
                <p className="text-xs text-muted-foreground mt-1">تحسن بنسبة 4% عن التحليل السابق</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-primary mb-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  التوازن الحركي
                </h3>
                <p className="text-3xl font-bold">{analysis.stats?.balance || 76}%</p>
                <p className="text-xs text-muted-foreground mt-1">متوسط خلال الفترة الأخيرة</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-primary mb-2 flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  الكفاءة الحركية
                </h3>
                <p className="text-3xl font-bold">{(analysis.stats?.agility || 0) + 5}%</p>
                <p className="text-xs text-muted-foreground mt-1">تحسن ملحوظ في الكفاءة الحركية</p>
              </div>
            </div>

            <PerformanceMetricsSection />

            <div className="p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-lg mt-6 border border-blue-100 dark:border-blue-900/30">
              <h3 className="font-medium mb-2">التوصيات الفنية للحركة</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>تحسين التوازن أثناء تغيير الاتجاه بسرعة عالية</li>
                <li>تطوير كفاءة الحركة لتقليل استهلاك الطاقة خلال المباراة</li>
                <li>العمل على تحسين انفجارية التسارع في المسافات القصيرة</li>
                <li>تطوير القدرة على الحفاظ على السرعة القصوى لفترات أطول</li>
                <li>تمارين مخصصة لتحسين معدل الاستشفاء بعد الجهد العالي</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetricsTab;
