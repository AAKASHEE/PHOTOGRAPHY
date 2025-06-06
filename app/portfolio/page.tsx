"use client"

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Reveal } from '@/components/parallax-section'
import { cn } from '@/lib/utils'

// Sample extended portfolio data
const portfolioItems = [
  {
    id: 1,
    title: 'Sky Is the Limit',
    category: 'landscape',
    image: '/img/IMG_0277.jpg',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: 2,
    title: 'Glasses but fragile',
    category: 'urban',
    image: '/img/IMG_0313.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 3,
    title: 'Portrait of Me',
    category: 'portrait',
    image: '/img/00562eb5-e56e-4884-880a-dcc474e3c445.JPG',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: 4,
    title: 'Desert Solitude',
    category: 'landscape',
    image: 'https://images.pexels.com/photos/1592119/pexels-photo-1592119.jpeg',
    aspectRatio: 'aspect-[4/3]',
  },
  {
    id: 5,
    title: 'Leisure',
    category: 'event',
    image: '/img/IMG_0539.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 6,
    title: 'Street Light',
    category: 'urban',
    image: '/img/IMG_0553.jpg',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    id: 7,
    title: 'Birthday Celebration',
    category: 'event',
    image: '/img/IMG_1392.JPG',
    aspectRatio: 'portrait',
  },
  {
    id: 8,
    title: 'Taste buds',
    category: 'Foodie',
    image: '/img/IMG_1217.JPG',
    aspectRatio: 'aspect-square',
  },
  {
    id: 9,
    title: 'Dominoes',
    category: 'Pleasure',
    image: '/img/IMG_6504.JPG',
    aspectRatio: 'aspect-square',
  },
  {
    id: 10,
    title: 'Taste Buds',
    category: 'Foodie',
    image: '/img/IMG_0554.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 11,
    title: 'Blossoms',
    category: 'landscape',
    image: '/img/IMG_0290.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 12,
    title: 'Enjoy the View',
    category: 'landscape',
    image: '/img/IMG_1721.JPG',
    aspectRatio: 'aspect-square',
  },
  {
    id: 13,
    title: 'dance by thy rhythm',
    category: 'happiness',
    image: '/img/IMG_1454.JPG',
    aspectRatio: 'aspect-square',
  },
  {
    id: 14,
    title: 'Sit by thy silence',
    category: 'self portrait',
    image: '/img/IMG_2249.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 15,
    title: 'Creativity',
    category: 'fun',
    image: '/img/IMG_0187.jpg',
    aspectRatio: 'aspect-square',
  },
   {
    id: 16,
    title: 'Cat and Mouse',
    category: 'landscape',
    image: '/img/IMG_6563.JPG',
    aspectRatio: 'aspect-square',
  },
  {
    id: 17,
    title: 'New Horizons',
    category: 'Escape',
    image: '/img/IMG_1247.JPG',
    aspectRatio: 'aspect-square',
  },
   {
    id: 18,
    title: 'Thy Within',
    category: 'Greater Good',
    image: '/img/IMG_2184.JPG',
    aspectRatio: 'aspect-square',
  },
   {
    id: 19,
    title: 'Funky Vibes',
    category: 'Restro',
    image: '/img/IMG_0310.jpg',
    aspectRatio: 'aspect-square',
  },
   {
    id: 20,
    title: 'Fly me to the Moon',
    category: 'And let me play among the Stars',
    image: '/img/IMG_1733.JPG',
    aspectRatio: 'aspect-square',
  },
  {
    id: 21,
    title: 'Neither here nor there',
    category: 'Inside your mind',
    image: '/img/IMG_2187.JPG',
    aspectRatio: 'aspect-square',
  },
   {
    id: 22,
    title: 'Ice cream or cake',
    category: 'OFC ',
    image: '/img/IMG_0375.jpg',
    aspectRatio: 'aspect-square',
  },
  {
    id: 23,
    title: 'Stay with me ',
    category: 'Hold My Hand',
    image: '/img/IMG_6164.JPG',
    aspectRatio: 'aspect-square',
  },
  {
    id: 24,
    title: 'SPACE',
    category: 'STILLNESS',
    image: '/img/IMG_1915.JPG',
    aspectRatio: 'aspect-square',
  },
]

const categories = [
  { id: 'all', name: 'All' },
  { id: 'landscape', name: 'Landscape' },
  { id: 'portrait', name: 'Portrait' },
  { id: 'urban,Hold My Hand', name: 'Urban' },
  { id: 'event', name: 'Event' },
  { id: 'And let me play among the Stars', name: 'Space' },
  { id: 'Inside your mind', name: 'BRAIN' },
]

interface GalleryItemProps {
  item: typeof portfolioItems[0]
}

const GalleryItem = ({ item }: GalleryItemProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "relative cursor-pointer group overflow-hidden rounded-md",
            item.aspectRatio
          )}
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
          <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-white text-lg font-medium">{item.title}</h3>
            <p className="text-white/80 text-sm capitalize">{item.category}</p>
          </div>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="max-w-5xl p-0 bg-transparent border-none">
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-contain rounded-lg"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  
  const filteredItems = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory)
  
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Reveal>
            <h1 className="font-playfair text-4xl md:text-5xl mb-4">Our Portfolio</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-muted-foreground">
              Explore our diverse collection of photography work across various styles and subjects.
            </p>
          </Reveal>
        </div>
        
        <div className="space-y-12">
          <Reveal>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveCategory(category.id)}
                  className="capitalize"
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </Reveal>
          
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <GalleryItem key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}