'use client';

import React from 'react';
import { Menu } from 'lucide-react';

interface AdminHeaderProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
}

export default function AdminHeader({ isSidebarOpen, setIsSidebarOpen }: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-white/10 px-6 sm:px-8 flex items-center justify-between bg-[#0C1623]/30 flex-shrink-0">
      <div className="flex items-center gap-3">
        {/* Hamburger toggle button (visible on mobile/tablet only) */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-1 text-slate-400 hover:text-white transition"
          aria-label="Open Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <span className="text-xs text-slate-400 font-light flex items-center gap-2 select-none">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Advisory Live Database Connected
        </span>
      </div>
      
      <div className="flex items-center gap-3 select-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
        <span className="text-[10px] font-bold tracking-wider text-slate-300 uppercase">Concierge Mode</span>
      </div>
    </header>
  );
}
