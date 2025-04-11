
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from "@/components/ui/container";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { UserCircle, Medal, Dumbbell, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Import tab components
import OverviewTab from '@/components/dashboard/tabs/OverviewTab';
import ProfileTab from '@/components/dashboard/tabs/ProfileTab';
import BadgesTab from '@/components/dashboard/tabs/BadgesTab';
import TrainingTab from '@/components/dashboard/tabs/TrainingTab';
import AnalysesTab from '@/components/dashboard/tabs/AnalysesTab';
import { Badge } from '@/types/badges';
import { UserProfile } from '@/types/userProfile';
import { TrainingVideo } from '@/types/training';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

// Mock data
const mockUserProfile: UserProfile = {
  id: 'user-1',
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  level: 'متقدم',
  position: 'وسط',
  performanceScore: 82,
  improvementRate: 7.5,
  badges: [
    {
      id: '1',
      name: 'لاعب متميز',
      description: 'تم تحقيق أداء متميز في 5 مباريات متتالية',
      icon: 'star',
      color: 'blue',
      type: 'performance',
      level: 'gold',
      earnedAt: new Date('2023-10-15')
    },
    {
      id: '2',
      name: 'القائد',
      description: 'إظهار قدرات قيادية استثنائية في الملعب',
      icon: 'award',
      color: 'purple',
      type: 'leadership',
      level: 'silver',
      earnedAt: new Date('2023-09-20')
    },
    {
      id: '3',
      name: 'صانع اللعب',
      description: 'إنشاء أكثر من 10 فرص تهديفية في مباراة واحدة',
      icon: 'zap',
      color: 'green',
      type: 'technical',
      level: 'gold',
      earnedAt: new Date('2023-11-05')
    },
    {
      id: '4',
      name: 'لياقة بدنية عالية',
      description: 'الحفاظ على مستوى عالٍ من اللياقة البدنية طوال الموسم',
      icon: 'target',
      color: 'red',
      type: 'physical',
      level: 'bronze',
      earnedAt: new Date('2023-08-12')
    }
  ],
  trainingProgress: 68,
  analyses: [
    {
      id: 'analysis-1',
      date: '2023-11-10',
      score: 85
    },
    {
      id: 'analysis-2',
      date: '2023-10-25',
      score: 78
    },
    {
      id: 'analysis-3',
      date: '2023-09-30',
      score: 72
    }
  ]
};

const mockTrainingVideos: TrainingVideo[] = [
  {
    id: 'video-1',
    title: 'تمارين تحسين السرعة للاعبي الوسط',
    description: 'مجموعة من التمارين المصممة خصيصًا لتحسين سرعة وخفة لاعبي الوسط',
    duration: '25:30',
    thumbnailUrl: 'https://example.com/thumbnails/speed.jpg',
    videoUrl: 'https://example.com/videos/speed.mp4',
    level: 'متقدم',
    difficulty: 3,
    category: 'سرعة',
    skill: 'بدنية',
    rating: 4.5,
    targetAreas: [
      'سرعة',
      'خفة',
      'قوة انفجارية'
    ]
  },
  {
    id: 'video-2',
    title: 'تمارين تحسين دقة التمرير',
    description: 'تمارين متقدمة لتحسين دقة التمرير في مواقف اللعب المختلفة',
    duration: '18:45',
    thumbnailUrl: 'https://example.com/thumbnails/passing.jpg',
    videoUrl: 'https://example.com/videos/passing.mp4',
    level: 'متوسط',
    difficulty: 2,
    category: 'مهارة',
    skill: 'تمرير',
    rating: 4.2,
    targetAreas: [
      'تمرير',
      'تحكم بالكرة',
      'رؤية'
    ]
  },
  {
    id: 'video-3',
    title: 'تمارين تكتيكية لتحسين الوعي الميداني',
    description: 'سلسلة من التمارين التكتيكية لتحسين الوعي الميداني واتخاذ القرار',
    duration: '32:15',
    thumbnailUrl: 'https://example.com/thumbnails/tactical.jpg',
    videoUrl: 'https://example.com/videos/tactical.mp4',
    level: 'متقدم',
    difficulty: 4,
    category: 'تكتيك',
    skill: 'ذكاء',
    rating: 4.8,
    targetAreas: [
      'تكتيك',
      'وعي ميداني',
      'اتخاذ قرار'
    ]
  },
  {
    id: 'video-4',
    title: 'تمارين تقوية عضلات الجزء السفلي',
    description: 'مجموعة من التمارين لتقوية عضلات الساقين والحوض لتحسين الأداء',
    duration: '22:10',
    thumbnailUrl: 'https://example.com/thumbnails/strength.jpg',
    videoUrl: 'https://example.com/videos/strength.mp4',
    level: 'متوسط',
    difficulty: 3,
    category: 'قوة',
    skill: 'لياقة',
    rating: 4.0,
    targetAreas: [
      'قوة',
      'تحمل',
      'توازن'
    ]
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userProfile] = useState(mockUserProfile);
  const [trainingVideos] = useState(mockTrainingVideos);
  // Update the analyses to ensure they have unique IDs
  const [analyses] = useState(userProfile.analyses.map((analysis, index) => ({
    ...analysis,
    id: analysis.id || `analysis-${index + 1}`,
    playerName: `أحمد محمد ${index + 1}`,
    position: index % 2 === 0 ? "وسط" : "مهاجم",
    performance: {
      technical: 68 + Math.floor(Math.random() * 20),
      physical: 70 + Math.floor(Math.random() * 15),
      tactical: 75 + Math.floor(Math.random() * 20),
      mental: 65 + Math.floor(Math.random() * 25)
    }
  })));
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/sign-in');
    }
  }, [user, loading, navigate]);

  const handleSignOut = () => {
    console.log("User signed out");
    // Implementation of sign out logic
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">جاري التحميل...</div>;
  }

  if (!user) {
    return null; // Will be redirected by useEffect
  }

  return (
    <>
      <Helmet>
        <title>لوحة التحكم | FootballAI Analyzer</title>
      </Helmet>
      
      <Container className="py-8">
        <Card className="border-none shadow-md bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-black/50">
          <CardHeader className="border-b bg-gradient-to-r from-primary/5 to-transparent">
            <CardTitle className="text-2xl font-bold">لوحة التحكم</CardTitle>
            <CardDescription>
              مرحبًا {userProfile.name}! استعرض تقدمك وتحليلاتك وخطط تدريبك.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-0">
            <Tabs 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="border-b">
                <div className="px-4">
                  <TabsList className="justify-start h-14 bg-transparent p-0 w-full overflow-x-auto no-scrollbar">
                    <TabsTrigger 
                      value="overview"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 h-14"
                    >
                      <BarChart2 className="w-4 h-4 mr-2" />
                      <span>نظرة عامة</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="profile"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 h-14"
                    >
                      <UserCircle className="w-4 h-4 mr-2" />
                      <span>الملف الشخصي</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="badges"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 h-14"
                    >
                      <Medal className="w-4 h-4 mr-2" />
                      <span>الشارات والإنجازات</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="training"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 h-14"
                    >
                      <Dumbbell className="w-4 h-4 mr-2" />
                      <span>خطة التدريب</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="analyses"
                      className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 h-14"
                    >
                      <BarChart2 className="w-4 h-4 mr-2" />
                      <span>التحليلات</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
              </div>
              
              <div className="p-4">
                <TabsContent value="overview">
                  <OverviewTab userProfile={userProfile} />
                </TabsContent>
                <TabsContent value="profile">
                  <ProfileTab userProfile={userProfile} onSignOut={handleSignOut} />
                </TabsContent>
                <TabsContent value="badges">
                  <BadgesTab badges={userProfile.badges} />
                </TabsContent>
                <TabsContent value="training">
                  <TrainingTab trainingVideos={trainingVideos} />
                </TabsContent>
                <TabsContent value="analyses">
                  <AnalysesTab analyses={analyses} />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Dashboard;
