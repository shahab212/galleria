'use client';

import React from 'react';
import Image from 'next/image';
import { X, CheckCircle2, MessageCircle } from 'lucide-react';
import { Product } from '../types';

interface CheckoutModalProps {
  isDarkMode: boolean;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (val: boolean) => void;
  orderReference: string | null;
  setOrderReference: (val: string | null) => void;
  checkoutForm: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    paymentMethod: string;
  };
  setCheckoutForm: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    paymentMethod: string;
  }>>;
  cart: { product: Product; quantity: number }[];
  setCart: React.Dispatch<React.SetStateAction<{ product: Product; quantity: number }[]>>;
  cartSubtotal: number;
  globalDiscount: number;
}

const formatPKR = (amount: number) => {
  return `PKR ${amount.toLocaleString('en-PK')}`;
};

export default function CheckoutModal({
  isDarkMode,
  isCheckoutOpen,
  setIsCheckoutOpen,
  orderReference,
  setOrderReference,
  checkoutForm,
  setCheckoutForm,
  cart,
  setCart,
  cartSubtotal,
  globalDiscount
}: CheckoutModalProps) {
  if (!isCheckoutOpen) return null;

  const getEffectivePrice = (product: Product) => {
    const specific = product.discountPercent || 0;
    const activeDiscount = specific > 0 ? specific : globalDiscount;
    if (activeDiscount <= 0) return product.pricePKR;
    return Math.round(product.pricePKR * (1 - activeDiscount / 100));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto">
      <div className={`w-full max-w-4xl rounded-[32px] border relative overflow-hidden transition-colors duration-500 shadow-2xl my-8 ${
        isDarkMode ? 'bg-[#0C1623] border-white/10 text-white' : 'bg-[#FAF7F2] border-[#E6DFC4] text-[#0C1623]'
      }`}>
        
        {/* Close Button */}
        <button
          onClick={() => setIsCheckoutOpen(false)}
          className={`absolute top-5 right-5 z-20 p-1 rounded-full transition-colors duration-300 ${
            isDarkMode ? 'text-slate-400 hover:text-white' : 'text-[#4F5B6A] hover:text-black'
          }`}
        >
          <X className="w-6 h-6" />
        </button>

        {orderReference ? (
          // Success Screen
          <div className="p-8 sm:p-14 text-center space-y-6 max-w-2xl mx-auto flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#C5A059]/10 text-[#C5A059] flex items-center justify-center shadow-md animate-pulse">
              <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-[#C5A059] tracking-widest uppercase block">
                TRANSACTION SUCCESSFUL
              </span>
              <h3 className="font-serif text-3xl font-normal leading-tight">
                Thank You for Curating <br />
                <span className="font-serif italic font-light text-[#C5A059]">with Galleria.</span>
              </h3>
            </div>

            <div className={`p-5 rounded-2xl border text-sm max-w-md mx-auto space-y-3 transition-colors duration-300 ${
              isDarkMode ? 'bg-[#070D14]/80 border-white/10' : 'bg-white border-[#E6DFC4] shadow-xs'
            }`}>
              <p className="font-semibold text-[#C5A059] text-base">Order Reference: {orderReference}</p>
              <p className={`text-xs font-light leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                We have sent a confirmation email. One of our lead curators will contact you on WhatsApp shortly to confirm shipping details and solid wood frame selections.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full justify-center pt-2">
              <a
                href={"https://wa.me/923001234567?text=Hello%20Galleria%20Arts!%20I%20just%20placed%20order%20" + orderReference + "%20on%20your%20website%20for%20custom%20artwork.%20Please%20confirm%20my%20order."}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white"
              >
                <MessageCircle className="w-4 h-4" />
                <span>CONFIRM ON WHATSAPP</span>
              </a>
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setOrderReference(null);
                }}
                className={`px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white text-white hover:text-[#0C1623]' 
                    : 'bg-[#0C1623] hover:bg-[#C5A059] text-white hover:text-[#0C1623]'
                }`}
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        ) : (
          // Checkout form grid
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* Left Side: Inputs Form (7 columns) */}
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const ref = `GA-${Math.floor(100000 + Math.random() * 900000)}`;
                try {
                  const res = await fetch('/api/orders', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      reference: ref,
                      client: {
                        name: checkoutForm.name,
                        email: checkoutForm.email,
                        phone: checkoutForm.phone,
                        address: checkoutForm.address,
                        city: checkoutForm.city
                      },
                      payment: {
                        method: checkoutForm.paymentMethod
                      },
                      items: cart,
                      subtotal: cartSubtotal
                    })
                  });
                  if (res.ok) {
                    setOrderReference(ref);
                    setCart([]);
                  }
                } catch (error) {
                  console.error('Error placing order:', error);
                }
              }}
              className="lg:col-span-7 p-8 sm:p-10 space-y-6"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-[#C5A059] tracking-widest uppercase block">
                  SECURE CHECKOUT
                </span>
                <h3 className="font-serif text-2xl font-semibold">Shipping Details</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider uppercase opacity-85 block">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name..."
                    value={checkoutForm.name}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none transition ${
                      isDarkMode
                        ? 'bg-[#070D14] border-white/10 text-white focus:border-[#C5A059]'
                        : 'bg-white border-[#E6DFC4] text-[#0C1623] focus:border-[#0C1623]'
                    }`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider uppercase opacity-85 block">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567..."
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none transition ${
                      isDarkMode
                        ? 'bg-[#070D14] border-white/10 text-white focus:border-[#C5A059]'
                        : 'bg-white border-[#E6DFC4] text-[#0C1623] focus:border-[#0C1623]'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold tracking-wider uppercase opacity-85 block">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com..."
                  value={checkoutForm.email}
                  onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none transition ${
                    isDarkMode
                      ? 'bg-[#070D14] border-white/10 text-white focus:border-[#C5A059]'
                      : 'bg-white border-[#E6DFC4] text-[#0C1623] focus:border-[#0C1623]'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider uppercase opacity-85 block">Shipping Address</label>
                  <input
                    type="text"
                    required
                    placeholder="House no, Street address..."
                    value={checkoutForm.address}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border text-xs focus:outline-none transition ${
                      isDarkMode
                        ? 'bg-[#070D14] border-white/10 text-white focus:border-[#C5A059]'
                        : 'bg-white border-[#E6DFC4] text-[#0C1623] focus:border-[#0C1623]'
                    }`}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold tracking-wider uppercase opacity-85 block">City</label>
                  <select
                    value={checkoutForm.city}
                    onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                    className={`w-full px-3 py-3 rounded-xl border text-xs focus:outline-none transition ${
                      isDarkMode
                        ? 'bg-[#070D14] border-white/10 text-white focus:border-[#C5A059]'
                        : 'bg-white border-[#E6DFC4] text-[#0C1623] focus:border-[#0C1623]'
                    }`}
                  >
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Peshawar">Peshawar</option>
                    <option value="Quetta">Quetta</option>
                  </select>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3 pt-2">
                <label className="text-[10px] font-bold tracking-wider uppercase opacity-85 block">Payment Method</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    checkoutForm.paymentMethod === 'cod'
                      ? 'border-[#C5A059] bg-[#C5A059]/5'
                      : isDarkMode ? 'border-white/10 hover:border-white/30' : 'border-[#E6DFC4] hover:border-slate-400'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={checkoutForm.paymentMethod === 'cod'}
                        onChange={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'cod' })}
                        className="text-[#C5A059] focus:ring-[#C5A059] border-slate-300 w-4 h-4"
                      />
                      <div className="text-left">
                        <p className="text-xs font-bold uppercase leading-none">Cash on Delivery</p>
                        <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Pay at your doorstep</p>
                      </div>
                    </div>
                  </label>

                  <label className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    checkoutForm.paymentMethod === 'bank'
                      ? 'border-[#C5A059] bg-[#C5A059]/5'
                      : isDarkMode ? 'border-white/10 hover:border-white/30' : 'border-[#E6DFC4] hover:border-slate-400'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value="bank"
                        checked={checkoutForm.paymentMethod === 'bank'}
                        onChange={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'bank' })}
                        className="text-[#C5A059] focus:ring-[#C5A059] border-slate-300 w-4 h-4"
                      />
                      <div className="text-left">
                        <p className="text-xs font-bold uppercase leading-none">Bank Wire Transfer</p>
                        <p className={`text-[10px] mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Send to brand account</p>
                      </div>
                    </div>
                  </label>
                </div>

                {checkoutForm.paymentMethod === 'bank' && (
                  <div className={`p-4 rounded-2xl border text-[11px] leading-relaxed transition-all duration-300 space-y-1 ${
                    isDarkMode ? 'bg-[#070D14] border-white/10 text-slate-300' : 'bg-white border-[#E6DFC4] text-[#4F5B6A]'
                  }`}>
                    <p className="font-bold text-[#C5A059] uppercase tracking-wider">GALLERIA BRAND BANK ACCOUNT</p>
                    <p>Bank: <strong className={isDarkMode ? 'text-white' : 'text-[#0C1623]'}>Habib Bank Limited (HBL)</strong></p>
                    <p>Account Title: <strong className={isDarkMode ? 'text-white' : 'text-[#0C1623]'}>Galleria Arts (Pvt) Ltd.</strong></p>
                    <p>Account Number: <strong className={isDarkMode ? 'text-white' : 'text-[#0C1623]'}>1234-5678-9012-34</strong></p>
                    <p className="text-[10px] italic pt-1 text-[#C5A059]">Please send your bank transfer receipt via WhatsApp to confirm dispatch.</p>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className={`w-full py-4 text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-lg transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-[#C5A059] hover:bg-white text-[#0C1623]' 
                      : 'bg-[#0C1623] hover:bg-[#C5A059] text-white hover:text-[#0C1623]'
                  }`}
                >
                  PLACE SECURE ORDER
                </button>
              </div>
            </form>

            {/* Right Side: Order Summary Panel (5 columns) */}
            <div className={`lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l transition-all duration-300 ${
              isDarkMode ? 'bg-[#070D14]/50 border-white/10' : 'bg-white/80 border-[#E6DFC4]'
            }`}>
              <div className="space-y-6">
                <h3 className="font-serif text-xl font-normal border-b pb-4">Order Summary</h3>

                <div className="divide-y divide-dashed divide-slate-400/20 max-h-[220px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 py-3 first:pt-0 last:pb-0">
                      <div className={`relative w-12 h-12 rounded-lg overflow-hidden border ${
                        isDarkMode ? 'border-white/15' : 'border-[#E6DFC4]'
                      }`}>
                        <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif text-xs font-semibold leading-tight truncate">{item.product.name}</h4>
                        <p className={`text-[10px] mt-0.5 truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                          Qty: {item.quantity} &bull; {item.product.type}
                        </p>
                        <p className="text-[10px] text-[#C5A059] font-bold mt-0.5">
                          {formatPKR(getEffectivePrice(item.product) * item.quantity)}
                          {((item.product.discountPercent || 0) > 0 || globalDiscount > 0) && (
                            <span className="text-[9px] line-through text-slate-500 font-light ml-1.5">
                              {formatPKR(item.product.pricePKR * item.quantity)}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-dashed border-[#C5A059]/30 mt-6 space-y-4">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="opacity-70">Cart Subtotal</span>
                    <span>{formatPKR(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Custom Curation Fee</span>
                    <span className="text-[#25D366] font-semibold">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Insured Delivery</span>
                    <span className="text-[#25D366] font-semibold">FREE</span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline pt-2 border-t">
                  <span className="text-xs uppercase tracking-wider font-bold">Total Amount</span>
                  <span className="text-xl font-bold text-[#C5A059]">{formatPKR(cartSubtotal)}</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
