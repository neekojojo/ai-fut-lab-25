
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface PositionSpecificAnalysisProps {
  position: string;
}

const PositionSpecificAnalysis: React.FC<PositionSpecificAnalysisProps> = ({ position }) => {
  // Define metrics based on position
  let metrics = [
    { name: 'التغطية المساحية', value: 75 },
    { name: 'الحركة بدون كرة', value: 82 },
    { name: 'سرعة التموضع الدفاعي', value: 68 },
    { name: 'التحرك بين الخطوط', value: 79 },
  ];

  if (position === 'Forward' || position === 'Striker' || position === 'مهاجم') {
    metrics = [
      { name: 'التمركز في منطقة الجزاء', value: 81 },
      { name: 'الحركة بدون كرة', value: 77 },
      { name: 'الاختراقات العرضية', value: 72 },
      { name: 'الجري خلف المدافعين', value: 84 },
    ];
  } else if (position === 'Midfielder' || position === 'وسط') {
    metrics = [
      { name: 'التغطية المساحية', value: 85 },
      { name: 'الانتقال بين الدفاع والهجوم', value: 79 },
      { name: 'التمركز للاستلام', value: 82 },
      { name: 'دعم الهجمات', value: 76 },
    ];
  } else if (position === 'Defender' || position === 'مدافع') {
    metrics = [
      { name: 'تغطية العمق', value: 83 },
      { name: 'التمركز الدفاعي', value: 80 },
      { name: 'التحرك الجانبي', value: 75 },
      { name: 'الخروج للاعتراض', value: 72 },
    ];
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>تحليل الحركة حسب المركز: {position}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between mb-1">
                <span>{metric.name}</span>
                <span>{metric.value}/100</span>
              </div>
              <Progress value={metric.value} className="h-2" />
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 rounded-md">
          <h4 className="font-medium mb-2">نصائح لتحسين الحركة:</h4>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>التركيز على تحسين سرعة التحرك بدون كرة</li>
            <li>زيادة الوعي المكاني وتحسين القراءة التكتيكية للمباراة</li>
            <li>تطوير القدرة على التحرك في المساحات الضيقة</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default PositionSpecificAnalysis;
