
// Helper function to extract a specific number of frames from a video - highly optimized for speed
export const extractVideoFrames = async (
  videoFile: File,
  frameCount: number = 10 // Further reduced default frame count for faster processing
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
      reject(new Error('Video loading timeout'));
    }, 10000);
    
    video.onloadedmetadata = () => {
      clearTimeout(timeout);
      
      // Determine optimal frame intervals based on video duration
      const optimalFrameCount = Math.min(frameCount, Math.ceil(video.duration * 2));
      const frameInterval = video.duration / optimalFrameCount;
      
      // Prepare to collect frames
      const frames: ImageBitmap[] = [];
      let framesProcessed = 0;
      
      // Skip the first few frames if the video is long (often contains intros/blank screens)
      const initialSkip = video.duration > 10 ? 0.5 : 0;
      video.currentTime = initialSkip;
      
      // Process a single frame with optimized settings
      const processFrame = () => {
        // Create canvas to capture video frame - reuse canvas for better performance
        const canvas = document.createElement('canvas');
        
        // Use a lower resolution for faster processing
        const scaleFactor = 0.6; // Further reduced resolution to 60%
        canvas.width = video.videoWidth * scaleFactor;
        canvas.height = video.videoHeight * scaleFactor;
        const ctx = canvas.getContext('2d', { alpha: false }); // Disable alpha for better performance
        
        if (ctx) {
          // Draw current frame to canvas at reduced resolution
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Convert canvas to ImageBitmap with optimized settings
          createImageBitmap(canvas, {
            resizeQuality: 'low', // Use lower quality for faster processing
            premultiplyAlpha: 'none' // Disable premultiply alpha for faster processing
          })
            .then(imageBitmap => {
              frames.push(imageBitmap);
              framesProcessed++;
              
              // Check if we're done
              if (framesProcessed >= optimalFrameCount) {
                // Release resources immediately
                URL.revokeObjectURL(videoURL);
                video.remove(); // Remove video element to free memory
                resolve(frames);
              } else {
                // Move to next frame - use calculated intervals based on optimal frame count
                video.currentTime = initialSkip + (framesProcessed * frameInterval);
              }
            })
            .catch(error => {
              console.error('Error creating ImageBitmap:', error);
              // Try to continue with next frame even if one fails
              framesProcessed++;
              video.currentTime = initialSkip + (framesProcessed * frameInterval);
            });
        } else {
          // If context creation fails, skip to next frame
          framesProcessed++;
          if (framesProcessed >= optimalFrameCount) {
            URL.revokeObjectURL(videoURL);
            video.remove();
            resolve(frames);
          } else {
            video.currentTime = initialSkip + (framesProcessed * frameInterval);
          }
        }
      };
      
      // Handle seeking events
      video.onseeked = processFrame;
      
      // Handle errors during seeking
      video.onerror = () => {
        clearTimeout(timeout);
        URL.revokeObjectURL(videoURL);
        // If we already have some frames, return them instead of failing
        if (frames.length > 0) {
          resolve(frames);
        } else {
          reject(new Error('Error processing video frames'));
        }
      };
    };
    
    video.onerror = () => {
      clearTimeout(timeout);
      URL.revokeObjectURL(videoURL);
      reject(new Error('Error loading video'));
    };
  });
};
