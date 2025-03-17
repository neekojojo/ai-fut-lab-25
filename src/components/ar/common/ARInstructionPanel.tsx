
import React from 'react';

interface ARInstructionPanelProps {
  text: string;
}

const ARInstructionPanel: React.FC<ARInstructionPanelProps> = ({ text }) => {
  return (
    <a-entity position="0 0.5 -1" rotation="-30 0 0">
      <a-plane 
        width="4" 
        height="0.5" 
        color="#1A1F2C" 
        opacity="0.8"
      >
        <a-text 
          value={text} 
          position="0 0 0.01" 
          width="3.5" 
          align="center" 
          color="#FFFFFF"
        ></a-text>
      </a-plane>
    </a-entity>
  );
};

export default ARInstructionPanel;
