
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Home, LineChart, UserCircle, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';

const Header = () => {
  const { user, signOut } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="py-4 px-6 flex items-center justify-between border-b bg-background/80 backdrop-blur-sm">
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span className="text-xl font-bold">FootballAI Analyzer</span>
        </Link>
      </div>
      
      <nav className="hidden md:flex items-center gap-1">
        <Button variant="ghost" asChild>
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>الرئيسية</span>
          </Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/dashboard" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            <span>لوحة التحكم</span>
          </Link>
        </Button>
      </nav>
      
      <div className="flex items-center gap-2">
        <ModeToggle />
        
        {user ? (
          <>
            <Button variant="outline" size="icon" asChild>
              <Link to="/dashboard">
                <UserCircle className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="flex items-center gap-1">
              <LogOut className="h-4 w-4" />
              <span>تسجيل الخروج</span>
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="sm" asChild>
              <Link to="/sign-in" className="flex items-center gap-1">
                <LogIn className="h-4 w-4" />
                <span>تسجيل الدخول</span>
              </Link>
            </Button>
            <Button variant="default" size="sm" asChild>
              <Link to="/sign-up" className="flex items-center gap-1">
                <UserPlus className="h-4 w-4" />
                <span>إنشاء حساب</span>
              </Link>
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
