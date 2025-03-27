
import { analyzeFootballVideo } from '@/utils/analysisService';
import { savePlayerAnalysis } from '@/services/playerAnalysisService';
import { User } from '@supabase/supabase-js';
import type { PlayerAnalysis } from '@/components/AnalysisReport.d';

interface ToastFunctions {
  toast: (props: {
    title: string;
    description: string;
    duration?: number;
    variant?: 'default' | 'destructive';
  }) => void;
}

export const analyzeVideo = async (
  videoFile: File,
  setAnalysisState: (state: 'idle' | 'model-selection' | 'processing' | 'complete' | 'detailed-analysis') => void,
  setProgress: (progress: number) => void,
  setStage: (stage: string) => void,
  setAnalysis: (analysis: PlayerAnalysis) => void,
  user: User | null,
  { toast }: ToastFunctions
) => {
  // Skip processing state and directly go to complete
  try {
    const result = await analyzeFootballVideo(videoFile);
    
    // Set progress to 100% right away
    setProgress(100);
    setStage('إنشاء تقرير التحليل النهائي');
    
    // Set analysis result
    setAnalysis(result.analysis);
    
    // Directly set to complete state
    setAnalysisState('complete');
    
    // إذا كان المستخدم مسجل الدخول، قم بتخزين التحليل
    if (user && result.analysis) {
      try {
        await savePlayerAnalysis(result.analysis, user.id);
        toast({
          title: "تم حفظ التحليل",
          description: "تم تخزين تحليل اللاعب في قاعدة البيانات.",
          duration: 3000,
        });
      } catch (error) {
        console.error('Error saving analysis:', error);
        toast({
          title: "خطأ في حفظ التحليل",
          description: "حدث خطأ أثناء تخزين التحليل. يرجى المحاولة مرة أخرى.",
          variant: "destructive",
          duration: 5000,
        });
      }
    } else if (!user && result.analysis) {
      toast({
        title: "لم يتم حفظ التحليل",
        description: "قم بتسجيل الدخول أو إنشاء حساب لحفظ نتائج التحليل.",
        duration: 5000,
      });
    }
    
    toast({
      title: "اكتمل التحليل",
      description: "تقرير أداء اللاعب جاهز للعرض.",
      duration: 5000,
    });
  } catch (error) {
    console.error('Error analyzing video:', error);
    toast({
      title: "فشل التحليل",
      description: "حدث خطأ أثناء تحليل الفيديو الخاص بك. يرجى المحاولة مرة أخرى.",
      variant: "destructive",
      duration: 5000,
    });
    setAnalysisState('idle');
  }
};

const AnalysisService = {
  analyzeVideo
};

export default AnalysisService;
