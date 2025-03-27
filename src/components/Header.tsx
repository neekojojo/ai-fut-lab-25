
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { UserIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserAvatar();
    }
  }, [user]);

  const fetchUserAvatar = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      
      if (data?.avatar_url) {
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error('Error fetching user avatar:', error);
    }
  };

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <Link to="/" className="font-bold text-xl">
            FootballAI
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link to="/">الصفحة الرئيسية</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            {user && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link to="/dashboard">لوحة التحكم</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard?tab=profile">
                <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt="Profile" />
                  ) : (
                    <AvatarFallback>
                      <UserIcon className="h-5 w-5" />
                    </AvatarFallback>
                  )}
                </Avatar>
              </Link>
              <Button variant="outline" onClick={() => signOut().then(() => navigate('/'))}>
                تسجيل الخروج
              </Button>
            </div>
          ) : (
            <div className="space-x-4 rtl:space-x-reverse">
              <Button variant="outline" onClick={() => navigate('/sign-in')}>
                تسجيل الدخول
              </Button>
              <Button onClick={() => navigate('/sign-up')}>
                إنشاء حساب
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
