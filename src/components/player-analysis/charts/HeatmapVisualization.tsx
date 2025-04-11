
import React from 'react';

const HeatmapVisualization: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      {/* Football pitch background */}
      <div className="absolute inset-0 border-2 border-green-800 bg-green-600/20 rounded-lg overflow-hidden">
        {/* Center circle */}
        <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-white/70 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Center line */}
        <div className="absolute top-0 left-1/2 h-full w-0.5 bg-white/70 transform -translate-x-1/2"></div>
        
        {/* Penalty areas */}
        <div className="absolute top-1/2 left-0 w-16 h-32 border-2 border-white/70 border-l-0 transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-16 h-32 border-2 border-white/70 border-r-0 transform -translate-y-1/2"></div>
        
        {/* Goal areas */}
        <div className="absolute top-1/2 left-0 w-5 h-12 border-2 border-white/70 border-l-0 transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-5 h-12 border-2 border-white/70 border-r-0 transform -translate-y-1/2"></div>
        
        {/* Penalty spots */}
        <div className="absolute top-1/2 left-12 w-1 h-1 bg-white/70 rounded-full transform -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-12 w-1 h-1 bg-white/70 rounded-full transform -translate-y-1/2"></div>
        
        {/* Heatmap data (sample) */}
        <div className="absolute top-[30%] left-[40%] w-36 h-36 bg-red-500/30 rounded-full blur-xl"></div>
        <div className="absolute top-[60%] left-[30%] w-24 h-24 bg-red-500/40 rounded-full blur-xl"></div>
        <div className="absolute top-[40%] left-[60%] w-32 h-32 bg-red-500/20 rounded-full blur-xl"></div>
        <div className="absolute top-[50%] left-[50%] w-48 h-48 bg-red-500/50 rounded-full blur-xl"></div>
      </div>
      
      <div className="absolute bottom-2 right-2 flex items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500/20 rounded-full"></div>
          <span className="text-xs">قليل</span>
        </div>
        <div className="mx-2">-</div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500/50 rounded-full"></div>
          <span className="text-xs">كثير</span>
        </div>
      </div>
    </div>
  );
};

export default HeatmapVisualization;
