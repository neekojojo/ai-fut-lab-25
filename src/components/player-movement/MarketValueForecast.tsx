
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import ChartContainer from '@/utils/ui/chartContainer';
import { 
  generateMarketValueForecast, 
  formatCurrency,
  getMarketValueFactors
} from '@/utils/market/marketValuePredictor';
import { PlayerAnalysis } from '@/types/playerAnalysis';
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

interface MarketValueForecastProps {
  playerAnalysis: PlayerAnalysis;
}

const MarketValueForecast: React.FC<MarketValueForecastProps> = ({ playerAnalysis }) => {
  // Generate market value forecast
  const { 
    currentValue, 
    forecastData, 
    growthPercentage 
  } = generateMarketValueForecast(playerAnalysis);
  
  // Get factors affecting market value
  const valueFactors = getMarketValueFactors(playerAnalysis);
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/5 to-transparent">
        <CardTitle>توقع القيمة السوقية</CardTitle>
        <CardDescription>
          توقع تطور القيمة السوقية للاعب <span className="font-bold">{playerAnalysis.playerName}</span> خلال السنتين القادمتين
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
        
        <div className="mt-6">
          <h3 className="text-sm font-semibold mb-3">العوامل المؤثرة على القيمة السوقية:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {valueFactors.map((factor, index) => (
              <div 
                key={index} 
                className={`flex items-start p-3 rounded-md border ${
                  factor.impact === 'positive' ? 'border-green-200 bg-green-50' : 
                  factor.impact === 'negative' ? 'border-red-200 bg-red-50' : 
                  'border-gray-200 bg-gray-50'
                }`}
              >
                <span className="mr-2 mt-0.5">
                  {factor.impact === 'positive' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : factor.impact === 'negative' ? (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-gray-600" />
                  )}
                </span>
                <div>
                  <p className="font-medium text-sm">{factor.factor}</p>
                  <p className="text-xs text-muted-foreground">{factor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-md border border-blue-200">
          <h3 className="text-sm font-semibold mb-2">توصيات لزيادة القيمة السوقية:</h3>
          <ul className="text-xs space-y-1 list-disc list-inside text-muted-foreground">
            <li>التركيز على تحسين المهارات الأساسية المرتبطة بالمركز</li>
            <li>زيادة التواجد في المباريات الرسمية لاكتساب الخبرة</li>
            <li>التدريب على المهارات المميزة التي تجذب انتباه الكشافين</li>
            <li>الحفاظ على اللياقة البدنية وتجنب الإصابات</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketValueForecast;
