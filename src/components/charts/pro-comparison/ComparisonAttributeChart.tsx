
import React from 'react';
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CHART_COLORS } from '../constants';
import { SimilarityMetric } from '@/utils/ml/playerMLService';

interface ComparisonAttributeChartProps {
  comparisonData: SimilarityMetric[];
  isLoading: boolean;
  professionalName: string;
}

export const ComparisonAttributeChart: React.FC<ComparisonAttributeChartProps> = ({
  comparisonData,
  isLoading,
  professionalName
}) => {
  if (isLoading) {
    return <div className="h-80 w-full bg-gray-100 animate-pulse rounded"></div>;
  }

  return (
    <>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={comparisonData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis type="category" dataKey="category" width={90} />
            <Tooltip formatter={(value) => [`${value}% similar`, ""]} />
            <Bar dataKey="score" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]}>
              {comparisonData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={entry.score > 75 ? CHART_COLORS.positive : entry.score > 50 ? CHART_COLORS.primary : CHART_COLORS.negative}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 space-y-2">
        {comparisonData.map((metric, index) => (
          <div key={index} className="text-sm">
            <span className="font-medium">{metric.category}</span>: {metric.description}
          </div>
        ))}
      </div>
    </>
  );
};
