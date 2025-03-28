
import type { DetectionResult } from './types';

/**
 * قائمة باللاعبين المحترفين وبياناتهم للمقارنة
 * في التطبيق الحقيقي، يجب أن تكون هذه القائمة في قاعدة بيانات
 */
const professionalPlayerDatabase = [
  {
    id: 'p001',
    name: 'محمد الدوسري',
    team: 'الهلال',
    nationality: 'المملكة العربية السعودية',
    position: 'جناح',
    number: '29',
    physicalAttributes: {
      height: 170,
      weight: 68,
      speed: 89,
      agility: 87,
      stamina: 82
    }
  },
  {
    id: 'p002',
    name: 'سالم الدوسري',
    team: 'الهلال',
    nationality: 'المملكة العربية السعودية',
    position: 'جناح',
    number: '10',
    physicalAttributes: {
      height: 168,
      weight: 65,
      speed: 88,
      agility: 90,
      stamina: 84
    }
  },
  {
    id: 'p003',
    name: 'سلمان الفرج',
    team: 'الهلال',
    nationality: 'المملكة العربية السعودية',
    position: 'وسط',
    number: '7',
    physicalAttributes: {
      height: 177,
      weight: 75,
      speed: 79,
      agility: 82,
      stamina: 88
    }
  },
  {
    id: 'p004',
    name: 'كريم بنزيما',
    team: 'الاتحاد',
    nationality: 'فرنسا',
    position: 'مهاجم',
    number: '9',
    physicalAttributes: {
      height: 185,
      weight: 81,
      speed: 80,
      agility: 85,
      stamina: 83
    }
  },
  {
    id: 'p005',
    name: 'نيمار',
    team: 'الهلال',
    nationality: 'البرازيل',
    position: 'جناح',
    number: '10',
    physicalAttributes: {
      height: 175,
      weight: 68,
      speed: 91,
      agility: 94,
      stamina: 80
    }
  },
  {
    id: 'p006',
    name: 'رونالدو',
    team: 'النصر',
    nationality: 'البرتغال',
    position: 'مهاجم',
    number: '7',
    physicalAttributes: {
      height: 187,
      weight: 83,
      speed: 85,
      agility: 83,
      stamina: 87
    }
  },
];

// معلومات الأندية
const teamDatabase = [
  {
    id: 't001',
    name: 'الهلال',
    country: 'المملكة العربية السعودية',
    league: 'دوري روشن السعودي',
    colors: ['أزرق', 'أبيض'],
    logo: 'alhilal.png'
  },
  {
    id: 't002',
    name: 'النصر',
    country: 'المملكة العربية السعودية',
    league: 'دوري روشن السعودي',
    colors: ['أصفر', 'أزرق'],
    logo: 'alnasser.png'
  },
  {
    id: 't003',
    name: 'الاتحاد',
    country: 'المملكة العربية السعودية',
    league: 'دوري روشن السعودي',
    colors: ['أصفر', 'أسود'],
    logo: 'alittihad.png'
  },
  // يمكن إضافة المزيد من الفرق حسب الحاجة
];

/**
 * نوع البيانات الذي يمثل لاعب محترف تم التعرف عليه
 */
export interface IdentifiedPlayer {
  id: string;
  name: string;
  team: string;
  nationality: string;
  position: string;
  number: string;
  confidenceScore: number; // درجة الثقة في التطابق (0-1)
  physicalAttributes: {
    height: number;
    weight: number;
    speed: number;
    agility: number;
    stamina: number;
  };
}

/**
 * نوع البيانات الذي يمثل فريق تم التعرف عليه
 */
export interface IdentifiedTeam {
  id: string;
  name: string;
  country: string;
  league: string;
  colors: string[];
  logo: string;
  confidenceScore: number; // درجة الثقة في التطابق (0-1)
}

/**
 * دالة تعمل على تحليل نتائج تتبع حركة اللاعب لمحاولة التعرف على هوية اللاعب
 * بناءً على أنماط الحركة والخصائص الجسدية
 */
export const identifyPlayerFromDetection = (result: DetectionResult): IdentifiedPlayer[] => {
  // في التطبيق الواقعي، هنا سنستخدم نموذج تعلم آلي للمقارنة
  // حاليًا، سنقوم بعملية مطابقة بسيطة بناءً على بعض السمات
  
  // في هذه النسخة التجريبية، سنختار أفضل 3 مرشحين بشكل عشوائي
  // مع درجات ثقة متفاوتة للتوضيح
  
  const candidates = [...professionalPlayerDatabase]
    .sort(() => 0.5 - Math.random()) // ترتيب عشوائي
    .slice(0, 3) // أخذ أول 3 لاعبين
    .map((player, index) => {
      // إنشاء درجة ثقة وهمية (عالية للأول، متوسطة للثاني، منخفضة للثالث)
      const confidenceScores = [0.89, 0.67, 0.42];
      
      return {
        ...player,
        confidenceScore: confidenceScores[index]
      } as IdentifiedPlayer;
    });
  
  return candidates;
};

/**
 * دالة تتعرف على الفريق من خلال تحليل ألوان الزي والشعارات
 */
export const identifyTeamFromDetection = (result: DetectionResult): IdentifiedTeam[] => {
  // في التطبيق الواقعي، هنا سنستخدم تقنيات التعرف على الشعارات والألوان
  
  // إختيار فريقين بشكل عشوائي للإقتراح
  const candidates = [...teamDatabase]
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
    .map((team, index) => {
      const confidenceScores = [0.85, 0.63];
      
      return {
        ...team,
        confidenceScore: confidenceScores[index]
      } as IdentifiedTeam;
    });
  
  return candidates;
};
