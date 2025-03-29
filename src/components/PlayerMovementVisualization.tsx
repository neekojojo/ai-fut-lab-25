import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { PlayerPosition } from '@/utils/videoDetection/types';
import { CHART_COLORS } from '@/components/charts/constants';

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
  
  const drawSkeleton = (
    ctx: CanvasRenderingContext2D, 
    keypoints: {x: number; y: number; part: string; confidence: number;}[]
  ) => {
    const connections = [
      ["nose", "left_eye"],
      ["nose", "right_eye"],
      ["left_eye", "left_ear"],
      ["right_eye", "right_ear"],
      
      ["left_shoulder", "right_shoulder"],
      ["left_shoulder", "left_elbow"],
      ["right_shoulder", "right_elbow"],
      ["left_elbow", "left_wrist"],
      ["right_elbow", "right_wrist"],
      
      ["left_shoulder", "left_hip"],
      ["right_shoulder", "right_hip"],
      ["left_hip", "right_hip"],
      ["left_hip", "left_knee"],
      ["right_hip", "right_knee"],
      ["left_knee", "left_ankle"],
      ["right_knee", "right_ankle"],
    ];

    ctx.strokeStyle = "#22D3EE"; // أزرق ساطع للعظام
    ctx.lineWidth = 4; // خط أكثر سماكة
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
    
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  };
  
  const drawKeypoints = (
    ctx: CanvasRenderingContext2D, 
    keypoints: {x: number; y: number; part: string; confidence: number;}[]
  ) => {
    keypoints.forEach(keypoint => {
      if (keypoint.confidence > 0.5) {
        ctx.fillStyle = "#F471B5"; // وردي ساطع للمفاصل
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.shadowColor = 'rgba(244, 113, 181, 0.7)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 3, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
      }
    });
  };
  
  const animate = (timestamp: number) => {
    if (!lastTimeRef.current) {
      lastTimeRef.current = timestamp;
    }
    
    const elapsed = timestamp - lastTimeRef.current;
    const frameInterval = 1000 / frameRateRef.current;
    
    if (elapsed > frameInterval) {
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
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const position = playerPositions[currentFrame];
    if (!position) return;
    
    drawSkeleton(ctx, position.keypoints);
    drawKeypoints(ctx, position.keypoints);
    
    const drawTextWithBackground = (text: string, x: number, y: number, isHighlighted: boolean = false) => {
      const bgColor = "#FFFFFF";
      const borderColor = isHighlighted ? "#0891B2" : "#8B5CF6";
      const textColor = "#000000";
      
      const padding = 10;
      const textWidth = ctx.measureText(text).width;
      const textHeight = 24;
      
      ctx.fillStyle = bgColor;
      ctx.fillRect(x - padding, y - textHeight, textWidth + padding * 2, textHeight + padding/2);
      
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      ctx.strokeRect(x - padding, y - textHeight, textWidth + padding * 2, textHeight + padding/2);
      
      ctx.fillStyle = textColor;
      ctx.font = "bold 16px Arial";
      ctx.fillText(text, x, y - 4);
    };
    
    drawTextWithBackground(`الإطار: ${position.frameNumber + 1}/${playerPositions.length}`, 10, 30, true);
    drawTextWithBackground(`الوقت: ${(position.timestamp / 1000).toFixed(2)} ثانية`, 10, 70);
    
    if (position.confidence) {
      drawTextWithBackground(`الثقة: ${(position.confidence * 100).toFixed(0)}%`, 10, 110);
    }
  }, [currentFrame, playerPositions]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
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
          
          <div className="bg-white p-4 rounded-lg border border-primary/30">
            <input
              type="range"
              min="0"
              max={playerPositions.length - 1}
              value={currentFrame}
              onChange={handleSliderChange}
              className="w-full accent-primary h-3"
            />
            
            <div className="text-center mt-4 bg-white py-3 rounded-md border border-primary/30 shadow-[0_0_10px_rgba(139,92,246,0.2)]">
              {playerPositions.length > 0 && (
                <div className="flex items-center justify-center">
                  <span className="font-bold text-primary ml-2">الإطار الحالي:</span>
                  <span className="inline-block min-w-10 bg-primary/20 px-3 py-1 rounded-md text-black font-bold">
                    {currentFrame + 1}
                  </span>
                  <span className="mx-2 text-gray-600">/</span>
                  <span className="text-black">{playerPositions.length}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerMovementVisualization;
