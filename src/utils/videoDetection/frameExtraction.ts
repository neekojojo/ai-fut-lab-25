
/**
 * Utility for extracting frames from video files for analysis
 */

/**
 * Extract a specified number of frames from a video file
 * @param videoFile The video file to extract frames from
 * @param frameCount Number of frames to extract (default: 10)
 * @returns Promise resolving to an array of ImageData objects
 */
export const extractVideoFrames = async (
  videoFile: File, 
  frameCount: number = 10
): Promise<ImageData[]> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      // Create a canvas to draw video frames
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas 2D context'));
        return;
      }
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Start playing the video
      video.currentTime = 0;
      video.play().catch(e => {
        reject(new Error(`Could not play video: ${e.message}`));
      });
      
      const frames: ImageData[] = [];
      const interval = video.duration / (frameCount + 1);
      let currentFrame = 1;
      
      // Extract frames at regular intervals
      const extractFrame = () => {
        if (currentFrame <= frameCount) {
          video.currentTime = interval * currentFrame;
          
          video.onseeked = () => {
            // Draw current frame to canvas and get image data
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            frames.push(imageData);
            
            currentFrame++;
            if (currentFrame <= frameCount) {
              extractFrame();
            } else {
              // All frames extracted, clean up and resolve
              video.pause();
              URL.revokeObjectURL(video.src);
              resolve(frames);
            }
          };
        }
      };
      
      extractFrame();
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error('Error loading video'));
    };
    
    // Start loading the video
    video.src = URL.createObjectURL(videoFile);
  });
};

/**
 * Extract frames at specific timestamps from a video file
 * @param videoFile The video file to extract frames from
 * @param timestamps Array of timestamps (in seconds) to extract frames at
 * @returns Promise resolving to an array of frames with timestamp information
 */
export const extractFramesAtTimestamps = async (
  videoFile: File,
  timestamps: number[]
): Promise<Array<{timestamp: number, data: ImageData}>> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      // Create a canvas to draw video frames
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        reject(new Error('Could not get canvas 2D context'));
        return;
      }
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const frames: Array<{timestamp: number, data: ImageData}> = [];
      let currentTimestampIndex = 0;
      
      // Extract frames at specified timestamps
      const extractFrame = () => {
        if (currentTimestampIndex < timestamps.length) {
          video.currentTime = timestamps[currentTimestampIndex];
          
          video.onseeked = () => {
            // Draw current frame to canvas and get image data
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            frames.push({
              timestamp: timestamps[currentTimestampIndex],
              data: imageData
            });
            
            currentTimestampIndex++;
            if (currentTimestampIndex < timestamps.length) {
              extractFrame();
            } else {
              // All frames extracted, clean up and resolve
              video.pause();
              URL.revokeObjectURL(video.src);
              resolve(frames);
            }
          };
        }
      };
      
      // Start extraction
      extractFrame();
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error('Error loading video'));
    };
    
    // Start loading the video
    video.src = URL.createObjectURL(videoFile);
  });
};

/**
 * نظام محسن لاستخراج سلسلة من الإطارات على فترات منتظمة مع تتبع الوقت
 * يُستخدم للتحليل المتقدم للاعبين
 */
export const extractFrameSequence = async (
  videoFile: File,
  startTime: number = 0,
  duration: number = 5,
  framesPerSecond: number = 10
): Promise<Array<{timestamp: number, data: ImageData}>> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = async () => {
      try {
        // تحقق من صحة الإدخال
        const videoLength = video.duration;
        if (startTime >= videoLength) {
          throw new Error('وقت البدء أكبر من مدة الفيديو');
        }
        
        const actualDuration = Math.min(duration, videoLength - startTime);
        const framesToExtract = Math.floor(actualDuration * framesPerSecond);
        
        // تهيئة عناصر الرسم
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          throw new Error('فشل في إنشاء سياق الرسم');
        }
        
        // ضبط أبعاد القماش لتتطابق مع الفيديو
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // اضبط وقت البدء
        video.currentTime = startTime;
        
        // انتظر حتى يتم ضبط وقت الفيديو
        await new Promise(resolve => {
          video.onseeked = resolve;
        });
        
        // استخراج الإطارات بشكل متسلسل
        const frameInterval = 1 / framesPerSecond; // الفاصل الزمني بين الإطارات بالثواني
        const frames: Array<{timestamp: number, data: ImageData}> = [];
        
        for (let i = 0; i < framesToExtract; i++) {
          const currentTime = startTime + (i * frameInterval);
          
          // تعيين وقت الفيديو
          video.currentTime = currentTime;
          
          // انتظر حتى يتم ضبط الوقت
          await new Promise(resolve => {
            video.onseeked = resolve;
          });
          
          // رسم الإطار واستخراج بياناته
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          
          frames.push({
            timestamp: currentTime * 1000, // تحويل إلى مللي ثانية للاتساق مع بقية النظام
            data: imageData
          });
        }
        
        // تنظيف الموارد
        video.pause();
        URL.revokeObjectURL(video.src);
        
        resolve(frames);
      } catch (error) {
        reject(error);
      }
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(video.src);
      reject(new Error('حدث خطأ أثناء تحميل الفيديو'));
    };
    
    // بدء تحميل الفيديو
    video.src = URL.createObjectURL(videoFile);
  });
};
