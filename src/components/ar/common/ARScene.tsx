
import React, { ReactNode, useRef, useEffect } from 'react';
import 'aframe';

interface ARSceneProps {
  children: ReactNode;
  skyColor?: string;
}

const ARScene: React.FC<ARSceneProps> = ({ 
  children, 
  skyColor = "#F1F0FB" 
}) => {
  const sceneRef = useRef<HTMLElement>(null);
  
  return (
    <div className="ar-scene-container w-full h-[500px] relative">
      <a-scene embedded ref={sceneRef} className="w-full h-full rounded-lg">
        <a-sky color={skyColor}></a-sky>
        {children}
        
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
            raycaster="objects: .clickable"
          ></a-entity>
        </a-entity>
      </a-scene>
      
      <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-2 rounded-md text-xs text-muted-foreground">
        <p>Move: WASD keys | Look: Click and drag | Select: Click or gaze</p>
      </div>
    </div>
  );
};

export default ARScene;
