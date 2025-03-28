
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

interface MovementAnalysisChartProps {
  movementData: {
    timestamp: number;
    speed: number;
    acceleration: number;
  }[];
  speedZones?: {
    walking: number;
    jogging: number;
    running: number;
    sprinting: number;
  };
  sprintCount?: number;
  efficiencyScore?: number;
}

const MovementAnalysisChart: React.FC<MovementAnalysisChartProps> = ({
  movementData,
  speedZones = { walking: 0.5, jogging: 0.3, running: 0.15, sprinting: 0.05 },
  sprintCount = 0,
  efficiencyScore = 0
}) => {
  // تحويل البيانات الخام إلى تنسيق مناسب للرسوم البيانية
  const formattedData = movementData.map((entry, index) => ({
    name: `${Math.floor(entry.timestamp / 1000)}s`,
    speed: parseFloat(entry.speed.toFixed(2)),
    acceleration: parseFloat(entry.acceleration.toFixed(2)),
    key: index
  }));
  
  // بيانات للمخطط الدائري لمناطق السرعة
  const speedZoneData = [
    { name: 'مشي', value: speedZones.walking, color: '#10b981' },
    { name: 'هرولة', value: speedZones.jogging, color: '#3b82f6' },
    { name: 'جري', value: speedZones.running, color: '#f59e0b' },
    { name: 'سرعة قصوى', value: speedZones.sprinting, color: '#ef4444' }
  ];
  
  // حساب متوسط السرعة والتسارع
  const averageSpeed = movementData.reduce((sum, entry) => sum + entry.speed, 0) / movementData.length || 0;
  const maxSpeed = Math.max(...movementData.map(entry => entry.speed)) || 0;
  
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>تحليل الحركة</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="speed">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="speed">السرعة والتسارع</TabsTrigger>
            <TabsTrigger value="zones">مناطق السرعة</TabsTrigger>
            <TabsTrigger value="metrics">مقاييس الأداء</TabsTrigger>
          </TabsList>
          
          <TabsContent value="speed" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-primary/10 p-3 rounded-lg text-center">
                <div className="text-xs text-muted-foreground">متوسط السرعة</div>
                <div className="text-xl font-bold">{averageSpeed.toFixed(2)}</div>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg text-center">
                <div className="text-xs text-muted-foreground">أقصى سرعة</div>
                <div className="text-xl font-bold">{maxSpeed.toFixed(2)}</div>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg text-center">
                <div className="text-xs text-muted-foreground">عدد التسارعات</div>
                <div className="text-xl font-bold">{sprintCount}</div>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={formattedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number | string, name: string) => {
                      return [value, name === 'speed' ? 'السرعة' : 'التسارع'];
                    }}
                    labelFormatter={(label) => `الوقت: ${label}`}
                  />
                  <Legend
                    formatter={(value) => value === 'speed' ? 'السرعة' : 'التسارع'}
                  />
                  <Line type="monotone" dataKey="speed" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="acceleration" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="zones" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={speedZoneData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(Number(percent) * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {speedZoneData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [(value * 100).toFixed(0) + '%']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">تحليل مناطق السرعة</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  يوضح الرسم البياني النسبة المئوية للوقت الذي قضاه اللاعب في كل منطقة سرعة خلال فترة التحليل.
                </p>
                
                <div className="space-y-2">
                  {speedZoneData.map((zone, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-4 h-4 mr-2" style={{ backgroundColor: zone.color }}></div>
                      <div className="text-sm">{zone.name} - {(zone.value * 100).toFixed(0)}%</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <div className="font-medium">إحصائيات</div>
                  <div className="text-sm text-muted-foreground">اللاعبون المحترفون عادة ما يقضون 7-12% من وقت المباراة في سرعات عالية.</div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-lg">
                <div className="text-sm mb-1">كفاءة الحركة</div>
                <div className="text-2xl font-bold mb-1">{efficiencyScore.toFixed(0)}%</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${efficiencyScore}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  مقياس لمدى مباشرة وفعالية حركة اللاعب في الملعب
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-4 rounded-lg">
                <div className="text-sm mb-1">تسارعات عالية</div>
                <div className="text-2xl font-bold mb-1">{sprintCount}</div>
                <div className="flex items-end space-x-1 space-x-reverse h-10 mt-2">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-full h-${Math.min(10, Math.max(1, Math.ceil(Number(sprintCount) / 2)))} ${i < Number(sprintCount) / 2 ? 'bg-amber-500' : 'bg-gray-200 dark:bg-gray-700'} rounded-sm`}
                    ></div>
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  عدد التسارعات القصوى خلال فترة التحليل
                </div>
              </div>
            </div>
            
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { name: 'سرعة', value: averageSpeed / maxSpeed * 100 },
                    { name: 'تسارع', value: (Number(sprintCount) / 10) * 100 },
                    { name: 'كفاءة', value: efficiencyScore },
                    { name: 'ثبات', value: 100 - (Math.abs(formattedData.reduce((sum, entry, i, arr) => {
                      if (i === 0) return 0;
                      return sum + Math.abs(entry.speed - arr[i-1].speed);
                    }, 0) / formattedData.length) * 10) }
                  ]}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis label={{ value: 'النسبة المئوية %', angle: -90, position: 'insideLeft' }} />
                  <Tooltip formatter={(value: number) => [`${value.toFixed(0)}%`]} />
                  <Bar dataKey="value" fill="#8884d8">
                    {[
                      <Cell key="cell-0" fill="#3b82f6" />,
                      <Cell key="cell-1" fill="#f59e0b" />,
                      <Cell key="cell-2" fill="#10b981" />,
                      <Cell key="cell-3" fill="#8b5cf6" />
                    ]}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MovementAnalysisChart;
