
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LineChart, BarChart2, Activity, Zap, Timer } from 'lucide-react';

interface MovementAnalysisTabProps {
  analysis: any;
}

const MovementAnalysisTab: React.FC<MovementAnalysisTabProps> = ({ analysis }) => {
  // Ensure we have movement metrics data
  const movementMetrics = analysis?.movementMetrics || {
    averageSpeed: 12.5,
    topSpeed: 28.4,
    averageAcceleration: 2.8,
    totalDistance: 1250,
    sprintCount: 8,
    directionChanges: 24
  };
  
  const speedZones = [
    { name: 'مشي (0-7 كم/س)', percentage: 20, color: '#10B981' },
    { name: 'جري خفيف (7-15 كم/س)', percentage: 45, color: '#6366F1' },
    { name: 'جري (15-20 كم/س)', percentage: 25, color: '#8B5CF6' },
    { name: 'سرعة قصوى (>20 كم/س)', percentage: 10, color: '#EC4899' }
  ];
  
  const movementInsights = [
    "اللاعب يظهر قدرة جيدة على التسارع المفاجئ وتغيير الاتجاه",
    "يحتاج لتحسين التحمل البدني للحفاظ على مستوى أدائه طوال المباراة",
    "أظهر قدرة عالية على الركض بسرعات مختلفة حسب متطلبات اللعب"
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <span>مؤشرات الحركة الرئيسية</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="text-sm text-muted-foreground">متوسط السرعة</div>
                <div className="text-2xl font-bold">{movementMetrics.averageSpeed} كم/س</div>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="text-sm text-muted-foreground">السرعة القصوى</div>
                <div className="text-2xl font-bold">{movementMetrics.topSpeed} كم/س</div>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="text-sm text-muted-foreground">متوسط التسارع</div>
                <div className="text-2xl font-bold">{movementMetrics.averageAcceleration} م/ث²</div>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="text-sm text-muted-foreground">المسافة الإجمالية</div>
                <div className="text-2xl font-bold">{movementMetrics.totalDistance} م</div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">عدد السرعات القصوى</div>
                <Badge variant="outline">{movementMetrics.sprintCount}</Badge>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="font-medium">عدد تغييرات الاتجاه</div>
                <Badge variant="outline">{movementMetrics.directionChanges}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-indigo-500" />
              <span>نطاقات السرعة</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {speedZones.map((zone, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{zone.name}</span>
                  <span className="text-sm">{zone.percentage}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${zone.percentage}%`, backgroundColor: zone.color }}
                  />
                </div>
              </div>
            ))}
            
            <div className="pt-4 mt-4 border-t">
              <div className="text-sm font-medium mb-2">التحليل العام للسرعات</div>
              <p className="text-sm text-muted-foreground">
                يقضي اللاعب معظم وقته في نطاق الجري الخفيف مع قدرة جيدة على الانتقال إلى السرعات القصوى عند الحاجة.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            <span>الأداء الحركي مع مرور الوقت</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
            <div className="text-center p-4">
              <LineChart className="h-10 w-10 mx-auto text-primary/50 mb-2" />
              <p className="text-muted-foreground">رسم بياني لتغير السرعة والتسارع عبر زمن المباراة</p>
            </div>
          </div>
          
          <div className="mt-6 space-y-2">
            <h3 className="text-lg font-medium">تحليل النمط الحركي</h3>
            <ul className="space-y-2">
              {movementInsights.map((insight, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Timer className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{insight}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovementAnalysisTab;
