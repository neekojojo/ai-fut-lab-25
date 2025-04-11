
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Medal, Target, Sparkles, Eye } from 'lucide-react';

interface TechnicalAnalysisTabProps {
  analysis: any;
}

const TechnicalAnalysisTab: React.FC<TechnicalAnalysisTabProps> = ({ analysis }) => {
  // Ensure we have technical metrics data
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
  
  const technicalCategories = [
    { name: 'التمرير', value: technicalMetrics.passing, color: 'bg-blue-500' },
    { name: 'التسديد', value: technicalMetrics.shooting, color: 'bg-red-500' },
    { name: 'المراوغة', value: technicalMetrics.dribbling, color: 'bg-green-500' },
    { name: 'التحكم بالكرة', value: technicalMetrics.ballControl, color: 'bg-amber-500' },
    { name: 'الرؤية', value: technicalMetrics.vision, color: 'bg-purple-500' },
    { name: 'التمركز', value: technicalMetrics.positioning, color: 'bg-indigo-500' },
    { name: 'اتخاذ القرار', value: technicalMetrics.decision, color: 'bg-cyan-500' },
    { name: 'الثبات الانفعالي', value: technicalMetrics.composure, color: 'bg-teal-500' }
  ];
  
  const passMap = [
    { type: 'قصيرة', success: 85, attempted: 120 },
    { type: 'متوسطة', success: 65, attempted: 90 },
    { type: 'طويلة', success: 42, attempted: 65 },
    { type: 'عرضية', success: 18, attempted: 30 },
    { type: 'مفتاحية', success: 8, attempted: 12 }
  ];
  
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
            <CardTitle className="flex items-center gap-2">
              <Medal className="h-5 w-5 text-amber-500" />
              <span>المهارات الفنية</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {technicalCategories.map((category, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-sm">{category.value}/100</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${category.color}`}
                    style={{ width: `${category.value}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              <span>خريطة التمريرات</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {passMap.map((pass, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{pass.type}</span>
                    <span className="text-sm">{pass.success}/{pass.attempted} ({Math.round(pass.success/pass.attempted*100)}%)</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${Math.round(pass.success/pass.attempted*100)}%` }}
                    />
                  </div>
                </div>
              ))}
              
              <div className="pt-4 mt-4 border-t">
                <div className="text-sm font-medium mb-2">تحليل التمريرات</div>
                <p className="text-sm text-muted-foreground">
                  يظهر اللاعب دقة عالية في التمريرات القصيرة، مع أداء جيد في التمريرات المتوسطة والمفتاحية. يمكن تحسين أداء التمريرات الطويلة والعرضية.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>نقاط القوة والضعف</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-500" />
                <span>نقاط القوة</span>
              </h3>
              <ul className="space-y-2">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Eye className="h-5 w-5 text-red-500" />
                <span>نقاط الضعف</span>
              </h3>
              <ul className="space-y-2">
                {weaknesses.map((weakness, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500"></div>
                    <span className="text-sm">{weakness}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
            <h3 className="font-medium mb-2">التقييم الفني العام</h3>
            <p className="text-sm text-muted-foreground">
              {analysis.overallAssessment || 
                "يتمتع اللاعب بمهارات فنية متميزة في التحكم بالكرة والمراوغة مع رؤية ميدانية جيدة. يحتاج إلى تطوير قدراته في التسديد وتحسين الثبات الانفعالي أثناء المواقف الضاغطة. بشكل عام، لديه قاعدة فنية قوية تؤهله للتطور مع التدريب المناسب."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TechnicalAnalysisTab;
