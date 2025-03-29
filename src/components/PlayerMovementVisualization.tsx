
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

    ctx.strokeStyle = "#0EA5E9";
    ctx.lineWidth = 3;
    
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
  };
  
  // Draw keypoints
  const drawKeypoints = (
    ctx: CanvasRenderingContext2D, 
    keypoints: {x: number; y: number; part: string; confidence: number;}[]
  ) => {
    keypoints.forEach(keypoint => {
      if (keypoint.confidence > 0.5) {
        ctx.fillStyle = "#F97316";
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
        ctx.fill();
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
    
    // Improved text visibility with dark background and white text
    const drawTextWithBackground = (text: string, x: number, y: number) => {
      // Draw black background rectangle with higher opacity
      ctx.fillStyle = "rgba(0, 0, 0, 0.85)";
      const textWidth = ctx.measureText(text).width;
      ctx.fillRect(x - 4, y - 20, textWidth + 8, 26);
      
      // Draw white text with larger font
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 16px Arial";
      ctx.fillText(text, x, y);
    };
    
    // Draw frame number and timestamp with better visibility
    drawTextWithBackground(`الإطار: ${position.frameNumber + 1}/${playerPositions.length}`, 10, 30);
    drawTextWithBackground(`الوقت: ${(position.timestamp / 1000).toFixed(2)} ثانية`, 10, 60);
    
    // Draw confidence score if available
    if (position.confidence) {
      drawTextWithBackground(`الثقة: ${(position.confidence * 100).toFixed(0)}%`, 10, 90);
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>تحليل حركة اللاعب</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative border rounded-md w-full max-w-[600px] aspect-[3/2] bg-black">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full"
          />
        </div>
        
        <div className="w-full max-w-[600px] mt-4 space-y-4">
          <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={handlePlayPause}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              {isPlaying ? 'إيقاف' : 'تشغيل'}
            </button>
          </div>
          
          <input
            type="range"
            min="0"
            max={playerPositions.length - 1}
            value={currentFrame}
            onChange={handleSliderChange}
            className="w-full"
          />
          
          <div className="text-center text-sm text-primary">
            {playerPositions.length > 0 && (
              <>
                <span className="font-bold">الإطار الحالي:</span> {currentFrame + 1} / {playerPositions.length}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerMovementVisualization;
