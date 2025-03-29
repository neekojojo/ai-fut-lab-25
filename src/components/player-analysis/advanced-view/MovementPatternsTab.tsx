
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";
import { ProgressCharts } from '@/components/charts/ProgressCharts';
import NumberMovementChart from '@/components/NumberMovementChart';
import type { DataPoint } from '@/components/charts/DataTypes';

interface MovementPatternsTabProps {
  analysis: any;
}

const MovementPatternsTab: React.FC<MovementPatternsTabProps> = ({ analysis }) => {
  // Generate data for the movement efficiency chart
  const movementData: DataPoint[] = [
    { name: "سرعة", current: 78, previous: 74, alternative: 82 },
    { name: "رشاقة", current: 65, previous: 62, alternative: 70 },
    { name: "توازن", current: 82, previous: 75, alternative: 85 },
    { name: "تناسق", current: 79, previous: 72, alternative: 84 },
    { name: "تسارع", current: 70, previous: 65, alternative: 76 }
  ];

  // Generate data for the skill comparison chart
  const skillsData: DataPoint[] = [
    { name: "تمرير", current: 80, previous: 72, alternative: 85 },
    { name: "تسديد", current: 65, previous: 58, alternative: 72 },
    { name: "مراوغة", current: 72, previous: 65, alternative: 78 },
    { name: "تمركز", current: 77, previous: 70, alternative: 82 },
    { name: "استحواذ", current: 84, previous: 75, alternative: 88 }
  ];

  // Generate data for the physical metrics chart
  const physicalData: DataPoint[] = [
    { name: "سرعة", current: 75, previous: 68, alternative: 80 },
    { name: "قوة", current: 68, previous: 62, alternative: 74 },
    { name: "تحمل", current: 72, previous: 64, alternative: 78 },
    { name: "قفز", current: 65, previous: 60, alternative: 70 },
    { name: "رشاقة", current: 70, previous: 64, alternative: 76 }
  ];
  
  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/10 shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>تحليل كفاءة الحركة</CardTitle>
              <CardDescription>مقارنة كفاءة حركة اللاعب بالتقييم السابق والتحسينات المحتملة</CardDescription>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>+5.7% مقارنة بالسابق</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="movement">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="movement">الحركات البدنية</TabsTrigger>
              <TabsTrigger value="skills">تحليل المهارات</TabsTrigger>
              <TabsTrigger value="physical">المقاييس البدنية</TabsTrigger>
            </TabsList>
            
            <TabsContent value="movement">
              <NumberMovementChart 
                title="تحليل كفاءة الحركة"
                data={movementData}
                type="line"
                colors={{
                  current: "#8B5CF6", // بنفسجي
                  previous: "#9CA3AF", // رمادي
                  alternative: "#F97316" // برتقالي
                }}
                description="تحليل كفاءة حركة اللاعب بما في ذلك سرعة العدو، الرشاقة، التوازن، التناسق، والتسارع مقارنة بالتقييم السابق والتحسينات المحتملة."
              />
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="mb-2">يقارن تحليل الحركة مقاييس الأداء الحالية مع التقييمات السابقة والبدائل المحتملة:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><span className="font-medium text-purple-500">الحالي (بنفسجي):</span> مقاييس كفاءة حركة اللاعب الحالية</li>
                  <li><span className="font-medium text-gray-500">السابق (رمادي):</span> مقاييس من التقييم السابق</li>
                  <li><span className="font-medium text-orange-500">البديل (برتقالي):</span> تحسينات محتملة مع تعديلات تقنية مقترحة</li>
                </ul>
              </div>
            </TabsContent>
            
            <TabsContent value="skills">
              <NumberMovementChart 
                title="مقارنة أداء المهارات"
                data={skillsData}
                type="bar"
                colors={{
                  current: "#0EA5E9", // أزرق
                  previous: "#9CA3AF", // رمادي
                  alternative: "#10B981" // أخضر
                }}
                description="مقارنة المهارات التقنية الرئيسية بناءً على متطلبات المركز، وتظهر التقدم منذ التقييم الأخير والتحسين المتوقع مع التدريب المركّز."
              />
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="mb-2">يظهر تحليل المهارات تطور القدرات الأساسية في كرة القدم:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><span className="font-medium text-blue-500">الحالي (أزرق):</span> تقييمات المهارات الحالية بناءً على الأداء الأخير</li>
                  <li><span className="font-medium text-gray-500">السابق (رمادي):</span> مستويات المهارة من التقييم السابق</li>
                  <li><span className="font-medium text-green-500">البديل (أخضر):</span> مستويات المهارة المتوقعة مع التدريب المركّز</li>
                </ul>
                <p className="mt-2">ملف اللاعب الشخصي مُحسّن لمركز {analysis.position || 'الوسط'}.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="physical">
              <NumberMovementChart 
                title="تطور المقاييس البدنية"
                data={physicalData}
                type="area"
                colors={{
                  current: "#D946EF", // وردي
                  previous: "#9CA3AF", // رمادي
                  alternative: "#F97316" // برتقالي
                }}
                description="تطور الصفات البدنية بما في ذلك السرعة، القوة، التحمل، قدرة القفز والرشاقة، مع توقعات للتحسين."
              />
              <div className="mt-4 text-sm text-muted-foreground">
                <p className="mb-2">الصفات البدنية تُقاس من خلال اختبارات أداء موحدة:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li><span className="font-medium text-pink-500">الحالي (وردي):</span> القدرات البدنية الحالية</li>
                  <li><span className="font-medium text-gray-500">السابق (رمادي):</span> المقاييس البدنية من التقييم السابق</li>
                  <li><span className="font-medium text-orange-500">البديل (برتقالي):</span> المقاييس المتوقعة مع التكييف المتخصص</li>
                </ul>
                <p className="mt-2">النتيجة البدنية الإجمالية: {analysis.performance?.physical || 75}/100</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>تطور الأداء</CardTitle>
          <CardDescription>تتبع تقدم اللاعب على مدار الوقت</CardDescription>
        </CardHeader>
        <CardContent>
          <ProgressCharts />
        </CardContent>
      </Card>
    </div>
  );
};

export default MovementPatternsTab;
