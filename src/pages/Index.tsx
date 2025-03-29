
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/layout/Footer';
import IndexContent from '@/components/index/IndexContent';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 bg-background animated-bg z-0" 
           style={{backgroundImage: 'linear-gradient(135deg, hsl(222, 47%, 11%), hsl(262, 83%, 15%), hsl(217, 32%, 17%))'}} />
      
      {/* Decorative circles */}
      <div className="fixed top-20 right-20 w-96 h-96 rounded-full bg-primary/10 animate-float blur-3xl z-0"></div>
      <div className="fixed bottom-20 left-20 w-80 h-80 rounded-full bg-primary/5 animate-float blur-3xl z-0" 
           style={{animationDelay: '2s'}}></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-primary/5 animate-spin-slow blur-3xl opacity-30 z-0"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <IndexContent />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
