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

// More sophisticated hash function to create consistent video fingerprints
export const generateVideoHash = async (file: File): Promise<string> => {
  // Calculate hash based on more robust file properties
  const firstChunk = await readFirstChunkOfFile(file, 2048); // Increased sample size
  const contentHash = await simpleHash(firstChunk);
  const fileProps = `${file.name}-${file.size}-${file.type}-${file.lastModified}`;
  return `${fileProps}-${contentHash}`;
};

// Create an even more deterministic seed based on video file properties
export const createDeterministicSeed = async (file: File): Promise<number> => {
  const firstChunk = await readFirstChunkOfFile(file, 1024); // More data for better seeding
  const arr = new Uint8Array(firstChunk);
  
  // Create a more robust seed by using CRC-like algorithm
  let seed = 0;
  for (let i = 0; i < arr.length; i++) {
    seed = ((seed << 5) - seed + arr[i]) | 0;
  }
  
  // Make sure we return a positive number
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

// Generate deterministic player positions based on video properties and seed
export const generateRealisticPlayerPositions = (file: File) => {
  const positionCount = 15; // Fixed count instead of random
  const positions = [];
  
  // Use deterministic values based on filename/size
  const seedOffset = file.size % 100;
  
  for (let i = 0; i < positionCount; i++) {
    // Create completely deterministic position data
    const timestamp = i * 1.2; // Fixed interval
    const x = 150 + Math.sin((i + seedOffset) / 3) * 100 + Math.cos((i + seedOffset) / 5) * 50;
    const y = 200 + Math.cos((i + seedOffset) / 4) * 80 + Math.sin((i + seedOffset) / 7) * 30;
    const speed = 5 + Math.sin((i + seedOffset) / 2) * 3;
    
    positions.push({
      timestamp,
      bbox: { 
        x, 
        y, 
        width: 40 + Math.sin(i) * 10, // Deterministic width
        height: 80 + Math.cos(i) * 20  // Deterministic height
      },
      speed
    });
  }
  
  return positions;
};
