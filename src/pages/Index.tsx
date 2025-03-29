
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/layout/Footer';
import IndexContent from '@/components/index/IndexContent';
import HeroBackground from '@/components/landing/HeroBackground';

// Stadium background image (replace with your own uploaded image path)
const STADIUM_BG = "/stadium.jpg";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Dynamic background with stadium image */}
      <HeroBackground imageSrc={STADIUM_BG} />
      
      {/* Content layer */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <IndexContent />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
