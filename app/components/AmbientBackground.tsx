'use client';

import React from 'react';

interface AmbientBackgroundProps {
  isDarkMode: boolean;
}

export default function AmbientBackground({ isDarkMode }: AmbientBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {isDarkMode ? (
        <>
          {/* Dark Mode Ambient Blobs */}
          <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-blue-950/15 blur-[120px] animate-drift-1" />
          <div className="absolute top-[40%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#C5A059]/5 blur-[150px] animate-drift-2" />
          <div className="absolute bottom-[20%] left-[15%] w-[40vw] h-[40vw] rounded-full bg-slate-900/30 blur-[130px] animate-drift-3" />
        </>
      ) : (
        <>
          {/* Light Mode Ambient Blobs */}
          <div className="absolute top-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-[#F3ECE2]/80 blur-[100px] animate-drift-1" />
          <div className="absolute top-[40%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-[#C5A059]/10 blur-[120px] animate-drift-2" />
          <div className="absolute bottom-[20%] left-[15%] w-[40vw] h-[40vw] rounded-full bg-[#E6DFC4]/60 blur-[110px] animate-drift-3" />
        </>
      )}
    </div>
  );
}
