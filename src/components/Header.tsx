
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (user) {
      fetchUserAvatar();
    }
    
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    
    const subscription = supabase
      .channel('profile-changes')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'profiles',
        filter: `id=eq.${user.id}`,
      }, (payload) => {
        if (payload.new && payload.new.avatar_url !== undefined) {
          setAvatarUrl(payload.new.avatar_url);
        }
      })
      .subscribe();
      
    return () => {
      supabase.removeChannel(subscription);
    };
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
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <Link to="/" className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            FUT LAB
          </Link>
        </div>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle({ className: "bg-transparent hover:bg-primary/10" })}>
                <Link to="/">الصفحة الرئيسية</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle({ className: "bg-transparent hover:bg-primary/10" })}>
                <Link to="/ar-experience">الواقع المعزز</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            {user && (
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle({ className: "bg-transparent hover:bg-primary/10" })}>
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
                <Avatar className="cursor-pointer hover:opacity-80 transition-opacity border-2 border-primary">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-primary/20">
                      <UserIcon className="h-5 w-5 text-primary" />
                    </AvatarFallback>
                  )}
                </Avatar>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => signOut().then(() => navigate('/'))}
                className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary-foreground transition-all"
              >
                تسجيل الخروج
              </Button>
            </div>
          ) : (
            <div className="space-x-4 rtl:space-x-reverse">
              <Button 
                variant="outline" 
                onClick={() => navigate('/sign-in')}
                className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary-foreground transition-all"
              >
                تسجيل الدخول
              </Button>
              <Button 
                onClick={() => navigate('/sign-up')}
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
              >
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
