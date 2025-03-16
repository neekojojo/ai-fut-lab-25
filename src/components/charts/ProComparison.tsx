
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CHART_COLORS } from './constants';
import { PlayerComparison } from '@/utils/ml/playerMLService';

interface ProComparisonProps {
  playerComparison?: PlayerComparison;
}

export const ProComparison: React.FC<ProComparisonProps> = ({
  playerComparison,
}) => {
  if (!playerComparison) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center h-40">
          <p className="text-muted-foreground">No comparison data available</p>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for player comparison chart
  const comparisonData = playerComparison.similarityMetrics.map(metric => ({
    category: metric.category,
    score: metric.score,
    description: metric.description
  }));

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Pro Player Similarity</CardTitle>
          <CardDescription>
            How your skills compare to professional players
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {playerComparison.similarProfessionals.map((player, index) => (
              <div key={index} className="flex flex-col items-center p-4 border rounded-lg bg-card">
                <div className="w-20 h-20 rounded-full overflow-hidden mb-2 bg-muted">
                  {player.imageUrl && (
                    <img src={player.imageUrl} alt={player.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <h4 className="text-lg font-medium">{player.name}</h4>
                <p className="text-sm text-muted-foreground">{player.team}</p>
                <p className="text-sm text-muted-foreground capitalize">{player.position}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-lg font-bold text-primary">{player.similarity}%</span>
                  <span className="ml-2 text-sm">match</span>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium">Strengths:</p>
                  <ul className="text-xs list-disc list-inside">
                    {player.strengths.map((strength, i) => (
                      <li key={i}>{strength}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Attribute Comparison</CardTitle>
          <CardDescription>
            How specific attributes compare to {playerComparison.similarProfessionals[0]?.name || "professionals"}
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
      </Card>
    </>
  );
};
