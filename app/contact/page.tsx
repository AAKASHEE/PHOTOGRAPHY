import Image from 'next/image'
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'
import { Reveal } from '@/components/parallax-section'
import ContactForm from '@/components/contact-form'

export default function ContactPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Reveal>
              <h1 className="font-playfair text-4xl md:text-5xl mb-4">Get In Touch</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-muted-foreground">
                Have a question or want to book a session? We'd love to hear from you.
                Fill out the form below or reach out directly through our contact information.
              </p>
            </Reveal>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Reveal direction="left">
              <div className="bg-card rounded-lg p-8 shadow-md">
                <h2 className="font-playfair text-2xl mb-6">Send Us a Message</h2>
                <ContactForm />
              </div>
            </Reveal>
            
            <Reveal direction="right">
              <div>
                <div className="bg-card rounded-lg p-8 shadow-md mb-8">
                  <h2 className="font-playfair text-2xl mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Studio Address</h3>
                        <address className="not-italic text-muted-foreground">
                          <p>5th Cross Road,Kumaraswamy Layout</p>
                          <p>Bengaluru,BLR,560078</p>
                        </address>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Email</h3>
                        <p className="text-muted-foreground">aakashpatra253@gmail.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                      <div>
                        <h3 className="font-medium mb-1">Phone</h3>
                        <p className="text-muted-foreground">+91 (886) 165-3961</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-medium mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                      <a 
                        href="https://www.instagram.com/aakaas.he/" 
                        className="bg-accent rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>

                      <a 
                        href="https://facebook.com/yourprofile" 
                        className="bg-accent rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>

                      <a 
                        href="https://x.com/AAKASHEXX" 
                        className="bg-accent rounded-full p-2 hover:bg-primary hover:text-primary-foreground transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg overflow-hidden h-64 relative">
                  <Image
                    src="/img/blr.JPG"
                    alt="Studio interior"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}