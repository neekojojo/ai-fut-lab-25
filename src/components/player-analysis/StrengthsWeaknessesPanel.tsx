
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, AlertCircle } from 'lucide-react';

interface StrengthsWeaknessesPanelProps {
  strengths: string[];
  weaknesses: string[];
}

const StrengthsWeaknessesPanel: React.FC<StrengthsWeaknessesPanelProps> = ({ 
  strengths = [], 
  weaknesses = [] 
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>نقاط القوة والضعف</CardTitle>
        <CardDescription>تحليل للنقاط الإيجابية ومجالات التحسين</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">نقاط القوة الرئيسية</h3>
            <div className="space-y-3">
              {strengths.map((strength, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-1 mr-3 flex-shrink-0 rtl:ml-3 rtl:mr-0">
                    <Check className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-lg">{strength}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">مجالات للتطوير</h3>
            <div className="space-y-3">
              {weaknesses.map((weakness, index) => (
                <div key={index} className="flex items-start">
                  <div className="mt-1 mr-3 flex-shrink-0 rtl:ml-3 rtl:mr-0">
                    <AlertCircle className="h-6 w-6 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-lg">{weakness}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StrengthsWeaknessesPanel;
