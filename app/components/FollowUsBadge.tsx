'use client';

import React from 'react';

interface FollowUsBadgeProps {
  isDarkMode?: boolean;
  align?: 'left' | 'center' | 'right';
  showWhatsApp?: boolean;
  facebookUrl?: string;
  instagramUrl?: string;
  whatsappNumber?: string;
  className?: string;
}

export default function FollowUsBadge({
  isDarkMode = true,
  align = 'left',
  showWhatsApp = true,
  facebookUrl = 'https://www.facebook.com/profile.php?id=61591824065745',
  instagramUrl = 'https://www.instagram.com/galleriaarts.co/',
  whatsappNumber = '923001234567',
  className = '',
}: FollowUsBadgeProps) {
  const alignClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }[align];

  return (
    <div className={`inline-flex flex-col ${alignClasses} ${className}`}>
      {/* 1. "FOLLOW US" Speech Bubble Badge matching the reference image */}
      <div className="relative inline-flex flex-col items-center group cursor-pointer select-none">
        {/* Main Gradient Bubble */}
        <div className="px-5 py-2 rounded-2xl bg-gradient-to-r from-[#9B1B6D] via-[#D82B61] to-[#F15A24] text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-pink-600/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-pink-600/35 flex items-center justify-center">
          <span>FOLLOW US</span>
        </div>
        {/* Downward Speech Bubble Pointer / Tail */}
        <div className="w-0 h-0 border-x-[7px] border-x-transparent border-t-[8px] border-t-[#DA2C5F] -mt-[1px]" />
      </div>

      {/* 2. Social Action Buttons directly under the badge */}
      <div className="flex items-center gap-3 pt-3">
        {/* Facebook Icon Button */}
        <a
          href={facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Galleria on Facebook"
          title="Follow us on Facebook"
          className={`group/fb relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
            isDarkMode
              ? 'bg-[#0C1623] text-slate-200 border border-white/15 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/30 hover:scale-110'
              : 'bg-white text-[#0C1623] border border-[#E6DFC4] hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/30 hover:scale-110'
          }`}
        >
          <svg className="w-5 h-5 fill-currentColor transition-transform duration-300 group-hover/fb:scale-110" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
          </svg>
        </a>

        {/* Instagram Icon Button */}
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Galleria on Instagram"
          title="Follow us on Instagram"
          className={`group/insta relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
            isDarkMode
              ? 'bg-[#0C1623] text-slate-200 border border-white/15 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-pink-500/30 hover:scale-110'
              : 'bg-white text-[#0C1623] border border-[#E6DFC4] hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-pink-500/30 hover:scale-110'
          }`}
        >
          <svg className="w-5 h-5 fill-none stroke-currentColor stroke-[1.8] transition-transform duration-300 group-hover/insta:scale-110" viewBox="0 0 24 24" aria-hidden="true">
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
          </svg>
        </a>

        {/* WhatsApp Icon Button (optional) */}
        {showWhatsApp && (
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
            className={`group/wa relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
              isDarkMode
                ? 'bg-[#0C1623] text-slate-200 border border-white/15 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-lg hover:shadow-[#25D366]/30 hover:scale-110'
                : 'bg-white text-[#0C1623] border border-[#E6DFC4] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-lg hover:shadow-[#25D366]/30 hover:scale-110'
            }`}
          >
            <svg className="w-5 h-5 fill-currentColor transition-transform duration-300 group-hover/wa:scale-110" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
