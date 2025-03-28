
import React from "react";

interface ChartInfoProps {
  improvement: string | null;
  description?: string;
}

export const ChartImprovementBadge: React.FC<{ improvement: string | null }> = ({ improvement }) => {
  if (!improvement) return null;
  
  return (
    <div className={`text-sm font-medium px-2 py-1 rounded-full ${parseFloat(improvement) >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
      {parseFloat(improvement) >= 0 ? '+' : ''}{improvement}% vs previous
    </div>
  );
};

export const ChartDescription: React.FC<{ description?: string }> = ({ description }) => {
  if (!description) return null;
  
  return (
    <p className="text-sm text-gray-500 mb-4">{description}</p>
  );
};

const ChartInfo: React.FC<ChartInfoProps> = ({ improvement, description }) => {
  return (
    <>
      {improvement && <ChartImprovementBadge improvement={improvement} />}
      {description && <ChartDescription description={description} />}
    </>
  );
};

export default ChartInfo;
