"use client"

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { PhotoNavigator } from '@/components/photo-navigator'
import { cn } from '@/lib/utils'

interface PhotoItem {
  id: number
  title: string
  category: string
  image: string
  aspectRatio: string
}

interface EnhancedGalleryProps {
  photos: PhotoItem[]
  categories: Array<{ id: string; name: string }>
}

export function EnhancedGallery({ photos, categories }: EnhancedGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false)
  const [currentPhotoId, setCurrentPhotoId] = useState<number | null>(null)
  
  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === activeCategory)

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
      {/* Category filters */}
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
      
      {/* Photo grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredPhotos.map((photo) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "relative cursor-pointer group overflow-hidden rounded-lg shadow-lg",
                photo.aspectRatio
              )}
              onClick={() => handlePhotoClick(photo.id)}
            >
              <Image
                src={photo.image}
                alt={photo.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Photo info */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-lg font-medium mb-1">{photo.title}</h3>
                <p className="text-white/80 text-sm capitalize">{photo.category}</p>
                <div className="mt-2 text-xs text-white/60">
                  Click to view • Use arrow keys to navigate
                </div>
              </div>

              {/* Click indicator */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Photo Navigator */}
      <PhotoNavigator
        photos={filteredPhotos}
        isOpen={isNavigatorOpen}
        currentPhotoId={currentPhotoId}
        onClose={handleCloseNavigator}
        onPhotoChange={handlePhotoChange}
      />
    </div>
  )
}