
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Plus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  title, 
  showBackButton = true 
}) => {
  const navigate = useNavigate();
  
  return (
    <header className="bg-slate-900 border-b border-slate-800 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          {showBackButton && (
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-2">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          <h1 className="text-xl font-bold">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button variant="purple" size="sm" onClick={() => navigate('/')}>
            عودة
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
