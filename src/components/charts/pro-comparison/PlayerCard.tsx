
import React from 'react';
import { ProfessionalPlayer } from '@/utils/ml/playerMLService';

interface PlayerCardProps {
  player: ProfessionalPlayer;
  index: number;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player, index }) => {
  return (
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
  );
};
