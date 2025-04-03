
import React from 'react';
import { Card } from '@/components/ui/card';
import PerformanceMetricsCard from '../PerformanceMetricsCard';
import { PerformanceProfile } from '@/components/charts/PerformanceProfile';
import { PerformanceDistribution } from '@/components/charts/PerformanceDistribution';
import { OverallStats } from '@/components/charts/OverallStats';
import AchievementBadges from '../AchievementBadges';
import { determineEarnedBadges } from '@/utils/analysis/badgeService';

interface StatsTabContentProps {
  playerStats: any;
  analysis: any;
}

const StatsTabContent: React.FC<StatsTabContentProps> = ({ playerStats, analysis }) => {
  // تحديد الشارات المكتسبة
  const earnedBadges = determineEarnedBadges(analysis);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PerformanceMetricsCard 
          metrics={{
            pace: playerStats.speed || 78,
            acceleration: playerStats.acceleration || 82,
            stamina: playerStats.stamina || 75,
            agility: playerStats.agility || 73,
            balance: playerStats.balance || 68,
            positioning: playerStats.positioning || 76,
            movement: playerStats.movement || 79,
            awareness: playerStats.awareness || 81,
            decisionMaking: playerStats.decisionMaking || 73,
            ballControl: playerStats.ballControl || 77,
            technique: playerStats.technique || 75,
            overall: playerStats.overall || 78,
            details: {
              heatmapWeight: playerStats.heatmapWeight || 72,
              sprintQuality: playerStats.sprintQuality || 79,
              movementEfficiency: playerStats.movementEfficiency || 76,
              positioningAccuracy: playerStats.positioningAccuracy || 74,
              energyEfficiency: playerStats.energyEfficiency || 77
            }
          }}
        />
        
        <PerformanceDistribution playerStats={{
          avgSpeed: playerStats.speed || 12.5,
          maxSpeed: playerStats.maxSpeed || 22.3,
          avgAcceleration: playerStats.acceleration || 3.2,
          distanceCovered: playerStats.distanceCovered || 1250,
          balanceScore: playerStats.balance || 68,
          technicalScore: playerStats.technique || 75,
          physicalScore: playerStats.physical || 82,
          movementEfficiency: playerStats.movementEfficiency || 79
        }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OverallStats playerStats={{
          avgSpeed: playerStats.speed || 12.5,
          maxSpeed: playerStats.maxSpeed || 22.3,
          avgAcceleration: playerStats.acceleration || 3.2,
          distanceCovered: playerStats.distanceCovered || 1250,
          balanceScore: playerStats.balance || 68,
          technicalScore: playerStats.technique || 75,
          physicalScore: playerStats.physical || 82,
          movementEfficiency: playerStats.movementEfficiency || 79
        }} />
        
        <PerformanceProfile 
          playerStats={{
            avgSpeed: playerStats.speed || 12.5,
            maxSpeed: playerStats.maxSpeed || 22.3,
            avgAcceleration: playerStats.acceleration || 3.2,
            distanceCovered: playerStats.distanceCovered || 1250,
            balanceScore: playerStats.balance || 68,
            technicalScore: playerStats.technique || 75,
            physicalScore: playerStats.physical || 82,
            movementEfficiency: playerStats.movementEfficiency || 79
          }}
          playerName={analysis.playerName || "اللاعب"}
        />
      </div>
      
      {/* إضافة مكون الشارات والإنجازات */}
      <AchievementBadges playerName={analysis.playerName} badges={earnedBadges} />
    </div>
  );
};

export default StatsTabContent;
