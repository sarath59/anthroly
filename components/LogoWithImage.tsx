import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'black' | 'white';
}

export const LogoWithImage = ({ className = "", variant = 'black' }: LogoProps) => {
  const logoSrc = variant === 'white' ? '/logo-white.svg' : '/logo.svg';
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src={logoSrc}
        alt="Anthroly Logo"
        width={48}
        height={48}
        className="transition-transform duration-300 hover:scale-110"
        priority
      />
      
      <span className={`text-2xl font-bold tracking-tight ${
        variant === 'white' ? 'text-white' : 'text-black'
      }`}>
        Anthroly
      </span>
    </div>
  );
};

