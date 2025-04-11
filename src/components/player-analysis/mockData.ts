
// This file contains mock data for player analysis

export const getPlayerStats = () => {
  return {
    // Technical metrics
    passing: 82,
    shooting: 75,
    dribbling: 86,
    ballControl: 84,
    vision: 78,
    positioning: 80,
    decision: 76,
    composure: 72,
    
    // Physical metrics
    speed: 78,
    acceleration: 82,
    stamina: 75,
    agility: 73,
    balance: 68,
    strength: 65,
    jumping: 70,
    
    // Movement metrics
    averageSpeed: 12.5,
    maxSpeed: 28.4,
    averageAcceleration: 2.8,
    totalDistance: 1250,
    sprintCount: 8,
    directionChanges: 24,
    
    // Position-specific metrics
    passingAccuracy: 81,
    progressivePasses: 78,
    keyPasses: 76,
    defensiveContributions: 65,
    
    // Overall metrics
    physical: 82,
    technical: 79,
    tactical: 75,
    overall: 79,
    
    // Additional metrics
    heatmapWeight: 72,
    sprintQuality: 79,
    movementEfficiency: 76,
    positioningAccuracy: 74,
    energyEfficiency: 77
  };
};

export const getMockAnalysis = () => {
  return {
    id: '1',
    playerName: "محمد عبد الله",
    playerAge: 19,
    position: "وسط",
    analysis: {
      id: '1',
      playerName: "محمد عبد الله",
      position: "وسط",
      age: 19,
      performanceScore: 82,
      talentScore: 88,
      technicalMetrics: {
        passing: 82,
        shooting: 75,
        dribbling: 86,
        ballControl: 84,
        vision: 78,
        positioning: 80,
        decision: 76,
        composure: 72
      },
      physicalMetrics: {
        speed: 78,
        acceleration: 82,
        stamina: 75,
        agility: 73,
        balance: 68,
        strength: 65,
        jumping: 70
      },
      movementMetrics: {
        averageSpeed: 12.5,
        topSpeed: 28.4,
        averageAcceleration: 2.8,
        totalDistance: 1250,
        sprintCount: 8,
        directionChanges: 24
      },
      strengths: [
        "تحكم ممتاز بالكرة",
        "مهارة المراوغة",
        "الرؤية الميدانية"
      ],
      weaknesses: [
        "التسديد من خارج منطقة الجزاء",
        "الثبات الانفعالي تحت الضغط"
      ],
      advancedInsights: [
        "يظهر قدرة استثنائية على التحكم بالكرة في المساحات الضيقة",
        "يتميز برؤية ميدانية ممتازة لتمرير الكرات المفتاحية",
        "يحتاج إلى تحسين القدرة على التسديد من مسافات بعيدة",
        "قدرة جيدة على المراوغة وتجاوز المدافعين"
      ]
    }
  };
};

export const getPlayerComparison = () => {
  return {
    similarProfessionals: [
      {
        name: "Kevin De Bruyne",
        team: "Manchester City",
        position: "Midfielder",
        match: 78,
        strengths: ["Vision", "Passing Range", "Set Pieces"]
      },
      {
        name: "Toni Kroos",
        team: "Real Madrid",
        position: "Midfielder",
        match: 72,
        strengths: ["Ball Control", "Positional Awareness", "Long Passing"]
      },
      {
        name: "Marco Verratti",
        team: "PSG",
        position: "Midfielder",
        match: 68,
        strengths: ["Dribbling", "Close Control", "Pressing Resistance"]
      }
    ]
  };
};

export const getTrainingRecommendations = () => {
  return [
    {
      id: '1',
      title: 'تدريبات تحسين التسديد من خارج منطقة الجزاء',
      duration: '15:20',
      difficulty: 'متقدم',
      focus: 'التسديد',
      thumbnailUrl: 'https://placehold.co/300x200/333/white?text=Shooting'
    },
    {
      id: '2',
      title: 'تمارين الثبات تحت الضغط',
      duration: '12:45',
      difficulty: 'متوسط',
      focus: 'التحكم بالكرة',
      thumbnailUrl: 'https://placehold.co/300x200/333/white?text=Control'
    },
    {
      id: '3',
      title: 'تدريبات التمرير المتقدمة',
      duration: '18:30',
      difficulty: 'متقدم',
      focus: 'التمرير',
      thumbnailUrl: 'https://placehold.co/300x200/333/white?text=Passing'
    }
  ];
};
