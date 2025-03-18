
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

interface PlanItem {
  text: string;
  completed?: boolean;
}

interface DevelopmentPlanListProps {
  title?: string;
  items: PlanItem[];
  approvedBy?: string;
}

const DevelopmentPlanList: React.FC<DevelopmentPlanListProps> = ({ 
  title = "Development Plan",
  items,
  approvedBy 
}) => {
  return (
    <Card className="w-full bg-[#1e2030] text-white border-none shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-[#a8a8b2] mr-1">•</span>
              <span className="text-[#d1d1e2]">{item.text}</span>
            </li>
          ))}
        </ul>
        
        {approvedBy && (
          <div className="mt-6 flex items-center gap-2 text-[#8ce99a]">
            <CheckCircle size={18} />
            <p className="text-sm">{approvedBy} approved the plan</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DevelopmentPlanList;
