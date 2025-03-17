
import React, { useEffect } from 'react';
import 'aframe';
import ARScene from './common/ARScene';
import ARStatBar from './common/ARStatBar';
import ARSpeedometer from './common/ARSpeedometer';
import ARInstructionPanel from './common/ARInstructionPanel';
import { registerCustomAframeComponents } from './utils/aframeUtils';

interface PlayerStatsARProps {
  playerStats: {
    avgSpeed: number;
    maxSpeed: number;
    avgAcceleration: number;
    distanceCovered: number;
    balanceScore: number;
    technicalScore: number;
    physicalScore: number;
    movementEfficiency: number;
  };
  playerName?: string;
}

const PlayerStatsAR: React.FC<PlayerStatsARProps> = ({
  playerStats,
  playerName = "Player"
}) => {
  // Register custom components on mount
  useEffect(() => {
    registerCustomAframeComponents();
  }, []);
  
  // Mock current speed for visualization
  const currentSpeed = playerStats.avgSpeed * 0.9;
  
  return (
    <ARScene>
      <a-assets>
        {/* You can add textures, models here */}
      </a-assets>

      {/* Player name label */}
      <a-text 
        value={`${playerName}'s Performance Stats`}
        position="0 2.5 -3" 
        width="10"
        align="center"
        color="#1A1F2C"
      ></a-text>

      {/* AR content - stats visualized as 3D bars */}
      <a-entity position="0 1 -3">
        {/* Technical Score */}
        <ARStatBar 
          position="-1.5 0 0" 
          value={playerStats.technicalScore} 
          label="Technical" 
          color="#8B5CF6" 
          animationDelay={1000}
        />

        {/* Physical Score */}
        <ARStatBar 
          position="-0.5 0 0" 
          value={playerStats.physicalScore} 
          label="Physical" 
          color="#F97316" 
          animationDelay={1200}
        />

        {/* Balance Score */}
        <ARStatBar 
          position="0.5 0 0" 
          value={playerStats.balanceScore} 
          label="Balance" 
          color="#0EA5E9" 
          animationDelay={1400}
        />

        {/* Movement Efficiency */}
        <ARStatBar 
          position="1.5 0 0" 
          value={playerStats.movementEfficiency} 
          label="Efficiency" 
          color="#10B981" 
          animationDelay={1600}
        />

        {/* Enhanced Speedometer with current speed */}
        <ARSpeedometer
          position="0 -1.5 0"
          maxSpeed={playerStats.maxSpeed}
          avgSpeed={playerStats.avgSpeed}
          currentSpeed={currentSpeed}
          size={1.2}
          title="Player Speed Metrics"
        />
      </a-entity>

      {/* Instructions */}
      <ARInstructionPanel text="Tap on elements to see detailed stats | Use WASD to move" />
    </ARScene>
  );
};

export default PlayerStatsAR;
