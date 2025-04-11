
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto pt-10 pb-6 px-6 border-t bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
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
            <p className="mt-3 text-muted-foreground">
              منصة متكاملة لتحليل أداء لاعبي كرة القدم باستخدام الذكاء الاصطناعي المتطور
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">روابط سريعة</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">الرئيسية</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">لوحة التحكم</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-3">تواصل معنا</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">البريد الإلكتروني: info@footballai.com</li>
              <li className="text-muted-foreground">الهاتف: +966 123 456 789</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-border/60 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} FootballAI Analyzer. جميع الحقوق محفوظة.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">دعم رؤية المملكة 2030 في مجال الرياضة</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
