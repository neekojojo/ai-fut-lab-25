
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, BarChart2, Dumbbell, Target } from "lucide-react";

interface StatsOverviewCardProps {
  title: string;
  value: number;
  change: number;
  type: "performance" | "fitness" | "training" | "progress";
  expandedView?: boolean;
}

const StatsOverviewCard: React.FC<StatsOverviewCardProps> = ({
  title,
  value,
  change,
  type,
  expandedView = false
}) => {
  const formatValue = (val: number): string => {
    if (val > 100) {
      return val.toLocaleString();
    }
    return `${val}%`;
  };

  const getIcon = () => {
    switch (type) {
      case "performance":
        return <BarChart2 className="h-5 w-5 text-primary" />;
      case "fitness":
        return <Dumbbell className="h-5 w-5 text-indigo-500" />;
      case "training":
        return <Target className="h-5 w-5 text-emerald-500" />;
      case "progress":
        return <BarChart2 className="h-5 w-5 text-amber-500" />;
      default:
        return <BarChart2 className="h-5 w-5 text-primary" />;
    }
  };

  const getChangeColor = (changeVal: number): string => {
    return changeVal >= 0 
      ? "text-emerald-500" 
      : "text-rose-500";
  };

  return (
    <Card className={`${expandedView ? 'col-span-2 md:col-span-2 row-span-2' : ''}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {getIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{formatValue(value)}</div>
        <div className={`flex items-center text-xs mt-1 ${getChangeColor(change)}`}>
          {change >= 0 ? (
            <ArrowUp className="h-4 w-4 ml-1" />
          ) : (
            <ArrowDown className="h-4 w-4 ml-1" />
          )}
          <span>{Math.abs(change)}% {change >= 0 ? 'زيادة' : 'انخفاض'}</span>
        </div>
        
        {expandedView && (
          <div className="mt-4 space-y-2">
            <div className="h-2 bg-secondary rounded-full mt-4">
              <div 
                className="h-full bg-primary rounded-full" 
                style={{ width: `${Math.min(value, 100)}%` }}
              ></div>
            </div>
            <div className="flex text-xs text-muted-foreground justify-between">
              <div>التقدم الحالي</div>
              <div>{Math.min(value, 100)}%</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsOverviewCard;
