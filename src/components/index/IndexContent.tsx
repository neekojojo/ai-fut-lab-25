import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import VideoUpload from '../VideoUpload';
import { ANALYSIS_STAGES } from '@/utils/analysis/constants';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, FileVideo, Sparkles, BarChart3, Medal, CalendarCheck, Globe, ChevronRight, Trophy, Target } from 'lucide-react';
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

// استبدال صور اللاعبين بتأثيرات بصرية
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
            <li>تحديد مواقع اللاعبين في كل إطار</li>
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
            <li>تقرير شامل عن أداء اللاعب الفني والبدني</li>
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
            <li>بيانات أداء من أكثر من 10,000 لاعب محترف</li>
            <li>تغطية للبطولات والدوريات العالمية الكبرى</li>
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
            <li>تحسن الأداء البدني والفسيولوجي</li>
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
    },
    6: {
      title: "التكامل مع الأنظمة الخارجية",
      content: (
        <div className="space-y-4">
          <p>التكامل مع الأنظمة الخارجية يمثل المرحلة المتقدمة من تطوير النظام، حيث يتم ربط تحليلاتنا مع منظومات عالمية للاستفادة القصوى من البيانات.</p>
          
          <h3 className="text-lg font-semibold mt-4">التكامل مع أنظمة الاتحاد الدولي</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>ربط مع منظومة FIFA للمواهب الشابة</li>
            <li>تبادل البيانات مع أنظمة الاتحادات القارية</li>
            <li>المشاركة في برامج تطوير المواهب العالمية</li>
            <li>الاستفادة من معايير التقييم المعتمدة دولياً</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">التكامل مع الأندية والأكاديميات</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>واجهات برمجية للتكامل مع أنظمة الأندية</li>
            <li>مشاركة التقارير والتحليلات مع الجهاز الفني</li>
            <li>دمج البيانات مع منظومات التدريب</li>
            <li>تسهيل عمليات الكشف عن المواهب</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">تكامل البيانات</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>استيراد بيانات من منصات التحليل العالمية</li>
            <li>تكامل مع بيانات GPS وأنظمة القياس المتقدمة</li>
            <li>ربط مع السجلات الطبية والفسيولوجية</li>
            <li>تحليلات متقاطعة مع بيانات المنافسات المختلفة</li>
          </ul>
          
          <h3 className="text-lg font-semibold mt-4">الفوائد والمخرجات</h3>
          <ul className="list-disc list-inside space-y-2 pr-4">
            <li>رؤية شاملة لأداء اللاعب من مصادر متعددة</li>
            <li>تعزيز فرص اكتشاف اللاعب من قبل المراقبين الدوليين</li>
            <li>توحيد معايير التقييم مع المستويات العالمية</li>
            <li>تسهيل انتقال اللاعبين للأندية الاحترافية</li>
            <li>المساهمة في تطوير منظومة كرة القدم المحلية والعالمية</li>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="z-10">
            <div className="max-w-3xl mx-auto text-center md:text-left space-y-3 md:space-y-4 animate-fade-in">
              <div className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
                تحليل بالذكاء الاصطناعي
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-primary/80">
                FUT LAB Analyzer
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                <span className="text-primary font-semibold">تحليل</span> أداء لاعبي كرة القدم وتقييم المواهب بالذكاء الاصطناعي
              </p>
            </div>
            
            <div className="mt-8 md:hidden">
              {/* استبدال معرض الصور بتأثيرات بصرية */}
              <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-xl h-48">
                <div className="absolute inset-0 bg-primary/10 rounded-xl blur-3xl -z-10 animate-pulse opacity-70"></div>
                {VISUAL_EFFECTS.map((effect) => (
                  <div 
                    key={effect.id} 
                    className={`absolute inset-0 bg-gradient-to-r ${effect.color} opacity-70 animate-float`} 
                    style={{ animationDelay: `${effect.id * 2}s` }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Trophy className="h-16 w-16 text-primary/70 animate-float" />
                </div>
              </div>
            </div>
            
            {!videoFile && (
              <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center md:justify-start">
                <VideoUpload onUpload={handleFileSelected} />
                
                <button 
                  onClick={handleTogglePeopleDetection}
                  className="mt-4 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors backdrop-blur-sm"
                >
                  تجربة كشف اللاعبين
                </button>
              </div>
            )}
          </div>
          
          <div className="hidden md:block relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl h-64">
              {/* استبدال معرض الصور بتأثيرات بصرية */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 w-24 bg-primary/20 rounded-lg backdrop-blur-md animate-float"></div>
                  <div className="h-24 w-24 bg-secondary/20 rounded-lg backdrop-blur-md animate-float" style={{ animationDelay: '1s' }}></div>
                  <div className="h-24 w-24 bg-accent/20 rounded-lg backdrop-blur-md animate-float" style={{ animationDelay: '2s' }}></div>
                  <div className="h-24 w-24 bg-primary/20 rounded-lg backdrop-blur-md animate-float" style={{ animationDelay: '3s' }}></div>
                </div>
              </div>
            </div>
            
            <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 z-0">
              <FloatingElements playerSilhouetteSrc="" />
            </div>
          </div>
        </div>
      </div>
      
      {!videoFile ? (
        <>
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
                  
                  <StageCard
                    number={6}
                    title="التكامل مع الأنظمة الخارجية"
                    description="ربط مع أنظمة FIFA وتحسين الأداء"
                    icon={<Globe className="h-8 w-8 text-primary" />}
                    onReadMore={() => handleOpenStageArticle(6)}
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
