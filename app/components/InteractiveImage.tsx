'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';

interface InteractiveImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function InteractiveImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  priority = false,
}: InteractiveImageProps) {
  const [isActive, setIsActive] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [bgPos, setBgPos] = useState('50% 50%');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return;

    const { left, top, width: rectW, height: rectH } = container.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;

    // Check bounds
    if (x < 0 || y < 0 || x > rectW || y > rectH) {
      setIsActive(false);
      return;
    }

    // Map percentage positioning
    const pctX = (x / rectW) * 100;
    const pctY = (y / rectH) * 100;

    setCoords({ x, y });
    setBgPos(`${pctX}% ${pctY}%`);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    // Prevent default body scrolling while drawing magnifier
    if (e.cancelable) {
      e.preventDefault();
    }
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative select-none cursor-crosshair overflow-hidden group/loupe ${fill ? 'w-full h-full' : ''} ${className}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setIsActive(false)}
      onTouchStart={(e) => {
        setIsActive(true);
        if (e.touches && e.touches[0]) {
          handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }}
      onTouchMove={onTouchMove}
      onTouchEnd={() => setIsActive(false)}
      onTouchCancel={() => setIsActive(false)}
    >
      {/* Primary Image */}
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 group-hover/loupe:scale-102"
          priority={priority}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover transition-transform duration-500 group-hover/loupe:scale-102"
          priority={priority}
        />
      )}

      {/* Floating Loupe Magnifier Glass Overlay */}
      {isActive && (
        <div
          className="absolute pointer-events-none rounded-full border-2 border-[#C5A059] shadow-[0_15px_30px_rgba(0,0,0,0.6)] z-25 w-32 h-32 sm:w-40 sm:h-40 overflow-hidden"
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            transform: 'translate(-50%, -50%)',
            backgroundImage: `url('${src}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: '240% 240%', // Zoom factor 2.4x
            backgroundPosition: bgPos,
            boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.25), 0 15px 30px rgba(0,0,0,0.65)',
          }}
        />
      )}
    </div>
  );
}
