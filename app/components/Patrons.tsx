'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, Sparkles, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import CharReveal from './CharReveal';
import ThreeDTiltCard from './ThreeDTiltCard';

export interface Patron {
  id: string;
  name: string;
  location: string;
  initials: string;
  type: string;
  description: string;
  highlights: string;
  image: string;
  established: string;
}

const DEFAULT_PATRONS: Patron[] = [
  {
    id: 'patron-1',
    name: 'Serena Hotels & Resorts',
    location: 'Islamabad',
    initials: 'S.H',
    type: 'Heritage Calligraphy Collection',
    description: 'A series of 15 museum-grade gold leaf murals installed in the presidential suites and the main lobby reception area, refreshing every year.',
    highlights: '15+ Custom Masterpieces',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800',
    established: 'Patron since 2023',
  },
  {
    id: 'patron-2',
    name: 'Obsidian Design Studio',
    location: 'Lahore & Karachi',
    initials: 'O.D',
    type: 'Textured Abstract Series',
    description: 'Ongoing curation partnership supplying premium textured canvas panels for their high-end residential lounge designs and model homes.',
    highlights: 'Ongoing Design Partner',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800',
    established: 'Patron since 2022',
  },
  {
    id: 'patron-3',
    name: 'Bank Alfalah Corporate Offices',
    location: 'Karachi HQ',
    initials: 'B.A',
    type: 'Modern Geometric Collections',
    description: 'Elegant oversized brutalist and high-contrast geometric works integrated into executive corridors, boardrooms, and private meeting suites.',
    highlights: '40+ Artworks Delivered',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    established: 'Patron since 2024',
  },
  {
    id: 'patron-4',
    name: 'Cafe Aylanto',
    location: 'Lahore & Islamabad',
    initials: 'C.A',
    type: 'Botanical & Organic Texture Canvas',
    description: 'Curated bespoke earthy-toned canvas compositions and delicate botanical studies perfectly matched to the upscale bistro dining ambiance.',
    highlights: 'Seasonal Ambient Refresh',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800',
    established: 'Patron since 2023',
  },
  {
    id: 'patron-5',
    name: 'Nishat Penthouse Residences',
    location: 'Lahore',
    initials: 'N.R',
    type: 'Minimalist Linen Paintings',
    description: 'A curated gallery selection of raw linen canvases featuring quiet, light-study gradients and tactile gesso contours for a private luxury lounge.',
    highlights: 'Bespoke Curated Gallery',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    established: 'Patron since 2024',
  }
];

interface PatronsProps {
  isDarkMode: boolean;
  patrons?: Patron[];
}

export default function Patrons({ isDarkMode, patrons = [] }: PatronsProps) {
  const activeList = patrons && patrons.length > 0 ? patrons : DEFAULT_PATRONS;
  const [activePatron, setActivePatron] = useState<Patron>(activeList[0]);
  const [isFading, setIsFading] = useState(false);

  // Sync activePatron if activeList changes
  useEffect(() => {
    if (activeList.length > 0) {
      const exists = activeList.find((p) => p.id === activePatron?.id);
      if (!exists) {
        setActivePatron(activeList[0]);
      }
    }
  }, [activeList]);

  const handlePatronSelect = (patron: Patron) => {
    if (!activePatron || patron.id === activePatron.id) return;
    setIsFading(true);
    setTimeout(() => {
      setActivePatron(patron);
      setIsFading(false);
    }, 300);
  };

  // Auto-cycle patrons every 5 seconds
  useEffect(() => {
    if (!activePatron || activeList.length <= 1) return;

    const timer = setTimeout(() => {
      const currentIndex = activeList.findIndex((p) => p.id === activePatron.id);
      const nextIndex = (currentIndex + 1) % activeList.length;
      handlePatronSelect(activeList[nextIndex]);
    }, 5000);

    return () => clearTimeout(timer);
  }, [activePatron, activeList]);

  if (!activePatron) return null;

  return (
    <section
      id="patrons"
      className={`scroll-mt-28 py-20 lg:py-24 transition-colors duration-500 border-b overflow-hidden relative bg-transparent ${
        isDarkMode ? 'border-white/10' : 'border-[#E6DFC4]/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up" className="mb-14 sm:mb-20 text-center space-y-3">
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-[#0C1623]'
          }`}>
            <CharReveal text="Our Regular " />
            <CharReveal
              text="Patrons & Spaces"
              className="italic font-light text-[#C5A059] font-serif"
              delay={200}
            />
          </h2>
          <p className={`text-[11px] tracking-[0.25em] uppercase font-semibold transition-colors duration-300 ${
            isDarkMode ? 'text-[#C5A059]' : 'text-[#716250]'
          }`}>
            TRUSTED BY EXCLUSIVE HOSPITALITY, DESIGN FIRMS, AND RESIDENCES
          </p>
          <div className="w-16 h-0.5 bg-[#C5A059] mx-auto mt-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-[#C5A059] animate-line-reveal"></div>
          </div>
        </ScrollReveal>

        {/* 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Visual Showcase (45% on large screens) */}
          <ScrollReveal
            animation="fade-right"
            delay={100}
            className="lg:col-span-5 flex flex-col items-center justify-center w-full"
          >
            <div className="relative w-full aspect-[4/5] max-w-[450px] lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border border-white/10 group bg-slate-900">
              
              {/* Main Room Image with Dynamic Fade */}
              <div className={`relative w-full h-full transition-opacity duration-300 ${
                isFading ? 'opacity-30' : 'opacity-100'
              }`}>
                <Image
                  src={activePatron.image}
                  alt={activePatron.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out scale-102 group-hover:scale-105"
                  sizes="(max-w-1024px) 100vw, 40vw"
                  priority
                />
                
                {/* Elegant overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070D14]/90 via-[#070D14]/25 to-transparent"></div>
              </div>

              {/* Floating Luxury Detail Box at the Bottom */}
              <div className={`absolute bottom-6 left-6 right-6 p-6 rounded-2xl border backdrop-blur-md transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-[#0B131F]/80 border-white/10 text-white' 
                  : 'bg-white/90 border-[#E6DFC4]/60 text-[#0C1623]'
              }`}>
                <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-[0.2em] text-[#C5A059] uppercase mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] fill-[#C5A059]/20" />
                  <span>Curation Spotlight</span>
                </div>
                
                <h4 className="font-serif text-xl font-medium tracking-tight mb-2">
                  {activePatron.name}
                </h4>

                <p className={`text-[11px] font-light leading-relaxed mb-3.5 ${
                  isDarkMode ? 'text-slate-300' : 'text-[#4F5B6A]'
                }`}>
                  {activePatron.description}
                </p>

                <div className="flex items-center justify-between border-t border-white/10 pt-3">
                  <div className="flex items-center gap-1 text-[10px] font-medium tracking-wide">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span className={isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'}>
                      {activePatron.location}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-[#C5A059] uppercase">
                    {activePatron.highlights}
                  </span>
                </div>
              </div>

            </div>
          </ScrollReveal>

          {/* Right Column: Interactive Patrons List (55% on large screens) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {activeList.map((patron, idx) => {
              const isActive = patron.id === activePatron.id;

              return (
                <ScrollReveal
                  key={patron.id}
                  animation="fade-left"
                  delay={100 + idx * 75}
                  className="w-full"
                >
                  <ThreeDTiltCard
                    onClick={() => handlePatronSelect(patron)}
                    className={`w-full rounded-2xl border text-left cursor-pointer transition-all duration-300 ${
                      isActive
                        ? 'bg-[#C5A059]/10 border-[#C5A059] shadow-lg shadow-[#C5A059]/5'
                        : isDarkMode
                          ? 'bg-[#0B131F]/40 border-white/5 hover:border-white/15'
                          : 'bg-white/50 border-[#E6DFC4]/50 hover:border-[#C5A059]/60'
                    }`}
                  >
                    <div className="p-5 flex items-center justify-between gap-5 select-none">
                      
                      {/* Initials Badge & Text */}
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-serif text-sm font-semibold tracking-wide border transition-all duration-300 flex-shrink-0 ${
                          isActive
                            ? 'bg-[#C5A059] border-[#C5A059] text-[#070D14]'
                            : isDarkMode
                              ? 'bg-[#070D14] border-white/10 text-white'
                              : 'bg-[#FAF7F2] border-[#E6DFC4] text-[#0C1623]'
                        }`}>
                          {patron.initials}
                        </div>
                        
                        <div className="space-y-1">
                          <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${
                            isActive ? 'text-[#C5A059]' : isDarkMode ? 'text-slate-400' : 'text-[#716250]'
                          }`}>
                            {patron.type}
                          </span>
                          <h3 className={`font-serif text-lg font-normal transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-[#0C1623]'
                          }`}>
                            {patron.name}
                          </h3>
                        </div>
                      </div>

                      {/* Right tag & arrow */}
                      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                        <span className={`text-[9px] font-medium tracking-wide uppercase transition-colors duration-300 ${
                          isActive ? 'text-[#C5A059]' : isDarkMode ? 'text-slate-500' : 'text-[#7F8F9F]'
                        }`}>
                          {patron.established}
                        </span>
                        
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? 'bg-[#C5A059] text-[#070D14] scale-110'
                            : 'bg-transparent text-slate-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                        }`}>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>

                    </div>
                  </ThreeDTiltCard>
                </ScrollReveal>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
