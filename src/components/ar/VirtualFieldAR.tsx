
import React, { useEffect, useState, useRef } from 'react';
import 'aframe';
import ARScene from './common/ARScene';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Camera, Users, Trophy, Zap } from 'lucide-react';
import { 
  createPulseAnimation, 
  createPathAnimation,
  getSkillLevelColor
} from './utils/arEffects';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface VirtualFieldARProps {
  onError?: () => void;
}

type ViewMode = 'training' | 'match' | 'analysis';
type FieldType = 'full' | 'half' | 'small';

const VirtualFieldAR: React.FC<VirtualFieldARProps> = ({ onError }) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [deviceSupported, setDeviceSupported] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('training');
  const [fieldType, setFieldType] = useState<FieldType>('full');
  const [playerCount, setPlayerCount] = useState<number>(3);
  const [ballSpeed, setBallSpeed] = useState<number>(50);
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
  
  // Generate player positions based on field type and player count
  const generatePlayerPositions = () => {
    const positions = [];
    
    // Different layouts based on field type
    if (fieldType === 'full') {
      // Full field positions
      for (let i = 0; i < playerCount; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        positions.push({
          x: (col - 1) * 3,
          y: 0,
          z: (row - 1) * 4,
          shirt: i + 1,
          skill: 50 + Math.floor(Math.random() * 40)
        });
      }
    } else if (fieldType === 'half') {
      // Half field positions
      for (let i = 0; i < playerCount; i++) {
        const angle = (i / playerCount) * Math.PI;
        const radius = 3;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius - 3;
        positions.push({
          x,
          y: 0,
          z,
          shirt: i + 1,
          skill: 50 + Math.floor(Math.random() * 40)
        });
      }
    } else {
      // Small field positions
      for (let i = 0; i < playerCount; i++) {
        const angle = (i / playerCount) * Math.PI * 2;
        const radius = 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        positions.push({
          x,
          y: 0,
          z,
          shirt: i + 1,
          skill: 50 + Math.floor(Math.random() * 40)
        });
      }
    }
    
    return positions;
  };
  
  // Ball path animation based on mode
  const getBallAnimation = () => {
    if (viewMode === 'training') {
      // Simple back and forth movement
      return createPathAnimation([
        {x: 0, y: 0.2, z: -2},
        {x: 2, y: 0.2, z: -1},
        {x: -2, y: 0.2, z: -3},
        {x: 0, y: 0.2, z: -2}
      ], 10000 - (ballSpeed * 80));
    } else if (viewMode === 'match') {
      // More complex movement
      return createPathAnimation([
        {x: 0, y: 0.2, z: 0},
        {x: 3, y: 0.2, z: -3},
        {x: -2, y: 0.2, z: -6},
        {x: 1, y: 0.2, z: -8},
        {x: -4, y: 0.2, z: -4},
        {x: 0, y: 0.2, z: 0}
      ], 15000 - (ballSpeed * 100));
    } else {
      // Analysis mode - slower movement
      return createPathAnimation([
        {x: 0, y: 0.2, z: 0},
        {x: 2, y: 0.2, z: -2},
        {x: -2, y: 0.2, z: -4},
        {x: 0, y: 0.2, z: 0}
      ], 20000 - (ballSpeed * 100));
    }
  };

  const renderField = () => {
    const playerPositions = generatePlayerPositions();
    
    return (
      <>
        {/* Field surface based on field type */}
        {fieldType === 'full' && (
          <a-plane 
            position="0 0 -5" 
            rotation="-90 0 0" 
            width="12" 
            height="20" 
            src="#grass-texture" 
            repeat="6 10"
            shadow="receive: true"
          ></a-plane>
        )}
        
        {fieldType === 'half' && (
          <a-plane 
            position="0 0 -5" 
            rotation="-90 0 0" 
            width="10" 
            height="10" 
            src="#grass-texture" 
            repeat="5 5"
            shadow="receive: true"
          ></a-plane>
        )}
        
        {fieldType === 'small' && (
          <a-plane 
            position="0 0 -3" 
            rotation="-90 0 0" 
            width="6" 
            height="6" 
            src="#grass-texture" 
            repeat="3 3"
            shadow="receive: true"
          ></a-plane>
        )}
        
        {/* Field lines */}
        <a-entity position="0 0.01 -5">
          {fieldType === 'full' && (
            <>
              {/* Outer boundary */}
              <a-box position="0 0 0" rotation="-90 0 0" width="11" height="19" depth="0.02" color="white" opacity="0.8"></a-box>
              
              {/* Center circle */}
              <a-ring position="0 0.01 0" rotation="-90 0 0" radius-inner="0.9" radius-outer="1" color="white" opacity="0.8"></a-ring>
              
              {/* Center line */}
              <a-box position="0 0.01 0" rotation="-90 0 0" width="0.1" height="19" depth="0.02" color="white" opacity="0.8"></a-box>
              
              {/* Penalty areas */}
              <a-box position="-0 0.01 -8" rotation="-90 0 0" width="6" height="2" depth="0.02" color="white" opacity="0.8"></a-box>
              <a-box position="0 0.01 8" rotation="-90 0 0" width="6" height="2" depth="0.02" color="white" opacity="0.8"></a-box>
              
              {/* Corner arcs */}
              <a-ring position="5.5 0.01 9.5" rotation="-90 0 0" radius-inner="0.3" radius-outer="0.4" theta-start="0" theta-length="90" color="white" opacity="0.8"></a-ring>
              <a-ring position="-5.5 0.01 9.5" rotation="-90 0 0" radius-inner="0.3" radius-outer="0.4" theta-start="90" theta-length="90" color="white" opacity="0.8"></a-ring>
              <a-ring position="5.5 0.01 -9.5" rotation="-90 0 0" radius-inner="0.3" radius-outer="0.4" theta-start="270" theta-length="90" color="white" opacity="0.8"></a-ring>
              <a-ring position="-5.5 0.01 -9.5" rotation="-90 0 0" radius-inner="0.3" radius-outer="0.4" theta-start="180" theta-length="90" color="white" opacity="0.8"></a-ring>
            </>
          )}
          
          {fieldType === 'half' && (
            <>
              {/* Outer boundary for half field */}
              <a-box position="0 0 0" rotation="-90 0 0" width="9" height="9" depth="0.02" color="white" opacity="0.8"></a-box>
              
              {/* Penalty area */}
              <a-box position="0 0.01 -4" rotation="-90 0 0" width="6" height="2" depth="0.02" color="white" opacity="0.8"></a-box>
              
              {/* Center line (top edge of half field) */}
              <a-box position="0 0.01 4.5" rotation="-90 0 0" width="9" height="0.1" depth="0.02" color="white" opacity="0.8"></a-box>
            </>
          )}
          
          {fieldType === 'small' && (
            <>
              {/* Simple square boundary for small field */}
              <a-box position="0 0 0" rotation="-90 0 0" width="5" height="5" depth="0.02" color="white" opacity="0.8"></a-box>
              
              {/* Center circle */}
              <a-ring position="0 0.01 0" rotation="-90 0 0" radius-inner="0.7" radius-outer="0.8" color="white" opacity="0.8"></a-ring>
            </>
          )}
        </a-entity>
        
        {/* Goals */}
        {fieldType === 'full' && (
          <>
            <a-entity position="0 0.5 -14.5" rotation="0 0 0">
              <a-box width="5" height="2" depth="0.1" color="white" opacity="0.9"></a-box>
            </a-entity>
            
            <a-entity position="0 0.5 4.5" rotation="0 180 0">
              <a-box width="5" height="2" depth="0.1" color="white" opacity="0.9"></a-box>
            </a-entity>
          </>
        )}
        
        {fieldType === 'half' && (
          <a-entity position="0 0.5 -9" rotation="0 0 0">
            <a-box width="4" height="1.5" depth="0.1" color="white" opacity="0.9"></a-box>
          </a-entity>
        )}
        
        {fieldType === 'small' && (
          <>
            <a-entity position="0 0.5 -5.5" rotation="0 0 0">
              <a-box width="3" height="1" depth="0.1" color="white" opacity="0.9"></a-box>
            </a-entity>
            
            <a-entity position="0 0.5 -0.5" rotation="0 180 0">
              <a-box width="3" height="1" depth="0.1" color="white" opacity="0.9"></a-box>
            </a-entity>
          </>
        )}
        
        {/* Players */}
        {playerPositions.map((player, index) => (
          <a-entity 
            key={`player-${index}`}
            position={`${player.x} 0 ${player.z - 5}`}
            className="clickable"
          >
            {/* Player figure */}
            <a-cylinder 
              height="1.7" 
              radius="0.3" 
              color={getSkillLevelColor(player.skill)} 
              opacity="0.9"
              shadow="cast: true"
              animation={createPulseAnimation(0.05, 2000 + (index * 300))}
            ></a-cylinder>
            
            {/* Player number */}
            <a-text 
              value={player.shirt.toString()} 
              position="0 0.7 0.35" 
              scale="2 2 2" 
              color="white" 
              align="center"
            ></a-text>
            
            {/* Player skill level indicator */}
            <a-ring
              position="0 1.3 0"
              rotation="90 0 0"
              radius-inner="0.4"
              radius-outer="0.5"
              color={getSkillLevelColor(player.skill)}
              opacity="0.7"
            ></a-ring>
            
            {/* Player info panel (appears on click) */}
            <a-text
              value={`لاعب #${player.shirt}`}
              position="0 2.2 0"
              align="center"
              scale="0.8 0.8 0.8"
              color="white"
              visible="false"
              className="player-info"
            ></a-text>
            
            <a-text
              value={`المهارة: ${player.skill}`}
              position="0 2 0"
              align="center"
              scale="0.5 0.5 0.5"
              color={getSkillLevelColor(player.skill)}
              visible="false"
              className="player-info"
            ></a-text>
          </a-entity>
        ))}
        
        {/* Interactive ball */}
        <a-sphere 
          position="0 0.2 -5" 
          radius="0.2" 
          color="white" 
          shadow="cast: true"
          animation={getBallAnimation()}
          className="clickable"
        >
          {/* Ball texture with black pentagonal pattern */}
          <a-entity 
            geometry="primitive: icosahedron; radius: 0.2" 
            material="color: black; opacity: 0.2" 
            scale="1.01 1.01 1.01"
          ></a-entity>
        </a-sphere>
        
        {/* Training cones for training mode */}
        {viewMode === 'training' && Array(6).fill(0).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2;
          const radius = 3;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius - 5;
          
          return (
            <a-cone
              key={`cone-${i}`}
              position={`${x} 0.3 ${z}`}
              radius-bottom="0.3"
              radius-top="0"
              height="0.6"
              color="orange"
              shadow="cast: true"
              className="clickable"
            ></a-cone>
          );
        })}
        
        {/* Environment enhancement based on viewMode */}
        {viewMode === 'match' && (
          <>
            {/* Simplified crowd in the stands */}
            {Array(8).fill(0).map((_, i) => {
              const x = i % 4 === 0 || i % 4 === 3 ? 7 : -7;
              const z = ((i % 4) < 2 ? -1 : 1) * 6;
              
              return (
                <a-entity 
                  key={`crowd-${i}`}
                  position={`${x} 1 ${z}`}
                >
                  {/* Crowd group */}
                  <a-box
                    width="2"
                    height="1"
                    depth="5"
                    color="#444444"
                    opacity="0.7"
                  ></a-box>
                  
                  {/* Dynamic crowd animation */}
                  <a-entity
                    position="0 1 0"
                    animation={createPulseAnimation(0.1, 1000 + (i * 100))}
                  >
                    <a-box
                      width="1.8"
                      height="0.5"
                      depth="4.8"
                      color="#888888"
                      opacity="0.8"
                    ></a-box>
                  </a-entity>
                </a-entity>
              );
            })}
          </>
        )}
        
        {/* Analysis visualizations */}
        {viewMode === 'analysis' && (
          <>
            {/* Movement paths */}
            <a-entity position="0 0.02 -5">
              {/* Example path lines in different colors */}
              <a-box position="0 0 0" rotation="-90 45 0" width="0.1" height="5" depth="0.02" color="#FF4444" opacity="0.6"></a-box>
              <a-box position="0 0 0" rotation="-90 -30 0" width="0.1" height="4" depth="0.02" color="#44FF44" opacity="0.6"></a-box>
              <a-box position="0 0 0" rotation="-90 0 0" width="0.1" height="6" depth="0.02" color="#4444FF" opacity="0.6"></a-box>
              
              {/* Movement speed indicators */}
              <a-ring position="2 0.01 -2" rotation="-90 0 0" radius-inner="0.5" radius-outer="0.7" color="#FF4444" opacity="0.3"></a-ring>
              <a-ring position="-1.5 0.01 -3" rotation="-90 0 0" radius-inner="0.3" radius-outer="0.5" color="#44FF44" opacity="0.3"></a-ring>
              <a-ring position="1 0.01 -4" rotation="-90 0 0" radius-inner="0.6" radius-outer="0.8" color="#4444FF" opacity="0.3"></a-ring>
            </a-entity>
          </>
        )}
      </>
    );
  };

  return (
    <div className="virtual-field-ar">
      {!cameraActive ? (
        <div className="flex flex-col">
          <div className="bg-muted/50 rounded-lg p-8 mb-6 w-full aspect-video flex items-center justify-center">
            <div className="text-center">
              <Camera className="h-16 w-16 mx-auto mb-4 opacity-40" />
              <p className="text-muted-foreground">قم بتشغيل الكاميرا لبدء تجربة الواقع المعزز</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                نوع الملعب الافتراضي
              </h3>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  onClick={() => setFieldType('full')}
                  variant={fieldType === 'full' ? 'default' : 'outline'}
                  className={fieldType === 'full' ? 'bg-primary' : ''}
                >
                  ملعب كامل
                </Button>
                <Button 
                  onClick={() => setFieldType('half')}
                  variant={fieldType === 'half' ? 'default' : 'outline'}
                  className={fieldType === 'half' ? 'bg-primary' : ''}
                >
                  نصف ملعب
                </Button>
                <Button 
                  onClick={() => setFieldType('small')}
                  variant={fieldType === 'small' ? 'default' : 'outline'}
                  className={fieldType === 'small' ? 'bg-primary' : ''}
                >
                  ملعب مصغر
                </Button>
              </div>
            </div>
            
            <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                عدد اللاعبين
              </h3>
              
              <div className="flex items-center gap-4">
                <Button 
                  onClick={() => setPlayerCount(Math.max(1, playerCount - 1))}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                >
                  -
                </Button>
                
                <div className="flex-1 text-center text-xl font-semibold">
                  {playerCount}
                </div>
                
                <Button 
                  onClick={() => setPlayerCount(Math.min(11, playerCount + 1))}
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 bg-muted/30 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                سرعة الكرة
              </h3>
              
              <span className="text-sm text-muted-foreground">
                {ballSpeed}%
              </span>
            </div>
            
            <Slider
              defaultValue={[50]}
              max={100}
              step={5}
              value={[ballSpeed]}
              onValueChange={(values) => setBallSpeed(values[0])}
            />
          </div>
          
          <Tabs defaultValue={viewMode} onValueChange={(v) => setViewMode(v as ViewMode)} className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="training">تدريب</TabsTrigger>
              <TabsTrigger value="match">مباراة</TabsTrigger>
              <TabsTrigger value="analysis">تحليل</TabsTrigger>
            </TabsList>
            
            <TabsContent value="training" className="mt-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">وضع التدريب</h4>
              <p className="text-sm text-muted-foreground">
                تدرب على المهارات الأساسية في ملعب افتراضي مع أقماع تدريب ولاعبين افتراضيين. مثالي لتطوير التمرير والتسديد والتحكم بالكرة.
              </p>
            </TabsContent>
            
            <TabsContent value="match" className="mt-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">وضع المباراة</h4>
              <p className="text-sm text-muted-foreground">
                محاكاة لأجواء المباراة الحقيقية مع حركة أكثر واقعية للاعبين والكرة. يساعد على تحسين قراءة اللعب وفهم التكتيكات الجماعية.
              </p>
            </TabsContent>
            
            <TabsContent value="analysis" className="mt-4 p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium mb-2">وضع التحليل</h4>
              <p className="text-sm text-muted-foreground">
                عرض مسارات الحركة وسرعات اللاعبين بشكل مرئي لتحليل الأداء. يساعد في تحديد نقاط القوة والمناطق التي تحتاج إلى تحسين.
              </p>
            </TabsContent>
          </Tabs>
          
          <Button 
            onClick={handleStartAR}
            className="bg-gradient-primary hover:opacity-90 w-full"
            size="lg"
            disabled={!deviceSupported}
          >
            بدء تجربة الملعب الافتراضي
          </Button>
          
          {!deviceSupported && (
            <p className="text-sm text-destructive mt-2 text-center">
              جهازك لا يدعم تقنية الواقع المعزز
            </p>
          )}
        </div>
      ) : (
        <div className="ar-experience" ref={cameraContainerRef}>
          <ARScene 
            skyColor="#87CEEB" 
            environmentPreset={viewMode === 'match' ? 'stadium' : 'default'}
            enableShadows={true}
          >
            <a-assets>
              <img id="grass-texture" src="https://cdn.glitch.global/c3b0b6d0-40aa-451f-8746-19e554a3af99/grass.jpg?v=1671004233278" crossOrigin="anonymous" />
              <img id="goal-texture" src="https://cdn.glitch.global/c3b0b6d0-40aa-451f-8746-19e554a3af99/goal.png?v=1671004370556" crossOrigin="anonymous" />
              <img id="ball-texture" src="https://cdn.glitch.global/c3b0b6d0-40aa-451f-8746-19e554a3af99/football-texture.jpg?v=1671004370556" crossOrigin="anonymous" />
            </a-assets>
            
            {renderField()}
          </ARScene>
          
          <div className="absolute bottom-4 left-4 z-10">
            <Button 
              onClick={handleStopAR}
              variant="destructive"
            >
              إيقاف الواقع المعزز
            </Button>
          </div>
          
          {/* Controls overlay */}
          <div className="absolute top-4 right-4 z-10 bg-black/50 backdrop-blur-sm p-2 rounded-lg">
            <div className="flex flex-col gap-2">
              <Button 
                variant="ghost" 
                className="h-8 text-xs text-white hover:bg-white/20"
                onClick={() => setViewMode('training')}
              >
                تدريب
              </Button>
              <Button 
                variant="ghost" 
                className="h-8 text-xs text-white hover:bg-white/20"
                onClick={() => setViewMode('match')}
              >
                مباراة
              </Button>
              <Button 
                variant="ghost" 
                className="h-8 text-xs text-white hover:bg-white/20"
                onClick={() => setViewMode('analysis')}
              >
                تحليل
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">مميزات الملعب الافتراضي:</h3>
        <ul className="list-disc list-inside space-y-2 pr-4 text-muted-foreground">
          <li>ثلاثة أحجام مختلفة للملعب: كامل، نصف، أو مصغر</li>
          <li>وضع التدريب مع أقماع وحركة منظمة للكرة</li>
          <li>وضع المباراة لمحاكاة ظروف المباراة الحقيقية</li>
          <li>وضع التحليل لعرض مسارات الحركة والسرعات</li>
          <li>إمكانية تعديل عدد اللاعبين الافتراضيين وسرعة الكرة</li>
          <li>تفاعل كامل مع عناصر اللعبة عبر النقر أو التحديق</li>
        </ul>
      </div>
    </div>
  );
};

export default VirtualFieldAR;
