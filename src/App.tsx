
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import NotFound from "./pages/NotFound";
import MovementAnalysis from "./components/MovementAnalysis";

const queryClient = new QueryClient();

// Simple authentication guard component
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('user') !== null;
  return isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/movement-analysis" element={
            <PrivateRoute>
              <MovementAnalysis 
                analysis={{
                  playerName: "Sample Player",
                  position: "Forward",
                  marketValue: "$10M",
                  talentScore: 85,
                  strengths: ["Speed", "Finishing"],
                  weaknesses: ["Heading", "Defensive awareness"],
                  performance: {
                    technical: 80,
                    physical: 85,
                    tactical: 75,
                    mental: 70
                  },
                  recommendations: ["Improve heading", "Work on defensive positioning"],
                  compatibilityScore: 82
                }}
              />
            </PrivateRoute>
          } />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
