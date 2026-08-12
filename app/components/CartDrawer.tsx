'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingBag, X, Minus, Plus, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface CartDrawerProps {
  isDarkMode: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (val: boolean) => void;
  setIsCheckoutOpen: (val: boolean) => void;
  setOrderReference: (val: string | null) => void;
  cart: { product: Product; quantity: number }[];
  totalCartCount: number;
  cartSubtotal: number;
  updateQuantity: (productId: string, delta: number) => void;
  triggerToast: (msg: string) => void;
  globalDiscount: number;
}

const formatPKR = (amount: number) => {
  return `PKR ${amount.toLocaleString('en-PK')}`;
};

export default function CartDrawer({
  isDarkMode,
  isCartOpen,
  setIsCartOpen,
  setIsCheckoutOpen,
  setOrderReference,
  cart,
  totalCartCount,
  cartSubtotal,
  updateQuantity,
  triggerToast,
  globalDiscount
}: CartDrawerProps) {
  if (!isCartOpen) return null;

  const getEffectivePrice = (product: Product) => {
    const specific = product.discountPercent || 0;
    const activeDiscount = specific > 0 ? specific : globalDiscount;
    if (activeDiscount <= 0) return product.pricePKR;
    return Math.round(product.pricePKR * (1 - activeDiscount / 100));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className={`relative w-full max-w-md h-full shadow-2xl flex flex-col z-10 border-l transition-colors duration-500 ${
        isDarkMode ? 'bg-[#070D14] border-white/10' : 'bg-[#FAF7F2] border-[#E6DFC4]'
      }`}>
        {/* Drawer Header */}
        <div className={`p-6 border-b flex items-center justify-between transition-colors duration-300 ${
          isDarkMode ? 'border-white/10 bg-[#0C1623]/80 text-white' : 'border-[#E6DFC4] bg-white text-[#0C1623]'
        }`}>
          <div className="flex items-center gap-3">
            <ShoppingBag className={`w-5 h-5 transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0C1623]'}`} />
            <h3 className={`font-serif text-xl font-normal transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-[#0C1623]'}`}>Your Cart</h3>
            <span className={`text-xs font-semibold px-2 py-0.5 transition-colors duration-300 ${
              isDarkMode ? 'bg-[#C5A059] text-[#0C1623]' : 'bg-[#0C1623] text-white'
            }`}>
              {totalCartCount}
            </span>
          </div>
          <button onClick={() => setIsCartOpen(false)} className={`p-1 transition-colors duration-300 ${
            isDarkMode ? 'text-slate-400 hover:text-white' : 'text-[#4F5B6A] hover:text-black'
          }`}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <ShoppingBag className={`w-12 h-12 mx-auto transition-colors duration-300 ${isDarkMode ? 'text-slate-600' : 'text-[#D4CFC4]'}`} />
              <p className={`text-sm transition-colors duration-300 ${isDarkMode ? 'text-slate-400' : 'text-[#6C7B8D]'}`}>Your cart is currently empty.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className={`inline-block font-bold text-xs tracking-widest uppercase px-6 py-3 transition-all duration-300 ${
                  isDarkMode ? 'bg-[#C5A059] text-[#0C1623] hover:bg-white' : 'bg-[#0B131F] text-white hover:bg-[#C5A059]'
                }`}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-dashed divide-slate-400/25">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-5 py-5 first:pt-0 last:pb-0 transition-colors duration-300">
                  
                  {/* Premium borderless matted-style image frame */}
                  <div className={`relative w-20 h-20 flex-shrink-0 overflow-hidden border shadow-xs transition-colors duration-300 ${
                    isDarkMode ? 'bg-[#070D14] border-white/10' : 'bg-[#FAF7F2] border-[#E6DFC4]'
                  }`}>
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Editorial Item Description & Refined Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      {/* Upper category indicator & Delete button */}
                      <div className="flex justify-between items-start">
                        <span className="text-[9px] tracking-[0.2em] font-bold text-[#C5A059] uppercase block mb-0.5">
                          {item.product.category || 'Curated'}
                        </span>
                        <button
                          onClick={() => {
                            updateQuantity(item.product.id, -item.quantity);
                            triggerToast(`Removed "${item.product.name}" from cart`);
                          }}
                          className={`p-1 -mt-1.5 -mr-1.5 transition-colors duration-300 ${
                            isDarkMode ? 'text-slate-500 hover:text-red-400' : 'text-slate-400 hover:text-red-500'
                          }`}
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <h4 className={`font-serif text-base font-semibold leading-tight tracking-tight transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-[#0C1623]'
                      }`}>
                        {item.product.name}
                      </h4>
                      <p className={`text-xs font-light mt-1 transition-colors duration-300 ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {item.product.type}
                      </p>
                    </div>

                    {/* Refined Pill Quantity Controls and Price */}
                    <div className="flex items-center justify-between mt-3.5">
                      <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full border transition-all duration-300 ${
                        isDarkMode ? 'border-white/10 bg-white/[0.02]' : 'border-[#D9CFC4] bg-black/[0.01]'
                      }`}>
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          className="p-0.5 text-slate-400 hover:text-[#C5A059] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className={`w-4 text-center text-xs font-semibold ${
                          isDarkMode ? 'text-white' : 'text-[#0C1623]'
                        }`}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          className="p-0.5 text-slate-400 hover:text-[#C5A059] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className={`text-xs font-bold tracking-wide transition-colors duration-300 ${
                          isDarkMode ? 'text-[#C5A059]' : 'text-[#0C1623]'
                        }`}>
                          {formatPKR(getEffectivePrice(item.product) * item.quantity)}
                        </div>
                        {((item.product.discountPercent || 0) > 0 || globalDiscount > 0) && (
                          <div className="text-[10px] line-through text-slate-500 font-light leading-none mt-0.5">
                            {formatPKR(item.product.pricePKR * item.quantity)}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className={`p-6 border-t transition-all duration-300 ${
            isDarkMode ? 'border-white/10 bg-[#0C1623]/80 text-white' : 'border-[#E6DFC4] bg-white text-[#0C1623]'
          }`}>
            <div className="space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-wider font-semibold opacity-70">Subtotal</span>
                <span className="text-xl font-bold text-[#C5A059]">{formatPKR(cartSubtotal)}</span>
              </div>
              <p className={`text-[11px] font-light leading-snug transition-colors duration-300 ${
                isDarkMode ? 'text-slate-400' : 'text-[#7A889B]'
              }`}>
                Free shipping in Lahore! Standard delivery rate PKR 1,500 elsewhere. Taxes &amp; secure insurance calculated at checkout.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                  setOrderReference(null);
                }}
                className={`w-full py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-[#C5A059] hover:bg-white text-[#0C1623]' 
                    : 'bg-[#0C1623] hover:bg-[#C5A059] text-white hover:text-[#0C1623]'
                }`}
              >
                CHECKOUT NOW
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
