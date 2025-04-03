
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnhancedMovementAnalysis } from '@/utils/videoDetection/movementAnalysisEnhanced';
import { TrajectoryPrediction } from '@/utils/videoDetection/trajectoryPrediction';

interface EnhancedMovementChartProps {
  enhancedMovement: Partial<EnhancedMovementAnalysis>;
  trajectoryData?: TrajectoryPrediction;
}

const EnhancedMovementChart: React.FC<EnhancedMovementChartProps> = ({ 
  enhancedMovement,
  trajectoryData
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>تحليل الحركة المتقدم</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* جانب الاحصائيات */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-primary/5 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">أقصى سرعة</div>
                <div className="text-xl font-semibold">{enhancedMovement.maxSpeed} كم/س</div>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">متوسط السرعة</div>
                <div className="text-xl font-semibold">{enhancedMovement.avgSpeed} كم/س</div>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">أقصى تسارع</div>
                <div className="text-xl font-semibold">{enhancedMovement.maxAcceleration} م/ث²</div>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">متوسط التسارع</div>
                <div className="text-xl font-semibold">{enhancedMovement.avgAcceleration} م/ث²</div>
              </div>
            </div>

            {/* إضافة مؤشرات أخرى */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">التحمل</span>
                  <span className="text-sm font-medium">{enhancedMovement.stamina}/100</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-2" style={{ width: `${enhancedMovement.stamina}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">الثبات</span>
                  <span className="text-sm font-medium">{enhancedMovement.consistency}/100</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-2" style={{ width: `${enhancedMovement.consistency}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">كفاءة الحركة</span>
                  <span className="text-sm font-medium">{enhancedMovement.movementEfficiency}/100</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-2" style={{ width: `${enhancedMovement.movementEfficiency}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">الوعي التكتيكي</span>
                  <span className="text-sm font-medium">{enhancedMovement.tacticaAwareness}/100</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-2" style={{ width: `${enhancedMovement.tacticaAwareness}%` }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">سرعة الاستشفاء</span>
                  <span className="text-sm font-medium">{enhancedMovement.recoverySpeed}/100</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-500 h-2" style={{ width: `${enhancedMovement.recoverySpeed}%` }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* جانب المخططات البيانية */}
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium mb-3">نمط التسارع</h4>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-xs">تسارع انفجاري: {(enhancedMovement.accelerationProfile?.explosive || 0) * 100}%</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-xs">تسارع مستدام: {(enhancedMovement.accelerationProfile?.sustained || 0) * 100}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                <span className="text-xs">التباطؤ: {(enhancedMovement.accelerationProfile?.deceleration || 0) * 100}%</span>
              </div>
              
              {/* محاكاة رسم بياني بشرائط أفقية */}
              <div className="mt-4 h-4 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden flex">
                <div className="bg-green-500 h-full" style={{ width: `${(enhancedMovement.accelerationProfile?.explosive || 0) * 100}%` }}></div>
                <div className="bg-blue-500 h-full" style={{ width: `${(enhancedMovement.accelerationProfile?.sustained || 0) * 100}%` }}></div>
                <div className="bg-amber-500 h-full" style={{ width: `${(enhancedMovement.accelerationProfile?.deceleration || 0) * 100}%` }}></div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium mb-3">توزيع الاتجاهات</h4>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-xs">للأمام: {(enhancedMovement.directionalData?.forward || 0) * 100}%</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span className="text-xs">للخلف: {(enhancedMovement.directionalData?.backward || 0) * 100}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                <span className="text-xs">جانبي: {(enhancedMovement.directionalData?.sideways || 0) * 100}%</span>
              </div>
              
              {/* محاكاة رسم بياني بشرائط أفقية */}
              <div className="mt-4 h-4 bg-gray-100 dark:bg-gray-800 rounded overflow-hidden flex">
                <div className="bg-green-500 h-full" style={{ width: `${(enhancedMovement.directionalData?.forward || 0) * 100}%` }}></div>
                <div className="bg-red-500 h-full" style={{ width: `${(enhancedMovement.directionalData?.backward || 0) * 100}%` }}></div>
                <div className="bg-blue-500 h-full" style={{ width: `${(enhancedMovement.directionalData?.sideways || 0) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedMovementChart;
