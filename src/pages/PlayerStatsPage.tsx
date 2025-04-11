
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import AppHeader from '@/components/layout/AppHeader';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const COLORS = ['#10B981', '#6366F1', '#8B5CF6', '#EC4899'];

const SpeedDistributionTab = () => {
  const data = [
    { name: 'مشي', value: 20 },
    { name: 'جري خفيف', value: 45 },
    { name: 'جري', value: 25 },
    { name: 'سرعة قصوى', value: 10 }
  ];
  
  return (
    <div className="bg-slate-900 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-2">توزيع السرعة</h2>
      <p className="text-sm text-slate-400 mb-6">توزيع نسب السرعات المختلفة خلال المباراة</p>
      
      <div className="flex justify-center">
        <div className="w-full max-w-sm h-64 flex justify-center items-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 25 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  
                  return (
                    <text
                      x={x}
                      y={y}
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      fill="#fff"
                      fontSize={12}
                    >
                      {data[index].name} ({value}%)
                    </text>
                  );
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="flex justify-center mt-6">
        <div className="grid grid-cols-4 gap-2">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center">
              <div className="w-3 h-3 rounded-full mr-1" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
              <span className="text-xs">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PerformanceStatsTab = () => {
  const data = [
    { name: 'تقنية', value: 12 },
    { name: 'بدنية', value: 16 },
    { name: 'تكتيكية', value: 8 },
    { name: 'ذهنية', value: 12 }
  ];
  
  return (
    <div className="bg-slate-900 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-2">الإحصائيات العامة</h2>
      <p className="text-sm text-slate-400 mb-6">مؤشرات الأداء العامة للاعب</p>
      
      <div className="flex justify-center">
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: 'none' }}
                labelStyle={{ color: '#fff' }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const PlayerStatsPage = () => {
  const [activeTab, setActiveTab] = useState('speed');
  const [timeFilter, setTimeFilter] = useState('all');
  const [playerFilter, setPlayerFilter] = useState('current');
  
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader title="FIT LAB" />
      
      <main className="max-w-5xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">نظرة عامة على اللاعبين المهمين</h1>
          <p className="text-slate-300">تحليل إحصائي متقدم للأداء والمؤشرات</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">تصفية حسب الفترة</label>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفترات</SelectItem>
                <SelectItem value="today">اليوم</SelectItem>
                <SelectItem value="week">الأسبوع الماضي</SelectItem>
                <SelectItem value="month">الشهر الماضي</SelectItem>
                <SelectItem value="year">السنة الماضية</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs text-slate-400 mb-1 block">نوع التحليل</label>
            <Select defaultValue="performance">
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="performance">إحصائيات الأداء</SelectItem>
                <SelectItem value="technical">تحليل فني</SelectItem>
                <SelectItem value="physical">تحليل بدني</SelectItem>
                <SelectItem value="tactical">تحليل تكتيكي</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-xs text-slate-400 mb-1 block">مقارنة مع</label>
            <Select value={playerFilter} onValueChange={setPlayerFilter}>
              <SelectTrigger className="bg-slate-800 border-slate-700">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">اللاعب الحالي</SelectItem>
                <SelectItem value="team-avg">متوسط الفريق</SelectItem>
                <SelectItem value="league-avg">متوسط الدوري</SelectItem>
                <SelectItem value="professional">لاعب محترف</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-slate-900 border-b border-slate-800 p-0 h-auto mb-6 w-full rounded-none">
            <TabsTrigger 
              value="speed"
              className="flex-1 py-3 rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:bg-slate-900 data-[state=active]:shadow-none data-[state=inactive]:border-transparent"
            >
              توزيع السرعة
            </TabsTrigger>
            <TabsTrigger 
              value="performance"
              className="flex-1 py-3 rounded-none border-b-2 data-[state=active]:border-primary data-[state=active]:bg-slate-900 data-[state=active]:shadow-none data-[state=inactive]:border-transparent"
            >
              إحصائيات الأداء
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="speed">
            <SpeedDistributionTab />
          </TabsContent>
          
          <TabsContent value="performance">
            <PerformanceStatsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PlayerStatsPage;
