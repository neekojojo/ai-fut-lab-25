
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserIcon, Lock, LogOut } from 'lucide-react';
import { UserProfile } from '@/components/AnalysisReport.d';

interface ProfileTabProps {
  userProfile: UserProfile;
  onSignOut: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ userProfile, onSignOut }) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Manage your account information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center md:flex-row md:items-start md:space-x-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4 md:mb-0">
              <UserIcon className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{userProfile.name}</h3>
              <p className="text-muted-foreground">{userProfile.email}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                  {userProfile.badges.length} badges
                </div>
                <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                  {userProfile.analyses.length} analyses
                </div>
                <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                  {userProfile.trainingProgress.videosWatched} videos watched
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mt-6">
            <Button variant="outline" className="w-full justify-start">
              <UserIcon className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Lock className="mr-2 h-4 w-4" />
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start" onClick={onSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileTab;
