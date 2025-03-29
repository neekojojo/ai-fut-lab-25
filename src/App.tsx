
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import AdvancedAnalysis from '@/pages/AdvancedAnalysis';
import NotFound from '@/pages/NotFound';
import '@/App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="fut-lab-theme">
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/advanced-analysis/:id" element={<AdvancedAnalysis />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
