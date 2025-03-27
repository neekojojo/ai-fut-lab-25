import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { detectPeopleInVideo } from '@/utils/videoDetection';
import { useToast } from '@/components/ui/use-toast';
import type { DetectionResult } from '@/utils/videoDetection/types';
import VideoUpload from '@/components/VideoUpload';
import PlayerMovementVisualization from '@/components/PlayerMovementVisualization';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const PeopleDetection = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
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
    
    try {
      const detectionResult = await detectPeopleInVideo(videoFile);
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
        description: "حدث خطأ أثناء تحليل الفيديو",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleReset = () => {
    setResult(null);
    setVideoSrc(null);
    setVideoFile(null);
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
              
              <div className="flex justify-center mt-4">
                <Button 
                  onClick={analyzeVideo} 
                  disabled={isAnalyzing}
                  size="lg"
                  className="px-6"
                >
                  {isAnalyzing ? 'جاري التحليل...' : 'تحليل الفيديو'}
                </Button>
              </div>
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
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">متوسط عدد اللاعبين</div>
                    <div className="text-2xl font-bold">{result.count}</div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">الثقة</div>
                    <div className="text-2xl font-bold">{(result.confidence * 100).toFixed(0)}%</div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">إجمالي الإطارات</div>
                    <div className="text-2xl font-bold">{result.frameResults.length}</div>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">المدة (ثانية)</div>
                    <div className="text-2xl font-bold">
                      {(result.frameResults[result.frameResults.length - 1]?.timestamp / 1000).toFixed(1)}
                    </div>
                  </div>
                </div>
              </div>
              
              {result.playerPositions && result.playerPositions.length > 0 && (
                <PlayerMovementVisualization playerPositions={result.playerPositions} />
              )}
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">تحليل الإطارات</h3>
                <div className="h-48 overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الإطار</th>
                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الأشخاص</th>
                        <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">الوقت (ميلي ثانية)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
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
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PeopleDetection;
