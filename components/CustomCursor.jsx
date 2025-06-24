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

  // Optimized animation with velocity-based smoothing and frame rate throttling
  const animateCursor = useCallback((currentTime) => {
    // Throttle to ~60fps max
    if (currentTime - lastTimeRef.current < 16) {
      animationIdRef.current = requestAnimationFrame(animateCursor);
      return;
    }
    lastTimeRef.current = currentTime;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const dx = targetRef.current.x - positionRef.current.x;
    const dy = targetRef.current.y - positionRef.current.y;
    
    // Use velocity-based smoothing for more natural movement
    const friction = 0.85;
    const acceleration = 0.08;
    
    velocityRef.current.x = velocityRef.current.x * friction + dx * acceleration;
    velocityRef.current.y = velocityRef.current.y * friction + dy * acceleration;
    
    positionRef.current.x += velocityRef.current.x;
    positionRef.current.y += velocityRef.current.y;
    
    // Only update transform if movement is significant (avoid micro-updates)
    if (Math.abs(velocityRef.current.x) > 0.01 || Math.abs(velocityRef.current.y) > 0.01) {
      // Use GPU-accelerated transform with will-change
      cursor.style.transform = `translate3d(${positionRef.current.x}px, ${positionRef.current.y}px, 0)`;
    }
    
    // Continue animation only if there's significant movement
    if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5 || 
        Math.abs(velocityRef.current.x) > 0.1 || Math.abs(velocityRef.current.y) > 0.1) {
      animationIdRef.current = requestAnimationFrame(animateCursor);
    } else {
      // Stop animation when cursor is stable
      animationIdRef.current = null;
    }
  }, []);

  // Debounced scroll handler
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 50;
    if (scrolled !== isScrolledRef.current) {
      isScrolledRef.current = scrolled;
      const cursor = cursorRef.current;
      if (cursor) {
        // Use toggleAttribute for better performance than classList
        cursor.classList.toggle('scrolled-cursor', scrolled);
      }
    }
  }, []);

  // Optimized mouse move handler with movement threshold
  const handleMouseMove = useCallback((e) => {
    const newX = e.clientX;
    const newY = e.clientY;
    
    // Only update if mouse moved significantly
    if (Math.abs(newX - targetRef.current.x) > 1 || 
        Math.abs(newY - targetRef.current.y) > 1) {
      targetRef.current = { x: newX, y: newY };
      
      // Start animation if not already running
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