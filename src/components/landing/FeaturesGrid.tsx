
import React from 'react';

interface FeaturesGridProps {
  isMobile?: boolean;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ isMobile }) => {
  return (
    <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-2 gap-8'} max-w-4xl mx-auto animate-slide-up`}>
      <FeatureCard 
        title="Technical Analysis"
        description="Our AI evaluates passing accuracy, shooting power, dribbling skills, and positioning with professional precision."
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-primary"
          >
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
          </svg>
        }
        isMobile={isMobile}
      />
      
      <FeatureCard 
        title="Detailed Reporting"
        description="Receive comprehensive data-driven reports with actionable insights for player development and recruitment decisions."
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-primary"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        }
        isMobile={isMobile}
      />
    </div>
  );
};

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isMobile?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, isMobile }) => {
  return (
    <div className={`flex flex-col items-center text-center space-y-2 ${isMobile ? 'p-3' : 'p-4'}`}>
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
        {icon}
      </div>
      <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium`}>{title}</h3>
      <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-muted-foreground`}>
        {description}
      </p>
    </div>
  );
};
