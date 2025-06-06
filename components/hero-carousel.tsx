"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const images = [
  {
    src: "/img/IMG_6563.JPG",
    alt: "Mountain landscape photography",
    title: "SHHH....",
    subtitle: "HELLO HANJI namaste "
  },
  {
    src: "/img/IMG_1364.jpg",
    alt: "Portrait photography of woman",
    title: "ART == CARS",
    subtitle: "Ride IT"
  },
  {
    src: "/img/IMG_6215.JPG",
    alt: "Urban photography city street",
    title: "Church Street",
    subtitle: "beeep beep beep"
  }
]

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)
    
    return () => clearInterval(interval)
  }, [current])

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 750)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 750)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all duration-700 ease-in-out",
            current === index 
              ? "opacity-100 scale-100" 
              : "opacity-0 scale-110"
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={index === 0}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <h1 
              className={cn(
                "font-playfair text-4xl md:text-6xl lg:text-7xl font-medium mb-4 md:mb-6 text-center max-w-4xl px-4 transition-all duration-700 delay-200",
                current === index 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              )}
            >
              {image.title}
            </h1>
            <p 
              className={cn(
                "text-lg md:text-xl text-white/90 mb-8 text-center max-w-xl px-4 transition-all duration-700 delay-300",
                current === index 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              )}
            >
              {image.subtitle}
            </p>
            <Link 
              href="/portfolio"
              className={cn(
                "transition-all duration-700 delay-400",
                current === index 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-10"
              )}
            >
              <Button size="lg" className="bg-white text-black hover:bg-white/90">
                View Portfolio
              </Button>
            </Link>
          </div>
        </div>
      ))}

      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/20 hover:bg-background/30 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-background/20 hover:bg-background/30 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              current === index 
                ? "w-8 bg-white" 
                : "bg-white/50"
            )}
            onClick={() => setCurrent(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroCarousel