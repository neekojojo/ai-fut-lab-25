
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NumberMovementChart from "../NumberMovementChart";
import type { PlayerAnalysis } from "@/types/playerAnalysis";
import type { DataPoint } from "../charts/DataTypes";
import MovementAnalysis from "../MovementAnalysis";
import AdvancedPlayerCharts from '../AdvancedPlayerCharts';
import ClubCompatibilityPanel from './ClubCompatibilityPanel';

interface AdvancedAnalysisViewProps {
  analysis: PlayerAnalysis;
  onBack: () => void;
}

const AdvancedAnalysisView: React.FC<AdvancedAnalysisViewProps> = ({ analysis, onBack }) => {
  const [activeTab, setActiveTab] = useState('movement');
  
  // Generate movement data
  const generateMovementData = (): DataPoint[] => {
    return [
      { name: "Sprint", current: 78, previous: 72, alternative: 85 },
      { name: "Agility", current: 82, previous: 75, alternative: 88 },
      { name: "Balance", current: 79, previous: 74, alternative: 86 },
      { name: "Coordination", current: 81, previous: 76, alternative: 87 },
      { name: "Acceleration", current: 83, previous: 77, alternative: 89 }
    ];
  };

  // Generate physical data
  const generatePhysicalData = (): DataPoint[] => {
    return [
      { name: "Speed", current: 80, previous: 73, alternative: 86 },
      { name: "Strength", current: 75, previous: 68, alternative: 82 },
      { name: "Stamina", current: 82, previous: 75, alternative: 88 },
      { name: "Jumping", current: 77, previous: 70, alternative: 84 },
      { name: "Agility", current: 81, previous: 74, alternative: 87 }
    ];
  };

  // Generate skill data
  const generateSkillData = (): DataPoint[] => {
    return [
      { name: "Passing", current: 83, previous: 76, alternative: 89 },
      { name: "Shooting", current: 79, previous: 72, alternative: 85 },
      { name: "Dribbling", current: 81, previous: 74, alternative: 87 },
      { name: "Tackling", current: 76, previous: 69, alternative: 83 },
      { name: "Positioning", current: 80, previous: 73, alternative: 86 }
    ];
  };

  const movementsData = generateMovementData();
  const physicalData = generatePhysicalData();
  const skillData = generateSkillData();

  // تطوير النسب المئوية للتحسن
  const movementImprovement = "+5.7%";
  const physicalImprovement = "+9.0%";
  const skillImprovement = "+8.4%";

  // التوصيفات
  const movementDescription = "تحليل كفاءة حركة اللاعب بما في ذلك سرعة العدو، الرشاقة، التوازن، التنسيق، والتسارع مقارنة بالتقييم السابق والتحسينات المحتملة.";
  const physicalDescription = "تطور الصفات البدنية بما في ذلك السرعة، القوة، التحمل، القدرة على القفز والرشاقة، مع توقعات للتحسين.";
  const skillDescription = "مقارنة المهارات الفنية الرئيسية بناءً على متطلبات المركز، مع إظهار التقدم منذ التقييم الأخير والتحسن المتوقع مع التدريب المستهدف.";

  // معالج للعودة
  const handleBack = () => {
    console.log("Going back to main view");
    if (onBack) {
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">التحليل المتقدم للاعب</h2>
        <Button 
          onClick={handleBack} 
          variant="ghost"
          className="px-4 py-2 text-sm font-medium"
        >
          العودة إلى الملخص
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="movement">تحليل الحركة</TabsTrigger>
          <TabsTrigger value="performance">مخططات الأداء</TabsTrigger>
          <TabsTrigger value="ar">تصور الواقع المعزز</TabsTrigger>
        </TabsList>

        <TabsContent value="movement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تحليل الحركة</CardTitle>
              <CardDescription>
                تحليل مرئي لحركات {analysis.playerName} وتطور المهارات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="physical-movements">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="physical-movements">الحركات البدنية</TabsTrigger>
                  <TabsTrigger value="skill-analysis">تحليل المهارات</TabsTrigger>
                  <TabsTrigger value="physical-metrics">المقاييس البدنية</TabsTrigger>
                </TabsList>

                <TabsContent value="physical-movements">
                  <div className="space-y-6">
                    <div className="relative">
                      <NumberMovementChart 
                        title="تحليل كفاءة الحركة" 
                        data={movementsData} 
                        type="line"
                        colors={{
                          current: "#8B5CF6", // بنفسجي
                          previous: "#9CA3AF", // رمادي
                          alternative: "#F97316", // برتقالي
                        }}
                        description={movementDescription}
                      />
                      <div className="absolute top-4 right-4 bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-medium">
                        {movementImprovement} مقارنة بالسابق
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">يقارن تحليل الحركة مقاييس الأداء الحالية مع التقييمات السابقة والبدائل المحتملة:</p>
                      <ul className="list-disc pr-5 space-y-1 mr-5">
                        <li><span className="font-medium text-purple-500">الحالي (بنفسجي):</span> مقاييس كفاءة حركة اللاعب الحالية</li>
                        <li><span className="font-medium text-gray-500">السابق (رمادي):</span> المقاييس من التقييم السابق</li>
                        <li><span className="font-medium text-orange-500">البديل (برتقالي):</span> التحسينات المحتملة مع تعديلات التقنية المقترحة</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="skill-analysis">
                  <div className="space-y-6">
                    <div className="relative">
                      <NumberMovementChart 
                        title="مقارنة أداء المهارات" 
                        data={skillData} 
                        type="bar"
                        colors={{
                          current: "#0EA5E9", // أزرق
                          previous: "#9CA3AF", // رمادي
                          alternative: "#10B981", // أخضر
                        }}
                        description={skillDescription}
                      />
                      <div className="absolute top-4 right-4 bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-medium">
                        {skillImprovement} مقارنة بالسابق
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">يوضح تحليل المهارات التقدم في قدرات كرة القدم الأساسية:</p>
                      <ul className="list-disc pr-5 space-y-1 mr-5">
                        <li><span className="font-medium text-blue-500">الحالي (أزرق):</span> تقييمات المهارات الحالية بناءً على الأداء الأخير</li>
                        <li><span className="font-medium text-gray-500">السابق (رمادي):</span> مستويات المهارة من التقييم السابق</li>
                        <li><span className="font-medium text-green-500">البديل (أخضر):</span> مستويات المهارات المتوقعة مع التدريب المركز</li>
                      </ul>
                      <p className="mt-2">تم تحسين ملف تعريف اللاعب لمركز {analysis.position || "لاعب وسط"}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="physical-metrics">
                  <div className="space-y-6">
                    <div className="relative">
                      <NumberMovementChart 
                        title="تطور المقاييس البدنية" 
                        data={physicalData} 
                        type="area"
                        colors={{
                          current: "#D946EF", // وردي
                          previous: "#9CA3AF", // رمادي
                          alternative: "#F97316", // برتقالي
                        }}
                        description={physicalDescription}
                      />
                      <div className="absolute top-4 right-4 bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-medium">
                        {physicalImprovement} مقارنة بالسابق
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">الصفات البدنية المقاسة من خلال اختبارات الأداء القياسية:</p>
                      <ul className="list-disc pr-5 space-y-1 mr-5">
                        <li><span className="font-medium text-pink-500">الحالي (وردي):</span> القدرات البدنية الحالية</li>
                        <li><span className="font-medium text-gray-500">السابق (رمادي):</span> المقاييس البدنية من التقييم السابق</li>
                        <li><span className="font-medium text-orange-500">البديل (برتقالي):</span> المقاييس المتوقعة مع التكييف المتخصص</li>
                      </ul>
                      <p className="mt-2">الدرجة البدنية الإجمالية: {analysis.performance?.physical || 75}/100</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>مخططات الأداء</CardTitle>
              <CardDescription>
                تحليل مفصل لمقاييس المهارات، والسمات البدنية، وإمكانية التحسين
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdvancedPlayerCharts 
                playerStats={{
                  avgSpeed: 12.5,
                  maxSpeed: 22.8,
                  avgAcceleration: 2.3,
                  distanceCovered: 7800,
                  balanceScore: 82,
                  technicalScore: 78,
                  physicalScore: 82,
                  movementEfficiency: 76
                }}
                playerName={analysis.playerName}
                playerPosition={analysis.position}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ar">
          <Card>
            <CardHeader>
              <CardTitle>تصور الواقع المعزز</CardTitle>
              <CardDescription>
                تصور ثلاثي الأبعاد لحركات اللاعب والخصائص البدنية
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center bg-muted/30 rounded-md">
              <div className="text-center">
                <p className="text-muted-foreground mb-2">يتطلب تصور الواقع المعزز الوصول إلى كاميرا الجهاز</p>
                <Button>إطلاق تجربة الواقع المعزز</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedAnalysisView;
