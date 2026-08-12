'use client';

import React, { useEffect, useState } from 'react';

interface ScrollJourneyLineProps {
  isDarkMode: boolean;
  activeSection: string;
}

export default function ScrollJourneyLine({ isDarkMode, activeSection }: ScrollJourneyLineProps) {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollPercent(pct);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'collections', label: 'Collections' },
    { id: 'visualizer', label: 'Visualizer' },
    { id: 'shop', label: 'Shop' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleDotClick = (id: string) => {
    const targetId = id === 'home' ? 'home' : id;
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center select-none pointer-events-auto">
      <div className="relative w-8 h-[380px] flex flex-col justify-between items-center py-2">
        {/* SVG Container for the Journey Line Track */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[4px]">
          <svg width="4" height="100%" className="w-full h-full overflow-visible">
            <defs>
              {/* Luxury Gold/Cream Gradient */}
              <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C5A059" />
                <stop offset="50%" stopColor="#EBD8BE" />
                <stop offset="100%" stopColor="#C5A059" />
              </linearGradient>

              {/* Glowing Drop-Shadow Filter for Premium Aesthetics */}
              <filter id="goldGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComponentTransfer in="blur" result="glow">
                  <feFuncA type="linear" slope="0.6" />
                </feComponentTransfer>
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Track Line */}
            <line
              x1="2"
              y1="4"
              x2="2"
              y2="99%"
              stroke={isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(12,22,35,0.06)'}
              strokeWidth="2"
              strokeLinecap="round"
            />

            {/* Active Drawing SVG Journey Line */}
            <line
              x1="2"
              y1="4"
              x2="2"
              y2={`${scrollPercent * 100}%`}
              stroke="url(#goldGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#goldGlow)"
              className="transition-all duration-75 ease-out"
            />
          </svg>
        </div>

        {/* Floating Indicator Nodes */}
        {sections.map((sect, idx) => {
          const isActive = activeSection === sect.id || (sect.id === 'home' && activeSection === 'hero');
          const sectionPercent = idx / (sections.length - 1);
          const isPassed = scrollPercent >= sectionPercent - 0.05;

          return (
            <div
              key={sect.id}
              onClick={() => handleDotClick(sect.id)}
              className="group relative flex items-center justify-center cursor-pointer w-6 h-6 z-10"
            >
              {/* Node Circle */}
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 border ${
                  isActive
                    ? 'bg-[#C5A059] border-[#EBD8BE] scale-125 shadow-[0_0_12px_#C5A059]'
                    : isPassed
                    ? 'bg-[#C5A059]/80 border-[#C5A059] scale-100'
                    : isDarkMode
                    ? 'bg-[#0C1623] border-white/20 hover:border-white/50'
                    : 'bg-white border-[#0C1623]/20 hover:border-[#0C1623]/50'
                }`}
              />

              {/* Hover tooltip label */}
              <div
                className={`absolute left-8 px-3 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap border ${
                  isDarkMode
                    ? 'bg-[#0B131F] text-white border-white/10'
                    : 'bg-white text-[#0C1623] border-[#E2DAD0]'
                }`}
              >
                {sect.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
