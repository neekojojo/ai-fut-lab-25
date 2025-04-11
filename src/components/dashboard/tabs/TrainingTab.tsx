
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { VideoIcon, Book, Dumbbell, Calendar, Target } from 'lucide-react';
import { TrainingVideo } from '@/types/training';
import { TrainingPlanGenerator } from '@/components/advanced-analysis/TrainingPlanGenerator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DevelopmentPlanList from '@/components/DevelopmentPlanList';

interface TrainingTabProps {
  trainingVideos: TrainingVideo[];
}

const TrainingTab: React.FC<TrainingTabProps> = ({ trainingVideos }) => {
  const [trainingTab, setTrainingTab] = useState('videos');

  // Sample development plan
  const developmentPlan = {
    title: "خطة التطوير الشخصية",
    items: [
      { text: "تحسين تقنية التمرير بالقدم الضعيفة - 3 أيام في الأسبوع" },
      { text: "تدريبات السرعة والانطلاق - يومان في الأسبوع" },
      { text: "تمارين القوة للجزء السفلي من الجسم - يومان في الأسبوع" },
      { text: "تحليل الفيديو للمباريات السابقة - مرة واحدة أسبوعياً" },
      { text: "تدريبات ذهنية للتركيز واتخاذ القرار - يومياً لمدة 15 دقيقة" }
    ],
    approvedBy: "المدرب أحمد خالد"
  };

  return (
    <TabsContent value="training" className="space-y-6">
      <Tabs value={trainingTab} onValueChange={setTrainingTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
          <TabsTrigger value="videos">
            <VideoIcon className="w-4 h-4 mr-2" />
            <span>مقاطع تدريبية</span>
          </TabsTrigger>
          <TabsTrigger value="plans">
            <Book className="w-4 h-4 mr-2" />
            <span>خطط التدريب</span>
          </TabsTrigger>
          <TabsTrigger value="create">
            <Dumbbell className="w-4 h-4 mr-2" />
            <span>إنشاء خطة</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>مقاطع تدريبية</CardTitle>
              <CardDescription>تحسن مهاراتك مع هذه الموارد التدريبية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trainingVideos.map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="aspect-video relative">
                      <img src={video.thumbnailUrl} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <Button variant="outline" className="rounded-full w-12 h-12 p-0">
                          <VideoIcon className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                        {video.duration} min
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">{video.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                          <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                            {video.category || video.skill || video.targetAreas[0]}
                          </div>
                          <div className="text-xs text-muted-foreground mr-2">
                            {video.difficulty}
                          </div>
                        </div>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-3 h-3 text-yellow-500"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          <span className="text-xs mr-1">{video.rating || 4.5}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DevelopmentPlanList
              title={developmentPlan.title}
              items={developmentPlan.items}
              approvedBy={developmentPlan.approvedBy}
            />
            
            <Card>
              <CardHeader>
                <CardTitle>برنامج التدريب الأسبوعي</CardTitle>
                <CardDescription>جدول مفصل لتدريباتك هذا الأسبوع</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'].map((day, index) => (
                    <div key={index} className="p-3 border rounded-md">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{day}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>60 دقيقة</span>
                        </div>
                      </div>
                      <div className="mt-2 text-sm">
                        <div className="flex items-start gap-2">
                          <Target className="h-4 w-4 text-primary mt-0.5" />
                          <span>تدريب {index % 2 === 0 ? 'تقني' : 'بدني'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4">
                  تحميل البرنامج كاملاً
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>إنشاء خطة تدريبية مخصصة</CardTitle>
              <CardDescription>صمم خطة تدريب خاصة تناسب احتياجاتك</CardDescription>
            </CardHeader>
            <CardContent>
              <TrainingPlanGenerator analysis={{
                id: "temp-analysis-001",
                date: new Date().toISOString().split('T')[0],
                score: 75,
                playerName: "أحمد محمد",
                position: "وسط",
                timestamp: new Date().toISOString(),
                performance: {
                  technical: 67,
                  physical: 71,
                  tactical: 81,
                  mental: 67
                },
                stats: {
                  passing: 65,
                  shooting: 60,
                  dribbling: 68,
                  pace: 72,
                  physical: 70,
                  stamina: 68
                }
              }} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </TabsContent>
  );
};

export default TrainingTab;
