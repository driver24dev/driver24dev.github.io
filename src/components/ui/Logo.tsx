import React from 'react';
import { Car } from 'lucide-react';

interface LogoProps {
  customLogo?: string;
  onClick?: (e: React.MouseEvent) => void;
}

const Logo: React.FC<LogoProps> = ({ customLogo, onClick }) => {
  return (
    <a 
      href="#"
      onClick={onClick}
      className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
      aria-label="Scroll to top"
    >
      {customLogo ? (
        <img 
          src={customLogo} 
          alt="LA Elite Chauffeur" 
          className="h-8 w-auto"
        />
      ) : (
        <>
          <Car className="h-6 w-6 text-white" />
          <span className="text-xl font-bold text-white">LA Elite Chauffeur</span>
        </>
      )}
    </a>
  );
};

export default Logo;