import React, { useState, useEffect } from 'react';
import { Car, Menu, X } from 'lucide-react';

interface HeaderProps {
  onBookNow: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBookNow }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Car className="h-6 w-6 text-white" />
            <span className="text-xl font-bold text-white">LA Elite Chauffeur</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-white hover:text-gray-300 transition">Services</a>
            <a href="#fleet" className="text-white hover:text-gray-300 transition">Fleet</a>
            <a href="#pricing" className="text-white hover:text-gray-300 transition">Pricing</a>
            <a href="#testimonials" className="text-white hover:text-gray-300 transition">Testimonials</a>
            <a href="#faq" className="text-white hover:text-gray-300 transition">FAQ</a>
            <button
              onClick={onBookNow}
              className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
            >
              Book Now
            </button>
          </nav>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-black bg-opacity-95 border-t border-gray-800">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <a href="#services" className="text-white hover:text-gray-300 transition" onClick={() => setIsMenuOpen(false)}>Services</a>
                <a href="#fleet" className="text-white hover:text-gray-300 transition" onClick={() => setIsMenuOpen(false)}>Fleet</a>
                <a href="#pricing" className="text-white hover:text-gray-300 transition" onClick={() => setIsMenuOpen(false)}>Pricing</a>
                <a href="#testimonials" className="text-white hover:text-gray-300 transition" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
                <a href="#faq" className="text-white hover:text-gray-300 transition" onClick={() => setIsMenuOpen(false)}>FAQ</a>
                <button
                  onClick={() => {
                    onBookNow();
                    setIsMenuOpen(false);
                  }}
                  className="bg-white text-black px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition"
                >
                  Book Now
                </button>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;