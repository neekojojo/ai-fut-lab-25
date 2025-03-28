
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AdvancedAnalysis from "./pages/AdvancedAnalysis";
import ProfessionalTips from "./pages/ProfessionalTips";
import StressManagement from "./pages/StressManagement";
import ExternalSystems from "./pages/ExternalSystems";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/advanced-analysis" element={<AdvancedAnalysis />} />
          <Route path="/professional-tips" element={<ProfessionalTips />} />
          <Route path="/stress-management" element={<StressManagement />} />
          <Route path="/external-systems" element={<ExternalSystems />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
