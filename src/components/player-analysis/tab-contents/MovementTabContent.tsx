
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, TrendingUp } from "lucide-react";
import MovementPanel from '../MovementPanel';
import MovementAnalysis from '@/components/MovementAnalysis';

interface MovementTabContentProps {
  analysis: any;
  onViewAdvanced: () => void;
}

const MovementTabContent: React.FC<MovementTabContentProps> = ({ analysis, onViewAdvanced }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-2xl font-bold">{analysis.playerName || 'اللاعب'}</h2>
          <p className="text-muted-foreground">{analysis.position || 'وسط'} • تحليل الحركة</p>
        </div>
        <Button onClick={onViewAdvanced} variant="default" className="gap-2">
          <span>عرض التحليل المتقدم</span>
          <ArrowRightIcon className="h-4 w-4 rtl:rotate-180" />
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>نظرة عامة على الحركة</CardTitle>
          <CardDescription>
            تحليل أنماط الحركة وملامح الأداء الرئيسية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 md:items-center">
            <div className="flex-1">
              <MovementPanel analysis={analysis} />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <MovementAnalysis analysis={analysis} />
      
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>تطور الكفاءة الحركية</CardTitle>
              <CardDescription>تقدم مستوى الحركة مقارنة بالتحليل السابق</CardDescription>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>+5.7% مقارنة بالسابق</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border-t pt-4 mt-2">
            <h4 className="font-medium mb-2">ملاحظات من المدرب</h4>
            <p className="text-sm text-muted-foreground">
              {analysis.coachNotes || "أظهر اللاعب تحسناً ملحوظاً في الاستجابة الحركية والتوازن أثناء تغيير الاتجاه. يحتاج إلى مزيد من العمل على السرعة القصوى والتسارع في المساحات المفتوحة."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MovementTabContent;
