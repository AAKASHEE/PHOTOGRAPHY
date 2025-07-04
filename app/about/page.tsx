"use client";

import Image from 'next/image'
import { Camera, Award, Clock, Users } from 'lucide-react'
import { Reveal, ParallaxSection } from '@/components/parallax-section'
import ProfileCard from '../../components/ProfileCard'; 

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Reveal>
              <h1 className="font-playfair text-4xl md:text-5xl mb-4">About SNapDart</h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-muted-foreground">
                We are a team of passionate photographers dedicated to capturing the beauty in every moment.
              </p>
            </Reveal>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <Reveal direction="left">
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <Image 
                  src="/eyes.jpg" 
                  alt="Photographer at work" 
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Reveal>
            
            <Reveal direction="right">
              <div>
                <h2 className="font-playfair text-3xl mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    SNapDart Photography was founded in 2025 by Aakashe with a simple mission: to capture life&apos;s most precious moments through storytelling in each of our photographs.
                  </p>
                  <p>
                    What began as a solo venture has grown into a team of talented photographers, each bringing their unique perspective and specialized skills to our collective work.
                  </p>
                  <p>
                    Over the years, we&apos;ve had the privilege of working with many clients, from couples celebrating their wedding day to brands seeking to elevate their visual presence.
                  </p>
                  <p>
                    Our approach combines technical excellence with a deeply personal touch. We believe that the best photographs emerge when subjects feel comfortable and authentic, allowing us to capture genuine emotions and connections.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            <Reveal delay={0.1}>
              <div className="bg-card rounded-lg p-6 text-center shadow-sm">
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                  <Camera className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">50+</h3>
                <p className="text-muted-foreground">Photography Sessions</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="bg-card rounded-lg p-6 text-center shadow-sm">
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">A+</h3>
                <p className="text-muted-foreground">Industry Recognition</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.3}>
              <div className="bg-card rounded-lg p-6 text-center shadow-sm">
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">2 Years</h3>
                <p className="text-muted-foreground">Professional Experience</p>
              </div>
            </Reveal>
            
            <Reveal delay={0.4}>
              <div className="bg-card rounded-lg p-6 text-center shadow-sm">
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">25+</h3>
                <p className="text-muted-foreground">Happy Clients</p>
              </div>
            </Reveal>
          </div>
          
          <div className="mb-20">
            <Reveal>
              <h2 className="font-playfair text-3xl text-center mb-12">Meet Our Team</h2>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Reveal delay={0.1}>
                <ProfileCard
                  avatarUrl="/IMG_2434.jpg"
                  miniAvatarUrl="/IMG_2434.jpg"
                  name="Aakashe"
                  title="Founder & Lead Photographer"
                  handle="aakaas.he"
                  status="Available"
                  contactText="Contact"
                  showUserInfo={true}
                  enableTilt={true}
                  behindGradient="linear-gradient(to bottom, #000000, #434343)"
                  innerGradient="linear-gradient(to right, #f5f7fa, #c3cfe2)"
                  onContactClick={() => {
                    console.log('Contact Aakashe clicked');
                  }}
                />
              </Reveal>

              <Reveal delay={0.2}>
                <ProfileCard
                  avatarUrl="/IMG_2388.jpg"
                  miniAvatarUrl="/IMG_2388.jpg"
                  name="Arshia Sharma"
                  title="Lead Photographer"
                  handle="_arshi.a__"
                  status="Available"
                  contactText="Contact"
                  showUserInfo={true}
                  enableTilt={true}
                  behindGradient="linear-gradient(to bottom, #000000, #434343)"
                  innerGradient="linear-gradient(to right, #f5f7fa, #c3cfe2)"
                  onContactClick={() => {
                    console.log('Contact Arshia clicked');
                  }}
                />
              </Reveal>

              <Reveal delay={0.3}>
                <ProfileCard
                  avatarUrl="/placeholder-avatar.jpg"
                  miniAvatarUrl="/placeholder-avatar.jpg"
                  name="Marcus"
                  title="Commercial Photographer"
                  handle="marcus_photos"
                  status="Available"
                  contactText="Contact"
                  showUserInfo={true}
                  enableTilt={true}
                  behindGradient="linear-gradient(to bottom, #000000, #434343)"
                  innerGradient="linear-gradient(to right, #f5f7fa, #c3cfe2)"
                  onContactClick={() => {
                    console.log('Contact Marcus clicked');
                  }}
                />
              </Reveal>
            </div>
          </div>
          
          <div>
            <Reveal>
              <h2 className="font-playfair text-3xl text-center mb-8">Our Equipment</h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                We use only professional-grade equipment to ensure the highest quality results for every project.
              </p>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Reveal direction="left">
                <div className="bg-card rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-medium mb-4">Cameras</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                      Canon EOS R5 Mirrorless
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                      Sony Alpha a7R IV
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                      Nikon Z9 Mirrorless
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                      Fujifilm GFX 100S Medium Format
                    </li>
                  </ul>
                </div>
              </Reveal>
              
              <Reveal direction="right">
                <div className="bg-card rounded-lg p-6 shadow-sm">
                  <h3 className="text-xl font-medium mb-4">Lenses</h3>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                      Canon RF 24-70mm f/2.8L IS USM
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                      Sony FE 70-200mm f/2.8 GM OSS
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                      Nikon NIKKOR Z 85mm f/1.8 S
                    </li>
                    <li className="flex items-center">
                      <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
                      Sigma 35mm f/1.4 DG HSM Art
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
      
      <ParallaxSection speed={0.05} className="relative h-[400px] overflow-hidden">
        <Image 
          src="https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg" 
          alt="Camera equipment" 
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <Reveal>
            <h2 className="font-playfair text-3xl md:text-4xl mb-6 text-center max-w-2xl">
              Ready to work with us?
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <a href="/contact" className="bg-white text-black px-8 py-3 rounded-md font-medium hover:bg-white/90 transition-colors">
              Get in Touch
            </a>
          </Reveal>
        </div>
      </ParallaxSection>
    </>
  )
}