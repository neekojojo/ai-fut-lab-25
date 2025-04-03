

export interface SimilarProfessional {
  name: string;
  team: string;
  position: string;
  similarity: number;
  strengths: string[];
  nationality?: string;
  age?: number;
  rating?: number;
  attackType?: string;
  playingStyle?: string;
}

export interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  category?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetAreas: string[];
  createdAt?: string;
  views?: number;
  favorites?: number;
  // Properties used in dashboard components
  skill?: string;
  rating?: number;
  coach?: {
    name: string;
    avatarUrl?: string;
    title?: string;
  };
}

export interface TrainingExercise {
  name: string;
  description: string;
  difficulty: string;
}

export interface TrainingRecommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: number;
  estimatedTimeInMinutes: number;
  targetAreas: string[];
  expectedImprovement: number;
  
  // Additional properties needed by components
  area?: string;
  intensity?: string;
  frequency?: number; 
  duration?: number;
  exercises?: TrainingExercise[];
}

// كل اللاعبين المحترفين في مراكز الهجوم والوسط
export const professionalPlayers: SimilarProfessional[] = [
  // لاعبي الهجوم
  { name: "Lionel Messi", team: "Inter Miami", position: "forward", similarity: 89, strengths: ["Dribbling", "Vision", "Finishing"], nationality: "Argentina", age: 36, rating: 93, playingStyle: "Creative Forward" },
  { name: "Cristiano Ronaldo", team: "Al-Nassr", position: "forward", similarity: 88, strengths: ["Finishing", "Aerial Ability", "Power"], nationality: "Portugal", age: 39, rating: 90, playingStyle: "Complete Forward" },
  { name: "Kylian Mbappé", team: "Real Madrid", position: "forward", similarity: 91, strengths: ["Speed", "Finishing", "Movement"], nationality: "France", age: 25, rating: 91, playingStyle: "Inside Forward" },
  { name: "Erling Haaland", team: "Manchester City", position: "forward", similarity: 87, strengths: ["Finishing", "Strength", "Positioning"], nationality: "Norway", age: 23, rating: 91, playingStyle: "Target Man" },
  { name: "Robert Lewandowski", team: "Barcelona", position: "forward", similarity: 85, strengths: ["Finishing", "Movement", "Heading"], nationality: "Poland", age: 35, rating: 90, playingStyle: "Complete Striker" },
  { name: "Karim Benzema", team: "Al-Ittihad", position: "forward", similarity: 83, strengths: ["Link-up Play", "Finishing", "Intelligence"], nationality: "France", age: 36, rating: 89, playingStyle: "Deep-Lying Forward" },
  { name: "Harry Kane", team: "Bayern Munich", position: "forward", similarity: 84, strengths: ["Finishing", "Passing", "Vision"], nationality: "England", age: 30, rating: 90, playingStyle: "Complete Forward" },
  { name: "Vinicius Jr.", team: "Real Madrid", position: "forward", similarity: 89, strengths: ["Dribbling", "Speed", "Technique"], nationality: "Brazil", age: 23, rating: 89, playingStyle: "Winger" },
  { name: "Mohamed Salah", team: "Liverpool", position: "forward", similarity: 86, strengths: ["Finishing", "Speed", "Movement"], nationality: "Egypt", age: 31, rating: 89, playingStyle: "Inside Forward" },
  { name: "Neymar Jr.", team: "Al-Hilal", position: "forward", similarity: 84, strengths: ["Dribbling", "Creativity", "Technique"], nationality: "Brazil", age: 32, rating: 87, playingStyle: "Playmaker" },
  { name: "Lautaro Martínez", team: "Inter Milan", position: "forward", similarity: 82, strengths: ["Finishing", "Movement", "Work Rate"], nationality: "Argentina", age: 26, rating: 87, playingStyle: "Advanced Forward" },
  { name: "Darwin Núñez", team: "Liverpool", position: "forward", similarity: 80, strengths: ["Speed", "Power", "Work Rate"], nationality: "Uruguay", age: 24, rating: 82, playingStyle: "Mobile Striker" },
  { name: "Victor Osimhen", team: "Napoli", position: "forward", similarity: 81, strengths: ["Speed", "Finishing", "Aerial Ability"], nationality: "Nigeria", age: 25, rating: 86, playingStyle: "Complete Forward" },
  { name: "Luis Díaz", team: "Liverpool", position: "forward", similarity: 79, strengths: ["Dribbling", "Speed", "Technique"], nationality: "Colombia", age: 27, rating: 84, playingStyle: "Winger" },
  { name: "Rafael Leão", team: "AC Milan", position: "forward", similarity: 80, strengths: ["Speed", "Dribbling", "Strength"], nationality: "Portugal", age: 24, rating: 85, playingStyle: "Inside Forward" },
  { name: "Bukayo Saka", team: "Arsenal", position: "forward", similarity: 83, strengths: ["Dribbling", "Vision", "Work Rate"], nationality: "England", age: 22, rating: 86, playingStyle: "Inverted Winger" },
  { name: "Phil Foden", team: "Manchester City", position: "forward", similarity: 84, strengths: ["Technique", "Vision", "Movement"], nationality: "England", age: 23, rating: 87, playingStyle: "Inside Forward" },
  { name: "Julian Álvarez", team: "Manchester City", position: "forward", similarity: 81, strengths: ["Finishing", "Work Rate", "Intelligence"], nationality: "Argentina", age: 24, rating: 83, playingStyle: "Second Striker" },
  { name: "Gabriel Martinelli", team: "Arsenal", position: "forward", similarity: 79, strengths: ["Speed", "Dribbling", "Work Rate"], nationality: "Brazil", age: 22, rating: 82, playingStyle: "Inside Forward" },
  { name: "Christopher Nkunku", team: "Chelsea", position: "forward", similarity: 78, strengths: ["Finishing", "Technique", "Versatility"], nationality: "France", age: 26, rating: 85, playingStyle: "Second Striker" },
  { name: "Marcus Rashford", team: "Manchester United", position: "forward", similarity: 80, strengths: ["Speed", "Finishing", "Dribbling"], nationality: "England", age: 26, rating: 85, playingStyle: "Inside Forward" },
  { name: "João Félix", team: "Barcelona", position: "forward", similarity: 77, strengths: ["Technique", "Vision", "Finishing"], nationality: "Portugal", age: 24, rating: 83, playingStyle: "Second Striker" },
  { name: "Heung-min Son", team: "Tottenham Hotspur", position: "forward", similarity: 82, strengths: ["Finishing", "Speed", "Movement"], nationality: "South Korea", age: 31, rating: 87, playingStyle: "Inside Forward" },
  { name: "Jamal Musiala", team: "Bayern Munich", position: "forward", similarity: 85, strengths: ["Dribbling", "Technique", "Vision"], nationality: "Germany", age: 21, rating: 86, playingStyle: "Second Striker" },
  { name: "Cody Gakpo", team: "Liverpool", position: "forward", similarity: 78, strengths: ["Finishing", "Power", "Versatility"], nationality: "Netherlands", age: 24, rating: 83, playingStyle: "Inside Forward" },
  { name: "Kai Havertz", team: "Arsenal", position: "forward", similarity: 76, strengths: ["Technique", "Aerial Ability", "Versatility"], nationality: "Germany", age: 24, rating: 84, playingStyle: "False Nine" },
  { name: "Dušan Vlahović", team: "Juventus", position: "forward", similarity: 79, strengths: ["Finishing", "Strength", "Heading"], nationality: "Serbia", age: 24, rating: 83, playingStyle: "Target Man" },
  { name: "Nico Williams", team: "Athletic Bilbao", position: "forward", similarity: 81, strengths: ["Speed", "Dribbling", "Crossing"], nationality: "Spain", age: 21, rating: 82, playingStyle: "Traditional Winger" },
  { name: "Alexander Isak", team: "Newcastle United", position: "forward", similarity: 78, strengths: ["Finishing", "Technique", "Movement"], nationality: "Sweden", age: 24, rating: 82, playingStyle: "Mobile Striker" },
  { name: "Khvicha Kvaratskhelia", team: "Napoli", position: "forward", similarity: 80, strengths: ["Dribbling", "Vision", "Technique"], nationality: "Georgia", age: 23, rating: 84, playingStyle: "Inside Forward" },
  { name: "Randal Kolo Muani", team: "Paris Saint-Germain", position: "forward", similarity: 77, strengths: ["Speed", "Finishing", "Versatility"], nationality: "France", age: 25, rating: 82, playingStyle: "Mobile Striker" },
  { name: "Ademola Lookman", team: "Atalanta", position: "forward", similarity: 76, strengths: ["Speed", "Dribbling", "Finishing"], nationality: "Nigeria", age: 26, rating: 81, playingStyle: "Inside Forward" },
  { name: "Jonathan David", team: "Lille", position: "forward", similarity: 79, strengths: ["Finishing", "Movement", "Speed"], nationality: "Canada", age: 24, rating: 82, playingStyle: "Complete Forward" },
  { name: "Anthony Gordon", team: "Newcastle United", position: "forward", similarity: 75, strengths: ["Speed", "Work Rate", "Dribbling"], nationality: "England", age: 23, rating: 80, playingStyle: "Winger" },
  { name: "João Pedro", team: "Brighton", position: "forward", similarity: 74, strengths: ["Technique", "Finishing", "Movement"], nationality: "Brazil", age: 22, rating: 79, playingStyle: "Second Striker" },
  { name: "Kaoru Mitoma", team: "Brighton", position: "forward", similarity: 77, strengths: ["Dribbling", "Speed", "Technique"], nationality: "Japan", age: 26, rating: 81, playingStyle: "Winger" },
  { name: "Ollie Watkins", team: "Aston Villa", position: "forward", similarity: 78, strengths: ["Speed", "Finishing", "Work Rate"], nationality: "England", age: 28, rating: 82, playingStyle: "Advanced Forward" },
  { name: "Takumi Minamino", team: "Monaco", position: "forward", similarity: 73, strengths: ["Technique", "Movement", "Work Rate"], nationality: "Japan", age: 29, rating: 78, playingStyle: "Second Striker" },
  { name: "Gonçalo Ramos", team: "Paris Saint-Germain", position: "forward", similarity: 77, strengths: ["Finishing", "Movement", "Work Rate"], nationality: "Portugal", age: 22, rating: 81, playingStyle: "Complete Forward" },
  { name: "Raphinha", team: "Barcelona", position: "forward", similarity: 79, strengths: ["Dribbling", "Crossing", "Vision"], nationality: "Brazil", age: 27, rating: 84, playingStyle: "Inverted Winger" },
  { name: "Julián Álvarez", team: "Manchester City", position: "forward", similarity: 81, strengths: ["Movement", "Finishing", "Work Rate"], nationality: "Argentina", age: 24, rating: 83, playingStyle: "Complete Forward" },
  { name: "Moussa Diaby", team: "Al-Ittihad", position: "forward", similarity: 76, strengths: ["Speed", "Dribbling", "Technique"], nationality: "France", age: 24, rating: 83, playingStyle: "Winger" },
  { name: "Ferran Torres", team: "Barcelona", position: "forward", similarity: 75, strengths: ["Finishing", "Movement", "Versatility"], nationality: "Spain", age: 24, rating: 81, playingStyle: "Inside Forward" },
  { name: "Timo Werner", team: "RB Leipzig", position: "forward", similarity: 74, strengths: ["Speed", "Movement", "Work Rate"], nationality: "Germany", age: 28, rating: 80, playingStyle: "Inside Forward" },
  { name: "Folarin Balogun", team: "Monaco", position: "forward", similarity: 73, strengths: ["Finishing", "Speed", "Technique"], nationality: "USA", age: 22, rating: 78, playingStyle: "Advanced Forward" },
  { name: "Patson Daka", team: "Leicester City", position: "forward", similarity: 72, strengths: ["Speed", "Finishing", "Movement"], nationality: "Zambia", age: 25, rating: 77, playingStyle: "Mobile Striker" },
  { name: "Benjamin Šeško", team: "RB Leipzig", position: "forward", similarity: 77, strengths: ["Speed", "Finishing", "Strength"], nationality: "Slovenia", age: 20, rating: 79, playingStyle: "Complete Forward" },
  
  // لاعبي الوسط
  { name: "Kevin De Bruyne", team: "Manchester City", position: "midfielder", similarity: 90, strengths: ["Vision", "Passing", "Shooting"], nationality: "Belgium", age: 32, rating: 91, playingStyle: "Playmaker" },
  { name: "Rodri", team: "Manchester City", position: "midfielder", similarity: 89, strengths: ["Passing", "Positioning", "Intelligence"], nationality: "Spain", age: 27, rating: 89, playingStyle: "Defensive Midfielder" },
  { name: "Jude Bellingham", team: "Real Madrid", position: "midfielder", similarity: 92, strengths: ["Technique", "Vision", "Work Rate"], nationality: "England", age: 20, rating: 88, playingStyle: "Box-to-Box Midfielder" },
  { name: "Pedri", team: "Barcelona", position: "midfielder", similarity: 88, strengths: ["Technique", "Vision", "Control"], nationality: "Spain", age: 21, rating: 87, playingStyle: "Advanced Playmaker" },
  { name: "Martin Ødegaard", team: "Arsenal", position: "midfielder", similarity: 89, strengths: ["Vision", "Technique", "Passing"], nationality: "Norway", age: 25, rating: 87, playingStyle: "Advanced Playmaker" },
  { name: "Bruno Fernandes", team: "Manchester United", position: "midfielder", similarity: 84, strengths: ["Vision", "Passing", "Shooting"], nationality: "Portugal", age: 29, rating: 88, playingStyle: "Advanced Playmaker" },
  { name: "İlkay Gündoğan", team: "Barcelona", position: "midfielder", similarity: 82, strengths: ["Technique", "Intelligence", "Positioning"], nationality: "Germany", age: 33, rating: 85, playingStyle: "Box-to-Box Midfielder" },
  { name: "Federico Valverde", team: "Real Madrid", position: "midfielder", similarity: 85, strengths: ["Stamina", "Versatility", "Shooting"], nationality: "Uruguay", age: 25, rating: 86, playingStyle: "Box-to-Box Midfielder" },
  { name: "Declan Rice", team: "Arsenal", position: "midfielder", similarity: 83, strengths: ["Tackling", "Positioning", "Leadership"], nationality: "England", age: 25, rating: 85, playingStyle: "Defensive Midfielder" },
  { name: "N'Golo Kanté", team: "Al-Ittihad", position: "midfielder", similarity: 81, strengths: ["Tackling", "Stamina", "Interceptions"], nationality: "France", age: 33, rating: 86, playingStyle: "Ball-Winning Midfielder" },
  { name: "Casemiro", team: "Manchester United", position: "midfielder", similarity: 82, strengths: ["Tackling", "Positioning", "Passing"], nationality: "Brazil", age: 32, rating: 87, playingStyle: "Defensive Midfielder" },
  { name: "Bernardo Silva", team: "Manchester City", position: "midfielder", similarity: 86, strengths: ["Technique", "Vision", "Work Rate"], nationality: "Portugal", age: 29, rating: 88, playingStyle: "Advanced Playmaker" },
  { name: "Toni Kroos", team: "Real Madrid", position: "midfielder", similarity: 81, strengths: ["Passing", "Vision", "Control"], nationality: "Germany", age: 34, rating: 86, playingStyle: "Deep-Lying Playmaker" },
  { name: "Luka Modric", team: "Real Madrid", position: "midfielder", similarity: 80, strengths: ["Vision", "Technique", "Game Intelligence"], nationality: "Croatia", age: 38, rating: 87, playingStyle: "Advanced Playmaker" },
  { name: "Nicolò Barella", team: "Inter Milan", position: "midfielder", similarity: 84, strengths: ["Technique", "Work Rate", "Vision"], nationality: "Italy", age: 27, rating: 86, playingStyle: "Box-to-Box Midfielder" },
  { name: "Joshua Kimmich", team: "Bayern Munich", position: "midfielder", similarity: 83, strengths: ["Passing", "Versatility", "Technique"], nationality: "Germany", age: 29, rating: 88, playingStyle: "Deep-Lying Playmaker" },
  { name: "Aurélien Tchouaméni", team: "Real Madrid", position: "midfielder", similarity: 82, strengths: ["Tackling", "Positioning", "Physicality"], nationality: "France", age: 24, rating: 84, playingStyle: "Defensive Midfielder" },
  { name: "Eduardo Camavinga", team: "Real Madrid", position: "midfielder", similarity: 83, strengths: ["Technique", "Tackling", "Stamina"], nationality: "France", age: 21, rating: 82, playingStyle: "Box-to-Box Midfielder" },
  { name: "Vitinha", team: "Paris Saint-Germain", position: "midfielder", similarity: 81, strengths: ["Technique", "Passing", "Work Rate"], nationality: "Portugal", age: 24, rating: 83, playingStyle: "Deep-Lying Playmaker" },
  { name: "Sergej Milinković-Savić", team: "Al-Hilal", position: "midfielder", similarity: 79, strengths: ["Physicality", "Technique", "Aerial Ability"], nationality: "Serbia", age: 29, rating: 85, playingStyle: "Box-to-Box Midfielder" },
  { name: "Kobbie Mainoo", team: "Manchester United", position: "midfielder", similarity: 78, strengths: ["Technique", "Composure", "Passing"], nationality: "England", age: 19, rating: 78, playingStyle: "Deep-Lying Playmaker" },
  { name: "Enzo Fernández", team: "Chelsea", position: "midfielder", similarity: 81, strengths: ["Passing", "Vision", "Work Rate"], nationality: "Argentina", age: 23, rating: 82, playingStyle: "Deep-Lying Playmaker" },
  { name: "Fabinho", team: "Al-Ittihad", position: "midfielder", similarity: 77, strengths: ["Positioning", "Tackling", "Passing"], nationality: "Brazil", age: 30, rating: 84, playingStyle: "Defensive Midfielder" },
  { name: "Teun Koopmeiners", team: "Atalanta", position: "midfielder", similarity: 79, strengths: ["Shooting", "Passing", "Tackling"], nationality: "Netherlands", age: 26, rating: 83, playingStyle: "Box-to-Box Midfielder" },
  { name: "Alexis Mac Allister", team: "Liverpool", position: "midfielder", similarity: 80, strengths: ["Passing", "Technique", "Work Rate"], nationality: "Argentina", age: 25, rating: 82, playingStyle: "Box-to-Box Midfielder" },
  { name: "Moises Caicedo", team: "Chelsea", position: "midfielder", similarity: 78, strengths: ["Tackling", "Stamina", "Positioning"], nationality: "Ecuador", age: 22, rating: 81, playingStyle: "Ball-Winning Midfielder" },
  { name: "Florian Wirtz", team: "Bayer Leverkusen", position: "midfielder", similarity: 85, strengths: ["Technique", "Vision", "Dribbling"], nationality: "Germany", age: 20, rating: 86, playingStyle: "Advanced Playmaker" },
  { name: "Xavi Simons", team: "RB Leipzig", position: "midfielder", similarity: 81, strengths: ["Technique", "Vision", "Dribbling"], nationality: "Netherlands", age: 20, rating: 81, playingStyle: "Advanced Playmaker" },
  { name: "Hakan Çalhanoğlu", team: "Inter Milan", position: "midfielder", similarity: 78, strengths: ["Passing", "Set Pieces", "Shooting"], nationality: "Turkey", age: 30, rating: 84, playingStyle: "Deep-Lying Playmaker" },
  { name: "Dani Olmo", team: "Leipzig", position: "midfielder", similarity: 79, strengths: ["Technique", "Vision", "Passing"], nationality: "Spain", age: 25, rating: 83, playingStyle: "Advanced Playmaker" },
  { name: "Youri Tielemans", team: "Aston Villa", position: "midfielder", similarity: 76, strengths: ["Passing", "Shooting", "Technique"], nationality: "Belgium", age: 27, rating: 82, playingStyle: "Deep-Lying Playmaker" },
  { name: "James Maddison", team: "Tottenham Hotspur", position: "midfielder", similarity: 77, strengths: ["Technique", "Vision", "Set Pieces"], nationality: "England", age: 27, rating: 82, playingStyle: "Advanced Playmaker" },
  { name: "Orkun Kökçü", team: "Benfica", position: "midfielder", similarity: 76, strengths: ["Technique", "Passing", "Set Pieces"], nationality: "Turkey", age: 23, rating: 80, playingStyle: "Deep-Lying Playmaker" },
  { name: "Lucas Paquetá", team: "West Ham United", position: "midfielder", similarity: 75, strengths: ["Technique", "Vision", "Versatility"], nationality: "Brazil", age: 26, rating: 82, playingStyle: "Advanced Playmaker" },
  { name: "Mason Mount", team: "Manchester United", position: "midfielder", similarity: 76, strengths: ["Technique", "Passing", "Work Rate"], nationality: "England", age: 25, rating: 83, playingStyle: "Advanced Playmaker" },
  { name: "Mikel Merino", team: "Real Sociedad", position: "midfielder", similarity: 75, strengths: ["Aerial Ability", "Passing", "Technique"], nationality: "Spain", age: 27, rating: 83, playingStyle: "Box-to-Box Midfielder" },
  { name: "Ryan Gravenberch", team: "Liverpool", position: "midfielder", similarity: 77, strengths: ["Technique", "Physicality", "Passing"], nationality: "Netherlands", age: 21, rating: 80, playingStyle: "Box-to-Box Midfielder" },
  { name: "Gavi", team: "Barcelona", position: "midfielder", similarity: 82, strengths: ["Technique", "Work Rate", "Passing"], nationality: "Spain", age: 19, rating: 83, playingStyle: "Box-to-Box Midfielder" },
  { name: "Matheus Nunes", team: "Manchester City", position: "midfielder", similarity: 76, strengths: ["Dribbling", "Passing", "Technique"], nationality: "Portugal", age: 25, rating: 81, playingStyle: "Box-to-Box Midfielder" },
  { name: "Granit Xhaka", team: "Bayer Leverkusen", position: "midfielder", similarity: 74, strengths: ["Passing", "Leadership", "Shooting"], nationality: "Switzerland", age: 31, rating: 82, playingStyle: "Deep-Lying Playmaker" },
  { name: "Sandro Tonali", team: "Newcastle United", position: "midfielder", similarity: 77, strengths: ["Passing", "Technique", "Tackling"], nationality: "Italy", age: 23, rating: 82, playingStyle: "Deep-Lying Playmaker" },
  { name: "Dominik Szoboszlai", team: "Liverpool", position: "midfielder", similarity: 78, strengths: ["Technique", "Shooting", "Work Rate"], nationality: "Hungary", age: 23, rating: 82, playingStyle: "Advanced Playmaker" },
  { name: "Cole Palmer", team: "Chelsea", position: "midfielder", similarity: 81, strengths: ["Technique", "Vision", "Finishing"], nationality: "England", age: 21, rating: 80, playingStyle: "Advanced Playmaker" },
  { name: "Bruno Guimarães", team: "Newcastle United", position: "midfielder", similarity: 80, strengths: ["Passing", "Technique", "Tackling"], nationality: "Brazil", age: 26, rating: 84, playingStyle: "Deep-Lying Playmaker" },
  { name: "Tijjani Reijnders", team: "AC Milan", position: "midfielder", similarity: 75, strengths: ["Technique", "Passing", "Stamina"], nationality: "Netherlands", age: 25, rating: 79, playingStyle: "Box-to-Box Midfielder" },
  { name: "Andreas Skov Olsen", team: "Club Brugge", position: "midfielder", similarity: 73, strengths: ["Technique", "Shooting", "Crossing"], nationality: "Denmark", age: 24, rating: 78, playingStyle: "Inside Forward" },
  { name: "Warren Zaïre-Emery", team: "Paris Saint-Germain", position: "midfielder", similarity: 76, strengths: ["Technique", "Work Rate", "Tackling"], nationality: "France", age: 18, rating: 77, playingStyle: "Box-to-Box Midfielder" },
  { name: "Arda Güler", team: "Real Madrid", position: "midfielder", similarity: 79, strengths: ["Technique", "Vision", "Dribbling"], nationality: "Turkey", age: 19, rating: 78, playingStyle: "Advanced Playmaker" },
  { name: "Marcos Llorente", team: "Atlético Madrid", position: "midfielder", similarity: 74, strengths: ["Stamina", "Speed", "Versatility"], nationality: "Spain", age: 29, rating: 83, playingStyle: "Box-to-Box Midfielder" },
  { name: "Houssem Aouar", team: "Roma", position: "midfielder", similarity: 72, strengths: ["Technique", "Vision", "Passing"], nationality: "Algeria", age: 25, rating: 80, playingStyle: "Advanced Playmaker" },
  { name: "Emile Smith Rowe", team: "Arsenal", position: "midfielder", similarity: 73, strengths: ["Technique", "Movement", "Work Rate"], nationality: "England", age: 23, rating: 78, playingStyle: "Advanced Playmaker" },
  { name: "Harvey Elliott", team: "Liverpool", position: "midfielder", similarity: 74, strengths: ["Technique", "Vision", "Crossing"], nationality: "England", age: 21, rating: 77, playingStyle: "Inside Forward" },
  { name: "Salis Abdul Samed", team: "Lens", position: "midfielder", similarity: 72, strengths: ["Tackling", "Work Rate", "Positioning"], nationality: "Ghana", age: 24, rating: 77, playingStyle: "Ball-Winning Midfielder" },
  { name: "Roberto Firmino", team: "Al-Ahli", position: "midfielder", similarity: 71, strengths: ["Technique", "Work Rate", "Link-up Play"], nationality: "Brazil", age: 32, rating: 83, playingStyle: "False Nine" },
  { name: "Rayan Cherki", team: "Lyon", position: "midfielder", similarity: 74, strengths: ["Technique", "Dribbling", "Vision"], nationality: "France", age: 20, rating: 76, playingStyle: "Advanced Playmaker" },
  { name: "Enzo Le Fée", team: "Rennes", position: "midfielder", similarity: 73, strengths: ["Passing", "Technique", "Vision"], nationality: "France", age: 24, rating: 77, playingStyle: "Deep-Lying Playmaker" },
  { name: "Pape Matar Sarr", team: "Tottenham Hotspur", position: "midfielder", similarity: 72, strengths: ["Technique", "Work Rate", "Passing"], nationality: "Senegal", age: 21, rating: 77, playingStyle: "Box-to-Box Midfielder" },
  { name: "Carney Chukwuemeka", team: "Chelsea", position: "midfielder", similarity: 71, strengths: ["Physicality", "Technique", "Dribbling"], nationality: "England", age: 20, rating: 75, playingStyle: "Box-to-Box Midfielder" },
  { name: "Mohammed Kudus", team: "West Ham United", position: "midfielder", similarity: 78, strengths: ["Technique", "Speed", "Dribbling"], nationality: "Ghana", age: 23, rating: 80, playingStyle: "Advanced Playmaker" },
  { name: "Sergio Busquets", team: "Inter Miami", position: "midfielder", similarity: 70, strengths: ["Positioning", "Passing", "Intelligence"], nationality: "Spain", age: 35, rating: 83, playingStyle: "Defensive Midfielder" }
];

