
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { X, Upload, Video, AlertCircle } from 'lucide-react';

interface VideoUploadProps {
  onUpload: (file: File) => void;
  selectedFile?: File | null;
  previewUrl?: string | null;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ 
  onUpload, 
  selectedFile: externalSelectedFile = null, 
  previewUrl: externalPreviewUrl = null 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(externalSelectedFile);
  const [previewUrl, setPreviewUrl] = useState<string | null>(externalPreviewUrl);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      // Clean up any preview URLs when component unmounts
      if (previewUrl && !externalPreviewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl, externalPreviewUrl]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    setError(null);
    
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      setError('يرجى تحميل ملف فيديو');
      toast({
        variant: "destructive",
        title: "خطأ في التحميل",
        description: "يرجى تحميل ملف فيديو صالح",
      });
      return;
    }

    setSelectedFile(file);
    
    // Create preview URL
    if (previewUrl && !externalPreviewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    
    // Pass the file to parent immediately - no upload simulation
    onUpload(file);
  };

  const handleRemoveFile = () => {
    if (previewUrl && !externalPreviewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setError(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden animate-scale-in">
      <CardContent className="p-4">
        <div 
          className={`upload-zone flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg transition-all ${
            isDragging ? 'border-primary bg-primary/5' : error ? 'border-destructive bg-destructive/5' : 'border-border hover:border-primary/50 hover:bg-secondary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {error && (
            <div className="w-full mb-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>{error}</p>
            </div>
          )}
          
          {!previewUrl ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center">
                <Video className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">قم بتحميل فيديو كرة القدم الخاص بك</h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  اسحب وأفلت ملف الفيديو هنا، أو انقر لاختيار ملف. نحن ندعم تنسيقات MP4 وMOV وAVI.
                </p>
              </div>
              <Button
                type="button"
                onClick={handleUploadClick}
                className="mt-4 gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>اختر فيديو</span>
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="video/*"
                className="hidden"
              />
              <p className="text-xs text-muted-foreground pt-4">
                يمكنك تحميل ملفات فيديو بأي حجم
              </p>
            </div>
          ) : (
            <div className="w-full space-y-4 py-2">
              <div className="relative w-full aspect-video rounded-md overflow-hidden bg-black">
                <video
                  src={previewUrl}
                  controls
                  className="w-full h-full object-contain"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8"
                  onClick={handleRemoveFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p className="font-medium line-clamp-1">{selectedFile?.name}</p>
                  <p className="text-muted-foreground">
                    {(selectedFile?.size && (selectedFile.size / (1024 * 1024)).toFixed(2)) || 0} MB
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoUpload;
