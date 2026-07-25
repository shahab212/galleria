'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroSlide {
  image: string;
  badge: string;
  titleLine1: string;
  pillText: string;
  titleLine2: string;
  subtitle: string;
  cta: string;
  linkText: string;
  targetCategory: string;
}

interface HeroProps {
  setActiveTab: (val: string) => void;
  heroSlides: HeroSlide[];
}

export default function Hero({ setActiveTab, heroSlides }: HeroProps) {
  const [heroIndex, setHeroIndex] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    if (!heroSlides || heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides]);

  if (!heroSlides || heroSlides.length === 0) {
    return null;
  }

  const nextHeroSlide = () => {
    setHeroIndex((prev) => (prev + 1) % heroSlides.length);
  };

  const prevHeroSlide = () => {
    setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlide = heroSlides[heroIndex] || heroSlides[0];

  return (
    <section id="home" className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0C1623]">
      {/* Full-bleed auto-sliding background images with smooth fade transition */}
      <div className="absolute inset-0 z-0">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === heroIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <Image
              src={slide.image}
              alt={`Luxury Interior Background ${idx + 1}`}
              fill
              className="object-cover object-top"
              priority={idx === 0}
            />
          </div>
        ))}
        {/* Light subtle gradient overlay for maximum image visibility and sharp text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"></div>
      </div>

      {/* Main Content (padded below floating navbar, dynamically changes with slide) */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-12 pt-28 sm:pt-36 lg:pt-40 pb-12 flex-1 flex flex-col justify-center">
        <div key={heroIndex} className="max-w-2xl space-y-6 text-white animate-fadeIn transition-all duration-700">

          {/* Category Badge */}
          <div className="inline-block px-3.5 py-1 bg-black/30 backdrop-blur-md rounded-full text-[10px] font-semibold tracking-[0.2em] text-[#EBD8BE] uppercase border border-white/20">
            {currentSlide.badge}
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.1] tracking-tight text-white">
            {currentSlide.titleLine1}{' '}
            <span className="inline-flex items-center px-5 py-1 border border-white/80 rounded-full text-4xl sm:text-5xl lg:text-6xl font-light italic font-serif text-[#EBD8BE] mx-1 my-1">
              {currentSlide.pillText}
            </span>{' '}
            <br />
            {currentSlide.titleLine2}
          </h1>

          {/* Paragraph Subtitle */}
          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-lg font-light pt-1">
            {currentSlide.subtitle}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-6 pt-4">
            <a
              href="#shop"
              onClick={() => setActiveTab(currentSlide.targetCategory)}
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/90 text-white font-medium text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-xs shadow-lg group"
            >
              <span>{currentSlide.cta}</span>
              <span className="text-white/70 group-hover:text-black transition">──&gt;</span>
            </a>

            <a
              href="#collections"
              className="text-xs font-semibold tracking-wider text-white/90 hover:text-white uppercase transition flex items-center gap-1 group"
            >
              <span>{currentSlide.linkText}</span>
              <span className="text-white/70 group-hover:translate-x-1 transition">&gt;</span>
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Controls Bar */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-12 pb-8 sm:pb-12 pt-6 flex flex-col md:flex-row items-end md:items-center justify-between gap-6">

        {/* Bottom Left: "See All" with line */}
        <div className="flex items-center gap-4 text-xs tracking-widest text-white/80 uppercase font-medium">
          <a href="#shop" className="hover:text-white transition">See All</a>
          <div className="w-24 sm:w-36 h-0.5 bg-white/40"></div>
        </div>

        {/* Bottom Right: Circular Arrow buttons & Glassmorphism floating preview widget */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">

          {/* Circular Nav Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevHeroSlide}
              className="w-10 h-10 rounded-full border border-white/40 bg-black/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/30 transition"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextHeroSlide}
              className="w-10 h-10 rounded-full bg-white text-[#0B131F] flex items-center justify-center hover:bg-[#C5A059] hover:text-white transition shadow-lg"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Floating Glassmorphism Preview Widget */}
          <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/20 p-2.5 rounded-2xl text-white text-xs max-w-xs sm:max-w-sm">
            <div className="flex items-center -space-x-2 overflow-hidden flex-shrink-0">
              {heroSlides.map((slide, thumbIdx) => (
                <button
                  key={thumbIdx}
                  onClick={() => setHeroIndex(thumbIdx)}
                  className={`w-10 h-10 rounded-lg overflow-hidden relative border transition-transform ${
                    thumbIdx === heroIndex ? 'border-[#C5A059] scale-110 z-10 shadow-lg' : 'border-white/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image src={slide.image} alt={`Slide ${thumbIdx + 1}`} fill className="object-contain" />
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
