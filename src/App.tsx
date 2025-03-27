
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import NotFound from './pages/NotFound';
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/components/auth/AuthContext';

// إنشاء عميل الاستعلام لإدارة حالة البيانات
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // البيانات ستظل "طازجة" لمدة دقيقة واحدة
      retry: 1,
      refetchOnWindowFocus: false
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
