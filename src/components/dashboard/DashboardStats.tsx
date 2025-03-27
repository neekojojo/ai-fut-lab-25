
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3Icon, VideoIcon, BadgeIcon, HeartPulseIcon } from 'lucide-react';
import { UserProfile } from '@/components/AnalysisReport.d';

interface DashboardStatsProps {
  userProfile: UserProfile;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ userProfile }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <BarChart3Icon className="h-4 w-4 mr-2" />
            Analyses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userProfile.analyses.length}</div>
          <p className="text-xs text-muted-foreground">Total analyses performed</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <VideoIcon className="h-4 w-4 mr-2" />
            Training
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userProfile.trainingProgress.videosWatched}</div>
          <p className="text-xs text-muted-foreground">Videos watched</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <BadgeIcon className="h-4 w-4 mr-2" />
            Badges
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userProfile.badges.length}</div>
          <p className="text-xs text-muted-foreground">Achievements earned</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <HeartPulseIcon className="h-4 w-4 mr-2" />
            Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Good</div>
          <p className="text-xs text-muted-foreground">Current injury risk status</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
