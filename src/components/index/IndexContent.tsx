import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VideoUpload from '../VideoUpload';
import { ANALYSIS_STAGES } from '@/utils/analysis/constants';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, FileVideo, Sparkles, BarChart3, Medal, CalendarCheck, Globe } from 'lucide-react';
import AnalysisProcessing from './analysis-processing/AnalysisProcessing';
import AnalysisOptions from '@/components/analysis/ModelSelection';
import { analyzeFootballVideo } from '@/utils/analysis';
import AnalysisResults from '@/components/analysis/AnalysisResults';
import FeaturesSection from '@/components/features/FeaturesSection';
import PeopleDetection from '@/components/PeopleDetection';
import type { PlayerAnalysis } from '@/components/AnalysisReport.d';
import type { FileWithPreview } from '@/types';

const IndexContent: React.FC = () => {
  const [videoFile, setVideoFile] = useState<FileWithPreview | null>(null);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('بدء تحليل الفيديو');
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PlayerAnalysis | null>(null);
  const [showPeopleDetection, setShowPeopleDetection] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileSelected = (file: FileWithPreview) => {
    setVideoFile(file);
  };

  const handleStartAnalysis = async () => {
    if (!videoFile) {
      toast({
        title: "لم يتم اختيار فيديو",
        description: "الرجاء تحميل ملف فيديو للمتابعة",
        variant: "destructive",
      });
      return;
    }

    setAnalysisStarted(true);
    setAnalysisProgress(5);
    setAnalysisStage('بدء تحليل الفيديو');
    
    toast({
      title: "بدأ التحليل",
      description: "جاري تحليل فيديو كرة القدم الخاص بك",
    });
    
    try {
      const analysisData = await analyzeFootballVideo(videoFile);
      
      analysisData.progressUpdates((progress, stage) => {
        setAnalysisProgress(progress);
        if (stage) {
          setAnalysisStage(stage);
        }
        
        if (progress >= 100) {
          setTimeout(() => {
            setAnalysisCompleted(true);
            setAnalysisResult(analysisData.analysis);
            
            toast({
              title: "اكتمل التحليل",
              description: "تحليل فيديو كرة القدم الخاص بك جاهز",
            });
          }, 1500);
        }
      });
    } catch (error) {
      console.error("Error analyzing video:", error);
      toast({
        title: "خطأ في التحليل",
        description: "حدث خطأ أثناء تحليل الفيديو",
        variant: "destructive",
      });
      handleResetAnalysis();
    }
  };

  const handleResetAnalysis = () => {
    setVideoFile(null);
    setAnalysisStarted(false);
    setAnalysisProgress(0);
    setAnalysisCompleted(false);
    setAnalysisResult(null);
    setShowPeopleDetection(false);
  };

  const handleAdvancedAnalysis = () => {
    console.log("Opening advanced analysis view");
    if (analysisResult) {
      navigate(`/advanced-analysis/${analysisResult.id}`);
      
      toast({
        title: "فتح التحليل المتقدم",
        description: "جاري فتح التحليل المتقدم للاعب",
      });
    }
  };

  const handleTogglePeopleDetection = () => {
    setShowPeopleDetection(!showPeopleDetection);
    
    if (!showPeopleDetection) {
      toast({
        title: "تم فتح أداة اكتشاف اللاعبين",
        description: "يمكنك الآن تحليل الفيديو باستخدام خوارزميات متعددة",
      });
    }
  };

  if (showPeopleDetection) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => setShowPeopleDetection(false)} 
            className="mb-4"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة للصفحة الرئيسية
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">أداة اكتشاف اللاعبين</h1>
          <p className="text-muted-foreground">
            تحليل الفيديو باستخدام خوارزميات TensorFlow و YOLOv8 و OpenPose
          </p>
        </div>
        
        <PeopleDetection />
      </div>
    );
  }

  if (analysisCompleted && analysisResult) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <AnalysisResults 
          analysis={analysisResult}
          onResetAnalysis={handleResetAnalysis}
          onAdvancedAnalysis={handleAdvancedAnalysis}
        />
      </div>
    );
  }

  if (analysisStarted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <AnalysisProcessing 
          progress={analysisProgress} 
          stage={analysisStage} 
          onReset={handleResetAnalysis}
          onAnalysisComplete={() => {
            if (analysisResult) {
              setAnalysisCompleted(true);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8 md:space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-3 md:space-y-4 animate-fade-in">
          <div className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
            تحليل بالذكاء الاصطناعي
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            FUT LAB Analyzer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span className="text-primary font-semibold">تحليل</span> أداء لاعبي كرة القدم وتقييم المواهب بالذكاء الاصطناعي
          </p>
        </div>
      </div>
      
      <FeaturesSection />
      
      {!videoFile ? (
        <>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <VideoUpload onUpload={handleFileSelected} />
            
            <button 
              onClick={handleTogglePeopleDetection}
              className="mt-4 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors"
            >
              تجربة كشف اللاعبين
            </button>
          </div>
          
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
                description="ربط مع أنظمة FIFA وتحسين الأداء"
                icon={<Globe className="h-8 w-8 text-primary" />}
              />
            </div>
          </div>
        </>
      ) : (
        <AnalysisOptions
          videoFile={videoFile}
          onSelectModel={() => {}}
          onAnalyzeWithAI={handleStartAnalysis}
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
