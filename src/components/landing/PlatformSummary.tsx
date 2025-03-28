
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { 
  Brain, 
  Target, 
  LineChart, 
  Zap,
  DollarSign
} from 'lucide-react';

interface PlatformSummaryProps {
  isMobile?: boolean;
}

const PlatformSummary: React.FC<PlatformSummaryProps> = ({ isMobile }) => {
  return (
    <Card className="border-0 shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className={`text-center mb-6 max-w-3xl mx-auto ${isMobile ? 'px-3' : 'px-6'}`}>
          <h2 className={`font-semibold ${isMobile ? 'text-xl mb-2' : 'text-2xl mb-3'}`}>
            Comprehensive AI-Powered Football Talent Analysis
          </h2>
          <p className={`text-muted-foreground ${isMobile ? 'text-sm' : 'text-base'}`}>
            FootballAI Analyzer is a powerful platform that uses artificial intelligence to evaluate football players
            with precision. Get detailed insights into technical skills, personalized development plans, and team compatibility analysis.
          </p>
        </div>

        <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'md:grid-cols-4 gap-6'}`}>
          <FeatureCard
            icon={<Brain className="w-5 h-5 text-primary" />}
            title="Advanced Video Analysis"
            description="AI-powered video analysis that evaluates technical skills, positioning, and physical attributes"
            isMobile={isMobile}
          />
          
          <FeatureCard
            icon={<Target className="w-5 h-5 text-primary" />}
            title="Team Fit Analysis"
            description="Evaluate how well a player matches team requirements and optimal positioning"
            isMobile={isMobile}
          />
          
          <FeatureCard
            icon={<Zap className="w-5 h-5 text-primary" />}
            title="Development Plans"
            description="AI-generated training recommendations and exercises tailored to player profiles"
            isMobile={isMobile}
          />

          <FeatureCard
            icon={<DollarSign className="w-5 h-5 text-primary" />}
            title="Market Valuation"
            description="Predict player market value based on performance metrics and growth potential"
            isMobile={isMobile}
          />
        </div>
      </CardContent>
    </Card>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isMobile?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, isMobile }) => {
  return (
    <div className={`rounded-lg border bg-card p-4 flex flex-col items-${isMobile ? 'start' : 'center'} ${isMobile ? 'text-left' : 'text-center'}`}>
      <div className="rounded-full bg-primary/10 p-2 mb-3">
        {icon}
      </div>
      <h3 className={`font-medium ${isMobile ? 'text-base' : 'text-lg'} mb-1`}>{title}</h3>
      <p className={`text-muted-foreground ${isMobile ? 'text-xs' : 'text-sm'}`}>{description}</p>
    </div>
  );
};

export default PlatformSummary;
