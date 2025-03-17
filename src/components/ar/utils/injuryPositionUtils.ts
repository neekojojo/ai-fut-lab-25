
// Utility functions for injury positions

export interface InjuryArea {
  name: string;
  risk: number;
  recommendation: string;
}

// Map injury area names to positions on the player model
export const getInjuryPosition = (areaName: string): string => {
  switch (areaName) {
    case "Hamstrings": return "0 -0.6 0.1";
    case "Knees": return "0 -0.8 0.1";
    case "Ankles": return "0 -1.1 0.1";
    case "Calves": return "0 -0.9 0.1";
    case "Groin": return "0 -0.4 0.1";
    case "Lower back": return "0 -0.2 0.1";
    case "Shoulders": return "0 0.6 0.1";
    case "Wrists": return "0.4 0.2 0.1";
    default: return "0 0 0.1";
  }
};
