
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import AdvancedAnalysisView from '@/components/player-analysis/AdvancedAnalysisView';
import { useToast } from '@/hooks/use-toast';

// Placeholder function to get analysis data
const getAnalysisById = async (id: string) => {
  // In a real app, this would fetch from an API
  // For demo purposes, let's return mock data
  return {
    id,
    playerName: "محمد عبد الله",
    position: "وسط",
    age: 19,
    performanceScore: 82,
    talentScore: 88,
    technicalMetrics: {
      passing: 82,
      shooting: 75,
      dribbling: 86,
      ballControl: 84,
      vision: 78,
      positioning: 80,
      decision: 76,
      composure: 72
    },
    physicalMetrics: {
      speed: 78,
      acceleration: 82,
      stamina: 75,
      agility: 73,
      balance: 68,
      strength: 65,
      jumping: 70
    },
    movementMetrics: {
      averageSpeed: 12.5,
      topSpeed: 28.4,
      averageAcceleration: 2.8,
      totalDistance: 1250,
      sprintCount: 8,
      directionChanges: 24
    },
    strengths: [
      "تحكم ممتاز بالكرة",
      "مهارة المراوغة",
      "الرؤية الميدانية"
    ],
    weaknesses: [
      "التسديد من خارج منطقة الجزاء",
      "الثبات الانفعالي تحت الضغط"
    ]
  };
};

const AdvancedAnalysis: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadAnalysis = async () => {
      try {
        if (id) {
          const data = await getAnalysisById(id);
          setAnalysis(data);
        }
      } catch (error) {
        console.error("Error loading analysis:", error);
        toast({
          title: "خطأ في التحميل",
          description: "تعذر تحميل بيانات التحليل",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadAnalysis();
  }, [id, toast]);
  
  const handleBack = () => {
    navigate('/dashboard');
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="mt-4 text-lg">جاري تحميل بيانات التحليل...</p>
        </div>
      </div>
    );
  }
  
  if (!analysis) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">التحليل غير موجود</h1>
          <p className="text-muted-foreground mb-6">لم نتمكن من العثور على التحليل المطلوب</p>
          <Button onClick={handleBack}>العودة للصفحة الرئيسية</Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <AdvancedAnalysisView analysis={analysis} onBack={handleBack} />
    </div>
  );
};

export default AdvancedAnalysis;
