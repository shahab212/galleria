'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import CharReveal from './CharReveal';
import LightBeamButton from './LightBeamButton';

interface StackingCardsProps {
  isDarkMode: boolean;
  heroSlides: any[];
  setActiveTab: (category: string) => void;
}

export default function StackingCards({ isDarkMode, heroSlides, setActiveTab }: StackingCardsProps) {
  const handleCtaClick = (category: string) => {
    setActiveTab(category);
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`py-24 transition-colors duration-500 border-b relative ${
      isDarkMode ? 'bg-[#070D14] border-white/10' : 'bg-[#FAF9F6] border-[#E6DFC4]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <ScrollReveal animation="fade-up" className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-[#C5A059]/10 text-[#C5A059] text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-[#C5A059]/20">
            <Sparkles className="w-3 h-3" />
            <span>ARTWORK PORTFOLIO SHOWCASE</span>
          </div>
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-[#0C1623]'
          }`}>
            <CharReveal text="Our Curated " />
            <CharReveal
              text="Design Masterpieces"
              className={`font-serif italic font-light transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-[#596A7D]'
              }`}
              delay={160}
            />
          </h2>
          <p className={`text-xs tracking-[0.25em] uppercase font-medium max-w-xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            SPOKEN THROUGH PURE TEXTURES, BOLD STROKES, AND LUXURY FINISHES
          </p>
          <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mt-2 overflow-hidden relative">
            <div className="absolute inset-0 bg-[#C5A059] animate-line-reveal"></div>
          </div>
        </ScrollReveal>

        {/* Sticky Stacking Deck Area */}
        <div className="relative space-y-12 pb-12">
          {heroSlides.map((slide, idx) => {
            return (
              <div
                key={idx}
                className="sticky w-full flex items-center justify-center transition-all duration-300"
                style={{
                  top: '12vh',
                  zIndex: idx + 10,
                }}
              >
                {/* Individual Card Panel */}
                <div
                  className={`w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-[32px] p-8 sm:p-12 lg:p-14 border transition-all duration-500 shadow-2xl relative overflow-hidden ${
                    isDarkMode
                      ? 'bg-[#0C1623] border-white/10 shadow-[0_35px_60px_rgba(0,0,0,0.6)]'
                      : 'bg-white border-[#E6DFC4] shadow-[0_30px_60px_rgba(12,22,35,0.08)]'
                  }`}
                >
                  {/* Subtle Gold Background Radial Glow (Dark Mode Only) */}
                  {isDarkMode && (
                    <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
                  )}

                  {/* Left Column: Typography Layout */}
                  <div className="lg:col-span-6 space-y-6 text-center lg:text-left relative z-10">
                    <div className="inline-flex items-center gap-1.5 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/20">
                      <span>{slide.badge}</span>
                    </div>

                    <h3 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-[#0C1623]'
                    }`}>
                      <CharReveal text={slide.titleLine1 + " "} />
                      <CharReveal
                        text={slide.pillText}
                        className="font-serif italic font-light text-[#C5A059]"
                        delay={160}
                      />
                      <br />
                      <CharReveal text={slide.titleLine2} delay={280} />
                    </h3>

                    <p className={`text-xs sm:text-sm font-light leading-relaxed max-w-lg mx-auto lg:mx-0 transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-400' : 'text-gray-500'
                    }`}>
                      {slide.subtitle}
                    </p>

                    <div className="pt-4 flex justify-center lg:justify-start">
                      <LightBeamButton
                        suppressHydrationWarning
                        onClick={() => handleCtaClick(slide.targetCategory || 'all')}
                      >
                        <span>{slide.cta || 'EXPLORE CATEGORY'}</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition duration-300" />
                      </LightBeamButton>
                    </div>
                  </div>

                  {/* Right Column: Luxury Display Frame Mockup */}
                  <div className="lg:col-span-6 relative flex items-center justify-center min-h-[300px] sm:min-h-[380px] w-full">
                    {/* Shadow overlay block */}
                    <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#000]/10 pointer-events-none rounded-2xl" />

                    {/* Museum Wall Display Frame */}
                    <div className={`relative z-10 w-full max-w-[420px] aspect-[4/3] rounded-xl overflow-hidden border-8 shadow-[0_25px_50px_rgba(0,0,0,0.4)] transition-transform duration-700 hover:scale-103 group ${
                      isDarkMode ? 'border-[#1C2530] bg-[#070D14]' : 'border-[#0C1623] bg-[#FAF9F6]'
                    }`}>
                      <Image
                        src={slide.image}
                        alt={slide.pillText + " Showcase"}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Inner gold frame fillet accent */}
                      <div className="absolute inset-0 border border-[#C5A059]/40 pointer-events-none" />
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
