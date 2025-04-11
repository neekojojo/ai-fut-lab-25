
// Service for analyzing team compatibility

// This function analyzes how compatible a player is with various teams
export const analyzeTeamCompatibility = (
  playerStats: any,
  playerPosition: string,
  playerStrengths: string[]
) => {
  // In a real app, this would use complex algorithms and team data
  // For now, we'll use a simplified version with sample teams
  
  // Sample Saudi league teams data
  const saudiLeagueTeams = [
    {
      id: "hilal",
      name: "الهلال",
      logo: "https://upload.wikimedia.org/wikipedia/en/a/a5/Al_Hilal_FC_logo.svg",
      formation: "4-3-3",
      playingStyle: "استحواذ هجومي",
      tacticalPreferences: {
        possession: 65,
        pressing: 70,
        counterAttack: 60,
        buildUpPace: "slow",
        defensiveStyle: "high-line"
      },
      positionNeeds: {
        "وسط": {
          technicalRequirements: ["vision", "passing", "ballControl"],
          physicalRequirements: ["stamina"],
          desiredAttributes: ["الرؤية الميدانية", "التمرير الدقيق", "التحكم بالكرة"]
        }
      }
    },
    {
      id: "nassr",
      name: "النصر",
      logo: "https://upload.wikimedia.org/wikipedia/en/c/c4/Al-Nassr.png",
      formation: "4-2-3-1",
      playingStyle: "هجوم سريع",
      tacticalPreferences: {
        possession: 55,
        pressing: 65,
        counterAttack: 80,
        buildUpPace: "fast",
        defensiveStyle: "medium-block"
      },
      positionNeeds: {
        "وسط": {
          technicalRequirements: ["passing", "vision", "decision"],
          physicalRequirements: ["pace", "stamina"],
          desiredAttributes: ["السرعة", "المراوغة", "اتخاذ القرار"]
        }
      }
    },
    {
      id: "ittihad",
      name: "الاتحاد",
      logo: "https://upload.wikimedia.org/wikipedia/en/9/97/Ittihad_FC.png",
      formation: "3-5-2",
      playingStyle: "ضغط عالٍ",
      tacticalPreferences: {
        possession: 50,
        pressing: 85,
        counterAttack: 75,
        buildUpPace: "mixed",
        defensiveStyle: "aggressive"
      },
      positionNeeds: {
        "وسط": {
          technicalRequirements: ["ballControl", "passing", "vision"],
          physicalRequirements: ["stamina", "strength"],
          desiredAttributes: ["التحكم بالكرة", "الرؤية الميدانية", "القوة البدنية"]
        }
      }
    },
    {
      id: "ahli",
      name: "الأهلي",
      logo: "https://upload.wikimedia.org/wikipedia/en/2/2d/Al-Ahli_Saudi_FC_logo.svg",
      formation: "4-4-2",
      playingStyle: "متوازن",
      tacticalPreferences: {
        possession: 58,
        pressing: 60,
        counterAttack: 65,
        buildUpPace: "mixed",
        defensiveStyle: "balanced"
      },
      positionNeeds: {
        "وسط": {
          technicalRequirements: ["passing", "vision", "ballControl"],
          physicalRequirements: ["stamina", "agility"],
          desiredAttributes: ["التمرير الدقيق", "الرؤية الميدانية", "الرشاقة"]
        }
      }
    },
    {
      id: "shabab",
      name: "الشباب",
      logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/AlShabab.png",
      formation: "4-2-3-1",
      playingStyle: "فني متوازن",
      tacticalPreferences: {
        possession: 60,
        pressing: 65,
        counterAttack: 70,
        buildUpPace: "mixed",
        defensiveStyle: "medium-block"
      },
      positionNeeds: {
        "وسط": {
          technicalRequirements: ["ballControl", "vision", "positioning"],
          physicalRequirements: ["stamina", "agility"],
          desiredAttributes: ["التحكم بالكرة", "الرؤية الميدانية", "التموضع الجيد"]
        }
      }
    }
  ];
  
  // Analyze compatibility with each team
  const results = saudiLeagueTeams.map(team => {
    // Check position fit (simplified)
    const positionInfo = team.positionNeeds[playerPosition] || team.positionNeeds["وسط"];
    let positionFit = 70; // Base compatibility
    
    // Calculate technical match
    let technicalMatchCount = 0;
    if (positionInfo) {
      positionInfo.technicalRequirements.forEach(req => {
        if (req === "vision" && playerStats.vision > 60) technicalMatchCount++;
        if (req === "passing" && playerStats.passing > 60) technicalMatchCount++;
        if (req === "ballControl" && playerStats.ballControl > 60) technicalMatchCount++;
        if (req === "decision" && playerStats.decision > 60) technicalMatchCount++;
        if (req === "positioning" && playerStats.positioning > 60) technicalMatchCount++;
      });
      
      positionFit += (technicalMatchCount / positionInfo.technicalRequirements.length) * 15;
    }
    
    // Calculate physical match
    let physicalMatchCount = 0;
    if (positionInfo) {
      positionInfo.physicalRequirements.forEach(req => {
        if (req === "pace" && playerStats.pace > 60) physicalMatchCount++;
        if (req === "stamina" && playerStats.stamina > 60) physicalMatchCount++;
        if (req === "strength" && playerStats.strength > 60) physicalMatchCount++;
        if (req === "agility" && playerStats.agility > 60) physicalMatchCount++;
      });
      
      positionFit += (physicalMatchCount / positionInfo.physicalRequirements.length) * 15;
    }
    
    // Calculate tactical fit (simplified)
    let tacticalFit = 70; // Base compatibility
    
    // Adjust based on playing style
    if (team.playingStyle === "استحواذ هجومي" && playerStats.passing > 75) {
      tacticalFit += 10;
    } else if (team.playingStyle === "هجوم سريع" && playerStats.pace > 75) {
      tacticalFit += 10;
    } else if (team.playingStyle === "ضغط عالٍ" && playerStats.stamina > 75) {
      tacticalFit += 10;
    }
    
    // Calculate attribute match
    const strengthsMatch = positionInfo 
      ? playerStrengths.filter(strength => 
          positionInfo.desiredAttributes.includes(strength)
        )
      : [];
    
    // Calculate overall compatibility
    const compatibilityScore = Math.round((positionFit * 0.5) + (tacticalFit * 0.5));
    
    // Generate a role description based on team and position
    let roleDescription = "";
    if (team.playingStyle === "استحواذ هجومي") {
      roleDescription = "لاعب وسط إبداعي يركز على التمريرات المفتاحية وبناء الهجمات";
    } else if (team.playingStyle === "هجوم سريع") {
      roleDescription = "صانع ألعاب يركز على التمريرات الحاسمة والهجمات المرتدة";
    } else if (team.playingStyle === "ضغط عالٍ") {
      roleDescription = "لاعب وسط ديناميكي مسؤول عن الربط بين الدفاع والهجوم";
    } else {
      roleDescription = "لاعب وسط متعدد المهام يجمع بين المهارات الدفاعية والهجومية";
    }
    
    return {
      team,
      compatibilityScore,
      positionFit,
      tacticalFit,
      strengthsMatch,
      roleDescription
    };
  });
  
  // Sort by compatibility score
  return results.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
};
