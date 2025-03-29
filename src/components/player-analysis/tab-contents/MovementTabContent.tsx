
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NumberMovementChart from '@/components/NumberMovementChart';

interface MovementTabContentProps {
  analysis: any;
  onViewAdvanced: () => void;
}

const MovementTabContent: React.FC<MovementTabContentProps> = ({ analysis, onViewAdvanced }) => {
  // Create sample data for the movement charts
  const speedData = [
    { name: "0م", current: 0, previous: 0 },
    { name: "5م", current: 12, previous: 10 },
    { name: "10م", current: 18, previous: 15 },
    { name: "15م", current: 22, previous: 20 },
    { name: "20م", current: 19, previous: 17 },
    { name: "25م", current: 15, previous: 14 },
    { name: "30م", current: 10, previous: 8 }
  ];

  const accelerationData = [
    { name: "0ث", current: 0, previous: 0 },
    { name: "1ث", current: 4.2, previous: 3.8 },
    { name: "2ث", current: 3.8, previous: 3.5 },
    { name: "3ث", current: 2.5, previous: 2.2 },
    { name: "4ث", current: 1.8, previous: 1.5 },
    { name: "5ث", current: 0.9, previous: 0.8 }
  ];
  
  const movementPatternData = [
    { name: "0%", current: 5, previous: 3 },
    { name: "20%", current: 15, previous: 12 },
    { name: "40%", current: 25, previous: 18 },
    { name: "60%", current: 20, previous: 22 },
    { name: "80%", current: 30, previous: 25 },
    { name: "100%", current: 10, previous: 8 }
  ];
  
  const energyEfficiencyData = [
    { name: "0د", current: 100, previous: 100 },
    { name: "15د", current: 95, previous: 90 },
    { name: "30د", current: 90, previous: 82 },
    { name: "45د", current: 88, previous: 78 },
    { name: "60د", current: 85, previous: 73 },
    { name: "75د", current: 82, previous: 68 },
    { name: "90د", current: 80, previous: 65 }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">تحليل الحركة</h2>
        <Button 
          onClick={onViewAdvanced} 
          variant="outline"
          className="group hover:bg-primary/10"
        >
          عرض التحليل المتقدم
          <ArrowRightIcon className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
      
      <Tabs defaultValue="speed">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="speed">السرعة</TabsTrigger>
          <TabsTrigger value="acceleration">التسارع</TabsTrigger>
          <TabsTrigger value="patterns">أنماط الحركة</TabsTrigger>
          <TabsTrigger value="efficiency">كفاءة الطاقة</TabsTrigger>
        </TabsList>
        
        <TabsContent value="speed" className="mt-4">
          <NumberMovementChart
            title="تحليل السرعة"
            data={speedData}
            type="line"
            description="قياس السرعة خلال مسافات مختلفة، مقارنة بالأداء السابق"
          />
        </TabsContent>
        
        <TabsContent value="acceleration" className="mt-4">
          <NumberMovementChart
            title="تحليل التسارع"
            data={accelerationData}
            type="line"
            description="قياس التسارع خلال الثواني الأولى من الانطلاق، مقارنة بالأداء السابق"
          />
        </TabsContent>
        
        <TabsContent value="patterns" className="mt-4">
          <NumberMovementChart
            title="أنماط الحركة"
            data={movementPatternData}
            type="area"
            description="توزيع أنماط الحركة خلال المباراة، مقارنة بالأداء السابق"
          />
        </TabsContent>
        
        <TabsContent value="efficiency" className="mt-4">
          <NumberMovementChart
            title="كفاءة الطاقة"
            data={energyEfficiencyData}
            type="line"
            description="قياس كفاءة استهلاك الطاقة خلال فترات المباراة، مقارنة بالأداء السابق"
          />
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>ملخص تحليل الحركة</CardTitle>
          <CardDescription>
            تحليل الأداء الحركي يوضح تحسناً في عدة مجالات
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>• السرعة القصوى ارتفعت بنسبة 15% مقارنة بالتقييم السابق</p>
            <p>• معدل التسارع تحسن بشكل ملحوظ خلال الثواني الأولى</p>
            <p>• كفاءة الطاقة أفضل بنسبة 10% مما يدل على تحسن اللياقة البدنية</p>
            <p>• أنماط الحركة أصبحت أكثر فعالية وتوازناً خلال المباراة</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovementTabContent;
