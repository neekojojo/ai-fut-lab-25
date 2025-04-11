
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AIConfigModal from './AIConfigModal';
import { Database, Cloud, Cpu, Brain, Layers, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { AnalysisModel, getModelInformation } from '@/utils/analysis/modelSelectionService';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface ModelSelectionProps {
  videoFile: File;
  onSelectModel: (model: AnalysisModel) => void;
  onAnalyzeWithAI: () => void;
}

const EnhancedModelSelection: React.FC<ModelSelectionProps> = ({
  videoFile,
  onSelectModel,
  onAnalyzeWithAI
}) => {
  const [selectedModel, setSelectedModel] = React.useState<AnalysisModel | null>(null);
  const [activeTab, setActiveTab] = useState('models');
  
  const handleSelectModel = (model: AnalysisModel) => {
    console.log("Selected model:", model);
    setSelectedModel(model);
    onSelectModel(model);
    
    toast.success(`تم اختيار نموذج ${model === 'google-automl' ? 'Google AutoML' : 'Kaggle Datasets'}`);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">اختر نموذج التحليل</h2>
        <AIConfigModal />
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
          <TabsTrigger value="models">
            <Brain className="w-4 h-4 mr-2" />
            <span>نماذج التحليل</span>
          </TabsTrigger>
          <TabsTrigger value="comparison">
            <Layers className="w-4 h-4 mr-2" />
            <span>مقارنة النماذج</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="models">
          <Card className="bg-card border rounded-lg shadow-sm p-6">
            <CardContent className="p-0">
              <p className="text-muted-foreground mb-6">
                اختر نموذج الذكاء الاصطناعي لتحليل فيديو كرة القدم الخاص بك:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => handleSelectModel('google-automl')}
                  className={`flex flex-col items-center p-6 border rounded-lg transition-colors ${
                    selectedModel === 'google-automl' 
                      ? 'bg-primary/10 border-primary' 
                      : 'hover:bg-accent'
                  }`}
                >
                  <Cloud className="h-16 w-16 text-primary mb-4" />
                  <div className="text-xl font-medium">Google AutoML Vision</div>
                  <div className="flex items-center mt-2">
                    <Badge variant="secondary">دقة التحليل: عالية</Badge>
                    <Badge variant="outline" className="ml-2">سرعة التحليل: متوسطة</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    متخصص في تحليل المهارات التقنية وتحديد مواقع اللاعبين.
                    يستخدم رؤية الحاسوب المتقدمة لتحليل حركات اللاعب والكرة.
                  </p>
                  <div className="flex items-center mt-4 text-primary">
                    <span className="text-sm font-medium">اختيار هذا النموذج</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </button>
                
                <button
                  onClick={() => handleSelectModel('kaggle-datasets')}
                  className={`flex flex-col items-center p-6 border rounded-lg transition-colors ${
                    selectedModel === 'kaggle-datasets' 
                      ? 'bg-primary/10 border-primary' 
                      : 'hover:bg-accent'
                  }`}
                >
                  <Database className="h-16 w-16 text-primary mb-4" />
                  <div className="text-xl font-medium">Kaggle Datasets Model</div>
                  <div className="flex items-center mt-2">
                    <Badge variant="secondary">دقة التحليل: متوسطة</Badge>
                    <Badge variant="outline" className="ml-2">سرعة التحليل: عالية</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground text-center mt-4">
                    تم تدريبه على مجموعات بيانات كرة القدم الشاملة ومقاييس الأداء.
                    يقوم بتحليل الإحصائيات المتعددة للاعب والمقارنة مع قاعدة بيانات واسعة.
                  </p>
                  <div className="flex items-center mt-4 text-primary">
                    <span className="text-sm font-medium">اختيار هذا النموذج</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </button>
              </div>
              
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={onAnalyzeWithAI}
                  disabled={!selectedModel}
                  className="px-8 py-6 text-lg bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Cpu className="h-5 w-5 mr-2" />
                  تحليل باستخدام الذكاء الاصطناعي
                </Button>
              </div>
              
              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>سيقوم النموذج المختار بتحليل فيديو اللاعب وتوليد تقارير تفصيلية عن الأداء</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>مقارنة بين نماذج التحليل</CardTitle>
              <CardDescription>تعرف على الفروق بين نماذج التحليل المتاحة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-sm font-medium text-right">المزايا</th>
                      <th className="px-4 py-3 text-sm font-medium text-center">Google AutoML Vision</th>
                      <th className="px-4 py-3 text-sm font-medium text-center">Kaggle Datasets Model</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-3 text-sm">دقة التحليل</td>
                      <td className="px-4 py-3 text-sm text-center">عالية جداً (95%)</td>
                      <td className="px-4 py-3 text-sm text-center">متوسطة (80%)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">وقت المعالجة</td>
                      <td className="px-4 py-3 text-sm text-center">بطيء (2-5 دقائق)</td>
                      <td className="px-4 py-3 text-sm text-center">سريع (30-60 ثانية)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">تحليل الحركة</td>
                      <td className="px-4 py-3 text-sm text-center">متقدم جداً</td>
                      <td className="px-4 py-3 text-sm text-center">أساسي</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">تحليل المهارات التقنية</td>
                      <td className="px-4 py-3 text-sm text-center">ممتاز</td>
                      <td className="px-4 py-3 text-sm text-center">جيد</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">تحليل القدرات البدنية</td>
                      <td className="px-4 py-3 text-sm text-center">جيد</td>
                      <td className="px-4 py-3 text-sm text-center">ممتاز</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">تحليل الأداء التكتيكي</td>
                      <td className="px-4 py-3 text-sm text-center">ممتاز</td>
                      <td className="px-4 py-3 text-sm text-center">جيد</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">مقارنة مع اللاعبين المحترفين</td>
                      <td className="px-4 py-3 text-sm text-center">محدود</td>
                      <td className="px-4 py-3 text-sm text-center">ممتاز</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm">تحليل مناطق اللعب</td>
                      <td className="px-4 py-3 text-sm text-center">متقدم (خرائط حرارية)</td>
                      <td className="px-4 py-3 text-sm text-center">أساسي</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <h3 className="text-sm font-medium mb-2">توصيات استخدام النماذج:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <Cloud className="h-4 w-4 text-primary mt-0.5 mr-2" />
                    <p>استخدم <span className="font-medium">Google AutoML Vision</span> للتحليل التفصيلي والدقيق للمهارات التقنية والحركية.</p>
                  </li>
                  <li className="flex items-start">
                    <Database className="h-4 w-4 text-primary mt-0.5 mr-2" />
                    <p>استخدم <span className="font-medium">Kaggle Datasets Model</span> للتحليل السريع والمقارنة مع اللاعبين المحترفين.</p>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedModelSelection;
