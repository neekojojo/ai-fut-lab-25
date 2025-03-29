
import React from 'react';
import { Trophy, Target, Flame } from 'lucide-react';

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
        
        {/* Soccer Ball representation using circle icon */}
        <div className="ml-4 mt-2 relative">
          <div className="w-16 h-16 bg-white rounded-full drop-shadow-lg animate-bounce-slow relative overflow-hidden">
            {/* Add soccer ball pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-900/10 rounded-full"></div>
              <div className="absolute w-full h-1 bg-gray-900/10 top-1/2 -translate-y-1/2"></div>
              <div className="absolute h-full w-1 bg-gray-900/10 left-1/2 -translate-x-1/2"></div>
            </div>
          </div>
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
