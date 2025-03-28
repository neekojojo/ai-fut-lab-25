
import type { DetectionResult } from './types';

/**
 * نمط البيانات لنتائج تتبع حركة العين
 */
export interface EyeTrackingData {
  frameNumber: number;
  timestamp: number;
  leftEye: {
    x: number;
    y: number;
    confidence: number;
    direction: number;
    gazeDuration: number;
  };
  rightEye: {
    x: number;
    y: number;
    confidence: number;
    direction: number;
    gazeDuration: number;
  };
  gazeDirection: number; // زاوية اتجاه النظر (بالدرجات)
  gazeTarget: string;   // ما ينظر إليه ('ball', 'player', 'space', 'goal', etc.)
  anticipationScore: number; // درجة توقع تطورات اللعب (0-100)
  scanningFrequency: number; // عدد مرات مسح الملعب
  decisionTime: number;      // الوقت (بالمللي ثانية) لاتخاذ القرار
}

/**
 * نمط البيانات لتحليل حركة العين
 */
export interface EyeTrackingAnalysis {
  trackingData: EyeTrackingData[];
  summary: {
    averageGazeDuration: number;  // متوسط مدة النظر في نقطة واحدة
    scanningFrequency: number;    // معدل مسح الملعب
    reactionTime: number;         // سرعة رد الفعل (بالمللي ثانية)
    decisionSpeed: number;        // سرعة اتخاذ القرار (0-100)
    visualAwareness: number;      // الوعي البصري (0-100)
    fieldAwarenessScore: number;  // درجة الوعي بالملعب (0-100)
    anticipationScore: number;    // درجة التوقع (0-100)
  };
  patterns: {
    name: string;      // اسم النمط
    description: string; // وصف النمط
    frequency: number;   // تكرار حدوث النمط
    significance: number; // أهمية النمط (0-100)
  }[];
  insights: string[];  // استنتاجات من تحليل حركة العين
}

/**
 * تحليل حركة العين في فيديو
 * نستخدم بيانات اكتشاف اللاعبين لتحديد مناطق العين ومتابعة حركتها
 */
export const analyzeEyeMovement = async (
  videoFile: File,
  detectionResult?: DetectionResult
): Promise<EyeTrackingAnalysis> => {
  // في نسخة الإنتاج، سنستخدم نموذج حقيقي للتعرف على حركة العين
  // حالياً، نعود ببيانات وهمية لأغراض العرض
  
  // إنشاء بيانات وهمية عشوائية لتتبع حركة العين
  const trackingData: EyeTrackingData[] = [];
  const frameDuration = 33.33; // ~30fps
  const frameCount = 150; // ~5 seconds
  
  for (let i = 0; i < frameCount; i++) {
    // قيم عشوائية مع بعض النمط للحفاظ على الواقعية
    const timestamp = i * frameDuration;
    const gazeDirection = 45 + (Math.sin(i / 15) * 30) + (Math.random() * 10 - 5);
    const gazeDuration = 200 + Math.sin(i / 20) * 100 + (Math.random() * 50);
    const targets = ['ball', 'player', 'space', 'goal', 'teammate'];
    const gazeTarget = targets[Math.floor(Math.sin(i / 10) * 2 + 2.5)];
    
    // قيم مختلفة قليلاً للعينين لواقعية أكبر
    trackingData.push({
      frameNumber: i,
      timestamp,
      leftEye: {
        x: 100 + Math.sin(i / 10) * 5 + (Math.random() * 2 - 1),
        y: 100 + Math.cos(i / 12) * 5 + (Math.random() * 2 - 1),
        confidence: 0.8 + (Math.random() * 0.15),
        direction: gazeDirection - 1 + (Math.random() * 2 - 1),
        gazeDuration
      },
      rightEye: {
        x: 110 + Math.sin(i / 10) * 5 + (Math.random() * 2 - 1),
        y: 100 + Math.cos(i / 12) * 5 + (Math.random() * 2 - 1),
        confidence: 0.8 + (Math.random() * 0.15),
        direction: gazeDirection + 1 + (Math.random() * 2 - 1),
        gazeDuration
      },
      gazeDirection,
      gazeTarget,
      anticipationScore: 60 + Math.sin(i / 30) * 20 + (Math.random() * 10 - 5),
      scanningFrequency: 3 + Math.sin(i / 40) * 2,
      decisionTime: 250 + Math.cos(i / 15) * 100 + (Math.random() * 50 - 25)
    });
  }
  
  // حساب متوسطات التحليل
  const averageGazeDuration = trackingData.reduce((sum, data) => 
    sum + (data.leftEye.gazeDuration + data.rightEye.gazeDuration) / 2, 0) / trackingData.length;
  
  const scanningFrequency = trackingData.reduce((sum, data) => 
    sum + data.scanningFrequency, 0) / trackingData.length;
    
  const decisionSpeed = calculateDecisionSpeed(trackingData);
  const visualAwareness = calculateVisualAwareness(trackingData);
  const fieldAwarenessScore = calculateFieldAwarenessScore(trackingData);
  const anticipationScore = trackingData.reduce((sum, data) => 
    sum + data.anticipationScore, 0) / trackingData.length;
  
  // تحليل أنماط النظر
  const patterns = [
    {
      name: "مسح سريع للملعب",
      description: "يقوم اللاعب بمسح سريع للملعب قبل استلام الكرة لمعرفة موقع زملائه",
      frequency: 85,
      significance: 90
    },
    {
      name: "التركيز على المساحات",
      description: "يركز اللاعب على المساحات الفارغة أكثر من التركيز على اللاعبين مباشرة",
      frequency: 70,
      significance: 85
    },
    {
      name: "توقع حركة الخصم",
      description: "ينظر اللاعب إلى اتجاه تحرك المدافعين قبل اتخاذ القرار",
      frequency: 65,
      significance: 75
    }
  ];
  
  // استنتاجات من تحليل حركة العين
  const insights = [
    "يتمتع اللاعب بوعي عالٍ بالمساحات المتاحة في الملعب",
    "سرعة مسح الملعب تشير إلى قدرة جيدة على القراءة التكتيكية",
    "يميل اللاعب إلى التركيز أكثر على المساحات بدلاً من اللاعبين، مما يدل على تفكير استراتيجي متقدم"
  ];
  
  return {
    trackingData,
    summary: {
      averageGazeDuration,
      scanningFrequency,
      reactionTime: 280, // قيمة عشوائية واقعية
      decisionSpeed,
      visualAwareness,
      fieldAwarenessScore,
      anticipationScore
    },
    patterns,
    insights
  };
};

/**
 * حساب سرعة اتخاذ القرار بناءً على بيانات تتبع العين
 */
const calculateDecisionSpeed = (trackingData: EyeTrackingData[]): number => {
  const avgDecisionTime = trackingData.reduce((sum, data) => sum + data.decisionTime, 0) / trackingData.length;
  // تحويل الوقت إلى درجة من 0-100 (أقل وقت = درجة أعلى)
  // نفترض أن 100ms هو الحد الأدنى و600ms هو الحد الأقصى
  return Math.max(0, Math.min(100, 100 - ((avgDecisionTime - 100) / 500) * 100));
};

/**
 * حساب الوعي البصري بناءً على التنوع في اتجاهات النظر والأهداف
 */
const calculateVisualAwareness = (trackingData: EyeTrackingData[]): number => {
  // نحسب تنوع الأهداف التي ينظر إليها
  const uniqueTargets = new Set(trackingData.map(data => data.gazeTarget)).size;
  // نحسب تغير زاوية النظر
  let directionChanges = 0;
  for (let i = 1; i < trackingData.length; i++) {
    const diff = Math.abs(trackingData[i].gazeDirection - trackingData[i-1].gazeDirection);
    if (diff > 20) { // تغيير كبير في الاتجاه
      directionChanges++;
    }
  }
  
  // نحسب الدرجة بناءً على تنوع الأهداف وتغييرات الاتجاه
  const targetScore = (uniqueTargets / 5) * 50; // 5 هو العدد الأقصى المفترض للأهداف المختلفة
  const changeScore = Math.min(50, (directionChanges / trackingData.length) * 200);
  
  return targetScore + changeScore;
};

/**
 * حساب درجة الوعي بالملعب بناءً على تكرار المسح وتنوع اتجاهات النظر
 */
const calculateFieldAwarenessScore = (trackingData: EyeTrackingData[]): number => {
  const avgScanningFreq = trackingData.reduce((sum, data) => sum + data.scanningFrequency, 0) / trackingData.length;
  
  // نحسب تنوع اتجاهات النظر (كلما زاد التنوع، زادت درجة الوعي بالملعب)
  const directions = trackingData.map(data => Math.floor(data.gazeDirection / 30) * 30); // تقريب لأقرب 30 درجة
  const uniqueDirections = new Set(directions).size;
  
  // نحسب الدرجة النهائية
  const scanScore = Math.min(50, avgScanningFreq * 10); // 5 مسحات في الثانية تعطي 50 نقطة
  const directionScore = (uniqueDirections / 12) * 50; // 12 اتجاه مختلف (كل 30 درجة) يعطي 50 نقطة
  
  return scanScore + directionScore;
};
