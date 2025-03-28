
import React from 'react';
import { Line, Area, Bar, ResponsiveContainer } from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MovementPatternsTabProps {
  speedData: any[];
  accelerationData: any[];
  movementPatternData: any[];
  energyEfficiencyData: any[];
}

const MovementPatternsTab: React.FC<MovementPatternsTabProps> = ({
  speedData,
  accelerationData,
  movementPatternData,
  energyEfficiencyData
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>السرعة والتسارع</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">منحنى السرعة</h3>
            <div className="bg-muted/20 p-4 rounded-lg">
              <ChartContainer className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <Line 
                    data={speedData} 
                    type="monotone" 
                    dataKey="current" 
                    name="الحالي"
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <p className="text-xs text-muted-foreground">تحليل سرعة اللاعب خلال مسافات مختلفة مقارنة بالأداء السابق</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">معدل التسارع</h3>
            <div className="bg-muted/20 p-4 rounded-lg">
              <ChartContainer className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <Area 
                    data={accelerationData} 
                    type="monotone" 
                    dataKey="current" 
                    name="الحالي"
                    stroke="#10B981" 
                    fill="#10B98120"
                    strokeWidth={2}
                  />
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <p className="text-xs text-muted-foreground">تحليل معدل التسارع للاعب خلال فترات زمنية مختلفة</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>أنماط الحركة وكفاءة الطاقة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">نمط الحركة</h3>
            <div className="bg-muted/20 p-4 rounded-lg">
              <ChartContainer className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <Bar 
                    data={movementPatternData} 
                    dataKey="current" 
                    name="الحالي"
                    fill="#3B82F6" 
                    radius={[4, 4, 0, 0]}
                  />
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <p className="text-xs text-muted-foreground">تحليل أنماط حركة اللاعب ومقارنتها بالأداء السابق</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">كفاءة الطاقة</h3>
            <div className="bg-muted/20 p-4 rounded-lg">
              <ChartContainer className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <Line 
                    data={energyEfficiencyData} 
                    type="monotone" 
                    dataKey="current" 
                    name="الحالي"
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </ResponsiveContainer>
              </ChartContainer>
            </div>
            <p className="text-xs text-muted-foreground">تحليل كفاءة استهلاك الطاقة خلال المباراة</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovementPatternsTab;
