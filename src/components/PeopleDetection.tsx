
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import VideoUpload from './VideoUpload';
import { detectPeopleInVideo } from '@/utils/videoDetection';
import { analyzePlayerPerformance } from '@/utils/videoDetection';
import type { FileWithPreview } from '@/types/files';

const PeopleDetection: React.FC = () => {
  const [videoFile, setVideoFile] = useState<FileWithPreview | null>(null);
  const [detectionMethod, setDetectionMethod] = useState<'tensorflow' | 'yolo' | 'openpose'>('tensorflow');
  const [yoloModelSize, setYoloModelSize] = useState<'n' | 's' | 'm' | 'l' | 'x'>('m');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  
  const handleFileSelected = (file: FileWithPreview) => {
    setVideoFile(file);
    setResult(null);
    
    toast({
      title: "تم رفع الفيديو بنجاح",
      description: "اختر طريقة اكتشاف اللاعبين ثم اضغط على تحليل الفيديو",
    });
  };
  
  const handleDetect = async () => {
    if (!videoFile) {
      toast({
        title: "لم يتم اختيار فيديو",
        description: "الرجاء تحميل ملف فيديو للمتابعة",
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    setProgress(0);
    setResult(null);
    
    try {
      toast({
        title: "بدأ التحليل",
        description: `جاري تحليل الفيديو باستخدام ${detectionMethod === 'tensorflow' ? 'TensorFlow' : detectionMethod === 'yolo' ? 'YOLOv8' : 'OpenPose'}`,
      });
      
      // Advanced performance analysis instead of basic detection
      const analysisResult = await analyzePlayerPerformance(
        videoFile,
        undefined,
        (progress: number) => {
          setProgress(progress);
        }
      );
      
      setResult(analysisResult);
      
      toast({
        title: "اكتمل التحليل",
        description: "تم تحليل الفيديو بنجاح",
      });
    } catch (error) {
      console.error("Error detecting people in video:", error);
      toast({
        title: "خطأ في التحليل",
        description: "حدث خطأ أثناء تحليل الفيديو",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const renderResultCard = () => {
    if (!result) return null;
    
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>نتائج التحليل</CardTitle>
          <CardDescription>نتائج تحليل الفيديو باستخدام {detectionMethod === 'tensorflow' ? 'TensorFlow' : detectionMethod === 'yolo' ? 'YOLOv8' : 'OpenPose'}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium mb-2">معلومات عامة</h3>
              <ul className="space-y-2">
                <li><strong>عدد اللاعبين:</strong> {result.detection.count}</li>
                <li><strong>دقة الاكتشاف:</strong> {Math.round(result.detection.confidence * 100)}%</li>
                <li><strong>عدد الإطارات المحللة:</strong> {result.detection.frameResults?.length || 0}</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-2">تحليل الحركة</h3>
              <ul className="space-y-2">
                <li><strong>متوسط السرعة:</strong> {result.movementAnalysis?.averageSpeed?.toFixed(2)} كم/ساعة</li>
                <li><strong>المسافة المقطوعة:</strong> {result.movementAnalysis?.totalDistance?.toFixed(2)} متر</li>
                <li><strong>أقصى تسارع:</strong> {result.movementAnalysis?.maxAcceleration?.toFixed(2)} م/ث²</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">تحليل العين</h3>
            <ul className="space-y-2">
              <li><strong>وعي الميدان:</strong> {result.eyeTracking?.fieldAwarenessScore?.toFixed(2)}/100</li>
              <li><strong>سرعة اتخاذ القرار:</strong> {result.eyeTracking?.decisionSpeed?.toFixed(2)}/100</li>
              <li><strong>الاستباق:</strong> {result.eyeTracking?.anticipationScore?.toFixed(2)}/100</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">المقاييس الفنية</h3>
            <ul className="space-y-2">
              <li><strong>الدقة التقنية:</strong> {result.performanceMetrics?.technicalAccuracy?.toFixed(2)}/100</li>
              <li><strong>الفعالية:</strong> {result.performanceMetrics?.efficiency?.toFixed(2)}/100</li>
              <li><strong>الذكاء التكتيكي:</strong> {result.performanceMetrics?.tacticalAwareness?.toFixed(2)}/100</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>أداة اكتشاف اللاعبين</CardTitle>
          <CardDescription>رفع فيديو لاكتشاف اللاعبين وتحليل حركتهم</CardDescription>
        </CardHeader>
        <CardContent>
          <VideoUpload onFileSelected={handleFileSelected} selectedFile={videoFile} />
        </CardContent>
      </Card>
      
      <Tabs defaultValue="detection-settings">
        <TabsList>
          <TabsTrigger value="detection-settings">إعدادات الاكتشاف</TabsTrigger>
          <TabsTrigger value="model-info">معلومات النماذج</TabsTrigger>
        </TabsList>
        
        <TabsContent value="detection-settings">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات تحليل الفيديو</CardTitle>
              <CardDescription>اختر طريقة اكتشاف اللاعبين والإعدادات ذات الصلة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium mb-2 block">طريقة الاكتشاف</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <Button
                    variant={detectionMethod === 'tensorflow' ? 'default' : 'outline'}
                    onClick={() => setDetectionMethod('tensorflow')}
                    className="justify-start"
                  >
                    TensorFlow
                  </Button>
                  <Button
                    variant={detectionMethod === 'yolo' ? 'default' : 'outline'}
                    onClick={() => setDetectionMethod('yolo')}
                    className="justify-start"
                  >
                    YOLOv8
                  </Button>
                  <Button
                    variant={detectionMethod === 'openpose' ? 'default' : 'outline'}
                    onClick={() => setDetectionMethod('openpose')}
                    className="justify-start"
                  >
                    OpenPose
                  </Button>
                </div>
              </div>
              
              {detectionMethod === 'yolo' && (
                <div>
                  <label className="text-sm font-medium mb-2 block">حجم نموذج YOLO</label>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                    <Button
                      variant={yoloModelSize === 'n' ? 'default' : 'outline'}
                      onClick={() => setYoloModelSize('n')}
                      className="justify-start"
                    >
                      Nano
                    </Button>
                    <Button
                      variant={yoloModelSize === 's' ? 'default' : 'outline'}
                      onClick={() => setYoloModelSize('s')}
                      className="justify-start"
                    >
                      Small
                    </Button>
                    <Button
                      variant={yoloModelSize === 'm' ? 'default' : 'outline'}
                      onClick={() => setYoloModelSize('m')}
                      className="justify-start"
                    >
                      Medium
                    </Button>
                    <Button
                      variant={yoloModelSize === 'l' ? 'default' : 'outline'}
                      onClick={() => setYoloModelSize('l')}
                      className="justify-start"
                    >
                      Large
                    </Button>
                    <Button
                      variant={yoloModelSize === 'x' ? 'default' : 'outline'}
                      onClick={() => setYoloModelSize('x')}
                      className="justify-start"
                    >
                      XLarge
                    </Button>
                  </div>
                </div>
              )}
              
              <Button 
                onClick={handleDetect} 
                disabled={isProcessing || !videoFile}
                className="w-full"
              >
                {isProcessing ? 'جاري التحليل...' : 'تحليل الفيديو'}
              </Button>
              
              {isProcessing && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>التقدم</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="model-info">
          <Card>
            <CardHeader>
              <CardTitle>معلومات النماذج المستخدمة</CardTitle>
              <CardDescription>نبذة عن نماذج الذكاء الاصطناعي المستخدمة في اكتشاف اللاعبين</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">TensorFlow</h3>
                <p className="text-muted-foreground">
                  مكتبة مفتوحة المصدر للذكاء الاصطناعي طورتها Google. تستخدم في هذا التطبيق نموذج MoveNet لتتبع وضعية الجسم.
                </p>
                <p className="text-muted-foreground mt-1">
                  <strong>الميزات:</strong> سريع نسبياً، دقة متوسطة، استهلاك منخفض للذاكرة.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">YOLOv8</h3>
                <p className="text-muted-foreground">
                  نموذج كشف الكائنات في الوقت الفعلي "You Only Look Once" في إصداره الثامن. يوفر توازناً ممتازاً بين السرعة والدقة.
                </p>
                <p className="text-muted-foreground mt-1">
                  <strong>الميزات:</strong> دقة عالية، كشف متعدد الأشخاص، أحجام متعددة للنموذج بناءً على احتياجات الأداء.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">OpenPose</h3>
                <p className="text-muted-foreground">
                  مكتبة مفتوحة المصدر لتقدير وضع الجسم متعدد الأشخاص. متخصصة في تتبع المفاصل والهيكل العظمي.
                </p>
                <p className="text-muted-foreground mt-1">
                  <strong>الميزات:</strong> دقة عالية جداً في تتبع الهيكل العظمي، كشف تفاصيل دقيقة، استهلاك عالٍ للموارد.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {renderResultCard()}
    </div>
  );
};

export default PeopleDetection;
