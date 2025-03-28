
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MovementAnalysis from '@/components/MovementAnalysis';

const MovementPanel = ({ analysis }) => {
  return (
    <div className="space-y-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>تحليل الحركة</CardTitle>
          <CardDescription>تفاصيل حركة اللاعب وأنماط تنقله خلال المباراة</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">نمط الحركة:</h3>
              <p className="text-sm leading-relaxed">{analysis.movementPattern || 'لا توجد بيانات عن نمط الحركة'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">تغطية الملعب:</h3>
              <p className="text-sm leading-relaxed">{analysis.fieldCoverage || 'لا توجد بيانات عن تغطية الملعب'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">سرعة الاستجابة:</h3>
              <p className="text-sm leading-relaxed">{analysis.reactionSpeed || 'لا توجد بيانات عن سرعة الاستجابة'}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">التوقع:</h3>
              <p className="text-sm leading-relaxed">{analysis.anticipation || 'لا توجد بيانات عن التوقع'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <MovementAnalysis analysis={analysis} />
    </div>
  );
};

export default MovementPanel;
