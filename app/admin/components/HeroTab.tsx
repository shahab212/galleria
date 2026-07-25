'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Save, RefreshCw, Eye } from 'lucide-react';
import { CATEGORIES } from '../../data';

interface HeroSlide {
  image: string;
  badge: string;
  titleLine1: string;
  pillText: string;
  titleLine2: string;
  subtitle: string;
  cta: string;
  linkText: string;
  targetCategory: string;
}

interface HeroTabProps {
  heroSlides: HeroSlide[];
  onSaveSlides: (slides: HeroSlide[]) => Promise<void>;
  triggerToast: (msg: string) => void;
}

export default function HeroTab({ heroSlides, onSaveSlides, triggerToast }: HeroTabProps) {
  const [slides, setSlides] = useState<HeroSlide[]>(JSON.parse(JSON.stringify(heroSlides)));
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  const handleInputChange = (field: keyof HeroSlide, value: string) => {
    const updated = [...slides];
    updated[selectedIdx] = {
      ...updated[selectedIdx],
      [field]: value
    };
    setSlides(updated);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSaveSlides(slides);
      triggerToast('Hero slideshow banners updated successfully!');
    } catch (error) {
      triggerToast('Error saving slideshow settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.success) {
        handleInputChange('image', data.filePath);
        triggerToast('Image uploaded and set successfully!');
      } else {
        triggerToast(data.error || 'Failed to upload image');
      }
    } catch (error) {
      triggerToast('Error uploading image');
    } finally {
      setIsUploading(false);
    }
  };

  const currentSlide = slides[selectedIdx] || slides[0];

  return (
    <div className="space-y-8 animate-fadeIn text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-white">Hero Slideshow Settings</h2>
          <p className="text-xs text-slate-400 font-light">Modify text, badges, CTA redirection buttons, and background images of the storefront slider.</p>
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
          <span>Save Changes</span>
        </button>
      </div>

      {/* Select Slide Bubble Strip */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-2">Select Slide:</span>
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIdx(idx)}
            className={`w-10 h-10 rounded-xl text-xs font-bold transition-all border ${
              selectedIdx === idx
                ? 'bg-[#C5A059] border-[#C5A059] text-[#0C1623] shadow-lg scale-105'
                : 'bg-[#0C1623]/60 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
            }`}
          >
            #{idx + 1}
          </button>
        ))}
      </div>

      {/* Two-Column Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Slide Forms Editor (Col Span 5) */}
        <div className="lg:col-span-5 bg-[#0C1623]/60 border border-white/10 rounded-[24px] p-6 space-y-4">
          <h4 className="font-serif text-lg font-semibold border-b border-white/5 pb-3">Slide #{selectedIdx + 1} Attributes</h4>
          
          {/* Badge */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Badge Label Tag</label>
            <input
              type="text"
              value={currentSlide.badge}
              onChange={(e) => handleInputChange('badge', e.target.value)}
              className="w-full text-xs px-4 py-3 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
            />
          </div>

          {/* Background Image Path & Upload Option */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Background Image</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentSlide.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                placeholder="/slider/main1.png"
                className="flex-1 text-xs px-4 py-3 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
              />
              <label className="bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center flex-shrink-0 transition min-w-[100px]">
                {isUploading ? 'Uploading...' : 'Upload'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Title row */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5 col-span-1">
              <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Line 1 Text</label>
              <input
                type="text"
                value={currentSlide.titleLine1}
                onChange={(e) => handleInputChange('titleLine1', e.target.value)}
                className="w-full text-xs px-3 py-3 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
              />
            </div>
            <div className="space-y-1.5 col-span-1">
              <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Pill Highlight</label>
              <input
                type="text"
                value={currentSlide.pillText}
                onChange={(e) => handleInputChange('pillText', e.target.value)}
                className="w-full text-xs px-3 py-3 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
              />
            </div>
            <div className="space-y-1.5 col-span-1">
              <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Line 2 Text</label>
              <input
                type="text"
                value={currentSlide.titleLine2}
                onChange={(e) => handleInputChange('titleLine2', e.target.value)}
                className="w-full text-xs px-3 py-3 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
              />
            </div>
          </div>

          {/* Subtitle */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Subtitle Description</label>
            <textarea
              rows={3}
              value={currentSlide.subtitle}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
              className="w-full text-xs p-4 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
            />
          </div>

          {/* Buttons CTA */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">CTA Button Text</label>
              <input
                type="text"
                value={currentSlide.cta}
                onChange={(e) => handleInputChange('cta', e.target.value)}
                className="w-full text-xs px-4 py-3 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Target Store Category</label>
              <select
                value={currentSlide.targetCategory}
                onChange={(e) => handleInputChange('targetCategory', e.target.value)}
                className="w-full text-xs px-3 py-3 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Link Text */}
          <div className="space-y-1.5">
            <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Sub-link text</label>
            <input
              type="text"
              value={currentSlide.linkText}
              onChange={(e) => handleInputChange('linkText', e.target.value)}
              className="w-full text-xs px-4 py-3 rounded-xl border border-white/10 bg-[#070D14] focus:outline-none focus:border-[#C5A059] transition"
            />
          </div>

        </div>

        {/* Right Side: Real-time Live Design Preview (Col Span 7) */}
        <div className="lg:col-span-7 bg-[#0C1623]/60 border border-white/10 rounded-[24px] p-6 flex flex-col justify-between items-stretch">
          
          <div className="space-y-1 pb-4">
            <span className="text-[9px] font-bold tracking-wider text-[#C5A059] uppercase flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              Real-time Layout Preview
            </span>
            <h4 className="font-serif text-lg font-semibold text-white">Storefront Hero Banner Preview</h4>
          </div>

          {/* Mini-mockup of the slide in the luxury container */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex items-center justify-start p-6 sm:p-10 select-none bg-[#070D14]">
            {/* Background image preview */}
            <div className="absolute inset-0 z-0">
              {currentSlide.image && (
                <Image
                  src={currentSlide.image}
                  alt="Background Preview"
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            </div>

            {/* Content Preview Overlay */}
            <div className="relative z-10 max-w-sm space-y-2">
              {/* Badge */}
              <div className="inline-block px-2 py-0.5 bg-black/40 backdrop-blur-md rounded-full text-[7px] font-semibold tracking-wider text-[#EBD8BE] uppercase border border-white/10">
                {currentSlide.badge || 'PROMO TAG'}
              </div>

              {/* Title */}
              <h3 className="font-serif text-lg sm:text-xl font-normal leading-tight text-white">
                {currentSlide.titleLine1}{' '}
                <span className="inline-flex items-center px-2 py-0.5 border border-white/80 rounded-full text-xs font-light italic font-serif text-[#EBD8BE] mx-0.5">
                  {currentSlide.pillText}
                </span>{' '}
                {currentSlide.titleLine2}
              </h3>

              {/* Subtitle */}
              <p className="text-[9px] text-white/80 leading-relaxed font-light line-clamp-2">
                {currentSlide.subtitle}
              </p>

              {/* Action buttons preview */}
              <div className="flex items-center gap-3 pt-1">
                <div className="px-3.5 py-1.5 rounded-full border border-white/80 text-white font-medium text-[8px] tracking-wider uppercase bg-white/10 backdrop-blur-xs">
                  {currentSlide.cta || 'Action'}
                </div>
                <div className="text-[8px] font-semibold tracking-wider text-white/85 uppercase flex items-center gap-0.5">
                  {currentSlide.linkText || 'Link'} &gt;
                </div>
              </div>
            </div>

          </div>

          <p className="text-[10px] text-slate-500 italic text-center pt-4 font-light">
            Note: Preview does not affect the live site until you click the &quot;Save Changes&quot; button in the top right.
          </p>

        </div>

      </div>
    </div>
  );
}
