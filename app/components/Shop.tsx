'use client';

import React from 'react';
import Image from 'next/image';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import ThreeDTiltCard from './ThreeDTiltCard';
import InteractiveImage from './InteractiveImage';
import { Product } from '../types';
import { CATEGORIES, PRODUCTS } from '../data';
import ScrollReveal from './ScrollReveal';
import CharReveal from './CharReveal';
import LightBeamButton from './LightBeamButton';

interface ShopProps {
  isDarkMode: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  visibleCount: number;
  setVisibleCount: React.Dispatch<React.SetStateAction<number>>;
  isLoadingMore: boolean;
  wishlist: string[];
  toggleWishlist: (productId: string, name: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  addToCart: (product: Product) => void;
  products: Product[];
  globalDiscount: number;
}

const formatPKR = (amount: number) => {
  return `PKR ${amount.toLocaleString('en-PK')}`;
};

export default function Shop({
  isDarkMode,
  activeTab,
  setActiveTab,
  visibleCount,
  setVisibleCount,
  isLoadingMore,
  wishlist,
  toggleWishlist,
  setSelectedProduct,
  addToCart,
  products,
  globalDiscount
}: ShopProps) {
  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter((p) => p.category === activeTab);

  return (
    <section id="shop" className={`scroll-mt-28 py-16 sm:py-24 transition-colors duration-500 border-b ${
      isDarkMode ? 'bg-dark-spot-top border-white/10' : 'bg-ambient-spot-top border-[#E6DFC4]'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <ScrollReveal animation="fade-up" className="text-center space-y-3 mb-10">
          <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl font-normal transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-[#0C1623]'
          }`}>
            <CharReveal text="Featured " />
            <CharReveal
              text="Artworks"
              className={`font-serif italic font-light transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-[#596A7D]'
              }`}
              delay={160}
            />
          </h2>
          <p className={`text-xs tracking-[0.25em] uppercase font-medium transition-colors duration-300 ${
            isDarkMode ? 'text-[#C5A059]' : 'text-[#716250]'
          }`}>
            EXCEPTIONAL ARTWORK & CRAFTSMANSHIP IN EVERY PIECE
          </p>
          <div className="w-12 h-0.5 bg-[#C5A059] mx-auto mt-2 overflow-hidden relative">
            <div className="absolute inset-0 bg-[#C5A059] animate-line-reveal"></div>
          </div>
        </ScrollReveal>

        {/* Centered Category Filter Pill Bar */}
        <ScrollReveal animation="scale-up" delay={100} className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 mb-12">
          {CATEGORIES.map((c) => {
            const isActive = activeTab === c.id;
            return (
              <LightBeamButton
                key={c.id}
                onClick={() => {
                  setActiveTab(c.id);
                  setVisibleCount(6);
                }}
                gradientColors={
                  isActive
                    ? ['#C5A059', '#EBD8BE', '#C5A059']
                    : ['transparent', 'transparent', 'transparent']
                }
                className={`px-6 py-2.5 text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 ${
                  isActive 
                    ? 'scale-105 shadow-[0_0_20px_-5px_rgba(197,160,89,0.4)]' 
                    : `bg-transparent text-slate-400 hover:text-white hover:scale-105 border ${
                        isDarkMode ? 'border-white/10 hover:border-white/20' : 'border-[#D0D5DD] hover:border-[#0C1623]/30 text-gray-500 hover:text-black'
                      }`
                }`}
              >
                {c.title}
              </LightBeamButton>
            );
          })}
        </ScrollReveal>

        {/* 3-Column Light Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.slice(0, visibleCount).map((prod, idx) => {
            const isWishlisted = wishlist.includes(prod.id);
            const specific = prod.discountPercent || 0;
            const activeDiscount = specific > 0 ? specific : globalDiscount;
            const hasDiscount = activeDiscount > 0;
            const salePrice = hasDiscount ? Math.round(prod.pricePKR * (1 - activeDiscount / 100)) : prod.pricePKR;

            return (
              <ScrollReveal
                key={prod.id}
                animation="fade-up"
                delay={(idx % 3) * 120}
                duration={700}
              >
                <ThreeDTiltCard
                  onClick={() => setSelectedProduct(prod)}
                  className={`group backdrop-blur-xl border rounded-[32px] p-5 flex flex-col justify-between transition-all duration-500 relative h-full ${
                    isDarkMode
                      ? 'bg-[#0C1623]/60 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:border-[#C5A059]/60 hover:shadow-[0_20px_40px_rgba(197,160,89,0.15)]'
                      : 'bg-white/45 border-white/70 shadow-[0_8px_32px_rgba(11,19,31,0.06)] hover:border-[#C5A059]/60 hover:shadow-[0_20px_40px_rgba(197,160,89,0.12)]'
                  }`}
                >
                {/* Portrait Art Canvas Image with Museum Matting/Passepartout */}
                <div className={`relative aspect-[4/5] w-full overflow-hidden rounded-[20px] bg-white border p-2.5 transition-all duration-300 ${
                  isDarkMode
                    ? 'border-white/10 shadow-[inset_0_4px_10px_rgba(0,0,0,0.1)]'
                    : 'border-[#E6DFC4]/50 shadow-[inset_0_4px_10px_rgba(11,19,31,0.03)]'
                }`}>
                  <div className="relative w-full h-full overflow-hidden rounded-xl">
                    <InteractiveImage
                      src={prod.image}
                      alt={prod.name}
                      fill
                    />

                    {/* Official Galleria Monogram Watermark Seal */}
                    <div className="absolute bottom-3 right-3 z-10 pointer-events-none select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] flex items-center gap-1.5 bg-[#0C1623]/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                      <div className="relative w-4 h-4">
                        <Image
                          src="/images/monogram.png"
                          alt="Galleria Monogram"
                          fill
                          className="object-contain brightness-0 invert"
                        />
                      </div>
                      <span className="text-[8px] font-extrabold tracking-[0.2em] uppercase text-white/90">Galleria</span>
                    </div>
                  </div>

                  {/* Top Bar overlays floating over image */}
                  <div className="absolute top-5 left-5 z-10 flex items-center gap-1 bg-[#0C1623]/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-white border border-white/10 shadow-md">
                    <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
                    <span>{prod.rating || 4.8}</span>
                  </div>

                  {hasDiscount && (
                    <div className="absolute top-5 left-20 z-10 bg-red-600 px-2.5 py-1 rounded-full text-[9px] font-extrabold text-white border border-red-500/10 shadow-md uppercase tracking-wider">
                      -{activeDiscount}% OFF
                    </div>
                  )}

                  <button
                    suppressHydrationWarning
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(prod.id, prod.name);
                    }}
                    className="absolute top-5 right-5 z-10 w-8.5 h-8.5 rounded-full bg-[#0C1623]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-red-500 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 shadow-md"
                    aria-label="Add to Wishlist"
                  >
                    <Heart className={`w-3.5 h-3.5 transition-colors ${isWishlisted ? 'fill-white text-white' : 'text-white/80'}`} />
                  </button>
                </div>

                {/* Bottom details with category label & sleek shopping button */}
                <div className="flex items-end justify-between pt-4 px-1">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold tracking-[0.18em] text-[#C5A059] uppercase block">
                      {prod.type}
                    </span>
                    <h3 className={`font-serif text-base sm:text-lg font-medium tracking-tight leading-snug group-hover:text-[#C5A059] transition-colors duration-300 ${
                      isDarkMode ? 'text-white' : 'text-[#0C1623]'
                    }`}>
                      {prod.name}
                    </h3>
                    {hasDiscount ? (
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className={`text-sm font-bold ${isDarkMode ? 'text-[#C5A059]' : 'text-red-500'}`}>
                          {formatPKR(salePrice)}
                        </span>
                        <span className="text-[10px] line-through text-slate-500 font-light">
                          {formatPKR(prod.pricePKR)}
                        </span>
                      </div>
                    ) : (
                      <p className={`text-sm mt-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-[#EBD8BE] font-bold' : 'text-[#4A5568] font-semibold'
                      }`}>
                        {formatPKR(prod.pricePKR)}
                      </p>
                    )}
                  </div>

                  <LightBeamButton
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(prod);
                    }}
                    className="w-10 h-10 border border-white/10"
                    aria-label="Add to Cart"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[1.75]" />
                  </LightBeamButton>
                </div>
              </ThreeDTiltCard>
            </ScrollReveal>
          );
        })}
      </div>

        {/* Infinite Scroll Indicator / Dynamic Loader */}
        {visibleCount < filteredProducts.length && (
          <div className="pt-12 text-center">
            {isLoadingMore ? (
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border shadow-sm text-xs font-semibold transition-colors duration-300 ${
                isDarkMode ? 'bg-[#0C1623] border-white/10 text-white' : 'bg-white border-[#E6DFC4] text-[#0C1623]'
              }`}>
                <div className="w-4 h-4 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin"></div>
                <span>Loading remaining artworks...</span>
              </div>
            ) : (
              <button
                suppressHydrationWarning
                onClick={() => setVisibleCount((prev) => Math.min(prev + 3, filteredProducts.length))}
                className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md ${
                  isDarkMode
                    ? 'bg-[#C5A059] text-[#0C1623] hover:bg-white hover:text-[#0C1623]'
                    : 'bg-[#0B131F] text-white hover:bg-[#C5A059] hover:text-[#0B131F]'
                }`}
              >
                <span>LOAD MORE ARTWORKS</span>
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
