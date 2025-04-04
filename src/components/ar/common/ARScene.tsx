
import React, { ReactNode, useRef, useEffect } from 'react';
import 'aframe';

interface ARSceneProps {
  children: ReactNode;
  skyColor?: string;
  environmentPreset?: 'forest' | 'desert' | 'stadium' | 'night' | 'default';
  enablePhysics?: boolean;
  enableShadows?: boolean;
  cameraPosition?: string;
}

const ARScene: React.FC<ARSceneProps> = ({ 
  children, 
  skyColor = "#87CEEB",
  environmentPreset = 'default',
  enablePhysics = false,
  enableShadows = true,
  cameraPosition = "0 1.6 0"
}) => {
  const sceneRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!sceneRef.current) return;
    
    // Register the environment preset if needed
    if (typeof window !== 'undefined' && window.AFRAME) {
      if (!window.AFRAME.components['environment-preset']) {
        window.AFRAME.registerComponent('environment-preset', {
          schema: {
            preset: {type: 'string', default: 'default'}
          },
          init: function() {
            const el = this.el;
            const data = this.data;
            
            switch(data.preset) {
              case 'stadium':
                // Add stadium-like elements
                addStadiumElements(el);
                break;
              case 'forest':
                // Add forest-like elements
                addForestElements(el);
                break;
              case 'night':
                // Add night lighting
                el.setAttribute('fog', 'color: #000; near: 0; far: 30');
                break;
              default:
                // Default environment (clean AR space)
                break;
            }
          }
        });
      }
      
      // Helper functions to add environment elements
      function addStadiumElements(sceneEl: any) {
        // Add stands
        for (let i = -5; i <= 5; i += 2) {
          const stand = document.createElement('a-box');
          stand.setAttribute('position', `${i} 0.5 -10`);
          stand.setAttribute('width', '1.8');
          stand.setAttribute('height', '2');
          stand.setAttribute('depth', '5');
          stand.setAttribute('color', '#555555');
          sceneEl.appendChild(stand);
        }
        
        // Add field lines
        const fieldLines = document.createElement('a-entity');
        fieldLines.setAttribute('position', '0 0.01 -5');
        sceneEl.appendChild(fieldLines);
      }
      
      function addForestElements(sceneEl: any) {
        // Add trees around the scene
        for (let i = 0; i < 10; i++) {
          const tree = document.createElement('a-entity');
          const angle = (i / 10) * Math.PI * 2;
          const x = Math.sin(angle) * 15;
          const z = Math.cos(angle) * 15 - 5;
          
          tree.setAttribute('position', `${x} 0 ${z}`);
          
          const trunk = document.createElement('a-cylinder');
          trunk.setAttribute('height', '4');
          trunk.setAttribute('radius', '0.5');
          trunk.setAttribute('color', '#8B4513');
          trunk.setAttribute('position', '0 2 0');
          
          const leaves = document.createElement('a-cone');
          leaves.setAttribute('height', '5');
          leaves.setAttribute('radius-bottom', '2');
          leaves.setAttribute('radius-top', '0');
          leaves.setAttribute('color', '#228B22');
          leaves.setAttribute('position', '0 5.5 0');
          
          tree.appendChild(trunk);
          tree.appendChild(leaves);
          sceneEl.appendChild(tree);
        }
      }
    }
    
    // Setup physics if enabled
    if (enablePhysics && typeof window !== 'undefined' && window.AFRAME) {
      if (!window.AFRAME.systems.physics) {
        console.log("Physics system enabled for AR");
        sceneRef.current.setAttribute('physics', 'debug: false; gravity: 0 -9.8 0');
      }
    }
    
    return () => {
      // Cleanup if needed
    };
  }, [environmentPreset, enablePhysics]);
  
  return (
    <div className="ar-scene-container w-full h-[500px] relative bg-gradient-to-b from-background/50 to-background rounded-lg overflow-hidden border border-muted">
      <a-scene 
        embedded 
        ref={sceneRef} 
        className="w-full h-full"
        renderer={`antialias: true; ${enableShadows ? 'shadowMapEnabled: true' : ''}`}
        environment-preset={`preset: ${environmentPreset}`}
        loading-screen="dotsColor: #ff0000; backgroundColor: #000000"
      >
        {/* Sky and lighting */}
        <a-sky color={skyColor}></a-sky>
        
        <a-entity light="type: ambient; color: #BBB; intensity: 0.5"></a-entity>
        <a-entity light="type: directional; color: #FFF; intensity: 1; castShadow: true" position="1 1 1"></a-entity>
        
        {/* Custom scene elements */}
        {children}
        
        {/* Camera and controls */}
        <a-entity camera look-controls wasd-controls position={cameraPosition}>
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
      
      {/* Interface overlay */}
      <div className="absolute bottom-4 left-0 right-0 mx-auto w-fit px-4 py-2 bg-background/90 backdrop-blur-sm rounded-full text-xs text-muted-foreground flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gamepad-2">
          <line x1="6" y1="11" x2="10" y2="11"></line>
          <line x1="8" y1="9" x2="8" y2="13"></line>
          <line x1="15" y1="12" x2="15.01" y2="12"></line>
          <line x1="18" y1="10" x2="18.01" y2="10"></line>
          <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.544-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.152A4 4 0 0 0 17.32 5z"></path>
        </svg>
        <span>WASD: Move | ماوس: دوران | انقر: تفاعل</span>
      </div>
    </div>
  );
};

export default ARScene;
