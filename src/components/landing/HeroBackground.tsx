
import React from 'react';

interface HeroBackgroundProps {
  imageSrc: string;
  className?: string;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ imageSrc, className = "" }) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Main stadium background with parallax */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background z-20"></div>
          <img 
            src={imageSrc} 
            alt=""
            className="absolute inset-0 h-[120%] w-[120%] object-cover opacity-60 animate-parallax-slow transform-gpu"
            style={{ transformOrigin: 'center center' }}
          />
        </div>
      </div>
      
      {/* Light ray effects */}
      <div className="absolute inset-0 z-10 opacity-30">
        <div className="absolute top-0 left-1/4 w-full h-full bg-gradient-to-b from-primary/20 to-transparent skew-x-12 animate-light-rays" style={{ transformOrigin: 'top center' }}></div>
        <div className="absolute top-0 right-1/4 w-full h-full bg-gradient-to-b from-primary/10 to-transparent -skew-x-12 animate-light-rays" style={{ animationDelay: '7s', transformOrigin: 'top center' }}></div>
      </div>
      
      {/* Floating orbs/particles */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/5 w-32 h-32 rounded-full bg-primary/10 blur-xl animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-24 h-24 rounded-full bg-primary/15 blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-20 h-20 rounded-full bg-primary/20 blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
};

export default HeroBackground;
