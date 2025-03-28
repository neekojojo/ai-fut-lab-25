
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Activity } from "lucide-react";
import { ChartContainer } from '@/components/ui/chart';
import { Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface AdvancedAnalysisViewProps {
  analysis: any;
  onBack: () => void;
}

const AdvancedAnalysisView: React.FC<AdvancedAnalysisViewProps> = ({ analysis, onBack }) => {
  // Example movement data for charts
  const speedData = [
    { name: "0م", current: 0, previous: 0 },
    { name: "5م", current: 12, previous: 10 },
    { name: "10م", current: 18, previous: 15 },
    { name: "15م", current: 22, previous: 20 },
    { name: "20م", current: 19, previous: 17 },
    { name: "25م", current: 15, previous: 14 },
    { name: "30م", current: 10, previous: 8 }
  ];

  const accelerationData = [
    { name: "0ث", current: 0, previous: 0 },
    { name: "1ث", current: 4.2, previous: 3.8 },
    { name: "2ث", current: 3.8, previous: 3.5 },
    { name: "3ث", current: 2.5, previous: 2.2 },
    { name: "4ث", current: 1.8, previous: 1.5 },
    { name: "5ث", current: 0.9, previous: 0.8 }
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
    { name: "0د", current: 100, previous: 100 },
    { name: "15د", current: 95, previous: 90 },
    { name: "30د", current: 90, previous: 82 },
    { name: "45د", current: 88, previous: 78 },
    { name: "60د", current: 85, previous: 73 },
    { name: "75د", current: 82, previous: 68 },
    { name: "90د", current: 80, previous: 65 }
  ];

  const renderLineChart = (data: any[], dataKeys: string[], colors: string[]) => (
    <ResponsiveContainer width="100%" height={250}>
      <Line 
        data={data} 
        type="monotone" 
        dataKey={dataKeys[0]} 
        stroke={colors[0]} 
        strokeWidth={2} 
        dot={{ r: 4 }}
        activeDot={{ r: 6 }}
      />
    </ResponsiveContainer>
  );

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
            <div className="space-y-2">
              <h3 className="text-sm font-medium">منحنى السرعة</h3>
              <div className="bg-muted/20 p-4 rounded-lg">
                <ChartContainer className="h-[250px]">
                  <Line 
                    data={speedData} 
                    type="monotone" 
                    dataKey="current" 
                    name="الحالي"
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    data={speedData} 
                    type="monotone" 
                    dataKey="previous" 
                    name="السابق"
                    stroke="#D1D5DB" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                </ChartContainer>
              </div>
              <p className="text-xs text-muted-foreground">تحليل سرعة اللاعب خلال مسافات مختلفة مقارنة بالأداء السابق</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">معدل التسارع</h3>
              <div className="bg-muted/20 p-4 rounded-lg">
                <ChartContainer className="h-[250px]">
                  <Area 
                    data={accelerationData} 
                    type="monotone" 
                    dataKey="current" 
                    name="الحالي"
                    stroke="#10B981" 
                    fill="#10B98120"
                    strokeWidth={2}
                  />
                  <Area 
                    data={accelerationData} 
                    type="monotone" 
                    dataKey="previous" 
                    name="السابق"
                    stroke="#D1D5DB" 
                    fill="#D1D5DB20"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                </ChartContainer>
              </div>
              <p className="text-xs text-muted-foreground">تحليل معدل التسارع للاعب خلال فترات زمنية مختلفة</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>أنماط الحركة وكفاءة الطاقة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">نمط الحركة</h3>
              <div className="bg-muted/20 p-4 rounded-lg">
                <ChartContainer className="h-[250px]">
                  <Bar 
                    data={movementPatternData} 
                    dataKey="current" 
                    name="الحالي"
                    fill="#3B82F6" 
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    data={movementPatternData} 
                    dataKey="previous" 
                    name="السابق"
                    fill="#D1D5DB" 
                    radius={[4, 4, 0, 0]}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                </ChartContainer>
              </div>
              <p className="text-xs text-muted-foreground">تحليل أنماط حركة اللاعب ومقارنتها بالأداء السابق</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">كفاءة الطاقة</h3>
              <div className="bg-muted/20 p-4 rounded-lg">
                <ChartContainer className="h-[250px]">
                  <Line 
                    data={energyEfficiencyData} 
                    type="monotone" 
                    dataKey="current" 
                    name="الحالي"
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line 
                    data={energyEfficiencyData} 
                    type="monotone" 
                    dataKey="previous" 
                    name="السابق"
                    stroke="#D1D5DB" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                </ChartContainer>
              </div>
              <p className="text-xs text-muted-foreground">تحليل كفاءة استهلاك الطاقة خلال المباراة</p>
            </div>
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
