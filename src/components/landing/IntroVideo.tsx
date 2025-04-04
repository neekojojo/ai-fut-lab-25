
import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IntroVideoProps {
  videoSrc: string;
  posterSrc?: string;
  title?: string;
  description?: string;
}

const IntroVideo: React.FC<IntroVideoProps> = ({
  videoSrc,
  posterSrc,
  title = "نظرة سريعة على تحليل لاعبي كرة القدم",
  description = "شاهد كيف يقوم FUT LAB Analyzer بتحليل أداء لاعبي كرة القدم باستخدام تقنيات الذكاء الاصطناعي المتقدمة"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden bg-background/80 backdrop-blur-sm shadow-xl border border-primary/10">
      <div className="relative">
        {/* فيديو */}
        <video
          ref={videoRef}
          className="w-full aspect-video object-cover"
          poster={posterSrc}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
        >
          <source src={videoSrc} type="video/mp4" />
          متصفحك لا يدعم تشغيل الفيديو
        </video>

        {/* تراكب عناصر التحكم */}
        <div 
          className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${
            isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'
          }`}
        >
          <Button 
            onClick={togglePlay} 
            size="lg" 
            variant="outline" 
            className="rounded-full h-16 w-16 p-0 bg-black/50 hover:bg-primary border-white/50 hover:border-primary transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8 text-white" />
            ) : (
              <Play className="h-8 w-8 text-white ml-1" />
            )}
          </Button>
        </div>

        {/* شريط التحكم السفلي */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex justify-between items-center">
          <Button 
            size="sm" 
            variant="ghost" 
            className="text-white hover:bg-white/20 rounded-full h-8 w-8 p-0"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          
          <div className="text-sm text-white font-medium truncate mx-2 hidden sm:block">
            {title}
          </div>
          
          <div className="w-4"></div> {/* Placeholder for balance */}
        </div>
      </div>

      {/* معلومات الفيديو */}
      <div className="p-4 sm:p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default IntroVideo;
