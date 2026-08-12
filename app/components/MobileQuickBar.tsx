'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Home, Search, ShoppingBag, MessageSquare } from 'lucide-react';

interface MobileQuickBarProps {
  isDarkMode: boolean;
  cartCount: number;
  onCartClick: () => void;
  onSearchClick: () => void;
}

export default function MobileQuickBar({
  isDarkMode,
  cartCount,
  onCartClick,
  onSearchClick,
}: MobileQuickBarProps) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // If we scroll down by a threshold, hide. If up, show.
      if (currentScrollY < 80) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current + 12) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current - 12) {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[45] w-[90%] max-w-sm md:hidden transition-all duration-500 ease-in-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`flex items-center justify-around py-3.5 px-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] border backdrop-blur-xl transition-all duration-300 ${
          isDarkMode
            ? 'bg-[#0C1623]/80 border-white/10 text-slate-300'
            : 'bg-white/90 border-[#E6DFC4] text-[#0C1623]'
        }`}
      >
        {/* Quick Link: Home */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`flex flex-col items-center gap-1 active:scale-90 transition-all ${
            isDarkMode ? 'active:text-white' : 'active:text-[#C5A059]'
          }`}
          aria-label="Scroll to top"
        >
          <Home className="w-5 h-5 text-[#C5A059]" />
          <span className="text-[9px] uppercase font-bold tracking-wider">Home</span>
        </button>

        {/* Quick Link: Search */}
        <button
          onClick={onSearchClick}
          className="flex flex-col items-center gap-1 active:scale-90 transition-all"
          aria-label="Open search"
        >
          <Search className="w-5 h-5" />
          <span className="text-[9px] uppercase font-bold tracking-wider">Search</span>
        </button>

        {/* Quick Link: Cart Bag */}
        <button
          onClick={onCartClick}
          className="flex flex-col items-center gap-1 relative active:scale-90 transition-all"
          aria-label="Open cart"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#C5A059] text-[#0C1623] text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white animate-scale-up">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[9px] uppercase font-bold tracking-wider">Cart</span>
        </button>

        {/* Quick Link: Live Chat / WA */}
        <a
          href="https://wa.me/923001234567"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 active:scale-90 transition-all"
          aria-label="Chat on WhatsApp"
        >
          <MessageSquare className="w-5 h-5 text-[#25D366]" />
          <span className="text-[9px] uppercase font-bold tracking-wider">Concierge</span>
        </a>
      </div>
    </div>
  );
}
