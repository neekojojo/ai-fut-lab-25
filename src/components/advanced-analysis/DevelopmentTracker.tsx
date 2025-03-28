
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { PlayerAnalysis } from '@/types/playerAnalysis';
import { CHART_COLORS } from '@/components/charts/constants';
import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface DevelopmentTrackerProps {
  analyses: PlayerAnalysis[];
}

export const DevelopmentTracker: React.FC<DevelopmentTrackerProps> = ({ analyses }) => {
  const [timeframe, setTimeframe] = useState<'all' | 'recent'>('all');
  
  if (!analyses || analyses.length < 2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>تتبع التطور</CardTitle>
          <CardDescription>تحتاج إلى تحليلين على الأقل لعرض تطور اللاعب</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
            قم بإجراء المزيد من التحليلات لتتبع تطور اللاعب عبر الزمن
          </div>
        </CardContent>
      </Card>
    );
  }

  // تنظيم البيانات حسب التاريخ
  const formatDate = (timestamp: string) => {
    try {
      return format(parseISO(timestamp), 'dd MMM', { locale: ar });
    } catch (e) {
      return 'تاريخ غير صالح';
    }
  };

  // إنشاء بيانات لتتبع تطور المهارات الفنية
  const createTechnicalDevelopmentData = () => {
    return analyses.map(analysis => ({
      date: formatDate(analysis.timestamp),
      timestamp: analysis.timestamp,
      تمرير: analysis.stats?.passing || 0,
      تسديد: analysis.stats?.shooting || 0,
      مراوغة: analysis.stats?.dribbling || 0,
      دفاع: analysis.stats?.defending || 0,
      بدنية: analysis.stats?.physical || 0,
    }));
  };

  // إنشاء بيانات لتتبع تطور الأداء العام
  const createPerformanceDevelopmentData = () => {
    return analyses.map(analysis => ({
      date: formatDate(analysis.timestamp),
      timestamp: analysis.timestamp,
      تقني: analysis.performance?.technical || 0,
      بدني: analysis.performance?.physical || 0,
      تكتيكي: analysis.performance?.tactical || 0,
      ذهني: analysis.performance?.mental || 0,
      'التقييم العام': analysis.performanceScore || 0,
    }));
  };

  const technicalDevelopmentData = createTechnicalDevelopmentData();
  const performanceDevelopmentData = createPerformanceDevelopmentData();
  
  // استخدام البيانات بناءً على الفترة المحددة
  const getFilteredData = (data: any[]) => {
    if (timeframe === 'recent' && data.length > 5) {
      return data.slice(-5);
    }
    return data;
  };

  const filteredTechnicalData = getFilteredData(technicalDevelopmentData);
  const filteredPerformanceData = getFilteredData(performanceDevelopmentData);

  // حساب معدل التحسن
  const calculateImprovement = (metric: string) => {
    if (analyses.length < 2) return 0;
    
    const first = analyses[0];
    const last = analyses[analyses.length - 1];
    
    let firstValue = 0;
    let lastValue = 0;
    
    if (metric === 'overall') {
      firstValue = first.performanceScore || 0;
      lastValue = last.performanceScore || 0;
    } else if (['technical', 'physical', 'tactical', 'mental'].includes(metric)) {
      firstValue = first.performance?.[metric as keyof typeof first.performance] || 0;
      lastValue = last.performance?.[metric as keyof typeof last.performance] || 0;
    }
    
    return lastValue - firstValue;
  };

  const overallImprovement = calculateImprovement('overall');
  const technicalImprovement = calculateImprovement('technical');
  const physicalImprovement = calculateImprovement('physical');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start justify-between space-y-4 md:space-y-0">
        <div>
          <h3 className="text-lg font-medium">تتبع تطور اللاعب</h3>
          <p className="text-muted-foreground">عرض التقدم عبر {analyses.length} تحليل</p>
        </div>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <TabsList>
            <TabsTrigger
              value="all"
              onClick={() => setTimeframe('all')}
              className={timeframe === 'all' ? 'bg-primary text-primary-foreground' : ''}
            >
              كل الفترة
            </TabsTrigger>
            <TabsTrigger
              value="recent"
              onClick={() => setTimeframe('recent')}
              className={timeframe === 'recent' ? 'bg-primary text-primary-foreground' : ''}
            >
              آخر 5 تحليلات
            </TabsTrigger>
          </TabsList>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>التقييم العام</CardTitle>
              <Badge 
                variant="outline" 
                className={`${overallImprovement >= 0 ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}
              >
                {overallImprovement > 0 ? '+' : ''}{overallImprovement.toFixed(1)}
              </Badge>
            </div>
            <CardDescription>تطور الأداء العام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={filteredPerformanceData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="التقييم العام" 
                    stroke={CHART_COLORS.primary} 
                    fill={CHART_COLORS.primary} 
                    fillOpacity={0.2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>المهارات التقنية</CardTitle>
              <Badge 
                variant="outline" 
                className={`${technicalImprovement >= 0 ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}
              >
                {technicalImprovement > 0 ? '+' : ''}{technicalImprovement.toFixed(1)}
              </Badge>
            </div>
            <CardDescription>تطور المهارات الفنية</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={filteredPerformanceData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="تقني" 
                    stroke={CHART_COLORS.blue} 
                    fill={CHART_COLORS.blue} 
                    fillOpacity={0.2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>القدرات البدنية</CardTitle>
              <Badge 
                variant="outline" 
                className={`${physicalImprovement >= 0 ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'}`}
              >
                {physicalImprovement > 0 ? '+' : ''}{physicalImprovement.toFixed(1)}
              </Badge>
            </div>
            <CardDescription>تطور اللياقة والقوة</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={filteredPerformanceData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="بدني" 
                    stroke={CHART_COLORS.orange} 
                    fill={CHART_COLORS.orange} 
                    fillOpacity={0.2} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="technical">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="technical">تطور المهارات الفنية</TabsTrigger>
          <TabsTrigger value="performance">تطور الأداء العام</TabsTrigger>
        </TabsList>
        
        <TabsContent value="technical" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>تطور المهارات الفنية عبر الزمن</CardTitle>
              <CardDescription>تتبع تحسن المهارات الفنية المختلفة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredTechnicalData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="تمرير" 
                      stroke={CHART_COLORS.primary} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="تسديد" 
                      stroke={CHART_COLORS.blue} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="مراوغة" 
                      stroke={CHART_COLORS.green} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="دفاع" 
                      stroke={CHART_COLORS.orange} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="بدنية" 
                      stroke={CHART_COLORS.purple} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="performance" className="mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>تطور الأداء العام عبر الزمن</CardTitle>
              <CardDescription>تتبع تحسن المؤشرات الرئيسية للأداء</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={filteredPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="تقني" 
                      stroke={CHART_COLORS.primary} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="بدني" 
                      stroke={CHART_COLORS.blue} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="تكتيكي" 
                      stroke={CHART_COLORS.green} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="ذهني" 
                      stroke={CHART_COLORS.orange} 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="التقييم العام" 
                      stroke={CHART_COLORS.red} 
                      strokeWidth={3} 
                      dot={{ r: 5 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
