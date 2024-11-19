import React, { useState, useEffect } from 'react';
import { Menu, Home, Car, Tag, Star, HelpCircle, Settings, Sun, Moon, Languages, LogOut, User, Shield } from 'lucide-react';
import Logo from './ui/Logo';
import { useTheme } from './ThemeProvider';
import { useLanguage } from './LanguageProvider';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/hooks/useAuth';
import AuthModal from './auth/AuthModal';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface HeaderProps {
  onBookNow: () => void;
  showBooking: boolean;
}

const Header: React.FC<HeaderProps> = ({ onBookNow, showBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const menuItems = [
    { href: "#", icon: <Home className="h-5 w-5" />, label: 'home' },
    { href: "#services", icon: <Settings className="h-5 w-5" />, label: 'services' },
    { href: "#fleet", icon: <Car className="h-5 w-5" />, label: 'fleet' },
    { href: "#pricing", icon: <Tag className="h-5 w-5" />, label: 'pricing' },
    { href: "#testimonials", icon: <Star className="h-5 w-5" />, label: 'testimonials' },
    { href: "#faq", icon: <HelpCircle className="h-5 w-5" />, label: 'faq' },
  ];

  if (isAdmin()) {
    menuItems.push({
      href: "#admin",
      icon: <Shield className="h-5 w-5" />,
      label: 'Admin Dashboard'
    });
  }

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Logo onClick={scrollToTop} />
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <span className="text-white">{user?.name}</span>
                {isAdmin() && (
                  <Shield className="h-5 w-5 text-white" />
                )}
                <button
                  onClick={logout}
                  className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <User className="h-5 w-5" />
              </button>
            )}
            {showBooking && (
              <button
                onClick={onBookNow}
                className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
              >
                {t('bookNow')}
              </button>
            )}
            <Sheet>
              <SheetTrigger asChild>
                <button className="text-white hover:bg-white/10 p-2 rounded-full transition-colors">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent 
                side="right" 
                className="w-[300px] sm:w-[400px] bg-black/95 backdrop-blur-lg border-l border-gray-800"
              >
                <SheetHeader className="flex justify-between items-center">
                  <SheetTitle className="text-white text-2xl font-bold">{t('menu')}</SheetTitle>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={toggleLanguage}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      <Languages className="h-5 w-5 text-white" />
                    </button>
                    <button
                      onClick={toggleTheme}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      {theme === 'dark' ? (
                        <Sun className="h-5 w-5 text-white" />
                      ) : (
                        <Moon className="h-5 w-5 text-white" />
                      )}
                    </button>
                  </div>
                </SheetHeader>
                <nav className="flex flex-col space-y-2 mt-8">
                  {menuItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center space-x-3 text-white hover:bg-white/10 p-3 rounded-lg transition-colors group"
                    >
                      <span className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                        {item.icon}
                      </span>
                      <span className="text-lg font-medium">{t(item.label)}</span>
                    </a>
                  ))}
                </nav>
                {showBooking && (
                  <div className="absolute bottom-8 left-6 right-6">
                    <button
                      onClick={onBookNow}
                      className="w-full bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition flex items-center justify-center space-x-2"
                    >
                      <Car className="h-5 w-5" />
                      <span>{t('bookYourRide')}</span>
                    </button>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Header;