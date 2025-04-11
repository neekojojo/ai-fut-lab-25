
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Clock, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppHeader from '@/components/layout/AppHeader';

const TrainingPlanPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader title="FIT LAB" />
      
      <main className="max-w-6xl mx-auto p-4">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">خطة تحسين نقاط الضعف</h1>
          <p className="text-slate-300">خطة تدريبية مخصصة تركز على تطوير نقاط الضعف لديك</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 w-full">
            <div className="bg-slate-900 p-3 rounded-lg">
              <p className="text-xs text-slate-400">نوع التدريب</p>
              <p className="font-semibold">مهاري</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg">
              <p className="text-xs text-slate-400">الشدة المتوسطة</p>
              <p className="font-semibold">متوسطة</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg">
              <p className="text-xs text-slate-400">المدة الإجمالية</p>
              <p className="font-semibold">45 دقيقة</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg">
              <p className="text-xs text-slate-400">نوع اللاعب</p>
              <p className="font-semibold">وسط</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg">
              <p className="text-xs text-slate-400">مدة الخطة</p>
              <p className="font-semibold">4 أسابيع</p>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg">
              <p className="text-xs text-slate-400">نقاط التطوير</p>
              <p className="font-semibold">كرة معلقة</p>
            </div>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold">خطة تحسين نقاط الضعف</h3>
                  <p className="text-sm text-slate-400">تركز على تطوير المهارات الأساسية والتركيز العقلي</p>
                </div>
                <Badge variant="outline" className="bg-purple-400/10 text-purple-400 border-purple-400/20">
                  3 أسابيع
                </Badge>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <span className="text-xs">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">الأسبوع 1</h4>
                    <p className="text-sm text-slate-400 mt-1">تطوير أساسيات المهارة وبناء القوة الأساسية</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <span className="text-xs">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">الأسبوع 2</h4>
                    <p className="text-sm text-slate-400 mt-1">زيادة شدة التمارين وإضافة تحديات جديدة</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <span className="text-xs">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">الأسبوع 3</h4>
                    <p className="text-sm text-slate-400 mt-1">تمارين متقدمة وتطبيقات عملية للمهارة</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">درجة الصعوبة</p>
                    <div className="mt-1 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <p className="text-sm">عالية</p>
                    </div>
                  </div>
                  <Button variant="purple" size="sm">
                    <span>عرض</span>
                    <ArrowRight className="h-4 w-4 mr-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold">خطة تدريب متوازنة</h3>
                  <p className="text-sm text-slate-400">تطوير متوازن للجوانب البدنية والمهارية والتكتيكية</p>
                </div>
                <Badge variant="outline" className="bg-amber-400/10 text-amber-400 border-amber-400/20">
                  4 أسابيع
                </Badge>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <span className="text-xs">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">الأسبوع 1</h4>
                    <p className="text-sm text-slate-400 mt-1">تقييم وتحديد نقاط القوة والضعف</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <span className="text-xs">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">الأسبوع 2</h4>
                    <p className="text-sm text-slate-400 mt-1">تدريبات اللياقة البدنية والقوة</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <span className="text-xs">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">الأسبوع 3</h4>
                    <p className="text-sm text-slate-400 mt-1">تدريبات المهارات التقنية والتكتيكية</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                    <span className="text-xs">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium">الأسبوع 4</h4>
                    <p className="text-sm text-slate-400 mt-1">تكامل المهارات وتطبيقات عملية</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">درجة الصعوبة</p>
                    <div className="mt-1 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <p className="text-sm">متوسطة</p>
                    </div>
                  </div>
                  <Button variant="purple" size="sm">
                    <span>عرض</span>
                    <ArrowRight className="h-4 w-4 mr-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TrainingPlanPage;
