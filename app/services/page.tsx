import Image from 'next/image'
import { Reveal, ParallaxSection } from '@/components/parallax-section'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'

export default function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Reveal>
              <h1 className="font-playfair text-4xl md:text-5xl mb-4">Our Services</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-muted-foreground">
                Professional photography services tailored to your unique needs and vision.
              </p>
            </Reveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
            <Reveal direction="left">
              <div>
                <h2 className="font-playfair text-3xl mb-6">Why Choose Us?</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    At SNapDart Photography, we combine technical expertise with creative vision to deliver exceptional photography that exceeds expectations.
                  </p>
                  <p>
                    Our team of experienced photographers specializes in various styles and techniques, ensuring we can capture your unique vision perfectly.
                  </p>
                  <p>
                    We believe in building relationships with our clients, taking the time to understand your goals and preferences to create truly personalized results.
                  </p>
                </div>
                
                <div className="mt-8 space-y-3">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-base font-medium">Professional Equipment</h3>
                      <p className="text-sm text-muted-foreground">
                        High-end cameras and lenses for superior image quality
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-base font-medium">Expert Editing</h3>
                      <p className="text-sm text-muted-foreground">
                        Professional post-processing for polished final images
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-base font-medium">Fast Turnaround</h3>
                      <p className="text-sm text-muted-foreground">
                        Quick delivery of your images without compromising quality
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            
            <Reveal direction="right">
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <Image 
                  src="/camera_eq.jpg" 
                  alt="Professional camera equipment" 
                  fill
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
          
          <div className="mb-20">
            <Reveal>
              <h2 className="font-playfair text-3xl text-center mb-12">Our Photography Services</h2>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Reveal delay={0.1}>
                <Card className="overflow-hidden border-none shadow-lg">
                  <div className="relative h-64">
                    <Image 
                      src="/ph_wedding.png" 
                      alt="Wedding Photography"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Wedding Photography</CardTitle>
                    <CardDescription>Starting from $2,500</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Capture every beautiful moment of your special day with our comprehensive wedding photography services.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">8-10 hours of coverage</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">Second photographer</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">Engagement session</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">Online gallery with downloads</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Book Consultation</Button>
                  </CardFooter>
                </Card>
              </Reveal>
              
              <Reveal delay={0.2}>
                <Card className="overflow-hidden border-none shadow-lg">
                  <div className="relative h-64">
                    <Image 
                      src="/img/portrat_.png" 
                      alt="Portrait Photography"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Portrait Sessions</CardTitle>
                    <CardDescription>Starting from $350</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Professional portrait photography for individuals, families, and personal branding.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">1-2 hour session</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">Multiple outfit changes</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">Indoor and outdoor options</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">15+ edited digital images</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Book Session</Button>
                  </CardFooter>
                </Card>
              </Reveal>
              
              <Reveal delay={0.3}>
                <Card className="overflow-hidden border-none shadow-lg">
                  <div className="relative h-64">
                    <Image 
                      src="/img/commercial.png" 
                      alt="Commercial Photography"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Commercial Photography</CardTitle>
                    <CardDescription>Starting from $800</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      Professional photography for businesses, products, and marketing materials.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">Half or full-day shoots</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">Product and environment photos</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">Team and corporate headshots</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">Commercial licensing included</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Request Quote</Button>
                  </CardFooter>
                </Card>
              </Reveal>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <Reveal direction="left">
              <Card className="overflow-hidden border-none shadow-lg">
                <div className="relative h-48">
                  <Image 
                    src="/event.jpg" 
                    alt="Event Photography"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Event Coverage</CardTitle>
                  <CardDescription>Starting from $500</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Professional photography for corporate events, parties, and special occasions.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Hourly rates available</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Quick turnaround times</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Group and candid shots</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Book Event</Button>
                </CardFooter>
              </Card>
            </Reveal>
            
            <Reveal direction="right">
              <Card className="overflow-hidden border-none shadow-lg">
                <div className="relative h-48">
                  <Image 
                    src="/img/ph.jpg" 
                    alt="Photography Workshops"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Photography Workshops</CardTitle>
                  <CardDescription>Starting from $250</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">
                    Learn photography skills from our professional team through hands-on workshops.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Small group sessions</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Beginner to advanced levels</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Equipment guidance</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Register Now</Button>
                </CardFooter>
              </Card>
            </Reveal>
          </div>
          
          <div>
            <Reveal>
              <h2 className="font-playfair text-3xl text-center mb-8">Frequently Asked Questions</h2>
            </Reveal>
            
            <div className="max-w-3xl mx-auto">
              <div className="space-y-6">
                <Reveal delay={0.1}>
                  <div className="bg-card p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-2">How far in advance should I book?</h3>
                    <p className="text-muted-foreground">
                      For weddings and major events, we recommend booking 6-12 months in advance. For portrait sessions and smaller events, 2-4 weeks notice is typically sufficient, but availability may vary during peak seasons.
                    </p>
                  </div>
                </Reveal>
                
                <Reveal delay={0.2}>
                  <div className="bg-card p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-2">How long until I receive my photos?</h3>
                    <p className="text-muted-foreground">
                      Portrait sessions are typically delivered within 1-2 weeks. Weddings and larger events take 3-4 weeks. For commercial work, we can accommodate rush delivery when needed.
                    </p>
                  </div>
                </Reveal>
                
                <Reveal delay={0.3}>
                  <div className="bg-card p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-2">Do you travel for photography assignments?</h3>
                    <p className="text-muted-foreground">
                      Yes, we&apos;re available for travel worldwide. Travel fees may apply depending on the location and duration of the assignment.
                    </p>
                  </div>
                </Reveal>
                
                <Reveal delay={0.4}>
                  <div className="bg-card p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium mb-2">What is your payment and cancellation policy?</h3>
                    <p className="text-muted-foreground">
                      We require a 50% deposit to secure your booking, with the remaining balance due before or on the day of the service. Cancellations made more than 30 days prior to the event receive a full refund of the deposit. Cancellations within 30 days are non-refundable but can be rescheduled within 6 months.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ParallaxSection speed={0.05} className="relative h-[400px] overflow-hidden">
        <img 
          src="/camera_eq.jpg" 
          alt="Photography equipment" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <Reveal>
            <h2 className="font-playfair text-3xl md:text-4xl mb-6 text-center max-w-2xl">
              Ready to capture your special moments?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <a href="/contact" className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-white/90 transition-colors">
              Contact Us Today
            </a>
          </Reveal>
        </div>
      </ParallaxSection>
    </>
  )
}