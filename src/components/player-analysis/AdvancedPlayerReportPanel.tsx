
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PlayerAnalysis } from '@/types/playerAnalysis';
import { Progress } from '@/components/ui/progress';
import { Euro, Trophy, Users, Check } from 'lucide-react';

interface AdvancedPlayerReportPanelProps {
  analysis: PlayerAnalysis;
}

const AdvancedPlayerReportPanel: React.FC<AdvancedPlayerReportPanelProps> = ({ analysis }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const formatMarketValue = (value?: number) => {
    if (!value) return '€0';
    if (value >= 1000000) {
      return `€${(value / 1000000).toFixed(1)}M`;
    }
    if (value >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`;
    }
    return `€${value}`;
  };

  const proComparison = {
    name: 'Alisson Becker',
    similarity: 41,
    skills: [
      { name: 'Reflexes', you: 55, pro: 93 },
      { name: 'Positioning', you: 56, pro: 94 },
      { name: 'Handling', you: 54, pro: 91 },
      { name: 'Passing', you: 52, pro: 87 },
      { name: 'Command', you: 55, pro: 92 }
    ],
    developmentPath: [
      'Improve your Positioning with specialized training',
      'Improve your Reflexes with specialized training',
      'Improve your Command with specialized training'
    ]
  };

  const trainingPlan = {
    technical: {
      title: 'Day 1-2: Technical',
      exercises: [
        { id: 1, name: 'Ball control drills', duration: '30 min' },
        { id: 2, name: 'Passing precision exercises', duration: '30 min' },
        { id: 3, name: 'Shooting practice', duration: '30 min' }
      ]
    },
    physical: {
      title: 'Day 3-4: Physical',
      exercises: [
        { id: 1, name: 'Sprint intervals', duration: '20 min' },
        { id: 2, name: 'Strength training', duration: '40 min' },
        { id: 3, name: 'Agility ladder drills', duration: '20 min' }
      ]
    },
    tactical: {
      title: 'Day 5-6: Tactical',
      exercises: [
        { id: 1, name: 'Position-specific movements', duration: '30 min' },
        { id: 2, name: 'Decision making exercises', duration: '30 min' },
        { id: 3, name: 'Small-sided games', duration: '30 min' }
      ]
    },
    focusAreas: [
      {
        id: 1,
        title: 'Improve communication with the defense for set pieces',
        description: 'This will improve your technical ability and decision making in key moments'
      }
    ]
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-background border-b pb-3">
        <div className="text-center">
          <div className="inline-block px-3 py-1 mb-2 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
            تم اكتمال التحليل المتقدم
          </div>
          <CardTitle className="text-3xl font-bold">تقرير الأداء المتقدم للاعب</CardTitle>
          <CardDescription className="max-w-3xl mx-auto mt-2">
            قام الذكاء الاصطناعي بتحليل الفيديو بشكل دقيق وإنشاء تقييم شامل مع مقاييس تفصيلية ومقارنات مع محترفين.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="detailed">تحليل مفصل</TabsTrigger>
            <TabsTrigger value="training">خطة التدريب</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">القيمة السوقية</CardTitle>
                    <Euro className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardDescription>القيمة التقديرية الحالية</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">
                    {formatMarketValue(analysis.marketData?.currentValue || 31900000)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    بناءً على الأداء الحالي والعمر وظروف السوق
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">مؤشر الموهبة</CardTitle>
                    <Trophy className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardDescription>التقييم العام من 100</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{analysis.talentScore || 71}</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    محترف
                  </div>
                  <Progress value={analysis.talentScore || 71} className="h-2 mt-4" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">التوافق مع الفريق</CardTitle>
                    <Users className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <CardDescription>مدى ملاءمة اللاعب</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{analysis.compatibilityScore || 89}%</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    توافق مع متطلبات مركز {analysis.position}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تحليل المهارات المفصل</CardTitle>
                <CardDescription>مقارنة تفصيلية بين مهاراتك والمعايير المهنية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mr-4 rtl:ml-4 rtl:mr-0">
                        <img 
                          src="/placeholder.svg" 
                          alt="Player avatar" 
                          className="h-12 w-12 object-cover rounded-full"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">تشابه الأسلوب</h3>
                        <p className="text-muted-foreground">مدى التشابه في أسلوب اللعب</p>
                      </div>
                    </div>
                    <div className="text-4xl font-bold">{proComparison.similarity}%</div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">مقارنة المهارات</h3>
                    <div className="space-y-4">
                      {proComparison.skills.map((skill, index) => (
                        <div key={index} className="space-y-1">
                          <div className="flex justify-between mb-1">
                            <span>{skill.name}</span>
                            <div className="space-x-2 rtl:space-x-reverse">
                              <span>أنت: {skill.you}</span>
                              <span className="text-primary">{proComparison.name}: {skill.pro}</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div className="bg-black dark:bg-white h-2 rounded-l-full rtl:rounded-r-full rtl:rounded-l-none" style={{ width: `${skill.you}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">مسار التطوير</h3>
                    <p className="mb-4">للوصول إلى مستوى مشابه لـ {proComparison.name}، ركز على هذه المجالات الرئيسية:</p>
                    <div className="space-y-2">
                      {proComparison.developmentPath.map((tip, index) => (
                        <div key={index} className="flex items-start">
                          <div className="mr-2 rtl:ml-2 rtl:mr-0 mt-1">
                            <Check className="h-5 w-5 text-green-500" />
                          </div>
                          <p>{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>خطة التدريب المخصصة</CardTitle>
                <CardDescription>نظام تدريبي موصى به بناءً على تحليلك</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">الجدول الأسبوعي</h3>
                    
                    <div className="space-y-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{trainingPlan.technical.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {trainingPlan.technical.exercises.map((exercise) => (
                              <div key={exercise.id} className="flex items-center">
                                <div className="bg-gray-200 dark:bg-gray-800 rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium mr-3 rtl:ml-3 rtl:mr-0">
                                  {exercise.id}
                                </div>
                                <div>{exercise.name} ({exercise.duration})</div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{trainingPlan.physical.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {trainingPlan.physical.exercises.map((exercise) => (
                              <div key={exercise.id} className="flex items-center">
                                <div className="bg-gray-200 dark:bg-gray-800 rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium mr-3 rtl:ml-3 rtl:mr-0">
                                  {exercise.id}
                                </div>
                                <div>{exercise.name} ({exercise.duration})</div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{trainingPlan.tactical.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {trainingPlan.tactical.exercises.map((exercise) => (
                              <div key={exercise.id} className="flex items-center">
                                <div className="bg-gray-200 dark:bg-gray-800 rounded-full h-6 w-6 flex items-center justify-center text-xs font-medium mr-3 rtl:ml-3 rtl:mr-0">
                                  {exercise.id}
                                </div>
                                <div>{exercise.name} ({exercise.duration})</div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-4">مجالات التركيز بناءً على التحليل</h3>
                    <div className="space-y-4">
                      {trainingPlan.focusAreas.map((area) => (
                        <Card key={area.id}>
                          <CardHeader className="pb-2">
                            <div className="flex items-center">
                              <div className="bg-gray-200 dark:bg-gray-800 rounded-full h-8 w-8 flex items-center justify-center text-sm font-medium mr-3 rtl:ml-3 rtl:mr-0">
                                {area.id}
                              </div>
                              <CardTitle className="text-base">{area.title}</CardTitle>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground">{area.description}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedPlayerReportPanel;
