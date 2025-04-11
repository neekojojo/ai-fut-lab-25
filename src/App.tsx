
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/components/auth/AuthContext';
import { HelmetProvider } from 'react-helmet-async';
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
        <HelmetProvider>
          <AuthProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/advanced-analysis/:id" element={<AdvancedAnalysis />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                {/* إعادة توجيه مسار الواقع المعزز القديم إلى الصفحة الرئيسية */}
                <Route path="/ar-experience" element={<Navigate to="/" replace />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Toaster />
          </AuthProvider>
        </HelmetProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
