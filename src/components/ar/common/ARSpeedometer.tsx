
import React from 'react';

interface ARSpeedometerProps {
  position: string;
  maxSpeed: number;
  avgSpeed: number;
  currentSpeed?: number;
  size?: number;
  title?: string;
}

const ARSpeedometer: React.FC<ARSpeedometerProps> = ({
  position,
  maxSpeed,
  avgSpeed,
  currentSpeed,
  size = 1,
  title = "Speed"
}) => {
  // Calculate rotation angles for the indicators (0 to 180 degrees)
  const maxSpeedDegree = Math.min(180, (maxSpeed / 40) * 180);
  const avgSpeedDegree = Math.min(180, (avgSpeed / 40) * 180);
  const currentSpeedDegree = currentSpeed ? Math.min(180, (currentSpeed / 40) * 180) : null;

  return (
    <a-entity position={position}>
      {/* Speedometer title */}
      <a-text
        value={title}
        position={`0 ${size * 1.2} 0`}
        width={size * 4}
        align="center"
        color="#FFFFFF"
      ></a-text>
      
      {/* Speedometer background */}
      <a-ring
        position={`0 0 -0.01`}
        radius-inner={size * 0.8}
        radius-outer={size}
        theta-start="0"
        theta-end="180"
        color="#1A1F2C"
      ></a-ring>
      
      {/* Speed markings */}
      <a-entity>
        {/* 0 km/h */}
        <a-text
          value="0"
          position={`${-size * 0.9} 0 0`}
          width={size * 2}
          align="center"
          color="#FFFFFF"
          scale="0.5 0.5 0.5"
        ></a-text>
        
        {/* 20 km/h */}
        <a-text
          value="20"
          position={`0 ${size * 0.9} 0`}
          width={size * 2}
          align="center"
          color="#FFFFFF"
          scale="0.5 0.5 0.5"
        ></a-text>
        
        {/* 40 km/h */}
        <a-text
          value="40"
          position={`${size * 0.9} 0 0`}
          width={size * 2}
          align="center"
          color="#FFFFFF"
          scale="0.5 0.5 0.5"
        ></a-text>
      </a-entity>
      
      {/* Max speed indicator */}
      <a-entity position="0 0 0">
        <a-ring
          radius-inner={size * 0.78}
          radius-outer={size * 0.82}
          theta-start="0"
          theta-end={maxSpeedDegree.toString()}
          color="#F97316"
          rotation="0 0 -90"
        ></a-ring>
        <a-text
          value={`Max: ${maxSpeed.toFixed(1)} km/h`}
          position={`0 ${-size * 0.4} 0`}
          width={size * 3}
          align="center"
          color="#F97316"
          scale="0.5 0.5 0.5"
        ></a-text>
      </a-entity>
      
      {/* Average speed indicator */}
      <a-entity position="0 0 0">
        <a-ring
          radius-inner={size * 0.72}
          radius-outer={size * 0.76}
          theta-start="0"
          theta-end={avgSpeedDegree.toString()}
          color="#0EA5E9"
          rotation="0 0 -90"
        ></a-ring>
        <a-text
          value={`Avg: ${avgSpeed.toFixed(1)} km/h`}
          position={`0 ${-size * 0.6} 0`}
          width={size * 3}
          align="center"
          color="#0EA5E9"
          scale="0.5 0.5 0.5"
        ></a-text>
      </a-entity>
      
      {/* Current speed indicator (only shown if provided) */}
      {currentSpeed !== undefined && (
        <a-entity position="0 0 0.02">
          <a-torus
            radius={size * 0.05}
            radius-tubular={size * 0.015}
            arc="360"
            color="#8B5CF6"
            rotation={`0 0 ${currentSpeedDegree - 90}`}
            position={`${Math.cos((currentSpeedDegree - 90) * Math.PI / 180) * size * 0.7} ${Math.sin((currentSpeedDegree - 90) * Math.PI / 180) * size * 0.7} 0`}
          ></a-torus>
          <a-text
            value={`Current: ${currentSpeed.toFixed(1)} km/h`}
            position={`0 ${-size * 0.8} 0`}
            width={size * 3}
            align="center"
            color="#8B5CF6"
            scale="0.5 0.5 0.5"
          ></a-text>
        </a-entity>
      )}
      
      {/* Center point */}
      <a-circle
        radius={size * 0.05}
        color="#D6BCFA"
        position="0 0 0.01"
      ></a-circle>
    </a-entity>
  );
};

export default ARSpeedometer;
