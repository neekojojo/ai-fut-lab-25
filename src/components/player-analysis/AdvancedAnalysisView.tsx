
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Activity } from "lucide-react";
import NumberMovementChart from '@/components/NumberMovementChart';

interface AdvancedAnalysisViewProps {
  analysis: any;
  onBack: () => void;
}

const AdvancedAnalysisView: React.FC<AdvancedAnalysisViewProps> = ({ analysis, onBack }) => {
  // Example movement data for charts
  const speedData = [
    { name: "0m", current: 0, previous: 0 },
    { name: "5m", current: 12, previous: 10 },
    { name: "10m", current: 18, previous: 15 },
    { name: "15m", current: 22, previous: 20 },
    { name: "20m", current: 19, previous: 17 },
    { name: "25m", current: 15, previous: 14 },
    { name: "30m", current: 10, previous: 8 }
  ];

  const accelerationData = [
    { name: "0s", current: 0, previous: 0 },
    { name: "1s", current: 4.2, previous: 3.8 },
    { name: "2s", current: 3.8, previous: 3.5 },
    { name: "3s", current: 2.5, previous: 2.2 },
    { name: "4s", current: 1.8, previous: 1.5 },
    { name: "5s", current: 0.9, previous: 0.8 }
  ];

  const movementPatternData = [
    { name: "0%", current: 5, previous: 3 },
    { name: "20%", current: 15, previous: 12 },
    { name: "40%", current: 25, previous: 18 },
    { name: "60%", current: 20, previous: 22 },
    { name: "80%", current: 30, previous: 25 },
    { name: "100%", current: 10, previous: 8 }
  ];

  const energyEfficiencyData = [
    { name: "0min", current: 100, previous: 100 },
    { name: "15min", current: 95, previous: 90 },
    { name: "30min", current: 90, previous: 82 },
    { name: "45min", current: 88, previous: 78 },
    { name: "60min", current: 85, previous: 73 },
    { name: "75min", current: 82, previous: 68 },
    { name: "90min", current: 80, previous: 65 }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-transparent rounded-lg shadow-sm border border-primary/10">
        <h1 className="text-2xl font-bold flex items-center">
          <Activity className="mr-2 h-6 w-6 text-primary" />
          تحليل الحركة المتقدم
        </h1>
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="ml-2 h-4 w-4 rtl:mr-2 rtl:ml-0" />
          العودة
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>السرعة والتسارع</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <NumberMovementChart
              title="منحنى السرعة"
              data={speedData}
              type="line"
              colors={{
                current: "#8B5CF6",
                previous: "#D1D5DB"
              }}
              description="تحليل سرعة اللاعب خلال مسافات مختلفة مقارنة بالأداء السابق"
            />

            <NumberMovementChart
              title="معدل التسارع"
              data={accelerationData}
              type="area"
              colors={{
                current: "#10B981",
                previous: "#D1D5DB"
              }}
              description="تحليل معدل التسارع للاعب خلال فترات زمنية مختلفة"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>أنماط الحركة وكفاءة الطاقة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <NumberMovementChart
              title="نمط الحركة"
              data={movementPatternData}
              type="bar"
              colors={{
                current: "#3B82F6",
                previous: "#D1D5DB"
              }}
              description="تحليل أنماط حركة اللاعب ومقارنتها بالأداء السابق"
            />

            <NumberMovementChart
              title="كفاءة الطاقة"
              data={energyEfficiencyData}
              type="line"
              colors={{
                current: "#F59E0B",
                previous: "#D1D5DB"
              }}
              description="تحليل كفاءة استهلاك الطاقة خلال المباراة"
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>تحليل متقدم للأداء الفني</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-primary mb-2">دقة الحركة</h3>
                <p className="text-3xl font-bold">{analysis.performance?.technical || 82}%</p>
                <p className="text-xs text-muted-foreground mt-1">تحسن بنسبة 4% عن التحليل السابق</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-primary mb-2">التوازن الحركي</h3>
                <p className="text-3xl font-bold">{analysis.stats?.balance || 76}%</p>
                <p className="text-xs text-muted-foreground mt-1">متوسط خلال الفترة الأخيرة</p>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-primary mb-2">الكفاءة الحركية</h3>
                <p className="text-3xl font-bold">{(analysis.stats?.agility || 0) + 5}%</p>
                <p className="text-xs text-muted-foreground mt-1">تحسن ملحوظ في الكفاءة الحركية</p>
              </div>
            </div>

            <div className="p-4 bg-secondary/10 rounded-lg mt-6">
              <h3 className="font-medium mb-2">التوصيات الفنية للحركة</h3>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>تحسين التوازن أثناء تغيير الاتجاه بسرعة عالية</li>
                <li>تطوير كفاءة الحركة لتقليل استهلاك الطاقة خلال المباراة</li>
                <li>العمل على تحسين انفجارية التسارع في المسافات القصيرة</li>
                <li>تطوير القدرة على الحفاظ على السرعة القصوى لفترات أطول</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedAnalysisView;
