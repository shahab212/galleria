'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-in' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-up' | 'blur-in';
  duration?: number;
  delay?: number;
  threshold?: number;
  className?: string;
  as?: 'div' | 'section' | 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'nav' | 'ul' | 'li';
  once?: boolean;
}

export default function ScrollReveal({
  children,
  animation = 'fade-up',
  duration = 800,
  delay = 0,
  threshold = 0.05,
  className = '',
  as: Component = 'div',
  once = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [once, threshold]);

  const animationClasses = {
    'fade-in': 'reveal-fade-in',
    'fade-up': 'reveal-fade-up',
    'fade-down': 'reveal-fade-down',
    'fade-left': 'reveal-fade-left',
    'fade-right': 'reveal-fade-right',
    'scale-up': 'reveal-scale-up',
    'blur-in': 'reveal-blur-in',
  };

  const animationClass = animationClasses[animation] || 'reveal-fade-up';

  const style: React.CSSProperties = {
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
  };

  return (
    <Component
      ref={ref as any}
      style={style}
      className={`reveal-hidden ${animationClass} ${isVisible ? 'reveal-visible' : ''} ${className}`}
    >
      {children}
    </Component>
  );
}
