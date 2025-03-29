
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PlayerPosition } from '@/utils/videoDetection/types';

interface PlayerMovementVisualizationProps {
  playerPositions: PlayerPosition[];
}

const PlayerMovementVisualization: React.FC<PlayerMovementVisualizationProps> = ({
  playerPositions
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const frameRateRef = useRef<number>(30); // 30 fps
  
  // Draw skeleton connections between keypoints
  const drawSkeleton = (
    ctx: CanvasRenderingContext2D, 
    keypoints: {x: number; y: number; part: string; confidence: number;}[]
  ) => {
    // Define connections between keypoints
    const connections = [
      // Face
      ["nose", "left_eye"],
      ["nose", "right_eye"],
      ["left_eye", "left_ear"],
      ["right_eye", "right_ear"],
      
      // Body
      ["left_shoulder", "right_shoulder"],
      ["left_shoulder", "left_elbow"],
      ["right_shoulder", "right_elbow"],
      ["left_elbow", "left_wrist"],
      ["right_elbow", "right_wrist"],
      
      // Lower body
      ["left_shoulder", "left_hip"],
      ["right_shoulder", "right_hip"],
      ["left_hip", "right_hip"],
      ["left_hip", "left_knee"],
      ["right_hip", "right_knee"],
      ["left_knee", "left_ankle"],
      ["right_knee", "right_ankle"],
    ];

    ctx.strokeStyle = "#22D3EE"; // ازرق ساطع للعظام
    ctx.lineWidth = 4; // خط اكثر سماكة
    ctx.shadowColor = 'rgba(34, 211, 238, 0.6)';
    ctx.shadowBlur = 8;
    
    connections.forEach(([from, to]) => {
      const fromPoint = keypoints.find(kp => kp.part === from);
      const toPoint = keypoints.find(kp => kp.part === to);
      
      if (fromPoint && toPoint && fromPoint.confidence > 0.5 && toPoint.confidence > 0.5) {
        ctx.beginPath();
        ctx.moveTo(fromPoint.x, fromPoint.y);
        ctx.lineTo(toPoint.x, toPoint.y);
        ctx.stroke();
      }
    });
    
    // إزالة تأثير الظل بعد رسم العظام
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  };
  
  // Draw keypoints
  const drawKeypoints = (
    ctx: CanvasRenderingContext2D, 
    keypoints: {x: number; y: number; part: string; confidence: number;}[]
  ) => {
    keypoints.forEach(keypoint => {
      if (keypoint.confidence > 0.5) {
        // رسم دائرة بتوهج للمفاصل
        ctx.fillStyle = "#F471B5"; // وردي ساطع للمفاصل
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // إضافة توهج حول المفاصل
        ctx.shadowColor = 'rgba(244, 113, 181, 0.7)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 3, 0, 2 * Math.PI);
        ctx.fill();
        
        // إزالة تأثير الظل
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }
    });
  };
  
  // Animation loop
  const animate = (timestamp: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }
    
    const elapsed = timestamp - lastTimeRef.current;
    const frameInterval = 1000 / frameRateRef.current;
    
    if (elapsed > frameInterval) {
      // Update frame
      setCurrentFrame(prev => {
        const nextFrame = (prev + 1) % playerPositions.length;
        return nextFrame;
      });
      
      lastTimeRef.current = timestamp - (elapsed % frameInterval);
    }
    
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };
  
  // Start/stop animation
  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);
  
  // Draw current frame
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas with black background
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Get current position data
    const position = playerPositions[currentFrame];
    if (!position) return;
    
    // Draw skeleton and keypoints
    drawSkeleton(ctx, position.keypoints);
    drawKeypoints(ctx, position.keypoints);
    
    // Function to draw text with enhanced visibility
    const drawTextWithBackground = (text: string, x: number, y: number, isHighlighted: boolean = false) => {
      // الخلفية السوداء مع حدود متوهجة
      ctx.fillStyle = isHighlighted ? "rgba(34, 211, 238, 0.3)" : "rgba(0, 0, 0, 0.9)";
      const padding = 8;
      const textWidth = ctx.measureText(text).width;
      ctx.shadowColor = isHighlighted ? 'rgba(34, 211, 238, 0.7)' : 'rgba(255, 255, 255, 0.5)';
      ctx.shadowBlur = 10;
      ctx.fillRect(x - padding, y - 20, textWidth + padding * 2, 28);
      ctx.strokeStyle = isHighlighted ? "#22D3EE" : "#FFFFFF";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x - padding, y - 20, textWidth + padding * 2, 28);
      
      // النص الأبيض
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.fillStyle = isHighlighted ? "#FFFFFF" : "#FFFFFF";
      ctx.font = "bold 16px Arial";
      ctx.fillText(text, x, y);
    };
    
    // Draw frame number and timestamp with enhanced visibility
    drawTextWithBackground(`الإطار: ${position.frameNumber + 1}/${playerPositions.length}`, 10, 30, true);
    drawTextWithBackground(`الوقت: ${(position.timestamp / 1000).toFixed(2)} ثانية`, 10, 70);
    
    // Draw confidence score if available
    if (position.confidence) {
      drawTextWithBackground(`الثقة: ${(position.confidence * 100).toFixed(0)}%`, 10, 110);
    }
  }, [currentFrame, playerPositions]);
  
  // Initialize canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas size based on the first frame bbox if available
    if (playerPositions.length > 0) {
      canvas.width = 600;
      canvas.height = 400;
    }
  }, [playerPositions]);
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFrame(parseInt(e.target.value));
    setIsPlaying(false);
  };
  
  return (
    <Card className="w-full bg-gradient-to-br from-gray-900 to-black border-primary/20 shadow-lg">
      <CardHeader className="border-b border-primary/10 bg-black/40">
        <CardTitle className="text-white flex items-center">
          <span className="text-primary mr-2">●</span>
          تحليل حركة اللاعب
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center p-6">
        <div className="relative border-2 border-primary/30 rounded-md w-full max-w-[600px] aspect-[3/2] bg-black overflow-hidden shadow-[0_0_15px_rgba(139,92,246,0.3)]">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full"
          />
        </div>
        
        <div className="w-full max-w-[600px] mt-6 space-y-5">
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={handlePlayPause}
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 font-bold"
            >
              {isPlaying ? 'إيقاف' : 'تشغيل'}
            </button>
          </div>
          
          <div className="bg-gray-900/70 p-3 rounded-lg">
            <input
              type="range"
              min="0"
              max={playerPositions.length - 1}
              value={currentFrame}
              onChange={handleSliderChange}
              className="w-full accent-primary h-2.5"
            />
            
            <div className="text-center text-sm text-white mt-3 bg-black/50 py-2 rounded-md border border-primary/20">
              {playerPositions.length > 0 && (
                <>
                  <span className="font-bold text-primary">الإطار الحالي:</span>{' '}
                  <span className="inline-block min-w-10 bg-primary/10 px-2 py-0.5 rounded-md">{currentFrame + 1}</span> / {playerPositions.length}
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerMovementVisualization;
