'use client';

import React from 'react';
import Image from 'next/image';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  tilt: string;
}

interface AboutProps {
  isDarkMode: boolean;
  teamMembers: TeamMember[];
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: 't1',
    name: 'Eleanor Vance',
    role: 'Head of Art Curation',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    tilt: '-rotate-3 hover:rotate-0 origin-bottom-left'
  },
  {
    id: 't2',
    name: 'Ralph Edwards',
    role: 'Master Canvas Artisan',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    tilt: 'rotate-1 hover:rotate-0 origin-bottom'
  },
  {
    id: 't3',
    name: 'Arlene McCoy',
    role: 'Lead Interior Stylist',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    tilt: 'rotate-4 hover:rotate-0 origin-bottom-right'
  }
];

export default function About({ isDarkMode, teamMembers }: AboutProps) {
  const activeMembers = teamMembers && teamMembers.length > 0 ? teamMembers : DEFAULT_MEMBERS;

  return (
    <section
      id="about"
      className={`scroll-mt-28 py-20 lg:py-24 overflow-hidden transition-colors duration-500 border-b ${
        isDarkMode ? 'bg-dark-spot-center border-white/10' : 'bg-ambient-spot-center border-[#E6DFC4]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 space-y-24">
        
        {/* Top 3-Column Layout: Brand Story */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bold Headline & Descriptions */}
          <div className="md:col-span-4 flex flex-col justify-center space-y-6 sm:space-y-8">
            <h2
              className={`font-sans font-black text-6xl sm:text-7xl lg:text-[84px] tracking-tighter leading-[0.8] uppercase transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-[#0C1623]'
              }`}
            >
              ABOUT<br />US
            </h2>
            
            <div className="space-y-3.5">
              <h3 className="font-sans font-bold text-xs uppercase tracking-[0.18em] text-[#C5A059]">
                Luxurious Interior and Archival Curation
              </h3>
              <p
                className={`text-xs sm:text-sm font-light leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-[#4F5B6A]'
                }`}
              >
                Modern Elegance: Designs featuring clean lines, neutral palettes, and high-quality materials.
              </p>
            </div>
          </div>

          {/* Center Column: Large Main Living Room Image */}
          <div className="md:col-span-5 flex justify-center">
            <div
              className={`w-full aspect-[16/10] rounded-[32px] overflow-hidden shadow-2xl relative border transition-transform duration-500 hover:scale-[1.01] ${
                isDarkMode ? 'border-white/10 shadow-black/40' : 'border-[#C5A059]/20 shadow-slate-900/10'
              }`}
            >
              <Image
                src="/slider/main1.png"
                alt="Luxurious Room Space Layout"
                fill
                className="object-cover"
                sizes="(max-w-768px) 100vw, 40vw"
                priority
              />
            </div>
          </div>

          {/* Right Column: Smaller Showcase Image & Philosophy */}
          <div className="md:col-span-3 flex flex-col justify-between h-full space-y-6 sm:space-y-8">
            <div
              className={`w-full aspect-[16/10] rounded-[24px] overflow-hidden shadow-xl relative border transition-transform duration-500 hover:scale-[1.01] ${
                isDarkMode ? 'border-white/10 shadow-black/30' : 'border-[#C5A059]/15 shadow-slate-900/5'
              }`}
            >
              <Image
                src="/slider/main%203.png"
                alt="Interior Room Details"
                fill
                className="object-cover"
                sizes="(max-w-768px) 100vw, 25vw"
              />
            </div>
            
            <div className="space-y-2.5">
              <h4
                className={`font-sans font-bold text-lg sm:text-xl tracking-tight transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-[#0C1623]'
                }`}
              >
                Our Philosophy
              </h4>
              <p
                className={`text-xs sm:text-sm font-light leading-relaxed transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-[#4F5B6A]'
                }`}
              >
                At Galleria, we believe in creating luxurious, personalized environments that reflect our clients' tastes and lifestyles.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Section: The Team Behind Our Curations */}
        <div className={`pt-20 border-t ${isDarkMode ? 'border-white/10' : 'border-[#C5A059]/20'}`}>
          <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
            <h3
              className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-[#0C1623]'
              }`}
            >
              The Team Behind <span className="italic font-light text-[#C5A059] font-serif">Our Curations</span>
            </h3>
            <p
              className={`text-xs sm:text-sm font-light leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-slate-400' : 'text-[#4F5B6A]'
              }`}
            >
              At Galleria, our master curators and artisans are dedicated to selecting and crafting museum-grade canvases and frames that bring life, luxury, and warmth to your home.
            </p>
            
            {/* Styled Action Buttons */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <a
                href="#shop"
                className="bg-[#C5A059] hover:bg-white text-[#0C1623] px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md"
              >
                Explore Catalog
              </a>
              <a
                href="#contact"
                className={`border px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 ${
                  isDarkMode
                    ? 'border-white/20 text-white hover:bg-white/5'
                    : 'border-[#0C1623]/25 text-[#0C1623] hover:bg-[#0C1623]/5'
                }`}
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Polaroid Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto px-4 md:px-0">
            {activeMembers.map((member) => (
              <div
                key={member.id}
                className={`group relative rounded-[28px] p-4 sm:p-5 shadow-xl transition-all duration-500 hover:scale-104 hover:z-20 ${member.tilt} ${
                  isDarkMode
                    ? 'bg-[#0C1623]/60 border border-white/10 shadow-black/35 hover:border-[#C5A059]/40'
                    : 'bg-white border border-[#E6DFC4]/50 shadow-slate-900/5 hover:border-[#C5A059]/60'
                }`}
              >
                <div
                  className={`relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-white/10 mb-4 border ${
                    isDarkMode ? 'border-white/5' : 'border-slate-100'
                  }`}
                >
                  {member.image && (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-w-768px) 100vw, 25vw"
                    />
                  )}
                </div>
                <div className="pb-2 text-left">
                  <h4
                    className={`font-sans font-bold text-lg tracking-tight transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-[#0C1623]'
                    }`}
                  >
                    {member.name}
                  </h4>
                  <p className="text-[11px] font-bold text-[#C5A059] uppercase tracking-wider mt-0.5">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
