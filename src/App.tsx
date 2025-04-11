
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import HomePage from './pages/HomePage';
import PlayerAnalysisPage from './pages/PlayerAnalysisPage';
import FitLabPage from './pages/FitLabPage';
import TrainingPlanPage from './pages/TrainingPlanPage';
import ClubCompatibilityPage from './pages/ClubCompatibilityPage';
import PlayerStatsPage from './pages/PlayerStatsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/player-analysis" element={<PlayerAnalysisPage />} />
        <Route path="/fit-lab" element={<FitLabPage />} />
        <Route path="/training-plan" element={<TrainingPlanPage />} />
        <Route path="/club-compatibility" element={<ClubCompatibilityPage />} />
        <Route path="/player-stats" element={<PlayerStatsPage />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
