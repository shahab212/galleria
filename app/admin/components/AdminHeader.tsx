'use client';

import React from 'react';

export default function AdminHeader() {
  return (
    <header className="h-16 border-b border-white/10 px-8 flex items-center justify-between bg-[#0C1623]/30 flex-shrink-0">
      <span className="text-xs text-slate-400 font-light flex items-center gap-2 select-none">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        Advisory Live Database Connected
      </span>
      <div className="flex items-center gap-3 select-none">
        <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
        <span className="text-[10px] font-bold tracking-wider text-slate-300 uppercase">Concierge Mode</span>
      </div>
    </header>
  );
}
