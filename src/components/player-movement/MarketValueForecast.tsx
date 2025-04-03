
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import ChartContainer from '@/utils/ui/chartContainer';

interface MarketValuePoint {
  month: string;
  value: number;
}

interface MarketValueForecastProps {
  playerName: string;
  position: string;
  currentValue: number; // القيمة الحالية بالدولار
  age: number;
  potential: number; // مؤشر الإمكانات من 0-100
}

const MarketValueForecast: React.FC<MarketValueForecastProps> = ({ 
  playerName, 
  position, 
  currentValue,
  age,
  potential
}) => {
  // إنشاء بيانات توقع القيمة السوقية على مدار سنتين (24 شهر)
  const generateForecastData = (): MarketValuePoint[] => {
    const data: MarketValuePoint[] = [];
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 
                    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    
    // عوامل التأثير على نمو القيمة
    const growthFactors = {
      // كلما كان اللاعب أصغر سنًا، كان معدل النمو أعلى
      ageFactor: age < 23 ? 1.5 : age < 27 ? 1.2 : age < 30 ? 1.0 : 0.8,
      
      // تأثير الإمكانات على النمو
      potentialFactor: potential / 100 + 0.5,
      
      // تأثير المركز (مثال: المهاجمون عادة أغلى)
      positionFactor: position.includes('مهاجم') ? 1.3 : 
                     position.includes('وسط') ? 1.2 : 
                     position.includes('حارس') ? 0.9 : 1.0
    };
    
    // معدل النمو الشهري المركب
    const monthlyGrowthRate = 0.01 * growthFactors.ageFactor * growthFactors.potentialFactor * growthFactors.positionFactor;
    
    // يضيف بيانات لكل شهر في السنتين القادمتين
    let currentVal = currentValue;
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    for (let i = 0; i < 24; i++) {
      // نمو متموج مع بعض التقلبات الواقعية
      const randomFactor = 0.97 + Math.random() * 0.06; // تقلب بين -3% و +3%
      currentVal = currentVal * (1 + monthlyGrowthRate) * randomFactor;
      
      data.push({
        month: `${months[currentMonth]} ${currentYear}`,
        value: Math.round(currentVal / 1000) * 1000 // تقريب إلى أقرب 1000
      });
      
      currentMonth++;
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }
    }
    
    return data;
  };

  const forecastData = generateForecastData();
  
  // تنسيق القيمة المالية بالدولار
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}K`;
    }
    return `$${value}`;
  };
  
  // حساب نسبة النمو المتوقعة
  const growthPercentage = ((forecastData[forecastData.length - 1].value - currentValue) / currentValue) * 100;
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
        <CardTitle>توقع القيمة السوقية</CardTitle>
        <CardDescription>
          توقع تطور القيمة السوقية للاعب <span className="font-bold">{playerName}</span> خلال السنتين القادمتين
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm">
            <span className="text-muted-foreground">القيمة الحالية:</span> {' '}
            <span className="font-semibold">{formatCurrency(currentValue)}</span>
          </div>
          <div className="text-sm">
            <span className="text-muted-foreground">القيمة المتوقعة بعد سنتين:</span> {' '}
            <span className="font-semibold">{formatCurrency(forecastData[forecastData.length - 1].value)}</span>
          </div>
          <div className={`text-sm font-semibold ${growthPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {growthPercentage >= 0 ? '+' : ''}{growthPercentage.toFixed(1)}%
          </div>
        </div>
        
        <ChartContainer>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
                interval={3} 
                angle={-45} 
                textAnchor="end"
                height={60}
              />
              <YAxis 
                tickFormatter={formatCurrency}
                width={80}
              />
              <Tooltip 
                formatter={(value: number) => [formatCurrency(value), 'القيمة السوقية']}
                labelFormatter={(label) => `الشهر: ${label}`}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#6366F1" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default MarketValueForecast;
