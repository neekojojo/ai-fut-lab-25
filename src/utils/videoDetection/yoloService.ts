
import { detectPlayersWithYOLO } from './yoloDetectionService';

export const detectPeopleUsingYolo = async (videoFile: File) => {
  console.log("Detecting people using YOLO model:", videoFile.name);
  return await detectPlayersWithYOLO(videoFile);
};
