
// Helper function to extract a specific number of frames from a video - optimized for speed
export const extractVideoFrames = async (
  videoFile: File,
  frameCount: number = 15 // Reduced default frame count for faster processing
): Promise<ImageBitmap[]> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.muted = true;
    video.playsInline = true;
    
    // Create object URL for the video
    const videoURL = URL.createObjectURL(videoFile);
    video.src = videoURL;
    
    video.onloadedmetadata = () => {
      video.currentTime = 0;
      
      // Prepare to collect frames
      const frames: ImageBitmap[] = [];
      const frameInterval = video.duration / frameCount;
      let framesProcessed = 0;
      
      // Process a single frame
      const processFrame = (currentTime: number) => {
        // Create canvas to capture video frame
        const canvas = document.createElement('canvas');
        // Use a lower resolution for faster processing
        const scaleFactor = 0.75; // Reduce resolution to 75%
        canvas.width = video.videoWidth * scaleFactor;
        canvas.height = video.videoHeight * scaleFactor;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Draw current frame to canvas at reduced resolution
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Convert canvas to ImageBitmap with optimized settings
          createImageBitmap(canvas, {
            resizeQuality: 'low' // Use lower quality for faster processing
          })
            .then(imageBitmap => {
              frames.push(imageBitmap);
              framesProcessed++;
              
              // Check if we're done
              if (framesProcessed >= frameCount) {
                // Release resources
                URL.revokeObjectURL(videoURL);
                resolve(frames);
              } else {
                // Move to next frame - use larger intervals to reduce processing
                video.currentTime = Math.min(video.duration, (framesProcessed + 1) * frameInterval);
              }
            })
            .catch(reject);
        }
      };
      
      // Handle seeking events
      video.onseeked = () => processFrame(video.currentTime);
      
      // Start playing to trigger seeking
      video.play().catch(reject);
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(videoURL);
      reject(new Error('Error loading video'));
    };
  });
};
