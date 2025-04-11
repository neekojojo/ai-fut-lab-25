
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileVideo, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { FileWithPreview } from '@/types/files';

interface VideoUploadProps {
  onFileSelected: (file: FileWithPreview) => void;
  selectedFile?: FileWithPreview | null;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onFileSelected, selectedFile }) => {
  const [videoFile, setVideoFile] = useState<FileWithPreview | null>(selectedFile || null);
  const { toast } = useToast();
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const file = acceptedFiles[0];
    
    // Check if it's a video file
    if (!file.type.startsWith('video/')) {
      toast({
        title: "نوع الملف غير مدعوم",
        description: "الرجاء رفع ملف فيديو فقط",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "حجم الملف كبير جداً",
        description: "الحد الأقصى لحجم الملف هو 100 ميجابايت",
        variant: "destructive",
      });
      return;
    }
    
    // Create a preview URL
    const previewFile = Object.assign(file, {
      preview: URL.createObjectURL(file)
    }) as FileWithPreview;
    
    setVideoFile(previewFile);
    onFileSelected(previewFile);
    
    toast({
      title: "تم رفع الفيديو بنجاح",
      description: `تم رفع ${file.name} بنجاح`,
    });
  }, [onFileSelected, toast]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    },
    maxFiles: 1
  });
  
  const removeVideo = () => {
    if (videoFile) {
      URL.revokeObjectURL(videoFile.preview);
    }
    setVideoFile(null);
    onFileSelected(null as any);
  };
  
  return (
    <div className="space-y-4">
      {!videoFile ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center hover:bg-accent/50 transition-colors cursor-pointer ${
            isDragActive ? 'border-primary bg-primary/5' : 'border-border'
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-lg font-medium">أسحب وأفلت فيديو هنا، أو اضغط للتصفح</p>
            <p className="text-sm text-muted-foreground">
              MP4, MOV, AVI, WEBM حتى 100 ميجابايت
            </p>
          </div>
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="relative aspect-video">
            <video
              src={videoFile.preview}
              className="w-full h-full object-contain bg-black"
              controls
            />
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2"
              onClick={removeVideo}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4">
            <div className="flex items-start gap-3">
              <FileVideo className="h-8 w-8 text-primary" />
              <div className="overflow-hidden">
                <p className="font-medium truncate">{videoFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default VideoUpload;
