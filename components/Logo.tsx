import React from 'react';
import Image from 'next/image';

export const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/logo.png"
        alt="Anthroly Logo"
        width={48}
        height={48}
        className="transition-transform duration-300 hover:scale-110 object-contain"
        priority
      />
      
      <span className="text-2xl font-bold tracking-tight text-black">
        Anthroly
      </span>
    </div>
  );
};

