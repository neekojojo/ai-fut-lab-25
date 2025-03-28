import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  Activity, 
  Zap, 
  Dumbbell, 
  Timer, 
  TrendingUp 
} from "lucide-react";

interface MovementPanelProps {
  analysis: any;
}

const MovementPanel: React.FC<MovementPanelProps> = ({ analysis }) => {
  // Generate movement data based on player stats
  const generateMovementData = () => {
    const baseSpeed = analysis.stats?.speed || 75;
    const baseAgility = analysis.stats?.agility || 70;
    const baseBalance = analysis.stats?.balance || 72;
    
    return [
      {
        name: "سرعة",
        value: baseSpeed,
        fill: "#4f46e5",
      },
      {
        name: "رشاقة",
        value: baseAgility,
        fill: "#0ea5e9",
      },
      {
        name: "توازن",
        value: baseBalance,
        fill: "#8b5cf6",
      },
      {
        name: "تسارع",
        value: Math.round((baseSpeed * 0.7) + (baseAgility * 0.3)),
        fill: "#f97316",
      },
      {
        name: "قوة",
        value: analysis.stats?.strength || 68,
        fill: "#ef4444",
      },
    ];
  };

  // Generate physical metrics data
  const generatePhysicalData = () => {
    return [
      {
        name: "سرعة قصوى",
        value: analysis.physicalMetrics?.maxSpeed || 28,
        unit: "كم/س",
        icon: <Zap className="h-4 w-4 text-amber-500" />,
      },
      {
        name: "متوسط السرعة",
        value: analysis.physicalMetrics?.avgSpeed || 12,
        unit: "كم/س",
        icon: <Activity className="h-4 w-4 text-blue-500" />,
      },
      {
        name: "المسافة المقطوعة",
        value: analysis.physicalMetrics?.distance || 7.2,
        unit: "كم",
        icon: <TrendingUp className="h-4 w-4 text-green-500" />,
      },
      {
        name: "قوة العضلات",
        value: analysis.physicalMetrics?.strength || 72,
        unit: "%",
        icon: <Dumbbell className="h-4 w-4 text-red-500" />,
      },
      {
        name: "التحمل",
        value: analysis.physicalMetrics?.endurance || 80,
        unit: "%",
        icon: <Timer className="h-4 w-4 text-purple-500" />,
      },
    ];
  };

  const movementData = generateMovementData();
  const physicalData = generatePhysicalData();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium">تحليل الحركة والأداء البدني</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="movement">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="movement">مؤشرات الحركة</TabsTrigger>
              <TabsTrigger value="physical">المقاييس البدنية</TabsTrigger>
            </TabsList>
            
            <TabsContent value="movement" className="pt-4">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={movementData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'القيمة']}
                      labelFormatter={(name) => `${name}`}
                    />
                    <Legend />
                    <Bar dataKey="value" name="القيمة" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>تحليل مؤشرات الحركة يقيس القدرات الحركية الأساسية للاعب ويقارنها بمعايير المستوى المحترف.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="physical" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {physicalData.map((item, index) => (
                  <div key={index} className="flex items-center p-3 border rounded-lg bg-card">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 rtl:ml-3 rtl:mr-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-2xl font-bold">
                        {item.value}
                        <span className="text-sm text-muted-foreground mr-1">{item.unit}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>المقاييس البدنية تعكس الأداء الفعلي للاعب خلال المباريات والتدريبات، وتساعد في تحديد نقاط القوة والضعف.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <div className="bg-muted/40 p-4 rounded-lg border border-border">
        <h3 className="font-medium mb-2">ملاحظات المحلل</h3>
        <p className="text-sm text-muted-foreground">
          {analysis.movementNotes || 
            "يظهر اللاعب قدرات حركية جيدة مع إمكانية تحسين في الرشاقة والتوازن. يوصى بتمارين مخصصة لتحسين القدرة على تغيير الاتجاه بسرعة أكبر والحفاظ على التوازن أثناء المناورات السريعة."}
        </p>
      </div>
    </div>
  );
};

export default MovementPanel;
