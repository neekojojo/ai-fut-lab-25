
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import VideoUpload from '../VideoUpload';
import HeroContent from './HeroContent';
import AnalysisOptions from './AnalysisOptions';
import AnalysisProcessing from './AnalysisProcessing';
import { ANALYSIS_STAGES } from '@/utils/analysis/constants';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, FileVideo, Sparkles, BarChart3, Medal, CalendarCheck, ServerCog } from 'lucide-react';

export interface FileWithPreview extends File {
  preview: string;
}

const IndexContent: React.FC = () => {
  const [videoFile, setVideoFile] = useState<FileWithPreview | null>(null);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileSelected = (file: FileWithPreview) => {
    setVideoFile(file);
  };

  const handleStartAnalysis = () => {
    if (!videoFile) {
      toast({
        title: "No video selected",
        description: "Please upload a video file to continue",
        variant: "destructive",
      });
      return;
    }

    setAnalysisStarted(true);
    toast({
      title: "Analysis started",
      description: "Your football video is being analyzed",
    });
  };

  const handleAnalysisComplete = () => {
    toast({
      title: "Analysis complete",
      description: "Your football video analysis is ready",
    });
    navigate('/dashboard');
  };

  const handleResetAnalysis = () => {
    setVideoFile(null);
    setAnalysisStarted(false);
  };

  const navigateToExternalSystems = () => {
    navigate('/external-systems');
  };

  if (analysisStarted) {
    return (
      <AnalysisProcessing
        videoFile={videoFile}
        onComplete={handleAnalysisComplete}
        onReset={handleResetAnalysis}
        stages={ANALYSIS_STAGES}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <HeroContent />
      
      {!videoFile ? (
        <>
          <VideoUpload onFileSelected={handleFileSelected} />
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-center mb-6">مراحل تطوير تطبيق تحليل أداء لاعبي كرة القدم</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <StageCard
                number={1}
                title="اكتشاف اللاعبين والتعرف عليهم"
                description="تحديد وتتبع اللاعبين في الفيديو"
                icon={<FileVideo className="h-8 w-8 text-primary" />}
              />
              
              <StageCard
                number={2}
                title="تحليل الحركة والأداء"
                description="تحليل أنماط الحركة والإحصاءات الفنية"
                icon={<BarChart3 className="h-8 w-8 text-primary" />}
              />
              
              <StageCard
                number={3}
                title="التقييم المتقدم للمهارات"
                description="تقييم شامل للمهارات الفنية والتكتيكية"
                icon={<Sparkles className="h-8 w-8 text-primary" />}
              />
              
              <StageCard
                number={4}
                title="مقارنة النتائج مع لاعبين محترفين"
                description="مقارنة المؤشرات مع معايير اللاعبين المحترفين"
                icon={<Medal className="h-8 w-8 text-primary" />}
              />
              
              <StageCard
                number={5}
                title="تتبع التقدم مع مرور الوقت"
                description="تحليل التطور وتحديد مجالات التحسين"
                icon={<CalendarCheck className="h-8 w-8 text-primary" />}
              />
              
              <StageCard
                number={6}
                title="التكامل مع الأنظمة الخارجية"
                description="ربط مع API خارجية وتحسين الأداء"
                icon={<ServerCog className="h-8 w-8 text-primary" />}
                action={
                  <Button 
                    size="sm" 
                    className="w-full mt-2"
                    onClick={navigateToExternalSystems}
                  >
                    استكشاف <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                }
              />
            </div>
          </div>
        </>
      ) : (
        <AnalysisOptions
          videoFile={videoFile}
          onReset={handleResetAnalysis}
          onAnalyze={handleStartAnalysis}
        />
      )}
    </div>
  );
};

interface StageCardProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
}

const StageCard: React.FC<StageCardProps> = ({ number, title, description, icon, action }) => {
  return (
    <Card className="border-primary/10 hover:border-primary/30 transition-colors h-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="bg-primary/10 p-3 rounded-lg">
            {icon}
          </div>
          <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center font-bold">
            {number}
          </div>
        </div>
        <CardTitle className="mt-2 text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      {action && (
        <CardFooter>
          {action}
        </CardFooter>
      )}
    </Card>
  );
};

export default IndexContent;
