
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrophyIcon } from 'lucide-react';
import { UserProfile } from '@/components/AnalysisReport.d';

interface BadgesTabProps {
  userProfile: UserProfile;
}

const BadgesTab: React.FC<BadgesTabProps> = ({ userProfile }) => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Achievements</CardTitle>
          <CardDescription>Badges and rewards you've earned</CardDescription>
        </CardHeader>
        <CardContent>
          {userProfile.badges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {userProfile.badges.map((badge, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="p-4 flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                      badge.level === 'gold' ? 'bg-yellow-100 text-yellow-700' : 
                      badge.level === 'silver' ? 'bg-gray-200 text-gray-700' : 
                      'bg-amber-100 text-amber-700'
                    }`}>
                      <TrophyIcon className="h-8 w-8" />
                    </div>
                    <h3 className="font-semibold">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
                    <div className={`mt-2 text-xs px-2 py-1 rounded-full ${
                      badge.level === 'gold' ? 'bg-yellow-100 text-yellow-700' : 
                      badge.level === 'silver' ? 'bg-gray-200 text-gray-700' : 
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {badge.level} level
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Earned on {badge.earnedAt.toLocaleDateString()}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">You haven't earned any badges yet</p>
              <Button onClick={() => navigate('/')}>Perform Your First Analysis</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BadgesTab;
