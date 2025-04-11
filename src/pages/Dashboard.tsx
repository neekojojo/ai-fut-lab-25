
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileVideo, LineChart, BarChart, Activity, Medal, Target } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/layout/Footer';
import OverviewTab from '@/components/dashboard/tabs/OverviewTab';
import VideoUpload from '@/components/VideoUpload';
import ModelSelection from '@/components/analysis/ModelSelection';
import { useToast } from '@/hooks/use-toast';
import { getPlayerStats, getMockAnalysis } from '@/components/player-analysis/mockData';
import type { FileWithPreview } from '@/types/files';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [videoFile, setVideoFile] = useState<FileWithPreview | null>(null);
  const [showModelSelection, setShowModelSelection] = useState(false);
  const [selectedModel, setSelectedModel] = useState<'google-automl' | 'kaggle-datasets' | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Mock user profile data
  const userProfile = {
    name: 'عبدالله محمد',
    level: 'محترف',
    position: 'وسط',
    performanceScore: 82,
    improvementRate: 12,
    analyses: [
      { id: '1', date: '2025-04-08', score: 78 },
      { id: '2', date: '2025-04-01', score: 75 },
      { id: '3', date: '2025-03-25', score: 72 }
    ]
  };
  
  // Mock training videos
  const trainingVideos = [
    { id: '1', title: 'تدريبات تحسين تمرير الكرة', duration: '15:20', level: 'متقدم' },
    { id: '2', title: 'تمارين السرعة والتسارع', duration: '12:45', level: 'متوسط' },
    { id: '3', title: 'تدريبات الدقة في التسديد', duration: '18:30', level: 'متقدم' }
  ];
  
  const handleFileSelected = (file: FileWithPreview) => {
    setVideoFile(file);
    setShowModelSelection(true);
    
    toast({
      title: "تم رفع الفيديو بنجاح",
      description: "يمكنك الآن اختيار نموذج التحليل المناسب",
    });
  };
  
  const handleSelectModel = (model: 'google-automl' | 'kaggle-datasets') => {
    setSelectedModel(model);
    
    toast({
      title: "تم اختيار النموذج",
      description: `تم اختيار نموذج ${model === 'google-automl' ? 'Google AutoML' : 'Kaggle Datasets'}`,
    });
  };
  
  const handleAnalyzeWithAI = () => {
    toast({
      title: "جاري تحليل الفيديو",
      description: "سيتم تحويلك إلى صفحة التحليل",
    });
    
    // Redirect to homepage (will show analysis progress)
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">لوحة التحكم</h1>
            <p className="text-muted-foreground">مرحباً بك في منصة تحليل كرة القدم بالذكاء الاصطناعي</p>
          </div>
          <Button className="flex items-center gap-2" onClick={() => navigate('/')}>
            <FileVideo className="h-4 w-4" />
            <span>تحليل فيديو جديد</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">التقييم العام</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="flex items-center">
                  <Medal className="h-5 w-5 text-primary mr-2" />
                  <div className="text-2xl font-bold">{userProfile.performanceScore}/100</div>
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">+{userProfile.improvementRate}%</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">المهارات الفنية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="flex items-center">
                  <LineChart className="h-5 w-5 text-blue-500 mr-2" />
                  <div className="text-2xl font-bold">84</div>
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">+6%</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">القدرات البدنية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="flex items-center">
                  <Activity className="h-5 w-5 text-green-500 mr-2" />
                  <div className="text-2xl font-bold">78</div>
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">+8%</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">الذكاء التكتيكي</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-purple-500 mr-2" />
                  <div className="text-2xl font-bold">80</div>
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">+4%</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="upload">تحليل فيديو جديد</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <OverviewTab userProfile={userProfile} trainingVideos={trainingVideos} />
          </TabsContent>
          
          <TabsContent value="upload">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>رفع فيديو للتحليل</CardTitle>
                  <CardDescription>قم برفع فيديو لأداء اللاعب لتحليله باستخدام الذكاء الاصطناعي</CardDescription>
                </CardHeader>
                <CardContent>
                  <VideoUpload onFileSelected={handleFileSelected} selectedFile={videoFile} />
                </CardContent>
              </Card>
              
              {showModelSelection && (
                <ModelSelection 
                  videoFile={videoFile!} 
                  onSelectModel={handleSelectModel} 
                  onAnalyzeWithAI={handleAnalyzeWithAI} 
                />
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
