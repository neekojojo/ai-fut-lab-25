
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Cloud, PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { FileWithPreview } from '@/types/files';

interface ModelSelectionCardProps {
  videoFile: File | null;
  onSelectModel: (model: 'google-automl' | 'kaggle-datasets') => void;
  onAnalyzeWithAI: () => void;
}

const ModelSelectionCard: React.FC<ModelSelectionCardProps> = ({
  videoFile,
  onSelectModel,
  onAnalyzeWithAI
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="border border-slate-800 bg-slate-900 text-white shadow-lg rounded-lg overflow-hidden">
        <CardContent className="p-0">
          <div className="p-8">
            <div className="flex flex-col items-center justify-center relative">
              {videoFile && (
                <div className="w-full mb-8 relative">
                  <div className="aspect-video bg-slate-800 rounded-md flex flex-col items-center justify-center border border-slate-700 border-dashed">
                    <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center mb-4">
                      <PlayCircle className="w-8 h-8 text-primary" />
                    </div>
                    
                    <div className="text-white mb-4 text-center">
                      <p className="text-sm font-mono overflow-hidden text-ellipsis max-w-xs">
                        {videoFile.name}
                      </p>
                      <p className="text-xs mt-1 text-slate-400">{(videoFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                    </div>
                    
                    <Button
                      onClick={onAnalyzeWithAI}
                      className="rounded-md bg-primary hover:bg-primary/90 px-6 py-3 flex items-center gap-2"
                    >
                      <PlayCircle className="w-5 h-5" />
                      <span>تحليل بالذكاء الاصطناعي</span>
                    </Button>
                  </div>
                </div>
              )}
              
              <h2 className="text-2xl font-bold mb-2">اختر نموذج التحليل</h2>
              <p className="text-slate-400 text-center mb-8">
                اختر بين Google AutoML Vision للتعرف المتقدم على الأنماط المرئية
                أو مجموعات بيانات Kaggle للمقارنة الإحصائية.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                <button
                  onClick={() => onSelectModel('google-automl')}
                  className="border border-slate-700 rounded-lg p-6 hover:bg-slate-800 transition-colors flex flex-col items-center text-center"
                >
                  <Cloud className="h-8 w-8 text-primary mb-3" />
                  <span className="text-lg font-medium text-primary">Google AutoML Vision</span>
                  <p className="text-xs text-slate-400 mt-2">يستخدم نماذج الرؤية المتقدمة من Google لتحليل تقنيات وحركات اللاعبين</p>
                </button>
                
                <button
                  onClick={() => onSelectModel('kaggle-datasets')}
                  className="border border-slate-700 rounded-lg p-6 hover:bg-slate-800 transition-colors flex flex-col items-center text-center"
                >
                  <Database className="h-8 w-8 text-primary mb-3" />
                  <span className="text-lg font-medium text-primary">Kaggle Datasets Model</span>
                  <p className="text-xs text-slate-400 mt-2">قاعدة بيانات واسعة من إحصائيات وأداء اللاعبين لإجراء مقارنات دقيقة</p>
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-4 pt-4 pb-4 px-8 text-center">
            <p className="text-sm text-slate-400">© 2025 PlayerAI. جميع الحقوق محفوظة.</p>
            
            <div className="flex justify-center mt-4 space-x-8 rtl:space-x-reverse">
              <a href="#" className="text-sm text-slate-400 hover:text-white">سياسة الخصوصية</a>
              <a href="#" className="text-sm text-slate-400 hover:text-white">شروط الخدمة</a>
              <a href="#" className="text-sm text-slate-400 hover:text-white">الدعم</a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelSelectionCard;
