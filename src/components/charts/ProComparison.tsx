
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
import { CHART_COLORS } from './constants';
import { PlayerComparison } from '@/utils/ml/playerMLService';

interface ProComparisonProps {
  playerComparison?: PlayerComparison;
}

export const ProComparison: React.FC<ProComparisonProps> = ({
  playerComparison,
}) => {
  // Default comparison data if none provided
  const defaultComparison: PlayerComparison = {
    similarProfessionals: [
      {
        name: "Kevin De Bruyne",
        team: "Manchester City",
        position: "midfielder",
        similarity: 78,
        strengths: ["Vision", "Passing Range", "Set Pieces"]
      },
      {
        name: "Luka Modric",
        team: "Real Madrid",
        position: "midfielder",
        similarity: 71,
        strengths: ["Game Control", "First Touch", "Positioning"]
      },
      {
        name: "Bruno Fernandes",
        team: "Manchester United",
        position: "midfielder",
        similarity: 65,
        strengths: ["Creativity", "Shot Power", "Work Rate"]
      }
    ],
    similarityMetrics: [
      { category: "Passing", score: 78, description: "Excellent range of passing with good accuracy." },
      { category: "Vision", score: 82, description: "Great awareness of teammates' positioning." },
      { category: "Technique", score: 75, description: "Good ball control and first touch." },
      { category: "Positioning", score: 70, description: "Solid understanding of spatial awareness." },
      { category: "Decision Making", score: 65, description: "Sometimes hesitates in the final third." }
    ]
  };

  // Use provided data or default
  const comparisonData = playerComparison?.similarityMetrics || defaultComparison.similarityMetrics;
  const professionals = playerComparison?.similarProfessionals || defaultComparison.similarProfessionals;

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
            {professionals.map((player, index) => (
              <div key={index} className="flex flex-col items-center p-4 border rounded-lg bg-card">
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-primary/10 mb-2">
                  <span className="text-xl font-bold text-primary">{player.name.charAt(0)}</span>
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
            How specific attributes compare to {professionals[0]?.name || "professionals"}
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
