
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/layout/Footer';
import IntroVideo from '@/components/landing/IntroVideo';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const IntroVideoPage = () => {
  const navigate = useNavigate();
  
  // رابط الفيديو التعريفي (استبدله برابط فيديو حقيقي)
  // ملاحظة: هذا مثال فقط، استخدم فيديو حقيقياً خاصاً بتطبيقك
  const demoVideoSrc = "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-12 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">تعرف على FUT LAB Analyzer</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            شاهد كيف يساعدك تطبيقنا على تحليل أداء لاعبي كرة القدم باستخدام أحدث تقنيات الذكاء الاصطناعي
          </p>
        </div>
        
        <IntroVideo 
          videoSrc={demoVideoSrc}
          posterSrc="/stadium.jpg"
        />
        
        <div className="flex flex-col items-center mt-12 space-y-4">
          <h2 className="text-2xl font-semibold">استكشف المزيد من المميزات</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
            <FeatureCard 
              title="تحليل حركة اللاعبين"
              description="تعرف على أنماط حركة اللاعبين باستخدام تقنيات متقدمة لتتبع الحركة"
            />
            
            <FeatureCard 
              title="تقييم المهارات التقنية"
              description="تحليل شامل للمهارات التقنية ومقارنتها بمعايير اللاعبين المحترفين"
            />
            
            <FeatureCard 
              title="توصيات التطوير"
              description="خطط تدريبية مخصصة بناءً على نقاط القوة ومجالات التحسين المكتشفة"
            />
          </div>
          
          <Button 
            size="lg" 
            className="mt-8"
            onClick={() => navigate('/')}
          >
            ابدأ الآن
            <ArrowRight className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// مكون بطاقة الميزات
const FeatureCard = ({ title, description }: { title: string; description: string }) => {
  return (
    <div className="bg-card border rounded-lg p-6 hover:border-primary/40 transition-colors">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
};

export default IntroVideoPage;
