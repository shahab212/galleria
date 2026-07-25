'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface VisualizerProps {
  isDarkMode: boolean;
  visualizerArt: Product;
  setVisualizerArt: (art: Product) => void;
  visualizerRoom: 'minimalist' | 'obsidian' | 'warm';
  setVisualizerRoom: (room: 'minimalist' | 'obsidian' | 'warm') => void;
  visualizerFrame: 'walnut' | 'gold' | 'black';
  setVisualizerFrame: (frame: 'walnut' | 'gold' | 'black') => void;
  visualizerScale: 'medium' | 'gallery' | 'oversized';
  setVisualizerScale: (scale: 'medium' | 'gallery' | 'oversized') => void;
  addToCart: (product: Product) => void;
  triggerToast: (msg: string) => void;
  products: Product[];
  globalDiscount: number;
}

const formatPKR = (amount: number) => {
  return `PKR ${amount.toLocaleString('en-PK')}`;
};

export default function Visualizer({
  isDarkMode,
  visualizerArt,
  setVisualizerArt,
  visualizerRoom,
  setVisualizerRoom,
  visualizerFrame,
  setVisualizerFrame,
  visualizerScale,
  setVisualizerScale,
  addToCart,
  triggerToast,
  products,
  globalDiscount
}: VisualizerProps) {
  return (
    <section id="visualizer" className={`scroll-mt-28 py-20 overflow-hidden relative transition-colors duration-500 border-b ${
      isDarkMode ? 'bg-dark-spot-center border-white/10' : 'bg-ambient-spot-center border-[#E6DFC4]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#C5A059]/15 text-[#C5A059] text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest border border-[#C5A059]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>ROOM SCENE ART PREVIEW</span>
          </div>
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-[#0C1623]'
          }`}>
            Interactive Art <span className={`font-serif italic font-light transition-colors duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-[#596A7D]'
            }`}>Visualizer</span>
          </h2>
          <p className={`text-xs sm:text-sm font-light leading-relaxed max-w-xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-slate-300' : 'text-[#4F5B6A]'
          }`}>
            Select any canvas, room style, frame finish, and size to see the artwork style relative to realistic designer furniture and wall shadows.
          </p>
        </div>

        {/* Main Visualizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT SIDE: Designer Room Wall (Col Span 8) */}
          <div className="lg:col-span-8 flex flex-col justify-between relative overflow-hidden rounded-[32px] shadow-2xl border border-white/10 min-h-[480px]">
            
            {/* Room Background Wall and floor styles depending on visualizerRoom */}
            <div className={`absolute inset-0 flex flex-col justify-between transition-all duration-700 ${
              visualizerRoom === 'minimalist' 
                ? 'bg-gradient-to-b from-[#ECEAE4] to-[#DFDDD6]' 
                : visualizerRoom === 'obsidian' 
                ? 'bg-gradient-to-b from-[#131A22] to-[#0A0E13]' 
                : 'bg-gradient-to-b from-[#DBCFC0] to-[#C9BCAE]'
            }`}>
              
              {/* Wall Spotlight/Shadow Overlay */}
              <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                visualizerRoom === 'obsidian'
                  ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.04] via-transparent to-transparent'
                  : 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/[0.2] via-transparent to-transparent'
              }`} />

              {/* Wall Accents (Obsidian room has thin golden lines) */}
              {visualizerRoom === 'obsidian' && (
                <div className="absolute inset-0 pointer-events-none border-x border-[#C5A059]/5 flex justify-around">
                  <div className="w-[1px] h-full bg-[#C5A059]/10" />
                  <div className="w-[1px] h-full bg-[#C5A059]/10" />
                </div>
              )}

              {/* Main Art Mounting Area */}
              <div className="flex-1 flex items-center justify-center p-6 relative">
                
                {/* Hung Framed Artwork Canvas */}
                <div className={`relative transition-all duration-500 ease-out transform hover:scale-[1.02] shadow-[5px_25px_50px_rgba(0,0,0,0.55)] ${
                  visualizerScale === 'medium'
                    ? 'w-36 h-48 sm:w-44 sm:h-60'
                    : visualizerScale === 'gallery'
                    ? 'w-44 h-60 sm:w-56 sm:h-72'
                    : 'w-52 h-72 sm:w-68 sm:h-96'
                } ${
                  visualizerFrame === 'walnut'
                    ? 'border-[8px] sm:border-[12px] border-[#3A2212]'
                    : visualizerFrame === 'black'
                    ? 'border-[8px] sm:border-[12px] border-[#1C2530]'
                    : 'border-[8px] sm:border-[12px] border-[#C5A059]'
                }`}>
                  
                  {/* Inner shadow/Mat board separator */}
                  <div className="absolute inset-0 border border-white/20 z-10" />
                  
                  {/* The Canvas Art Image */}
                  <Image
                    src={visualizerArt.image}
                    alt={visualizerArt.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

              </div>

              {/* Sofa & Floor Area */}
              <div className="relative z-10 flex flex-col items-center">
                
                {/* Minimalist Designer Sofa Component */}
                <div className="w-[75%] sm:w-[60%] flex flex-col items-center -mb-2 relative">
                  
                  {/* Couch Backrest */}
                  <div className={`w-full h-12 rounded-t-2xl shadow-inner transition-colors duration-500 ${
                    visualizerRoom === 'minimalist' 
                      ? 'bg-[#FDFDFD] border border-slate-200' 
                      : visualizerRoom === 'obsidian' 
                      ? 'bg-[#182330] border border-[#C5A059]/20 shadow-[0_0_15px_rgba(197,160,89,0.1)]' 
                      : 'bg-[#7C4D3A] border border-[#5A3828]'
                  }`} />
                  
                  {/* Couch Cushions (3 cushions) */}
                  <div className="w-full flex gap-1 px-2 -mt-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className={`flex-1 h-8 rounded-lg shadow-sm transition-colors duration-500 ${
                        visualizerRoom === 'minimalist' 
                          ? 'bg-[#F5F5F5] border border-slate-200/80' 
                          : visualizerRoom === 'obsidian' 
                          ? 'bg-[#1D2B3B] border border-[#C5A059]/15' 
                          : 'bg-[#8F5A44] border border-[#6B4031]'
                      }`} />
                    ))}
                  </div>

                  {/* Couch Base Platform */}
                  <div className={`w-[104%] h-4 rounded-full mt-1 transition-colors duration-500 ${
                    visualizerRoom === 'minimalist' 
                      ? 'bg-slate-300' 
                      : visualizerRoom === 'obsidian' 
                      ? 'bg-[#0C1623] border-b border-[#C5A059]/10' 
                      : 'bg-[#402920]'
                  }`} />

                  {/* Couch Wooden Legs */}
                  <div className="w-full flex justify-between px-8">
                    <div className="w-1.5 h-6 bg-[#3A2212] rotate-12 transform origin-top" />
                    <div className="w-1.5 h-6 bg-[#3A2212] -rotate-12 transform origin-top" />
                  </div>

                </div>

                {/* Floor Panel */}
                <div className={`w-full h-10 border-t transition-all duration-700 ${
                  visualizerRoom === 'minimalist'
                    ? 'bg-gradient-to-b from-[#D4C3AC] to-[#C0AE98] border-slate-200/50'
                    : visualizerRoom === 'obsidian'
                    ? 'bg-gradient-to-b from-[#0A0D12] to-[#040608] border-[#C5A059]/10'
                    : 'bg-gradient-to-b from-[#5C4535] to-[#453226] border-[#3E2C22]'
                }`} />

              </div>

            </div>

            {/* Top Right Floating Badge showing Current Scale */}
            <div className="absolute top-4 left-4 z-20">
              <span className="bg-black/60 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-white/10 shadow-md">
                Room View: {visualizerScale === 'medium' ? 'Medium (30"x40")' : visualizerScale === 'gallery' ? 'Gallery (48"x60")' : 'Oversized (60"x80")'}
              </span>
            </div>

          </div>

          {/* RIGHT SIDE: Interactive Control Dashboard (Col Span 4) */}
          <div className={`lg:col-span-4 rounded-[32px] p-6 sm:p-8 flex flex-col justify-between border shadow-lg transition-all duration-300 ${
            isDarkMode ? 'bg-[#0C1623]/60 border-white/10 text-white' : 'bg-white border-[#E6DFC4] text-[#0C1623]'
          }`}>
            
            <div className="space-y-6">
              
              {/* Control 1: Select Painting */}
              <div className="space-y-2.5">
                <label className={`text-[10px] font-bold tracking-wider uppercase block ${isDarkMode ? 'text-slate-400' : 'text-[#716250]'}`}>
                  1. Select Artwork
                </label>
                
                {/* Horizontal Scroll of Artwork Thumbnails */}
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                  {products.slice(0, 8).map((art) => (
                    <button
                      key={art.id}
                      onClick={() => setVisualizerArt(art)}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                        visualizerArt.id === art.id 
                          ? 'border-[#C5A059] scale-105 shadow-md ring-2 ring-[#C5A059]/20' 
                          : 'border-transparent opacity-75 hover:opacity-100'
                      }`}
                    >
                      <Image src={art.image} alt={art.name} fill className="object-cover" />
                    </button>
                  ))}
                </div>
                
                {/* Selected painting metadata */}
                <div className="pt-0.5">
                  <h5 className="font-serif text-sm font-semibold leading-none">{visualizerArt.name}</h5>
                  <p className={`text-[10px] mt-1 font-light ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{visualizerArt.type}</p>
                </div>
              </div>

              {/* Control 2: Select Room Interior Style */}
              <div className="space-y-2.5">
                <label className={`text-[10px] font-bold tracking-wider uppercase block ${isDarkMode ? 'text-slate-400' : 'text-[#716250]'}`}>
                  2. Select Room Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'minimalist', name: 'Nordic' },
                    { id: 'obsidian', name: 'Obsidian' },
                    { id: 'warm', name: 'Salon' }
                  ].map((room) => (
                    <button
                      key={room.id}
                      onClick={() => setVisualizerRoom(room.id as any)}
                      className={`py-2 px-3 text-[10px] font-bold tracking-wider uppercase rounded-xl border text-center transition-all duration-300 ${
                        visualizerRoom === room.id 
                          ? 'bg-[#C5A059] border-[#C5A059] text-[#0C1623] shadow-md font-bold'
                          : isDarkMode
                          ? 'bg-[#070D14]/80 border-white/10 hover:border-[#C5A059]/50 text-white'
                          : 'bg-[#FAF9F6] border-[#E2DAD0] hover:border-[#0C1623] text-[#0C1623]'
                      }`}
                    >
                      {room.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 3: Select Frame Style */}
              <div className="space-y-2.5">
                <label className={`text-[10px] font-bold tracking-wider uppercase block ${isDarkMode ? 'text-slate-400' : 'text-[#716250]'}`}>
                  3. Custom Frame Finish
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'walnut', name: 'Walnut' },
                    { id: 'black', name: 'Obsidian' },
                    { id: 'gold', name: 'Gilded' }
                  ].map((frame) => (
                    <button
                      key={frame.id}
                      onClick={() => setVisualizerFrame(frame.id as any)}
                      className={`py-2 px-2 text-[10px] font-bold tracking-wider uppercase rounded-xl border text-center transition-all duration-300 ${
                        visualizerFrame === frame.id 
                          ? 'bg-[#C5A059] border-[#C5A059] text-[#0C1623] shadow-md font-bold'
                          : isDarkMode
                          ? 'bg-[#070D14]/80 border-white/10 hover:border-[#C5A059]/50 text-white'
                          : 'bg-[#FAF9F6] border-[#E2DAD0] hover:border-[#0C1623] text-[#0C1623]'
                      }`}
                    >
                      {frame.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Control 4: Select Scale */}
              <div className="space-y-2.5">
                <label className={`text-[10px] font-bold tracking-wider uppercase block ${isDarkMode ? 'text-slate-400' : 'text-[#716250]'}`}>
                  4. Artwork Size/Scale
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'medium', name: '30"x40"' },
                    { id: 'gallery', name: '48"x60"' },
                    { id: 'oversized', name: '60"x80"' }
                  ].map((scale) => (
                    <button
                      key={scale.id}
                      onClick={() => setVisualizerScale(scale.id as any)}
                      className={`py-2 px-2 text-[10px] font-bold tracking-wider uppercase rounded-xl border text-center transition-all duration-300 ${
                        visualizerScale === scale.id 
                          ? 'bg-[#C5A059] border-[#C5A059] text-[#0C1623] shadow-md font-bold'
                          : isDarkMode
                          ? 'bg-[#070D14]/80 border-white/10 hover:border-[#C5A059]/50 text-white'
                          : 'bg-[#FAF9F6] border-[#E2DAD0] hover:border-[#0C1623] text-[#0C1623]'
                      }`}
                    >
                      {scale.name}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Purchase CTA */}
            <div className="pt-6 border-t border-dashed border-[#C5A059]/30 mt-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className={`text-[10px] font-bold tracking-wider uppercase ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Price (With Frame)</span>
                {(() => {
                  const specific = visualizerArt.discountPercent || 0;
                  const activeDiscount = specific > 0 ? specific : globalDiscount;
                  const hasDiscount = activeDiscount > 0;
                  const saleBasePrice = hasDiscount ? Math.round(visualizerArt.pricePKR * (1 - activeDiscount / 100)) : visualizerArt.pricePKR;
                  const framePrice = visualizerFrame === 'gold' ? 6500 : 4500;

                  return (
                    <div className="text-right">
                      <span className="text-xl font-bold text-[#C5A059]">
                        {formatPKR(saleBasePrice + framePrice)}
                      </span>
                      {hasDiscount && (
                        <div className="text-[10px] line-through text-slate-500 font-light mt-0.5 leading-none">
                          {formatPKR(visualizerArt.pricePKR + framePrice)}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

              <button
                onClick={() => {
                  addToCart(visualizerArt);
                  triggerToast(`Added ${visualizerArt.name} (${visualizerFrame} framed) to your cart!`);
                }}
                className={`w-full py-3.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-md ${
                  isDarkMode 
                    ? 'bg-[#C5A059] hover:bg-white text-[#0C1623] hover:text-[#0C1623]' 
                    : 'bg-[#0C1623] hover:bg-[#C5A059] text-white hover:text-[#0C1623]'
                }`}
              >
                ADD THIS LOOK TO CART
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
