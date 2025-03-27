
import React from 'react';
import DashboardStats from '../DashboardStats';
import RecentAnalyses from '../RecentAnalyses';
import RecommendedTraining from '../RecommendedTraining';
import { UserProfile, TrainingVideo } from '@/components/AnalysisReport.d';

interface OverviewTabProps {
  userProfile: UserProfile;
  trainingVideos: TrainingVideo[];
}

const OverviewTab: React.FC<OverviewTabProps> = ({ userProfile, trainingVideos }) => {
  return (
    <div className="space-y-6">
      <DashboardStats userProfile={userProfile} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentAnalyses analyses={userProfile.analyses} />
        <RecommendedTraining trainingVideos={trainingVideos} />
      </div>
    </div>
  );
};

export default OverviewTab;
