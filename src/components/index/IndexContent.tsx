
import React, { useState } from 'react';
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
import type { PlayerAnalysis } from '@/components/AnalysisReport.d';
import type { FileWithPreview } from '@/types';

const IndexContent: React.FC = () => {
  const [videoFile, setVideoFile] = useState<FileWithPreview | null>(null);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('بدء تحليل الفيديو');
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PlayerAnalysis | null>(null);
  const { toast } = useToast();

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
    setAnalysisProgress(5); // Start at 5% instead of 0%
    setAnalysisStage('بدء تحليل الفيديو');
    
    toast({
      title: "بدأ التحليل",
      description: "جاري تحليل فيديو كرة القدم الخاص بك",
    });
    
    try {
      // Begin analysis and register progress callback
      const analysisData = await analyzeFootballVideo(videoFile);
      
      // Register the progress updates callback
      analysisData.progressUpdates((progress, stage) => {
        setAnalysisProgress(progress);
        if (stage) {
          setAnalysisStage(stage);
        }
        
        // When analysis reaches 100%, set completed state after a short delay
        if (progress >= 100) {
          setTimeout(() => {
            setAnalysisCompleted(true);
            setAnalysisResult(analysisData.analysis);
            
            toast({
              title: "اكتمل التحليل",
              description: "تحليل فيديو كرة القدم الخاص بك جاهز",
            });
          }, 1500); // Give a small delay for better UX
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
  };

  const handleAdvancedAnalysis = () => {
    // Implement advanced analysis view here
    console.log("Opening advanced analysis view");
  };

  // Render analysis results if analysis has completed
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

  // Render analysis processing screen if analysis has started
  if (analysisStarted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <AnalysisProcessing 
          progress={analysisProgress} 
          stage={analysisStage} 
          onReset={handleResetAnalysis}
          onAnalysisComplete={() => {
            // This function is called when the processing component detects analysis completion
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
      {/* Simplified hero content that doesn't require props */}
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
      
      {!videoFile ? (
        <>
          <VideoUpload onUpload={handleFileSelected} />
          
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
