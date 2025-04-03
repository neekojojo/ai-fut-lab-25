import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import VideoUpload from '../VideoUpload';
import { ANALYSIS_STAGES } from '@/utils/analysis/constants';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, FileVideo, Sparkles, BarChart3, Medal, CalendarCheck, ChevronRight, Target, Trophy, Glasses } from 'lucide-react';
import AnalysisProcessing from './analysis-processing/AnalysisProcessing';
import AnalysisOptions from '@/components/analysis/ModelSelection';
import { analyzeFootballVideo } from '@/utils/analysis';
import AnalysisResults from '@/components/analysis/AnalysisResults';
import FeaturesSection from '@/components/features/FeaturesSection';
import PeopleDetection from '@/components/PeopleDetection';
import SubscriptionPlans from '@/components/subscription/SubscriptionPlans';
import FloatingElements from '@/components/landing/FloatingElements';
import type { PlayerAnalysis } from '@/components/AnalysisReport.d';
import type { FileWithPreview } from '@/types';

interface StageArticle {
  title: string;
  content: React.ReactNode;
}

const VISUAL_EFFECTS = [
  { id: 1, color: "from-primary/20 to-secondary/20" },
  { id: 2, color: "from-secondary/20 to-primary/20" },
  { id: 3, color: "from-accent/20 to-primary/20" },
];

const IndexContent: React.FC = () => {
  const [videoFile, setVideoFile] = useState<FileWithPreview | null>(null);
  const [analysisStarted, setAnalysisStarted] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState('بدء تحليل الفيديو');
  const [analysisCompleted, setAnalysisCompleted] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<PlayerAnalysis | null>(null);
  const [showPeopleDetection, setShowPeopleDetection] = useState(false);
  const [openStageArticle, setOpenStageArticle] = useState<number | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const stageArticles: Record<number, StageArticle> = {
    1: {
      title: "اكتشاف اللاعبين والتعرف عليهم",
      content: (
        <div className="space-y-4">
          <p>تعتبر تقنية اكتشاف اللاعبين والتعرف عليهم المرحلة الأساسية في تحليل أداء لاعبي كرة القدم، حيث تعتمد عليها جميع التحليلات اللاحقة.</p>
          
          <h3 className="text-lg font-semibold mt-4">التقنيات المستخدمة</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>خوارزميات التعلم العميق للكشف عن الأشخاص (YOLO)</li>
            <li>تقنية تتبع الهيكل العظمي (Pose Estimation)</li>
            <li>تقنيات التعرف على الوجه والزي الرياضي</li>
            <li>نماذج مدربة على آلاف مباريات كرة القدم</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">كيفية العمل</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>التقاط الفيديو وتقسيمه إلى إطارات</li>
            <li>تحديد مواقع اللاعبين ���ي كل إطار</li>
            <li>تصنيف اللاعبين حسب الفريق</li>
            <li>إنشاء نظام تتبع فريد لكل لاعب</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">التحديات</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>تداخل اللاعبين أثناء اللعب</li>
            <li>التغيرات في الإضاءة والظروف الجوية</li>
            <li>سرعة حركة اللاعبين وتغير وضعياتهم</li>
            <li>اختلاف زوايا التصوير وجودة الفيديو</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">الميزات المتقدمة</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>التعرف الدقيق على اللاعبين حتى عند تغيير الكاميرات</li>
            <li>تتبع اللاعبين في حالات الازدحام والتداخل</li>
            <li>تقديرات دقيقة لموقع اللاعب حتى عندما يكون مخفياً جزئياً</li>
            <li>دقة تصل إلى 95% في الظروف المثالية</li>
          </ul>
        </div>
      )
    },
    2: {
      title: "تحليل الحركة والأداء",
      content: (
        <div className="space-y-4">
          <p>بعد التعرف على اللاعبين وتتبعهم، تأتي مرحلة تحليل حركتهم وأدائهم التي تعد ركيزة أساسية في فهم قدرات اللاعب.</p>
          
          <h3 className="text-lg font-semibold mt-4">المؤشرات المقاسة</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>السرعة القصوى والمتوسطة للاعب</li>
            <li>المسافة المقطوعة خلال المباراة</li>
            <li>معدلات التسارع والتباطؤ</li>
            <li>أنماط الجري والحركة</li>
            <li>تحليل المواقف المختلفة (دفاع، هجوم، انتقال)</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">التحليل الإحصائي</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>إحصائيات التمريرات (الدقة، النوع، المسافة)</li>
            <li>الاستحواذ والمراوغات</li>
            <li>التسديدات والفرص</li>
            <li>الأداء الدفاعي (الاعتراضات، التدخلات)</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">تقنيات التحليل</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>خرائط حرارية لمناطق تواجد اللاعب</li>
            <li>مقارنة الأداء مع معايير محددة</li>
            <li>تحليل الفروقات بين الشوطين</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">مخرجات التحليل</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>تق����ر شامل عن أداء ال��اعب الفني والبدني</li>
            <li>تحديد نقاط القوة ومجالات التحسين</li>
            <li>مؤشرات اللياقة البدنية والتعب</li>
            <li>أنماط اللعب المفضلة للاعب</li>
          </ul>
        </div>
      )
    },
    3: {
      title: "التقييم المتقدم للمهارات",
      content: (
        <div className="space-y-4">
          <p>المرحلة الثالثة هي التقييم المتقدم لمهارات اللاعب، حيث يتم تحليل الجوانب الفنية والتكتيكية بشكل أكثر تعمقاً.</p>
          
          <h3 className="text-lg font-semibold mt-4">جوانب التقييم</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>المهارات الفنية (التحكم بالكرة، التمرير، التسديد)</li>
            <li>الذكاء التكتيكي وقراءة اللعب</li>
            <li>اتخاذ القرار تحت الضغط</li>
            <li>القدرة على التكيف مع مواقف اللعب المختلفة</li>
            <li>الأداء الفردي ضمن المنظومة الجماعية</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">منهجية التقييم</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>تحليل مقاطع فيديو محددة لأداء اللاعب</li>
            <li>استخدام مؤشرات أداء رئيسية (KPIs)</li>
            <li>تقييم على مقياس من 1-100 لكل مهارة</li>
            <li>تحليل الثبات في الأداء عبر المباريات المختلفة</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">التقنيات المستخدمة</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>الذكاء الاصطناعي المدرب على تحليل المهارات الفنية</li>
            <li>نماذج تعلم آلي مخصصة لكل موقع في الملعب</li>
            <li>محاكاة وتحليل السيناريوهات المختلفة</li>
            <li>مقارنة نماذج أداء مع لاعبين محترفين</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">النتائج والمخرجات</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>بطاقة تقييم مهارات شاملة</li>
            <li>تحديد المهارات الاستثنائية ونقاط التميز</li>
            <li>مجالات التحسين الفني والتكتيكي</li>
            <li>توصيات تدريبية محددة للارتقاء بالمستوى</li>
          </ul>
        </div>
      )
    },
    4: {
      title: "مقارنة النتائج مع لاعبين محترفين",
      content: (
        <div className="space-y-4">
          <p>تعتبر مقارنة نتائج اللاعب مع اللاعبين المحترفين من أهم الخطوات في تقييم المستوى الحقيقي والإمكانيات المستقبلية.</p>
          
          <h3 className="text-lg font-semibold mt-4">قاعدة بيانات المقارنة</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>بيانات أداء أكثر من 50 لاعب محترف</li>
            <li>مجموعات بيانات مقسمة حسب الفئة العمرية والمستوى</li>
            <li>تحديث البيانات بشكل دوري</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">آلية المقارنة</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>مقارنة مع المتوسطات العامة للاعبي النخبة</li>
            <li>مقارنة مع لاعبين محددين في نفس المركز</li>
            <li>تحليل الفجوات في المؤشرات المختلفة</li>
            <li>تقدير الإمكانيات المستقبلية بناءً على منحنيات التطور</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">المعايير المستخدمة</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>المؤشرات البدنية (السرعة، القوة، التحمل)</li>
            <li>المؤشرات الفنية (المهارات الأساسية والمتقدمة)</li>
            <li>المؤشرات التكتيكية (الذكاء الكروي، قراءة اللعب)</li>
            <li>المؤشرات النفسية (التركيز، الثبات الانفعالي)</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">الفوائد والمخرجات</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>تحديد المستوى الحالي بالنسبة للمعايير العالمية</li>
            <li>اكتشاف الجوانب التي تضاهي مستويات النخبة</li>
            <li>توضيح الفجوات التي تتطلب عملاً مكثفاً</li>
            <li>وضع أهداف واقعية للوصول لمستويات متقدمة</li>
          </ul>
        </div>
      )
    },
    5: {
      title: "تتبع التقدم مع مرور الوقت",
      content: (
        <div className="space-y-4">
          <p>تتبع التقدم مع مرور الوقت يعد أمراً حيوياً لضمان التطور المستمر وتحقيق الأهداف المرجوة في مسيرة اللاعب.</p>
          
          <h3 className="text-lg font-semibold mt-4">آلية المتابعة</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>تحليلات دورية (أسبوعية، شهرية، موسمية)</li>
            <li>مقارنة النتائج مع الفترات السابقة</li>
            <li>مراقبة مناطق التحسن والتراجع</li>
            <li>تعديل الخطط التدريبية بناءً على النتائج</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">المؤشرات المتابعة</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>التطور في المهارات الفنية المستهدفة</li>
            <li>تحسن الأداء البدني و���لفسيولوجي</li>
            <li>التقدم في الجوانب التكتيكية والذهنية</li>
            <li>مؤشرات الأداء خلال المباريات الرسمية</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">أدوات التحليل</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>رسوم بيانية توضح منحنى التطور</li>
            <li>تقارير مقارنة تفصيلية</li>
            <li>مؤشرات إحصائية للتغير عبر الزمن</li>
            <li>تنبؤات مستقبلية بناءً على معدلات التطور</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">الفوائد والمخرجات</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>تحفيز اللاعب من خلال رؤية التقدم الملموس</li>
            <li>تعديل الأهداف بشكل واقعي</li>
            <li>اكتشاف مبكر لأي تراجع في المستوى</li>
            <li>توثيق المسيرة التطويرية للاعب</li>
            <li>تقييم فعالية البرامج التدريبية المطبقة</li>
          </ul>
        </div>
      )
    }
  };

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

  const handleOpenStageArticle = (stageNumber: number) => {
    setOpenStageArticle(stageNumber);
  };

  const handleCloseStageArticle = () => {
    setOpenStageArticle(null);
  };

  const goToARExperience = () => {
    navigate('/ar-experience');
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
        <div className="text-center space-y-3 md:space-y-4 animate-fade-in">
          <div className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
            تحليل بالذكاء الاصطناعي
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary/80">
            FUT LAB Analyzer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span className="text-primary font-semibold">تحليل</span> أداء لاعبي كرة القدم وتقييم المواهب بالذكاء الاصطناعي
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative w-32 h-32 flex justify-center items-center">
            <div className="absolute inset-0 bg-primary/10 rounded-xl blur-3xl -z-10 animate-pulse opacity-70"></div>
            {VISUAL_EFFECTS.map((effect) => (
              <div 
                key={effect.id} 
                className={`absolute inset-0 bg-gradient-to-r ${effect.color} opacity-70 animate-float`} 
                style={{ animationDelay: `${effect.id * 2}s` }}
              />
            ))}
            <div className="absolute inset-0 flex items-center justify-center">
              <Trophy className="h-20 w-20 text-yellow-500 animate-float" />
            </div>
          </div>
          <p className="text-lg font-semibold text-primary">Play football like a pro</p>
          
          {!videoFile && (
            <div className="flex flex-col items-center gap-4">
              <VideoUpload onUpload={handleFileSelected} />
              
              <div className="flex flex-wrap gap-4 justify-center mt-4">
                <button 
                  onClick={handleTogglePeopleDetection}
                  className="px-8 py-3 font-medium text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors backdrop-blur-sm"
                >
                  تجربة كشف اللاعبين
                </button>
                
                <button 
                  onClick={goToARExperience}
                  className="px-8 py-3 font-medium text-white border border-primary bg-primary rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                >
                  <Glasses className="h-5 w-5" />
                  تجربة الواقع المعزز
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {!videoFile ? (
        <>
          <div className="mt-12 mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">تجربة الواقع المعزز</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                استمتع بتجربة تدريب كرة القدم المبتكرة باستخدام تقنية الواقع المعزز
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-primary/10 hover:border-primary/40 transition-all duration-500">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>التدريب الافتراضي</CardTitle>
                  <CardDescription>تدرب على مهاراتك الكروية باستخدام الملاعب والأهداف الافتراضية</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 pr-4">
                    <li>تحديات تمرير دقيقة</li>
                    <li>تدريبات مراوغة متقدمة</li>
                    <li>تسديد على أهداف متحركة</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button onClick={goToARExperience} className="w-full">تجربة الآن</Button>
                </CardFooter>
              </Card>
              
              <Card className="border-primary/10 hover:border-primary/40 transition-all duration-500">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <FileVideo className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>الملعب الافتراضي</CardTitle>
                  <CardDescription>استخدم كاميرا هاتفك لتجربة ملعب كرة قدم في محيطك الحقيقي</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 pr-4">
                    <li>ملعب ثلاثي الأبعاد كامل</li>
                    <li>مرمى وخطوط ملعب افتراضية</li>
                    <li>كرة تفاعلية للتدريب</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button onClick={goToARExperience} className="w-full">تجربة الآن</Button>
                </CardFooter>
              </Card>
              
              <Card className="border-primary/10 hover:border-primary/40 transition-all duration-500">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <Medal className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>تحديات المهارات</CardTitle>
                  <CardDescription>اختبر مهاراتك مع تحديات مختلفة بدرجات صعوبة متنوعة</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 pr-4">
                    <li>تتبع تقدمك في كل تحدي</li>
                    <li>مستويات صعوبة متدرجة</li>
                    <li>تحسين دقة وسرعة اللعب</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button onClick={goToARExperience} className="w-full">تجربة الآن</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
          
          <FeaturesSection />
          <SubscriptionPlans />
          
          <div className="mt-12 relative z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl -z-10 transform rotate-1 scale-105"></div>
            <Card className="border-0 bg-background/40 backdrop-blur-md shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">مراحل تطوير تطبيق تحليل أداء لاعبي كرة القدم</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StageCard
                    number={1}
                    title="اكتشاف اللاعبين والتعرف عليهم"
                    description="تحديد وتتبع اللاعبين في الفيديو"
                    icon={<FileVideo className="h-8 w-8 text-primary" />}
                    onReadMore={() => handleOpenStageArticle(1)}
                  />
                  
                  <StageCard
                    number={2}
                    title="تحليل الحركة والأداء"
                    description="تحليل أنماط الحركة والإحصاءات الفنية"
                    icon={<BarChart3 className="h-8 w-8 text-primary" />}
                    onReadMore={() => handleOpenStageArticle(2)}
                  />
                  
                  <StageCard
                    number={3}
                    title="التقييم المتقدم للمهارات"
                    description="تقييم شامل للمهارات الفنية والتكتيكية"
                    icon={<Sparkles className="h-8 w-8 text-primary" />}
                    onReadMore={() => handleOpenStageArticle(3)}
                  />
                  
                  <StageCard
                    number={4}
                    title="مقارنة النتائج مع لاعبين محترفين"
                    description="مقارنة المؤشرات مع معايير اللاعبين المحترفين"
                    icon={<Medal className="h-8 w-8 text-primary" />}
                    onReadMore={() => handleOpenStageArticle(4)}
                  />
                  
                  <StageCard
                    number={5}
                    title="تتبع التقدم مع مرور الوقت"
                    description="تحليل التطور وتحديد مجالات التحسين"
                    icon={<CalendarCheck className="h-8 w-8 text-primary" />}
                    onReadMore={() => handleOpenStageArticle(5)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <AnalysisOptions
          videoFile={videoFile}
          onSelectModel={() => {}}
          onAnalyzeWithAI={handleStartAnalysis}
        />
      )}

      <Dialog open={!!openStageArticle} onOpenChange={handleCloseStageArticle}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          {openStageArticle && stageArticles[openStageArticle] && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60">
                  {stageArticles[openStageArticle].title}
                </DialogTitle>
              </DialogHeader>
              <DialogDescription className="text-foreground">
                {stageArticles[openStageArticle].content}
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface StageCardProps {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
  onReadMore?: () => void;
}

const StageCard: React.FC<StageCardProps> = ({ number, title, description, icon, action, onReadMore }) => {
  return (
    <Card className="border-primary/10 hover:border-primary/30 transition-all duration-500 group h-full bg-background/60 backdrop-blur-sm hover:bg-background/80">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors duration-500">
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
      {(action || onReadMore) && (
        <CardFooter>
          {action}
          {onReadMore && (
            <Button 
              variant="ghost" 
              className="text-primary hover:text-primary/80 hover:bg-primary/10 p-2 h-auto"
              onClick={onReadMore}
            >
              قراءة المزيد <ChevronRight className="mr-1 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default IndexContent;
