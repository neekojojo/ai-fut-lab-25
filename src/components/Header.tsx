
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from './auth/AuthContext';

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/sign-in');
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <header className="py-4 border-b border-border bg-background/80 backdrop-blur-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-xl font-bold">
            FUT LAB
          </Link>
        </div>
        
        <nav className="flex items-center gap-x-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            الرئيسية
          </Link>
          
          {user ? (
            <Button variant="outline" size="sm" onClick={handleDashboardClick}>
              لوحة التحكم
            </Button>
          ) : (
            <Button variant="default" size="sm" onClick={handleLoginClick}>
              تسجيل الدخول
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
