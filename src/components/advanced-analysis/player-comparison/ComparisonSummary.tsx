
import React from 'react';
import { PlayerAnalysis } from '@/types/playerAnalysis';

interface ComparisonSummaryProps {
  currentAnalysis: PlayerAnalysis;
  selectedPlayer: PlayerAnalysis;
  averageDifference: number;
}

export const ComparisonSummary: React.FC<ComparisonSummaryProps> = ({
  currentAnalysis,
  selectedPlayer,
  averageDifference
}) => {
  return (
    <div className="border-t pt-4">
      <div className="text-sm font-medium mb-2">متوسط الفرق</div>
      <div className={`text-2xl font-bold ${averageDifference > 0 ? 'text-green-500' : averageDifference < 0 ? 'text-red-500' : 'text-gray-500'}`}>
        {averageDifference > 0 ? '+' : ''}{averageDifference.toFixed(1)}
      </div>
      <div className="text-xs text-muted-foreground mt-1">
        {averageDifference > 0 
          ? `${currentAnalysis.playerName} أفضل في المتوسط`
          : averageDifference < 0 
            ? `${selectedPlayer.playerName} أفضل في المتوسط`
            : 'اللاعبان متكافئان تقريباً'
        }
      </div>
    </div>
  );
};
