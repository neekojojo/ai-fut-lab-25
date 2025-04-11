
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import StatsOverviewCard from '@/components/dashboard/StatsOverviewCard';
import RecentAnalyses from '@/components/dashboard/RecentAnalyses';
import { UserProfile } from '@/types/userProfile';

interface OverviewTabProps {
  userProfile: UserProfile;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ userProfile }) => {
  return (
    <TabsContent value="overview" className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatsOverviewCard 
          title="معدل الأداء" 
          value={userProfile.performanceScore} 
          change={userProfile.improvementRate} 
          type="performance"
        />
        <StatsOverviewCard 
          title="اللياقة البدنية" 
          value={75} 
          change={5.2} 
          type="fitness"
        />
        <StatsOverviewCard 
          title="تقدم التدريب" 
          value={userProfile.trainingProgress} 
          change={12.3} 
          type="training"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <RecentAnalyses analyses={userProfile.analyses} />
        <StatsOverviewCard 
          title="التطور العام" 
          value={82} 
          change={8.6} 
          type="progress" 
          expandedView
        />
      </div>
    </TabsContent>
  );
};

export default OverviewTab;
