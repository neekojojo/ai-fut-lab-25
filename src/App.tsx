
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import HomePage from './pages/HomePage';
import PlayerAnalysisPage from './pages/PlayerAnalysisPage';
import FitLabPage from './pages/FitLabPage';
import TrainingPlanPage from './pages/TrainingPlanPage';
import ClubCompatibilityPage from './pages/ClubCompatibilityPage';
import PlayerStatsPage from './pages/PlayerStatsPage';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/player-analysis" element={<PlayerAnalysisPage />} />
            <Route path="/fit-lab" element={<FitLabPage />} />
            <Route path="/training-plan" element={<TrainingPlanPage />} />
            <Route path="/club-compatibility" element={<ClubCompatibilityPage />} />
            <Route path="/player-stats" element={<PlayerStatsPage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
