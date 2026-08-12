'use client';

import React, { useEffect, useRef } from 'react';

export default function CursorTrailer() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Detect if device supports touch or is mobile
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      dot.style.display = 'none';
      ring.style.display = 'none';
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let isHovering = false;
    let isClicking = false;
    let isVisible = false;

    // Initially hide elements until mouse moves
    dot.style.opacity = '0';
    ring.style.opacity = '0';

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '0.6';
      }
      
      const target = e.target as HTMLElement;
      if (target) {
        const clickable = target.closest('a, button, select, [role="button"], input, textarea, .group, [onclick]');
        if (clickable) {
          isHovering = true;
        } else {
          isHovering = false;
        }
      }
    };

    const onMouseDown = () => {
      isClicking = true;
    };

    const onMouseUp = () => {
      isClicking = false;
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);

    let animationFrameId = 0;
    const tick = () => {
      if (isVisible) {
        // Smooth interpolation for the trailing ring (inertia lag)
        const ease = 0.12; 
        ringX += (mouseX - ringX) * ease;
        ringY += (mouseY - ringY) * ease;

        // Position the dot
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        // Position the ring
        let scale = 1;
        let opacity = 0.6;
        if (isHovering) {
          scale = 1.6;
          opacity = 0.9;
        }
        if (isClicking) {
          scale = 1.1;
          opacity = 0.7;
        }

        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
        ring.style.opacity = opacity.toString();

        if (isHovering) {
          ring.style.borderColor = '#C5A059';
          ring.style.backgroundColor = 'rgba(197, 160, 89, 0.06)';
          dot.style.backgroundColor = '#C5A059';
        } else {
          ring.style.borderColor = 'rgba(197, 160, 89, 0.3)';
          ring.style.backgroundColor = 'transparent';
          dot.style.backgroundColor = '#C5A059';
        }
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 will-change-transform bg-[#C5A059] transition-opacity duration-300"
      />
      {/* Lagging Trailing Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none z-[998] -translate-x-1/2 -translate-y-1/2 border border-[#C5A059]/30 will-change-transform transition-[border-color,background-color,opacity] duration-300"
      />
    </>
  );
}
