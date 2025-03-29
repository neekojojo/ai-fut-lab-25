
import React from 'react';
import { Line, Bar } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MovementAnalysisChart from "@/components/player-movement/MovementAnalysisChart";
import EnhancedMovementChart from "@/components/player-movement/EnhancedMovementChart";

interface PerformanceMetricsTabProps {
  movementData: { timestamp: number; speed: number; acceleration: number; }[];
  speedZones: { name: string; percentage: number; color: string; }[];
  analysis: any;
}

const PerformanceMetricsTab: React.FC<PerformanceMetricsTabProps> = ({ 
  movementData,
  speedZones,
  analysis 
}) => {
  // Convert speedZones array to the format expected by MovementAnalysisChart
  const speedZonesObject = {
    walking: speedZones.find(zone => zone.name === 'مشي')?.percentage || 0,
    jogging: speedZones.find(zone => zone.name === 'جري خفيف')?.percentage || 0,
    running: speedZones.find(zone => zone.name === 'جري')?.percentage || 0,
    sprinting: speedZones.find(zone => zone.name === 'سرعة قصوى')?.percentage || 0
  };

  // Calculate avg, max speed and total distance from movementData
  const avgSpeed = movementData.reduce((sum, point) => sum + point.speed, 0) / movementData.length;
  const maxSpeed = Math.max(...movementData.map(point => point.speed));
  const totalDistance = movementData.reduce((sum, point, index, array) => {
    if (index === 0) return sum;
    // Simple distance calculation for demo purposes
    return sum + (point.speed * 0.5); // Assuming 0.5 time units between points
  }, 0);

  return (
    <div className="space-y-8">
      {/* Movement Performance Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4">مؤشرات الأداء الحركي</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">متوسط السرعة</CardTitle>
              <CardDescription>كيلومتر/ساعة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{avgSpeed.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {avgSpeed > 12 ? 'أعلى من المتوسط' : 'ضمن المتوسط'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">السرعة القصوى</CardTitle>
              <CardDescription>كيلومتر/ساعة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{maxSpeed.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {maxSpeed > 25 ? 'ممتاز' : 'جيد'}
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">المسافة المقطوعة</CardTitle>
              <CardDescription>كيلومتر</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalDistance.toFixed(1)}</div>
              <p className="text-xs text-muted-foreground mt-1">
                خلال فترة التحليل
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Advanced Movement Charts */}
      <section>
        <Tabs defaultValue="speed">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="speed">السرعة والتسارع</TabsTrigger>
            <TabsTrigger value="zones">مناطق السرعة</TabsTrigger>
            <TabsTrigger value="enhanced">التحليل المتقدم</TabsTrigger>
          </TabsList>
          
          <TabsContent value="speed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>تغير السرعة والتسارع مع الوقت</CardTitle>
                <CardDescription>
                  يوضح تغير سرعة وتسارع اللاعب خلال فترة التحليل
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <MovementAnalysisChart 
                  data={movementData} 
                  speedZones={speedZonesObject} 
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="zones" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>توزيع مناطق السرعة</CardTitle>
                <CardDescription>
                  النسبة المئوية للوقت المقضي في كل منطقة سرعة
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72 flex items-center justify-center">
                <div className="w-full max-w-md">
                  {speedZones.map((zone, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span>{zone.name}</span>
                        <span>{zone.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full" 
                          style={{ width: `${zone.percentage}%`, backgroundColor: zone.color }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="enhanced" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>التحليل المتقدم للحركة</CardTitle>
                <CardDescription>
                  مؤشرات متقدمة للأداء الحركي والتكتيكي
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <EnhancedMovementChart data={movementData} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default PerformanceMetricsTab;
