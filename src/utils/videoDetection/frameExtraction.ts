
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
 * @returns Promise resolving to an array of ImageData objects
 */
export const extractFramesAtTimestamps = async (
  videoFile: File,
  timestamps: number[]
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
      
      const frames: ImageData[] = [];
      let currentTimestampIndex = 0;
      
      // Extract frames at specified timestamps
      const extractFrame = () => {
        if (currentTimestampIndex < timestamps.length) {
          video.currentTime = timestamps[currentTimestampIndex];
          
          video.onseeked = () => {
            // Draw current frame to canvas and get image data
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            frames.push(imageData);
            
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
      video.play().catch(e => {
        reject(new Error(`Could not play video: ${e.message}`));
      });
      
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
