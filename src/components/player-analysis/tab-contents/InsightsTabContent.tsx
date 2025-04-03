
import React from 'react';
import InsightsPanel from '../InsightsPanel';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp, Zap } from "lucide-react";

interface InsightsTabContentProps {
  analysis: any;
}

const InsightsTabContent: React.FC<InsightsTabContentProps> = ({ analysis }) => {
  // Extract movement analysis data if available
  const movementData = analysis?.physicalMetrics || {};
  const enhancedMovement = analysis?.enhancedMovement || {};
  
  // Create insights from the movement data
  const insights = [
    {
      title: "أنماط الحركة",
      description: "تحليل أنماط حركة اللاعب يظهر توازن جيد بين السرعة والرشاقة",
      icon: <Activity className="h-5 w-5 text-blue-500" />,
      data: `${Math.round(movementData.avgSpeed || 75)}% كفاءة الحركة`
    },
    {
      title: "القدرة على التسارع",
      description: "اللاعب يظهر قدرة متميزة على التسارع السريع والمحافظة على السرعة",
      icon: <Zap className="h-5 w-5 text-amber-500" />,
      data: `${Math.round(movementData.maxSpeed || 68)}% تسارع مفاجئ`
    },
    {
      title: "التحمل والاستمرارية",
      description: "مستوى التحمل والقدرة على الاستمرار بالأداء العالي لفترات طويلة",
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      data: `${Math.round(movementData.endurance || 82)}% القدرة على التحمل`
    }
  ];

  return (
    <div className="space-y-6">
      <InsightsPanel analysis={analysis} />
      
      {/* Advanced Movement Insights Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">التحليل المتقدم للحركة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className="bg-card border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-2">
                  <div className="mr-2 rtl:ml-2 rtl:mr-0">{insight.icon}</div>
                  <h3 className="font-semibold">{insight.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                <div className="text-xl font-bold text-primary">{insight.data}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
            <h4 className="font-medium mb-2">تفاصيل التحليل المتقدم</h4>
            <p className="text-sm text-muted-foreground">
              {analysis.movementAnalysis || 
                "يظهر اللاعب قدرة فائقة على تغيير السرعة واتجاه الحركة بكفاءة عالية، مما يعطيه ميزة تنافسية في المواقف التي تتطلب استجابة سريعة. كفاءة استخدام الطاقة أثناء الحركة تشير إلى إمكانية تحسين التحمل البدني من خلال تمارين مخصصة."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsTabContent;
