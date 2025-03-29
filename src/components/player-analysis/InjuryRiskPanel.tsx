
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Circle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { InjuryRiskData } from '@/types/injuries';

interface InjuryRiskPanelProps {
  injuryRisk: InjuryRiskData;
}

const InjuryRiskPanel: React.FC<InjuryRiskPanelProps> = ({ injuryRisk }) => {
  const formatRiskPercentage = (value: number) => {
    return value.toFixed(1) + '%';
  };

  // تحديد لون مؤشر الخطر حسب النسبة
  const getRiskColor = (risk: number) => {
    if (risk < 20) return 'text-green-500';
    if (risk < 40) return 'text-amber-500';
    return 'text-red-500';
  };

  // تحديد لون شريط التقدم حسب نسبة الخطر
  const getProgressColor = (risk: number) => {
    if (risk < 20) return 'bg-green-500';
    if (risk < 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <CardTitle>تقييم مخاطر الإصابة</CardTitle>
        </div>
        <CardDescription>تحليل احتمالية إصابات محتملة بناءً على نمط الحركة</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">مستوى الخطر العام</h3>
            <div className="flex items-baseline mb-1">
              <span className={`text-2xl font-bold ${getRiskColor(injuryRisk.overall)}`}>
                {formatRiskPercentage(injuryRisk.overall)}
              </span>
              <span className="text-sm text-muted-foreground ml-2 rtl:mr-2 rtl:ml-0">نسبة خطر</span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              بناءً على أنماط الحركة والخصائص البدنية
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">تحليل مناطق الخطر</h3>
            <div className="space-y-4">
              {injuryRisk.areas.map((area, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between mb-1">
                    <span>{area.name}</span>
                    <span className={`font-medium ${getRiskColor(area.risk)}`}>
                      {formatRiskPercentage(area.risk)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`${getProgressColor(area.risk)} h-2 rounded-full`} 
                      style={{ width: `${area.risk}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{area.recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">توصيات للوقاية</h3>
            <div className="space-y-3">
              {injuryRisk.areas.map((area, index) => (
                <div key={index} className="border p-3 rounded-lg bg-card">
                  <div className="flex items-center mb-2">
                    <Circle className="h-3 w-3 fill-amber-500 text-amber-500 mr-2 rtl:ml-2 rtl:mr-0" />
                    <span className="font-medium">{area.name}</span>
                  </div>
                  <p className="text-sm">{area.recommendation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InjuryRiskPanel;
