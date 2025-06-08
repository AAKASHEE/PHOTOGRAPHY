"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { Reveal } from '@/components/parallax-section'

const services = [
  {
    id: 1,
    title: 'Wedding Photography',
    description: 'Capture the magic of your special day with stunning, emotional photography that tells your unique love story.',
    image: '/img/wedding.png',
    price: 'From $2,500',
  },
  {
    id: 2,
    title: 'Portrait Sessions',
    description: 'Professional portraits that capture your authentic self, perfect for personal branding or family keepsakes.',
    image: '/portratit.png',
    price: 'From $350',
  },
  {
    id: 3,
    title: 'Commercial Photography',
    description: 'Elevate your brand with high-quality images that showcase your products and services in their best light.',
    image: '/commerial.png',
    price: 'From $800',
  },
]

export default function ServicesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {services.map((service, index) => (
        <Reveal key={service.id} delay={index * 0.2}>
          <Card className="overflow-hidden border-none shadow-lg">
            <div className="relative h-64">
              <Image 
                src={service.image} 
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{service.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Book Now</Button>
            </CardFooter>
          </Card>
        </Reveal>
      ))}
    </div>
  )
}