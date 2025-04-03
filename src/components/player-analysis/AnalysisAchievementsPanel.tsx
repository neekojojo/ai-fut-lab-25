
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Star, Trophy } from 'lucide-react';
import { Badge } from '@/types/badges';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface AnalysisAchievementsPanelProps {
  badges: Badge[];
}

// استيراد framer-motion إضافي لتحريك العناصر عند ظهورها
// يمكن تثبيته بالأمر: npm install framer-motion

const AnalysisAchievementsPanel: React.FC<AnalysisAchievementsPanelProps> = ({ badges }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // تأخير قصير قبل بدء الرسوم المتحركة
    setTimeout(() => {
      setShowAnimation(true);
    }, 500);
    
    // عرض إشعار بالشارات المكتسبة
    if (badges.length > 0) {
      toast({
        title: "تم اكتساب شارات جديدة!",
        description: `حصلت على ${badges.length} شارة جديدة بناءً على أدائك`,
        duration: 5000
      });
    }
  }, [badges, toast]);
  
  // تصنيف الشارات حسب المستوى
  const goldBadges = badges.filter(badge => badge.level === 'gold');
  const silverBadges = badges.filter(badge => badge.level === 'silver');
  const bronzeBadges = badges.filter(badge => badge.level === 'bronze');
  
  // لا نعرض أي شيء إذا لم تكن هناك شارات
  if (badges.length === 0) {
    return null;
  }
  
  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-black/50 overflow-hidden">
      <CardHeader className="bg-primary/10 pb-2">
        <CardTitle className="text-xl font-bold flex items-center">
          <Trophy className="h-5 w-5 text-primary mr-2 rtl:ml-2 rtl:mr-0" />
          تهانينا على إنجازاتك!
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground mb-6">
          لقد ربحت الشارات التالية بناءً على تحليل أدائك:
        </p>
        
        {showAnimation && (
          <div className="space-y-8">
            {goldBadges.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-bold text-lg flex items-center">
                  <Trophy className="h-5 w-5 text-yellow-500 mr-2 rtl:ml-2 rtl:mr-0" />
                  الشارات الذهبية
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {goldBadges.map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.5 }}
                      className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800/30 rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition-all"
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 bg-gradient-to-br from-yellow-100 to-yellow-300 dark:from-yellow-700 dark:to-yellow-900 shadow-md">
                        <Trophy className="h-6 w-6 text-yellow-700 dark:text-yellow-300" />
                      </div>
                      <h4 className="font-semibold">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {silverBadges.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-bold text-lg flex items-center">
                  <Award className="h-5 w-5 text-slate-400 mr-2 rtl:ml-2 rtl:mr-0" />
                  الشارات الفضية
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {silverBadges.map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * (index + goldBadges.length), duration: 0.5 }}
                      className="bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-800/30 rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition-all"
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 bg-gradient-to-br from-slate-100 to-slate-300 dark:from-slate-700 dark:to-slate-900 shadow-md">
                        <Award className="h-6 w-6 text-slate-600 dark:text-slate-300" />
                      </div>
                      <h4 className="font-semibold">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            {bronzeBadges.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-bold text-lg flex items-center">
                  <Star className="h-5 w-5 text-amber-600 mr-2 rtl:ml-2 rtl:mr-0" />
                  الشارات البرونزية
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {bronzeBadges.map((badge, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * (index + goldBadges.length + silverBadges.length), duration: 0.5 }}
                      className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-lg p-4 flex flex-col items-center text-center hover:shadow-md transition-all"
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 bg-gradient-to-br from-amber-100 to-amber-300 dark:from-amber-700 dark:to-amber-900 shadow-md">
                        <Star className="h-6 w-6 text-amber-700 dark:text-amber-300" />
                      </div>
                      <h4 className="font-semibold">{badge.name}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
              <h4 className="font-medium mb-2 flex items-center">
                <Trophy className="h-4 w-4 text-primary mr-2 rtl:ml-2 rtl:mr-0" />
                مسار التطور
              </h4>
              <p className="text-sm text-muted-foreground">
                استمر في تحسين أدائك للحصول على المزيد من الشارات والمكافآت. كل تحليل جديد يفتح فرصًا لإظهار تقدمك!
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnalysisAchievementsPanel;
