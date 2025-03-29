
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/layout/Footer';
import IndexContent from '@/components/index/IndexContent';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <IndexContent />
      <Footer />
    </div>
  );
};

export default Index;
