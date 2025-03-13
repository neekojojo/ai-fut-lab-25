
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface VideoUploadProps {
  onUpload: (file: File) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    // Check if file is a video
    if (!file.type.startsWith('video/')) {
      alert('Please upload a video file');
      return;
    }

    setSelectedFile(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAnalyzeClick = () => {
    if (selectedFile) {
      onUpload(selectedFile);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto overflow-hidden animate-scale-in">
      <CardContent className="p-0">
        <div 
          className={`upload-zone flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-all ${
            isDragging ? 'border-primary bg-primary/5 active' : 'border-border'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!previewUrl ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-primary"
                >
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Upload your football video</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Drag and drop your video file here, or click to select a file. We support MP4, MOV, and AVI formats.
                </p>
              </div>
              <button
                type="button"
                onClick={handleUploadClick}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors inline-flex items-center space-x-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span>Select Video</span>
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="video/*"
                className="hidden"
              />
            </div>
          ) : (
            <div className="w-full space-y-4 py-4">
              <div className="relative w-full aspect-video rounded-md overflow-hidden">
                <video
                  src={previewUrl}
                  controls
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <p className="font-medium">{selectedFile?.name}</p>
                  <p className="text-muted-foreground">
                    {(selectedFile?.size && (selectedFile.size / (1024 * 1024)).toFixed(2)) || 0} MB
                  </p>
                </div>
                <button
                  onClick={handleAnalyzeClick}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors inline-flex items-center space-x-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>Analyze Performance</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoUpload;
