import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile, TrainingVideo } from '@/components/AnalysisReport.d';
import OverviewTab from '@/components/dashboard/tabs/OverviewTab';
import AnalysesTab from '@/components/dashboard/tabs/AnalysesTab';
import TrainingTab from '@/components/dashboard/tabs/TrainingTab';
import BadgesTab from '@/components/dashboard/tabs/BadgesTab';
import ProfileTab from '@/components/dashboard/tabs/ProfileTab';
import { useAuth } from '@/components/auth/AuthContext';
import { fetchPlayerAnalyses } from '@/services/playerAnalysisService';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const mockTrainingVideos: TrainingVideo[] = [
  {
    id: "1",
    title: "Advanced Passing Techniques",
    description: "Learn the most effective passing techniques used by professionals",
    videoUrl: "#",
    thumbnailUrl: "https://via.placeholder.com/300x200",
    duration: 15,
    category: "passing",
    difficulty: "advanced",
    targetAreas: ["passing", "technique"],
    skill: "passing",
    rating: 4.5,
    views: 1240
  },
  {
    id: "2",
    title: "Shooting Drills for Strikers",
    description: "Improve your goal-scoring ability with these shooting drills",
    videoUrl: "#",
    thumbnailUrl: "https://via.placeholder.com/300x200",
    duration: 20,
    category: "shooting",
    difficulty: "intermediate",
    targetAreas: ["shooting", "finishing"],
    skill: "shooting",
    rating: 4.8,
    views: 2340
  },
  {
    id: "3",
    title: "Dribbling Masterclass",
    description: "Learn to dribble past defenders like professional players",
    videoUrl: "#",
    thumbnailUrl: "https://via.placeholder.com/300x200",
    duration: 18,
    category: "dribbling",
    difficulty: "intermediate",
    targetAreas: ["dribbling", "control"],
    skill: "dribbling",
    rating: 4.6,
    views: 1890
  }
];

const Dashboard: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [trainingVideos, setTrainingVideos] = useState<TrainingVideo[]>([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoadingAnalyses, setIsLoadingAnalyses] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading) {
      if (user) {
        fetchUserProfileData();
        setTrainingVideos(mockTrainingVideos);
        
        fetchUserAnalyses();
      } else {
        navigate('/sign-in', { replace: true });
      }
    }
  }, [user, navigate, loading]);

  const fetchUserProfileData = async () => {
    if (!user) return;
    
    setIsLoadingProfile(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      
      const initialProfile: UserProfile = {
        id: user.id,
        email: user.email || '',
        name: data.full_name || user.user_metadata?.full_name || 'User',
        avatarUrl: data.avatar_url || null,
        bio: data.bio || '',
        age: data.age,
        country: data.country,
        city: data.city,
        height: data.height,
        weight: data.weight,
        preferredFoot: data.preferred_foot,
        position: data.position,
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
      
      setUserProfile(initialProfile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      toast({
        variant: "destructive",
        title: "Error Loading Profile",
        description: "We couldn't load your profile data. Please try again.",
      });
      
      if (user) {
        const defaultProfile: UserProfile = {
          id: user.id,
          email: user.email || '',
          name: user.user_metadata?.full_name || 'User',
          avatarUrl: null,
          bio: '',
          analyses: [],
          badges: [],
          trainingProgress: {
            videosWatched: 0,
            skillsImproved: [],
            nextRecommendation: ""
          }
        };
        
        setUserProfile(defaultProfile);
      }
    } finally {
      setIsLoadingProfile(false);
    }
  };

  const fetchUserAnalyses = async () => {
    if (!user) return;
    
    setIsLoadingAnalyses(true);
    try {
      const analyses = await fetchPlayerAnalyses();
      console.log('Fetched analyses:', analyses);
      
      setUserProfile(prevProfile => {
        if (prevProfile) {
          return {
            ...prevProfile,
            analyses: analyses
          };
        }
        return prevProfile;
      });
    } catch (error) {
      console.error('Error fetching analyses:', error);
      toast({
        title: "Error Loading Analyses",
        description: "We couldn't load your previous analyses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingAnalyses(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/sign-in', { replace: true });
  };

  if (loading || !userProfile || isLoadingProfile) {
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
            <OverviewTab 
              userProfile={userProfile} 
              trainingVideos={trainingVideos} 
            />
          </TabsContent>
          
          <TabsContent value="analyses">
            <AnalysesTab 
              analyses={userProfile.analyses} 
              isLoading={isLoadingAnalyses} 
            />
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
