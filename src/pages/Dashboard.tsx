
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import type { UserProfile, PlayerAnalysis, TrainingVideo } from '@/components/AnalysisReport.d.ts';
import { TrophyIcon, VideoIcon, BarChart3Icon, UserIcon, BadgeIcon, HeartPulseIcon, Lock, LogOut } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

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

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/sign-in');
      return;
    }

    // In a real app, we would fetch the user profile from an API
    setUserProfile(mockUserProfile);
    setTrainingVideos(mockTrainingVideos);
  }, [navigate]);

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
          
          <TabsContent value="overview" className="space-y-6">
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Analyses</CardTitle>
                  <CardDescription>Your most recent performance analyses</CardDescription>
                </CardHeader>
                <CardContent>
                  {userProfile.analyses.length > 0 ? (
                    <ul className="space-y-4">
                      {userProfile.analyses.slice(0, 3).map((analysis, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{analysis.playerName}</p>
                            <p className="text-sm text-muted-foreground">{analysis.position}</p>
                          </div>
                          <Button variant="outline" size="sm" onClick={() => navigate(`/analysis/${index}`)}>
                            View
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No analyses yet</p>
                      <Button variant="outline" className="mt-2" onClick={() => navigate('/')}>
                        Perform Analysis
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Training</CardTitle>
                  <CardDescription>Videos tailored to improve your skills</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {trainingVideos.slice(0, 3).map((video) => (
                      <li key={video.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{video.title}</p>
                          <p className="text-sm text-muted-foreground">{video.skill} • {video.duration} min</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/training/${video.id}`)}>
                          Watch
                        </Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analyses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analyses</CardTitle>
                <CardDescription>All your player analyses</CardDescription>
              </CardHeader>
              <CardContent>
                {userProfile.analyses.length > 0 ? (
                  <div className="space-y-4">
                    {userProfile.analyses.map((analysis, index) => (
                      <Card key={index} className="overflow-hidden">
                        <div className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{analysis.playerName}</h3>
                              <p className="text-sm text-muted-foreground">{analysis.position}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{analysis.marketValue}</p>
                              <p className="text-sm text-muted-foreground">Market Value</p>
                            </div>
                          </div>
                          
                          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Technical</p>
                              <Progress value={analysis.performance.technical} className="h-2 mt-1" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Physical</p>
                              <Progress value={analysis.performance.physical} className="h-2 mt-1" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Tactical</p>
                              <Progress value={analysis.performance.tactical} className="h-2 mt-1" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Mental</p>
                              <Progress value={analysis.performance.mental} className="h-2 mt-1" />
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Button variant="outline" size="sm" onClick={() => navigate(`/analysis/${index}`)}>
                              View Full Analysis
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">You haven't performed any analyses yet</p>
                    <Button onClick={() => navigate('/')}>Perform Your First Analysis</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="training" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Training Videos</CardTitle>
                <CardDescription>Improve your skills with these training resources</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trainingVideos.map((video) => (
                    <Card key={video.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img src={video.thumbnail} alt={video.title} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                          <Button variant="outline" className="rounded-full w-12 h-12 p-0">
                            <VideoIcon className="h-6 w-6" />
                          </Button>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                          {video.duration} min
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold">{video.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{video.description}</p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                              {video.skill}
                            </div>
                            <div className="text-xs text-muted-foreground ml-2">
                              {video.difficulty}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-3 h-3 text-yellow-500"
                            >
                              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                            </svg>
                            <span className="text-xs ml-1">{video.rating}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="badges" className="space-y-6">
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
          </TabsContent>
          
          <TabsContent value="profile" className="space-y-6">
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
                  <Button variant="outline" className="w-full justify-start" onClick={() => {
                    localStorage.removeItem('user');
                    navigate('/sign-in');
                  }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
