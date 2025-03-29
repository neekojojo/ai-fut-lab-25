
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

interface PerformanceMetricsTabProps {
  movementData: { timestamp: number; speed: number; acceleration: number }[];
  speedZones: { name: string; percentage: number; color: string }[];
  analysis: any;
}

const PerformanceMetricsTab: React.FC<PerformanceMetricsTabProps> = ({ 
  movementData, 
  speedZones,
  analysis
}) => {
  // Create data for radar chart
  const skillRadarData = [
    { subject: 'تمرير', A: 85, B: 75, fullMark: 100 },
    { subject: 'تسديد', A: 65, B: 55, fullMark: 100 },
    { subject: 'مراوغة', A: 75, B: 65, fullMark: 100 },
    { subject: 'تمركز', A: 80, B: 70, fullMark: 100 },
    { subject: 'تكتيك', A: 70, B: 60, fullMark: 100 },
    { subject: 'سرعة', A: 75, B: 68, fullMark: 100 },
  ];
  
  // Calculate total for pie chart
  const totalPercentage = speedZones.reduce((sum, zone) => sum + zone.percentage, 0);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Speed and Acceleration Chart */}
        <Card>
          <CardHeader>
            <CardTitle>السرعة والتسارع</CardTitle>
            <CardDescription>تحليل أنماط السرعة والتسارع خلال المباراة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={movementData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" label={{ value: 'الوقت (ثانية)', position: 'insideBottomRight', offset: -5 }} />
                  <YAxis yAxisId="left" label={{ value: 'السرعة (كم/س)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'التسارع (م/ث²)', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="speed" name="السرعة" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="acceleration" name="التسارع" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Speed Zones Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>توزيع مناطق السرعة</CardTitle>
            <CardDescription>نسبة الوقت المقضي في كل منطقة سرعة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={speedZones}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="percentage"
                    nameKey="name"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                  >
                    {speedZones.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'النسبة']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Skill Performance Radar */}
        <Card>
          <CardHeader>
            <CardTitle>مهارات الأداء</CardTitle>
            <CardDescription>مقارنة متعددة الأبعاد للمهارات</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="الحالي" dataKey="A" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                  <Radar name="السابق" dataKey="B" stroke="#9CA3AF" fill="#9CA3AF" fillOpacity={0.3} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Advanced Movement Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>مقاييس الحركة المتقدمة</CardTitle>
            <CardDescription>تحليل تفصيلي لمؤشرات الحركة المتقدمة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-primary/5 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">الكفاءة الحركية</div>
                  <div className="text-2xl font-bold">{analysis.stats?.movementEfficiency || 79}%</div>
                </div>
                <div className="bg-primary/5 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">ثبات الأداء</div>
                  <div className="text-2xl font-bold">{analysis.stats?.consistencyScore || 76}%</div>
                </div>
                <div className="bg-primary/5 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">التحمل</div>
                  <div className="text-2xl font-bold">{analysis.stats?.stamina || 82}%</div>
                </div>
                <div className="bg-primary/5 p-3 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">الوعي التكتيكي</div>
                  <div className="text-2xl font-bold">{analysis.stats?.tacticalAwareness || 74}%</div>
                </div>
              </div>
              
              <div className="border-t pt-4 mt-2">
                <h4 className="font-medium mb-2">ملف التسارع</h4>
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-muted-foreground">تسارع مفاجئ:</span>
                    <span className="font-medium mr-1">{analysis.stats?.explosiveAccelerations || 28}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">تسارع مستدام:</span>
                    <span className="font-medium mr-1">{analysis.stats?.sustainedAccelerations || 45}%</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">تباطؤ:</span>
                    <span className="font-medium mr-1">{analysis.stats?.decelerations || 27}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>تحليل مناطق الحركة</CardTitle>
          <CardDescription>توزيع حركة اللاعب في مختلف مناطق الملعب</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-muted/20 p-4 rounded-lg border text-center">
            <p className="text-muted-foreground mb-2">يتم إنشاء خريطة حرارية تفصيلية لتغطية اللاعب للملعب.</p>
            <p className="text-sm">تظهر البيانات أن اللاعب يفضل الجانب {analysis.preferredSide || 'الأيمن'} من الملعب، مع تغطية جيدة للمنطقة الوسطى. هناك فرصة لتحسين التغطية في المناطق الدفاعية العميقة.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceMetricsTab;
