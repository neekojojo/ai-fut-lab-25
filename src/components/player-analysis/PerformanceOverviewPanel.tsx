
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Skill {
  name: string;
  value: number;
}

interface PerformanceOverviewPanelProps {
  compatibilityScore?: number;
  position?: string;
  primaryMetrics?: {
    technical: number;
    physical: number;
    tactical: number;
    mental: number;
  };
  positionSkills?: Skill[];
}

const PerformanceOverviewPanel: React.FC<PerformanceOverviewPanelProps> = ({
  compatibilityScore = 89,
  position = "forward",
  primaryMetrics = {
    technical: 67,
    physical: 71,
    tactical: 81,
    mental: 67
  },
  positionSkills = [
    { name: "المراوغة", value: 68 },
    { name: "التسديد", value: 73 },
    { name: "التمريرات", value: 80 },
    { name: "التمركز", value: 72 },
    { name: "السرعة", value: 67 }
  ]
}) => {
  // تحديد النص المناسب للمركز (هجوم أو وسط)
  const positionText = position === "midfielder" ? "لاعب وسط" : "لاعب هجوم";

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>نظرة عامة على الأداء</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">مدى ملاءمة اللاعب</h3>
            <div className="text-5xl font-bold mb-2">{compatibilityScore}%</div>
            <p className="text-muted-foreground">توافق مع متطلبات مركز {positionText}</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">المقاييس الرئيسية</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>المهارات الفنية</span>
                    <span className="font-medium">{primaryMetrics.technical}/100</span>
                  </div>
                  <Progress value={primaryMetrics.technical} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>القدرات البدنية</span>
                    <span className="font-medium">{primaryMetrics.physical}/100</span>
                  </div>
                  <Progress value={primaryMetrics.physical} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>الذكاء التكتيكي</span>
                    <span className="font-medium">{primaryMetrics.tactical}/100</span>
                  </div>
                  <Progress value={primaryMetrics.tactical} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>الجانب الذهني</span>
                    <span className="font-medium">{primaryMetrics.mental}/100</span>
                  </div>
                  <Progress value={primaryMetrics.mental} className="h-2" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">مهارات خاصة بالمركز</h3>
              <div className="space-y-4">
                {positionSkills.map((skill, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between">
                      <span>{skill.name}</span>
                      <span className="font-medium">{skill.value}/100</span>
                    </div>
                    <Progress value={skill.value} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceOverviewPanel;
