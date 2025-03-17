
import React, { useEffect, useRef } from 'react';
import 'aframe';

interface InjuryArea {
  name: string;
  risk: number;
  recommendation: string;
}

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
  const sceneRef = useRef<HTMLElement>(null);
  
  // Register custom components for interactivity
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AFRAME) {
      // Info popup component
      window.AFRAME.registerComponent('show-info', {
        schema: {
          info: {type: 'string', default: ''},
          title: {type: 'string', default: ''}
        },
        init: function() {
          const el = this.el;
          const data = this.data;
          
          // Create info panel entity
          const infoPanel = document.createElement('a-entity');
          infoPanel.setAttribute('visible', 'false'); // Convert boolean to string
          infoPanel.setAttribute('position', '0 0.6 0');
          
          // Background panel
          const panel = document.createElement('a-plane');
          panel.setAttribute('color', '#1A1F2C');
          panel.setAttribute('width', '1.5');
          panel.setAttribute('height', '0.8');
          panel.setAttribute('opacity', '0.85');
          infoPanel.appendChild(panel);
          
          // Title text
          const titleText = document.createElement('a-text');
          titleText.setAttribute('value', data.title);
          titleText.setAttribute('width', '1.4');
          titleText.setAttribute('position', '0 0.25 0.01');
          titleText.setAttribute('color', '#FFFFFF');
          titleText.setAttribute('align', 'center');
          infoPanel.appendChild(titleText);
          
          // Info text
          const infoText = document.createElement('a-text');
          infoText.setAttribute('value', data.info);
          infoText.setAttribute('width', '1.4');
          infoText.setAttribute('position', '0 0 0.01');
          infoText.setAttribute('color', '#FFFFFF');
          infoText.setAttribute('align', 'center');
          infoText.setAttribute('baseline', 'top');
          infoPanel.appendChild(infoText);
          
          // Close button
          const closeBtn = document.createElement('a-text');
          closeBtn.setAttribute('value', '×');
          closeBtn.setAttribute('position', '0.65 0.3 0.01');
          closeBtn.setAttribute('color', '#FFFFFF');
          closeBtn.setAttribute('align', 'center');
          closeBtn.setAttribute('class', 'clickable');
          infoPanel.appendChild(closeBtn);
          
          el.appendChild(infoPanel);
          
          // Show/hide info panel on click
          const toggleInfo = function() {
            const visible = infoPanel.getAttribute('visible');
            infoPanel.setAttribute('visible', visible === 'true' ? 'false' : 'true'); // Convert boolean to string
          };
          
          el.addEventListener('click', toggleInfo);
          closeBtn.addEventListener('click', toggleInfo);
        }
      });
      
      // Rotate component
      window.AFRAME.registerComponent('auto-rotate', {
        schema: {
          speed: {type: 'number', default: 2}
        },
        tick: function(time, deltaTime) {
          const rotation = this.el.getAttribute('rotation');
          this.el.setAttribute('rotation', {
            x: rotation.x,
            y: (rotation.y + this.data.speed * deltaTime / 1000) % 360,
            z: rotation.z
          });
        }
      });
    }
    
    return () => {
      // Cleanup if necessary
    };
  }, []);

  // Color based on risk level
  const getRiskColor = (risk: number): string => {
    if (risk < 30) return '#10B981'; // Green for low risk
    if (risk < 70) return '#F97316'; // Orange for medium risk
    return '#EF4444'; // Red for high risk
  };
  
  return (
    <div className="ar-scene-container w-full h-[500px] relative">
      <a-scene embedded ref={sceneRef} className="w-full h-full rounded-lg">
        <a-assets>
          {/* Player silhouette - you can replace with actual player model */}
          <img id="player-texture" src="https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814055_1280.png" crossOrigin="anonymous" />
        </a-assets>

        {/* Environment */}
        <a-sky color="#F1F0FB"></a-sky>
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
          {injuryAreas.map((area, index) => {
            // Position based on area name
            let position = "0 0 0.1";
            if (area.name === "Hamstrings") position = "0 -0.6 0.1";
            else if (area.name === "Knees") position = "0 -0.8 0.1";
            else if (area.name === "Ankles") position = "0 -1.1 0.1";
            else if (area.name === "Calves") position = "0 -0.9 0.1";
            else if (area.name === "Groin") position = "0 -0.4 0.1";
            else if (area.name === "Lower back") position = "0 -0.2 0.1";
            else if (area.name === "Shoulders") position = "0 0.6 0.1";
            else if (area.name === "Wrists") position = "0.4 0.2 0.1";
            
            return (
              <a-entity 
                key={index}
                position={position}
                show-info={`title: ${area.name}; info: Risk Level: ${Math.round(area.risk)}%\n${area.recommendation}`}
                className="clickable"
              >
                <a-circle 
                  radius="0.1" 
                  color={getRiskColor(area.risk)}
                  animation="property: scale; dir: alternate; dur: 1000; easing: easeInOutSine; loop: true; to: 1.1 1.1 1.1"
                ></a-circle>
                <a-text 
                  value={Math.round(area.risk) + "%"} 
                  align="center" 
                  width="0.5"
                  position="0 0 0.01"
                  color="#FFFFFF"
                  scale="0.5 0.5 0.5"
                ></a-text>
              </a-entity>
            );
          })}
        </a-entity>

        {/* Instructions panel */}
        <a-entity position="0 0.5 -1" rotation="-30 0 0">
          <a-plane 
            width="4" 
            height="0.5" 
            color="#1A1F2C" 
            opacity="0.8"
          >
            <a-text 
              value="Tap on injury indicators to see recommendations" 
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

export default InjuryVisualizationAR;
