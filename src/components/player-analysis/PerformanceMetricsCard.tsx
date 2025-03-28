
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, PolarRadiusAxis } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PerformanceMetricsCardProps {
  metrics: {
    pace: number;
    acceleration: number;
    stamina: number;
    agility: number;
    balance: number;
    positioning: number;
    movement: number;
    awareness: number;
    decisionMaking: number;
    ballControl: number;
    technique: number;
    overall: number;
    details?: {
      heatmapWeight: number;
      sprintQuality: number;
      movementEfficiency: number;
      positioningAccuracy: number;
      energyEfficiency: number;
    };
  };
}

const PerformanceMetricsCard: React.FC<PerformanceMetricsCardProps> = ({ metrics }) => {
  // تحويل البيانات إلى تنسيق مناسب للرسم البياني الرادار
  const physicalData = [
    { subject: 'سرعة', A: metrics.pace, fullMark: 100 },
    { subject: 'تسارع', A: metrics.acceleration, fullMark: 100 },
    { subject: 'تحمل', A: metrics.stamina, fullMark: 100 },
    { subject: 'رشاقة', A: metrics.agility, fullMark: 100 },
    { subject: 'توازن', A: metrics.balance, fullMark: 100 }
  ];
  
  const tacticalData = [
    { subject: 'تموضع', A: metrics.positioning, fullMark: 100 },
    { subject: 'حركة', A: metrics.movement, fullMark: 100 },
    { subject: 'وعي', A: metrics.awareness, fullMark: 100 },
    { subject: 'اتخاذ القرار', A: metrics.decisionMaking, fullMark: 100 }
  ];
  
  const technicalData = [
    { subject: 'تحكم بالكرة', A: metrics.ballControl, fullMark: 100 },
    { subject: 'تقنية', A: metrics.technique, fullMark: 100 },
    { subject: 'إبداع', A: (metrics.awareness + metrics.technique) / 2, fullMark: 100 },
    { subject: 'دقة', A: (metrics.technique + metrics.balance) / 2, fullMark: 100 }
  ];
  
  // إعداد بيانات التفاصيل إذا كانت متوفرة
  const detailsData = metrics.details ? [
    { subject: 'كفاءة الحركة', A: metrics.details.movementEfficiency, fullMark: 100 },
    { subject: 'جودة التسارع', A: metrics.details.sprintQuality, fullMark: 100 },
    { subject: 'دقة التموضع', A: metrics.details.positioningAccuracy, fullMark: 100 },
    { subject: 'كفاءة الطاقة', A: metrics.details.energyEfficiency, fullMark: 100 },
    { subject: 'تغطية الملعب', A: metrics.details.heatmapWeight, fullMark: 100 }
  ] : [];
  
  // تصنيف الأداء العام
  const getOverallRating = () => {
    if (metrics.overall >= 90) return { label: 'ممتاز', color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' };
    if (metrics.overall >= 80) return { label: 'جيد جدًا', color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' };
    if (metrics.overall >= 70) return { label: 'جيد', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' };
    if (metrics.overall >= 60) return { label: 'متوسط', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' };
    if (metrics.overall >= 50) return { label: 'مقبول', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' };
    return { label: 'ضعيف', color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' };
  };
  
  const rating = getOverallRating();
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>مقاييس الأداء</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end">
              <span className="text-xs text-muted-foreground">التقييم العام</span>
              <span className="text-lg font-bold">{metrics.overall}</span>
            </div>
            <Badge className={rating.color}>{rating.label}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="physical">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="physical">بدني</TabsTrigger>
            <TabsTrigger value="tactical">تكتيكي</TabsTrigger>
            <TabsTrigger value="technical">تقني</TabsTrigger>
            {metrics.details && <TabsTrigger value="details">تفاصيل</TabsTrigger>}
          </TabsList>
          
          <TabsContent value="physical" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={physicalData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="القياسات البدنية" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.5} />
                <Tooltip formatter={(value) => `${value}`} />
              </RadarChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-md">
                <div className="text-xs text-muted-foreground">السرعة</div>
                <div className="font-bold">{metrics.pace}</div>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-md">
                <div className="text-xs text-muted-foreground">التسارع</div>
                <div className="font-bold">{metrics.acceleration}</div>
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded-md">
                <div className="text-xs text-muted-foreground">التحمل</div>
                <div className="font-bold">{metrics.stamina}</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tactical" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={tacticalData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="القياسات التكتيكية" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
                <Tooltip formatter={(value) => `${value}`} />
              </RadarChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-2 gap-2 mt-4 text-center">
              <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-md">
                <div className="text-xs text-muted-foreground">الوعي التكتيكي</div>
                <div className="font-bold">{metrics.awareness}</div>
              </div>
              <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded-md">
                <div className="text-xs text-muted-foreground">اتخاذ القرار</div>
                <div className="font-bold">{metrics.decisionMaking}</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="technical" className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={technicalData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="القياسات التقنية" dataKey="A" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.5} />
                <Tooltip formatter={(value) => `${value}`} />
              </RadarChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-2 gap-2 mt-4 text-center">
              <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-md">
                <div className="text-xs text-muted-foreground">التحكم بالكرة</div>
                <div className="font-bold">{metrics.ballControl}</div>
              </div>
              <div className="p-2 bg-purple-50 dark:bg-purple-950/30 rounded-md">
                <div className="text-xs text-muted-foreground">التقنية</div>
                <div className="font-bold">{metrics.technique}</div>
              </div>
            </div>
          </TabsContent>
          
          {metrics.details && (
            <TabsContent value="details" className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={detailsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name="تفاصيل الأداء" dataKey="A" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.5} />
                  <Tooltip formatter={(value) => `${value}`} />
                </RadarChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-md">
                  <div className="text-xs text-muted-foreground">كفاءة الحركة</div>
                  <div className="font-bold">{metrics.details.movementEfficiency}</div>
                </div>
                <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-md">
                  <div className="text-xs text-muted-foreground">جودة التسارع</div>
                  <div className="font-bold">{metrics.details.sprintQuality}</div>
                </div>
                <div className="p-2 bg-amber-50 dark:bg-amber-950/30 rounded-md">
                  <div className="text-xs text-muted-foreground">كفاءة الطاقة</div>
                  <div className="font-bold">{metrics.details.energyEfficiency}</div>
                </div>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetricsCard;
