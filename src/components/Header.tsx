
import React from 'react';

const Header = () => {
  return (
    <header className="w-full py-6 animate-fade-in">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-bold">AI</span>
          </div>
          <h1 className="text-xl font-semibold tracking-tight">FootballAnalyst</h1>
        </div>
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
            Home
          </a>
          <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
            About
          </a>
          <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
            Pricing
          </a>
          <a href="#" className="text-foreground/80 hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>
        <div className="md:flex items-center space-x-4 hidden">
          <button className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
            Sign In
          </button>
          <button className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
