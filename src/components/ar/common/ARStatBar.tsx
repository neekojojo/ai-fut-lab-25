
import React from 'react';
import { scaleValue } from '../utils/aframeUtils';

interface ARStatBarProps {
  position: string;
  value: number;
  label: string;
  color: string;
  animationDelay?: number;
}

const ARStatBar: React.FC<ARStatBarProps> = ({ 
  position, 
  value, 
  label, 
  color, 
  animationDelay = 1000 
}) => {
  const height = scaleValue(value);
  
  return (
    <a-box 
      position={position}
      height={height} 
      width="0.4" 
      depth="0.4" 
      color={color}
      animation={`property: position; to: ${position.split(' ')[0]} ${height / 2} ${position.split(' ')[2]}; dur: ${animationDelay}; easing: easeOutElastic`}
    >
      <a-text 
        value={label} 
        position="0 -0.7 0.21" 
        width="2" 
        align="center" 
        color="#1A1F2C"
      ></a-text>
      <a-text 
        value={value.toFixed(0)} 
        position="0 0.7 0.21" 
        width="2" 
        align="center" 
        color="#FFFFFF"
      ></a-text>
    </a-box>
  );
};

export default ARStatBar;
