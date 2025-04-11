
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import MovementChart from '../charts/MovementChart';
import SpeedZones from '../charts/SpeedZones';
import HeatmapVisualization from '../charts/HeatmapVisualization';

interface MovementAnalysisTabProps {
  analysis: any;
}

const MovementAnalysisTab: React.FC<MovementAnalysisTabProps> = ({ analysis }) => {
  // Sample movement data (in a real app, this would come from the analysis)
  const movementData = [
    { timestamp: 1, speed: 15.2, acceleration: 2.1 },
    { timestamp: 2, speed: 18.3, acceleration: 3.2 },
    { timestamp: 3, speed: 22.5, acceleration: 4.2 },
    { timestamp: 4, speed: 28.4, acceleration: 5.9 },
    { timestamp: 5, speed: 25.1, acceleration: -3.3 },
    { timestamp: 6, speed: 20.7, acceleration: -4.4 },
    { timestamp: 7, speed: 18.9, acceleration: -1.8 },
    { timestamp: 8, speed: 16.3, acceleration: -2.6 }
  ];
  
  const speedZones = [
    { name: 'مشي', percentage: 20, color: '#10B981' },
    { name: 'جري خفيف', percentage: 45, color: '#6366F1' },
    { name: 'جري', percentage: 25, color: '#8B5CF6' },
    { name: 'سرعة قصوى', percentage: 10, color: '#EC4899' }
  ];
  
  // Get movement metrics from analysis or use defaults
  const movementMetrics = {
    averageSpeed: analysis?.movementMetrics?.averageSpeed || 12.5,
    topSpeed: analysis?.movementMetrics?.topSpeed || 28.4,
    averageAcceleration: analysis?.movementMetrics?.averageAcceleration || 2.8,
    totalDistance: analysis?.movementMetrics?.totalDistance || 1250,
    sprintCount: analysis?.movementMetrics?.sprintCount || 8,
    directionChanges: analysis?.movementMetrics?.directionChanges || 24
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>تحليل الحركة</CardTitle>
            <CardDescription>تحليل سرعة وتسارع اللاعب خلال فترة التحليل</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <MovementChart data={movementData} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>مناطق السرعة</CardTitle>
            <CardDescription>تقسيم وقت اللاعب على مناطق سرعة مختلفة</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <SpeedZones data={speedZones} />
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>الخريطة الحرارية للاعب</CardTitle>
          <CardDescription>تحليل تواجد اللاعب في مناطق الملعب المختلفة</CardDescription>
        </CardHeader>
        <CardContent className="h-[400px] flex items-center justify-center">
          <HeatmapVisualization />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>إحصائيات الحركة</CardTitle>
          <CardDescription>تحليل مؤشرات الأداء الحركي للاعب</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>متوسط السرعة</span>
                <span className="font-medium">{movementMetrics.averageSpeed} كم/ساعة</span>
              </div>
              <Progress value={movementMetrics.averageSpeed / 0.3} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>السرعة القصوى</span>
                <span className="font-medium">{movementMetrics.topSpeed} كم/ساعة</span>
              </div>
              <Progress value={movementMetrics.topSpeed / 0.35} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>متوسط التسارع</span>
                <span className="font-medium">{movementMetrics.averageAcceleration} م/ث²</span>
              </div>
              <Progress value={movementMetrics.averageAcceleration * 10} className="h-2" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>المسافة الإجمالية</span>
                <span className="font-medium">{movementMetrics.totalDistance} م</span>
              </div>
              <Progress value={movementMetrics.totalDistance / 20} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>عدد السبرنتات</span>
                <span className="font-medium">{movementMetrics.sprintCount}</span>
              </div>
              <Progress value={movementMetrics.sprintCount * 5} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>تغييرات الاتجاه</span>
                <span className="font-medium">{movementMetrics.directionChanges}</span>
              </div>
              <Progress value={movementMetrics.directionChanges * 2} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovementAnalysisTab;
