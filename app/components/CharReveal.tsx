'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CharRevealProps {
  text: string;
  className?: string;
  delay?: number; // base delay in ms
  charDelay?: number; // delay per character in ms
}

export default function CharReveal({
  text,
  className = '',
  delay = 0,
  charDelay = 35,
}: CharRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.05,
      }
    );

    const el = containerRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, []);

  const chars = text.split('');

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {chars.map((char, idx) => (
        <span
          key={idx}
          style={{
            display: char === ' ' ? 'inline' : 'inline-block',
            animationDelay: isVisible ? `${delay + idx * charDelay}ms` : '0ms',
          }}
          className={`will-change-transform will-change-opacity will-change-filter ${
            isVisible
              ? 'animate-char-reveal'
              : 'opacity-0 translate-y-3 blur-[4px]'
          }`}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
