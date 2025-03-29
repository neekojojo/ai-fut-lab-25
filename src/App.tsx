
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/components/auth/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AdvancedAnalysis from "./pages/AdvancedAnalysis";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

// Auth protection wrapper component
const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">جاري التحميل...</div>;
  }
  
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            
            {/* تحديث مسار التحليل المتقدم ليكون عاماً وليس محمياً */}
            <Route path="/advanced-analysis" element={<AdvancedAnalysis />} />
            <Route path="/advanced-analysis/:id" element={<AdvancedAnalysis />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            } />
            
            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
