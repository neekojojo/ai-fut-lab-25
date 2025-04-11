import { InjuryRiskData } from '@/types/badges';

export const generateInjuryRiskAssessment = (position: string, physicalScore: number): InjuryRiskData => {
  // Base overall risk inversely related to physical score
  const baseRisk = Math.max(30, Math.min(85, 100 - physicalScore));
  
  // Add some randomness but keep within reasonable bounds
  const overallRisk = Math.min(95, Math.max(20, baseRisk + (-10 + Math.random() * 20)));
  
  // Generate position-specific risk areas
  const areas: {name: string, risk: number, recommendation: string}[] = [];
  
  if (position === 'مهاجم') {
    areas.push({
      name: 'الكاحل',
      risk: Math.min(95, overallRisk + (-5 + Math.random() * 15)),
      recommendation: 'تمارين تقوية عضلات الكاحل وتحسين التوازن'
    });
    areas.push({
      name: 'عضلات الفخذ الخلفية',
      risk: Math.min(95, overallRisk + (-5 + Math.random() * 10)),
      recommendation: 'تمارين إطالة منتظمة وتقوية العضلات الخلفية للفخذ'
    });
  } else if (position === 'وسط') {
    areas.push({
      name: 'الركبة',
      risk: Math.min(95, overallRisk + (-5 + Math.random() * 15)),
      recommendation: 'تمارين تقوية عضلات الركبة وتحسين تقنية الالتفاف'
    });
    areas.push({
      name: 'أوتار الفخذ',
      risk: Math.min(95, overallRisk + (-5 + Math.random() * 10)),
      recommendation: 'تمارين إطالة وتقوية أوتار الفخذ بشكل منتظم'
    });
  } else {
    areas.push({
      name: 'العضلات الضامة',
      risk: Math.min(95, overallRisk + (-5 + Math.random() * 15)),
      recommendation: 'تمارين تقوية العضلات الضامة وتحسين المرونة'
    });
    areas.push({
      name: 'الكتف',
      risk: Math.min(95, overallRisk + (-5 + Math.random() * 10)),
      recommendation: 'تمارين تقوية عضلات الكتف وتحسين تقنية السقوط'
    });
  }
  
  // Add common areas for all positions
  areas.push({
    name: 'أسفل الظهر',
    risk: Math.min(95, overallRisk + (-10 + Math.random() * 10)),
    recommendation: 'تمارين تقوية عضلات البطن والظهر وتحسين وضعية الجسم'
  });
  
  // Generate recommendations
  const recommendations = [
    'الحفاظ على روتين الإحماء الشامل قبل التدريب والمباريات',
    'زيادة تمارين التوازن والاستقرار للمفاصل المعرضة للخطر',
    'العناية بنظام التغذية وشرب السوائل بكميات كافية',
    'تخصيص وقت كافٍ للاستشفاء بين الجلسات التدريبية'
  ];
  
  return {
    overall: Math.round(overallRisk),
    areas,
    recommendations
  };
};
