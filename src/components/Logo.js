// src/components/Logo.js
import React from 'react';

const ModernLogo = () => {
  return (
    <div className="relative w-48 h-48 mx-auto">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-400/30 to-fuchsia-400/30 blur-2xl" />
      
      {/* Main container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Animated background shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute w-32 h-32 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
            <div className="absolute w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" 
                 style={{ top: '20%', right: '20%' }} />
            <div className="absolute w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"
                 style={{ bottom: '20%', left: '20%' }} />
          </div>
        </div>

        {/* Logo content */}
        <div className="relative z-10 backdrop-blur-sm bg-white/10 p-6 rounded-2xl border border-white/20 shadow-xl transform hover:scale-105 transition-all duration-300">
          <div className="flex flex-col items-center space-y-2">
            {/* Main text */}
            <span className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
              Cer
            </span>
            
            {/* Animated underline */}
            <div className="h-0.5 w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transform origin-left hover:scale-x-110 transition-transform duration-300" />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Rotating ring */}
          <div className="absolute inset-0 border-2 border-violet-500/20 rounded-full animate-spin-slow" />
          
          {/* Pulsing dots */}
          <div className="absolute top-0 left-1/2 w-2 h-2 bg-violet-500 rounded-full animate-ping" />
          <div className="absolute bottom-0 right-1/2 w-2 h-2 bg-fuchsia-500 rounded-full animate-ping animation-delay-1000" />
        </div>
      </div>
    </div>
  );
};

const SmallModernLogo = () => {
  return (
    <div className="relative w-12 h-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-violet-400/30 to-fuchsia-400/30 rounded-lg blur" />
      
      {/* Logo container */}
      <div className="relative w-full h-full flex items-center justify-center backdrop-blur-sm bg-white/10 rounded-lg border border-white/20 shadow-lg transform hover:scale-105 transition-all duration-300">
        {/* Text */}
        <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
          Cer
        </span>
        
        {/* Subtle animated ring */}
        <div className="absolute inset-0 border border-violet-500/20 rounded-lg animate-pulse" />
      </div>
    </div>
  );
};

export { ModernLogo, SmallModernLogo };