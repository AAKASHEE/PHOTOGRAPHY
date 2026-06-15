'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Fix: Lenis uses CSS transform scrolling which breaks the browser's
// native IntersectionObserver used for lazy loading. We override it
// with a custom observer that prefetches images 200vh before they appear.
function patchLazyImages() {
  if (typeof window === 'undefined') return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          // If the img has a data-src (custom lazy), swap it
          if (img.dataset.src) {
            img.src = img.dataset.src
            delete img.dataset.src
          }
          // Force the browser to start decoding eagerly
          img.decoding = 'async'
          // Mark high fetch priority
          ;(img as any).fetchPriority = 'high'
          observer.unobserve(img)
        }
      })
    },
    {
      // Large root margin — start loading images 100vh before they enter view
      rootMargin: '100% 0px 100% 0px',
      threshold: 0,
    }
  )

  // Observe all current + future lazy images
  const observeAll = () => {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      observer.observe(img)
    })
  }

  observeAll()

  // Also observe images added later (e.g. after filter change)
  const mutationObserver = new MutationObserver(observeAll)
  mutationObserver.observe(document.body, { childList: true, subtree: true })

  return () => {
    observer.disconnect()
    mutationObserver.disconnect()
  }
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    // On touch devices, native momentum scroll is better
    const isTouch = 'ontouchstart' in window && window.innerWidth < 1024
    if (isTouch) return

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    })

    lenisRef.current = lenis

    // Sync Lenis with GSAP's ticker for frame-perfect animations
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Disable GSAP's lagSmoothing so Lenis stays buttery
    gsap.ticker.lagSmoothing(0)

    // Tell ScrollTrigger about Lenis scroll position
    lenis.on('scroll', ScrollTrigger.update)

    // Fix lazy loading conflict with Lenis transform scrolling
    const cleanupPatch = patchLazyImages()

    return () => {
      lenis.destroy()
      lenisRef.current = null
      cleanupPatch?.()
    }
  }, [])

  return <>{children}</>
}

