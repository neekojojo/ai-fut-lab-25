
/**
 * نماذج البيانات المستخدمة في تحديد هوية اللاعبين والفرق من الفيديو
 */

// معلومات اللاعب المُحدد هويته
export interface IdentifiedPlayer {
  id: string;
  name: string;
  team: string;
  position: string;
  nationality: string;
  rating: number;
  confidenceScore: number;
}

// معلومات الفريق المُحدد هويته
export interface IdentifiedTeam {
  id: string;
  name: string;
  country: string;
  league: string;
  colors: string[];
  logo: string;
  confidenceScore: number;
}

// نتائج تحليل حركة اللاعب من الفيديو
export interface VideoAnalysisResult {
  playerId: string;
  playerName: string;
  teamName: string;
  movement: {
    avgSpeed: number;
    successRate: number;
    confidenceScore: number;
  };
  events: { type: string; count: number }[];
}

// دالة تحديد هوية اللاعب من الفيديو
export type PlayerIdentificationFunction = (videoFile: File) => Promise<IdentifiedPlayer[]>;

// دالة تحديد هوية الفريق من الفيديو
export type TeamIdentificationFunction = (videoFile: File) => Promise<IdentifiedTeam[]>;
