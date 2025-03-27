
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import LoadingAnimation from '@/components/LoadingAnimation';
import PlayerAnalysisView from '@/components/PlayerAnalysisView';
import PeopleDetection from '@/components/PeopleDetection';
import ModelSelection from '@/components/analysis/ModelSelection';
import HeroSection from '@/components/landing/HeroSection';
import AnalysisResults from '@/components/analysis/AnalysisResults';
import Footer from '@/components/layout/Footer';
import type { PlayerAnalysis } from '@/components/AnalysisReport.d';
import { analyzeFootballVideo } from '@/utils/analysisService';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from '@/components/auth/AuthContext';
import { savePlayerAnalysis } from '@/services/playerAnalysisService';

const Index = () => {
  const [analysisState, setAnalysisState] = useState<'idle' | 'model-selection' | 'processing' | 'complete' | 'detailed-analysis'>('idle');
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const [analysis, setAnalysis] = useState<PlayerAnalysis | null>(null);
  const [showPeopleDetection, setShowPeopleDetection] = useState(false);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [selectedAnalysisModel, setSelectedAnalysisModel] = useState<'google-automl' | 'kaggle-datasets' | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleVideoUpload = async (file: File) => {
    setVideoFile(file);
    setAnalysisState('model-selection');
  };

  const handleSelectModel = (model: 'google-automl' | 'kaggle-datasets') => {
    setSelectedAnalysisModel(model);
    toast({
      title: `تم اختيار ${model === 'google-automl' ? 'Google AutoML Vision' : 'Kaggle Datasets'}`,
      description: "تم تعيين نموذج التحليل.",
      duration: 3000,
    });
  };

  const handleAnalyzeWithAI = async () => {
    if (!videoFile) return;
    
    setAnalysisState('processing');
    setProgress(0);
    
    try {
      const result = await analyzeFootballVideo(videoFile);
      
      result.progressUpdates((newProgress, newStage) => {
        setProgress(newProgress);
        setStage(newStage);
      });
      
      setAnalysis(result.analysis);
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

  const handleAdvancedAnalysis = () => {
    if (videoFile) {
      setAnalysisState('detailed-analysis');
    }
  };

  const resetAnalysis = () => {
    setAnalysisState('idle');
    setProgress(0);
    setStage('');
    setAnalysis(null);
    setVideoFile(null);
    setSelectedAnalysisModel(null);
  };

  const togglePeopleDetection = () => {
    setShowPeopleDetection(!showPeopleDetection);
  };

  const handleGoToDashboard = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      toast({
        title: "مطلوب تسجيل الدخول",
        description: "يرجى تسجيل الدخول لعرض لوحة التحكم الخاصة بك.",
        duration: 3000,
      });
      navigate('/sign-in');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6 md:py-12">
        {analysisState === 'idle' && !showPeopleDetection && (
          <>
            <HeroSection 
              onVideoUpload={handleVideoUpload} 
              onTogglePeopleDetection={togglePeopleDetection}
            />
            
            {user ? (
              <div className="mt-6 text-center">
                <button
                  onClick={handleGoToDashboard}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  عرض تحليلاتي السابقة
                </button>
              </div>
            ) : (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-2">قم بتسجيل الدخول لحفظ التحليلات ومشاهدتها لاحقًا</p>
                <div className="space-x-4 rtl:space-x-reverse">
                  <button
                    onClick={() => navigate('/sign-in')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    تسجيل الدخول
                  </button>
                  <button
                    onClick={() => navigate('/sign-up')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    إنشاء حساب
                  </button>
                </div>
              </div>
            )}
          </>
        )}
        
        {analysisState === 'model-selection' && videoFile && (
          <ModelSelection 
            videoFile={videoFile}
            onSelectModel={handleSelectModel}
            onAnalyzeWithAI={handleAnalyzeWithAI}
          />
        )}
        
        {showPeopleDetection && analysisState === 'idle' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">اكتشاف الأشخاص في الفيديو</h2>
              <button
                onClick={togglePeopleDetection}
                className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                العودة إلى تحليل كرة القدم
              </button>
            </div>
            
            <PeopleDetection />
          </div>
        )}
        
        {analysisState === 'processing' && (
          <LoadingAnimation progress={progress} stage={stage} />
        )}
        
        {analysisState === 'complete' && analysis && (
          <AnalysisResults 
            analysis={analysis}
            onResetAnalysis={resetAnalysis}
            onAdvancedAnalysis={handleAdvancedAnalysis}
          />
        )}
        
        {analysisState === 'detailed-analysis' && videoFile && (
          <PlayerAnalysisView
            videoFile={videoFile}
            onResetAnalysis={resetAnalysis}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
