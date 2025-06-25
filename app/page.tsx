"use client";

import HeroCarousel from '@/components/hero-carousel'
import PortfolioGallery from '@/components/portfolio-gallery'
import TestimonialsCarousel from '@/components/testimonials-carousel'
import ServicesSection from '@/components/services-section'
import { ParallaxSection, Reveal } from '@/components/parallax-section'
import BlurText from "../components/BlurText"
import Particles from '../components/Particles'

export default function Home() {
  return (
    <>
      <HeroCarousel />
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Reveal>
              <h2 className="font-playfair text-3xl md:text-4xl mb-4">Welcome to SNapDart Photography</h2>
            </Reveal>
            
            <BlurText
              text="We capture life's most precious moments through the artistry of photography. From stunning landscapes to intimate portraits, our passion is preserving your memories in timeless images."
              delay={100}
              className="text-muted-foreground text-lg leading-relaxed"
              animateBy="words"
              direction="top"
              threshold={0.1}
              stepDuration={0.4}
            />
          </div>
          
          <ParallaxSection className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <Reveal direction="left">
                  <h3 className="font-playfair text-2xl md:text-3xl mb-4">Our Vision</h3>
                  <p className="text-muted-foreground mb-6">
                    We believe that photography is more than just taking pictures – it&apos;s about telling stories, capturing emotions, and preserving moments that might otherwise be forgotten. 
                  </p>
                  <p className="text-muted-foreground">
                    Every click of our shutter is guided by artistic intuition and technical mastery, ensuring that your photographs aren&apos;t just seen – they&apos;re felt.
                  </p>
                </Reveal>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Reveal direction="right">
                  <img 
                    src="/IMG_2466.jpg" 
                    alt="Photographer working" 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </Reveal>
              </div>
            </div>
          </ParallaxSection>
          
          <Reveal>
            <h2 className="font-playfair text-3xl md:text-4xl text-center mb-12">Featured Work</h2>
          </Reveal>
          
          <PortfolioGallery />
        </div>
      </section>
      
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal>
            <h2 className="font-playfair text-3xl md:text-4xl text-center mb-12">Our Services</h2>
          </Reveal>
          
          <ServicesSection />
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <Reveal>
            <h2 className="font-playfair text-3xl md:text-4xl text-center mb-12">Client Testimonials</h2>
          </Reveal>
          
          <TestimonialsCarousel />
        </div>
      </section>
      
      <section className="relative h-[500px] overflow-hidden">
        {/* Background Image */}
        <img 
          src="https://images.pexels.com/photos/1906794/pexels-photo-1906794.jpeg" 
          alt="Artistic photography background" 
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        />
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60" style={{ zIndex: 1 }} />
        
        {/* Particle Background */}
        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          <Particles
            particleCount={150}
            particleSpread={8}
            speed={0.05}
            particleColors={["#ffffff", "#f0f0f0", "#e0e0e0"]}
            alphaParticles={true}
            particleBaseSize={80}
            sizeRandomness={0.8}
            cameraDistance={15}
            disableRotation={false}
            className="w-full h-full"
          />
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4" style={{ zIndex: 3 }}>
          <Reveal>
            <h2 className="font-playfair text-3xl md:text-5xl mb-6 text-center max-w-3xl">Let&apos;s Create Something Beautiful Together</h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-white/80 text-lg mb-8 text-center max-w-xl">
              Ready to capture your special moments? Get in touch today to discuss your photography needs.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <a href="/contact" className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-white/90 transition-colors">
              Contact Us
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}