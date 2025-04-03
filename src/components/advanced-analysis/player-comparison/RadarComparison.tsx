
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, ResponsiveContainer } from 'recharts';
import { PlayerAnalysis } from '@/types/playerAnalysis';
import { CHART_COLORS } from '@/components/charts/constants';

interface RadarComparisonProps {
  currentAnalysis: PlayerAnalysis;
  selectedPlayer: PlayerAnalysis;
  radarComparisonData: Array<{
    attribute: string;
    [key: string]: string | number;
  }>;
}

export const RadarComparison: React.FC<RadarComparisonProps> = ({
  currentAnalysis,
  selectedPlayer,
  radarComparisonData
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>مقارنة الملف الشامل</CardTitle>
        <CardDescription>تحليل رادارية لمقارنة القدرات الشاملة</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart outerRadius={150} data={radarComparisonData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="attribute" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar
              name={currentAnalysis.playerName}
              dataKey={currentAnalysis.playerName}
              stroke={CHART_COLORS.primary}
              fill={CHART_COLORS.primary}
              fillOpacity={0.5}
            />
            <Radar
              name={selectedPlayer.playerName}
              dataKey={selectedPlayer.playerName}
              stroke={CHART_COLORS.blue}
              fill={CHART_COLORS.blue}
              fillOpacity={0.5}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
