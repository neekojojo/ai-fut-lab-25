
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/layout/Footer';
import IndexContent from '@/components/index/IndexContent';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <IndexContent navigate={navigate} isMobile={isMobile} />
      <Footer />
    </div>
  );
};

export default Index;
