"use client";

import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

const buildKeyframes = (from, steps) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t) => t,
  loop = true,
  loopDelay = 1000,
  stepDuration = 0.35,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const [animationKeys, setAnimationKeys] = useState(elements.map((_, i) => i));
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () => ({
      filter: 'blur(10px)',
      opacity: 0,
      y: direction === 'top' ? 20 : direction === 'bottom' ? -20 : 0,
      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0
    }),
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
        x: 0
      }
    ],
    []
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  const handleWordAnimationComplete = (index) => {
    if (loop) {
      setTimeout(() => {
        setAnimationKeys(prev => {
          const newKeys = [...prev];
          newKeys[index] += 1;
          return newKeys;
        });
      }, loopDelay);
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: animateBy === 'words' ? 0.1 : 0.05,
            delayChildren: delay / 1000
          }
        }
      }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
          repeat: loop ? Infinity : 0,
          repeatDelay: loopDelay / 1000
        };

        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={`${index}-${animationKeys[index]}`}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={() => handleWordAnimationComplete(index)}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </motion.div>
  );
};

export default BlurText;