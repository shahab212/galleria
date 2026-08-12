'use client';

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Camera } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import LightBeamButton from './LightBeamButton';
import FollowUsBadge from './FollowUsBadge';

interface FooterProps {
  isDarkMode: boolean;
  triggerToast: (msg: string) => void;
}

export default function Footer({ isDarkMode, triggerToast }: FooterProps) {
  return (
    <footer className={`pt-10 pb-16 border-t relative overflow-hidden transition-colors duration-500 ${
      isDarkMode ? 'bg-dark-spot-top text-slate-300 border-white/10' : 'bg-ambient-spot-top text-[#4F5B6A] border-[#E6DFC4]'
    }`}>
      
      {/* Combined Centered Watermark Logo (Monogram + Text) */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 transition-opacity duration-500 overflow-hidden ${
        isDarkMode ? 'opacity-[0.09]' : 'opacity-[0.16]'
      }`}>
        {/* Monogram */}
        <div className="relative w-80 h-80 md:w-[420px] md:h-[420px]">
          <Image
            src="/images/monogram.png"
            alt="Galleria Monogram Watermark"
            fill
            className={`object-contain transition-all duration-300 ${
              isDarkMode ? 'brightness-0 invert' : ''
            }`}
          />
        </div>
        {/* Watermark text */}
        <div className={`text-[10vw] md:text-[8vw] font-serif font-black uppercase tracking-[0.2em] leading-none whitespace-nowrap mt-4 transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-[#0C1623]'
        }`}>
          GALLERIA
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14">
        
        {/* Top Architectural Ribbon & Back to Top Capsule */}
        <div className={`flex flex-col sm:flex-row items-center justify-between gap-6 pb-12 border-b transition-colors duration-300 ${
          isDarkMode ? 'border-white/10' : 'border-[#E6DFC4]'
        }`}>
          <div className="flex items-center gap-4">
            <Image
              src="/images/logo1.png"
              alt="Galleria Arts & Co."
              width={280}
              height={90}
              className={`h-14 sm:h-16 w-auto object-contain transition-all duration-300 ${
                isDarkMode ? 'brightness-0 invert' : ''
              }`}
            />
            <div className={`hidden md:block h-8 w-[1px] transition-colors duration-300 ${isDarkMode ? 'bg-white/10' : 'bg-[#E6DFC4]'}`} />
            <span className={`hidden md:block text-xs tracking-[0.2em] uppercase font-light transition-colors duration-300 ${
              isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'
            }`}>
              Curating Timeless Artworks For Extraordinary Spaces
            </span>
          </div>

          <LightBeamButton
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span>Back To Top</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 duration-300" />
          </LightBeamButton>
        </div>

        {/* 4 Columns Main Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b transition-colors duration-300 ${
          isDarkMode ? 'border-white/10' : 'border-[#E6DFC4]'
        }`}>

          {/* Col 1: Flagship Gallery Studio */}
          <ScrollReveal animation="fade-up" delay={0} className="lg:col-span-4 space-y-4">
            <h4 className={`text-xs font-bold tracking-[0.2em] uppercase border-l-2 border-[#C5A059] pl-3 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-[#0C1623]'
            }`}>
              Flagship Studio &amp; Advisory
            </h4>
            <p className={`text-xs leading-relaxed font-light transition-colors duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-[#4F5B6A]'
            }`}>
              Galleria Arts Studio, Main Boulevard, Gulberg III, Lahore, Pakistan.
            </p>

            <div className="space-y-2 pt-2 text-xs">
              <p className={`flex items-center gap-2 transition-colors duration-300 ${isDarkMode ? 'text-slate-200' : 'text-[#0C1623]'}`}>
                <span className="text-[#C5A059] font-bold">Email:</span> concierge@galleriaarts.com
              </p>
              <p className={`flex items-center gap-2 transition-colors duration-300 ${isDarkMode ? 'text-slate-200' : 'text-[#0C1623]'}`}>
                <span className="text-[#C5A059] font-bold">WhatsApp:</span> +92 300 1234567
              </p>
              <p className={`text-[11px] font-light transition-colors duration-300 ${
                isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'
              }`}>Hours: Mon – Sat (11 AM – 9 PM PKT)</p>
            </div>

            {/* Follow Us Speech Bubble Badge & Social Links */}
            <div className="pt-2">
              <FollowUsBadge
                isDarkMode={isDarkMode}
                align="left"
                showWhatsApp={false}
                facebookUrl="https://www.facebook.com/profile.php?id=61591824065745"
                instagramUrl="https://www.instagram.com/galleriaarts.co/"
                whatsappNumber="923001234567"
              />
            </div>
          </ScrollReveal>

          {/* Col 2: Showroom Directory */}
          <ScrollReveal animation="fade-up" delay={100} className="lg:col-span-4 space-y-4">
            <h4 className={`text-xs font-bold tracking-[0.2em] uppercase border-l-2 border-[#C5A059] pl-3 transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-[#0C1623]'
            }`}>
              Regional Advisory Showrooms
            </h4>
            <div className="space-y-4 text-xs font-light">
              <div className="space-y-1">
                <p className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0C1623]'}`}>Lahore Advisory:</p>
                <p className={isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'}>Main Boulevard, Gulberg III, Lahore.</p>
              </div>
              <div className="space-y-1">
                <p className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0C1623]'}`}>Islamabad Advisor Studio:</p>
                <p className={isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'}>Sector F-7/2, Islamabad.</p>
              </div>
              <div className="space-y-1">
                <p className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0C1623]'}`}>Karachi Advisory Gallery:</p>
                <p className={isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'}>Clifton Block 4, Karachi.</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Col 3: Newsletter Signups */}
          <ScrollReveal animation="fade-up" delay={200} className="lg:col-span-4 space-y-5">
            <div className="space-y-2">
              <h4 className={`text-xs font-bold tracking-[0.2em] uppercase border-l-2 border-[#C5A059] pl-3 transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-[#0C1623]'
              }`}>
                Private Curation Drops
              </h4>
              <p className={`text-xs leading-relaxed font-light transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-[#4F5B6A]'
              }`}>
                Subscribe to receive private preview drops, artisan stories, and exclusive custom framing advisor invites.
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); triggerToast('Subscribed to Galleria private drops!'); }} className="flex">
              <input
                suppressHydrationWarning
                type="email"
                placeholder="Enter your email address..."
                required
                className={`text-xs px-4 py-3.5 rounded-l-xl border focus:outline-none flex-1 shadow-xs transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-[#070D14]/80 text-white border-white/10 focus:border-[#C5A059]'
                    : 'bg-white text-[#0C1623] border border-[#E6DFC4] focus:border-[#0C1623]'
                }`}
              />
              <button
                suppressHydrationWarning
                type="submit"
                className={`text-xs font-bold px-6 py-3.5 rounded-r-xl transition shadow-md flex items-center justify-center ${
                  isDarkMode
                    ? 'bg-[#C5A059] hover:bg-white text-[#0C1623] hover:text-[#0C1623]'
                    : 'bg-[#0C1623] hover:bg-[#C5A059] text-white hover:text-[#0C1623]'
                }`}
              >
                <span>SUBSCRIBE</span>
              </button>
            </form>

            {/* WhatsApp Live Capsule */}
            <div className={`p-4 rounded-2xl flex items-center justify-between shadow-lg border transition-all duration-300 ${
              isDarkMode
                ? 'bg-[#0C1623]/60 border-[#25D366]/20'
                : 'bg-white border-[#25D366]/40 shadow-md'
            }`}>
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-[#25D366] tracking-wider uppercase flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                  LIVE ART CONCIERGE
                </span>
                <p className={`text-xs font-bold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0C1623]'}`}>+92 300 1234567</p>
              </div>

              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold px-5 py-2.5 rounded-full transition shadow-md uppercase tracking-wider"
              >
                <span>Chat</span>
              </a>
            </div>
          </ScrollReveal>

        </div>

        {/* Bottom Copyright & Location Bar */}
        <ScrollReveal animation="fade-up" delay={300} className={`flex flex-col md:flex-row items-center justify-between text-xs gap-4 transition-colors duration-300 w-full ${
          isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'
        }`}>
          <p className="text-center md:text-left">
            &copy; 2026 Galleria Arts &amp; Co. All Rights Reserved.
          </p>

          <div className={`tracking-[0.25em] uppercase text-[11px] font-semibold transition-colors duration-300 ${
            isDarkMode ? 'text-slate-200' : 'text-[#0C1623]'
          }`}>
            ISLAMABAD &bull; LAHORE &bull; KARACHI
          </div>
        </ScrollReveal>

      </div>
    </footer>
  );
}
