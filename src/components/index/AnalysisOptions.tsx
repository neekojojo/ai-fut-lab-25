
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Play } from 'lucide-react';

interface AnalysisOptionsProps {
  videoFile: File;
  onSelectModel: (model: 'google-automl' | 'kaggle-datasets') => void;
  onAnalyzeWithAI: () => void;
  isMobile?: boolean;
}

const AnalysisOptions: React.FC<AnalysisOptionsProps> = ({ 
  videoFile, 
  onSelectModel, 
  onAnalyzeWithAI,
  isMobile
}) => {
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
          className="border-primary/20 cursor-pointer hover:border-primary/50 transition-all"
          onClick={() => onSelectModel('google-automl')}
        >
          <CardHeader>
            <CardTitle className="text-lg">نموذج Google AutoML</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              نموذج دقيق للغاية مناسب للاعبين محترفين. يوفر نتائج مفصلة ودقيقة.
            </p>
          </CardContent>
        </Card>
        
        <Card
          className="border-primary/20 cursor-pointer hover:border-primary/50 transition-all"
          onClick={() => onSelectModel('kaggle-datasets')}
        >
          <CardHeader>
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
        >
          <Play className="h-4 w-4" />
          بدء التحليل
        </Button>
      </CardFooter>
    </div>
  );
};

export default AnalysisOptions;
