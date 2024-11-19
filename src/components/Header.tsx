import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useLanguage } from './LanguageProvider';
import { useTranslation } from '@/hooks/useTranslation';
import { useAuth } from '@/hooks/useAuth';
import Logo from './ui/Logo';
import AuthModal from './auth/AuthModal';

interface HeaderProps {
  onBookNow: () => void;
  showBooking?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onBookNow, showBooking = true }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const { user, logout, isAuthenticated } = useAuth();

  const menuItems = [
    { href: '#services', label: t('services') },
    { href: '#fleet', label: t('fleet') },
    { href: '#pricing', label: t('pricing') },
    { href: '#testimonials', label: t('testimonials') },
    { href: '#faq', label: t('faq') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <header className="fixed w-full z-50 bg-black bg-opacity-90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Logo />

          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-white hover:text-gray-300 transition"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-white hover:text-gray-300 transition"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <button
              onClick={toggleLanguage}
              className="p-2 text-white hover:text-gray-300 transition"
              aria-label={language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">{language === 'en' ? 'ES' : 'EN'}</span>
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-white">{user?.name}</span>
                <button
                  onClick={logout}
                  className="text-white hover:text-gray-300 transition"
                >
                  {t('logout')}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="text-white hover:text-gray-300 transition"
              >
                {t('login')}
              </button>
            )}
            
            {showBooking && (
              <button
                onClick={onBookNow}
                className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
              >
                {t('bookNow')}
              </button>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-95">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-white hover:text-gray-300 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              <div className="flex items-center space-x-4 py-2">
                <button
                  onClick={toggleTheme}
                  className="p-2 text-white hover:text-gray-300 transition"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>

                <button
                  onClick={toggleLanguage}
                  className="p-2 text-white hover:text-gray-300 transition"
                  aria-label={language === 'en' ? 'Switch to Spanish' : 'Switch to English'}
                >
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">{language === 'en' ? 'ES' : 'EN'}</span>
                </button>
              </div>

              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="text-white">{user?.name}</div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-white hover:text-gray-300 transition text-left"
                  >
                    {t('logout')}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="text-white hover:text-gray-300 transition text-left"
                >
                  {t('login')}
                </button>
              )}

              {showBooking && (
                <button
                  onClick={() => {
                    onBookNow();
                    setIsMenuOpen(false);
                  }}
                  className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition"
                >
                  {t('bookNow')}
                </button>
              )}
            </nav>
          </div>
        </div>
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
};

export default Header;