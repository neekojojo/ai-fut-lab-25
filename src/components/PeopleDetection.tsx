
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { detectPeopleInVideo } from '@/utils/videoDetectionService';
import { useToast } from '@/components/ui/use-toast';

interface DetectionResult {
  count: number;
  confidence: number;
  frameResults: {
    frameNumber: number;
    detections: number;
    timestamp: number;
  }[];
}

const PeopleDetection = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    
    // Validate that it's a video file
    if (!file.type.startsWith('video/')) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a video file",
      });
      return;
    }
    
    // Create object URL for video preview
    const objectUrl = URL.createObjectURL(file);
    setVideoSrc(objectUrl);
    
    // Start analysis
    setIsAnalyzing(true);
    setResult(null);
    
    try {
      const detectionResult = await detectPeopleInVideo(file);
      setResult(detectionResult);
      
      toast({
        title: "Analysis Complete",
        description: `Detected an average of ${detectionResult.count} people in the video`,
      });
    } catch (error) {
      console.error('Error analyzing video:', error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "There was an error analyzing the video",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>People Detection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
            <label className="flex flex-col items-center space-y-2 cursor-pointer">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 text-gray-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                />
              </svg>
              <span className="text-sm font-medium text-gray-600">
                {isAnalyzing ? 'Analyzing...' : 'Upload a video'}
              </span>
              <input 
                type="file" 
                className="hidden" 
                accept="video/*" 
                onChange={handleFileSelect}
                disabled={isAnalyzing}
              />
            </label>
          </div>
          
          {videoSrc && (
            <div className="mt-4">
              <video 
                src={videoSrc} 
                controls 
                className="w-full rounded-lg"
                style={{ maxHeight: '300px' }}
              />
            </div>
          )}
          
          {result && (
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Average People Count</div>
                  <div className="text-2xl font-bold">{result.count}</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="text-sm text-gray-500">Confidence</div>
                  <div className="text-2xl font-bold">{(result.confidence * 100).toFixed(0)}%</div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium mb-2">Frame-by-Frame Analysis</h3>
                <div className="h-48 overflow-y-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frame</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">People</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time (ms)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {result.frameResults.map((frame) => (
                        <tr key={frame.frameNumber}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm">{frame.frameNumber}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm">{frame.detections}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm">{frame.timestamp}</td>
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
