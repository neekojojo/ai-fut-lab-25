
import { PlayerPosition } from './types';
import { MovementAnalysisResult } from './movementAnalysis';

export interface EnhancedMovementAnalysis extends MovementAnalysisResult {
  stamina: number; // مؤشر قدرة التحمل (0-100)
  consistency: number; // مؤشر ثبات الأداء (0-100)
  recoverySpeed: number; // سرعة الاستشفاء بعد التسارعات القصوى
  accelerationProfile: {
    explosive: number; // التسارع المفاجئ
    sustained: number; // التسارع المستمر
    deceleration: number; // القدرة على الإبطاء
  };
  tacticaAwareness: number; // الوعي التكتيكي (0-100)
  directionalData: {
    forward: number;  // % التحرك للأمام
    backward: number; // % التحرك للخلف
    sideways: number; // % التحرك الجانبي
  };
}

// تحليل محسّن لحركة اللاعب
export const analyzeEnhancedPlayerMovements = async (
  positions: PlayerPosition[]
): Promise<EnhancedMovementAnalysis> => {
  // الحصول على نتائج التحليل الأساسي أولاً
  const baseAnalysis = await import('./movementAnalysis')
    .then(module => module.analyzePlayerMovements(positions));
  
  // فرز المواقع حسب الطابع الزمني
  const sortedPositions = [...positions].sort((a, b) => a.timestamp - b.timestamp);
  
  // تخطي التحليل إذا لم تكن هناك بيانات كافية
  if (sortedPositions.length < 5) {
    return {
      ...baseAnalysis,
      stamina: 0,
      consistency: 0,
      recoverySpeed: 0,
      accelerationProfile: { explosive: 0, sustained: 0, deceleration: 0 },
      tacticaAwareness: 0,
      directionalData: { forward: 0, backward: 0, sideways: 0 }
    };
  }
  
  // حساب مؤشرات التحمل
  let staminaScore = 100;
  let lastHighIntensity = 0;
  let recoveryTimes: number[] = [];
  let speedConsistency: number[] = [];
  let lastSpeed = 0;
  
  // بيانات الاتجاه
  let forwardMovement = 0;
  let backwardMovement = 0;
  let sidewaysMovement = 0;
  let totalMovement = 0;
  
  // بيانات التسارع
  let explosiveAccelerations = 0;
  let sustainedAccelerations = 0;
  let decelerations = 0;
  
  // حساب متوسط وانحراف معياري للسرعة
  let sumSpeed = 0;
  let speeds: number[] = [];
  
  for (let i = 1; i < sortedPositions.length; i++) {
    const prevPos = sortedPositions[i-1];
    const currentPos = sortedPositions[i];
    
    // التحقق من وجود بيانات الإطار المحيط
    if (!prevPos.bbox || !currentPos.bbox) continue;
    
    // حساب المراكز
    const prevX = prevPos.bbox.x + prevPos.bbox.width / 2;
    const prevY = prevPos.bbox.y + prevPos.bbox.height / 2;
    const currentX = currentPos.bbox.x + currentPos.bbox.width / 2;
    const currentY = currentPos.bbox.y + currentPos.bbox.height / 2;
    
    // حساب المسافة والوقت
    const dx = currentX - prevX;
    const dy = currentY - prevY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const timeDiff = (currentPos.timestamp - prevPos.timestamp) / 1000;
    
    if (timeDiff <= 0) continue;
    
    // حساب السرعة الحالية
    const speed = distance / timeDiff;
    speeds.push(speed);
    sumSpeed += speed;
    
    // تحليل اتجاه الحركة (تقريبي - نفترض أن الكاميرا في جانب الملعب)
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const absAngle = Math.abs(angle);
    
    if (absAngle < 45 || absAngle > 135) {
      sidewaysMovement += distance;
    } else if (angle > -135 && angle < -45) {
      forwardMovement += distance;
    } else {
      backwardMovement += distance;
    }
    
    totalMovement += distance;
    
    // حساب التسارع
    const acceleration = Math.abs(speed - lastSpeed) / timeDiff;
    
    // تحليل نوع التسارع
    if (speed > lastSpeed && acceleration > 2) {
      // تسارع مفاجئ
      if (acceleration > 5) {
        explosiveAccelerations++;
      } else {
        sustainedAccelerations++;
      }
    } else if (speed < lastSpeed && acceleration > 2) {
      // تباطؤ
      decelerations++;
    }
    
    // ثبات السرعة (الفرق بين السرعة الحالية والسابقة)
    if (i > 1) {
      speedConsistency.push(Math.abs(speed - lastSpeed));
    }
    
    // التحليل المتقدم للتحمل
    // نحدد أن الجهد عالي إذا كانت السرعة أعلى من 70% من السرعة القصوى
    const highIntensityThreshold = baseAnalysis.maxSpeed * 0.7;
    
    if (speed > highIntensityThreshold) {
      // تقليل التحمل أثناء الجهد العالي
      staminaScore = Math.max(0, staminaScore - 0.5);
      lastHighIntensity = currentPos.timestamp;
    } else if (lastHighIntensity > 0) {
      // قياس وقت الاستشفاء بعد جهد عالي
      const recoveryTime = currentPos.timestamp - lastHighIntensity;
      
      if (recoveryTime > 1000) { // أكثر من ثانية
        recoveryTimes.push(recoveryTime);
        lastHighIntensity = 0;
        // استعادة التحمل بمرور الوقت
        staminaScore = Math.min(100, staminaScore + 0.2);
      }
    } else {
      // استعادة التحمل بمرور الوقت
      staminaScore = Math.min(100, staminaScore + 0.1);
    }
    
    lastSpeed = speed;
  }
  
  // حساب متوسط وانحراف معياري للسرعة
  const avgSpeed = sumSpeed / speeds.length;
  const speedVariance = speeds.reduce((sum, speed) => sum + Math.pow(speed - avgSpeed, 2), 0) / speeds.length;
  const speedDeviation = Math.sqrt(speedVariance);
  
  // حساب ثبات السرعة
  const consistencyValue = speedConsistency.length > 0 
    ? 100 - (speedConsistency.reduce((sum, val) => sum + val, 0) / speedConsistency.length * 10)
    : 50;
  
  // حساب سرعة الاستشفاء
  const recoverySpeedValue = recoveryTimes.length > 0 
    ? 5000 / (recoveryTimes.reduce((sum, time) => sum + time, 0) / recoveryTimes.length)
    : 1;
  
  // حساب نسب الاتجاهات
  const directionalData = {
    forward: totalMovement > 0 ? forwardMovement / totalMovement : 0,
    backward: totalMovement > 0 ? backwardMovement / totalMovement : 0,
    sideways: totalMovement > 0 ? sidewaysMovement / totalMovement : 0
  };
  
  // حساب ملف التسارع
  const totalAccelerations = explosiveAccelerations + sustainedAccelerations + decelerations;
  const accelerationProfile = {
    explosive: totalAccelerations > 0 ? explosiveAccelerations / totalAccelerations : 0,
    sustained: totalAccelerations > 0 ? sustainedAccelerations / totalAccelerations : 0,
    deceleration: totalAccelerations > 0 ? decelerations / totalAccelerations : 0
  };
  
  // حساب الوعي التكتيكي (تقدير بناءً على تنوع الحركة وتغييرات الاتجاه)
  const positionVariety = Math.min(100, (speedDeviation / avgSpeed) * 50 + (baseAnalysis.directionChanges / sortedPositions.length) * 100);
  const tacticalAwareness = Math.min(100, 
    positionVariety * 0.5 + 
    baseAnalysis.movementEfficiency * 0.3 + 
    (1 - accelerationProfile.explosive) * 20
  );
  
  return {
    ...baseAnalysis,
    stamina: Math.round(staminaScore),
    consistency: Math.round(consistencyValue),
    recoverySpeed: parseFloat(recoverySpeedValue.toFixed(2)),
    accelerationProfile,
    tacticaAwareness: Math.round(tacticalAwareness),
    directionalData
  };
};
