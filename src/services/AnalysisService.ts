
import { analyzeFootballVideo } from '@/utils/analysis';
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
  try {
    // Set to processing state with initial progress
    setAnalysisState('processing');
    setProgress(0);
    setStage('بدء تحليل الفيديو');
    
    console.log("Starting video analysis...");
    
    // Extract initial video metadata for analysis
    const videoMetadata = await extractVideoMetadata(videoFile);
    console.log("Video metadata extracted:", videoMetadata);
    
    // Update stage to metadata extraction
    setProgress(5);
    setStage('استخراج بيانات الفيديو');
    
    // Start analysis with proper progress tracking
    const result = await analyzeFootballVideo(videoFile);
    
    // Set initial analysis result
    setAnalysis(result.analysis);
    
    // Register for progress updates with detailed stages
    result.progressUpdates((progress, stage) => {
      console.log(`Progress update received: ${progress}%, stage: ${stage}`);
      
      // Always update UI with latest progress
      setProgress(progress);
      setStage(stage);
      
      // When analysis completes, transition to complete state
      if (progress >= 100) {
        setTimeout(() => {
          finishAnalysis(result.analysis, user, toast, setAnalysisState);
        }, 500); // Small delay to ensure UI updates before transition
      }
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

// Extract basic metadata from video file to enhance analysis realism
const extractVideoMetadata = (videoFile: File): Promise<{
  duration: number;
  width: number;
  height: number;
  frameRate: number;
}> => {
  return new Promise((resolve, reject) => {
    // Create a video element to extract metadata
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    // Set up event handlers
    video.onloadedmetadata = () => {
      const frameRate = estimateFrameRate(video);
      resolve({
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
        frameRate
      });
      // Clean up
      URL.revokeObjectURL(video.src);
    };
    
    video.onerror = () => {
      reject(new Error('Failed to load video metadata'));
      URL.revokeObjectURL(video.src);
    };
    
    // Start loading video
    video.src = URL.createObjectURL(videoFile);
  });
};

// Estimate frame rate based on video properties
const estimateFrameRate = (videoElement: HTMLVideoElement): number => {
  // Most consumer videos are 30fps, professional sports typically 50-60fps
  // We'll estimate based on video quality and size
  const isHighResolution = videoElement.videoHeight >= 720;
  const isLargeFile = videoElement.duration > 0 ? 
    (videoElement.videoWidth * videoElement.videoHeight * videoElement.duration) / 10000000 > 10 : false;
    
  if (isHighResolution && isLargeFile) {
    return 60; // Likely high-quality footage
  } else if (isHighResolution) {
    return 30; // HD but compressed
  } else {
    return 24; // Standard footage
  }
};

// Separate function to handle completion of analysis
const finishAnalysis = (
  analysis: PlayerAnalysis,
  user: User | null,
  toast: ToastFunctions['toast'],
  setAnalysisState: (state: 'idle' | 'model-selection' | 'processing' | 'complete' | 'detailed-analysis') => void
) => {
  console.log("Analysis complete, transitioning to complete state");
  
  // Set to complete state
  setAnalysisState('complete');
  
  // Save analysis if user is logged in
  if (user && analysis) {
    try {
      savePlayerAnalysis(analysis, user.id)
        .then(() => {
          toast({
            title: "تم حفظ التحليل",
            description: "تم تخزين تحليل اللاعب في قاعدة البيانات.",
            duration: 3000,
          });
        })
        .catch(error => {
          console.error('Error saving analysis:', error);
          toast({
            title: "خطأ في حفظ التحليل",
            description: "حدث خطأ أثناء تخزين التحليل. يرجى المحاولة مرة أخرى.",
            variant: "destructive",
            duration: 5000,
          });
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
  } else if (!user && analysis) {
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
};

const AnalysisService = {
  analyzeVideo
};

export default AnalysisService;
