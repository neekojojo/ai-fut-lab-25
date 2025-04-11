
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Medal, User, Target, Gauge } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface PerformanceMetrics {
  technical: number;
  physical: number;
  tactical: number;
  mental: number;
}

interface PerformanceOverviewPanelProps {
  compatibilityScore?: number;
  position?: string;
  primaryMetrics: PerformanceMetrics;
}

const PerformanceOverviewPanel: React.FC<PerformanceOverviewPanelProps> = ({
  compatibilityScore = 82,
  position = 'وسط هجومي',
  primaryMetrics
}) => {
  // Create data array for the radar chart
  const data = [
    { subject: 'تقنية', A: primaryMetrics.technical, fullMark: 100 },
    { subject: 'بدنية', A: primaryMetrics.physical, fullMark: 100 },
    { subject: 'تكتيكية', A: primaryMetrics.tactical, fullMark: 100 },
    { subject: 'ذهنية', A: primaryMetrics.mental, fullMark: 100 }
  ];

  // Calculate overall performance score
  const overallScore = Math.round(
    (primaryMetrics.technical + primaryMetrics.physical + primaryMetrics.tactical + primaryMetrics.mental) / 4
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>نظرة عامة على الأداء</CardTitle>
        <CardDescription>ملخص لمقاييس الأداء الرئيسية للاعب</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="text-center space-y-1">
              <div className="text-4xl font-bold">{overallScore}</div>
              <div className="text-sm text-muted-foreground">التقييم العام</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-4xl font-bold text-primary">{compatibilityScore}%</div>
              <div className="text-sm text-muted-foreground">التوافق مع المركز</div>
            </div>
            <div className="text-center space-y-1">
              <div className="px-3 py-1 text-lg font-medium bg-primary/10 text-primary rounded-full">
                {position}
              </div>
              <div className="text-sm text-muted-foreground">المركز المثالي</div>
            </div>
          </div>

          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <Radar
                  name="اللاعب"
                  dataKey="A"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Medal className="h-4 w-4 text-amber-500 mr-2" />
                  <span className="text-sm font-medium">المهارات التقنية</span>
                </div>
                <span className="text-sm font-medium">{primaryMetrics.technical}%</span>
              </div>
              <Progress value={primaryMetrics.technical} className="h-2" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Gauge className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm font-medium">القدرات البدنية</span>
                </div>
                <span className="text-sm font-medium">{primaryMetrics.physical}%</span>
              </div>
              <Progress value={primaryMetrics.physical} className="h-2" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Target className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm font-medium">الوعي التكتيكي</span>
                </div>
                <span className="text-sm font-medium">{primaryMetrics.tactical}%</span>
              </div>
              <Progress value={primaryMetrics.tactical} className="h-2" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-sm font-medium">القوة الذهنية</span>
                </div>
                <span className="text-sm font-medium">{primaryMetrics.mental}%</span>
              </div>
              <Progress value={primaryMetrics.mental} className="h-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceOverviewPanel;
