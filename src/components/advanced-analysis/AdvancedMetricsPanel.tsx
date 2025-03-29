
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PerformanceProfile } from '@/components/charts/PerformanceProfile';
import { PerformanceDistribution } from '@/components/charts/PerformanceDistribution';
import { OverallStats } from '@/components/charts/OverallStats';
import { ProgressCharts } from '@/components/charts/ProgressCharts';

interface AdvancedMetricsPanelProps {
  analysis: any;
}

export const AdvancedMetricsPanel: React.FC<AdvancedMetricsPanelProps> = ({ analysis }) => {
  // Create a mock player stats object for the charts
  const playerStats = {
    avgSpeed: analysis.stats?.avgSpeed || 12.5,
    maxSpeed: analysis.stats?.maxSpeed || 22.3,
    avgAcceleration: analysis.stats?.avgAcceleration || 3.2,
    distanceCovered: analysis.stats?.distanceCovered || 1250,
    balanceScore: analysis.stats?.balanceScore || 68,
    technicalScore: analysis.stats?.technicalScore || 75,
    physicalScore: analysis.stats?.physicalScore || 82,
    movementEfficiency: analysis.stats?.movementEfficiency || 79
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>نظرة عامة على المقاييس المتقدمة</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="performance">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="performance">ملف الأداء</TabsTrigger>
              <TabsTrigger value="distribution">توزيع المهارات</TabsTrigger>
              <TabsTrigger value="stats">إحصائيات عامة</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance">
              <PerformanceProfile playerStats={playerStats} playerName={analysis.playerName} />
            </TabsContent>
            
            <TabsContent value="distribution">
              <PerformanceDistribution playerStats={playerStats} />
            </TabsContent>
            
            <TabsContent value="stats">
              <OverallStats playerStats={playerStats} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>تطور المهارات</CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressCharts />
        </CardContent>
      </Card>
    </div>
  );
};
