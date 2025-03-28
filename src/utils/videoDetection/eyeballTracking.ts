
import { detectPeopleInVideo } from './detectionService';
import type { DetectionResult } from './types';

/**
 * واجهة لبيانات تتبع حركة العين
 */
export interface EyeTrackingData {
  timestamp: number;
  leftEye: {
    x: number;
    y: number;
    confidence: number;
    openness: number; // 0-1 مقياس لمدى فتح العين
    direction: string; // اتجاه النظر: "forward", "left", "right", "up", "down"
  };
  rightEye: {
    x: number;
    y: number;
    confidence: number;
    openness: number;
    direction: string;
  };
  gazeDirection: {
    x: number; // اتجاه النظر بالدرجات
    y: number;
    confidence: number;
  };
  focusPoint: {
    x: number; // نقطة التركيز المتوقعة في الملعب
    y: number;
    confidence: number;
    durationMs: number; // مدة التركيز
  };
}

/**
 * واجهة لنتائج تحليل حركة العين
 */
export interface EyeTrackingAnalysis {
  averageReactionTimeMs: number; // متوسط وقت رد الفعل
  fieldAwarenessScore: number; // 0-100 درجة الوعي بالملعب
  decisionSpeed: number; // 0-100 سرعة اتخاذ القرار
  anticipationScore: number; // 0-100 القدرة على التوقع
  visionCoverage: number; // 0-100 مدى تغطية الرؤية للملعب
  focusDurations: number[]; // مدة التركيز في نقاط مختلفة
  scanningPatterns: {
    efficiency: number; // 0-100 كفاءة أنماط المسح
    frequency: number; // عدد مرات مسح الملعب في الدقيقة
    coverage: number; // نسبة تغطية الملعب
  };
  trackingData: EyeTrackingData[]; // بيانات التتبع الأصلية
}

// Cache لتخزين نتائج التحليل السابقة
const analysisCache = new Map<string, EyeTrackingAnalysis>();

/**
 * دالة لتتبع حركة العين في الفيديو وتحليل نمط النظر
 * @param videoFile ملف الفيديو للتحليل
 */
export const analyzeEyeMovement = async (
  videoFile: File,
  detectionResult?: DetectionResult
): Promise<EyeTrackingAnalysis> => {
  // التحقق من وجود نتائج سابقة في الـ cache
  const fileId = `${videoFile.name}-${videoFile.size}`;
  if (analysisCache.has(fileId)) {
    console.log('Using cached eye tracking analysis');
    return analysisCache.get(fileId)!;
  }

  // الحصول على نتائج اكتشاف الوجه واللاعب إذا لم تكن متوفرة
  const detection = detectionResult || await detectPeopleInVideo(videoFile);
  
  // بيانات تتبع حركة العين (محاكاة)
  const trackingData: EyeTrackingData[] = [];
  
  // محاكاة لنتائج تتبع العين باستخدام بيانات الوجه من تحليل الفيديو
  if (detection.playerPositions && detection.playerPositions.length > 0) {
    for (const position of detection.playerPositions) {
      if (position.keypoints) {
        // البحث عن نقاط العين في البيانات المكتشفة
        const leftEye = position.keypoints.find(kp => kp.part === 'left_eye');
        const rightEye = position.keypoints.find(kp => kp.part === 'right_eye');
        const nose = position.keypoints.find(kp => kp.part === 'nose');
        
        if (leftEye && rightEye && nose) {
          // إنشاء بيانات تتبع العين بناءً على نقاط الوجه المكتشفة
          // في التطبيق الحقيقي، سيتم استخدام خوارزميات أكثر تطوراً للكشف عن اتجاه النظر
          
          // محاكاة اتجاه النظر باستخدام العلاقة بين موضع الأنف والعينين
          const eyeCenterX = (leftEye.x + rightEye.x) / 2;
          const eyeCenterY = (leftEye.y + rightEye.y) / 2;
          const eyeToNoseX = nose.x - eyeCenterX;
          const eyeToNoseY = nose.y - eyeCenterY;
          
          // تحديد اتجاه النظر بناءً على موضع الأنف بالنسبة لمركز العينين
          const direction = getEyeDirection(eyeToNoseX, eyeToNoseY);
          
          // محاكاة نقطة التركيز في الملعب
          const focusX = 50 + Math.sin(position.timestamp / 500) * 30; // محاكاة لحركة العين في الملعب
          const focusY = 50 + Math.cos(position.timestamp / 700) * 20;
          
          // محاكاة مدة التركيز
          const focusDuration = 200 + Math.random() * 500; // 200-700ms
          
          trackingData.push({
            timestamp: position.timestamp,
            leftEye: {
              x: leftEye.x,
              y: leftEye.y,
              confidence: leftEye.confidence || 0.7,
              openness: 0.7 + Math.random() * 0.3, // محاكاة لفتح العين
              direction: direction
            },
            rightEye: {
              x: rightEye.x,
              y: rightEye.y,
              confidence: rightEye.confidence || 0.7,
              openness: 0.7 + Math.random() * 0.3,
              direction: direction
            },
            gazeDirection: {
              x: eyeToNoseX,
              y: eyeToNoseY,
              confidence: (leftEye.confidence + rightEye.confidence) / 2 || 0.7
            },
            focusPoint: {
              x: focusX,
              y: focusY,
              confidence: 0.6 + Math.random() * 0.3,
              durationMs: focusDuration
            }
          });
        }
      }
    }
  }
  
  // دالة مساعدة لتحديد اتجاه النظر
  function getEyeDirection(x: number, y: number): string {
    const angle = Math.atan2(y, x) * (180 / Math.PI);
    if (angle > -45 && angle < 45) return "right";
    if (angle >= 45 && angle < 135) return "down";
    if (angle >= 135 || angle < -135) return "left";
    return "up";
  }
  
  // تحليل البيانات المجمعة
  const analysis = analyzeEyeTrackingData(trackingData);
  
  // تخزين النتائج في الـ cache
  analysisCache.set(fileId, analysis);
  
  return analysis;
};

/**
 * تحليل بيانات تتبع العين وتقدير مؤشرات الذكاء التكتيكي
 */
function analyzeEyeTrackingData(trackingData: EyeTrackingData[]): EyeTrackingAnalysis {
  // التأكد من وجود بيانات كافية للتحليل
  if (trackingData.length < 5) {
    return createDefaultAnalysis(trackingData);
  }

  // حساب متوسط وقت رد الفعل (محاكاة)
  // في التطبيق الحقيقي، سيتم قياس المدة بين تغير الموقف وتغير اتجاه النظر
  const reactionTimes = [];
  for (let i = 1; i < trackingData.length; i++) {
    if (trackingData[i].gazeDirection.x !== trackingData[i-1].gazeDirection.x) {
      reactionTimes.push(
        trackingData[i].timestamp - trackingData[i-1].timestamp
      );
    }
  }
  
  const averageReactionTimeMs = reactionTimes.length > 0 
    ? reactionTimes.reduce((sum, time) => sum + time, 0) / reactionTimes.length 
    : 300; // قيمة افتراضية
  
  // حساب متوسط مدة التركيز
  const focusDurations = trackingData.map(data => data.focusPoint.durationMs);
  
  // حساب عدد مرات تغيير التركيز في الدقيقة
  const totalTrackingTimeMs = trackingData[trackingData.length-1].timestamp - trackingData[0].timestamp;
  const totalFocusShifts = trackingData.length - 1;
  const focusShiftsPerMinute = (totalFocusShifts / totalTrackingTimeMs) * 60000;
  
  // تقدير كفاءة أنماط المسح
  // يعتمد على تنوع نقاط التركيز وتغطية مساحة الملعب
  const uniqueAreas = new Set<string>();
  trackingData.forEach(data => {
    // تقسيم الملعب إلى شبكة 10×10
    const gridX = Math.floor(data.focusPoint.x / 10);
    const gridY = Math.floor(data.focusPoint.y / 10);
    uniqueAreas.add(`${gridX},${gridY}`);
  });
  
  // نسبة تغطية الملعب (100 منطقة محتملة في شبكة 10×10)
  const fieldCoverage = uniqueAreas.size / 100;
  
  // حساب درجة الوعي بالملعب (بناءً على تغطية الملعب وعدد مرات تغيير التركيز)
  const fieldAwarenessScore = Math.min(100, 
    (fieldCoverage * 50) + (Math.min(60, focusShiftsPerMinute) / 60 * 50)
  );
  
  // تقدير سرعة اتخاذ القرار
  // أوقات رد فعل أقصر = درجة أعلى
  const decisionSpeed = Math.max(30, Math.min(100, 
    100 - (averageReactionTimeMs / 10)
  ));
  
  // تقدير القدرة على التوقع
  // يعتمد على نسبة نقاط التركيز عالية الثقة وسرعة الاستجابة
  const highConfidenceFocus = trackingData.filter(
    data => data.focusPoint.confidence > 0.8
  ).length / trackingData.length;
  
  const anticipationScore = Math.min(100,
    (highConfidenceFocus * 50) + (decisionSpeed * 0.5)
  );
  
  // تجميع التحليل النهائي
  return {
    averageReactionTimeMs,
    fieldAwarenessScore,
    decisionSpeed,
    anticipationScore,
    visionCoverage: fieldCoverage * 100,
    focusDurations,
    scanningPatterns: {
      efficiency: fieldAwarenessScore,
      frequency: focusShiftsPerMinute,
      coverage: fieldCoverage * 100
    },
    trackingData
  };
}

/**
 * إنشاء تحليل افتراضي عندما لا توجد بيانات كافية
 */
function createDefaultAnalysis(trackingData: EyeTrackingData[]): EyeTrackingAnalysis {
  return {
    averageReactionTimeMs: 350,
    fieldAwarenessScore: 75,
    decisionSpeed: 70,
    anticipationScore: 68,
    visionCoverage: 65,
    focusDurations: trackingData.map(() => 400 + Math.random() * 300),
    scanningPatterns: {
      efficiency: 72,
      frequency: 35,
      coverage: 60
    },
    trackingData
  };
}

/**
 * دالة لتحويل نتائج تحليل حركة العين إلى اقتراحات للتطوير
 */
export const generateEyeTrackingInsights = (analysis: EyeTrackingAnalysis): string[] => {
  const insights: string[] = [];
  
  // إضافة رؤى وتوصيات بناءً على نتائج التحليل
  if (analysis.fieldAwarenessScore < 60) {
    insights.push("الحاجة إلى تحسين الوعي بالملعب من خلال تمارين المسح البصري المنتظم");
  } else if (analysis.fieldAwarenessScore > 85) {
    insights.push("مستوى ممتاز من الوعي بالملعب والقدرة على مسح المساحات");
  }
  
  if (analysis.decisionSpeed < 65) {
    insights.push("العمل على تحسين سرعة اتخاذ القرار من خلال تمارين محاكاة المواقف التكتيكية");
  } else if (analysis.decisionSpeed > 90) {
    insights.push("سرعة استثنائية في اتخاذ القرارات تشير إلى ذكاء تكتيكي عالي");
  }
  
  if (analysis.anticipationScore < 70) {
    insights.push("تطوير القدرة على توقع تحركات اللاعبين من خلال دراسة أنماط اللعب");
  } else if (analysis.anticipationScore > 85) {
    insights.push("قدرة ممتازة على توقع تطورات اللعب واستباق الخصم");
  }
  
  if (analysis.scanningPatterns.frequency < 30) {
    insights.push("زيادة تكرار عمليات مسح الملعب لتحسين الوعي التكتيكي");
  } else if (analysis.scanningPatterns.frequency > 50) {
    insights.push("تكرار ممتاز لعمليات مسح الملعب يعزز من الوعي التكتيكي");
  }
  
  // إضافة توصية عامة دائمًا
  insights.push("استمر في تطوير مهارات القراءة البصرية للملعب من خلال تمارين خاصة بتتبع الكرة وتحركات اللاعبين");
  
  return insights;
};

/**
 * تقدير درجة الموهبة بناءً على تحليل حركة العين
 */
export const estimateTalentFromEyeTracking = (analysis: EyeTrackingAnalysis): number => {
  // حساب درجة الموهبة من 0-100 بناءً على مؤشرات تحليل حركة العين
  const talentScore = (
    analysis.fieldAwarenessScore * 0.3 +
    analysis.decisionSpeed * 0.3 +
    analysis.anticipationScore * 0.25 +
    analysis.scanningPatterns.efficiency * 0.15
  );
  
  return Math.round(talentScore);
};
