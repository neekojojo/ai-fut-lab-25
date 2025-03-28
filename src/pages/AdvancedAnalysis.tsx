
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header';
import AdvancedPlayerDashboard from '@/components/advanced-analysis/AdvancedPlayerDashboard';
import { PlayerAnalysis } from '@/types/playerAnalysis';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { analyzeFootballVideo } from '@/utils/analysis';
import { fetchPlayerAnalyses } from '@/services/playerAnalysisService';

const AdvancedAnalysis: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [analysis, setAnalysis] = useState<PlayerAnalysis | null>(null);
  const [previousAnalyses, setPreviousAnalyses] = useState<PlayerAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // 1. Fetch current analysis
        if (!id) {
          throw new Error('معرف التحليل غير متوفر');
        }
        
        // حصول على التحليلات السابقة
        const allAnalyses = await fetchPlayerAnalyses();
        
        // البحث عن التحليل الحالي من قائمة التحليلات
        const currentAnalysis = allAnalyses.find(a => a.id === id);
        
        if (!currentAnalysis) {
          throw new Error('لم يتم العثور على التحليل');
        }
        
        // تحديد التحليلات السابقة (باستثناء التحليل الحالي)
        const previousPlayerAnalyses = allAnalyses
          .filter(a => a.id !== id && a.playerId === currentAnalysis.playerId)
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        
        setAnalysis(currentAnalysis);
        setPreviousAnalyses(previousPlayerAnalyses);
      } catch (error) {
        console.error('Error fetching analysis:', error);
        toast({
          title: "خطأ في تحميل التحليل",
          description: error instanceof Error ? error.message : "حدث خطأ أثناء تحميل بيانات التحليل",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [id, toast]);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0" />
            العودة
          </Button>
          
          <h1 className="text-3xl font-bold">التحليل المتقدم</h1>
          <p className="text-muted-foreground">تحليل مفصل لأداء اللاعب ومقارنات متقدمة</p>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="mr-2 rtl:ml-2 rtl:mr-0">جاري تحميل التحليل...</span>
          </div>
        ) : analysis ? (
          <AdvancedPlayerDashboard 
            analysis={analysis} 
            previousAnalyses={previousAnalyses} 
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-[50vh] text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-2">تعذر تحميل التحليل</h2>
            <p className="text-muted-foreground mb-4">تعذر العثور على بيانات التحليل المطلوبة</p>
            <Button onClick={handleBack}>العودة للصفحة السابقة</Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdvancedAnalysis;
