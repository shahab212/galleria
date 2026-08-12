'use client';

import React from 'react';

export interface LightBeamButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  gradientColors?: [string, string, string]; // Optional custom gradient colors
}

export function LightBeamButton({
  children,
  className = '',
  onClick,
  gradientColors = ['#C5A059', '#EBD8BE', '#C5A059'], // Gold -> Warm Cream -> Gold
  ...props
}: LightBeamButtonProps) {
  const gradientString = `conic-gradient(from var(--gradient-angle), transparent 0%, ${gradientColors[0]} 40%, ${gradientColors[1]} 50%, transparent 60%, transparent 100%)`;
  
  const isCustomSize = className.includes('w-') || className.includes('h-');

  return (
    <>
      <style>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes border-spin {
          from { --gradient-angle: 0deg; }
          to { --gradient-angle: 360deg; }
        }
        .animate-border-spin {
          animation: border-spin 2s linear infinite;
        }
      `}</style>

      <button
        onClick={onClick}
        className={`group relative isolate overflow-hidden rounded-full bg-[#0C1623] text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_-5px_rgba(197,160,89,0.35)] hover:shadow-[0_0_25px_-5px_rgba(197,160,89,0.55)] flex items-center justify-center cursor-pointer ${
          isCustomSize ? '' : 'px-8 py-3.5 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase'
        } ${className}`}
        suppressHydrationWarning
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>

        {/* Gradient Border Simulation */}
        <div
          className="absolute inset-0 -z-10 rounded-full p-[1px] animate-border-spin pointer-events-none"
          style={{
            '--gradient-angle': '0deg',
            background: gradientString,
          } as React.CSSProperties}
        />

        {/* Inner Background (keeps text readable) */}
        <div className="absolute inset-[1.5px] -z-10 rounded-full bg-[#0C1623] group-hover:bg-[#121E2C] transition-colors duration-300" />

        {/* Shine Effect Overlay */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(197,160,89,0.15)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </button>
    </>
  );
}

export default LightBeamButton;
