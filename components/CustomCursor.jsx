'use client';

import { useEffect, useRef, useCallback } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const isScrolledRef = useRef(false);
  const animationIdRef = useRef(null);
  const lastTimeRef = useRef(0);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // Optimized animation with scroll-aware performance
  const animateCursor = useCallback((currentTime) => {
    // Dynamic frame rate based on scroll state
    const frameDelay = isScrollingRef.current ? 8 : 16; // Higher FPS during scroll
    
    if (currentTime - lastTimeRef.current < frameDelay) {
      animationIdRef.current = requestAnimationFrame(animateCursor);
      return;
    }
    lastTimeRef.current = currentTime;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const dx = targetRef.current.x - positionRef.current.x;
    const dy = targetRef.current.y - positionRef.current.y;
    
    // Adjust smoothing based on scroll state
    const friction = isScrollingRef.current ? 0.92 : 0.85; // More responsive during scroll
    const acceleration = isScrollingRef.current ? 0.12 : 0.08; // Faster catch-up during scroll
    
    velocityRef.current.x = velocityRef.current.x * friction + dx * acceleration;
    velocityRef.current.y = velocityRef.current.y * friction + dy * acceleration;
    
    positionRef.current.x += velocityRef.current.x;
    positionRef.current.y += velocityRef.current.y;
    
    // Use transform3d with subpixel precision for ultra-smooth movement
    const x = Math.round(positionRef.current.x * 100) / 100;
    const y = Math.round(positionRef.current.y * 100) / 100;
    
    // Batch DOM updates and use GPU-optimized transform
    cursor.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1)`;
    
    // Continue animation with dynamic threshold based on scroll state
    const threshold = isScrollingRef.current ? 0.3 : 0.5;
    const velocityThreshold = isScrollingRef.current ? 0.05 : 0.1;
    
    if (Math.abs(dx) > threshold || Math.abs(dy) > threshold || 
        Math.abs(velocityRef.current.x) > velocityThreshold || 
        Math.abs(velocityRef.current.y) > velocityThreshold) {
      animationIdRef.current = requestAnimationFrame(animateCursor);
    } else {
      animationIdRef.current = null;
    }
  }, []);

  // Highly optimized scroll handler with scroll state management
  const handleScroll = useCallback(() => {
    // Mark as scrolling for performance adjustments
    isScrollingRef.current = true;
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Reset scrolling state after scroll ends
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 150);
    
    // Efficient scroll state check
    const scrolled = window.scrollY > 50;
    if (scrolled !== isScrolledRef.current) {
      isScrolledRef.current = scrolled;
      const cursor = cursorRef.current;
      if (cursor) {
        // Use requestAnimationFrame for smooth class updates
        requestAnimationFrame(() => {
          cursor.classList.toggle('scrolled-cursor', scrolled);
        });
      }
    }
  }, []);

  // Ultra-optimized mouse move handler for scroll scenarios
  const handleMouseMove = useCallback((e) => {
    const newX = e.clientX;
    const newY = e.clientY;
    
    // Reduced threshold during scrolling for more responsive feel
    const threshold = isScrollingRef.current ? 0.5 : 1;
    
    if (Math.abs(newX - targetRef.current.x) > threshold || 
        Math.abs(newY - targetRef.current.y) > threshold) {
      targetRef.current = { x: newX, y: newY };
      
      // Always ensure animation runs during mouse movement
      if (!animationIdRef.current) {
        animationIdRef.current = requestAnimationFrame(animateCursor);
      }
    }
  }, [animateCursor]);

  // Visibility handlers with opacity caching
  const handleMouseLeave = useCallback(() => {
    const cursor = cursorRef.current;
    if (cursor && cursor.style.opacity !== '0') {
      cursor.style.opacity = '0';
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    const cursor = cursorRef.current;
    if (cursor && cursor.style.opacity !== '1') {
      cursor.style.opacity = '1';
    }
  }, []);

  useEffect(() => {
    // Initialize position to center
    const initialX = window.innerWidth / 2;
    const initialY = window.innerHeight / 2;
    
    targetRef.current = { x: initialX, y: initialY };
    positionRef.current = { x: initialX, y: initialY };
    velocityRef.current = { x: 0, y: 0 };

    // Set initial transform immediately
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${initialX}px, ${initialY}px, 0)`;
    }

    // Use passive listeners for better scroll performance
    const scrollOptions = { passive: true };
    const mouseOptions = { passive: true };

    document.addEventListener('mousemove', handleMouseMove, mouseOptions);
    document.addEventListener('mouseleave', handleMouseLeave, mouseOptions);
    document.addEventListener('mouseenter', handleMouseEnter, mouseOptions);
    window.addEventListener('scroll', handleScroll, scrollOptions);

    // Start initial animation
    animationIdRef.current = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('scroll', handleScroll);
      
      // Clean up timeouts and animation frames
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter, handleScroll, animateCursor]);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      style={{
        left: 0,
        top: 0,
        willChange: 'transform', // Optimize for GPU acceleration
      }}
    >
      <div className="cursor-circle">
        <div className="cursor-dots">
          <div className="cursor-dot"></div>
          <div className="cursor-dot"></div>
        </div>
      </div>
    </div>
  );
}