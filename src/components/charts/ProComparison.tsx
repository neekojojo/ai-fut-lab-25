
import React, { useState, useEffect } from 'react';
import { PlayerComparison } from '@/utils/ml/playerMLService';
import { PlayerStats } from '@/utils/dataProcessing/playerAnalysisTypes';
import { professionalPlayerService } from '@/services/professionalPlayerService';
import { PlayerSimilarityCard } from './pro-comparison/PlayerSimilarityCard';
import { AttributeComparisonCard } from './pro-comparison/AttributeComparisonCard';

interface ProComparisonProps {
  playerComparison?: PlayerComparison;
  playerStats?: PlayerStats;
  playerPosition?: string;
}

export const ProComparison: React.FC<ProComparisonProps> = ({
  playerComparison: initialComparison,
  playerStats,
  playerPosition,
}) => {
  const [playerComparison, setPlayerComparison] = useState<PlayerComparison | undefined>(initialComparison);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch real player comparison data
  const fetchRealComparison = async () => {
    if (!playerStats) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Convert player stats to attributes format expected by the API
      const attributes = {
        speed: playerStats.maxSpeed / 200 * 100, // normalize to 0-100
        acceleration: playerStats.avgAcceleration / 50 * 100,
        endurance: playerStats.distanceCovered / 5000 * 100,
        balance: playerStats.balanceScore,
        technical: playerStats.technicalScore,
        physical: playerStats.physicalScore,
        efficiency: playerStats.movementEfficiency
      };
      
      const result = await professionalPlayerService.getSimilarPlayers(attributes, playerPosition);
      
      if (result) {
        setPlayerComparison(result);
      }
    } catch (err) {
      console.error('Error fetching professional player comparison:', err);
      setError('Failed to fetch professional player data');
    } finally {
      setIsLoading(false);
    }
  };

  // Use initialization and default comparison data if none provided
  const defaultComparison: PlayerComparison = {
    similarProfessionals: [
      {
        name: "Kevin De Bruyne",
        team: "Manchester City",
        position: "midfielder",
        similarity: 78,
        strengths: ["Vision", "Passing Range", "Set Pieces"]
      },
      {
        name: "Luka Modric",
        team: "Real Madrid",
        position: "midfielder",
        similarity: 71,
        strengths: ["Game Control", "First Touch", "Positioning"]
      },
      {
        name: "Bruno Fernandes",
        team: "Manchester United",
        position: "midfielder",
        similarity: 65,
        strengths: ["Creativity", "Shot Power", "Work Rate"]
      }
    ],
    similarityMetrics: [
      { category: "Passing", score: 78, description: "Excellent range of passing with good accuracy." },
      { category: "Vision", score: 82, description: "Great awareness of teammates' positioning." },
      { category: "Technique", score: 75, description: "Good ball control and first touch." },
      { category: "Positioning", score: 70, description: "Solid understanding of spatial awareness." },
      { category: "Decision Making", score: 65, description: "Sometimes hesitates in the final third." }
    ]
  };

  // Initial data load
  useEffect(() => {
    if (playerStats && !initialComparison) {
      fetchRealComparison();
    }
  }, [playerStats, initialComparison]);

  // Use provided data or default
  const comparisonData = playerComparison?.similarityMetrics || defaultComparison.similarityMetrics;
  const professionals = playerComparison?.similarProfessionals || defaultComparison.similarProfessionals;

  return (
    <>
      <PlayerSimilarityCard
        professionals={professionals}
        isLoading={isLoading}
        error={error}
        playerStats={playerStats}
        fetchRealComparison={fetchRealComparison}
      />
    
      <AttributeComparisonCard
        comparisonData={comparisonData}
        isLoading={isLoading}
        professionalName={professionals[0]?.name || "professionals"}
      />
    </>
  );
};
