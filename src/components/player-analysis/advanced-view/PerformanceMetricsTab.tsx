
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import MovementAnalysisChart from '@/components/player-movement/MovementAnalysisChart';
import { useAnalysisData } from './AnalysisDataProvider';

interface PerformanceMetricsTabProps {
  movementData: any[];
  speedZones: any;
  analysis: any;
}

const PerformanceMetricsTab: React.FC<PerformanceMetricsTabProps> = ({ 
  movementData, 
  speedZones, 
  analysis 
}) => {
  // استخدام البيانات المحسنة من مزود البيانات
  const { enhancedAnalysis } = useAnalysisData(analysis);
  
  // حساب عدد التسارعات
  const sprintCount = Math.round(movementData.filter(d => d.acceleration > 2).length / 2);
  
  // كفاءة الحركة
  const efficiencyScore = enhancedAnalysis?.movementAnalysis?.movementEfficiency || 78;
  
  return (
    <div className="space-y-6">
      <MovementAnalysisChart 
        movementData={movementData}
        speedZones={speedZones}
        sprintCount={sprintCount}
        efficiencyScore={efficiencyScore}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">مؤشرات الأداء الحركي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <div>السرعة القصوى</div>
                  <div className="text-primary">{enhancedAnalysis?.movementAnalysis?.maxSpeed || 24.5} كم/س</div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${(enhancedAnalysis?.movementAnalysis?.maxSpeed / 35) * 100 || 70}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <div>المسافة الإجمالية</div>
                  <div className="text-primary">{enhancedAnalysis?.movementAnalysis?.totalDistance || 9870} م</div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${(enhancedAnalysis?.movementAnalysis?.totalDistance / 12000) * 100 || 82}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <div>تغييرات الاتجاه</div>
                  <div className="text-primary">{enhancedAnalysis?.movementAnalysis?.directionChanges || 37}</div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-amber-500 h-2.5 rounded-full" 
                    style={{ width: `${(enhancedAnalysis?.movementAnalysis?.directionChanges / 50) * 100 || 74}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <div>كفاءة الحركة</div>
                  <div className="text-primary">{efficiencyScore}%</div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-purple-500 h-2.5 rounded-full" 
                    style={{ width: `${efficiencyScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">الملاحظات التحليلية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                <h3 className="font-medium mb-1 text-blue-700 dark:text-blue-400">قدرة التسارع</h3>
                <p className="text-sm text-muted-foreground">
                  يظهر اللاعب قدرة تسارع قوية مع معدل {enhancedAnalysis?.enhancedMovement?.accelerationProfile?.explosive * 100 || 72}% في مؤشر القوة الانفجارية. هذا يعطيه ميزة تنافسية في المواقف التي تتطلب انطلاقات سريعة.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                <h3 className="font-medium mb-1 text-green-700 dark:text-green-400">التحمل والاستمرارية</h3>
                <p className="text-sm text-muted-foreground">
                  أظهر اللاعب قدرة تحمل بنسبة {enhancedAnalysis?.enhancedMovement?.stamina || 84}%، مما يشير إلى قدرته على الحفاظ على مستوى أداء مرتفع طوال فترة المباراة. معدل الاستشفاء جيد ويمكن تحسينه.
                </p>
              </div>
              
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                <h3 className="font-medium mb-1 text-amber-700 dark:text-amber-400">اتساق الأداء</h3>
                <p className="text-sm text-muted-foreground">
                  معدل اتساق الأداء بنسبة {enhancedAnalysis?.enhancedMovement?.consistency || 77}% يظهر أن اللاعب يحافظ على مستوى جيد من الثبات في الأداء. يمكن تحسين ذلك من خلال تمارين محددة لزيادة الثبات في المواقف الضاغطة.
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                <h3 className="font-medium mb-1 text-purple-700 dark:text-purple-400">الوعي التكتيكي</h3>
                <p className="text-sm text-muted-foreground">
                  يظهر مؤشر الوعي التكتيكي بنسبة {enhancedAnalysis?.enhancedMovement?.tacticaAwareness || 81}% قدرة اللاعب على قراءة اللعب والتواجد في المكان المناسب. هذا يعكس فهمًا جيدًا للعبة ويمكن تحسينه من خلال تمارين تكتيكية محددة.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerformanceMetricsTab;
