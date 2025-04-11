
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play, Database, Cloud } from 'lucide-react';
import { toast } from 'sonner';
import { AnalysisModel } from '@/utils/analysis/modelSelectionService';

interface AnalysisOptionsProps {
  videoFile: File;
  onSelectModel: (model: AnalysisModel) => void;
  onAnalyzeWithAI: () => void;
  isMobile?: boolean;
}

const AnalysisOptions: React.FC<AnalysisOptionsProps> = ({ 
  videoFile, 
  onSelectModel, 
  onAnalyzeWithAI,
  isMobile
}) => {
  const [selectedModel, setSelectedModel] = useState<AnalysisModel | null>(null);
  
  const handleSelectModel = (model: AnalysisModel) => {
    setSelectedModel(model);
    onSelectModel(model);
    toast.success(`تم اختيار نموذج ${model === 'google-automl' ? 'Google AutoML' : 'Kaggle Datasets'}`);
  };
  
  return (
    <div className="space-y-6 w-full max-w-3xl mx-auto">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">تحليل الفيديو</h2>
        <p className="text-muted-foreground">
          الفيديو جاهز للتحليل. اختر نموذج التعلم الآلي واضغط على زر التحليل.
        </p>
      </div>
      
      <div className="relative w-full aspect-video rounded-md overflow-hidden bg-black">
        <video
          src={videoFile instanceof File ? URL.createObjectURL(videoFile) : ''}
          controls
          className="w-full h-full object-contain"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card
          className={`border-primary/20 cursor-pointer hover:border-primary/50 transition-all ${
            selectedModel === 'google-automl' ? 'bg-primary/5 border-primary/50' : ''
          }`}
          onClick={() => handleSelectModel('google-automl')}
        >
          <CardHeader className="flex flex-row items-center gap-2">
            <Cloud className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">نموذج Google AutoML</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              نموذج دقيق للغاية مناسب للاعبين محترفين. يوفر نتائج مفصلة ودقيقة.
            </p>
          </CardContent>
        </Card>
        
        <Card
          className={`border-primary/20 cursor-pointer hover:border-primary/50 transition-all ${
            selectedModel === 'kaggle-datasets' ? 'bg-primary/5 border-primary/50' : ''
          }`}
          onClick={() => handleSelectModel('kaggle-datasets')}
        >
          <CardHeader className="flex flex-row items-center gap-2">
            <Database className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">نموذج Kaggle المجتمعي</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              نموذج سريع مدرب على مجموعات بيانات متنوعة. مناسب للاعبين الهواة والشباب.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <CardFooter className="flex justify-between pt-6 px-0">
        <Button
          variant="outline" 
          className="gap-2"
          onClick={() => window.location.reload()}
        >
          <ArrowLeft className="h-4 w-4" />
          العودة
        </Button>
        
        <Button
          className="gap-2"
          onClick={onAnalyzeWithAI}
          disabled={!selectedModel}
        >
          <Play className="h-4 w-4" />
          بدء التحليل
        </Button>
      </CardFooter>
    </div>
  );
};

export default AnalysisOptions;
