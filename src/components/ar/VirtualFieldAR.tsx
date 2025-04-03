
import React, { useEffect, useState, useRef } from 'react';
import 'aframe';
import ARScene from './common/ARScene';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

interface VirtualFieldARProps {
  onError?: () => void;
}

const VirtualFieldAR: React.FC<VirtualFieldARProps> = ({ onError }) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [deviceSupported, setDeviceSupported] = useState(true);
  const cameraContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if AR is supported on this device
    if (typeof window !== 'undefined') {
      const isARSupported = navigator.mediaDevices && 
                           'getUserMedia' in navigator.mediaDevices;
      setDeviceSupported(isARSupported);
    }
    
    // Cleanup AR scene when component unmounts
    return () => {
      if (cameraActive) {
        setCameraActive(false);
      }
    };
  }, []);

  const handleStartAR = async () => {
    if (!deviceSupported) {
      onError?.();
      return;
    }
    
    try {
      // Request camera permissions
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraActive(true);
      
    } catch (error) {
      console.error("Error accessing camera:", error);
      onError?.();
    }
  };

  const handleStopAR = () => {
    setCameraActive(false);
  };

  return (
    <div className="virtual-field-ar">
      <div className="space-y-4">
        {!cameraActive ? (
          <div className="flex flex-col items-center">
            <div className="bg-muted/50 rounded-lg p-8 mb-4 w-full max-w-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-16 w-16 mx-auto mb-4 opacity-40" />
                <p className="text-muted-foreground">قم بتشغيل الكاميرا لبدء تجربة الواقع المعزز</p>
              </div>
            </div>
            
            <Button 
              onClick={handleStartAR}
              className="bg-gradient-primary hover:opacity-90"
              disabled={!deviceSupported}
            >
              بدء تجربة الملعب الافتراضي
            </Button>
            
            {!deviceSupported && (
              <p className="text-sm text-destructive mt-2">
                جهازك لا يدعم تقنية الواقع المعزز
              </p>
            )}
          </div>
        ) : (
          <div className="ar-experience" ref={cameraContainerRef}>
            <ARScene skyColor="#87CEEB">
              {/* Virtual football field */}
              <a-assets>
                <img id="grass-texture" src="https://cdn.glitch.global/c3b0b6d0-40aa-451f-8746-19e554a3af99/grass.jpg?v=1671004233278" crossOrigin="anonymous" />
                <img id="goal-texture" src="https://cdn.glitch.global/c3b0b6d0-40aa-451f-8746-19e554a3af99/goal.png?v=1671004370556" crossOrigin="anonymous" />
              </a-assets>
              
              {/* Field surface */}
              <a-plane 
                position="0 0 -5" 
                rotation="-90 0 0" 
                width="10" 
                height="6" 
                src="#grass-texture" 
                repeat="4 3"
              ></a-plane>
              
              {/* Field lines */}
              <a-entity position="0 0.01 -5">
                {/* Outer boundary */}
                <a-box position="0 0 0" rotation="-90 0 0" width="9" height="5" depth="0.02" color="white" opacity="0.8"></a-box>
                
                {/* Center circle */}
                <a-ring position="0 0.01 0" rotation="-90 0 0" radius-inner="0.9" radius-outer="1" color="white" opacity="0.8"></a-ring>
                
                {/* Center line */}
                <a-box position="0 0.01 0" rotation="-90 0 0" width="0.1" height="5" depth="0.02" color="white" opacity="0.8"></a-box>
                
                {/* Penalty areas */}
                <a-box position="-3.5 0.01 0" rotation="-90 0 0" width="2" height="3" depth="0.02" color="white" opacity="0.8"></a-box>
                <a-box position="3.5 0.01 0" rotation="-90 0 0" width="2" height="3" depth="0.02" color="white" opacity="0.8"></a-box>
              </a-entity>
              
              {/* Goals */}
              <a-entity position="-4.5 0.5 -5" rotation="0 90 0">
                <a-box width="2" height="1" depth="0.1" color="white" opacity="0.9"></a-box>
              </a-entity>
              
              <a-entity position="4.5 0.5 -5" rotation="0 -90 0">
                <a-box width="2" height="1" depth="0.1" color="white" opacity="0.9"></a-box>
              </a-entity>
              
              {/* Interactive elements */}
              <a-sphere 
                position="0 0.5 -5" 
                radius="0.2" 
                color="black" 
                className="clickable"
                animation="property: position; to: 2 0.5 -5; dur: 2000; easing: linear; loop: true; dir: alternate"
              ></a-sphere>
            </ARScene>
            
            <div className="absolute bottom-4 left-4 z-10">
              <Button 
                onClick={handleStopAR}
                variant="destructive"
              >
                إيقاف الواقع المعزز
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">تعليمات الاستخدام:</h3>
        <ul className="list-disc list-inside space-y-2 pr-4 text-muted-foreground">
          <li>قم بتوجيه الكاميرا نحو مساحة فارغة في محيطك</li>
          <li>استخدم الملعب الافتراضي للتدرب على المهارات والتكتيكات</li>
          <li>يمكنك التحرك حول الملعب باستخدام أصابعك للتكبير والتصغير</li>
          <li>انقر على الكرة لتحريكها أو ركلها</li>
        </ul>
      </div>
    </div>
  );
};

export default VirtualFieldAR;
