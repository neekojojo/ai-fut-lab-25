
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import VideoUpload from '@/components/VideoUpload';
import ModelSelectionCard from '@/components/ModelSelectionCard';
import type { FileWithPreview } from '@/types/files';

const HomePage = () => {
  const [videoFile, setVideoFile] = useState<FileWithPreview | null>(null);
  const [selectedModel, setSelectedModel] = useState<'google-automl' | 'kaggle-datasets' | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleFileSelected = (file: FileWithPreview | null) => {
    setVideoFile(file);
    if (file) {
      toast({
        title: "تم رفع الفيديو بنجاح",
        description: "اختر نموذج التحليل المناسب للمتابعة",
      });
    }
  };
  
  const handleSelectModel = (model: 'google-automl' | 'kaggle-datasets') => {
    setSelectedModel(model);
    toast({
      title: `تم اختيار ${model === 'google-automl' ? 'Google AutoML Vision' : 'Kaggle Datasets Model'}`,
      description: "اضغط على زر تحليل الفيديو للبدء"
    });
  };
  
  const handleAnalyzeWithAI = () => {
    if (!videoFile || !selectedModel) {
      toast({
        title: "تعذر إجراء التحليل",
        description: "الرجاء تحميل فيديو واختيار نموذج تحليل",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "جارٍ تحليل الفيديو",
      description: "قد يستغرق هذا الإجراء بضع دقائق...",
    });
    
    // Simulate processing delay
    setTimeout(() => {
      navigate('/player-analysis');
    }, 2000);
  };
  
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center py-8">
          <h1 className="text-3xl font-bold mb-2 text-primary-foreground">
            حلل أداء لاعبك وارفع مستواه بالذكاء الاصطناعي
          </h1>
          <p className="text-slate-300">
            تحليل أداء رقمي شامل يغطي الجوانب الفنية، البدنية، التكتيكية، والذهنية
          </p>
        </header>
        
        <div className="rounded-xl p-6 bg-gradient-to-r from-indigo-950/50 to-slate-950/50 border border-slate-800 shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="bg-primary/20 p-3 rounded-full">
              <Trophy className="h-10 w-10 text-primary" />
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-center mb-6">
            Play football like a pro
          </h2>
          
          {!videoFile ? (
            <>
              <h3 className="text-xl font-bold text-center mb-4">اختر نموذج التحليل</h3>
              <VideoUpload onFileSelected={handleFileSelected} />
            </>
          ) : (
            <>
              <ModelSelectionCard 
                videoFile={videoFile} 
                onSelectModel={handleSelectModel}
                onAnalyzeWithAI={handleAnalyzeWithAI}
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="bg-slate-900/80 p-6 rounded-lg border border-slate-800">
            <h3 className="font-bold mb-2">Google AutoML Vision</h3>
            <p className="text-slate-300 text-sm">
              يستخدم نماذج الرؤية المتقدمة من Google لتحليل تقنيات وحركات اللاعبين
            </p>
          </div>
          
          <div className="bg-slate-900/80 p-6 rounded-lg border border-slate-800">
            <h3 className="font-bold mb-2">Kaggle Datasets Model</h3>
            <p className="text-slate-300 text-sm">
              قاعدة بيانات واسعة من إحصائيات وأداء اللاعبين لإجراء مقارنات دقيقة
            </p>
          </div>
        </div>
        
        <footer className="border-t border-slate-800 mt-8 pt-4 text-center text-slate-400 text-sm">
          <div className="flex justify-center space-x-4 rtl:space-x-reverse">
            <a href="#" className="hover:text-white">الخصوصية</a>
            <span>|</span>
            <a href="#" className="hover:text-white">الشروط</a>
            <span>|</span>
            <a href="#" className="hover:text-white">الدعم</a>
          </div>
          <p className="mt-2">© 2025 FootballAnalyzer. كل الحقوق محفوظة.</p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;
