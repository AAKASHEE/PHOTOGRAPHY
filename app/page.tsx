import HeroCarousel from '@/components/hero-carousel'
import PortfolioGallery from '@/components/portfolio-gallery'
import TestimonialsCarousel from '@/components/testimonials-carousel'
import ServicesSection from '@/components/services-section'
import { ParallaxSection, Reveal } from '@/components/parallax-section'

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
            <Reveal delay={0.2}>
              <p className="text-muted-foreground">
                We capture life&apos;s most precious moments through the artistry of photography.
                From stunning landscapes to intimate portraits, our passion is preserving your memories in timeless images.
              </p>
            </Reveal>
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
      
      <ParallaxSection speed={0.05} className="relative h-[500px] overflow-hidden">
        <img 
          src="https://images.pexels.com/photos/1906794/pexels-photo-1906794.jpeg" 
          alt="Artistic photography background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
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
      </ParallaxSection>
    </>
  )
}