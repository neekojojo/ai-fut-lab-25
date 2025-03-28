
import React from "react";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

interface ChartInfoProps {
  title: string;
  description?: string;
  improvement?: number;
  children?: React.ReactNode;
}

// Main component that combines description and improvement badge
const ChartInfo: React.FC<ChartInfoProps> = ({
  title,
  description,
  improvement,
  children,
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {improvement !== undefined && (
          <ChartImprovementBadge improvement={improvement} />
        )}
      </div>
      {description && <ChartDescription description={description} />}
      {children}
    </div>
  );
};

// Component to display the chart description
export const ChartDescription: React.FC<{ description?: string }> = ({
  description,
}) => {
  if (!description) return null;
  return <p className="text-sm text-muted-foreground mt-1">{description}</p>;
};

// Component to display the improvement badge
export const ChartImprovementBadge: React.FC<{ improvement: number }> = ({
  improvement,
}) => {
  if (improvement === 0) {
    return (
      <div className="flex items-center px-2 py-1 rounded bg-amber-100 text-amber-800">
        <Minus className="h-3 w-3 mr-1" />
        <span className="text-xs font-medium">No Change</span>
      </div>
    );
  }

  if (improvement > 0) {
    return (
      <div className="flex items-center px-2 py-1 rounded bg-green-100 text-green-800">
        <ArrowUp className="h-3 w-3 mr-1" />
        <span className="text-xs font-medium">+{improvement}%</span>
      </div>
    );
  }

  return (
    <div className="flex items-center px-2 py-1 rounded bg-red-100 text-red-800">
      <ArrowDown className="h-3 w-3 mr-1" />
      <span className="text-xs font-medium">{improvement}%</span>
    </div>
  );
};

export default ChartInfo;
