
import React from 'react';
import { ArrowDown, ArrowUp, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChartDescriptionProps {
  description?: string;
}

export const ChartDescription: React.FC<ChartDescriptionProps> = ({ description }) => {
  if (!description) return null;
  
  return (
    <p className="text-sm text-muted-foreground mb-4">{description}</p>
  );
};

interface ChartImprovementBadgeProps {
  improvement: number;
}

export const ChartImprovementBadge: React.FC<ChartImprovementBadgeProps> = ({ improvement }) => {
  if (improvement === 0) {
    return (
      <div className="flex items-center text-sm px-2 py-1 rounded bg-gray-100 text-gray-700">
        <Minus className="h-3 w-3 mr-1" />
        <span>0%</span>
      </div>
    );
  }
  
  const isPositive = improvement > 0;
  
  return (
    <div 
      className={cn(
        "flex items-center text-sm px-2 py-1 rounded",
        isPositive 
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
          : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      )}
    >
      {isPositive ? (
        <ArrowUp className="h-3 w-3 mr-1" />
      ) : (
        <ArrowDown className="h-3 w-3 mr-1" />
      )}
      <span>{isPositive ? '+' : ''}{improvement.toFixed(1)}%</span>
    </div>
  );
};

const ChartInfo: React.FC<{
  description?: string;
  improvement: number;
}> = ({ description, improvement }) => {
  return (
    <div className="space-y-2">
      <ChartDescription description={description} />
      <div className="flex justify-end">
        <ChartImprovementBadge improvement={improvement} />
      </div>
    </div>
  );
};

export default ChartInfo;
