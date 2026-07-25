'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '../types';
import { COLLECTION_IMAGES } from '../data';

interface CollectionsProps {
  isDarkMode: boolean;
  setSelectedProduct: (product: Product) => void;
}

export default function Collections({ isDarkMode, setSelectedProduct }: CollectionsProps) {
  return (
    <section id="collections" className={`scroll-mt-28 py-10 sm:py-14 overflow-hidden relative transition-colors duration-500 border-b ${
      isDarkMode ? 'bg-dark-spot-top border-white/10' : 'bg-ambient-spot-top border-[#E6DFC4]'
    }`}>
      {/* SVG ClipPath Definition for a More Pronounced Concave Curved Arch Mask */}
      <svg width="0" height="0" className="absolute pointer-events-none w-0 h-0">
        <defs>
          <clipPath id="curved-panorama-mask" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.06 Q 0.5,0.20 1,0.06 L 1,0.94 Q 0.5,0.80 0,0.94 Z" />
          </clipPath>
        </defs>
      </svg>

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 text-center space-y-2">
        <h2 className={`font-serif text-2xl sm:text-3xl font-normal transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-[#0C1623]'
        }`}>
          Curated <span className={`font-serif italic font-light transition-colors duration-300 ${
            isDarkMode ? 'text-slate-300' : 'text-[#596A7D]'
          }`}>Collection Gallery</span>
        </h2>
        <p className={`text-[11px] tracking-[0.25em] uppercase font-medium transition-colors duration-300 ${
          isDarkMode ? 'text-[#C5A059]' : 'text-[#716250]'
        }`}>
          DISCOVER OUR LATEST INTERIOR LOOKBOOK & EXCLUSIVE ARTWORK
        </p>
        <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mt-2"></div>
      </div>

      {/* Curved Banner Strip with Arch Mask */}
      <div className="relative w-full overflow-hidden py-4">
        <div 
          className="relative w-full overflow-hidden py-4"
          style={{ clipPath: 'url(#curved-panorama-mask)' }}
        >
          {/* Continuous Right-to-Left Slider Track */}
          <div className="animate-marquee-rtl flex items-center gap-3 sm:gap-5 py-4">
            {[...COLLECTION_IMAGES, ...COLLECTION_IMAGES].map((img, idx) => (
              <div 
                key={`${img.id}-${idx}`}
                onClick={() => setSelectedProduct({
                  id: img.id,
                  name: img.title,
                  category: 'collection',
                  type: 'Exhibition Collection Canvas',
                  pricePKR: 34500,
                  rating: 4.9,
                  image: img.src,
                  desc: img.desc
                })}
                className="group relative flex-shrink-0 w-48 sm:w-60 md:w-72 aspect-[3/4] overflow-hidden cursor-pointer shadow-xl transition-all duration-500 border border-white/60 hover:border-[#C5A059] rounded-2xl"
              >
                {/* Image with Smooth Zoom inside Curved Arch Frame */}
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-115"
                />

                {/* Dark Glassmorphism Overlay displaying Text & Description on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 ease-out flex flex-col justify-end p-5 text-white">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-[#C5A059] uppercase mb-1">
                    EXHIBITION ARTWORK
                  </span>
                  <h4 className="font-serif text-lg font-semibold text-white tracking-tight">{img.title}</h4>
                  <p className="text-[11px] text-white/90 mt-1 font-light leading-snug line-clamp-2">
                    {img.desc}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#EBD8BE] uppercase border-t border-white/20 pt-2">
                    <span>OPEN POPUP WINDOW</span>
                    <span>──&gt;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
