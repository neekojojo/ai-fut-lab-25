
import React, { useState } from 'react';
import { FileText, Share, Info } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AppHeader from '@/components/layout/AppHeader';

const ClubCompatibilityPage = () => {
  const [selectedClub, setSelectedClub] = useState('Manchester City');
  const [selectedPosition, setSelectedPosition] = useState('مهاجم');
  
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <AppHeader title="FIT LAB" />
      
      <main className="max-w-6xl mx-auto p-4">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">المقارنة مع لاعب محترف</h1>
          <p className="text-slate-300">تحليل مدى توافقك مع أسلوب لعب الأندية العالمية</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 p-6 rounded-lg border border-slate-800">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">المقارنة مع لاعب محترف</h2>
                <p className="text-sm text-slate-400">قم بتحليل أسلوب لعبك مقارنة بأفضل اللاعبين العالميين في مركزك</p>
              </div>
              <Info className="h-5 w-5 text-slate-400" />
            </div>
            
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-slate-400 mb-1 block">جميع المراكز</label>
                <Select value={selectedPosition} onValueChange={setSelectedPosition}>
                  <SelectTrigger className="bg-slate-800 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="مهاجم">مهاجم</SelectItem>
                    <SelectItem value="وسط">وسط</SelectItem>
                    <SelectItem value="مدافع">مدافع</SelectItem>
                    <SelectItem value="حارس">حارس مرمى</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm text-slate-400 mb-1 block">نوع الملعب</label>
                <Select defaultValue="all">
                  <SelectTrigger className="bg-slate-800 border-slate-700">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الملاعب</SelectItem>
                    <SelectItem value="grass">عشب طبيعي</SelectItem>
                    <SelectItem value="artificial">عشب صناعي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-3">اختر النادي</h3>
              <Select value={selectedClub} onValueChange={setSelectedClub}>
                <SelectTrigger className="bg-slate-800 border-slate-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manchester City">Manchester City (مان سيتي)</SelectItem>
                  <SelectItem value="Real Madrid">Real Madrid (ريال مدريد)</SelectItem>
                  <SelectItem value="Barcelona">Barcelona (برشلونة)</SelectItem>
                  <SelectItem value="Bayern Munich">Bayern Munich (بايرن ميونخ)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-slate-900 to-slate-950 p-6 rounded-lg border border-slate-800">
            <div className="flex justify-center mb-6">
              <div className="bg-red-500 text-white h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold">
                90%
              </div>
            </div>
            
            <h3 className="text-center text-xl font-bold mb-2">نسبة التوافق</h3>
            <p className="text-center text-sm text-slate-400 mb-6">درجة توافقك مع أسلوب اللعب</p>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>تقنية</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>سرعة</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>تكتيكية</span>
                  <span>88%</span>
                </div>
                <Progress value={88} className="h-2" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 p-6 rounded-lg border border-slate-800">
          <h3 className="text-xl font-bold mb-4">مقارنة المهارات</h3>
          
          <div className="space-y-6">
            <div className="space-y-1">
              <label className="text-sm">التقنية</label>
              <div className="relative h-2 bg-slate-700 rounded-full">
                <div className="absolute inset-y-0 left-0 bg-white rounded-full" style={{ width: '90%' }}></div>
                <div className="absolute inset-y-0 -top-1 h-4 w-1 bg-white rounded-full" style={{ left: '86%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>أنت: 90%</span>
                <span>Kevin De Bruyne: 86%</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm">السرعة</label>
              <div className="relative h-2 bg-slate-700 rounded-full">
                <div className="absolute inset-y-0 left-0 bg-white rounded-full" style={{ width: '84%' }}></div>
                <div className="absolute inset-y-0 -top-1 h-4 w-1 bg-white rounded-full" style={{ left: '93%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>أنت: 84%</span>
                <span>Kevin De Bruyne: 93%</span>
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm">المرونة</label>
              <div className="relative h-2 bg-slate-700 rounded-full">
                <div className="absolute inset-y-0 left-0 bg-white rounded-full" style={{ width: '88%' }}></div>
                <div className="absolute inset-y-0 -top-1 h-4 w-1 bg-white rounded-full" style={{ left: '89%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>أنت: 88%</span>
                <span>Kevin De Bruyne: 89%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClubCompatibilityPage;
