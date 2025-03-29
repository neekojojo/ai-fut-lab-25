
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

  // Create deterministic enhanced movement data for the EnhancedMovementChart
  const mockEnhancedMovement = {
    // Basic movement analysis properties
    totalDistance: totalDistance,
    averageSpeed: avgSpeed,
    maxSpeed: maxSpeed,
    topSpeed: maxSpeed, // Using maxSpeed for topSpeed
    directionChanges: 12,
    movementEfficiency: Math.floor(65 + Math.random() * 30),
    maxAcceleration: Math.max(...movementData.map(point => point.acceleration || 0)),
    
    // Setting positionSpecificMetrics according to the expected structure in EnhancedMovementAnalysis
    positionSpecificMetrics: {
      // For a generic player, we'll set some values for attacker metrics
      attackerMetrics: {
        shotsAttempted: Math.floor(Math.random() * 10) + 1,
        shotsOnTarget: Math.floor(Math.random() * 5) + 1,
        dribbleAttempts: Math.floor(Math.random() * 15) + 5,
        dribbleSuccess: Math.floor(Math.random() * 10) + 3
      },
      // Can also add midfielderMetrics if needed
      midfielderMetrics: {
        passesAttempted: Math.floor(Math.random() * 30) + 20,
        passAccuracy: Math.floor(Math.random() * 30) + 60,
        ballControl: Math.floor(Math.random() * 20) + 70,
        visionScore: Math.floor(Math.random() * 25) + 65
      }
    },
    
    // Speed zones matching the format in MovementAnalysisResult
    speedZones: {
      walking: speedZonesObject.walking / 100,
      jogging: speedZonesObject.jogging / 100,
      running: speedZonesObject.running / 100,
      sprinting: speedZonesObject.sprinting / 100
    },
    
    // Enhanced properties
    stamina: Math.floor(75 + Math.random() * 20),
    consistency: Math.floor(70 + Math.random() * 25),
    tacticaAwareness: Math.floor(60 + Math.random() * 30),
    recoverySpeed: 7.5 + Math.random() * 2,
    
    // Directional data
    directionalData: {
      forward: 0.6,
      backward: 0.15,
      sideways: 0.25
    },
    
    // Acceleration profile
    accelerationProfile: {
      explosive: 0.35,
      sustained: 0.45,
      deceleration: 0.2
    },
    
    // Positional heatmap
    positionalHeatmap: [
      { x: 30, y: 40, value: 0.8 },
      { x: 40, y: 30, value: 0.7 },
      { x: 60, y: 50, value: 0.6 },
      { x: 70, y: 30, value: 0.5 },
      { x: 20, y: 60, value: 0.7 },
      { x: 50, y: 70, value: 0.4 }
    ],
    
    // Adding sprintCount property which appears to be needed
    sprintCount: 5
  };

  // Create a deterministic seed from the provided analysis
  const createDeterministicValues = (base: number) => {
    // Simple deterministic random generator
    const seed = base || 12345;
    const rand = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    
    return {
      // Replace all random calls with deterministic values
      shotsAttempted: Math.floor(rand() * 10) + 1,
      shotsOnTarget: Math.floor(rand() * 5) + 1,
      dribbleAttempts: Math.floor(rand() * 15) + 5,
      dribbleSuccess: Math.floor(rand() * 10) + 3,
      passesAttempted: Math.floor(rand() * 30) + 20,
      passAccuracy: Math.floor(rand() * 30) + 60,
      ballControl: Math.floor(rand() * 20) + 70,
      visionScore: Math.floor(rand() * 25) + 65,
      movementEfficiency: Math.floor(65 + rand() * 30),
      stamina: Math.floor(75 + rand() * 20),
      consistency: Math.floor(70 + rand() * 25),
      tacticaAwareness: Math.floor(60 + rand() * 30),
      recoverySpeed: 7.5 + rand() * 2
    };
  };
  
  // Create a seed from analysis data to ensure consistency
  const seed = analysis?.id ? 
    analysis.id.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) : 
    totalDistance * 100 + avgSpeed * 10 + maxSpeed;
  
  const deterministicValues = createDeterministicValues(seed);
  
  // Update mockEnhancedMovement with deterministic values
  const deterministicEnhancedMovement = {
    ...mockEnhancedMovement,
    movementEfficiency: deterministicValues.movementEfficiency,
    positionSpecificMetrics: {
      attackerMetrics: {
        shotsAttempted: deterministicValues.shotsAttempted,
        shotsOnTarget: deterministicValues.shotsOnTarget,
        dribbleAttempts: deterministicValues.dribbleAttempts,
        dribbleSuccess: deterministicValues.dribbleSuccess
      },
      midfielderMetrics: {
        passesAttempted: deterministicValues.passesAttempted,
        passAccuracy: deterministicValues.passAccuracy,
        ballControl: deterministicValues.ballControl,
        visionScore: deterministicValues.visionScore
      }
    },
    stamina: deterministicValues.stamina,
    consistency: deterministicValues.consistency,
    tacticaAwareness: deterministicValues.tacticaAwareness,
    recoverySpeed: deterministicValues.recoverySpeed
  };

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
                  movementData={movementData} 
                  speedZones={speedZonesObject} 
                  sprintCount={5}
                  efficiencyScore={deterministicValues.movementEfficiency}
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
                <EnhancedMovementChart 
                  enhancedMovement={deterministicEnhancedMovement}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default PerformanceMetricsTab;
