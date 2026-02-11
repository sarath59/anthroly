import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'black' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export const LogoWithImage = ({ className = "", variant = 'white', size = 'md' }: LogoProps) => {
  const sizeMap = {
    sm: { container: 'w-8 h-8', image: 24, text: 'text-lg' },
    md: { container: 'w-10 h-10', image: 32, text: 'text-xl' },
    lg: { container: 'w-12 h-12', image: 40, text: 'text-2xl' },
  };
  
  const { container, image, text } = sizeMap[size];
  
  return (
    <div className={`flex items-center gap-3 group ${className}`}>
      {/* Logo container with glassmorphism */}
      <div className={`
        relative ${container} rounded-xl overflow-hidden
        bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 
        border border-white/10
        group-hover:border-emerald-500/30 
        group-hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]
        transition-all duration-300
        flex items-center justify-center
      `}>
        <Image
          src="/logo.png"
          alt="Anthroly Logo"
          width={image}
          height={image}
          className={`
            object-contain 
            group-hover:scale-110 
            transition-transform duration-300
            ${variant === 'white' ? 'invert opacity-90' : ''}
          `}
          priority
        />
      </div>
      
      <span className={`
        ${text} font-bold tracking-tight 
        ${variant === 'white' ? 'text-white' : 'text-black'}
        transition-colors duration-300
      `}>
        Anthroly
      </span>
    </div>
  );
};

