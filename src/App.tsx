
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth/AuthContext';
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import AdvancedAnalysis from '@/pages/AdvancedAnalysis';
import NotFound from '@/pages/NotFound';
import SignIn from '@/components/auth/SignIn';
import SignUp from '@/components/auth/SignUp';
import '@/App.css';

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="fut-lab-theme">
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/advanced-analysis/:id" element={<AdvancedAnalysis />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
