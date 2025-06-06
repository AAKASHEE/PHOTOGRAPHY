"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const testimonials = [
  {
    id: 1,
    name: 'Emily Johnson',
    role: 'Bride',
    image: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg',
    quote: 'The photographs captured our wedding day perfectly. Every time we look at them, we relive those beautiful moments all over again.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Business Owner',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
    quote: 'The commercial photography for our brand was exceptional. The images elevated our marketing materials and helped us stand out from competitors.',
  },
  {
    id: 3,
    name: 'Sarah Williams',
    role: 'Portrait Client',
    image: 'https://images.pexels.com/photos/3671083/pexels-photo-3671083.jpeg',
    quote: 'I\'ve never felt so comfortable during a photoshoot. The portraits captured my personality in a way I didn\'t think was possible.',
  },
]

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  const nextSlide = () => {
    setDirection(1)
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }
  
  const prevSlide = () => {
    setDirection(-1)
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }
  
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <div className="relative overflow-hidden py-12">
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
        <Quote className="h-20 w-20 text-primary/10" />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-20">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative h-20 w-20 rounded-full overflow-hidden mb-6">
              <Image
                src={testimonials[current].image}
                alt={testimonials[current].name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-lg md:text-xl mb-6 italic">
              "{testimonials[current].quote}"
            </p>
            <h4 className="font-medium">{testimonials[current].name}</h4>
            <p className="text-sm text-muted-foreground">{testimonials[current].role}</p>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute left-4 top-1/2 -translate-y-1/2"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="absolute right-4 top-1/2 -translate-y-1/2"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              current === index 
                ? "w-8 bg-primary" 
                : "bg-primary/30"
            )}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  )
}