
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile, PlayerAnalysis, TrainingVideo } from '@/components/AnalysisReport.d';
import OverviewTab from '@/components/dashboard/tabs/OverviewTab';
import AnalysesTab from '@/components/dashboard/tabs/AnalysesTab';
import TrainingTab from '@/components/dashboard/tabs/TrainingTab';
import BadgesTab from '@/components/dashboard/tabs/BadgesTab';
import ProfileTab from '@/components/dashboard/tabs/ProfileTab';
import { useAuth } from '@/components/auth/AuthContext';

// Mock data
const mockUserProfile: UserProfile = {
  id: "user1",
  email: "user@example.com",
  name: "John Doe",
  analyses: [],
  badges: [
    {
      name: "First Analysis",
      description: "Completed your first player analysis",
      level: "bronze",
      earnedAt: new Date()
    },
    {
      name: "Technique Master",
      description: "Achieved high technical score in analysis",
      level: "silver",
      earnedAt: new Date()
    }
  ],
  trainingProgress: {
    videosWatched: 3,
    skillsImproved: ["passing", "ball control"],
    nextRecommendation: "Work on shooting accuracy"
  }
};

const mockTrainingVideos: TrainingVideo[] = [
  {
    id: "1",
    title: "Advanced Passing Techniques",
    description: "Learn the most effective passing techniques used by professionals",
    url: "#",
    thumbnail: "https://via.placeholder.com/300x200",
    duration: 15,
    skill: "passing",
    difficulty: "advanced",
    rating: 4.5,
    views: 1240
  },
  {
    id: "2",
    title: "Shooting Drills for Strikers",
    description: "Improve your goal-scoring ability with these shooting drills",
    url: "#",
    thumbnail: "https://via.placeholder.com/300x200",
    duration: 20,
    skill: "shooting",
    difficulty: "intermediate",
    rating: 4.8,
    views: 2340
  },
  {
    id: "3",
    title: "Dribbling Masterclass",
    description: "Learn to dribble past defenders like professional players",
    url: "#",
    thumbnail: "https://via.placeholder.com/300x200",
    duration: 18,
    skill: "dribbling",
    difficulty: "intermediate",
    rating: 4.6,
    views: 1890
  }
];

const Dashboard: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [trainingVideos, setTrainingVideos] = useState<TrainingVideo[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Load dashboard data only when we have a user
  useEffect(() => {
    if (user) {
      // In a real app, we would fetch the user profile from an API
      setUserProfile(mockUserProfile);
      setTrainingVideos(mockTrainingVideos);
    } else {
      // If no user, redirect once to sign-in
      navigate('/sign-in', { replace: true });
    }
  }, [user, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/sign-in', { replace: true });
  };

  // Show loading state while checking authentication
  if (!userProfile) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {userProfile.name}</p>
          </div>
          <Button onClick={() => navigate('/')}>New Analysis</Button>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 md:grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analyses">Analyses</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewTab userProfile={userProfile} trainingVideos={trainingVideos} />
          </TabsContent>
          
          <TabsContent value="analyses">
            <AnalysesTab analyses={userProfile.analyses} />
          </TabsContent>
          
          <TabsContent value="training">
            <TrainingTab trainingVideos={trainingVideos} />
          </TabsContent>
          
          <TabsContent value="badges">
            <BadgesTab userProfile={userProfile} />
          </TabsContent>
          
          <TabsContent value="profile">
            <ProfileTab userProfile={userProfile} onSignOut={handleSignOut} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
