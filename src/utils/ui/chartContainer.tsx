
import React from 'react';

interface ChartContainerProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`chart-container bg-gradient-to-br from-white/80 to-white/50 dark:from-gray-900/50 dark:to-black/50 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-primary/10 ${className}`}>
      {title && <h3 className="text-lg font-medium mb-3 text-primary/90">{title}</h3>}
      <div className="w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default ChartContainer;
