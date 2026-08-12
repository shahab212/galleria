'use client';

import React from 'react';
import Image from 'next/image';
import { Award, Sparkles, Sliders, Truck, Headphones, Camera, ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import CharReveal from './CharReveal';
import LightBeamButton from './LightBeamButton';

interface AdvisoryProps {
  isDarkMode: boolean;
  triggerToast: (msg: string) => void;
  instaPosts: any[];
}

export default function Advisory({ isDarkMode, triggerToast, instaPosts }: AdvisoryProps) {
  return (
    <>
      {/* 7. GLASSMORPHISM VALUE PROPOSITIONS CARDS */}
      <section className={`py-16 transition-colors duration-500 border-b ${
        isDarkMode ? 'bg-dark-spot-center border-white/10' : 'bg-ambient-spot-center border-[#E6DFC4]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">

            {/* Card 1 */}
            <ScrollReveal animation="fade-up" delay={0} className="h-full">
              <div className={`backdrop-blur-md p-6 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-3 group h-full ${
                isDarkMode ? 'bg-[#0C1623]/60 border-white/10 hover:border-[#C5A059]/60' : 'bg-white/90 border-[#E6DFC4] hover:border-[#C5A059]'
              }`}>
                <div className={`w-12 h-12 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mx-auto transition-all duration-300 shadow-xs ${
                  isDarkMode ? 'group-hover:bg-[#C5A059] group-hover:text-[#0C1623]' : 'group-hover:bg-[#C5A059] group-hover:text-white'
                }`}>
                  <Award className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h4 className={`text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-[#0C1623]'
                }`}>Museum Quality Prints</h4>
                <p className={`text-[11px] font-light leading-snug transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'
                }`}>100% Archival Linen & Fade-Proof Pigments</p>
              </div>
            </ScrollReveal>

            {/* Card 2 */}
            <ScrollReveal animation="fade-up" delay={100} className="h-full">
              <div className={`backdrop-blur-md p-6 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-3 group h-full ${
                isDarkMode ? 'bg-[#0C1623]/60 border-white/10 hover:border-[#C5A059]/60' : 'bg-white/90 border-[#E6DFC4] hover:border-[#C5A059]'
              }`}>
                <div className={`w-12 h-12 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mx-auto transition-all duration-300 shadow-xs ${
                  isDarkMode ? 'group-hover:bg-[#C5A059] group-hover:text-[#0C1623]' : 'group-hover:bg-[#C5A059] group-hover:text-white'
                }`}>
                  <Sparkles className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h4 className={`text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-[#0C1623]'
                }`}>Premium Framing</h4>
                <p className={`text-[11px] font-light leading-snug transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'
                }`}>Solid Hardwood & Gold Leaf Finishes</p>
              </div>
            </ScrollReveal>

            {/* Card 3 */}
            <ScrollReveal animation="fade-up" delay={200} className="h-full">
              <div className={`backdrop-blur-md p-6 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-3 group h-full ${
                isDarkMode ? 'bg-[#0C1623]/60 border-white/10 hover:border-[#C5A059]/60' : 'bg-white/90 border-[#E6DFC4] hover:border-[#C5A059]'
              }`}>
                <div className={`w-12 h-12 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mx-auto transition-all duration-300 shadow-xs ${
                  isDarkMode ? 'group-hover:bg-[#C5A059] group-hover:text-[#0C1623]' : 'group-hover:bg-[#C5A059] group-hover:text-white'
                }`}>
                  <Sliders className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h4 className={`text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-[#0C1623]'
                }`}>Custom Sizing</h4>
                <p className={`text-[11px] font-light leading-snug transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'
                }`}>Made-to-Order Dimensions for Any Wall</p>
              </div>
            </ScrollReveal>

            {/* Card 4 */}
            <ScrollReveal animation="fade-up" delay={300} className="h-full">
              <div className={`backdrop-blur-md p-6 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-3 group h-full ${
                isDarkMode ? 'bg-[#0C1623]/60 border-white/10 hover:border-[#C5A059]/60' : 'bg-white/90 border-[#E6DFC4] hover:border-[#C5A059]'
              }`}>
                <div className={`w-12 h-12 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mx-auto transition-all duration-300 shadow-xs ${
                  isDarkMode ? 'group-hover:bg-[#C5A059] group-hover:text-[#0C1623]' : 'group-hover:bg-[#C5A059] group-hover:text-white'
                }`}>
                  <Truck className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h4 className={`text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-[#0C1623]'
                }`}>Insured Shipping</h4>
                <p className={`text-[11px] font-light leading-snug transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'
                }`}>Free in Lahore, Flat rate elsewhere</p>
              </div>
            </ScrollReveal>

            {/* Card 5 */}
            <ScrollReveal animation="fade-up" delay={400} className="h-full sm:col-span-2 lg:col-span-1">
              <div className={`backdrop-blur-md p-6 rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 text-center space-y-3 group h-full ${
                isDarkMode ? 'bg-[#0C1623]/60 border-white/10 hover:border-[#C5A059]/60' : 'bg-white/90 border-[#E6DFC4] hover:border-[#C5A059]'
              }`}>
                <div className={`w-12 h-12 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center mx-auto transition-all duration-300 shadow-xs ${
                  isDarkMode ? 'group-hover:bg-[#C5A059] group-hover:text-[#0C1623]' : 'group-hover:bg-[#C5A059] group-hover:text-white'
                }`}>
                  <Headphones className="w-6 h-6 stroke-[1.75]" />
                </div>
                <h4 className={`text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-[#0C1623]'
                }`}>Concierge Advisory</h4>
                <p className={`text-[11px] font-light leading-snug transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'
                }`}>Bespoke Art Curation & Selection Advisory</p>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* 8. 3D FLOATING ARTWORK BANNER WITH CURVED MASK */}
      <section className={`py-20 lg:py-28 overflow-hidden transition-colors duration-500 border-b ${
        isDarkMode ? 'bg-dark-spot-center border-white/10' : 'bg-ambient-spot-center border-[#E6DFC4]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Curved Dark Banner Box */}
          <div className="relative bg-[#0B131F] text-white rounded-[40px] p-8 sm:p-14 lg:p-16 overflow-hidden shadow-2xl border border-white/10">
            
            {/* Subtle Gold Background Radial Glow */}
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#C5A059]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#C5A059]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
              
              {/* Left Column: Typography & Action Button */}
              <ScrollReveal animation="fade-right" className="lg:col-span-7 space-y-6 text-center lg:text-left">
                
                <div className="inline-flex items-center gap-2 bg-[#C5A059]/20 text-[#EBD8BE] text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest border border-[#C5A059]/40 shadow-sm animate-pulse">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>EXCLUSIVE WALL TRANSFORMATION</span>
                </div>

                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.15] text-white tracking-tight">
                  <CharReveal text="Create a Space " /><br />
                  <CharReveal text="You'll Love." className="font-serif italic font-light text-[#D4B26F]" delay={280} />
                </h2>

                <p className="text-xs sm:text-sm tracking-[0.25em] uppercase text-[#A0B0C4] font-semibold">
                  LET YOUR WALLS TELL YOUR STORY
                </p>

                <p className="text-xs sm:text-sm text-[#8EA1B8] font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                  Transform empty rooms into extraordinary living galleries with handcrafted archival canvases, custom solid wood frames, and museum-grade finishes.
                </p>

                <div className="pt-4 flex justify-center lg:justify-start">
                  <LightBeamButton
                    onClick={() => {
                      document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span>EXPLORE STORE COLLECTION</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition duration-300" />
                  </LightBeamButton>
                </div>

              </ScrollReveal>

              {/* Right Column: 3D Floating Overlapping Art Cards Showcase */}
              <ScrollReveal animation="scale-up" delay={200} className="lg:col-span-5 relative flex items-center justify-center min-h-[340px] sm:min-h-[400px]">
                
                {/* 3D Art Card 1 (Left Back - Tilted) */}
                <div className="hidden sm:block absolute sm:left-4 top-4 w-44 sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden border-4 border-[#1C2530] shadow-2xl transition-all duration-700 -rotate-12 hover:rotate-0 hover:z-30 hover:scale-105 origin-bottom-left group">
                  <Image
                    src="/collection/img2.jpg"
                    alt="Floating Art Showcase 1"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* 3D Art Card 2 (Right Back - Tilted) */}
                <div className="hidden sm:block absolute sm:right-4 top-8 w-44 sm:w-52 aspect-[3/4] rounded-2xl overflow-hidden border-4 border-[#C5A059] shadow-2xl transition-all duration-700 rotate-12 hover:rotate-0 hover:z-30 hover:scale-105 origin-bottom-right group">
                  <Image
                    src="/collection/img4.jpg"
                    alt="Floating Art Showcase 2"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* 3D Art Card 3 (Center Featured Front - Elevated) */}
                <div className="relative z-20 w-52 sm:w-64 aspect-[3/4] rounded-2xl overflow-hidden border-4 border-white/90 shadow-[0_30px_60px_rgba(0,0,0,0.8)] transition-all duration-700 hover:scale-110 group rotate-2 hover:rotate-0">
                  <Image
                    src="/shop/image 22.jpg"
                    alt="Floating Art Featured"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                    <span className="text-[9px] font-bold tracking-widest text-[#EBD8BE] uppercase">LIMITED CANVAS</span>
                    <h5 className="font-serif text-sm font-semibold text-white">Verona Luxe Masterpiece</h5>
                  </div>
                </div>

              </ScrollReveal>

            </div>

          </div>
        </div>
      </section>

      {/* 9. TILTED POLAROID SOCIAL FEED SHOWCASE */}
      <section className={`py-20 lg:py-28 overflow-hidden transition-colors duration-500 border-b ${
        isDarkMode ? 'bg-dark-spot-top border-white/10' : 'bg-ambient-spot-top border-[#E6DFC4]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Header */}
          <ScrollReveal animation="fade-up" className={`flex flex-col md:flex-row md:items-end justify-between gap-6 border-b pb-8 transition-colors duration-300 ${
            isDarkMode ? 'border-white/10' : 'border-[#E6DFC4]'
          }`}>
            <div className="space-y-3">
              <div className={`inline-flex items-center gap-2 text-[10px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-widest border transition-colors duration-300 ${
                isDarkMode ? 'bg-[#C5A059]/15 text-[#C5A059] border-[#C5A059]/30' : 'bg-[#C5A059]/15 text-[#0C1623] border-[#C5A059]/30'
              }`}>
                <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>INSTAGRAM COMMUNITY SHOWCASE</span>
              </div>
              <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-[#0C1623]'
              }`}>
                <CharReveal text="Follow Our Journey " />
                <CharReveal text="@galleriaarts" className="font-serif italic text-[#C5A059]" delay={340} />
              </h2>
              <p className={`text-xs sm:text-sm font-light max-w-xl transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-[#4F5B6A]'
              }`}>
                Tag us <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0C1623]'}`}>#GALLERIAARTS</span> in your home spaces to be featured in our curated luxury gallery feed.
              </p>
            </div>

            <div>
              <LightBeamButton
                onClick={() => window.open("https://www.instagram.com/galleriaarts.co/", "_blank", "noopener,noreferrer")}
              >
                <Camera className="w-4 h-4" />
                <span>Follow @galleriaarts</span>
              </LightBeamButton>
            </div>
          </ScrollReveal>

          {/* 6 Tilted Polaroid Social Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 pt-4">
            {instaPosts.map((post, idx) => (
              <ScrollReveal
                key={post.id}
                animation="fade-up"
                delay={idx * 80}
                duration={700}
                className="h-full"
              >
                <div
                  onClick={() => triggerToast(`Opening ${post.handle}'s interior feature!`)}
                  className={`group relative p-4 rounded-[24px] shadow-xl transition-all duration-500 hover:rotate-0 hover:scale-105 hover:z-30 cursor-pointer origin-center ${
                    post.tilt
                  } ${isDarkMode ? 'bg-[#0C1623]/60 border border-white/10' : 'bg-white border border-gray-200/80'}`}
                >
                  {/* Image Container */}
                  <div className={`relative aspect-square w-full rounded-2xl overflow-hidden mb-3 transition-colors duration-300 ${
                    isDarkMode ? 'bg-white/10' : 'bg-[#F3ECE2]'
                  }`}>
                    <Image
                      src={post.src}
                      alt={post.caption}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white">
                      <div className="flex items-center justify-between text-xs font-bold">
                        <span className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px]">
                          ❤️ {post.likes}
                        </span>
                        <Camera className="w-4 h-4 text-[#C5A059]" />
                      </div>

                      <div className="text-[10px] font-bold tracking-wider uppercase bg-[#C5A059] text-[#0C1623] py-1.5 px-3 rounded-full text-center shadow-md">
                        Shop Featured Look ↗
                      </div>
                    </div>
                  </div>

                  {/* Polaroid Caption Area */}
                  <div className="px-1 space-y-1">
                    <span className={`text-xs font-bold block transition-colors duration-300 ${
                      isDarkMode ? 'text-white group-hover:text-[#C5A059]' : 'text-[#0C1623] group-hover:text-[#C5A059]'
                    }`}>
                      {post.handle}
                    </span>
                    <p className={`text-[11px] font-light leading-snug line-clamp-1 transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'
                    }`}>
                      {post.caption}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
