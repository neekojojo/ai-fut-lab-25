
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, ChevronRight, Plus, ChevronDown, ChevronUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import AppHeader from '@/components/layout/AppHeader';

interface ExerciseItem {
  id: string;
  title: string;
  description: string;
  intensity: string;
  duration: string;
  points: number;
  category: 'تقني' | 'بدني' | 'تكتيكي' | 'ذهني' | 'سرعة' | 'قوة';
}

const FitLabPage = () => {
  const [exercises, setExercises] = useState<ExerciseItem[]>([
    {
      id: '1',
      title: 'تمرين تمرير كرة',
      description: 'تمارين تحسين دقة التمرير والتحكم في الكرة',
      intensity: 'متوسطة',
      duration: '20 دقيقة',
      points: 20,
      category: 'تقني'
    },
    {
      id: '2',
      title: 'لياقة بدنية عالية',
      description: 'تمارين تطوير السرعة والقدرة على التحمل',
      intensity: 'عالية',
      duration: '30 دقيقة',
      points: 35,
      category: 'بدني'
    },
    {
      id: '3',
      title: 'تحركات تكتيكية',
      description: 'تمارين لتحسين الوعي التكتيكي والتمركز في الملعب',
      intensity: 'متوسطة',
      duration: '25 دقيقة',
      points: 30,
      category: 'تكتيكي'
    },
    {
      id: '4',
      title: 'سرعة ورشاقة',
      description: 'تمارين تحسين سرعة الانطلاق والرشاقة في تغيير الاتجاه',
      intensity: 'عالية',
      duration: '15 دقيقة',
      points: 25,
      category: 'سرعة'
    },
    {
      id: '5',
      title: 'قوة العضلات',
      description: 'تمارين تقوية عضلات الجسم لتحسين الأداء',
      intensity: 'عالية',
      duration: '30 دقيقة',
      points: 35,
      category: 'قوة'
    },
    {
      id: '6',
      title: 'تحمل ذهني',
      description: 'تدريبات لتحسين التركيز والثبات الذهني',
      intensity: 'متوسطة',
      duration: '20 دقيقة',
      points: 25,
      category: 'ذهني'
    }
  ]);

  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getBadgeColor = (category: string) => {
    switch(category) {
      case 'تقني': return 'bg-amber-500 hover:bg-amber-600';
      case 'بدني': return 'bg-red-500 hover:bg-red-600';
      case 'تكتيكي': return 'bg-purple-500 hover:bg-purple-600';
      case 'ذهني': return 'bg-green-500 hover:bg-green-600';
      case 'سرعة': return 'bg-blue-500 hover:bg-blue-600';
      case 'قوة': return 'bg-orange-500 hover:bg-orange-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader title="FIT LAB" />
      
      <main className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">تمرينات مقترحة</h1>
          <Button variant="purple" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            إضافة تمرين
          </Button>
        </div>
        
        <div className="space-y-4">
          {exercises.map(exercise => (
            <Card key={exercise.id} className="bg-slate-900 border-slate-700 overflow-hidden">
              <div 
                className="p-4 flex items-start justify-between cursor-pointer"
                onClick={() => toggleExpand(exercise.id)}
              >
                <div>
                  <div className="flex items-center">
                    <h3 className="text-lg font-medium">{exercise.title}</h3>
                    <Badge className={`ml-2 ${getBadgeColor(exercise.category)}`}>
                      {exercise.category}
                    </Badge>
                  </div>
                  <p className="text-slate-400 text-sm">{exercise.description}</p>
                </div>
                
                <div className="flex items-center">
                  <div className="text-center mr-4 bg-slate-800 px-2 py-1 rounded">
                    <p className="text-sm font-bold text-primary">{exercise.points}+</p>
                    <p className="text-xs text-slate-400">نقطة</p>
                  </div>
                  {expandedItems[exercise.id] ? 
                    <ChevronUp className="h-5 w-5 text-slate-400" /> : 
                    <ChevronDown className="h-5 w-5 text-slate-400" />
                  }
                </div>
              </div>
              
              {expandedItems[exercise.id] && (
                <CardContent className="bg-slate-800/50 pt-4 border-t border-slate-700">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-sm text-slate-400">المدة</p>
                      <p className="font-medium">{exercise.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">الشدة</p>
                      <p className="font-medium">{exercise.intensity}</p>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    عرض التفاصيل
                  </Button>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
        
        <div className="flex justify-between mt-8">
          <p className="text-slate-400">إجمالي التمرينات: {exercises.length}</p>
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Button variant="outline" size="sm">
              تصفية
            </Button>
            <Button variant="purple" size="sm">
              إنشاء خطة
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FitLabPage;
