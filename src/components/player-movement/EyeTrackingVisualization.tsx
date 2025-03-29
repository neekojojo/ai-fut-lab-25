
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EyeTrackingVisualizationProps {
  eyeTrackingData: {
    focusScore: number;
    scanningEfficiency: number;
    decisionTimeMs: number;
    awarenessRating: number;
    anticipationScore: number;
    focusPoints: {x: number, y: number, duration: number}[];
  };
}

const EyeTrackingVisualization: React.FC<EyeTrackingVisualizationProps> = ({ eyeTrackingData }) => {
  // Helper function to determine score badge color
  const getScoreBadge = (score: number) => {
    if (score >= 85) return <Badge variant="high">ممتاز</Badge>;
    if (score >= 70) return <Badge variant="medium">جيد</Badge>;
    return <Badge variant="low">متوسط</Badge>;
  };
  
  // Helper function to determine decision time quality
  const getDecisionTimeQuality = (timeMs: number) => {
    if (timeMs < 300) return <Badge variant="high">سريع</Badge>;
    if (timeMs < 450) return <Badge variant="medium">متوسط</Badge>;
    return <Badge variant="low">بطيء</Badge>;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">تحليل حركة العين</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="relative w-full h-64 bg-black dark:bg-black rounded-lg overflow-hidden mb-4">
            {/* Field representation */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-5/6 h-4/5 border-2 border-gray-300 dark:border-gray-300 rounded-lg"></div>
              <div className="absolute w-1/2 h-4/5 border-r-2 border-gray-300 dark:border-gray-300"></div>
              <div className="absolute left-[8.3%] w-[16.7%] h-4/5 flex items-center">
                <div className="w-full h-1/2 border-2 border-gray-300 dark:border-gray-300 rounded-lg"></div>
              </div>
              <div className="absolute right-[8.3%] w-[16.7%] h-4/5 flex items-center">
                <div className="w-full h-1/2 border-2 border-gray-300 dark:border-gray-300 rounded-lg"></div>
              </div>
            </div>
            
            {/* Focus points */}
            {eyeTrackingData.focusPoints.map((point, index) => (
              <div 
                key={index}
                className="absolute rounded-full bg-primary animate-pulse"
                style={{
                  left: `${point.x}%`,
                  top: `${point.y}%`,
                  width: `${Math.max(5, Math.min(20, point.duration / 30))}px`,
                  height: `${Math.max(5, Math.min(20, point.duration / 30))}px`,
                  opacity: 0.7,
                  transform: 'translate(-50%, -50%)',
                  zIndex: Math.floor(point.duration)
                }}
              />
            ))}
            
            {/* Vision line visualization */}
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              <g stroke="rgba(138, 75, 175, 0.4)" strokeWidth="1.5">
                {eyeTrackingData.focusPoints.map((point, i) => {
                  if (i === 0) return null;
                  const prevPoint = eyeTrackingData.focusPoints[i-1];
                  return (
                    <line 
                      key={i} 
                      x1={`${prevPoint.x}%`} 
                      y1={`${prevPoint.y}%`} 
                      x2={`${point.x}%`} 
                      y2={`${point.y}%`}
                    />
                  );
                })}
              </g>
            </svg>
            
            <div className="absolute bottom-2 right-2 bg-black text-white p-1 rounded text-xs opacity-70">
              خريطة حركة العين
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">درجة التركيز</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{eyeTrackingData.focusScore.toFixed(0)}</span>
                  {getScoreBadge(eyeTrackingData.focusScore)}
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">كفاءة المسح</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{eyeTrackingData.scanningEfficiency.toFixed(0)}</span>
                  {getScoreBadge(eyeTrackingData.scanningEfficiency)}
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">سرعة اتخاذ القرار</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{eyeTrackingData.decisionTimeMs.toFixed(0)} مللي ثانية</span>
                  {getDecisionTimeQuality(eyeTrackingData.decisionTimeMs)}
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">الوعي المكاني</span>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{eyeTrackingData.awarenessRating.toFixed(0)}</span>
                  {getScoreBadge(eyeTrackingData.awarenessRating)}
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-3 border-t">
            <h4 className="text-sm font-medium mb-2">تحليل أنماط النظر</h4>
            <ul className="text-sm space-y-1">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>
                  {eyeTrackingData.scanningEfficiency > 75 
                    ? 'نمط مسح منهجي وفعال للملعب' 
                    : 'بحاجة لتحسين أنماط المسح والبحث عن الخيارات'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>
                  {eyeTrackingData.focusScore > 80 
                    ? 'تركيز ممتاز على النقاط المهمة في الملعب' 
                    : 'بحاجة لتحسين التركيز على النقاط المهمة في الملعب'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>
                  {eyeTrackingData.anticipationScore > 75 
                    ? 'قدرة جيدة على توقع الأحداث قبل حدوثها' 
                    : 'بحاجة لتحسين مهارات توقع اللعب'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EyeTrackingVisualization;
