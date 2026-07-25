'use client';

import React, { useState } from 'react';
import { Save, RefreshCw, Percent, Tag, HelpCircle } from 'lucide-react';
import { Product } from '../../types';

interface DiscountsTabProps {
  products: Product[];
  globalDiscount: number;
  onSaveGlobalDiscount: (percent: number) => Promise<void>;
  triggerToast: (msg: string) => void;
}

export default function DiscountsTab({
  products,
  globalDiscount,
  onSaveGlobalDiscount,
  triggerToast
}: DiscountsTabProps) {
  const [globalPercent, setGlobalPercent] = useState<number>(globalDiscount);
  const [isSaving, setIsSaving] = useState(false);

  const formatPKR = (amount: number) => {
    return `PKR ${amount.toLocaleString('en-PK')}`;
  };

  const getEffectivePrice = (product: Product) => {
    const specific = product.discountPercent || 0;
    const activeDiscount = specific > 0 ? specific : globalPercent;
    if (activeDiscount <= 0) return product.pricePKR;
    return Math.round(product.pricePKR * (1 - activeDiscount / 100));
  };

  const handleSave = async () => {
    if (globalPercent < 0 || globalPercent > 100) {
      triggerToast('Discount must be between 0% and 100%.');
      return;
    }
    setIsSaving(true);
    try {
      await onSaveGlobalDiscount(globalPercent);
      triggerToast('Global store discount updated successfully!');
    } catch (error) {
      triggerToast('Error saving settings.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">Storefront Discounts Manager</h2>
          <p className="text-xs text-slate-400 font-light">Set store-wide discounts or review product-specific discount configurations.</p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#C5A059] hover:bg-white text-[#0C1623] px-6 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md flex items-center gap-2 disabled:opacity-50"
        >
          {isSaving ? (
            <RefreshCw className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4 stroke-[2.25]" />
          )}
          <span>Save Global Discount</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Global Discount Slider Form (Col Span 4) */}
        <div className="lg:col-span-4 bg-[#0C1623]/60 border border-white/10 rounded-[24px] p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold border-b border-white/5 pb-3 flex items-center gap-2">
              <Percent className="w-5 h-5 text-[#C5A059]" />
              <span>Global Discount Setting</span>
            </h4>
            
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              This discount applies to **all** storefront items. If an artwork has a specific product discount configured in the catalog, that specific discount will take precedence over this global rate.
            </p>

            {/* Input Slider Widget */}
            <div className="space-y-3 pt-4">
              <div className="flex justify-between items-center text-xs font-bold tracking-wider">
                <span className="text-slate-400">GLOBAL RATE</span>
                <span className="text-[#C5A059] text-sm">{globalPercent}% OFF</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={globalPercent}
                onChange={(e) => setGlobalPercent(Number(e.target.value))}
                className="w-full h-1.5 bg-[#070D14] rounded-lg appearance-none cursor-pointer accent-[#C5A059]"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-bold tracking-widest uppercase">
                <span>0% (No Discount)</span>
                <span>100% (Free)</span>
              </div>
            </div>
          </div>

          <div className="bg-[#070D14]/80 rounded-2xl border border-white/5 p-4 flex gap-3 items-start">
            <HelpCircle className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h5 className="text-[10px] font-bold tracking-wider text-slate-300 uppercase leading-none">Rule Precedence</h5>
              <p className="text-[9px] text-slate-400 font-light leading-normal">
                Specific product discounts (e.g. 15% OFF set on Verona Luxe Canvas) will always take priority over the global discount rate.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Catalog Pricing Review (Col Span 8) */}
        <div className="lg:col-span-8 bg-[#0C1623]/60 border border-white/10 rounded-[24px] p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold border-b border-white/5 pb-3 flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#C5A059]" />
              <span>Catalog Pricing Audit</span>
            </h4>

            {/* Pricing Audit Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-light">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Artwork Title</th>
                    <th className="pb-3 text-right font-semibold">Base Price</th>
                    <th className="pb-3 text-center font-semibold">Item Discount</th>
                    <th className="pb-3 text-center font-semibold">Global Rate</th>
                    <th className="pb-3 text-right font-semibold text-[#C5A059]">Final Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((p) => {
                    const specific = p.discountPercent || 0;
                    const isSpecificActive = specific > 0;
                    const isGlobalApplied = !isSpecificActive && globalPercent > 0;
                    const finalDiscount = isSpecificActive ? specific : (isGlobalApplied ? globalPercent : 0);

                    return (
                      <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 font-medium">{p.name}</td>
                        <td className="py-3.5 text-right font-mono text-slate-400">{formatPKR(p.pricePKR)}</td>
                        <td className="py-3.5 text-center">
                          {isSpecificActive ? (
                            <span className="px-2 py-0.5 rounded-full bg-[#C5A059]/10 text-[#C5A059] border border-[#C5A059]/30 text-[9px] font-bold">
                              {specific}% OFF
                            </span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>
                        <td className="py-3.5 text-center">
                          {isGlobalApplied ? (
                            <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15 text-[9px] font-medium">
                              {globalPercent}% OFF
                            </span>
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>
                        <td className="py-3.5 text-right font-mono font-bold text-white">
                          {finalDiscount > 0 ? (
                            <div className="flex flex-col items-end">
                              <span className="text-[#C5A059]">{formatPKR(getEffectivePrice(p))}</span>
                              <span className="text-[9px] text-slate-500 line-through font-light leading-none">
                                {formatPKR(p.pricePKR)}
                              </span>
                            </div>
                          ) : (
                            <span>{formatPKR(p.pricePKR)}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
