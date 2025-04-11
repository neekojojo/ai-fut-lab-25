
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Activity, Award, Target, Brain, Zap, Dumbbell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import AppHeader from '@/components/layout/AppHeader';

const PlayerAnalysisPage = () => {
  const [activeTab, setActiveTab] = useState('general');
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader title="تحليل اللاعب" />
      
      <main className="max-w-6xl mx-auto p-4">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">أحمد محمد</h1>
              <p className="text-slate-300">وسط • 23 سنة</p>
            </div>
            <Button variant="outline" onClick={() => navigate('/fit-lab')}>
              الانتقال إلى FIT LAB
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <Activity className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">المؤشر العام</p>
                    <p className="text-xl font-bold">85%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="bg-amber-500/20 p-3 rounded-full">
                    <Award className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">المهارات الفنية</p>
                    <p className="text-xl font-bold">78%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <Target className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">اللياقة البدنية</p>
                    <p className="text-xl font-bold">82%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <Brain className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">الذكاء التكتيكي</p>
                    <p className="text-xl font-bold">76%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-slate-900 border-b border-slate-800 p-0 h-auto mb-6 w-full rounded-none">
            <TabsTrigger 
              value="general"
              className="flex-1 py-3 rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:bg-slate-900 data-[state=active]:shadow-none data-[state=inactive]:border-transparent"
            >
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger 
              value="technical"
              className="flex-1 py-3 rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:bg-slate-900 data-[state=active]:shadow-none data-[state=inactive]:border-transparent"
            >
              المهارات الفنية
            </TabsTrigger>
            <TabsTrigger 
              value="physical"
              className="flex-1 py-3 rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:bg-slate-900 data-[state=active]:shadow-none data-[state=inactive]:border-transparent"
            >
              اللياقة البدنية
            </TabsTrigger>
            <TabsTrigger 
              value="tactical"
              className="flex-1 py-3 rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:bg-slate-900 data-[state=active]:shadow-none data-[state=inactive]:border-transparent"
            >
              التكتيك
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">نقاط القوة</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-green-500/20 p-1 rounded-full mr-2 mt-1">
                        <Zap className="h-3 w-3 text-green-500" />
                      </div>
                      <span>دقة عالية في التمريرات القصيرة والمتوسطة</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-500/20 p-1 rounded-full mr-2 mt-1">
                        <Zap className="h-3 w-3 text-green-500" />
                      </div>
                      <span>وعي تكتيكي ممتاز وفهم جيد للمواقف</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-500/20 p-1 rounded-full mr-2 mt-1">
                        <Zap className="h-3 w-3 text-green-500" />
                      </div>
                      <span>قدرة عالية على التحمل واللعب لفترات طويلة</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-green-500/20 p-1 rounded-full mr-2 mt-1">
                        <Zap className="h-3 w-3 text-green-500" />
                      </div>
                      <span>مهارات جيدة في الاستحواذ على الكرة</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-900 border-slate-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">نقاط الضعف</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-red-500/20 p-1 rounded-full mr-2 mt-1">
                        <Zap className="h-3 w-3 text-red-500" />
                      </div>
                      <span>ضعف في الكرات الهوائية والتمريرات الطويلة</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-red-500/20 p-1 rounded-full mr-2 mt-1">
                        <Zap className="h-3 w-3 text-red-500" />
                      </div>
                      <span>بطء في الانتقال من الهجوم إلى الدفاع</span>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-red-500/20 p-1 rounded-full mr-2 mt-1">
                        <Zap className="h-3 w-3 text-red-500" />
                      </div>
                      <span>حاجة لتحسين القدرة على التسديد من خارج منطقة الجزاء</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-slate-900 border-slate-800 mt-6">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">التوصيات التدريبية</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3">التركيز على</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="bg-blue-500/20 p-1 rounded-full mr-2 mt-1">
                          <Dumbbell className="h-3 w-3 text-blue-500" />
                        </div>
                        <span>تمارين تحسين التمريرات الطويلة والكرات العالية</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-500/20 p-1 rounded-full mr-2 mt-1">
                          <Dumbbell className="h-3 w-3 text-blue-500" />
                        </div>
                        <span>تدريبات انتقالية سريعة بين الهجوم والدفاع</span>
                      </li>
                      <li className="flex items-start">
                        <div className="bg-blue-500/20 p-1 rounded-full mr-2 mt-1">
                          <Dumbbell className="h-3 w-3 text-blue-500" />
                        </div>
                        <span>تمارين التسديد من خارج منطقة الجزاء</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-3">خطة مقترحة</h4>
                    <Button
                      variant="purple"
                      className="w-full"
                      onClick={() => navigate('/training-plan')}
                    >
                      عرض خطة التدريب المقترحة
                    </Button>
                    <p className="text-sm text-slate-400 mt-3">
                      خطة مخصصة لتطوير نقاط الضعف وتعزيز نقاط القوة وفقًا لتحليل أدائك
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => navigate('/club-compatibility')}>
                توافق النادي
              </Button>
              <Button variant="outline" onClick={() => navigate('/player-stats')}>
                إحصائيات اللاعب
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="technical">
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">المهارات الفنية</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>التمرير</span>
                      <span>82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>المراوغة</span>
                      <span>76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>التسديد</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>السيطرة على الكرة</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>الركلات الثابتة</span>
                      <span>72%</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="physical">
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">اللياقة البدنية</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>السرعة</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>التحمل</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>القوة</span>
                      <span>74%</span>
                    </div>
                    <Progress value={74} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>المرونة</span>
                      <span>68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>التسارع</span>
                      <span>79%</span>
                    </div>
                    <Progress value={79} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tactical">
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">الجانب التكتيكي</h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>الوعي المكاني</span>
                      <span>80%</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>القراءة التكتيكية</span>
                      <span>76%</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>اتخاذ القرار</span>
                      <span>74%</span>
                    </div>
                    <Progress value={74} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>التمركز</span>
                      <span>82%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>الانضباط التكتيكي</span>
                      <span>79%</span>
                    </div>
                    <Progress value={79} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PlayerAnalysisPage;
