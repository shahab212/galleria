'use client';

import React from 'react';
import Image from 'next/image';
import { X, Star, Heart, Check, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  isDarkMode: boolean;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  wishlist: string[];
  toggleWishlist: (productId: string, name: string) => void;
  setIsCartOpen: (val: boolean) => void;
  addToCart: (product: Product) => void;
  selectedThumbIndex: number;
  setSelectedThumbIndex: (idx: number) => void;
  purchaseOption: 'standard' | 'framed';
  setPurchaseOption: (opt: 'standard' | 'framed') => void;
  hasAddedToCart: boolean;
  setHasAddedToCart: (val: boolean) => void;
  modalQty: number;
  setModalQty: React.Dispatch<React.SetStateAction<number>>;
  globalDiscount: number;
}

const formatPKR = (amount: number) => {
  return `PKR ${amount.toLocaleString('en-PK')}`;
};

export default function ProductDetailModal({
  isDarkMode,
  selectedProduct,
  setSelectedProduct,
  wishlist,
  toggleWishlist,
  setIsCartOpen,
  addToCart,
  selectedThumbIndex,
  setSelectedThumbIndex,
  purchaseOption,
  setPurchaseOption,
  hasAddedToCart,
  setHasAddedToCart,
  modalQty,
  setModalQty,
  globalDiscount
}: ProductDetailModalProps) {
  if (!selectedProduct) return null;

  const specific = selectedProduct.discountPercent || 0;
  const activeDiscount = specific > 0 ? specific : globalDiscount;
  const hasDiscount = activeDiscount > 0;
  const saleBasePrice = hasDiscount ? Math.round(selectedProduct.pricePKR * (1 - activeDiscount / 100)) : selectedProduct.pricePKR;

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fadeIn overflow-y-auto"
      onClick={() => setSelectedProduct(null)}
    >
      <div
        className={`w-full max-w-5xl rounded-[32px] p-6 sm:p-10 shadow-2xl border relative overflow-hidden my-auto transition-colors duration-500 ${
          isDarkMode ? 'bg-[#0C1623] border-white/10 text-white' : 'bg-[#FAF7F2] border-white/80 text-[#0C1623]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Modal Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className={`absolute top-5 right-5 z-30 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/10 hover:bg-black/20 text-[#0C1623]'
          }`}
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* --------------------------------------------------------- */}
          {/* LEFT COLUMN: Main Feature Image & 4 Thumbnail Swatches */}
          {/* --------------------------------------------------------- */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Main Large Image Container */}
            <div className={`relative aspect-square w-full rounded-2xl overflow-hidden shadow-md group border transition-colors duration-300 ${
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-[#EFEBE4] border-[#E2DAD0]'
            }`}>
              <Image
                src={[
                  selectedProduct.image,
                  '/shop/image11.jpg',
                  '/shop/image 22.jpg',
                  '/shop/image 33.jpg'
                ][selectedThumbIndex] || selectedProduct.image}
                alt={selectedProduct.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />

              {/* Top Floating Badges */}
              <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                  SAVE 20%
                </span>
              </div>

              {/* Wishlist Heart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(selectedProduct.id, selectedProduct.name);
                }}
                className="w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center absolute top-4 right-4 text-[#1C2530] hover:text-red-500 hover:scale-110 transition z-10"
                aria-label="Wishlist"
              >
                <Heart className={`w-5 h-5 ${wishlist.includes(selectedProduct.id) ? 'fill-red-600 text-red-600' : ''}`} />
              </button>
            </div>

            {/* 4 Clickable Thumbnail Swatches below Main Image */}
            <div className="grid grid-cols-4 gap-3">
              {[
                selectedProduct.image,
                '/shop/image11.jpg',
                '/shop/image 22.jpg',
                '/shop/image 33.jpg'
              ].map((thumbUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedThumbIndex(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedThumbIndex === idx 
                      ? (isDarkMode ? 'border-[#C5A059] scale-105 shadow-md ring-2 ring-[#C5A059]/20' : 'border-[#0C1623] scale-105 shadow-md ring-2 ring-[#0C1623]/20')
                      : (isDarkMode ? 'border-transparent opacity-75 hover:opacity-100 hover:border-white/20' : 'border-transparent opacity-75 hover:opacity-100 hover:border-gray-300')
                  }`}
                >
                  <Image src={thumbUrl} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>

          </div>

          {/* --------------------------------------------------------- */}
          {/* RIGHT COLUMN: Breadcrumb, Details, Options & Actions */}
          {/* --------------------------------------------------------- */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Breadcrumbs */}
            <nav className={`text-xs font-medium tracking-wide uppercase flex items-center gap-2 transition-colors duration-300 ${
              isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'
            }`}>
              <span>Home</span>
              <span>•</span>
              <span>Shop</span>
              <span>•</span>
              <span className={`font-semibold transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0C1623]'}`}>{selectedProduct.category}</span>
            </nav>

            {/* Product Title */}
            <h2 className={`font-serif text-3xl sm:text-4xl font-normal tracking-tight leading-tight transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-[#0C1623]'
            }`}>
              {selectedProduct.name}
            </h2>

            {/* Rating & Review Summary */}
            <div className={`flex items-center gap-2 text-xs font-semibold transition-colors duration-300 ${
              isDarkMode ? 'text-slate-200' : 'text-[#1C2530]'
            }`}>
              <div className="flex items-center text-[#FFB800]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FFB800]" />
                ))}
              </div>
              <span className={`font-bold transition-colors duration-300 ${isDarkMode ? 'text-[#C5A059]' : 'text-[#0C1623]'}`}>(4.9)</span>
              <span className={`transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-[#7F8F9F]'}`}>5k+ Reviews</span>
            </div>

            {/* Description Paragraph */}
            <p className={`text-xs sm:text-sm leading-relaxed font-light transition-colors duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-[#4A5568]'
            }`}>
              {selectedProduct.desc || 'Refresh and transform your interior space with premium museum-grade artwork. Handcrafted archival canvas featuring high-definition textures and rich fade-resistant colors.'}
            </p>

            {/* Price Display with Original Price Strike-through & Discount Pill */}
            <div className="flex items-center gap-3 pt-1">
              <span className={`text-3xl font-bold transition-colors duration-300 ${
                isDarkMode ? 'text-[#C5A059]' : 'text-[#0C1623]'
              }`}>
                {formatPKR(
                  (saleBasePrice + (purchaseOption === 'framed' ? 4500 : 0)) * modalQty
                )}
              </span>
              {hasDiscount && (
                <>
                  <span className={`text-base line-through font-normal transition-colors duration-300 ${
                    isDarkMode ? 'text-slate-500' : 'text-gray-400'
                  }`}>
                    {formatPKR(
                      (selectedProduct.pricePKR + (purchaseOption === 'framed' ? 4500 : 0)) * modalQty
                    )}
                  </span>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider transition-colors duration-300 ${
                    isDarkMode ? 'bg-[#C5A059] text-[#0C1623]' : 'bg-black text-white'
                  }`}>
                    Save {activeDiscount}%
                  </span>
                </>
              )}
            </div>

            {/* Radio Purchase Selector Options */}
            <div className="space-y-3 pt-1">
              <div 
                onClick={() => setPurchaseOption('standard')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  purchaseOption === 'standard' 
                    ? (isDarkMode ? 'border-[#C5A059] bg-[#0C1623] shadow-sm' : 'border-[#0C1623] bg-white shadow-sm') 
                    : (isDarkMode ? 'border-white/10 bg-[#070D14]/30 hover:border-white/20' : 'border-[#E2DAD0] bg-white/50 hover:border-gray-300')
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    purchaseOption === 'standard' ? (isDarkMode ? 'border-[#C5A059]' : 'border-[#0C1623]') : (isDarkMode ? 'border-white/20' : 'border-gray-300')
                  }`}>
                    {purchaseOption === 'standard' && <div className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-[#C5A059]' : 'bg-[#0C1623]'}`} />}
                  </div>
                  <span className={`font-serif text-sm sm:text-base font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0C1623]'}`}>
                    Stretched Archival Canvas
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`font-bold text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#C5A059]' : 'text-[#0C1623]'}`}>
                    {formatPKR(saleBasePrice)}
                  </span>
                  {hasDiscount && (
                    <span className="text-[10px] line-through text-slate-500 font-light">
                      {formatPKR(selectedProduct.pricePKR)}
                    </span>
                  )}
                </div>
              </div>

              <div 
                onClick={() => setPurchaseOption('framed')}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  purchaseOption === 'framed' 
                    ? (isDarkMode ? 'border-[#C5A059] bg-[#0C1623] shadow-sm' : 'border-[#0C1623] bg-white shadow-sm') 
                    : (isDarkMode ? 'border-white/10 bg-[#070D14]/30 hover:border-white/20' : 'border-[#E2DAD0] bg-white/50 hover:border-gray-300')
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    purchaseOption === 'framed' ? (isDarkMode ? 'border-[#C5A059]' : 'border-[#0C1623]') : (isDarkMode ? 'border-white/20' : 'border-gray-300')
                  }`}>
                    {purchaseOption === 'framed' && <div className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-[#C5A059]' : 'bg-[#0C1623]'}`} />}
                  </div>
                  <span className={`font-serif text-sm sm:text-base font-medium transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0C1623]'}`}>
                    Custom Premium Framed Canvas
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`font-bold text-sm transition-colors duration-300 ${isDarkMode ? 'text-[#C5A059]' : 'text-[#0C1623]'}`}>
                    {formatPKR(saleBasePrice + 4500)}
                  </span>
                  {hasDiscount && (
                    <span className="text-[10px] line-through text-slate-500 font-light">
                      {formatPKR(selectedProduct.pricePKR + 4500)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart Controls OR Post-Add-to-Cart Action Buttons */}
            {!hasAddedToCart ? (
              <div className="flex items-center gap-4 pt-3">
                {/* Quantity Pill Selector (- 1 +) */}
                <div className={`flex items-center border-2 rounded-full px-4 py-2.5 space-x-4 transition-all duration-300 ${
                  isDarkMode ? 'border-white/10 bg-[#070D14]' : 'border-[#E2DAD0] bg-white'
                }`}>
                  <button 
                    onClick={() => setModalQty((prev) => Math.max(1, prev - 1))}
                    className={`font-bold text-base px-1 transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-black'
                    }`}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span className={`font-bold text-sm min-w-[20px] text-center transition-colors duration-300 ${
                    isDarkMode ? 'text-white' : 'text-[#0C1623]'
                  }`}>
                    {modalQty}
                  </span>
                  <button 
                    onClick={() => setModalQty((prev) => prev + 1)}
                    className={`font-bold text-base px-1 transition-colors duration-300 ${
                      isDarkMode ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-black'
                    }`}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Black Rounded Pill Add to Cart Button */}
                <button
                  onClick={() => {
                    for (let i = 0; i < modalQty; i++) {
                      addToCart(selectedProduct);
                    }
                    setHasAddedToCart(true);
                  }}
                  className={`flex-1 py-3.5 px-8 rounded-full font-semibold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 group ${
                    isDarkMode
                      ? 'bg-[#C5A059] hover:bg-white text-[#0C1623] hover:text-[#0C1623]'
                      : 'bg-[#0C1623] hover:bg-[#1E293B] text-white'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 stroke-[2]" />
                  <span>Add to Cart</span>
                </button>
              </div>
            ) : (
              /* Post-Add-To-Cart Action Buttons (Checkout Cart OR Continue Shopping) */
              <div className="space-y-3 pt-3 animate-fadeIn">
                <div className={`flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border transition-all duration-300 ${
                  isDarkMode ? 'text-[#10B981] border-[#10B981]/30 bg-[#10B981]/5' : 'text-[#10B981] border-[#10B981]/30 bg-[#10B981]/10'
                }`}>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added to cart! What would you like to do next?</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Checkout Cart Button */}
                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      setIsCartOpen(true);
                    }}
                    className={`w-full py-4 rounded-full font-bold text-xs tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2 ${
                      isDarkMode
                        ? 'bg-[#C5A059] hover:bg-white text-[#0C1623] hover:text-[#0C1623]'
                        : 'bg-[#0C1623] hover:bg-[#1E293B] text-white'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>CHECKOUT CART</span>
                  </button>

                  {/* Continue Shopping Button */}
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className={`w-full py-4 rounded-full font-bold text-xs tracking-widest uppercase transition-all flex items-center justify-center gap-2 border-2 ${
                      isDarkMode
                        ? 'bg-transparent hover:bg-white/10 text-white border-white/20'
                        : 'bg-white hover:bg-gray-100 text-[#0C1623] border-[#0C1623]'
                    }`}
                  >
                    <span>CONTINUE SHOPPING</span>
                  </button>
                </div>
              </div>
            )}

            {/* Sub-text Guarantee */}
            <p className={`text-[11px] pt-1 flex items-center gap-1.5 font-light transition-colors duration-300 ${
              isDarkMode ? 'text-slate-400' : 'text-gray-500'
            }`}>
              <span>✨ Free Museum Delivery & 100% Satisfaction Guarantee.</span>
            </p>

          </div>

        </div>
      </div>
    </div>
  );
}
