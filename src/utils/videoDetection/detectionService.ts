import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import { DetectionResult, FrameResult, PlayerPosition, Keypoint, BoundingBox } from './types';

// تهيئة نماذج TensorFlow.js
const initializeTensorFlow = async () => {
  await tf.ready();
  console.log("تم تهيئة TensorFlow.js بنجاح");
};

// استخراج إطارات من الفيديو
const extractFramesFromVideo = async (videoFile: File, frameCount: number = 15): Promise<HTMLCanvasElement[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      // إنشاء عنصر فيديو
      const video = document.createElement('video');
      video.autoplay = false;
      video.muted = true;
      video.playsInline = true;
      
      // إنشاء رابط URL للفيديو
      const videoURL = URL.createObjectURL(videoFile);
      video.src = videoURL;
      
      // انتظار استعداد البيانات الوصفية للفيديو
      video.onloadedmetadata = async () => {
        const frames: HTMLCanvasElement[] = [];
        const duration = video.duration;
        
        // إذا كان الفيديو قصيرًا جدًا
        if (duration < 1) {
          reject(new Error("الفيديو قصير جدًا للتحليل"));
          return;
        }
        
        // حساب الفاصل الزمني بين الإطارات
        const frameInterval = duration / frameCount;
        
        // إنشاء سياق الرسم للحصول على الإطارات
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error("فشل إنشاء سياق الرسم"));
          return;
        }
        
        // استخراج الإطارات على فترات منتظمة
        for (let i = 0; i < frameCount; i++) {
          const time = i * frameInterval;
          video.currentTime = time;
          
          // انتظار تحديث موضع الفيديو
          await new Promise<void>(resolveSeek => {
            const onSeeked = () => {
              video.removeEventListener('seeked', onSeeked);
              resolveSeek();
            };
            video.addEventListener('seeked', onSeeked);
          });
          
          // رسم الإطار الحالي على Canvas
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // استنساخ Canvas للإطار الحالي
          const frameCanvas = document.createElement('canvas');
          frameCanvas.width = canvas.width;
          frameCanvas.height = canvas.height;
          const frameCtx = frameCanvas.getContext('2d');
          
          if (frameCtx) {
            frameCtx.drawImage(canvas, 0, 0);
            frames.push(frameCanvas);
          }
        }
        
        // تحرير موارد الفيديو
        URL.revokeObjectURL(videoURL);
        resolve(frames);
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(videoURL);
        reject(new Error("فشل في تحميل الفيديو"));
      };
      
    } catch (error) {
      console.error("خطأ في استخراج إطارات الفيديو:", error);
      reject(error);
    }
  });
};

// تحويل نقاط المفاصل من تنسيق TensorFlow إلى التنسيق المخصص
const mapKeypoints = (tfKeypoints: poseDetection.Keypoint[]): Keypoint[] => {
  // خريطة أسماء المفاصل من TensorFlow إلى التنسيق المخصص
  const keypointMapping: Record<string, string> = {
    'nose': 'nose',
    'left_eye': 'left_eye',
    'right_eye': 'right_eye',
    'left_ear': 'left_ear',
    'right_ear': 'right_ear',
    'left_shoulder': 'left_shoulder',
    'right_shoulder': 'right_shoulder',
    'left_elbow': 'left_elbow',
    'right_elbow': 'right_elbow',
    'left_wrist': 'left_wrist',
    'right_wrist': 'right_wrist',
    'left_hip': 'left_hip',
    'right_hip': 'right_hip',
    'left_knee': 'left_knee',
    'right_knee': 'right_knee',
    'left_ankle': 'left_ankle',
    'right_ankle': 'right_ankle'
  };

  return tfKeypoints.map(kp => {
    return {
      x: kp.x,
      y: kp.y,
      part: keypointMapping[kp.name] || kp.name, // تحويل اسم المفصل
      confidence: kp.score || 0 // استخدام score كقيمة للثقة
    };
  });
};

// حساب الـ bounding box من نقاط المفاصل
const calculateBoundingBox = (keypoints: Keypoint[]): BoundingBox => {
  const validKeypoints = keypoints.filter(kp => kp.x !== undefined && kp.y !== undefined);
  
  if (validKeypoints.length === 0) {
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  
  const xValues = validKeypoints.map(kp => kp.x);
  const yValues = validKeypoints.map(kp => kp.y);
  
  const minX = Math.min(...xValues);
  const minY = Math.min(...yValues);
  const maxX = Math.max(...xValues);
  const maxY = Math.max(...yValues);
  
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
};

// كشف الأشخاص في الفيديو باستخدام TensorFlow.js
export const detectPeopleInVideo = async (
  videoFile: File
): Promise<DetectionResult> => {
  try {
    console.log("بدء تحليل الفيديو باستخدام TensorFlow.js...");
    
    // تهيئة TensorFlow.js
    await initializeTensorFlow();
    
    // استخراج إطارات من الفيديو
    const frames = await extractFramesFromVideo(videoFile);
    console.log(`تم استخراج ${frames.length} إطار من الفيديو`);
    
    // تهيئة نموذج كشف الوضعية
    const detector = await poseDetection.createDetector(
      poseDetection.SupportedModels.MoveNet,
      { modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING }
    );
    
    // تحليل كل إطار
    const frameResults: FrameResult[] = [];
    const playerPositions: PlayerPosition[] = [];
    
    let totalDetections = 0;
    
    for (let i = 0; i < frames.length; i++) {
      // تقدير الوضعيات في الإطار
      const poses = await detector.estimatePoses(frames[i]);
      
      // إضافة نتائج الإطار
      const timestamp = i * (1000 / frames.length); // تقريب زمني
      frameResults.push({
        frameNumber: i,
        detections: poses.length,
        timestamp
      });
      
      totalDetections += poses.length;
      
      // إضافة بيانات اللاعبين - تصحيح: تحويل الـ keypoints إلى التنسيق المطلوب
      if (poses.length > 0) {
        for (const pose of poses) {
          // تحويل الـ keypoints إلى التنسيق المطلوب
          const mappedKeypoints = mapKeypoints(pose.keypoints);
          
          // حساب الـ bounding box من الـ keypoints
          const bbox = calculateBoundingBox(mappedKeypoints);
          
          playerPositions.push({
            frameNumber: i,
            timestamp,
            keypoints: mappedKeypoints,
            bbox: bbox,
            confidence: pose.score || 0.8 // استخدام score كقيمة للثقة أو 0.8 افتراضيًا
          });
        }
      }
    }
    
    // حساب متوسط عدد اللاعبين وثقة الكشف
    const avgCount = Math.round(totalDetections / frames.length);
    const confidence = 0.85; // قد تحتاج إلى حساب هذا من بيانات الثقة بالكشف الفعلية
    
    console.log("تم الانتهاء من تحليل الفيديو");
    
    return {
      count: avgCount,
      confidence,
      frameResults,
      playerPositions
    };
  } catch (error) {
    console.error("خطأ في تحليل الفيديو:", error);
    
    // في حالة حدوث خطأ، إرجاع بيانات فارغة
    return {
      count: 0,
      confidence: 0,
      frameResults: [],
      playerPositions: []
    };
  }
};

// كشف الأشخاص باستخدام TensorFlow.js
export const detectWithTensorflow = detectPeopleInVideo;
