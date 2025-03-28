
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface StatsPanelProps {
  stats: {
    technical?: Record<string, number>;
    physical?: Record<string, number>;
  };
  analysis: {
    strengths?: string[];
    weaknesses?: string[];
    overallAssessment?: string;
  };
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, analysis }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>الإحصائيات الأساسية</CardTitle>
        <CardDescription>قياسات اللاعب الرئيسية والنتائج التحليلية</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">المهارات الفنية</h3>
              <div className="space-y-3">
                {stats.technical && Object.entries(stats.technical).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">{key}</span>
                      <span className="text-sm font-medium">{String(value)}/100</span>
                    </div>
                    <Progress value={Number(value)} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">الجوانب البدنية</h3>
              <div className="space-y-3">
                {stats.physical && Object.entries(stats.physical).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">{key}</span>
                      <span className="text-sm font-medium">{String(value)}/100</span>
                    </div>
                    <Progress value={Number(value)} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">نقاط القوة والضعف</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium mb-2">نقاط القوة:</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.strengths && analysis.strengths.map((strength, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">نقاط الضعف:</h4>
                <div className="flex flex-wrap gap-2">
                  {analysis.weaknesses && analysis.weaknesses.map((weakness, index) => (
                    <Badge key={index} variant="outline" className="bg-red-50">
                      {weakness}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">التقييم العام</h3>
            <p className="text-sm leading-relaxed">{analysis.overallAssessment || 'لا يوجد تقييم عام متاح'}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsPanel;
