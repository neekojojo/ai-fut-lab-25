
// Helper function to extract a specific number of frames from a video - highly optimized for speed
export const extractVideoFrames = async (
  videoFile: File,
  frameCount: number = 8 // Further reduced default frame count for faster processing
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
      // Instead of rejecting, return an empty array to prevent analysis from failing
      console.warn('Video loading timeout - proceeding with empty frames');
      resolve([]);
    }, 8000); // Reduced from 10000 to 8000ms
    
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
        const scaleFactor = 0.5; // Further reduced resolution to 50%
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
            // Add small random offsets to avoid exact frame times
            const randomOffset = Math.random() * 0.1;
            video.currentTime = initialSkip + (framesProcessed * frameInterval) + randomOffset;
          }
        }

        function cleanup() {
          URL.revokeObjectURL(videoURL);
          video.remove(); // Remove video element to free memory
          
          // Always provide at least one frame, even if frame extraction failed
          if (frames.length === 0) {
            console.warn('No frames extracted, providing placeholder frame');
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
      resolve([]);
    };
  });
};
