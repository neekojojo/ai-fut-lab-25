
import React from 'react';
import { Trophy, Target, Flame, SoccerBall } from 'lucide-react';

interface FloatingElementsProps {
  playerSilhouetteSrc: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ playerSilhouetteSrc }) => {
  return (
    <div className="relative h-full w-full">
      {/* Football silhouette with animation */}
      <div className="absolute -top-10 -left-10 text-primary">
        <Target className="w-16 h-16 animate-floating-ball" />
      </div>
      
      {/* Trophy animation */}
      <div className="relative flex items-center">
        <Trophy className="text-yellow-500 w-32 h-32 drop-shadow-xl animate-float" />
        
        {/* Soccer Ball icon next to Trophy */}
        <div className="ml-4 mt-2">
          <SoccerBall className="text-white w-16 h-16 drop-shadow-lg animate-bounce-slow" />
        </div>
      </div>
      
      {/* Another football */}
      <div className="absolute -bottom-8 -right-8 text-primary">
        <Target className="w-12 h-12 animate-spin-slow" />
      </div>
      
      {/* Creating custom element instead of player silhouette */}
      {!playerSilhouetteSrc && (
        <div className="absolute -top-12 right-10 h-40 w-24 opacity-70 animate-bounce-slow">
          <div className="h-full w-full bg-gradient-to-b from-primary/20 to-transparent rounded-full blur-md"></div>
        </div>
      )}
      
      {/* Use player silhouette if provided */}
      {playerSilhouetteSrc && (
        <div className="absolute -top-12 right-10 h-40 w-24 opacity-70 animate-bounce-slow">
          <img 
            src={playerSilhouetteSrc} 
            alt="Football player" 
            className="h-full w-full object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default FloatingElements;
