
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">منحنى السرعة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={speedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`${value} كم/س`, 'السرعة']}
                  labelFormatter={(label) => `المسافة: ${label}`}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Line 
                  type="monotone" 
                  dataKey="current" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  name="الحالي" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="#9ca3af" 
                  strokeWidth={2} 
                  name="السابق" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">منحنى التسارع</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={accelerationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`${value} م/ث²`, 'التسارع']}
                  labelFormatter={(label) => `الوقت: ${label}`}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Line 
                  type="monotone" 
                  dataKey="current" 
                  stroke="#f59e0b" 
                  strokeWidth={2} 
                  name="الحالي" 
                  activeDot={{ r: 8 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="#9ca3af" 
                  strokeWidth={2} 
                  name="السابق" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">أنماط الحركة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={movementPatternData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`${value}`, 'التكرار']}
                  labelFormatter={(label) => `مستوى الشدة: ${label}`}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Area 
                  type="monotone" 
                  dataKey="current" 
                  stackId="1"
                  stroke="#8b5cf6" 
                  fill="#8b5cf685" 
                  name="الحالي" 
                />
                <Area 
                  type="monotone" 
                  dataKey="previous" 
                  stackId="2"
                  stroke="#9ca3af" 
                  fill="#9ca3af85" 
                  name="السابق" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">كفاءة استهلاك الطاقة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[60, 100]} />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'الكفاءة']}
                  labelFormatter={(label) => `الوقت: ${label}`}
                />
                <Legend wrapperStyle={{ paddingTop: '10px' }} />
                <Line 
                  type="monotone" 
                  dataKey="current" 
                  stroke="#10b981" 
                  strokeWidth={2} 
                  name="الحالي" 
                />
                <Line 
                  type="monotone" 
                  dataKey="previous" 
                  stroke="#9ca3af" 
                  strokeWidth={2} 
                  name="السابق" 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovementPatternsTab;
