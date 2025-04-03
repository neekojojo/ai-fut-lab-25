import React, { useState, useEffect } from 'react';
import 'aframe';
import ARScene from './common/ARScene';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Camera, Target } from 'lucide-react';

interface SkillChallengeARProps {
  onError?: () => void;
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const challenges: Challenge[] = [
  {
    id: 'passing',
    name: 'تمرير دقيق',
    description: 'تدرب على دقة التمرير باستهداف المناطق المحددة',
    difficulty: 'easy'
  },
  {
    id: 'dribbling',
    name: 'المراوغة بين الأقماع',
    description: 'تحسين مهارات المراوغة من خلال تجاوز الأقماع الافتراضية',
    difficulty: 'medium'
  },
  {
    id: 'shooting',
    name: 'التسديد على المرمى',
    description: 'تدرب على دقة التسديد مع أهداف متحركة',
    difficulty: 'hard'
  }
];

const SkillChallengeAR: React.FC<SkillChallengeARProps> = ({ onError }) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [deviceSupported, setDeviceSupported] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState<string>(challenges[0].id);
  const [challengeStarted, setChallengeStarted] = useState(false);
  
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
    setChallengeStarted(false);
  };
  
  const handleStartChallenge = () => {
    setChallengeStarted(true);
  };

  const getCurrentChallenge = () => {
    return challenges.find(c => c.id === selectedChallenge) || challenges[0];
  };
  
  const renderChallengeScene = () => {
    const challenge = getCurrentChallenge();
    
    switch (challenge.id) {
      case 'passing':
        return (
          <>
            <a-assets>
              <img id="target-texture" src="https://cdn.glitch.global/c3b0b6d0-40aa-451f-8746-19e554a3af99/target.png?v=1671004370556" crossOrigin="anonymous" />
            </a-assets>
            
            {/* Ground plane */}
            <a-plane position="0 0 -4" rotation="-90 0 0" width="8" height="5" color="#3D8B37"></a-plane>
            
            {/* Passing targets */}
            <a-entity position="0 0.5 -4">
              <a-circle 
                position="-2 0 0" 
                rotation="-90 0 0" 
                radius="0.5" 
                color="#FFFFFF"
                className="clickable"
                animation="property: scale; to: 1.1 1.1 1.1; dir: alternate; dur: 1000; loop: true"
              ></a-circle>
              
              <a-circle 
                position="2 0 0" 
                rotation="-90 0 0" 
                radius="0.5" 
                color="#FFFFFF"
                className="clickable"
                animation="property: scale; to: 1.1 1.1 1.1; dir: alternate; dur: 1000; loop: true; delay: 500"
              ></a-circle>
              
              <a-circle 
                position="0 0 -2" 
                rotation="-90 0 0" 
                radius="0.5" 
                color="#FFFFFF"
                className="clickable"
                animation="property: scale; to: 1.1 1.1 1.1; dir: alternate; dur: 1000; loop: true; delay: 1000"
              ></a-circle>
            </a-entity>
            
            {/* Ball */}
            <a-sphere position="0 0.2 -3" radius="0.2" color="#FFFFFF" className="clickable"></a-sphere>
          </>
        );
        
      case 'dribbling':
        return (
          <>
            {/* Ground plane */}
            <a-plane position="0 0 -4" rotation="-90 0 0" width="8" height="5" color="#3D8B37"></a-plane>
            
            {/* Cones for dribbling */}
            <a-entity position="0 0 -4">
              {[...Array(5)].map((_, index) => (
                <a-cone
                  key={index}
                  position={`${index - 2} 0.5 0`}
                  radius-bottom="0.3"
                  radius-top="0"
                  height="1"
                  color="orange"
                  className="clickable"
                ></a-cone>
              ))}
              
              {/* Zigzag cones */}
              <a-cone position="-1.5 0.5 -1.5" radius-bottom="0.3" radius-top="0" height="1" color="orange"></a-cone>
              <a-cone position="-0.5 0.5 -2" radius-bottom="0.3" radius-top="0" height="1" color="orange"></a-cone>
              <a-cone position="0.5 0.5 -1.5" radius-bottom="0.3" radius-top="0" height="1" color="orange"></a-cone>
              <a-cone position="1.5 0.5 -2" radius-bottom="0.3" radius-top="0" height="1" color="orange"></a-cone>
            </a-entity>
            
            {/* Ball */}
            <a-sphere position="0 0.2 -2.5" radius="0.2" color="#FFFFFF" className="clickable"></a-sphere>
            
            {/* Finish line */}
            <a-box position="0 0.05 -6" rotation="-90 0 0" width="3" height="0.2" depth="0.02" color="#FFFFFF"></a-box>
          </>
        );
        
      case 'shooting':
        return (
          <>
            {/* Ground plane */}
            <a-plane position="0 0 -6" rotation="-90 0 0" width="10" height="6" color="#3D8B37"></a-plane>
            
            {/* Goal */}
            <a-entity position="0 1 -9">
              <a-box position="0 0 0" rotation="0 0 0" width="3" height="2" depth="0.1" color="#FFFFFF" opacity="0.7"></a-box>
              
              {/* Dynamic targets in the goal */}
              <a-circle 
                position="-0.8 0.5 0.1" 
                radius="0.3" 
                color="red" 
                className="clickable"
                animation="property: position; to: -0.8 0 0.1; dir: alternate; dur: 2000; loop: true"
              ></a-circle>
              
              <a-circle 
                position="0.8 -0.5 0.1" 
                radius="0.3" 
                color="red" 
                className="clickable"
                animation="property: position; to: 0.8 0.5 0.1; dir: alternate; dur: 1500; loop: true"
              ></a-circle>
            </a-entity>
            
            {/* Ball */}
            <a-sphere position="0 0.2 -4" radius="0.2" color="#FFFFFF" className="clickable"></a-sphere>
            
            {/* Goalkeeper (simplified) */}
            <a-entity position="0 1 -8.9">
              <a-box width="0.5" height="1.5" depth="0.2" color="#000000" opacity="0.8"
                     animation="property: position; from: -0.7 0 0; to: 0.7 0 0; dir: alternate; dur: 3000; loop: true"></a-box>
            </a-entity>
          </>
        );
        
      default:
        return (
          <a-text value="تحدي غير متوفر" position="0 1.5 -3" align="center" color="#FFFFFF"></a-text>
        );
    }
  };

  return (
    <div className="skill-challenge-ar">
      <div className="space-y-4">
        {!cameraActive ? (
          <div className="flex flex-col items-center">
            <div className="bg-muted/50 rounded-lg p-8 mb-4 w-full max-w-lg aspect-video flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-16 w-16 mx-auto mb-4 opacity-40" />
                <p className="text-muted-foreground">قم بتشغيل الكاميرا لبدء تحديات المهارات</p>
              </div>
            </div>
            
            <div className="w-full max-w-lg">
              <div className="mb-4">
                <label className="text-sm font-medium block mb-2">اختر التحدي:</label>
                <Select 
                  value={selectedChallenge} 
                  onValueChange={setSelectedChallenge}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التحدي" />
                  </SelectTrigger>
                  <SelectContent>
                    {challenges.map((challenge) => (
                      <SelectItem key={challenge.id} value={challenge.id}>
                        {challenge.name} - {challenge.difficulty === 'easy' ? 'سهل' : 
                                           challenge.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-4 bg-muted/20 p-4 rounded">
                <h3 className="font-semibold">{getCurrentChallenge().name}</h3>
                <p className="text-sm text-muted-foreground">{getCurrentChallenge().description}</p>
              </div>
            </div>
            
            <Button 
              onClick={handleStartAR}
              className="bg-gradient-primary hover:opacity-90"
              disabled={!deviceSupported}
            >
              بدء التحدي
            </Button>
            
            {!deviceSupported && (
              <p className="text-sm text-destructive mt-2">
                جهازك لا يدعم تقنية الواقع المعزز
              </p>
            )}
          </div>
        ) : (
          <div className="ar-experience">
            <ARScene skyColor="#87CEEB">
              {!challengeStarted ? (
                <a-entity position="0 1.5 -3">
                  <a-text 
                    value={`تحدي: ${getCurrentChallenge().name}`} 
                    align="center" 
                    color="#000" 
                    width="5"
                    position="0 0.5 0"
                  ></a-text>
                  <a-text 
                    value="انقر على زر البدء أدناه للانطلاق" 
                    align="center" 
                    color="#000" 
                    width="3"
                    position="0 0 0"
                  ></a-text>
                  <a-text 
                    value="وجه الكاميرا نحو منطقة مفتوحة" 
                    align="center" 
                    color="#000" 
                    width="3"
                    position="0 -0.5 0"
                  ></a-text>
                </a-entity>
              ) : (
                renderChallengeScene()
              )}
            </ARScene>
            
            <div className="absolute bottom-4 left-4 right-4 flex justify-between z-10">
              <Button 
                onClick={handleStopAR}
                variant="destructive"
              >
                إيقاف التحدي
              </Button>
              
              {!challengeStarted && (
                <Button 
                  onClick={handleStartChallenge}
                  variant="default"
                  className="bg-primary"
                >
                  <Target className="h-4 w-4 ml-2" />
                  ابدأ التحدي الآن
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">تعليمات التحديات:</h3>
        <ul className="list-disc list-inside space-y-2 pr-4 text-muted-foreground">
          <li>قم بتثبيت الكاميرا على مساحة فارغة أو توجيهها نحو منطقة مفتوحة</li>
          <li>يمكنك التفاعل مع العناصر في التحدي من خلال الحركة واستخدام الكرة الحقيقية</li>
          <li>التحديات مصممة لتحسين مهاراتك الفنية في كرة القدم</li>
          <li>تتبع تقدمك وحاول تحسين أدائك في كل تحدي</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillChallengeAR;
