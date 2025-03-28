
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const InsightsPanel = ({ analysis }) => {
  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>التحليلات والرؤى</CardTitle>
          <CardDescription>تحليل عميق لأداء اللاعب ونقاط القوة والضعف</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">الملخص التحليلي</h3>
              <p className="text-sm leading-relaxed mt-2">{analysis.overallAssessment || 'لا يوجد تحليل متاح'}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">المهارات المميزة</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {analysis.distinctiveSkills && analysis.distinctiveSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">نقاط التطوير المطلوبة</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {analysis.developmentAreas && analysis.developmentAreas.map((area, index) => (
                  <Badge key={index} variant="outline" className="bg-yellow-50">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">التحليل التكتيكي</h3>
              <p className="text-sm leading-relaxed mt-2">{analysis.tacticalAnalysis || 'لا يوجد تحليل تكتيكي متاح'}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">النمط الحركي</h3>
              <p className="text-sm leading-relaxed mt-2">{analysis.movementAnalysis || 'لا يوجد تحليل حركي متاح'}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold">النظرة المستقبلية</h3>
              <p className="text-sm leading-relaxed mt-2">{analysis.futurePotential || 'لا توجد بيانات عن الإمكانيات المستقبلية'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsPanel;
