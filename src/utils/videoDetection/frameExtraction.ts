
// Helper function to extract a specific number of frames from a video - highly optimized for speed
export const extractVideoFrames = async (
  videoFile: File,
  frameCount: number = 4 // Further reduced default frame count for faster processing
): Promise<ImageBitmap[]> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'auto';  // Changed to auto for faster loading
    video.muted = true;
    video.playsInline = true;
    
    // Create object URL for the video
    const videoURL = URL.createObjectURL(videoFile);
    video.src = videoURL;
    
    // Use smaller timeout to prevent hanging
    const timeout = setTimeout(() => {
      URL.revokeObjectURL(videoURL);
      // شكّل إطارًا وهميًا واحدًا على الأقل بدلاً من إرجاع مصفوفة فارغة
      console.warn('Video loading timeout - creating single placeholder frame');
      const placeholderCanvas = document.createElement('canvas');
      placeholderCanvas.width = 320;
      placeholderCanvas.height = 240;
      const ctx = placeholderCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 320, 240);
        createImageBitmap(placeholderCanvas)
          .then(bitmap => resolve([bitmap]))
          .catch(() => resolve([]));
      } else {
        resolve([]);
      }
    }, 4000); // Reduced from 6000ms to 4000ms for faster timeout response
    
    video.onloadedmetadata = () => {
      clearTimeout(timeout);
      
      // تحديد العدد الأمثل للإطارات استنادًا إلى مدة الفيديو
      const optimalFrameCount = Math.min(frameCount, Math.ceil(video.duration));
      const frameInterval = video.duration / optimalFrameCount;
      
      // معالجة الإطار الأول والأخير بشكل أسرع للحصول على نتائج سريعة
      if (optimalFrameCount <= 2 || video.duration < 3) {
        console.log("Using simplified frame extraction for very short video");
        processSimplifiedFrames();
        return;
      }
      
      // Prepare to collect frames
      const frames: ImageBitmap[] = [];
      let framesProcessed = 0;
      
      // Skip the first few frames if the video is long (often contains intros/blank screens)
      const initialSkip = video.duration > 10 ? 0.5 : 0;
      video.currentTime = initialSkip;
      
      // Process a single frame with optimized settings
      const processFrame = () => {
        // Skip if video dimensions are not available
        if (!video.videoWidth || !video.videoHeight) {
          console.warn('Video dimensions not available - skipping frame');
          framesProcessed++;
          if (framesProcessed >= optimalFrameCount) {
            cleanup();
          } else {
            video.currentTime = initialSkip + (framesProcessed * frameInterval);
          }
          return;
        }

        // Create canvas to capture video frame - reuse canvas for better performance
        const canvas = document.createElement('canvas');
        
        // Use a lower resolution for faster processing
        const scaleFactor = 0.3; // Further reduced resolution to 30%
        canvas.width = video.videoWidth * scaleFactor;
        canvas.height = video.videoHeight * scaleFactor;
        const ctx = canvas.getContext('2d', { alpha: false }); // Disable alpha for better performance
        
        if (ctx) {
          try {
            // Draw current frame to canvas at reduced resolution
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            // Convert canvas to ImageBitmap with optimized settings
            createImageBitmap(canvas, {
              resizeQuality: 'low', // Use lower quality for faster processing
              premultiplyAlpha: 'none' // Disable premultiply alpha for faster processing
            })
              .then(imageBitmap => {
                frames.push(imageBitmap);
                nextFrame();
              })
              .catch(error => {
                console.error('Error creating ImageBitmap:', error);
                // Continue to next frame even if one fails
                nextFrame();
              });
          } catch (e) {
            console.error('Error drawing video to canvas:', e);
            nextFrame();
          }
        } else {
          console.warn('Could not create canvas context - skipping frame');
          nextFrame();
        }

        function nextFrame() {
          framesProcessed++;
          if (framesProcessed >= optimalFrameCount) {
            cleanup();
          } else {
            // تخطي إطارات عشوائية لتسريع المعالجة - أسرع من قبل
            video.currentTime = initialSkip + (framesProcessed * frameInterval * 1.2);
          }
        }

        function cleanup() {
          URL.revokeObjectURL(videoURL);
          video.remove(); // Remove video element to free memory
          
          // Always return frames, even if we didn't get the requested number
          if (frames.length === 0 && optimalFrameCount > 0) {
            console.warn('No frames extracted, creating single placeholder frame');
            
            // Create empty placeholder frame
            const placeholderCanvas = document.createElement('canvas');
            placeholderCanvas.width = 320;
            placeholderCanvas.height = 240;
            const ctx = placeholderCanvas.getContext('2d');
            if (ctx) {
              ctx.fillStyle = '#000000';
              ctx.fillRect(0, 0, 320, 240);
              createImageBitmap(placeholderCanvas)
                .then(bitmap => {
                  resolve([bitmap]);
                })
                .catch(() => resolve([]));
            } else {
              resolve([]);
            }
          } else {
            resolve(frames);
          }
        }
      };
      
      // طريقة مبسطة لاستخراج الإطارات للفيديوهات القصيرة جدا
      function processSimplifiedFrames() {
        const canvas = document.createElement('canvas');
        const scaleFactor = 0.3;
        canvas.width = video.videoWidth * scaleFactor;
        canvas.height = video.videoHeight * scaleFactor;
        const ctx = canvas.getContext('2d', { alpha: false });
        
        if (!ctx) {
          console.warn('Could not create canvas context');
          URL.revokeObjectURL(videoURL);
          resolve([]);
          return;
        }
        
        // الحصول على إطار من بداية الفيديو
        video.currentTime = 0.1; // تجنب الإطار الأول صفر
        
        video.onseeked = () => {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          createImageBitmap(canvas, { resizeQuality: 'low' })
            .then(bitmap => {
              // الإطار الأول جاهز، الآن نحصل على الإطار الأخير
              const frames = [bitmap];
              
              // نحصل على إطار من نهاية الفيديو
              video.currentTime = Math.max(0, video.duration - 0.5);
              
              video.onseeked = () => {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                createImageBitmap(canvas, { resizeQuality: 'low' })
                  .then(lastBitmap => {
                    frames.push(lastBitmap);
                    URL.revokeObjectURL(videoURL);
                    video.remove();
                    resolve(frames);
                  })
                  .catch(error => {
                    console.error('Error creating last frame bitmap:', error);
                    URL.revokeObjectURL(videoURL);
                    video.remove();
                    resolve(frames);
                  });
              };
              
              // معالجة الأخطاء للإطار الأخير
              video.onerror = () => {
                console.warn('Error seeking to last frame');
                URL.revokeObjectURL(videoURL);
                video.remove();
                resolve(frames);
              };
            })
            .catch(error => {
              console.error('Error creating first frame bitmap:', error);
              URL.revokeObjectURL(videoURL);
              video.remove();
              // استخدم إطارًا وهميًا
              const placeholderCanvas = document.createElement('canvas');
              placeholderCanvas.width = 320;
              placeholderCanvas.height = 240;
              const ctx = placeholderCanvas.getContext('2d');
              if (ctx) {
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, 320, 240);
                createImageBitmap(placeholderCanvas)
                  .then(bitmap => resolve([bitmap]))
                  .catch(() => resolve([]));
              } else {
                resolve([]);
              }
            });
        };
        
        // معالجة الأخطاء للإطار الأول
        video.onerror = () => {
          console.warn('Error seeking to first frame');
          URL.revokeObjectURL(videoURL);
          resolve([]);
        };
      }
      
      // Handle seeking events
      video.onseeked = processFrame;
      
      // Handle errors during seeking
      video.onerror = () => {
        clearTimeout(timeout);
        URL.revokeObjectURL(videoURL);
        console.warn('Error during video seeking, proceeding with available frames');
        // If we already have some frames, return them instead of failing
        if (frames.length > 0) {
          resolve(frames);
        } else {
          // Create a placeholder frame rather than failing
          const placeholderCanvas = document.createElement('canvas');
          placeholderCanvas.width = 320;
          placeholderCanvas.height = 240;
          const ctx = placeholderCanvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, 320, 240);
            createImageBitmap(placeholderCanvas)
              .then(bitmap => {
                resolve([bitmap]);
              })
              .catch(() => resolve([]));
          } else {
            resolve([]);
          }
        }
      };
    };
    
    video.onerror = () => {
      clearTimeout(timeout);
      URL.revokeObjectURL(videoURL);
      console.warn('Error loading video, providing empty frames');
      
      // إنشاء إطار افتراضي بدلاً من إرجاع مصفوفة فارغة
      const placeholderCanvas = document.createElement('canvas');
      placeholderCanvas.width = 320;
      placeholderCanvas.height = 240;
      const ctx = placeholderCanvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 320, 240);
        createImageBitmap(placeholderCanvas)
          .then(bitmap => resolve([bitmap]))
          .catch(() => resolve([]));
      } else {
        resolve([]);
      }
    };
  });
};
