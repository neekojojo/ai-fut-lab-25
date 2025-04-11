
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Medal, 
  Dumbbell, 
  Brain, 
  Target, 
  Shield, 
  Gauge, 
  Zap, 
  BarChart
} from 'lucide-react';

interface PerformanceReportsPanelProps {
  analysis: any;
}

const PerformanceReportsPanel: React.FC<PerformanceReportsPanelProps> = ({ analysis }) => {
  // Default metrics in case they're missing from the analysis object
  const technicalMetrics = analysis?.technicalMetrics || {
    passing: 82,
    shooting: 75,
    dribbling: 86,
    ballControl: 84,
    vision: 78,
    positioning: 80,
    decision: 76,
    composure: 72
  };
  
  const physicalMetrics = analysis?.physicalMetrics || {
    speed: 78,
    acceleration: 82,
    stamina: 75,
    agility: 73,
    balance: 68,
    strength: 65,
    jumping: 70
  };
  
  const tacticalMetrics = analysis?.tacticalMetrics || {
    positioning: 79,
    awareness: 76,
    teamwork: 82,
    defensiveAwareness: 74,
    offensiveAwareness: 77,
    decisionMaking: 75,
    gamePlanning: 71
  };
  
  const mentalMetrics = analysis?.mentalMetrics || {
    concentration: 74,
    composure: 76,
    determination: 81,
    leadership: 70,
    aggression: 68,
    vision: 75,
    creativity: 78
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>التقارير الفنية والبدنية</CardTitle>
        <CardDescription>تحليل شامل لأداء اللاعب في جميع الجوانب</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="technical">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="technical" className="flex items-center gap-2">
              <Medal className="h-4 w-4" />
              <span>الفني</span>
            </TabsTrigger>
            <TabsTrigger value="physical" className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              <span>البدني</span>
            </TabsTrigger>
            <TabsTrigger value="tactical" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span>التكتيكي</span>
            </TabsTrigger>
            <TabsTrigger value="mental" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span>الذهني</span>
            </TabsTrigger>
          </TabsList>
          
          {/* التقرير الفني */}
          <TabsContent value="technical" className="space-y-6">
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mb-6">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                <Medal className="h-5 w-5 text-amber-500" />
                <span>التقرير الفني</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                يقيّم هذا التقرير المهارات التقنية للاعب مثل التمرير والتسديد والمراوغة والتحكم بالكرة.
              </p>
            </div>
            
            <div className="space-y-4">
              {Object.entries(technicalMetrics).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{key}</span>
                    <span className="text-sm">{value}/100</span>
                  </div>
                  <Progress value={Number(value)} className="h-2" />
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-medium mb-2">التوصيات الفنية</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>تمارين لتحسين دقة التمريرات الطويلة</li>
                <li>تدريبات على التسديد من خارج منطقة الجزاء</li>
                <li>تمارين لتحسين السيطرة على الكرة تحت الضغط</li>
              </ul>
            </div>
          </TabsContent>
          
          {/* التقرير البدني */}
          <TabsContent value="physical" className="space-y-6">
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mb-6">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                <Dumbbell className="h-5 w-5 text-blue-500" />
                <span>التقرير البدني</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                يقيّم هذا التقرير الجوانب البدنية للاعب مثل السرعة والتحمل والقوة والرشاقة.
              </p>
            </div>
            
            <div className="space-y-4">
              {Object.entries(physicalMetrics).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{key}</span>
                    <span className="text-sm">{value}/100</span>
                  </div>
                  <Progress value={Number(value)} className="h-2" />
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium mb-2">التوصيات البدنية</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>تمارين لتحسين السرعة الانفجارية</li>
                <li>برنامج لزيادة القوة العضلية</li>
                <li>تدريبات التحمل والمداومة</li>
              </ul>
            </div>
          </TabsContent>
          
          {/* التقرير التكتيكي */}
          <TabsContent value="tactical" className="space-y-6">
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mb-6">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                <Target className="h-5 w-5 text-indigo-500" />
                <span>التقرير التكتيكي</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                يقيّم هذا التقرير القدرات التكتيكية للاعب مثل التمركز والوعي الميداني والعمل الجماعي.
              </p>
            </div>
            
            <div className="space-y-4">
              {Object.entries(tacticalMetrics).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{key}</span>
                    <span className="text-sm">{value}/100</span>
                  </div>
                  <Progress value={Number(value)} className="h-2" />
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
              <h4 className="font-medium mb-2">التوصيات التكتيكية</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>تمارين لتحسين التمركز الدفاعي</li>
                <li>تدريبات على قراءة الهجمات المرتدة</li>
                <li>تمارين تكتيكية ضمن وحدات صغيرة</li>
              </ul>
            </div>
          </TabsContent>
          
          {/* التقرير الذهني */}
          <TabsContent value="mental" className="space-y-6">
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10 mb-6">
              <h3 className="text-lg font-medium flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-purple-500" />
                <span>التقرير الذهني</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                يقيّم هذا التقرير الجوانب الذهنية للاعب مثل التركيز واتخاذ القرار والثبات الانفعالي.
              </p>
            </div>
            
            <div className="space-y-4">
              {Object.entries(mentalMetrics).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{key}</span>
                    <span className="text-sm">{value}/100</span>
                  </div>
                  <Progress value={Number(value)} className="h-2" />
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="font-medium mb-2">التوصيات الذهنية</h4>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>تمارين ذهنية لتحسين التركيز تحت الضغط</li>
                <li>تقنيات الاسترخاء والتحضير الذهني</li>
                <li>تدريبات لاتخاذ القرارات السريعة</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceReportsPanel;
