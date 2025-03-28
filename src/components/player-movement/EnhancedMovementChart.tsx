
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, 
  ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar
} from 'recharts';
import { EnhancedMovementAnalysis } from '@/utils/videoDetection/movementAnalysisEnhanced';
import { TrajectoryPrediction } from '@/utils/videoDetection/trajectoryPrediction';

interface EnhancedMovementChartProps {
  enhancedMovement: EnhancedMovementAnalysis;
  trajectoryData?: TrajectoryPrediction;
}

const EnhancedMovementChart: React.FC<EnhancedMovementChartProps> = ({
  enhancedMovement,
  trajectoryData
}) => {
  // تحضير البيانات للمخطط الراداري
  const radarData = [
    {
      subject: 'سرعة',
      value: enhancedMovement.maxSpeed / 10, // تطبيع القيمة
      fullMark: 10,
    },
    {
      subject: 'تحمل',
      value: enhancedMovement.stamina / 10,
      fullMark: 10,
    },
    {
      subject: 'الثبات',
      value: enhancedMovement.consistency / 10,
      fullMark: 10,
    },
    {
      subject: 'التسارع',
      value: enhancedMovement.maxAcceleration / 2,
      fullMark: 10,
    },
    {
      subject: 'الكفاءة',
      value: enhancedMovement.movementEfficiency / 10,
      fullMark: 10,
    },
    {
      subject: 'وعي تكتيكي',
      value: enhancedMovement.tacticaAwareness / 10,
      fullMark: 10,
    },
  ];
  
  // بيانات لتحليل الاتجاه
  const directionData = [
    { name: 'للأمام', value: enhancedMovement.directionalData.forward },
    { name: 'للخلف', value: enhancedMovement.directionalData.backward },
    { name: 'جانبي', value: enhancedMovement.directionalData.sideways },
  ];
  
  // بيانات لملف التسارع
  const accelerationData = [
    { name: 'انفجاري', value: enhancedMovement.accelerationProfile.explosive },
    { name: 'مستمر', value: enhancedMovement.accelerationProfile.sustained },
    { name: 'إبطاء', value: enhancedMovement.accelerationProfile.deceleration },
  ];
  
  // ألوان للمخططات
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>التحليل المتقدم للحركة</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="radar">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="radar">الملف الشخصي للحركة</TabsTrigger>
            <TabsTrigger value="direction">تحليل الاتجاه</TabsTrigger>
            <TabsTrigger value="acceleration">ملف التسارع</TabsTrigger>
            <TabsTrigger value="heatmap">خريطة الحرارة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="radar" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-3 rounded-lg text-center">
                <div className="text-xs text-muted-foreground">التحمل</div>
                <div className="text-2xl font-bold">{enhancedMovement.stamina}<span className="text-sm">/100</span></div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-3 rounded-lg text-center">
                <div className="text-xs text-muted-foreground">الثبات</div>
                <div className="text-2xl font-bold">{enhancedMovement.consistency}<span className="text-sm">/100</span></div>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-3 rounded-lg text-center">
                <div className="text-xs text-muted-foreground">سرعة الاستشفاء</div>
                <div className="text-2xl font-bold">{enhancedMovement.recoverySpeed.toFixed(1)}</div>
              </div>
            </div>
            
            <div className="h-[320px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 10]} />
                  <Radar
                    name="اللاعب"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                  <Tooltip formatter={(value: number | string) => [`${Number(value).toFixed(1)}/10`]} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-muted p-4 rounded-lg mt-4">
              <h3 className="text-lg font-medium mb-2">تحليل الملف الشخصي</h3>
              <p className="text-sm text-muted-foreground">
                يوضح مخطط الرادار الملف الشخصي لحركة اللاعب عبر ستة أبعاد رئيسية. هذا التمثيل يسمح برؤية شاملة لنقاط القوة والضعف في الأداء الحركي.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="direction" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-[280px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={directionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(Number(percent) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {directionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [(value * 100).toFixed(0) + '%']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="flex flex-col justify-center">
                <h3 className="text-lg font-medium mb-2">تحليل اتجاهات الحركة</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  يوضح توزيع حركة اللاعب بين الاتجاهات المختلفة خلال فترة التحليل.
                </p>
                
                <div className="space-y-2">
                  {directionData.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                        <span className="text-sm">{entry.name}</span>
                      </div>
                      <span className="text-sm font-medium">{(entry.value * 100).toFixed(0)}%</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-lg text-sm text-muted-foreground">
                  الحركة المتوازنة في جميع الاتجاهات تشير إلى لاعب متعدد المهارات يمكنه التكيف مع مختلف المواقف التكتيكية.
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="acceleration" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-3 rounded-lg text-center">
                <div className="text-xs text-muted-foreground">التسارع الانفجاري</div>
                <div className="text-xl font-bold">{(enhancedMovement.accelerationProfile.explosive * 100).toFixed(0)}%</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                  <div 
                    className="bg-amber-500 h-2 rounded-full" 
                    style={{ width: `${enhancedMovement.accelerationProfile.explosive * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-3 rounded-lg text-center">
                <div className="text-xs text-muted-foreground">التسارع المستمر</div>
                <div className="text-xl font-bold">{(enhancedMovement.accelerationProfile.sustained * 100).toFixed(0)}%</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ width: `${enhancedMovement.accelerationProfile.sustained * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-3 rounded-lg text-center">
                <div className="text-xs text-muted-foreground">قدرة الإبطاء</div>
                <div className="text-xl font-bold">{(enhancedMovement.accelerationProfile.deceleration * 100).toFixed(0)}%</div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${enhancedMovement.accelerationProfile.deceleration * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={accelerationData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                  <Tooltip formatter={(value: number) => [`${(value * 100).toFixed(0)}%`]} />
                  <Legend />
                  <Bar dataKey="value" name="النسبة">
                    {accelerationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="heatmap" className="space-y-4">
            <div className="relative h-[320px] w-full bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden">
              {/* نقطة وهمية تمثل إطار الملعب */}
              <div className="absolute inset-2 border-2 border-white/30 rounded"></div>
              
              {/* خط منتصف الملعب */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/30"></div>
              <div className="absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-white/30"></div>
              
              {/* رسم النقاط الساخنة */}
              {enhancedMovement.positionalHeatmap.map((point, index) => (
                <div 
                  key={index}
                  className="absolute rounded-full bg-red-500/80"
                  style={{
                    left: `${point.x}%`,
                    top: `${point.y}%`,
                    width: `${Math.max(2, point.value * 30)}px`,
                    height: `${Math.max(2, point.value * 30)}px`,
                    transform: 'translate(-50%, -50%)',
                    opacity: Math.max(0.2, point.value),
                  }}
                ></div>
              ))}
              
              {/* رسم المسار المتوقع إذا كان متاحًا */}
              {trajectoryData && trajectoryData.predictedPositions.length > 0 && (
                <>
                  {trajectoryData.predictedPositions.map((point, index) => (
                    <div 
                      key={`pred-${index}`}
                      className="absolute rounded-full border-2 border-blue-500"
                      style={{
                        left: `${point.x / 6.4}%`,
                        top: `${point.y / 4.8}%`,
                        width: '12px',
                        height: '12px',
                        transform: 'translate(-50%, -50%)',
                        opacity: point.confidence,
                      }}
                    ></div>
                  ))}
                  
                  {/* رسم النقاط الساخنة المحتملة */}
                  {trajectoryData.potentialHotspots.map((point, index) => (
                    <div 
                      key={`hotspot-${index}`}
                      className="absolute rounded-full bg-yellow-500/50 border border-yellow-500"
                      style={{
                        left: `${point.x}%`,
                        top: `${point.y}%`,
                        width: `${Math.max(5, point.intensity * 40)}px`,
                        height: `${Math.max(5, point.intensity * 40)}px`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    ></div>
                  ))}
                </>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted p-3 rounded-lg">
                <h3 className="text-md font-medium mb-1">خريطة الحرارة الموضعية</h3>
                <p className="text-xs text-muted-foreground">
                  توضح خريطة الحرارة المناطق التي قضى فيها اللاعب معظم وقته خلال فترة التحليل، مما يعكس أسلوب اللعب والتمركز.
                </p>
              </div>
              
              {trajectoryData && (
                <div className="bg-muted p-3 rounded-lg">
                  <h3 className="text-md font-medium mb-1">التنبؤ بالمسار</h3>
                  <p className="text-xs text-muted-foreground">
                    النقاط الزرقاء تمثل المسار المتوقع للاعب بناءً على نمط حركته السابق. النقاط الصفراء تمثل مناطق محتملة للتواجد المستقبلي.
                  </p>
                  <div className="mt-2 text-xs">
                    <span className="inline-flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-1"></span> المسار المتوقع
                    </span>
                    <span className="inline-flex items-center ml-3">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full mr-1"></span> مناطق محتملة
                    </span>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnhancedMovementChart;
