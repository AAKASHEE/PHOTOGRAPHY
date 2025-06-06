"use client"

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '@/lib/utils'

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  speed?: number
  direction?: 'up' | 'down'
}

export function ParallaxSection({
  children,
  className,
  speed = 0.1,
  direction = 'up',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const factor = direction === 'up' ? -speed : speed
  const y = useTransform(scrollYProgress, [0, 1], [0, factor * 100])
  
  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={cn("relative", className)}
    >
      {children}
    </motion.div>
  )
}

interface RevealProps {
  children: React.ReactNode
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
}

export function Reveal({
  children,
  className,
  direction = 'up',
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  let initialX = 0
  let initialY = 0
  
  if (direction === 'up') initialY = 50
  if (direction === 'down') initialY = -50
  if (direction === 'left') initialX = 50
  if (direction === 'right') initialX = -50
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}