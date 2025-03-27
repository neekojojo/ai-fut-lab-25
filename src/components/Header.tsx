
import React from 'react';
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

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

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
            <Button variant="outline" onClick={() => signOut().then(() => navigate('/'))}>
              تسجيل الخروج
            </Button>
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
