
import type { DetectionResult } from '@/utils/videoDetection/types';

// Helper function to extract basic video properties
export const getVideoProperties = async (file: File): Promise<{
  duration: number;
  width: number;
  height: number;
  aspectRatio: number;
}> => {
  return new Promise((resolve) => {
    try {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        resolve({
          duration: video.duration || 60,
          width: video.videoWidth || 1280,
          height: video.videoHeight || 720,
          aspectRatio: (video.videoWidth && video.videoHeight) 
            ? video.videoWidth / video.videoHeight 
            : 16/9
        });
        URL.revokeObjectURL(video.src);
      };
      
      video.onerror = () => {
        // Fall back to default values if video properties can't be read
        resolve({
          duration: 60,
          width: 1280,
          height: 720,
          aspectRatio: 16/9
        });
        URL.revokeObjectURL(video.src);
      };
      
      video.src = URL.createObjectURL(file);
      
      // Add timeout to avoid hanging
      setTimeout(() => {
        if (!video.videoWidth) {
          video.onerror(new Event('timeout'));
        }
      }, 2000);
    } catch (e) {
      // If any error happens, return default values
      resolve({
        duration: 60,
        width: 1280,
        height: 720,
        aspectRatio: 16/9
      });
    }
  });
};

// Generate a deterministic hash for video files
export const generateVideoHash = async (file: File): Promise<string> => {
  // Create a hash based on file name, size, and the first few bytes of content
  const firstChunk = await readFirstChunkOfFile(file, 1024);
  const contentHash = await simpleHash(firstChunk);
  return `${file.name}-${file.size}-${contentHash}`;
};

// Create a deterministic seed based on video file properties
export const createDeterministicSeed = async (file: File): Promise<number> => {
  const firstChunk = await readFirstChunkOfFile(file, 512);
  const arr = new Uint8Array(firstChunk);
  // Create a more varied seed by sampling bytes from the file
  let seed = file.size;
  for (let i = 0; i < arr.length; i += 32) {
    if (i < arr.length) {
      seed = (seed * 33) + arr[i];
    }
  }
  return Math.abs(seed);
};

// Read the first chunk of a file
export const readFirstChunkOfFile = async (file: File, size: number): Promise<ArrayBuffer> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        resolve(e.target.result as ArrayBuffer);
      } else {
        reject(new Error("Failed to read file chunk"));
      }
    };
    reader.onerror = reject;
    const blob = file.slice(0, Math.min(size, file.size));
    reader.readAsArrayBuffer(blob);
  });
};

// Simple hash function for array buffer
export const simpleHash = async (buffer: ArrayBuffer): Promise<string> => {
  const arr = new Uint8Array(buffer);
  let hash = 0;
  for (let i = 0; i < arr.length; i++) {
    hash = ((hash << 5) - hash) + arr[i];
    hash |= 0; // Convert to 32bit integer
  }
  return hash.toString(36);
};

// Generate realistic player positions based on video properties
export const generateRealisticPlayerPositions = (file: File) => {
  const positionCount = 10 + Math.floor(Math.random() * 10); // 10-20 positions
  const positions = [];
  
  for (let i = 0; i < positionCount; i++) {
    // Create more realistic position data with smoother progression
    const timestamp = i * (1 + Math.random() * 0.5);
    const x = 150 + Math.sin(i / 3) * 100 + Math.cos(i / 5) * 50;
    const y = 200 + Math.cos(i / 4) * 80 + Math.sin(i / 7) * 30;
    const speed = 5 + Math.sin(i / 2) * 3; // Speed varies between 2-8
    
    positions.push({
      timestamp,
      bbox: { 
        x, 
        y, 
        width: 40 + Math.random() * 20, 
        height: 80 + Math.random() * 40 
      },
      speed
    });
  }
  
  return positions;
};
