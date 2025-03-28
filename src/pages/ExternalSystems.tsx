
import React from 'react';
import Header from '@/components/Header';
import ExternalSystemsIntegration from '@/components/integration/ExternalSystemsIntegration';

const ExternalSystems: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto py-6">
        <ExternalSystemsIntegration />
      </main>
    </div>
  );
};

export default ExternalSystems;
