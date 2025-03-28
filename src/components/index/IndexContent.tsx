
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VideoUpload from '../VideoUpload';
import { ANALYSIS_STAGES } from '@/utils/analysis/constants';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, FileVideo, Sparkles, BarChart3, Medal, CalendarCheck, Globe } from 'lucide-react';

export interface FileWithPreview extends File {
  preview: string;
}

const IndexContent: React.FC = () => {
  const [videoFile, setVideoFile] = useState<FileWithPreview | null>(null);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('بدء تحليل الفيديو');
  const { toast } = useToast();

  const handleFileSelected = (file: FileWithPreview) => {
    setVideoFile(file);
  };

  const handleStartAnalysis = () => {
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
    
    // Simulate progressive updates for better UX
    simulateAnalysisProgress();
  };

  const simulateAnalysisProgress = () => {
    // Set up multiple intervals to create a more natural progression pattern
    const initialInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newValue = prev + (Math.random() * 2 + 1); // 1-3% increment
        if (newValue >= 30) {
          clearInterval(initialInterval);
          setAnalysisStage('استخراج معلومات اللاعب');
          return 30;
        }
        return newValue;
      });
    }, 3000);
    
    // Second phase of analysis
    setTimeout(() => {
      const secondInterval = setInterval(() => {
        setAnalysisProgress(prev => {
          const newValue = prev + (Math.random() * 1.5 + 0.5); // 0.5-2% increment
          if (newValue >= 60) {
            clearInterval(secondInterval);
            setAnalysisStage('تحليل المهارات والحركة');
            return 60;
          }
          return newValue;
        });
      }, 4000);
      
      // Third phase
      setTimeout(() => {
        const thirdInterval = setInterval(() => {
          setAnalysisProgress(prev => {
            const newValue = prev + (Math.random() * 1 + 0.2); // 0.2-1.2% increment
            if (newValue >= 85) {
              clearInterval(thirdInterval);
              setAnalysisStage('إنشاء تقرير التحليل');
              return 85;
            }
            return newValue;
          });
        }, 5000);
        
        // Final phase - Integration with external systems
        setTimeout(() => {
          const finalInterval = setInterval(() => {
            setAnalysisProgress(prev => {
              const newValue = prev + (Math.random() * 0.8 + 0.2); // 0.2-1% increment
              if (newValue >= 98) {
                clearInterval(finalInterval);
                setAnalysisStage('تكامل مع الأنظمة الخارجية');
                
                // Ensure we complete the analysis
                setTimeout(() => {
                  setAnalysisProgress(100);
                  setAnalysisStage('اكتمل التحليل');
                }, 3000);
                
                return 98;
              }
              return newValue;
            });
          }, 4000);
        }, 20000); // Start final phase after ~20 seconds
        
      }, 40000); // Start third phase after ~40 seconds
      
    }, 20000); // Start second phase after ~20 seconds
  };

  const handleAnalysisComplete = () => {
    toast({
      title: "اكتمل التحليل",
      description: "تحليل فيديو كرة القدم الخاص بك جاهز",
    });
    window.location.href = '/dashboard';
  };

  const handleResetAnalysis = () => {
    setVideoFile(null);
    setAnalysisStarted(false);
    setAnalysisProgress(0);
  };

  if (analysisStarted) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <AnalysisProcessing 
          progress={analysisProgress} 
          stage={analysisStage} 
          onReset={handleResetAnalysis}
          onAnalysisComplete={handleAnalysisComplete}
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

// Import the correct component types
import AnalysisProcessing from './analysis-processing/AnalysisProcessing';
import AnalysisOptions from '@/components/analysis/ModelSelection';

export default IndexContent;
