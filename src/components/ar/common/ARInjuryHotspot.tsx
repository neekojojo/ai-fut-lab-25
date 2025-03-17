
import React from 'react';
import { getRiskColor } from '../utils/aframeUtils';

interface ARInjuryHotspotProps {
  position: string;
  risk: number;
  name: string;
  recommendation: string;
}

const ARInjuryHotspot: React.FC<ARInjuryHotspotProps> = ({ 
  position, 
  risk, 
  name,
  recommendation 
}) => {
  return (
    <a-entity 
      position={position}
      show-info={`title: ${name}; info: Risk Level: ${Math.round(risk)}%\n${recommendation}`}
      className="clickable"
    >
      <a-circle 
        radius="0.1" 
        color={getRiskColor(risk)}
        animation="property: scale; dir: alternate; dur: 1000; easing: easeInOutSine; loop: true; to: 1.1 1.1 1.1"
      ></a-circle>
      <a-text 
        value={Math.round(risk) + "%"} 
        align="center" 
        width="0.5"
        position="0 0 0.01"
        color="#FFFFFF"
        scale="0.5 0.5 0.5"
      ></a-text>
    </a-entity>
  );
};

export default ARInjuryHotspot;
