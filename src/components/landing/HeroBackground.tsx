
import React from 'react';

interface HeroBackgroundProps {
  imageSrc?: string;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ imageSrc }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background image with overlay */}
      {imageSrc && (
        <div className="absolute inset-0 z-0">
          <img
            src={imageSrc}
            alt="Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
        </div>
      )}
      
      {/* Animated gradient circles */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl opacity-30 animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-3xl opacity-30 animate-blob animation-delay-4000" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]" />
    </div>
  );
};

export default HeroBackground;
