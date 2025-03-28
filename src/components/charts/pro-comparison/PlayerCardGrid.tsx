
import React from 'react';
import { ProfessionalPlayer } from '@/utils/ml/playerMLService';
import { PlayerCard } from './PlayerCard';
import { Skeleton } from '@/components/ui/skeleton';

interface PlayerCardGridProps {
  professionals: ProfessionalPlayer[];
  isLoading: boolean;
}

export const PlayerCardGrid: React.FC<PlayerCardGridProps> = ({ 
  professionals, 
  isLoading 
}) => {
  if (isLoading) {
    return (
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
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {professionals.map((player, index) => (
        <PlayerCard key={index} player={player} index={index} />
      ))}
    </div>
  );
};
