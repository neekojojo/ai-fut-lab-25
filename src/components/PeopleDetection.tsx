
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { detectPeopleInVideo } from '@/utils/videoDetection';
import { useToast } from '@/components/ui/use-toast';
import type { DetectionResult } from '@/utils/videoDetection/types';
import VideoUpload from '@/components/VideoUpload';
import PlayerMovementVisualization from '@/components/PlayerMovementVisualization';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const PeopleDetection = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [detectionMethod, setDetectionMethod] = useState<'tensorflow' | 'yolo' | 'openpose'>('tensorflow');
  const [yoloModelSize, setYoloModelSize] = useState<'n' | 's' | 'm' | 'l' | 'x'>('m');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const { toast } = useToast();

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      toast({
        variant: "destructive",
        title: "نوع ملف غير صالح",
        description: "يرجى تحميل ملف فيديو",
      });
      return;
    }
    
    const objectUrl = URL.createObjectURL(file);
    setVideoSrc(objectUrl);
    setVideoFile(file);
  };
  
  const analyzeVideo = async () => {
    if (!videoFile) return;
    
    setIsAnalyzing(true);
    setResult(null);
    setAnalysisProgress(0);
    
    try {
      const detectionResult = await detectPeopleInVideo(
        videoFile, 
        detectionMethod, 
        yoloModelSize,
        (progress) => setAnalysisProgress(progress)
      );
      
      setResult(detectionResult);
      
      toast({
        title: "اكتمل التحليل",
        description: `تم اكتشاف ${detectionResult.count} شخص في المتوسط في الفيديو`,
      });
    } catch (error) {
      console.error('Error analyzing video:', error);
      toast({
        variant: "destructive",
        title: "فشل التحليل",
        description: `حدث خطأ أثناء تحليل الفيديو: ${error instanceof Error ? error.message : 'خطأ غير معروف'}`,
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleReset = () => {
    setResult(null);
    setVideoSrc(null);
    setVideoFile(null);
    setAnalysisProgress(0);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>تحليل اللاعبين</CardTitle>
            
            {result && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleReset}
                className="flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>إعادة ضبط</span>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!videoFile ? (
            <VideoUpload onUpload={handleFileSelect} />
          ) : !result ? (
            <div className="space-y-4">
              <div className="mt-4">
                <video 
                  src={videoSrc!} 
                  controls 
                  className="w-full rounded-lg"
                  style={{ maxHeight: '400px' }}
                />
              </div>
              
              <div className="p-4 border rounded-lg bg-secondary/20 space-y-4">
                <h3 className="text-lg font-medium">إعدادات التحليل</h3>
                
                <RadioGroup 
                  value={detectionMethod} 
                  onValueChange={(value) => setDetectionMethod(value as 'tensorflow' | 'yolo' | 'openpose')}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="tensorflow" id="tensorflow" />
                    <Label htmlFor="tensorflow" className="mr-2">TensorFlow (التحليل القياسي)</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="yolo" id="yolo" />
                    <Label htmlFor="yolo" className="mr-2">YOLOv8 (تحليل متقدم)</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="openpose" id="openpose" />
                    <Label htmlFor="openpose" className="mr-2">OpenPose (تحليل هيكل الجسم بدقة)</Label>
                  </div>
                </RadioGroup>
                
                {detectionMethod === 'yolo' && (
                  <div className="ml-6 mt-2">
                    <Label htmlFor="yolo-size" className="block mb-2">حجم نموذج YOLOv8:</Label>
                    <Select 
                      value={yoloModelSize} 
                      onValueChange={(value) => setYoloModelSize(value as 'n' | 's' | 'm' | 'l' | 'x')}
                    >
                      <SelectTrigger id="yolo-size" className="w-[200px]">
                        <SelectValue placeholder="اختر حجم النموذج" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="n">YOLOv8n (صغير، سريع)</SelectItem>
                        <SelectItem value="s">YOLOv8s (صغير متوسط)</SelectItem>
                        <SelectItem value="m">YOLOv8m (متوسط، موصى به)</SelectItem>
                        <SelectItem value="l">YOLOv8l (كبير، دقيق)</SelectItem>
                        <SelectItem value="x">YOLOv8x (كبير جدًا، الأكثر دقة)</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground mt-1">
                      النماذج الأكبر تكون أكثر دقة ولكنها تستغرق وقتًا أطول في المعالجة
                    </p>
                  </div>
                )}
                
                {detectionMethod === 'openpose' && (
                  <div className="ml-6 mt-2">
                    <p className="text-sm text-muted-foreground">
                      OpenPose يقوم بتحليل هيكل الجسم بدقة عالية مع تتبع 25 نقطة مفصلية
                    </p>
                    <div className="flex items-center mt-2 p-2 bg-blue-50 dark:bg-blue-950 rounded text-sm text-blue-700 dark:text-blue-300">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      <span>يستغرق هذا النموذج وقتًا أطول لتحليل الفيديو مع نتائج أكثر تفصيلاً</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center mt-4">
                <Button 
                  onClick={analyzeVideo} 
                  disabled={isAnalyzing}
                  size="lg"
                  className="px-6"
                >
                  {isAnalyzing 
                    ? `جاري التحليل... ${analysisProgress}%` 
                    : 'تحليل الفيديو'}
                </Button>
              </div>
              
              {isAnalyzing && (
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full transition-all duration-300 ease-in-out"
                    style={{ width: `${analysisProgress}%` }}
                  ></div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <video 
                    src={videoSrc!} 
                    controls 
                    className="w-full rounded-lg"
                    style={{ maxHeight: '300px' }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 h-fit">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">متوسط عدد اللاعبين</div>
                    <div className="text-2xl font-bold">{result.count}</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">الثقة</div>
                    <div className="text-2xl font-bold">{(result.confidence * 100).toFixed(0)}%</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">إجمالي الإطارات</div>
                    <div className="text-2xl font-bold">{result.frameResults.length}</div>
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400">المدة (ثانية)</div>
                    <div className="text-2xl font-bold">
                      {(result.frameResults[result.frameResults.length - 1]?.timestamp / 1000).toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
              
              {result.playerPositions && result.playerPositions.length > 0 && (
                <PlayerMovementVisualization playerPositions={result.playerPositions} />
              )}
              
              <Tabs defaultValue="frameAnalysis" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="frameAnalysis">تحليل الإطارات</TabsTrigger>
                  <TabsTrigger value="detectionInfo">معلومات الكشف</TabsTrigger>
                </TabsList>
                
                <TabsContent value="frameAnalysis" className="mt-4">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">تحليل الإطارات</h3>
                    <div className="h-48 overflow-y-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">الإطار</th>
                            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">الأشخاص</th>
                            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">الوقت (ميلي ثانية)</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                          {result.frameResults.map((frame) => (
                            <tr key={frame.frameNumber}>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-right">{frame.frameNumber}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-right">{frame.detections}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-sm text-right">{frame.timestamp}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="detectionInfo" className="mt-4">
                  <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                    <h3 className="text-sm font-medium mb-2">معلومات الكشف</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">طريقة الكشف:</span>
                        <span className="text-sm font-medium">{detectionMethod === 'tensorflow' ? 'TensorFlow' : 'YOLOv8'}</span>
                      </div>
                      {detectionMethod === 'yolo' && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">حجم نموذج YOLO:</span>
                          <span className="text-sm font-medium">YOLOv8{yoloModelSize}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">عدد مواقع اللاعبين:</span>
                        <span className="text-sm font-medium">{result.playerPositions?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PeopleDetection;
