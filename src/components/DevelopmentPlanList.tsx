
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Activity } from 'lucide-react';

interface PlanItem {
  text: string;
  completed?: boolean;
}

interface TrainingDrill {
  name: string;
  description: string;
}

interface DevelopmentPlanListProps {
  title?: string;
  items: PlanItem[];
  approvedBy?: string;
  trainingDrills?: TrainingDrill[];
}

const DevelopmentPlanList: React.FC<DevelopmentPlanListProps> = ({ 
  title = "Development Plan",
  items,
  approvedBy,
  trainingDrills = [
    { name: "Passing Triangle Drill", description: "Improve quick passing and movement" },
    { name: "Finishing Exercise", description: "Work on shot accuracy and power" },
    { name: "Defensive Positioning", description: "Practice proper defensive stance and movement" }
  ]
}) => {
  return (
    <Card className="w-full bg-[#1e293b] text-white border-none shadow-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Development Items</h3>
          <ul className="space-y-4">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-[#a8b3cf] mr-1">•</span>
                <span className="text-[#d1d8e6]">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-3">Training Drills</h3>
          <div className="space-y-3">
            {trainingDrills.map((drill, index) => (
              <div key={index} className="border border-[#2e3b52] rounded-md p-3">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-[#84cc16]" />
                  <h4 className="font-medium">{drill.name}</h4>
                </div>
                <p className="text-sm text-[#a8b3cf] mt-1">{drill.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {approvedBy && (
          <div className="mt-4 flex items-center gap-2 text-[#84cc16]">
            <CheckCircle size={18} />
            <p className="text-sm">{approvedBy} approved the plan</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DevelopmentPlanList;
