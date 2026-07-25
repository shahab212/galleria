'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ContactProps {
  isDarkMode: boolean;
  triggerToast: (msg: string) => void;
}

export default function Contact({ isDarkMode, triggerToast }: ContactProps) {
  return (
    <section id="contact" className={`scroll-mt-28 pt-20 pb-10 lg:pt-28 lg:pb-14 overflow-hidden transition-colors duration-500 border-b ${
      isDarkMode ? 'bg-dark-spot-top border-white/10' : 'bg-ambient-spot-top border-[#E6DFC4]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          
          {/* Left Column: Get In Touch Headline, Contact Info & Live Chat Pill Button */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Top Monogram Icon Badge */}
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 ${
              isDarkMode ? 'bg-[#0C1623] border border-white/10 text-white' : 'bg-white border border-[#E6DFC4] text-[#0C1623]'
            }`}>
              <Sparkles className="w-5 h-5 text-[#C5A059]" />
            </div>

            {/* Title & Description */}
            <div className="space-y-4">
              <h2 className={`font-sans text-5xl sm:text-6xl font-normal tracking-tight leading-[1.05] transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-[#0C1623]'
              }`}>
                Get in ── <br />
                <span className="font-semibold">touch with us</span>
              </h2>
              <p className={`text-xs sm:text-sm leading-relaxed font-light max-w-md transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-[#4F5B6A]'
              }`}>
                We&apos;re here to help! Whether you have a question about our artworks, need assistance with custom framing dimensions, or want personalized curation, our team is ready to assist you.
              </p>
            </div>

            {/* Contact Info (Email & Phone) */}
            <div className={`space-y-4 pt-2 border-t transition-colors duration-300 ${
              isDarkMode ? 'border-white/10' : 'border-[#E6DFC4]'
            }`}>
              <div>
                <span className={`text-xs font-medium block mb-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'
                }`}>Email:</span>
                <a href="mailto:hello@galleriaarts.com" className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white hover:text-[#C5A059]' : 'text-[#0C1623] hover:text-[#C5A059]'
                }`}>
                  hello@galleriaarts.com
                </a>
              </div>

              <div>
                <span className={`text-xs font-medium block mb-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'
                }`}>Phone / WhatsApp:</span>
                <a href="https://wa.me/923001234567" target="_blank" rel="noopener noreferrer" className={`text-lg sm:text-xl font-bold transition-colors duration-300 ${
                  isDarkMode ? 'text-white hover:text-[#C5A059]' : 'text-[#0C1623] hover:text-[#C5A059]'
                }`}>
                  +92 300 1234567
                </a>
                <p className={`text-[11px] font-light mt-0.5 transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'
                }`}>Available Monday to Saturday, 9 AM - 9 PM PKT</p>
              </div>
            </div>

            {/* Live Chat Black Pill Button */}
            <div className="pt-2">
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-full px-7 py-3.5 font-semibold text-xs inline-flex items-center gap-3 shadow-lg hover:scale-102 transition-all duration-300 group ${
                  isDarkMode ? 'bg-[#C5A059] hover:bg-white text-[#0C1623] hover:text-[#0C1623]' : 'bg-[#0C1623] hover:bg-[#1E293B] text-white'
                }`}
              >
                <span>Live Chat</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition ${
                  isDarkMode ? 'bg-[#0C1623]/25 group-hover:bg-[#0C1623] group-hover:text-white' : 'bg-white/20 group-hover:bg-white group-hover:text-[#0C1623]'
                }`}>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>

          </div>

          {/* Right Column: Clean White/Dark Glass Card Minimalist Form */}
          <div className={`lg:col-span-7 rounded-[32px] p-8 sm:p-12 shadow-xl border transition-all duration-300 ${
            isDarkMode ? 'bg-[#0C1623]/60 backdrop-blur-xl border-white/10' : 'bg-white border-[#E6DFC4]'
          }`}>
            <form onSubmit={(e) => { e.preventDefault(); triggerToast('Thank you! Your message has been sent to our team.'); }} className="space-y-6">
              
              {/* First Name & Last Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className={`text-xs font-semibold block transition-colors duration-300 ${isDarkMode ? 'text-slate-200' : 'text-[#1C2530]'}`}>First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your first name..."
                    className={`w-full rounded-2xl px-5 py-3.5 text-xs transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-[#070D14]/80 border border-white/10 text-white placeholder-slate-500 focus:bg-[#070D14] focus:border-[#C5A059] focus:outline-none'
                        : 'bg-[#FAF9F6] border border-[#E2DAD0] text-[#0C1623] placeholder-gray-400 focus:bg-white focus:border-[#0C1623] focus:outline-none'
                    }`}
                  />
                </div>
                <div className="space-y-2">
                  <label className={`text-xs font-semibold block transition-colors duration-300 ${isDarkMode ? 'text-slate-200' : 'text-[#1C2530]'}`}>Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your last name..."
                    className={`w-full rounded-2xl px-5 py-3.5 text-xs transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-[#070D14]/80 border border-white/10 text-white placeholder-slate-500 focus:bg-[#070D14] focus:border-[#C5A059] focus:outline-none'
                        : 'bg-[#FAF9F6] border border-[#E2DAD0] text-[#0C1623] placeholder-gray-400 focus:bg-white focus:border-[#0C1623] focus:outline-none'
                    }`}
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className={`text-xs font-semibold block transition-colors duration-300 ${isDarkMode ? 'text-slate-200' : 'text-[#1C2530]'}`}>Email</label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  className={`w-full rounded-2xl px-5 py-3.5 text-xs transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-[#070D14]/80 border border-white/10 text-white placeholder-slate-500 focus:bg-[#070D14] focus:border-[#C5A059] focus:outline-none'
                      : 'bg-[#FAF9F6] border border-[#E2DAD0] text-[#0C1623] placeholder-gray-400 focus:bg-white focus:border-[#0C1623] focus:outline-none'
                  }`}
                />
              </div>

              {/* How can we help you? */}
              <div className="space-y-2">
                <label className={`text-xs font-semibold block transition-colors duration-300 ${isDarkMode ? 'text-slate-200' : 'text-[#1C2530]'}`}>How can we help you?</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter your message..."
                  className={`w-full rounded-2xl p-5 text-xs transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-[#070D14]/80 border border-white/10 text-white placeholder-slate-500 focus:bg-[#070D14] focus:border-[#C5A059] focus:outline-none'
                      : 'bg-[#FAF9F6] border border-[#E2DAD0] text-[#0C1623] placeholder-gray-400 focus:bg-white focus:border-[#0C1623] focus:outline-none'
                  }`}
                ></textarea>
              </div>

              {/* Bottom Right Floating Send Message Pill Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className={`rounded-full px-8 py-4 font-semibold text-xs inline-flex items-center gap-3 shadow-lg hover:scale-102 transition-all duration-300 group ${
                    isDarkMode ? 'bg-[#C5A059] hover:bg-white text-[#0C1623] hover:text-[#0C1623]' : 'bg-[#0C1623] hover:bg-[#1E293B] text-white'
                  }`}
                >
                  <span>Send Message</span>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition ${
                    isDarkMode ? 'bg-[#0C1623]/25 group-hover:bg-[#0C1623] group-hover:text-white' : 'bg-white/20 group-hover:bg-white group-hover:text-[#0C1623]'
                  }`}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
