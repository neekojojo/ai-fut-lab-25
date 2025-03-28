import React, { useState } from 'react';
import EnhancedMovementChart from './EnhancedMovementChart';
import MovementAnalysisChart from './MovementAnalysisChart';
import PositionSpecificAnalysis from './PositionSpecificAnalysis';
import EyeTrackingVisualization from './EyeTrackingVisualization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EnhancedMovementAnalysis } from '@/utils/videoDetection/movementAnalysisEnhanced';
import { TrajectoryPrediction } from '@/utils/videoDetection/trajectoryPrediction';
import { PerformanceMetrics } from '@/utils/performance/PerformanceAnalyzer';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface AdvancedAnalysisPanelProps {
  enhancedMovement: EnhancedMovementAnalysis;
  trajectoryData: TrajectoryPrediction;
  performanceMetrics: PerformanceMetrics;
}

// Helper functions moved outside the component to be accessible
const getMetricDisplayName = (metricKey: string): string => {
  const displayNames: Record<string, string> = {
    speed: 'السرعة',
    endurance: 'التحمل',
    agility: 'الرشاقة',
    control: 'التحكم',
    positioning: 'التمركز',
    decisionMaking: 'اتخاذ القرار',
    explosiveness: 'القوة الانفجارية',
    recoveryRate: 'معدل الاستشفاء',
    tacticalAwareness: 'الوعي التكتيكي',
    pressureResistance: 'مقاومة الضغط',
    consistency: 'الثبات'
  };
  
  return displayNames[metricKey] || metricKey;
};

const getStrengthDescription = (strength: string): string => {
  const descriptions: Record<string, string> = {
    'السرعة': 'قدرة فائقة على الحركة بسرعة عالية وتنفيذ انطلاقات سريعة',
    'التحمل': 'قدرة ممتازة على الاستمرار بنفس المستوى طوال المباراة',
    'الرشاقة': 'قدرة متميزة على تغيير الاتجاه بسرعة والمناورة',
    'التحكم': 'مستوى عالٍ من السيطرة والتحكم في الحركة',
    'التمركز': 'ذكاء تكتيكي عالٍ في اختيار المواقع المناسبة',
    'اتخاذ القرار': 'قدرة متميزة على اتخاذ القرارات السريعة والصحيحة',
    'القوة الانفجارية': 'قدرة عالية على الانطلاق السريع والتسارع المفاجئ',
    'معدل الاستشفاء': 'قدرة ممتازة على استعادة اللياقة بسرعة بعد المجهود',
    'الوعي التكتيكي': 'فهم ممتاز للمواقف التكتيكية وقراءة اللعب',
    'مقاومة الضغط': 'أداء ثابت ومتميز تحت الضغط',
    'الثبات': 'مستوى أداء ثابت ومتوازن طوال المباراة'
  };
  
  return descriptions[strength] || 'نقطة قوة متميزة تساهم في الأداء العام';
};

const AdvancedAnalysisPanel: React.FC<AdvancedAnalysisPanelProps> = ({
  enhancedMovement,
  trajectoryData,
  performanceMetrics
}) => {
  // تحضير بيانات الحركة للمخطط
  const movementData = enhancedMovement.positionalHeatmap.map((entry, i) => ({
    timestamp: i * 1000, // محاكاة طوابع زمنية
    speed: enhancedMovement.maxSpeed * Math.random() * 0.8,
    acceleration: enhancedMovement.maxAcceleration * Math.random() * 0.7
  }));
  
  // State for selected player position
  const [selectedPosition, setSelectedPosition] = useState<'defender' | 'midfielder' | 'attacker' | 'goalkeeper'>('midfielder');
  
  // Generate eye tracking data for visualization (typically would come from real analysis)
  const simulatedEyeTrackingData = {
    focusScore: 82 + Math.random() * 10,
    scanningEfficiency: 78 + Math.random() * 10,
    decisionTimeMs: 350 - Math.random() * 100,
    awarenessRating: 85 + Math.random() * 10,
    anticipationScore: 80 + Math.random() * 15,
    focusPoints: Array(15).fill(0).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 500 + 100
    }))
  };
  
  // Generate technical consistency data
  const technicalConsistency = enhancedMovement.technicalConsistency || Math.round(70 + Math.random() * 20);
  const pressureResistance = enhancedMovement.pressureResistance || Math.round(65 + Math.random() * 25);
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="movement" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="movement">الحركة المتقدمة</TabsTrigger>
          <TabsTrigger value="position">تحليل المركز</TabsTrigger>
          <TabsTrigger value="eyeTracking">تتبع العين</TabsTrigger>
          <TabsTrigger value="performance">الأداء الفني</TabsTrigger>
          <TabsTrigger value="recommendations">التوصيات</TabsTrigger>
        </TabsList>
        
        {/* Movement Tab */}
        <TabsContent value="movement" className="space-y-4">
          <EnhancedMovementChart
            enhancedMovement={enhancedMovement}
            trajectoryData={trajectoryData}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">تحليل المسار</CardTitle>
                <CardDescription>تنبؤ بحركة اللاعب المستقبلية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">احتمالية تغيير الاتجاه</span>
                    <span className="font-medium">
                      {(trajectoryData.nextDirectionChange.likelihood * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">الإطار الزمني المتوقع</span>
                    <span className="font-medium">
                      {(trajectoryData.nextDirectionChange.timeframe / 1000).toFixed(1)} ثانية
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">عدد النقاط الساخنة</span>
                    <span className="font-medium">
                      {trajectoryData.potentialHotspots.length}
                    </span>
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="text-sm font-medium mb-2">المناطق الأكثر تواجداً</div>
                    <div className="flex flex-wrap gap-2">
                      {trajectoryData.potentialHotspots.map((spot, index) => (
                        <Badge key={index} variant="outline" className="bg-primary/5">
                          {spot.x.toFixed(0)}×{spot.y.toFixed(0)} ({(spot.intensity * 100).toFixed(0)}%)
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">مؤشرات متقدمة</CardTitle>
                <CardDescription>قياسات حركية متقدمة للاعب</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">الوعي التكتيكي</div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${enhancedMovement.tacticaAwareness}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>0</span>
                      <span>{enhancedMovement.tacticaAwareness}</span>
                      <span>100</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">ملف اتجاهات الحركة</div>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      <div className="p-2 bg-primary/5 rounded text-center">
                        <div className="text-xs text-muted-foreground">للأمام</div>
                        <div className="font-medium">
                          {(enhancedMovement.directionalData.forward * 100).toFixed(0)}%
                        </div>
                      </div>
                      <div className="p-2 bg-primary/5 rounded text-center">
                        <div className="text-xs text-muted-foreground">للخلف</div>
                        <div className="font-medium">
                          {(enhancedMovement.directionalData.backward * 100).toFixed(0)}%
                        </div>
                      </div>
                      <div className="p-2 bg-primary/5 rounded text-center">
                        <div className="text-xs text-muted-foreground">جانبي</div>
                        <div className="font-medium">
                          {(enhancedMovement.directionalData.sideways * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="text-sm flex justify-between mb-1">
                      <span className="text-muted-foreground">سرعة الاستشفاء</span>
                      <span className="font-medium">{enhancedMovement.recoverySpeed.toFixed(1)}</span>
                    </div>
                    <div className="text-sm flex justify-between mb-1">
                      <span className="text-muted-foreground">الثبات</span>
                      <span className="font-medium">{enhancedMovement.consistency}/100</span>
                    </div>
                    <div className="text-sm flex justify-between mb-1">
                      <span className="text-muted-foreground">التحمل</span>
                      <span className="font-medium">{enhancedMovement.stamina}/100</span>
                    </div>
                  </div>
                  
                  {/* Add new Phase 5 metrics */}
                  <div className="pt-2 border-t">
                    <div className="text-sm font-medium mb-2">مؤشرات الفعالية الجديدة</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-sm flex justify-between mb-1">
                          <span className="text-muted-foreground">الثبات الفني</span>
                          <span className="font-medium">{technicalConsistency}/100</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full" 
                            style={{ width: `${technicalConsistency}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm flex justify-between mb-1">
                          <span className="text-muted-foreground">مقاومة الضغط</span>
                          <span className="font-medium">{pressureResistance}/100</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full">
                          <div 
                            className="bg-purple-500 h-1.5 rounded-full" 
                            style={{ width: `${pressureResistance}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Add zone transitions section */}
                  {enhancedMovement.zoneTransitions && (
                    <div className="pt-2 border-t">
                      <div className="text-sm font-medium mb-2">تحليل انتقالات المناطق</div>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <div className="p-1.5 bg-primary/5 rounded text-center">
                          <div className="text-xs text-muted-foreground">دفاع ← هجوم</div>
                          <div className="font-medium">{enhancedMovement.zoneTransitions.defensiveToOffensive}</div>
                        </div>
                        <div className="p-1.5 bg-primary/5 rounded text-center">
                          <div className="text-xs text-muted-foreground">هجوم ← دفاع</div>
                          <div className="font-medium">{enhancedMovement.zoneTransitions.offensiveToDefensive}</div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="text-xs text-muted-foreground mb-1">فعالية الانتقال</div>
                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full">
                          <div 
                            className="bg-green-500 h-1.5 rounded-full" 
                            style={{ width: `${enhancedMovement.zoneTransitions.effectiveness}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Position Analysis Tab */}
        <TabsContent value="position" className="space-y-4">
          <Card className="mb-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">تحليل مخصص حسب المركز</CardTitle>
              <CardDescription>تحليل الأداء بناءً على متطلبات المركز المحدد</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm text-muted-foreground">اختر مركز اللاعب:</div>
                <Select 
                  value={selectedPosition} 
                  onValueChange={(value) => setSelectedPosition(value as any)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="اختر المركز" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="defender">مدافع</SelectItem>
                    <SelectItem value="midfielder">لاعب وسط</SelectItem>
                    <SelectItem value="attacker">مهاجم</SelectItem>
                    <SelectItem value="goalkeeper">حارس مرمى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <PositionSpecificAnalysis 
                data={{
                  ...enhancedMovement,
                  positionSpecificMetrics: {
                    defenderMetrics: {
                      tacklesAttempted: Math.round(enhancedMovement.directionChanges * 0.3),
                      interceptionsAttempted: Math.round(enhancedMovement.directionChanges * 0.5),
                      clearancesAttempted: Math.round(enhancedMovement.directionChanges * 0.2),
                      defensePositioning: Math.round(enhancedMovement.movementEfficiency)
                    },
                    midfielderMetrics: {
                      passesAttempted: Math.round(enhancedMovement.directionChanges * 0.7),
                      passAccuracy: Math.round(enhancedMovement.movementEfficiency * 0.8),
                      ballControl: Math.round((1 - (enhancedMovement.speedZones.sprinting + enhancedMovement.speedZones.running) / 2) * 100),
                      visionScore: Math.round(enhancedMovement.movementEfficiency * 0.9)
                    },
                    attackerMetrics: {
                      shotsAttempted: Math.round(enhancedMovement.speedZones.sprinting * 10),
                      shotsOnTarget: Math.round(enhancedMovement.speedZones.sprinting * 10 * (enhancedMovement.movementEfficiency / 100)),
                      dribbleAttempts: Math.round(enhancedMovement.directionChanges * 0.8),
                      dribbleSuccess: Math.round(enhancedMovement.directionChanges * 0.8 * (enhancedMovement.movementEfficiency / 100))
                    },
                    goalkeeperMetrics: {
                      savesAttempted: Math.round(enhancedMovement.directionChanges * 0.4),
                      saveSuccess: Math.round(enhancedMovement.directionChanges * 0.4 * (enhancedMovement.movementEfficiency / 100)),
                      distribution: Math.round(enhancedMovement.movementEfficiency * 0.7),
                      commandOfArea: Math.round((enhancedMovement.speedZones.walking + enhancedMovement.speedZones.jogging) * 100)
                    }
                  },
                  topSpeed: enhancedMovement.maxSpeed * 1.2,
                  accelerationProfile: {
                    explosive: 0.8,
                    sustained: 0.65,
                    deceleration: 0.7
                  }
                }} 
                playerPosition={selectedPosition}
              />
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">ملخص الحركة حسب المركز</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">التوافق مع المركز</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">
                        {selectedPosition === 'midfielder' ? '85%' :
                          selectedPosition === 'attacker' ? '78%' :
                          selectedPosition === 'defender' ? '72%' : '65%'}
                      </span>
                      <Badge size="sm" variant={
                        selectedPosition === 'midfielder' ? 'high' :
                        selectedPosition === 'attacker' ? 'medium' :
                        'low'
                      }>
                        {selectedPosition === 'midfielder' ? 'عالي' :
                          selectedPosition === 'attacker' ? 'جيد' : 'متوسط'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3 space-y-2">
                    <h4 className="text-sm font-medium">قدرات بارزة في هذا المركز</h4>
                    <ul className="text-sm space-y-1">
                      {selectedPosition === 'midfielder' && (
                        <>
                          <li className="flex items-center gap-2">
                            <Badge size="sm" variant="success">موهبة</Badge>
                            <span>رؤية ممتازة للملعب وقدرة على التمرير</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge size="sm" variant="success">موهبة</Badge>
                            <span>تحكم جيد بالكرة تحت الضغط</span>
                          </li>
                        </>
                      )}
                      {selectedPosition === 'attacker' && (
                        <>
                          <li className="flex items-center gap-2">
                            <Badge size="sm" variant="success">موهبة</Badge>
                            <span>سرعة عالية في الانطلاقات الهجومية</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge size="sm" variant="medium">جيد</Badge>
                            <span>قدرة على المراوغة والالتفاف</span>
                          </li>
                        </>
                      )}
                      {selectedPosition === 'defender' && (
                        <>
                          <li className="flex items-center gap-2">
                            <Badge size="sm" variant="success">موهبة</Badge>
                            <span>قدرة على تنظيم خط الدفاع</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge size="sm" variant="medium">جيد</Badge>
                            <span>القدرة على قراءة هجمات الخصم</span>
                          </li>
                        </>
                      )}
                      {selectedPosition === 'goalkeeper' && (
                        <>
                          <li className="flex items-center gap-2">
                            <Badge size="sm" variant="medium">جيد</Badge>
                            <span>ردود فعل سريعة</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Badge size="sm" variant="medium">جيد</Badge>
                            <span>السيطرة على منطقة الجزاء</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">تدريبات خاصة بالمركز</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-3">
                    تدريبات مقترحة لتطوير أداء اللاعب في مركز {
                      selectedPosition === 'midfielder' ? 'لاعب الوسط' :
                      selectedPosition === 'attacker' ? 'المهاجم' :
                      selectedPosition === 'defender' ? 'المدافع' : 'حارس المرمى'
                    }:
                  </p>
                  
                  <ul className="space-y-2 text-sm">
                    {selectedPosition === 'midfielder' && (
                      <>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">1</div>
                          <div>
                            <p className="font-medium">تدريبات التمرير المتقدمة</p>
                            <p className="text-muted-foreground">تمارين دقة التمرير تحت الضغط والتمريرات الطويلة والقصيرة</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">2</div>
                          <div>
                            <p className="font-medium">تدريبات رؤية الملعب</p>
                            <p className="text-muted-foreground">تمارين لتطوير رؤية الملعب وقراءة تحركات اللاعبين</p>
                          </div>
                        </li>
                      </>
                    )}
                    {selectedPosition === 'attacker' && (
                      <>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">1</div>
                          <div>
                            <p className="font-medium">تدريبات التسديد</p>
                            <p className="text-muted-foreground">تمارين دقة التسديد من مختلف المواقع والزوايا</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">2</div>
                          <div>
                            <p className="font-medium">تدريبات المراوغة السريعة</p>
                            <p className="text-muted-foreground">تمارين لتطوير القدرة على المراوغة والتحرك بسرعة مع الكرة</p>
                          </div>
                        </li>
                      </>
                    )}
                    {selectedPosition === 'defender' && (
                      <>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">1</div>
                          <div>
                            <p className="font-medium">تدريبات التدخل الدفاعي</p>
                            <p className="text-muted-foreground">تمارين تحسين توقيت وتقنية التدخلات الدفاعية</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">2</div>
                          <div>
                            <p className="font-medium">تدريبات القراءة الدفاعية</p>
                            <p className="text-muted-foreground">تمارين لتطوير قراءة هجمات الخصم واعتراض الكرات</p>
                          </div>
                        </li>
                      </>
                    )}
                    {selectedPosition === 'goalkeeper' && (
                      <>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">1</div>
                          <div>
                            <p className="font-medium">تدريبات ردود الفعل</p>
                            <p className="text-muted-foreground">تمارين تحسين سرعة رد الفعل والتصدي للكرات القريبة</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">2</div>
                          <div>
                            <p className="font-medium">تدريبات الخروج من المرمى</p>
                            <p className="text-muted-foreground">تمارين تحسين توقيت وتقنية الخروج من المرمى</p>
                          </div>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* NEW: Eye Tracking Tab */}
        <TabsContent value="eyeTracking" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <EyeTrackingVisualization eyeTrackingData={simulatedEyeTrackingData} />
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">مهارات الذكاء الكروي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">الذكاء التكتيكي</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">
                        {Math.round((simulatedEyeTrackingData.scanningEfficiency + 
                                    simulatedEyeTrackingData.awarenessRating) / 2)}
                      </span>
                      <Badge size="sm" variant="high">متميز</Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">القراءة المسبقة للعب</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">
                        {Math.round(simulatedEyeTrackingData.anticipationScore)}
                      </span>
                      <Badge size="sm" variant="medium">جيد</Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">سرعة اتخاذ القرار</span>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">
                        {Math.round(100 - (simulatedEyeTrackingData.decisionTimeMs / 10))}
                      </span>
                      <Badge size="sm" variant="high">متميز</Badge>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3 space-y-2">
                    <h4 className="text-sm font-medium">مميزات عملية التفكير</h4>
                    <ul className="text-sm space-y-1">
                      <li className="flex items-center gap-2">
                        <Badge size="sm" variant="success">موهبة</Badge>
                        <span>قدرة استثنائية على مسح الملعب بشكل سريع وفعال</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge size="sm" variant="success">موهبة</Badge>
                        <span>وعي عالي بمواقع الزملاء والخصوم</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Badge size="sm" variant="info">ملاحظة</Badge>
                        <span>يحتاج إلى تحسين تركيز النظر أثناء حالات الضغط</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">توصيات تطوير مهارات الذكاء الكروي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-3">
                    تدريبات مقترحة لتطوير مهارات الذكاء الكروي والقدرات الذهنية:
                  </p>
                  
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">1</div>
                      <div>
                        <p className="font-medium">تدريبات المسح البصري</p>
                        <p className="text-muted-foreground">تمارين لتحسين مهارة مسح الملعب وتوسيع الرؤية المحيطية</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">2</div>
                      <div>
                        <p className="font-medium">تدريبات اتخاذ القرار تحت الضغط</p>
                        <p className="text-muted-foreground">محاكاة مواقف اللعب الحقيقية مع وجود ضغط زمني لاتخاذ القرار</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xs">3</div>
                      <div>
                        <p className="font-medium">تمارين الوعي التكتيكي</p>
                        <p className="text-muted-foreground">مشاهدة وتحليل المباريات من منظور تكتيكي وفهم تحركات اللاعبين</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>التقييم الفني</CardTitle>
              <CardDescription>تحليل مفصل للأداء الفني للاعب</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                  <div className="text-xs text-muted-foreground">التقييم العام</div>
                  <div className="text-3xl font-bold mt-1">{performanceMetrics.overallScore}</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                  <div className="text-xs text-muted-foreground">الأداء الفني</div>
                  <div className="text-3xl font-bold mt-1">{performanceMetrics.technicalScore}</div>
                </div>
                <div className="text-center p-4 bg-amber-50 dark:bg-amber-950/30 rounded-lg">
                  <div className="text-xs text-muted-foreground">الأداء البدني</div>
                  <div className="text-3xl font-bold mt-1">{performanceMetrics.physicalScore}</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                  <div className="text-xs text-muted-foreground">الأداء التكتيكي</div>
                  <div className="text-3xl font-bold mt-1">{performanceMetrics.tacticalScore}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">تفاصيل المهارات</h3>
                  <div className="space-y-3">
                    {Object.entries(performanceMetrics.breakdown).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{getMetricDisplayName(key)}</span>
                          <span className="font-medium">{value.toFixed(0)}/100</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full">
                          <div 
                            className="bg-primary h-1.5 rounded-full" 
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>نقاط القوة ومجالات التحسين</CardTitle>
              <CardDescription>تحليل وتوصيات لتطوير الأداء</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">نقاط القوة</h3>
                  <ul className="space-y-2">
                    {performanceMetrics.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1
