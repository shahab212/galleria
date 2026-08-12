'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Sun, Moon, Search, Heart, User, ShoppingBag, Menu, X } from 'lucide-react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
  activeSection: string;
  totalCartCount: number;
  wishlist: string[];
  setIsCartOpen: (val: boolean) => void;
  setIsSearchOpen: (val: boolean) => void;
  triggerToast: (msg: string) => void;
}

export default function Navbar({
  isDarkMode,
  toggleTheme,
  activeSection,
  totalCartCount,
  wishlist,
  setIsCartOpen,
  setIsSearchOpen,
  triggerToast
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl transition-all duration-500 ease-out ${
      isScrolled ? 'top-2 scale-[0.98]' : 'top-4 scale-100'
    }`}>
      <div className={`backdrop-blur-2xl backdrop-saturate-150 border rounded-full px-5 sm:px-8 flex items-center justify-between transition-all duration-500 ease-out animate-fade-down opacity-0 [animation-delay:100ms] ${
        isScrolled 
          ? 'py-2 sm:py-2.5 shadow-xl' 
          : 'py-2.5 sm:py-3'
      } ${
        isDarkMode
          ? (isScrolled ? 'bg-[#0C1623]/85 border-[#C5A059]/25 shadow-[0_16px_50px_rgba(0,0,0,0.6)]' : 'bg-[#0C1623]/70 border-[#C5A059]/15 shadow-[0_12px_40px_rgba(0,0,0,0.5)]')
          : (isScrolled ? 'bg-[#FAF7F2]/90 border-[#C5A059]/35 shadow-[0_16px_50px_rgba(197,160,89,0.12)]' : 'bg-[#FAF7F2]/75 border-[#C5A059]/20 shadow-[0_12px_40px_rgba(197,160,89,0.06)]')
      }`}>

        {/* Left: Logo */}
        <div className="flex items-center">
          <a href="#" className="group inline-flex items-center transition-transform hover:scale-102 active:scale-98">
            <Image
              src="/images/logo1.png"
              alt="Galleria Arts & Co."
              width={386}
              height={270}
              className={`h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-102 ${
                isDarkMode ? 'brightness-0 invert' : ''
              }`}
              priority
            />
          </a>
        </div>

        {/* Center: Nav Links with Dynamic Active Scroll Spy Highlighting */}
        <nav className={`hidden lg:flex items-center space-x-7 text-xs font-semibold tracking-[0.12em] uppercase transition-colors duration-300 ${
          isDarkMode ? 'text-slate-200' : 'text-[#0C1623]'
        }`}>
          {[
            { id: 'home', label: 'Home' },
            { id: 'collections', label: 'Collections' },
            { id: 'visualizer', label: 'Visualizer' },
            { id: 'shop', label: 'Shop' },
            { id: 'about', label: 'About' },
            { id: 'contact', label: 'Contact' }
          ].map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative pb-1 transition-all duration-300 hover:scale-102 nav-link-underline ${
                activeSection === link.id ? 'text-[#C5A059]' : 'hover:text-[#C5A059]'
              }`}
            >
              <span>{link.label}</span>
              <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent shadow-[0_0_8px_#C5A059] transition-all duration-500 ease-out origin-center ${
                activeSection === link.id ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
              }`} />
            </a>
          ))}
        </nav>

        {/* Right: Black/Navy Pill Action Capsule */}
        <div className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-2 rounded-full shadow-lg transition-all duration-300 ${
          isDarkMode
            ? 'bg-[#0B131F] text-white border border-[#1E2C40]'
            : 'bg-white text-[#0C1623] border border-[#E6DFC4]'
        }`}>

          {/* Hamburger toggle button (mobile/tablet only) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-1 hover:text-[#C5A059] transition-all duration-300 hover:scale-110 active:scale-90 relative"
            aria-label="Open Menu"
          >
            <Menu className="w-4 h-4 stroke-[1.75]" />
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1 hover:text-[#C5A059] transition-all duration-300 hover:scale-110 active:scale-90 relative"
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 stroke-[1.75]" />
            ) : (
              <Moon className="w-4 h-4 stroke-[1.75]" />
            )}
          </button>

          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-1 hover:text-[#C5A059] transition-all duration-300 hover:scale-110 active:scale-90 relative"
            aria-label="Search"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
          </button>

          <button
            onClick={() => triggerToast(`Wishlist contains ${wishlist.length} item(s)`)}
            className="p-1 hover:text-[#C5A059] transition-all duration-300 hover:scale-110 active:scale-90 relative"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 stroke-[1.75] transition-colors duration-300 ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C5A059] text-[#0B131F] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-scale-up">
                {wishlist.length}
              </span>
            )}
          </button>

          <a href="#account" className="p-1 hover:text-[#C5A059] transition-all duration-300 hover:scale-110 active:scale-90" aria-label="Account">
            <User className="w-4 h-4 stroke-[1.75]" />
          </a>

          <button
            onClick={() => setIsCartOpen(true)}
            className="p-1 hover:text-[#C5A059] transition-all duration-300 hover:scale-110 active:scale-90 relative flex items-center"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C5A059] text-[#0B131F] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-scale-up">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Slide-out Mobile Navigation Menu Drawer */}
      <div className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
        isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}>
        {/* Overlay backdrop */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
            isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Drawer Panel */}
        <div className={`relative w-full max-w-sm h-screen shadow-2xl flex flex-col z-10 border-l transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isDarkMode ? 'bg-[#070D14] border-white/10 text-white' : 'bg-[#FAF7F2] border-[#E6DFC4] text-[#0C1623]'
        } ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Drawer Header */}
          <div className={`p-6 border-b flex items-center justify-between transition-colors duration-300 ${
            isDarkMode ? 'border-white/10 bg-[#0C1623]/80 text-white' : 'border-[#E6DFC4] bg-white text-[#0C1623]'
          }`}>
            <div className="flex items-center gap-2">
              <span className="text-[#C5A059] font-serif font-bold text-sm">G</span>
              <span className="font-serif text-sm tracking-wider uppercase">Menu</span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`p-1 transition-all duration-300 hover:rotate-90 hover:text-[#C5A059] ${
                isDarkMode ? 'text-slate-400' : 'text-[#4F5B6A]'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Nav Links */}
          <nav className="flex-1 px-6 py-8 flex flex-col gap-6 text-sm font-semibold tracking-[0.15em] uppercase">
            {[
              { id: 'home', label: 'Home' },
              { id: 'collections', label: 'Collections' },
              { id: 'visualizer', label: 'Visualizer' },
              { id: 'shop', label: 'Shop' },
              { id: 'about', label: 'About' },
              { id: 'contact', label: 'Contact' }
            ].map((link, idx) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`pb-1 transition-all duration-300 flex items-center justify-between border-b ${
                  isDarkMode ? 'border-white/5' : 'border-slate-200'
                } ${activeSection === link.id ? 'text-[#C5A059]' : 'hover:text-[#C5A059]'} hover:translate-x-1`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${idx * 50}ms` : '0ms'
                }}
              >
                <span>{link.label}</span>
                <span className="text-[10px] opacity-50">&gt;</span>
              </a>
            ))}
          </nav>

          {/* Regional Address & Live Concierge */}
          <div className={`p-6 border-t space-y-4 text-xs ${isDarkMode ? 'border-white/10 bg-[#0C1623]/30' : 'border-[#E6DFC4] bg-white'}`}>
            <div className="space-y-1 font-light">
              <span className="text-[#C5A059] font-bold text-[10px] tracking-wider uppercase block">Regional Showrooms</span>
              <p className="text-[10px] opacity-80">Lahore &bull; Islamabad &bull; Karachi</p>
            </div>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white text-[11px] font-bold py-3 px-4 rounded-xl transition shadow-md uppercase tracking-wider flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-98"
            >
              <span>Live Art Concierge</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
