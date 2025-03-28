
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PlayerAnalysis } from '@/components/AnalysisReport.d';
import { Loader2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AnalysesTabProps {
  analyses: PlayerAnalysis[];
  isLoading?: boolean;
}

const AnalysesTab: React.FC<AnalysesTabProps> = ({ analyses, isLoading = false }) => {
  const navigate = useNavigate();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="mr-2">جاري تحميل التحليلات...</span>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-none shadow-md bg-gradient-to-br from-gray-50 to-white dark:from-gray-900/50 dark:to-black/50">
        <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent pb-2">
          <CardTitle className="text-2xl font-bold text-gradient-to-r from-primary to-primary-foreground/80">تحليلات الأداء</CardTitle>
          <CardDescription>جميع تحليلات اللاعبين الخاصة بك</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {analyses.length > 0 ? (
            <div className="space-y-4">
              {analyses.map((analysis, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-300 border border-primary/10 group">
                  <div className="p-6 relative">
                    <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent"></div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{analysis.playerName}</h3>
                        <Badge variant="outline" className="mt-1">{analysis.position}</Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-primary">{analysis.marketValue}</p>
                        <p className="text-sm text-muted-foreground">القيمة السوقية</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">تقني</p>
                        <Progress value={analysis.performance.technical} className="h-2 mt-1" 
                          style={{background: 'linear-gradient(to right, #e2e8f0, #cbd5e1)'}}
                        />
                        <p className="text-xs text-right mt-1">{analysis.performance.technical}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">بدني</p>
                        <Progress value={analysis.performance.physical} className="h-2 mt-1"
                          style={{background: 'linear-gradient(to right, #e2e8f0, #cbd5e1)'}}
                        />
                        <p className="text-xs text-right mt-1">{analysis.performance.physical}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">تكتيكي</p>
                        <Progress value={analysis.performance.tactical} className="h-2 mt-1"
                          style={{background: 'linear-gradient(to right, #e2e8f0, #cbd5e1)'}}
                        />
                        <p className="text-xs text-right mt-1">{analysis.performance.tactical}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">ذهني</p>
                        <Progress value={analysis.performance.mental} className="h-2 mt-1"
                          style={{background: 'linear-gradient(to right, #e2e8f0, #cbd5e1)'}}
                        />
                        <p className="text-xs text-right mt-1">{analysis.performance.mental}%</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/movement-analysis`)} 
                        className="group-hover:bg-primary/10 transition-colors group-hover:text-primary">
                        <span>عرض التحليل الكامل</span>
                        <ArrowRight className="mr-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gradient-to-r from-gray-50 to-white dark:from-gray-900/30 dark:to-black/30 rounded-lg border border-dashed border-primary/20">
              <p className="text-muted-foreground mb-4">لم تقم بإجراء أي تحليلات بعد</p>
              <Button onClick={() => navigate('/')} className="bg-gradient-to-r from-primary to-primary/80 hover:opacity-90">قم بإجراء تحليلك الأول</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalysesTab;
