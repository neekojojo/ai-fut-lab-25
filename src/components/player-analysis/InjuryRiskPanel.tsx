
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface InjuryRiskArea {
  name: string;
  risk: number;
  recommendation: string;
}

interface InjuryRiskData {
  overall: number;
  areas: InjuryRiskArea[];
  recommendations: string[];
}

interface InjuryRiskPanelProps {
  injuryRisk: InjuryRiskData;
}

const InjuryRiskPanel: React.FC<InjuryRiskPanelProps> = ({ injuryRisk }) => {
  const getRiskColorClass = (risk: number) => {
    if (risk < 40) return 'text-green-500';
    if (risk < 70) return 'text-amber-500';
    return 'text-red-500';
  };

  const getRiskProgressColorClass = (risk: number) => {
    if (risk < 40) return 'bg-green-500';
    if (risk < 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getRiskLabel = (risk: number) => {
    if (risk < 40) return 'منخفض';
    if (risk < 70) return 'متوسط';
    return 'مرتفع';
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle>تقييم مخاطر الإصابة</CardTitle>
          <CardDescription>تحليل احتمالات الإصابة وكيفية الوقاية منها</CardDescription>
        </div>
        <ShieldAlert className={`h-5 w-5 ${getRiskColorClass(injuryRisk.overall)}`} />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium">المخاطر الإجمالية</span>
              <span className={`text-sm font-medium ${getRiskColorClass(injuryRisk.overall)}`}>
                {getRiskLabel(injuryRisk.overall)}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
              <div 
                className={`h-full rounded-full ${getRiskProgressColorClass(injuryRisk.overall)}`} 
                style={{ width: `${injuryRisk.overall}%` }}
              ></div>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="text-base font-medium mb-3">المناطق الأكثر عرضة للإصابة</h3>
            <div className="space-y-3">
              {injuryRisk.areas.map((area, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <AlertTriangle className={`h-4 w-4 mr-2 ${getRiskColorClass(area.risk)}`} />
                      <span className="text-sm font-medium">{area.name}</span>
                    </div>
                    <span className={`text-xs ${getRiskColorClass(area.risk)}`}>
                      {area.risk}%
                    </span>
                  </div>
                  <Progress value={area.risk} className={`h-1.5 ${getRiskProgressColorClass(area.risk)}`} />
                  <p className="text-xs text-muted-foreground mt-1">
                    {area.recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t">
            <h3 className="text-base font-medium mb-3">التوصيات الوقائية</h3>
            <div className="space-y-2">
              {injuryRisk.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t">
            <div className="flex items-start p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md mt-2">
              <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-2" />
              <div>
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">ملاحظة هامة</h4>
                <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">
                  هذا التقييم يستند إلى بيانات الأداء والنماذج الإحصائية. يرجى استشارة الطاقم الطبي للحصول على تقييم شامل.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InjuryRiskPanel;
