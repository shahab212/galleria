'use client';

import React from 'react';
import Image from 'next/image';
import { Sun, Moon, Search, Heart, User, ShoppingBag } from 'lucide-react';

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
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl transition-all duration-300">
      <div className={`backdrop-blur-2xl backdrop-saturate-150 border rounded-full px-5 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between transition-all duration-300 ${
        isDarkMode
          ? 'bg-[#0C1623]/70 border-[#C5A059]/15 shadow-[0_12px_40px_rgba(0,0,0,0.5)]'
          : 'bg-[#FAF7F2]/75 border-[#C5A059]/20 shadow-[0_12px_40px_rgba(197,160,89,0.06)]'
      }`}>

        {/* Left: Logo */}
        <div className="flex items-center">
          <a href="#" className="group inline-flex items-center">
            <Image
              src="/images/logo1.png"
              alt="Galleria Arts & Co."
              width={386}
              height={270}
              className={`h-10 sm:h-12 md:h-14 w-auto object-contain transition-transform group-hover:scale-102 ${
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
          <a
            href="#home"
            className={`relative pb-1 transition-all duration-300 hover:scale-102 ${
              activeSection === 'home' ? 'text-[#C5A059]' : 'hover:text-[#C5A059]'
            }`}
          >
            <span>Home</span>
            {activeSection === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent shadow-[0_0_8px_#C5A059] animate-pulse" />
            )}
          </a>
          <a
            href="#collections"
            className={`relative pb-1 transition-all duration-300 hover:scale-102 ${
              activeSection === 'collections' ? 'text-[#C5A059]' : 'hover:text-[#C5A059]'
            }`}
          >
            <span>Collections</span>
            {activeSection === 'collections' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent shadow-[0_0_8px_#C5A059] animate-pulse" />
            )}
          </a>
          <a
            href="#visualizer"
            className={`relative pb-1 transition-all duration-300 hover:scale-102 ${
              activeSection === 'visualizer' ? 'text-[#C5A059]' : 'hover:text-[#C5A059]'
            }`}
          >
            <span>Visualizer</span>
            {activeSection === 'visualizer' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent shadow-[0_0_8px_#C5A059] animate-pulse" />
            )}
          </a>
          <a
            href="#shop"
            className={`relative pb-1 transition-all duration-300 hover:scale-102 ${
              activeSection === 'shop' ? 'text-[#C5A059]' : 'hover:text-[#C5A059]'
            }`}
          >
            <span>Shop</span>
            {activeSection === 'shop' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent shadow-[0_0_8px_#C5A059] animate-pulse" />
            )}
          </a>
          <a
            href="#about"
            className={`relative pb-1 transition-all duration-300 hover:scale-102 ${
              activeSection === 'about' ? 'text-[#C5A059]' : 'hover:text-[#C5A059]'
            }`}
          >
            <span>About</span>
            {activeSection === 'about' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent shadow-[0_0_8px_#C5A059] animate-pulse" />
            )}
          </a>
          <a
            href="#contact"
            className={`relative pb-1 transition-all duration-300 hover:scale-102 ${
              activeSection === 'contact' ? 'text-[#C5A059]' : 'hover:text-[#C5A059]'
            }`}
          >
            <span>Contact</span>
            {activeSection === 'contact' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent shadow-[0_0_8px_#C5A059] animate-pulse" />
            )}
          </a>
        </nav>

        {/* Right: Black/Navy Pill Action Capsule */}
        <div className={`flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-2 rounded-full shadow-lg transition-all duration-300 ${
          isDarkMode
            ? 'bg-[#0B131F] text-white border border-[#1E2C40]'
            : 'bg-white text-[#0C1623] border border-[#E6DFC4]'
        }`}>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1 hover:text-[#C5A059] transition relative"
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
            className="p-1 hover:text-[#C5A059] transition relative"
            aria-label="Search"
          >
            <Search className="w-4 h-4 stroke-[1.75]" />
          </button>

          <button
            onClick={() => triggerToast(`Wishlist contains ${wishlist.length} item(s)`)}
            className="p-1 hover:text-[#C5A059] transition relative"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 stroke-[1.75] ${wishlist.length > 0 ? 'fill-red-500 text-red-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C5A059] text-[#0B131F] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
          </button>

          <a href="#account" className="p-1 hover:text-[#C5A059] transition" aria-label="Account">
            <User className="w-4 h-4 stroke-[1.75]" />
          </a>

          <button
            onClick={() => setIsCartOpen(true)}
            className="p-1 hover:text-[#C5A059] transition relative flex items-center"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C5A059] text-[#0B131F] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
