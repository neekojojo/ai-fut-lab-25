
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PlayerHeatMapPanelProps {
  heatmapData?: Array<{x: number; y: number; intensity: number}>;
}

const PlayerHeatMapPanel: React.FC<PlayerHeatMapPanelProps> = ({ 
  heatmapData = [
    { x: 20, y: 30, intensity: 0.8 },
    { x: 25, y: 35, intensity: 0.9 },
    { x: 30, y: 40, intensity: 0.7 },
    { x: 35, y: 45, intensity: 0.6 },
    { x: 40, y: 50, intensity: 0.5 },
    { x: 50, y: 30, intensity: 0.8 },
    { x: 55, y: 35, intensity: 0.7 },
    { x: 60, y: 40, intensity: 0.9 },
    { x: 65, y: 45, intensity: 0.6 },
    { x: 70, y: 50, intensity: 0.5 },
    { x: 40, y: 60, intensity: 0.4 },
    { x: 30, y: 65, intensity: 0.3 },
    { x: 45, y: 70, intensity: 0.7 },
  ] 
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>خريطة الحرارة</CardTitle>
        <CardDescription>تحليل مناطق تواجد اللاعب على أرض الملعب</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative h-[280px] w-full bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg overflow-hidden">
          {/* إطار الملعب */}
          <div className="absolute inset-2 border-2 border-white/30 rounded"></div>
          
          {/* خط منتصف الملعب */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/30"></div>
          
          {/* دائرة المنتصف */}
          <div className="absolute top-1/2 left-1/2 w-[50px] h-[50px] border-2 border-white/30 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          
          {/* منطقة الجزاء العليا */}
          <div className="absolute top-2 left-1/4 right-1/4 h-[70px] border-2 border-white/30"></div>
          
          {/* منطقة الجزاء السفلى */}
          <div className="absolute bottom-2 left-1/4 right-1/4 h-[70px] border-2 border-white/30"></div>
          
          {/* رسم نقاط الحرارة */}
          {heatmapData.map((point, index) => (
            <div 
              key={index}
              className="absolute rounded-full bg-red-500/80"
              style={{
                left: `${point.x}%`,
                top: `${point.y}%`,
                width: `${Math.max(2, point.intensity * 30)}px`,
                height: `${Math.max(2, point.intensity * 30)}px`,
                transform: 'translate(-50%, -50%)',
                opacity: Math.max(0.2, point.intensity),
              }}
            />
          ))}

          {/* مؤشر الكثافة */}
          <div className="absolute bottom-4 right-4 flex items-center space-x-1 rtl:space-x-reverse bg-black/50 px-2 py-1 rounded">
            <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <span className="text-xs text-white">الكثافة</span>
          </div>
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          <p>تظهر خريطة الحرارة المناطق التي يتواجد فيها اللاعب بشكل أكثر تكراراً خلال المباراة. 
            المناطق ذات اللون الأحمر الداكن تمثل تواجداً أكثر كثافة للاعب.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerHeatMapPanel;
