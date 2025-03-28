
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { PlayerAnalysis } from '@/types/playerAnalysis';
import { CHART_COLORS } from '@/components/charts/constants';
import { Badge } from '@/components/ui/badge';

interface AdvancedMetricsPanelProps {
  analysis: PlayerAnalysis;
}

export const AdvancedMetricsPanel: React.FC<AdvancedMetricsPanelProps> = ({ analysis }) => {
  // تحويل بيانات اللاعب إلى تنسيق مناسب للرسوم البيانية
  const technicalData = [
    { name: 'تمرير', value: analysis.stats?.passing || 0 },
    { name: 'تسديد', value: analysis.stats?.shooting || 0 },
    { name: 'مراوغة', value: analysis.stats?.dribbling || 0 },
    { name: 'استحواذ', value: analysis.stats?.ballControl || 0 },
    { name: 'تموضع', value: analysis.stats?.positioning || 0 },
  ];

  const physicalData = [
    { name: 'سرعة', value: analysis.stats?.pace || 0 },
    { name: 'قوة', value: analysis.stats?.physical || 0 },
    { name: 'تحمل', value: analysis.stats?.stamina || 0 },
    { name: 'رشاقة', value: analysis.stats?.agility || 0 },
    { name: 'توازن', value: analysis.stats?.balance || 0 },
  ];

  const mentalData = [
    { name: 'قرارات', value: analysis.stats?.decision || 0 },
    { name: 'توقع', value: analysis.stats?.anticipation || 0 },
    { name: 'رؤية', value: analysis.stats?.vision || 0 },
    { name: 'تركيز', value: analysis.stats?.composure || 0 },
  ];

  // بيانات الرادار التي تجمع بين المهارات المختلفة
  const radarData = [
    { attribute: 'تقنية', value: analysis.performance?.technical || 0 },
    { attribute: 'بدنية', value: analysis.performance?.physical || 0 },
    { attribute: 'تكتيكية', value: analysis.performance?.tactical || 0 },
    { attribute: 'ذهنية', value: analysis.performance?.mental || 0 },
    { attribute: 'سرعة', value: analysis.stats?.pace || 0 },
    { attribute: 'تحمل', value: analysis.stats?.stamina || 0 },
  ];

  // الرسم البياني الخطي لتتبع الحركة
  const movementData = analysis.movements?.slice(0, 20).map((m, i) => ({
    نقطة: i + 1,
    سرعة: m.speed,
    موقعX: m.x / 10,
    موقعY: m.y / 10,
  })) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>المهارات التقنية</CardTitle>
              <Badge variant="outline" className="bg-primary/10">
                {Math.round(analysis.performance?.technical || 0)}/100
              </Badge>
            </div>
            <CardDescription>تقييم المهارات الفنية للاعب</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={technicalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="value" fill={CHART_COLORS.primary} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>القدرات البدنية</CardTitle>
              <Badge variant="outline" className="bg-blue-500/10">
                {Math.round(analysis.performance?.physical || 0)}/100
              </Badge>
            </div>
            <CardDescription>تقييم اللياقة البدنية والقوة</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={physicalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="value" fill={CHART_COLORS.blue} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>القدرات الذهنية</CardTitle>
              <Badge variant="outline" className="bg-orange-500/10">
                {Math.round(analysis.performance?.mental || 0)}/100
              </Badge>
            </div>
            <CardDescription>تقييم التفكير واتخاذ القرارات</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={mentalData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="value" fill={CHART_COLORS.orange} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>تحليل الحركة</CardTitle>
            <CardDescription>تتبع السرعة والموقع خلال اللعب</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={movementData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="نقطة" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="سرعة" stroke={CHART_COLORS.primary} strokeWidth={2} />
                <Line type="monotone" dataKey="موقعX" stroke={CHART_COLORS.blue} strokeWidth={2} />
                <Line type="monotone" dataKey="موقعY" stroke={CHART_COLORS.orange} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>الملف المهاري الشامل</CardTitle>
            <CardDescription>تحليل شامل لمهارات اللاعب</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart outerRadius={90} data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="attribute" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="المهارات"
                  dataKey="value"
                  stroke={CHART_COLORS.primary}
                  fill={CHART_COLORS.primary}
                  fillOpacity={0.5}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle>نقاط القوة والضعف</CardTitle>
          <CardDescription>تحليل تفصيلي لأداء اللاعب</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">نقاط القوة</h3>
              <ul className="space-y-2">
                {analysis.strengths?.map((strength, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Badge className="bg-green-500 hover:bg-green-600">{index + 1}</Badge>
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">نقاط الضعف</h3>
              <ul className="space-y-2">
                {analysis.weaknesses?.map((weakness, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Badge className="bg-red-500 hover:bg-red-600">{index + 1}</Badge>
                    <span>{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
