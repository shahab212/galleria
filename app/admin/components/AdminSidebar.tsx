'use client';

import React from 'react';
import Image from 'next/image';
import { BarChart3, ShoppingBag, ClipboardList, LogOut, Sliders, Users, Percent, Camera, KeyRound } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleLogout: () => void;
}

export default function AdminSidebar({ activeTab, setActiveTab, handleLogout }: SidebarProps) {
  const tabs = [
    { id: 'analytics', name: 'Analytics', icon: BarChart3 },
    { id: 'products', name: 'Catalog Products', icon: ShoppingBag },
    { id: 'orders', name: 'Client Orders', icon: ClipboardList },
    { id: 'hero', name: 'Hero Slideshow', icon: Sliders },
    { id: 'team', name: 'Team Curators', icon: Users },
    { id: 'discounts', name: 'Discounts Manager', icon: Percent },
    { id: 'instagram', name: 'Instagram Showcase', icon: Camera },
    { id: 'security', name: 'Security Settings', icon: KeyRound }
  ];

  return (
    <aside className="w-64 bg-[#070D14] border-r border-white/10 flex flex-col justify-between h-screen sticky top-0 flex-shrink-0 text-white select-none">
      
      {/* Brand Header */}
      <div className="p-6 border-b border-white/10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center">
            <span className="text-[#C5A059] font-serif font-bold text-sm">G</span>
          </div>
          <div>
            <h4 className="font-serif font-bold tracking-wider text-sm leading-none text-white">GALLERIA</h4>
            <span className="text-[9px] tracking-widest text-[#C5A059] uppercase font-semibold">ADMIN PANEL</span>
          </div>
        </div>
      </div>

      {/* Navigation Options */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 border ${
                isSelected
                  ? 'bg-[#C5A059] border-[#C5A059] text-[#0C1623] shadow-md font-bold'
                  : 'bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'stroke-[2.25]' : 'stroke-[1.75]'}`} />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </nav>

      {/* User Logout Area */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-red-400 hover:text-white hover:bg-red-500/10 transition-all duration-300"
        >
          <LogOut className="w-4 h-4 stroke-[1.75]" />
          <span>Exit Session</span>
        </button>
      </div>

    </aside>
  );
}
