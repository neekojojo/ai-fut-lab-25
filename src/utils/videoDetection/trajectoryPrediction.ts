
import { PlayerPosition } from './types';

/**
 * تنبؤ مستقبلي بمسار اللاعب بناءً على البيانات التاريخية للحركة
 */
export interface TrajectoryPrediction {
  predictedPositions: {x: number, y: number, confidence: number}[];
  nextDirectionChange: {
    likelihood: number;
    timeframe: number;
  };
  potentialHotspots: {x: number, y: number, intensity: number}[];
}

/**
 * Linear regression model for simple trajectory prediction
 */
class LinearTrajectoryModel {
  // خوارزمية الانحدار الخطي البسيطة للتنبؤ الحركي
  predict(positions: {x: number, y: number, timestamp: number}[], timeAhead: number): {x: number, y: number} {
    if (positions.length < 2) {
      return { x: positions[0]?.x || 0, y: positions[0]?.y || 0 };
    }
    
    // حساب المتوسطات
    const n = positions.length;
    let sumX = 0, sumY = 0, sumT = 0, sumTX = 0, sumTY = 0, sumTSquared = 0;
    
    for (const pos of positions) {
      sumX += pos.x;
      sumY += pos.y;
      sumT += pos.timestamp;
      sumTX += pos.timestamp * pos.x;
      sumTY += pos.timestamp * pos.y;
      sumTSquared += pos.timestamp * pos.timestamp;
    }
    
    // حساب معاملات الانحدار
    const avgT = sumT / n;
    const avgX = sumX / n;
    const avgY = sumY / n;
    
    const slopeX = (sumTX - avgT * sumX) / (sumTSquared - avgT * sumT);
    const slopeY = (sumTY - avgT * sumY) / (sumTSquared - avgT * sumT);
    
    const interceptX = avgX - slopeX * avgT;
    const interceptY = avgY - slopeY * avgT;
    
    // التنبؤ بالموقع المستقبلي
    const lastTimestamp = positions[positions.length - 1].timestamp;
    const predictionTimestamp = lastTimestamp + timeAhead;
    
    return {
      x: interceptX + slopeX * predictionTimestamp,
      y: interceptY + slopeY * predictionTimestamp
    };
  }
}

/**
 * تنبؤ بمسار اللاعب المستقبلي
 * @param positions مواقع اللاعب السابقة
 * @param timeFrameMs الإطار الزمني للتنبؤ بالمللي ثانية
 */
export const predictPlayerTrajectory = (
  positions: PlayerPosition[],
  timeFrameMs: number = 1000 // تنبؤ بثانية واحدة مستقبلًا
): TrajectoryPrediction => {
  // ترتيب المواقع حسب الوقت
  const sortedPositions = [...positions].sort((a, b) => a.timestamp - b.timestamp);
  
  // التحقق من وجود بيانات كافية
  if (sortedPositions.length < 3) {
    return {
      predictedPositions: [],
      nextDirectionChange: { likelihood: 0, timeframe: 0 },
      potentialHotspots: []
    };
  }
  
  // استخراج مواقع المركز لكل إطار
  const centerPositions = sortedPositions.map(pos => {
    if (!pos.bbox) return null;
    
    return {
      x: pos.bbox.x + pos.bbox.width / 2,
      y: pos.bbox.y + pos.bbox.height / 2,
      timestamp: pos.timestamp
    };
  }).filter((pos): pos is {x: number, y: number, timestamp: number} => pos !== null);
  
  // إذا كانت البيانات غير كافية بعد التنقية
  if (centerPositions.length < 3) {
    return {
      predictedPositions: [],
      nextDirectionChange: { likelihood: 0, timeframe: 0 },
      potentialHotspots: []
    };
  }
  
  // استخدام نموذج الانحدار الخطي للتنبؤ
  const model = new LinearTrajectoryModel();
  
  // التنبؤ بعدة نقاط مستقبلية (5 نقاط)
  const predictedPositions = [];
  for (let i = 1; i <= 5; i++) {
    // استخدام آخر 5 مواقع للتنبؤ إذا كانت متوفرة
    const recentPositions = centerPositions.slice(-Math.min(5, centerPositions.length));
    const prediction = model.predict(recentPositions, timeFrameMs * i);
    
    // حساب درجة الثقة في التنبؤ (تتناقص مع البعد الزمني)
    const confidence = Math.max(0.2, 1 - (i * 0.15));
    
    predictedPositions.push({
      x: prediction.x,
      y: prediction.y,
      confidence
    });
  }
  
  // تحليل تغييرات الاتجاه السابقة لتقدير احتمالية التغيير القادم
  let directionChanges = 0;
  let lastDirection = { x: 0, y: 0 };
  
  for (let i = 1; i < centerPositions.length; i++) {
    const current = centerPositions[i];
    const prev = centerPositions[i-1];
    
    const direction = {
      x: current.x - prev.x,
      y: current.y - prev.y
    };
    
    // حساب زاوية التحرك
    const currentAngle = Math.atan2(direction.y, direction.x);
    const prevAngle = Math.atan2(lastDirection.y, lastDirection.x);
    
    // كشف تغيير الاتجاه (أكثر من 30 درجة)
    if (i > 1 && Math.abs(currentAngle - prevAngle) > (Math.PI / 6)) {
      directionChanges++;
    }
    
    lastDirection = direction;
  }
  
  // حساب متوسط الوقت بين تغييرات الاتجاه
  const totalTime = centerPositions[centerPositions.length - 1].timestamp - centerPositions[0].timestamp;
  const avgTimeBetweenChanges = directionChanges > 0 ? totalTime / directionChanges : totalTime;
  
  // تقدير وقت التغيير القادم
  const lastChangeTime = centerPositions[centerPositions.length - 1].timestamp;
  const timeframeToNextChange = Math.max(500, avgTimeBetweenChanges);
  
  // حساب مناطق الحركة المتكررة (النقاط الساخنة)
  const hotspotGrid = new Map<string, number>();
  const gridSize = 20; // حجم شبكة التقسيم
  
  for (const pos of centerPositions) {
    // تقسيم الملعب إلى شبكة
    const gridX = Math.floor((pos.x / 640) * gridSize);
    const gridY = Math.floor((pos.y / 480) * gridSize);
    const gridKey = `${gridX},${gridY}`;
    
    hotspotGrid.set(gridKey, (hotspotGrid.get(gridKey) || 0) + 1);
  }
  
  // تحويل البيانات إلى تنسيق النقاط الساخنة
  const potentialHotspots = Array.from(hotspotGrid.entries())
    .map(([key, count]) => {
      const [gridX, gridY] = key.split(',').map(Number);
      return {
        x: ((gridX + 0.5) / gridSize) * 100, // تحويل إلى نسبة مئوية (0-100)
        y: ((gridY + 0.5) / gridSize) * 100, // تحويل إلى نسبة مئوية (0-100)
        intensity: count / centerPositions.length // تطبيع القيمة (0-1)
      };
    })
    .filter(spot => spot.intensity > 0.05) // إزالة النقاط منخفضة الكثافة
    .sort((a, b) => b.intensity - a.intensity) // ترتيب تنازلي حسب الكثافة
    .slice(0, 5); // أخذ أعلى 5 نقاط ساخنة
  
  // تقدير احتمالية تغيير الاتجاه القادم
  const likelihood = Math.min(0.9, directionChanges / centerPositions.length * 2);
  
  return {
    predictedPositions,
    nextDirectionChange: {
      likelihood,
      timeframe: timeframeToNextChange
    },
    potentialHotspots
  };
};
