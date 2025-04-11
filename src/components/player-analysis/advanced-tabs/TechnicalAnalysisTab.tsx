
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import TechnicalSkillsRadar from '../charts/TechnicalSkillsRadar';

interface TechnicalAnalysisTabProps {
  analysis: any;
}

const TechnicalAnalysisTab: React.FC<TechnicalAnalysisTabProps> = ({ analysis }) => {
  // Sample technical metrics (in a real app, this would come from the analysis)
  const technicalMetrics = {
    passing: analysis?.technicalMetrics?.passing || 82,
    shooting: analysis?.technicalMetrics?.shooting || 75,
    dribbling: analysis?.technicalMetrics?.dribbling || 86,
    ballControl: analysis?.technicalMetrics?.ballControl || 84,
    vision: analysis?.technicalMetrics?.vision || 78,
    positioning: analysis?.technicalMetrics?.positioning || 80,
    decision: analysis?.technicalMetrics?.decision || 76,
    composure: analysis?.technicalMetrics?.composure || 72
  };
  
  const strengths = analysis?.strengths || [
    "تحكم ممتاز بالكرة", 
    "مهارة المراوغة", 
    "الرؤية الميدانية"
  ];
  
  const weaknesses = analysis?.weaknesses || [
    "التسديد من خارج منطقة الجزاء", 
    "الثبات الانفعالي تحت الضغط"
  ];
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>المهارات الفنية</CardTitle>
            <CardDescription>تحليل المهارات الفنية للاعب</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <TechnicalSkillsRadar data={[
              { attribute: "التمرير", value: technicalMetrics.passing },
              { attribute: "التسديد", value: technicalMetrics.shooting },
              { attribute: "المراوغة", value: technicalMetrics.dribbling },
              { attribute: "التحكم بالكرة", value: technicalMetrics.ballControl },
              { attribute: "الرؤية", value: technicalMetrics.vision },
              { attribute: "التموضع", value: technicalMetrics.positioning },
              { attribute: "اتخاذ القرار", value: technicalMetrics.decision },
              { attribute: "الثبات الانفعالي", value: technicalMetrics.composure }
            ]} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>نقاط القوة والضعف</CardTitle>
            <CardDescription>تحليل نقاط قوة وضعف اللاعب</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">نقاط القوة</h3>
              <div className="flex flex-wrap gap-2">
                {strengths.map((strength, index) => (
                  <Badge key={index} variant="outline" className="bg-green-50 text-green-900 dark:bg-green-900/20 dark:text-green-400">
                    {strength}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">مجالات التحسين</h3>
              <div className="flex flex-wrap gap-2">
                {weaknesses.map((weakness, index) => (
                  <Badge key={index} variant="outline" className="bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-400">
                    {weakness}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">توصيات تقنية</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>التركيز على تمارين التسديد من خارج منطقة الجزاء</li>
                <li>تطوير القدرة على الاحتفاظ بالهدوء تحت الضغط</li>
                <li>تحسين التمرير الطويل والعرضيات</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>تقييم المهارات الفنية</CardTitle>
          <CardDescription>تحليل تفصيلي للمهارات الفنية للاعب</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>التمرير</span>
                <span className="font-medium">{technicalMetrics.passing}/100</span>
              </div>
              <Progress value={technicalMetrics.passing} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>التسديد</span>
                <span className="font-medium">{technicalMetrics.shooting}/100</span>
              </div>
              <Progress value={technicalMetrics.shooting} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>المراوغة</span>
                <span className="font-medium">{technicalMetrics.dribbling}/100</span>
              </div>
              <Progress value={technicalMetrics.dribbling} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>التحكم بالكرة</span>
                <span className="font-medium">{technicalMetrics.ballControl}/100</span>
              </div>
              <Progress value={technicalMetrics.ballControl} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>الرؤية الميدانية</span>
                <span className="font-medium">{technicalMetrics.vision}/100</span>
              </div>
              <Progress value={technicalMetrics.vision} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>التموضع</span>
                <span className="font-medium">{technicalMetrics.positioning}/100</span>
              </div>
              <Progress value={technicalMetrics.positioning} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>اتخاذ القرار</span>
                <span className="font-medium">{technicalMetrics.decision}/100</span>
              </div>
              <Progress value={technicalMetrics.decision} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>الثبات الانفعالي</span>
                <span className="font-medium">{technicalMetrics.composure}/100</span>
              </div>
              <Progress value={technicalMetrics.composure} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalAnalysisTab;
