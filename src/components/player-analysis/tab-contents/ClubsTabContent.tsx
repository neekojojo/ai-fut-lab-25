
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayerAnalysis } from '@/types/playerAnalysis';
import MarketValueForecast from '@/components/player-movement/MarketValueForecast';

interface ClubsTabContentProps {
  playerAnalysis: PlayerAnalysis;
}

const ClubsTabContent: React.FC<ClubsTabContentProps> = ({ playerAnalysis }) => {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h2 className="text-xl font-bold">تقييم السوق والأندية المناسبة</h2>
        <p className="text-muted-foreground">
          اكتشف القيمة السوقية المتوقعة والأندية التي تناسب أسلوب لعبك
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <MarketValueForecast playerAnalysis={playerAnalysis} />
        
        <Card>
          <CardHeader>
            <CardTitle>الأندية المناسبة</CardTitle>
            <CardDescription>
              الأندية التي تتناسب مع مهاراتك وأسلوب لعبك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">
                بناءً على تحليل أدائك، هذه الأندية قد تكون مناسبة لأسلوب لعبك ومهاراتك الحالية:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-3"></div>
                  <h3 className="font-medium">الأهلي</h3>
                  <p className="text-xs text-muted-foreground">توافق عالي - 87%</p>
                </div>
                <div className="border rounded-lg p-4 flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-3"></div>
                  <h3 className="font-medium">الهلال</h3>
                  <p className="text-xs text-muted-foreground">توافق جيد - 82%</p>
                </div>
                <div className="border rounded-lg p-4 flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-3"></div>
                  <h3 className="font-medium">النصر</h3>
                  <p className="text-xs text-muted-foreground">توافق متوسط - 75%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ClubsTabContent;
