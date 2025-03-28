
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Activity, Zap, TrendingUp, Timer, Dumbbell } from "lucide-react";
import MovementAnalysisChart from '../player-movement/MovementAnalysisChart';
import { Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { useToast } from '@/hooks/use-toast';

interface AdvancedAnalysisViewProps {
  analysis: any;
  onBack: () => void;
}

const AdvancedAnalysisView: React.FC<AdvancedAnalysisViewProps> = ({ analysis, onBack }) => {
  const [activeTab, setActiveTab] = useState('patterns');
  const { toast } = useToast();
  
  useEffect(() => {
    // Display toast when the component mounts to confirm loading
    toast({
      title: "تحليل الحركة المتقدم",
      description: "تم تحميل بيانات تحليل الحركة المتقدم بنجاح",
    });
    
    console.log("Advanced analysis view mounted with data:", analysis);
  }, [toast]);
  
  // مثال لبيانات الحركة للرسوم البيانية
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

  // بيانات حركة اللاعب الإضافية
  const movementData = Array.from({ length: 30 }, (_, i) => ({
    timestamp: i,
    speed: 5 + Math.sin(i / 3) * 3 + Math.random() * 2,
    acceleration: 1 + Math.cos(i / 4) * 0.8 + Math.random() * 0.5,
  }));

  // بيانات مناطق السرعة
  const speedZones = {
    walking: 0.45,
    jogging: 0.32,
    running: 0.18,
    sprinting: 0.05
  };

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

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="patterns">أنماط الحركة</TabsTrigger>
          <TabsTrigger value="metrics">مؤشرات الأداء</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns">
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
                      <ResponsiveContainer width="100%" height="100%">
                        <Line 
                          data={speedData} 
                          type="monotone" 
                          dataKey="current" 
                          name="الحالي"
                          stroke="#8B5CF6" 
                          strokeWidth={2}
                          activeDot={{ r: 6 }}
                        />
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  <p className="text-xs text-muted-foreground">تحليل سرعة اللاعب خلال مسافات مختلفة مقارنة بالأداء السابق</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">معدل التسارع</h3>
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <ChartContainer className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <Area 
                          data={accelerationData} 
                          type="monotone" 
                          dataKey="current" 
                          name="الحالي"
                          stroke="#10B981" 
                          fill="#10B98120"
                          strokeWidth={2}
                        />
                      </ResponsiveContainer>
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
                      <ResponsiveContainer width="100%" height="100%">
                        <Bar 
                          data={movementPatternData} 
                          dataKey="current" 
                          name="الحالي"
                          fill="#3B82F6" 
                          radius={[4, 4, 0, 0]}
                        />
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  <p className="text-xs text-muted-foreground">تحليل أنماط حركة اللاعب ومقارنتها بالأداء السابق</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">كفاءة الطاقة</h3>
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <ChartContainer className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
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
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                  <p className="text-xs text-muted-foreground">تحليل كفاءة استهلاك الطاقة خلال المباراة</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="metrics">
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-secondary/10 p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Timer className="h-4 w-4 mr-2 text-amber-500" />
                        مؤشرات التحمل
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>القدرة على التحمل</span>
                            <span className="font-medium">{85}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>سرعة الاستشفاء</span>
                            <span className="font-medium">{78}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>ثبات الأداء</span>
                            <span className="font-medium">{70}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-amber-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-secondary/10 p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center">
                        <Dumbbell className="h-4 w-4 mr-2 text-blue-500" />
                        ملف التسارع
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>التسارع المفاجئ</span>
                            <span className="font-medium">{65}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>التسارع المستمر</span>
                            <span className="font-medium">{82}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>القدرة على الإبطاء</span>
                            <span className="font-medium">{73}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '73%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalysisView;
