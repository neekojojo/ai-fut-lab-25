
import React, { useState, useEffect } from 'react';
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
import { professionalPlayerService } from '@/services/professionalPlayerService';
import { PlayerStats } from '@/utils/dataProcessing/playerMLService';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw } from 'lucide-react';

interface ProComparisonProps {
  playerComparison?: PlayerComparison;
  playerStats?: PlayerStats;
  playerPosition?: string;
}

export const ProComparison: React.FC<ProComparisonProps> = ({
  playerComparison: initialComparison,
  playerStats,
  playerPosition,
}) => {
  const [playerComparison, setPlayerComparison] = useState<PlayerComparison | undefined>(initialComparison);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch real player comparison data
  const fetchRealComparison = async () => {
    if (!playerStats) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Convert player stats to attributes format expected by the API
      const attributes = {
        speed: playerStats.maxSpeed / 200 * 100, // normalize to 0-100
        acceleration: playerStats.avgAcceleration / 50 * 100,
        endurance: playerStats.distanceCovered / 5000 * 100,
        balance: playerStats.balanceScore,
        technical: playerStats.technicalScore,
        physical: playerStats.physicalScore,
        efficiency: playerStats.movementEfficiency
      };
      
      const result = await professionalPlayerService.getSimilarPlayers(attributes, playerPosition);
      
      if (result) {
        setPlayerComparison(result);
      }
    } catch (err) {
      console.error('Error fetching professional player comparison:', err);
      setError('Failed to fetch professional player data');
    } finally {
      setIsLoading(false);
    }
  };

  // Use initialization and default comparison data if none provided
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

  // Initial data load
  useEffect(() => {
    if (playerStats && !initialComparison) {
      fetchRealComparison();
    }
  }, [playerStats, initialComparison]);

  // Use provided data or default
  const comparisonData = playerComparison?.similarityMetrics || defaultComparison.similarityMetrics;
  const professionals = playerComparison?.similarProfessionals || defaultComparison.similarProfessionals;

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Pro Player Similarity</CardTitle>
              <CardDescription>
                How your skills compare to professional players
              </CardDescription>
            </div>
            {playerStats && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={fetchRealComparison} 
                disabled={isLoading}
              >
                {isLoading ? <Skeleton className="h-4 w-4 rounded-full" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                {isLoading ? 'Loading...' : 'Refresh Data'}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="p-4 mb-4 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array(3).fill(0).map((_, i) => (
                <div key={i} className="flex flex-col items-center p-4 border rounded-lg animate-pulse">
                  <div className="w-20 h-20 rounded-full bg-gray-200 mb-2"></div>
                  <div className="h-5 bg-gray-200 rounded w-24 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-12 mb-2"></div>
                  <div className="w-full h-20 mt-2 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
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
          )}
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
          {isLoading ? (
            <div className="h-80 w-full bg-gray-100 animate-pulse rounded"></div>
          ) : (
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
          )}
          
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
