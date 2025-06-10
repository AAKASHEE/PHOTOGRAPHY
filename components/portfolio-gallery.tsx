"use client"

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { PhotoNavigator } from '@/components/photo-navigator'
import { cn } from '@/lib/utils'

// Sample portfolio data
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
  }
]

const categories = [
  { id: 'all', name: 'All' },
  { id: 'landscape', name: 'Landscape' },
  { id: 'portrait', name: 'Portrait' },
  { id: 'urban', name: 'Urban' },
  { id: 'event', name: 'Event' },
  { id: 'Foodie', name: 'Food' },
  { id: 'Pleasure', name: 'Leisure' }
]

export default function PortfolioGallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false)
  const [currentPhotoId, setCurrentPhotoId] = useState<number | null>(null)
  
  const filteredItems = activeCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === activeCategory)

  const handlePhotoClick = (photoId: number) => {
    setCurrentPhotoId(photoId)
    setIsNavigatorOpen(true)
  }

  const handlePhotoChange = (photoId: number) => {
    setCurrentPhotoId(photoId)
  }

  const handleCloseNavigator = () => {
    setIsNavigatorOpen(false)
    setCurrentPhotoId(null)
  }

  return (
    <div className="space-y-8">
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
      
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={cn(
                "relative cursor-pointer group overflow-hidden rounded-md",
                item.aspectRatio
              )}
              onClick={() => handlePhotoClick(item.id)}
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
                <div className="mt-1 text-xs text-white/60">
                  Click to view • Use arrow keys to navigate
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <PhotoNavigator
        photos={filteredItems}
        isOpen={isNavigatorOpen}
        currentPhotoId={currentPhotoId}
        onClose={handleCloseNavigator}
        onPhotoChange={handlePhotoChange}
      />
    </div>
  )
}