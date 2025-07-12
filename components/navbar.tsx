'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Camera } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import BlurText from '@/components/BlurText'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    // Use requestAnimationFrame for smoother scroll handling
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Journal', href: '/journal' },
    { name: 'Contact', href: '/contact' },
  ]

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isOpen])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  if (!isMounted) return null

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-out ${
        isScrolled 
          ? 'bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm' 
          : 'bg-transparent'
      }`}
      style={{
        // Fallback for browsers that don't support backdrop-filter
        backgroundColor: isScrolled ? 'rgba(var(--background-rgb), 0.9)' : 'transparent',
      }}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with BlurText Animation */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            aria-label="Home"
          >
            <Camera className="h-6 w-6" />
            <BlurText
              text="SNapDart"
              delay={750}
              animateBy="letters"
              direction="top"
              className="font-playfair text-xl md:text-2xl font-medium"
              animationFrom={{ filter: 'blur(10px)', opacity: 0, y: -50 }}
              animationTo={[
                { filter: 'blur(5px)', opacity: 0.5, y: 5 },
                { filter: 'blur(0px)', opacity: 1, y: 0 },
              ]}
              stepDuration={0.35}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm transition-colors duration-200 ease-in-out hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm px-2 py-1 ${
                  pathname === link.href 
                    ? 'font-medium text-primary' 
                    : 'text-muted-foreground hover:text-primary/80'
                }`}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            <Button size="sm" className="transition-transform hover:scale-105 active:scale-95">
              Client Login
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ModeToggle />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Menu className="h-6 w-6 transition-transform hover:scale-110" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-background z-50 md:hidden transition-all duration-300 ease-in-out ${
          isOpen 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex justify-end p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <X className="h-6 w-6 transition-transform hover:scale-110" />
          </Button>
        </div>
        <nav className="flex flex-col items-center justify-center h-[calc(100%-4rem)] space-y-6 px-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xl transition-all duration-200 ease-in-out hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm px-4 py-2 ${
                pathname === link.href 
                  ? 'font-medium text-primary scale-105' 
                  : 'text-muted-foreground hover:text-primary/80 hover:scale-105'
              }`}
              aria-current={pathname === link.href ? 'page' : undefined}
            >
              {link.name}
            </Link>
          ))}
          <Button 
            className="mt-4 transition-transform hover:scale-105 active:scale-95"
            size="lg"
          >
            Client Login
          </Button>
        </nav>
      </div>
    </header>
  )
}

export default Navbar