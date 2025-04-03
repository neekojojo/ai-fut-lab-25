
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PlayerAnalysis } from '@/types/playerAnalysis';
import { CHART_COLORS } from '@/components/charts/constants';

interface TechnicalComparisonProps {
  currentAnalysis: PlayerAnalysis;
  selectedPlayer: PlayerAnalysis | undefined;
  technicalComparisonData: Array<{
    skill: string;
    [key: string]: string | number;
  }>;
}

export const TechnicalComparison: React.FC<TechnicalComparisonProps> = ({
  currentAnalysis,
  selectedPlayer,
  technicalComparisonData
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>مقارنة المهارات الفنية</CardTitle>
        <CardDescription>تحليل مقارن للمهارات الأساسية</CardDescription>
      </CardHeader>
      <CardContent>
        {selectedPlayer ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={technicalComparisonData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey={currentAnalysis.playerName} 
                fill={CHART_COLORS.primary} 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey={selectedPlayer.playerName} 
                fill={CHART_COLORS.blue} 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            يرجى اختيار لاعب للمقارنة
          </div>
        )}
      </CardContent>
    </Card>
  );
};
