
import React from 'react';

interface FeaturesGridProps {
  isMobile?: boolean;
}

export const FeaturesGrid: React.FC<FeaturesGridProps> = ({ isMobile }) => {
  return (
    <div className={`grid grid-cols-1 ${isMobile ? 'gap-6' : 'md:grid-cols-3 gap-8'} max-w-4xl mx-auto animate-slide-up`}>
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
        title="Market Valuation"
        description="Get accurate player market value estimates based on comprehensive performance metrics and global player comparisons."
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
            <path d="M20.38 3.46 16 2a4 4 0 0 1 1.46 3.46" />
            <path d="M9.69 2.49 11 7.13c.38 1.13 0 2.38-.3 3.44-.37 1.32-.8 2.61-.7 4 .19 2.77 2.76 4.25 5 4.43 3.28.28 5-1.9 5-4.43 0-1.4-.5-2.75-.88-4.11-.41-1.44-.32-2.42.14-3.83L21 2.49a1 1 0 0 0-.5-1.32c-.83-.4-1.88-.9-2.88-1.13A4.49 4.49 0 0 0 16.5 0c-2.29 0-5 2-5.25 2.15A1 1 0 0 0 10.5 3c0 .3.34.38.53.4.17.01 3-.7 6 .17-2.07-.4-7.45 3.33-8.34 5.6" />
            <path d="M10.1 12.75c-.55 1.4-.85 3.46-1.6 5.25-.58 1.3-2 2.5-3.5 2a2.24 2.24 0 0 1-1.5-2c0-3.04 4.5-7.79 6-9.75" />
            <path d="M2 19.5C2 21.4 3.5 22 5 22c4 0 8.5-6 9-11.5" />
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
