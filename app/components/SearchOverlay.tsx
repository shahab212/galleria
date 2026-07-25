'use client';

import React from 'react';
import Image from 'next/image';
import { X, Search } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';

interface SearchOverlayProps {
  isDarkMode: boolean;
  isSearchOpen: boolean;
  setIsSearchOpen: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  addToCart: (product: Product) => void;
  products: Product[];
  globalDiscount: number;
}

const formatPKR = (amount: number) => {
  return `PKR ${amount.toLocaleString('en-PK')}`;
};

export default function SearchOverlay({
  isDarkMode,
  isSearchOpen,
  setIsSearchOpen,
  searchQuery,
  setSearchQuery,
  addToCart,
  products,
  globalDiscount
}: SearchOverlayProps) {
  if (!isSearchOpen) return null;

  const filteredSearchResults = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-24 px-4">
      <div className={`w-full max-w-2xl p-6 shadow-2xl border relative transition-colors duration-500 ${
        isDarkMode ? 'bg-[#0C1623] border-white/10 text-white' : 'bg-[#FAF7F2] border-[#E6DFC4] text-slate-800'
      }`}>
        <button
          onClick={() => setIsSearchOpen(false)}
          className={`absolute top-4 right-4 transition-colors duration-300 ${
            isDarkMode ? 'text-slate-400 hover:text-white' : 'text-[#4F5B6A] hover:text-black'
          }`}
        >
          <X className="w-6 h-6" />
        </button>

        <h3 className={`font-serif text-2xl mb-4 transition-colors duration-300 ${
          isDarkMode ? 'text-white' : 'text-[#0C1623]'
        }`}>Search Artworks</h3>

        <div className="relative">
          <input
            type="text"
            placeholder="Search by title, category, or artwork type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className={`w-full text-sm px-4 py-3.5 pl-11 border transition-colors duration-300 ${
              isDarkMode
                ? 'bg-[#070D14] text-white border-white/10 focus:outline-none focus:border-[#C5A059]'
                : 'bg-white text-[#0C1623] border border-[#D9CFC4] focus:outline-none focus:border-[#C5A059]'
            }`}
          />
          <Search className={`w-5 h-5 absolute left-3.5 top-3.5 transition-colors duration-300 ${
            isDarkMode ? 'text-slate-400' : 'text-[#7A889B]'
          }`} />
        </div>

        {searchQuery && (
          <div className="mt-4 max-h-60 overflow-y-auto space-y-2">
            {filteredSearchResults.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  setIsSearchOpen(false);
                  addToCart(p);
                }}
                className={`flex items-center gap-4 p-2 cursor-pointer border transition-colors duration-300 ${
                  isDarkMode
                    ? 'bg-[#0C1623]/60 hover:bg-[#C5A059]/10 border-white/10'
                    : 'bg-white hover:bg-[#F3ECE2] border-[#E8DFD1]'
                }`}
              >
                <div className={`relative w-12 h-12 transition-colors duration-300 ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                </div>
                <div>
                  <div className={`font-serif text-sm font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0C1623]'}`}>{p.name}</div>
                  {(() => {
                    const specific = p.discountPercent || 0;
                    const activeDiscount = specific > 0 ? specific : globalDiscount;
                    const hasDiscount = activeDiscount > 0;
                    const salePrice = hasDiscount ? Math.round(p.pricePKR * (1 - activeDiscount / 100)) : p.pricePKR;

                    return (
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className={`text-xs font-bold transition-colors duration-300 ${isDarkMode ? 'text-[#C5A059]' : 'text-red-500'}`}>
                          {formatPKR(salePrice)}
                        </span>
                        {hasDiscount && (
                          <span className="text-[10px] line-through text-slate-500 font-light">
                            {formatPKR(p.pricePKR)}
                          </span>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
