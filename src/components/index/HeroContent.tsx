
import React from 'react';
import { User } from '@supabase/supabase-js';
import VideoUpload from '@/components/VideoUpload';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';

interface HeroContentProps {
  user: User | null;
  onVideoUpload: (file: File) => Promise<void>;
  onTogglePeopleDetection: () => void;
  onGoToDashboard: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ 
  user,
  onVideoUpload, 
  onTogglePeopleDetection,
  onGoToDashboard
}) => {
  return (
    <>
      <div className="space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-4 animate-fade-in">
          <div className="inline-block px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
            AI-Powered Analysis
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            FootballAI Analyzer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span className="text-primary font-semibold">AI-powered</span> football talent assessment
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <VideoUpload onUpload={onVideoUpload} />
          
          <button 
            onClick={onTogglePeopleDetection}
            className="mt-4 px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary/10 transition-colors"
          >
            Try People Detection
          </button>
        </div>
        
        <FeaturesGrid />
      </div>
      
      {user ? (
        <div className="mt-6 text-center">
          <button
            onClick={onGoToDashboard}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            عرض تحليلاتي السابقة
          </button>
        </div>
      ) : (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">قم بتسجيل الدخول لحفظ التحليلات ومشاهدتها لاحقًا</p>
          <div className="space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => window.location.href = '/sign-in'}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary bg-primary/10 hover:bg-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => window.location.href = '/sign-up'}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              إنشاء حساب
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroContent;
