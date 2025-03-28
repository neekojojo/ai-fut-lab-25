
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProfessionalPlayer } from '@/utils/ml/playerMLService';
import { PlayerCardGrid } from './PlayerCardGrid';
import { RefreshCw } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

interface PlayerSimilarityCardProps {
  professionals: ProfessionalPlayer[];
  isLoading: boolean;
  error: string | null;
  playerStats?: any;
  fetchRealComparison: () => void;
}

export const PlayerSimilarityCard: React.FC<PlayerSimilarityCardProps> = ({
  professionals,
  isLoading,
  error,
  playerStats,
  fetchRealComparison
}) => {
  return (
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
        
        <PlayerCardGrid professionals={professionals} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};
