
import React, { useEffect, useRef } from 'react';
import 'aframe';

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
  const sceneRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Register custom AR components if needed
    if (typeof window !== 'undefined') {
      // Check if AFRAME is already registered to avoid errors
      if (window.AFRAME) {
        // Register any custom components here
      }
    }

    return () => {
      // Cleanup if necessary
    };
  }, []);

  // Scale values for visualization (0-10 scale)
  const scaleValue = (value: number, max: number = 100) => (value / max) * 2;
  
  return (
    <div className="ar-scene-container w-full h-[500px] relative">
      <a-scene embedded ref={sceneRef} className="w-full h-full rounded-lg">
        <a-assets>
          {/* You can add textures, models here */}
        </a-assets>

        {/* Environment */}
        <a-sky color="#F1F0FB"></a-sky>

        {/* Player name label */}
        <a-text 
          value={playerName} 
          position="0 2.5 -3" 
          width="10"
          align="center"
          color="#1A1F2C"
        ></a-text>

        {/* AR content - stats visualized as 3D bars */}
        <a-entity position="0 1 -3">
          {/* Technical Score */}
          <a-box 
            position="-1.5 0 0" 
            height={scaleValue(playerStats.technicalScore)} 
            width="0.4" 
            depth="0.4" 
            color="#8B5CF6"
            animation="property: position; to: -1.5 ${scaleValue(playerStats.technicalScore) / 2} 0; dur: 1000; easing: easeOutElastic"
          >
            <a-text 
              value="Technical" 
              position="0 -0.7 0.21" 
              width="2" 
              align="center" 
              color="#1A1F2C"
            ></a-text>
            <a-text 
              value={playerStats.technicalScore.toFixed(0)} 
              position="0 0.7 0.21" 
              width="2" 
              align="center" 
              color="#FFFFFF"
            ></a-text>
          </a-box>

          {/* Physical Score */}
          <a-box 
            position="-0.5 0 0" 
            height={scaleValue(playerStats.physicalScore)} 
            width="0.4" 
            depth="0.4" 
            color="#F97316"
            animation="property: position; to: -0.5 ${scaleValue(playerStats.physicalScore) / 2} 0; dur: 1200; easing: easeOutElastic"
          >
            <a-text 
              value="Physical" 
              position="0 -0.7 0.21" 
              width="2" 
              align="center" 
              color="#1A1F2C"
            ></a-text>
            <a-text 
              value={playerStats.physicalScore.toFixed(0)} 
              position="0 0.7 0.21" 
              width="2" 
              align="center" 
              color="#FFFFFF"
            ></a-text>
          </a-box>

          {/* Balance Score */}
          <a-box 
            position="0.5 0 0" 
            height={scaleValue(playerStats.balanceScore)} 
            width="0.4" 
            depth="0.4" 
            color="#0EA5E9"
            animation="property: position; to: 0.5 ${scaleValue(playerStats.balanceScore) / 2} 0; dur: 1400; easing: easeOutElastic"
          >
            <a-text 
              value="Balance" 
              position="0 -0.7 0.21" 
              width="2" 
              align="center" 
              color="#1A1F2C"
            ></a-text>
            <a-text 
              value={playerStats.balanceScore.toFixed(0)} 
              position="0 0.7 0.21" 
              width="2" 
              align="center" 
              color="#FFFFFF"
            ></a-text>
          </a-box>

          {/* Movement Efficiency */}
          <a-box 
            position="1.5 0 0" 
            height={scaleValue(playerStats.movementEfficiency)} 
            width="0.4" 
            depth="0.4" 
            color="#10B981"
            animation="property: position; to: 1.5 ${scaleValue(playerStats.movementEfficiency) / 2} 0; dur: 1600; easing: easeOutElastic"
          >
            <a-text 
              value="Efficiency" 
              position="0 -0.7 0.21" 
              width="2" 
              align="center" 
              color="#1A1F2C"
            ></a-text>
            <a-text 
              value={playerStats.movementEfficiency.toFixed(0)} 
              position="0 0.7 0.21" 
              width="2" 
              align="center" 
              color="#FFFFFF"
            ></a-text>
          </a-box>

          {/* Speed indicators */}
          <a-entity position="0 -1 0">
            <a-torus 
              position="0 0 0" 
              radius="1.5" 
              radius-tubular="0.05" 
              arc="320" 
              color="#D6BCFA" 
              rotation="90 0 0"
            ></a-torus>
            <a-text 
              value="Max Speed" 
              position="0 0 -1.7" 
              width="2" 
              align="center" 
              color="#1A1F2C"
            ></a-text>
            <a-text 
              value={`${playerStats.maxSpeed.toFixed(1)} km/h`} 
              position="0 0 -1.4" 
              width="2" 
              align="center" 
              color="#1A1F2C"
            ></a-text>
          </a-entity>
        </a-entity>

        {/* Interactive elements */}
        <a-entity position="0 0.5 -1" rotation="-30 0 0">
          <a-plane 
            width="4" 
            height="0.5" 
            color="#1A1F2C" 
            opacity="0.8"
          >
            <a-text 
              value="Tap on bars to see detailed stats" 
              position="0 0 0.01" 
              width="3.5" 
              align="center" 
              color="#FFFFFF"
            ></a-text>
          </a-plane>
        </a-entity>

        {/* Camera and controls */}
        <a-entity camera look-controls wasd-controls position="0 1.6 0">
          <a-entity 
            cursor="fuse: true; fuseTimeout: 500"
            position="0 0 -1"
            geometry="primitive: ring; radiusInner: 0.02; radiusOuter: 0.03"
            material="color: #FFFFFF; shader: flat"
            animation__click="property: scale; startEvents: click; easing: easeInCubic; dur: 150; from: 0.1 0.1 0.1; to: 1 1 1"
            animation__fusing="property: scale; startEvents: fusing; easing: easeInCubic; dur: 1500; from: 1 1 1; to: 0.1 0.1 0.1"
            animation__mouseleave="property: scale; startEvents: mouseleave; easing: easeInCubic; dur: 500; to: 1 1 1"
          ></a-entity>
        </a-entity>
      </a-scene>
      
      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-2 rounded-md text-xs text-muted-foreground">
        <p>Move: WASD keys | Look: Click and drag | Select: Click</p>
      </div>
    </div>
  );
};

export default PlayerStatsAR;
