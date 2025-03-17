
import React, { useEffect } from 'react';
import 'aframe';
import ARScene from './common/ARScene';
import ARInstructionPanel from './common/ARInstructionPanel';
import ARInjuryHotspot from './common/ARInjuryHotspot';
import { registerCustomAframeComponents, getRiskColor } from './utils/aframeUtils';
import { InjuryArea, getInjuryPosition } from './utils/injuryPositionUtils';

interface InjuryVisualizationARProps {
  playerName?: string;
  position?: string;
  overallRisk: number;
  injuryAreas: InjuryArea[];
}

const InjuryVisualizationAR: React.FC<InjuryVisualizationARProps> = ({
  playerName = "Player",
  position = "Forward",
  overallRisk = 35,
  injuryAreas = []
}) => {
  // Register custom components on mount
  useEffect(() => {
    registerCustomAframeComponents();
  }, []);
  
  return (
    <ARScene>
      <a-assets>
        {/* Player silhouette - you can replace with actual player model */}
        <img id="player-texture" src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814055_1280.png" crossOrigin="anonymous" />
      </a-assets>

      {/* Environment */}
      <a-plane position="0 0 0" rotation="-90 0 0" width="8" height="8" color="#E5DEFF"></a-plane>
      
      {/* Header */}
      <a-entity position="0 3 -3">
        <a-text 
          value={`${playerName} - Injury Risk Analysis`} 
          align="center" 
          width="6"
          color="#1A1F2C"
        ></a-text>
        <a-text 
          value={position}
          position="0 -0.3 0"
          align="center" 
          width="6"
          color="#9b87f5"
        ></a-text>
      </a-entity>

      {/* Player figure with injury hotspots */}
      <a-entity position="0 1.25 -3" auto-rotate="speed: 0.2">
        {/* Base figure silhouette */}
        <a-plane 
          height="2.5" 
          width="1" 
          src="#player-texture" 
          transparent="true" 
          opacity="0.8"
        ></a-plane>
        
        {/* Overall risk indicator */}
        <a-entity position="0 1.5 0.1">
          <a-ring 
            radius-inner="0.2" 
            radius-outer="0.3" 
            color={getRiskColor(overallRisk)}
          ></a-ring>
          <a-text 
            value={`${Math.round(overallRisk)}%`} 
            align="center" 
            width="1"
            position="0 0 0"
            color="#1A1F2C"
          ></a-text>
          <a-text 
            value="Overall Risk" 
            align="center" 
            width="1"
            position="0 -0.2 0"
            color="#1A1F2C"
            scale="0.5 0.5 0.5"
          ></a-text>
        </a-entity>
        
        {/* Injury area hotspots - dynamically created based on injury data */}
        {injuryAreas.map((area, index) => (
          <ARInjuryHotspot
            key={index}
            position={getInjuryPosition(area.name)}
            risk={area.risk}
            name={area.name}
            recommendation={area.recommendation}
          />
        ))}
      </a-entity>

      {/* Instructions */}
      <ARInstructionPanel text="Tap on injury indicators to see recommendations" />
    </ARScene>
  );
};

export default InjuryVisualizationAR;
