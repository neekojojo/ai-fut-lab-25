import React, { useState, useEffect, useRef } from 'react';
import 'aframe';
import ARScene from './common/ARScene';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Camera, 
  Target, 
  Trophy, 
  BadgeCheck, 
  Gauge,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  createPulseAnimation, 
  createPathAnimation,
  createGlowEffect,
  getSkillLevelColor
} from './utils/arEffects';

interface SkillChallengeARProps {
  onError?: () => void;
}

interface Challenge {
  id: string;
  name: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  targets: number;
  duration: number;
  skill: 'passing' | 'dribbling' | 'shooting' | 'control';
  points: number;
}

const challenges: Challenge[] = [
  {
    id: 'passing',
    name: 'تمرير دقيق',
    description: 'تدرب على دقة التمرير باستهداف المناطق المحددة خلال وقت محدد',
    difficulty: 'easy',
    targets: 6,
    duration: 60,
    skill: 'passing',
    points: 200
  },
  {
    id: 'dribbling',
    name: 'المراوغة بين الأقماع',
    description: 'تحسين مهارات المراوغة من خلال تجاوز الأقماع الافتراضية بأقل وقت ممكن',
    difficulty: 'medium',
    targets: 8,
    duration: 45,
    skill: 'dribbling',
    points: 300
  },
  {
    id: 'shooting',
    name: 'التسديد على المرمى',
    description: 'تدرب على دقة التسديد مع أهداف متحركة وحارس مرمى افتراضي',
    difficulty: 'hard',
    targets: 5,
    duration: 90,
    skill: 'shooting',
    points: 400
  },
  {
    id: 'control',
    name: 'التحكم بالكرة',
    description: 'تطوير مهارات استقبال الكرة والتحكم بها تحت الضغط',
    difficulty: 'medium',
    targets: 10,
    duration: 60,
    skill: 'control',
    points: 350
  }
];

const SkillChallengeAR: React.FC<SkillChallengeARProps> = ({ onError }) => {
  const [cameraActive, setCameraActive] = useState(false);
  const [deviceSupported, setDeviceSupported] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState<string>(challenges[0].id);
  const [challengeStarted, setChallengeStarted] = useState(false);
  const [userScore, setUserScore] = useState<number>(0);
  const [activeTargets, setActiveTargets] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(60);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  
  const timerRef = useRef<number | null>(null);
  const scoreRef = useRef<number>(0);
  
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
      
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    // Reset timer when challenge is changed
    const challenge = getCurrentChallenge();
    setTimeRemaining(challenge.duration);
  }, [selectedChallenge]);
  
  useEffect(() => {
    // Setup timer for challenge
    if (challengeStarted) {
      const challenge = getCurrentChallenge();
      setTimeRemaining(challenge.duration);
      setUserScore(0);
      scoreRef.current = 0;
      setActiveTargets(0);
      setShowResults(false);
      
      // Start countdown timer
      timerRef.current = window.setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // End challenge when time is up
            endChallenge();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      // Setup initial targets
      setActiveTargets(3);
    } else {
      // Clear timer if challenge is stopped
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    
    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [challengeStarted]);
  
  // Handle AR-specific events
  useEffect(() => {
    if (typeof window !== 'undefined' && window.AFRAME && challengeStarted) {
      // Register hit event listener
      const handleTargetHit = (event: any) => {
        // Update score
        const points = 10 * (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3);
        scoreRef.current += points;
        setUserScore(scoreRef.current);
        
        // Randomly activate new targets
        const maxTargets = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 7;
        setActiveTargets(Math.min(maxTargets, Math.floor(Math.random() * 3) + 2));
      };
      
      // Add event listener to scene
      document.addEventListener('targetHit', handleTargetHit);
      
      return () => {
        document.removeEventListener('targetHit', handleTargetHit);
      };
    }
  }, [challengeStarted, difficulty]);

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
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setCameraActive(false);
    setChallengeStarted(false);
    setShowResults(false);
  };
  
  const handleStartChallenge = () => {
    setChallengeStarted(true);
  };
  
  const endChallenge = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setChallengeStarted(false);
    setShowResults(true);
  };

  const getCurrentChallenge = () => {
    return challenges.find(c => c.id === selectedChallenge) || challenges[0];
  };
  
  const getProgressColor = () => {
    if (timeRemaining < 10) return "bg-destructive";
    if (timeRemaining < 30) return "bg-amber-500";
    return "bg-primary";
  };
  
  const getDifficultyMultiplier = () => {
    switch (difficulty) {
      case 'easy': return 1;
      case 'medium': return 1.5;
      case 'hard': return 2;
      default: return 1;
    }
  };
  
  const getFinalScore = () => {
    const challenge = getCurrentChallenge();
    const basePoints = challenge.points;
    const difficultyMultiplier = getDifficultyMultiplier();
    return Math.round(userScore * difficultyMultiplier);
  };
  
  const getPerformanceLevel = () => {
    const score = getFinalScore();
    const challenge = getCurrentChallenge();
    const maxScore = challenge.points * 1.5;
    
    if (score >= maxScore * 0.8) return "ممتاز";
    if (score >= maxScore * 0.6) return "جيد جدًا";
    if (score >= maxScore * 0.4) return "جيد";
    if (score >= maxScore * 0.2) return "مقبول";
    return "يحتاج تحسين";
  };
  
  const getPerformanceColor = () => {
    const level = getPerformanceLevel();
    
    switch (level) {
      case "ممتاز": return "text-green-500";
      case "جيد جدًا": return "text-emerald-500";
      case "جيد": return "text-blue-500";
      case "مقبول": return "text-amber-500";
      default: return "text-destructive";
    }
  };
  
  const renderChallengeScene = () => {
    const challenge = getCurrentChallenge();
    
    // Common elements for all challenges
    const commonElements = (
      <>
        {/* Ground plane */}
        <a-plane 
          position="0 0 -4" 
          rotation="-90 0 0" 
          width="12" 
          height="8" 
          color="#3D8B37"
          shadow="receive: true"
        ></a-plane>
        
        {/* Instructions text */}
        <a-text 
          value={`${challenge.name} - ${timeRemaining}s`}
          position="0 3.5 -4"
          align="center"
          width="10"
          color="#FFFFFF"
          opacity="0.9"
        ></a-text>
        
        {/* Score display */}
        <a-entity position="0 3 -4">
          <a-text 
            value={`النقاط: ${userScore}`}
            align="center"
            width="5"
            color="#FFDD00"
          ></a-text>
        </a-entity>
      </>
    );
    
    // Challenge-specific elements
    switch (challenge.id) {
      case 'passing':
        return (
          <>
            {commonElements}
            
            {/* Passing targets */}
            <a-entity position="0 0.5 -4">
              {/* Generate random passing targets based on activeTargets */}
              {Array(activeTargets).fill(0).map((_, index) => {
                // Distribute targets in a grid pattern
                const col = index % 3 - 1;
                const row = Math.floor(index / 3) - 1;
                const x = col * 3 + (Math.random() * 1 - 0.5);
                const z = row * 2 + (Math.random() * 1 - 0.5);
                
                // Random size based on difficulty
                const size = difficulty === 'easy' ? 0.6 : 
                            difficulty === 'medium' ? 0.5 : 0.4;
                
                return (
                  <a-entity key={`target-${index}`} position={`${x} 0 ${z}`}>
                    <a-circle 
                      rotation="-90 0 0" 
                      radius={size} 
                      color="#FFFFFF"
                      className="clickable target"
                      animation={createPulseAnimation(0.1, 1500 + (index * 200))}
                      material={createGlowEffect('#FFFFFF', 0.3)}
                      data-points="10"
                      shadow="cast: true"
                      event-set__click="_event: click; _target: #score-text; _delay: 100"
                    ></a-circle>
                    
                    <a-text 
                      value={`+${10 * (difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3)}`} 
                      position="0 0.1 0" 
                      align="center" 
                      rotation="-90 0 0"
                      scale="0.5 0.5 0.5"
                    ></a-text>
                  </a-entity>
                );
              })}
            </a-entity>
            
            {/* Ball for reference */}
            <a-sphere position="0 0.2 -2" radius="0.2" color="#FFFFFF" shadow="cast: true" className="clickable">
              <a-entity 
                geometry="primitive: icosahedron; radius: 0.2" 
                material="color: black; opacity: 0.2" 
                scale="1.01 1.01 1.01"
              ></a-entity>
            </a-sphere>
          </>
        );
        
      case 'dribbling':
        return (
          <>
            {commonElements}
            
            {/* Dribbling course with cones */}
            <a-entity position="0 0 -4">
              {/* Create dribbling path */}
              <a-entity position="0 0.01 0">
                <a-box position="0 0 0" rotation="-90 0 0" width="0.3" height="6" depth="0.02" color="white" opacity="0.7"></a-box>
                <a-box position="-2 0 0" rotation="-90 0 0" width="0.3" height="6" depth="0.02" color="white" opacity="0.7"></a-box>
                <a-box position="2 0 0" rotation="-90 0 0" width="0.3" height="6" depth="0.02" color="white" opacity="0.7"></a-box>
              </a-entity>
              
              {/* Cones for dribbling */}
              {Array(activeTargets).fill(0).map((_, index) => {
                // Determine position based on difficulty
                let x, z;
                
                if (difficulty === 'easy') {
                  // Simple straight line
                  x = (index % 2) * 2 - 1;
                  z = -3 + (index * 1);
                } else if (difficulty === 'medium') {
                  // Zigzag pattern
                  x = ((index % 2) * 2 - 1) * 1.5;
                  z = -3 + (index * 0.7);
                } else {
                  // Complex pattern
                  const angle = (index / activeTargets) * Math.PI;
                  x = Math.sin(angle) * 2;
                  z = -3 + (index * 0.6);
                }
                
                return (
                  <a-cone
                    key={`cone-${index}`}
                    position={`${x} 0.5 ${z}`}
                    radius-bottom="0.3"
                    radius-top="0"
                    height="1"
                    color="orange"
                    className="clickable target"
                    data-points="15"
                    shadow="cast: true"
                    animation={createPulseAnimation(0.05, 2000 + (index * 300))}
                  ></a-cone>
                );
              })}
              
              {/* Start and finish markers */}
              <a-box position="0 0.05 -3" rotation="-90 0 0" width="3" height="0.3" depth="0.05" color="green"></a-box>
              <a-box position="0 0.05 3" rotation="-90 0 0" width="3" height="0.3" depth="0.05" color="red"></a-box>
              
              <a-text value="البداية" position="0 0.1 -3" rotation="-90 0 0" width="2" align="center" color="white"></a-text>
              <a-text value="النهاية" position="0 0.1 3" rotation="-90 0 0" width="2" align="center" color="white"></a-text>
            </a-entity>
            
            {/* Ball for reference */}
            <a-sphere position="0 0.2 -2" radius="0.2" color="#FFFFFF" shadow="cast: true" className="clickable">
              <a-entity 
                geometry="primitive: icosahedron; radius: 0.2" 
                material="color: black; opacity: 0.2" 
                scale="1.01 1.01 1.01"
              ></a-entity>
            </a-sphere>
          </>
        );
        
      case 'shooting':
        return (
          <>
            {commonElements}
            
            {/* Main playing area */}
            <a-entity position="0 0 -6">
              {/* Goal */}
              <a-entity position="0 1 -3">
                <a-box position="0 0 0" rotation="0 0 0" width="4" height="2" depth="0.1" color="#FFFFFF" opacity="0.9"></a-box>
                
                {/* Net effect */}
                <a-entity position="0 0 -0.3">
                  <a-box width="3.8" height="1.8" depth="1" color="#FFFFFF" opacity="0.2"></a-box>
                </a-entity>
                
                {/* Dynamic targets in the goal */}
                {Array(activeTargets > 5 ? 5 : activeTargets).fill(0).map((_, index) => {
                  // Position targets in different parts of the goal
                  let x, y;
                  
                  if (difficulty === 'easy') {
                    // Larger, stationary targets in easy areas
                    if (index === 0) { x = 0; y = 0; } // Center
                    else if (index === 1) { x = -1; y = 0.5; } // Top left
                    else if (index === 2) { x = 1; y = 0.5; } // Top right
                    else if (index === 3) { x = -1; y = -0.5; } // Bottom left
                    else { x = 1; y = -0.5; } // Bottom right
                  } else if (difficulty === 'medium') {
                    // Moving targets in medium level
                    const positions = [
                      { x: -1.2, y: 0.6, anim: "property: position; to: -1.2 -0.6 0.1; dir: alternate; dur: 2000; loop: true" },
                      { x: 1.2, y: 0.6, anim: "property: position; to: 1.2 -0.6 0.1; dir: alternate; dur: 2500; loop: true" },
                      { x: 0, y: 0.7, anim: "property: position; to: 0 -0.7 0.1; dir: alternate; dur: 1800; loop: true" },
                      { x: -0.7, y: -0.5, anim: "property: position; to: 0.7 -0.5 0.1; dir: alternate; dur: 3000; loop: true" },
                      { x: 0.7, y: 0.5, anim: "property: position; to: -0.7 0.5 0.1; dir: alternate; dur: 2200; loop: true" }
                    ];
                    
                    const pos = positions[index % positions.length];
                    x = pos.x;
                    y = pos.y;
                  } else {
                    // Hard level - smaller, faster moving targets
                    const angle = (index / 5) * Math.PI;
                    x = Math.sin(angle) * 1.5;
                    y = Math.cos(angle) * 0.8;
                  }
                  
                  const size = difficulty === 'easy' ? 0.35 : 
                              difficulty === 'medium' ? 0.25 : 0.2;
                  
                  // Animation for hard mode is more complex
                  const animation = difficulty === 'hard' ? 
                    createPathAnimation([
                      {x, y, z: 0.1},
                      {x: -x, y, z: 0.1},
                      {x: -x, y: -y, z: 0.1},
                      {x, y: -y, z: 0.1},
                      {x, y, z: 0.1}
                    ], 3000 + (index * 500), true) :
                    difficulty === 'medium' ? 
                      createPathAnimation([
                        {x, y, z: 0.1},
                        {x: -x, y, z: 0.1},
                        {x, y, z: 0.1}
                      ], 4000, true) :
                      undefined;
                  
                  return (
                    <a-circle 
                      key={`target-${index}`}
                      position={`${x} ${y} 0.1`} 
                      radius={size} 
                      color="red" 
                      className="clickable target"
                      animation={animation}
                      material={createGlowEffect('#FF0000', 0.5)}
                      data-points="20"
                    ></a-circle>
                  );
                })}
                
                {/* Goalkeeper (simplified) */}
                <a-entity position="0 -0.2 0.2">
                  <a-box width="0.7" height="1.5" depth="0.2" color="#000000" opacity="0.8"
                        animation={createPathAnimation([
                          {x: -1, y: 0, z: 0},
                          {x: 1, y: 0, z: 0},
                          {x: -1, y: 0, z: 0}
                        ], difficulty === 'easy' ? 5000 : difficulty === 'medium' ? 3500 : 2500, true)}></a-box>
                </a-entity>
              </a-entity>
              
              {/* Penalty spot */}
              <a-circle position="0 0.01 1" rotation="-90 0 0" radius="0.2" color="white"></a-circle>
              
              {/* Ball */}
              <a-sphere position="0 0.2 2" radius="0.2" color="#FFFFFF" shadow="cast: true" className="clickable">
                <a-entity 
                  geometry="primitive: icosahedron; radius: 0.2" 
                  material="color: black; opacity: 0.2" 
                  scale="1.01 1.01 1.01"
                ></a-entity>
              </a-sphere>
            </a-entity>
          </>
        );
        
      case 'control':
        return (
          <>
            {commonElements}
            
            {/* Ball control area */}
            <a-entity position="0 0 -4">
              {/* Control zone */}
              <a-circle position="0 0.02 0" rotation="-90 0 0" radius="2" color="#555555" opacity="0.3"></a-circle>
              
              {/* Incoming balls to control */}
              {Array(activeTargets > 7 ? 7 : activeTargets).fill(0).map((_, index) => {
                // Create balls coming from different directions
                const angle = (index / (activeTargets > 7 ? 7 : activeTargets)) * Math.PI * 2;
                const startRadius = 5;
                const startX = Math.sin(angle) * startRadius;
                const startZ = Math.cos(angle) * startRadius;
                
                const speed = difficulty === 'easy' ? 8000 : 
                            difficulty === 'medium' ? 6000 : 4000;
                
                return (
                  <a-sphere
                    key={`ball-${index}`}
                    position={`${startX} 1 ${startZ - 4}`}
                    radius="0.2"
                    color="#FFFFFF"
                    opacity="0.9"
                    className="clickable target"
                    animation={createPathAnimation([
                      {x: startX, y: 1, z: startZ - 4},
                      {x: 0, y: 0.2, z: 0}
                    ], speed + (index * 300), false)}
                    data-points="15"
                    shadow="cast: true"
                  >
                    <a-entity 
                      geometry="primitive: icosahedron; radius: 0.2" 
                      material="color: black; opacity: 0.2" 
                      scale="1.01 1.01 1.01"
                    ></a-entity>
                  </a-sphere>
                );
              })}
              
              {/* Player position indicator */}
              <a-cylinder position="0 0.05 0" radius="0.5" height="0.1" color="#3388FF" opacity="0.5"></a-cylinder>
              
              {/* Direction indicators */}
              {Array(8).fill(0).map((_, index) => {
                const angle = (index / 8) * Math.PI * 2;
                const x = Math.sin(angle) * 3;
                const z = Math.cos(angle) * 3;
                
                return (
                  <a-text
                    key={`direction-${index}`}
                    position={`${x} 0.1 ${z}`}
                    rotation="-90 ${(angle * 180 / Math.PI) + 180} 0"
                    value="↑"
                    align="center"
                    color="#FFFFFF"
                    scale="3 3 3"
                  ></a-text>
                );
              })}
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
      <div className="space-y-6">
        {!cameraActive ? (
          <div className="flex flex-col items-center">
            <div className="bg-muted/50 rounded-lg p-8 mb-6 w-full aspect-video flex items-center justify-center">
              <div className="text-center">
                <Camera className="h-16 w-16 mx-auto mb-4 opacity-40" />
                <p className="text-muted-foreground">قم بتشغيل الكاميرا لبدء تحديات المهارات</p>
              </div>
            </div>
            
            <div className="w-full space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="text-sm font-medium block mb-2 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-primary" />
                    اختر التحدي:
                  </label>
                  
                  <Select 
                    value={selectedChallenge} 
                    onValueChange={setSelectedChallenge}
                  >
                    <SelectTrigger className="w-full">
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
                
                <div className="space-y-4">
                  <label className="text-sm font-medium block mb-2 flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-primary" />
                    مستوى الصعوبة:
                  </label>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      onClick={() => setDifficulty('easy')}
                      variant={difficulty === 'easy' ? 'default' : 'outline'}
                      className={difficulty === 'easy' ? 'bg-primary' : ''}
                      size="sm"
                    >
                      سهل
                    </Button>
                    <Button 
                      onClick={() => setDifficulty('medium')}
                      variant={difficulty === 'medium' ? 'default' : 'outline'}
                      className={difficulty === 'medium' ? 'bg-primary' : ''}
                      size="sm"
                    >
                      متوسط
                    </Button>
                    <Button 
                      onClick={() => setDifficulty('hard')}
                      variant={difficulty === 'hard' ? 'default' : 'outline'}
                      className={difficulty === 'hard' ? 'bg-primary' : ''}
                      size="sm"
                    >
                      صعب
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border rounded-lg p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-3 rounded-full">
                    <Trophy className={`h-6 w-6 ${getSkillLevelColor(
                      getCurrentChallenge().difficulty === 'easy' ? 40 : 
                      getCurrentChallenge().difficulty === 'medium' ? 70 : 90
                    )}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{getCurrentChallenge().name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {getCurrentChallenge().difficulty === 'easy' ? 'سهل' : 
                       getCurrentChallenge().difficulty === 'medium' ? 'متوسط' : 'صعب'}
                    </p>
                  </div>
                </div>
                
                <p className="text-sm">{getCurrentChallenge().description}</p>
                
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="flex flex-col items-center">
                    <BadgeCheck className="h-5 w-5 text-primary mb-1" />
                    <span className="text-sm font-medium">{getCurrentChallenge().targets}</span>
                    <span className="text-xs text-muted-foreground">أهداف</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Clock className="h-5 w-5 text-primary mb-1" />
                    <span className="text-sm font-medium">{getCurrentChallenge().duration}</span>
                    <span className="text-xs text-muted-foreground">ثانية</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Trophy className="h-5 w-5 text-primary mb-1" />
                    <span className="text-sm font-medium">{getCurrentChallenge().points}</span>
                    <span className="text-xs text-muted-foreground">نقطة</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleStartAR}
              className="bg-gradient-primary hover:opacity-90 w-full mt-6"
              size="lg"
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
            {showResults ? (
              <div className="bg-muted rounded-lg overflow-hidden">
                <Card className="border-0">
                  <CardHeader className="bg-primary/20">
                    <CardTitle className="text-center">نتائج التحدي</CardTitle>
                    <CardDescription className="text-center">
                      {getCurrentChallenge().name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="flex justify-center mb-4">
                      <div className="w-32 h-32 rounded-full flex items-center justify-center bg-muted-foreground/20">
                        <span className="text-4xl font-bold">{getFinalScore()}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>النقاط الأساسية:</span>
                        <span>{userScore}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>مضاعف الصعوبة:</span>
                        <span>x{getDifficultyMultiplier()}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold">
                        <span>المجموع النهائي:</span>
                        <span>{getFinalScore()}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <div className="text-center mb-2">مستوى الأداء</div>
                      <div className={`text-center text-2xl font-bold ${getPerformanceColor()}`}>
                        {getPerformanceLevel()}
                      </div>
                    </div>
                    
                    <div className="pt-4 text-sm text-muted-foreground">
                      <p>توصيات التحسين:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>التركيز على دقة {getCurrentChallenge().skill === 'passing' ? 'التمرير' : 
                                            getCurrentChallenge().skill === 'dribbling' ? 'المراوغة' : 
                                            getCurrentChallenge().skill === 'shooting' ? 'التسديد' : 'التحكم بالكرة'}</li>
                        <li>تحسين سرعة الاستجابة والقدرة على اتخاذ القرار</li>
                        <li>محاولة التحدي بمستوى صعوبة أعلى</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Button 
                      onClick={() => {
                        setShowResults(false);
                        handleStartChallenge();
                      }}
                      className="w-full"
                    >
                      إعادة المحاولة
                    </Button>
                    <Button 
                      onClick={handleStopAR}
                      variant="outline"
                      className="w-full"
                    >
                      إنهاء التحدي
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <ARScene 
                skyColor="#87CEEB"
                environmentPreset={getCurrentChallenge().id === 'shooting' ? 'stadium' : 'default'}
                enableShadows={true}
              >
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
            )}
            
            {!showResults && (
              <>
                {/* Timer display */}
                {challengeStarted && (
                  <div className="absolute top-4 left-0 right-0 mx-auto w-64 z-10">
                    <div className="bg-background/80 backdrop-blur-sm p-2 rounded-lg">
                      <div className="flex justify-between text-sm mb-1">
                        <span>الوقت المتبقي</span>
                        <span>{timeRemaining} ثانية</span>
                      </div>
                      <Progress value={(timeRemaining / getCurrentChallenge().duration) * 100} className={getProgressColor()} />
                    </div>
                  </div>
                )}
                
                {/* Control buttons */}
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
              </>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">مميزات تحديات المهارات:</h3>
        <ul className="list-disc list-inside space-y-3 pr-4 text-muted-foreground">
          <li>تحديات متنوعة تستهدف مهارات مختلفة: التمرير، المراوغة، التسديد، والتحكم بالكرة</li>
          <li>ثلاثة مستويات صعوبة لكل تحدي تناسب جميع المستويات</li>
          <li>نظام نقاط متطور يحسب الأداء ويقدم تقييماً دقيقاً للمهارات</li>
          <li>أهداف متحركة وديناميكية تتكيف مع مستوى اللاعب</li>
          <li>تحليل مفصّل للأداء مع توصيات للتحسين بعد كل تحدي</li>
          <li>تتبع التقدم ومقارنة النتائج بين المحاولات المختلفة</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillChallengeAR;
