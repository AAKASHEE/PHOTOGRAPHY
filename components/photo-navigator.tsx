"use client"

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

interface PhotoItem {
  id: number
  title: string
  category: string
  image: string
  aspectRatio: string
}

interface PhotoNavigatorProps {
  photos: PhotoItem[]
  isOpen: boolean
  currentPhotoId: number | null
  onClose: () => void
  onPhotoChange: (photoId: number) => void
}

export function PhotoNavigator({ 
  photos, 
  isOpen, 
  currentPhotoId, 
  onClose, 
  onPhotoChange 
}: PhotoNavigatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  // Find current photo index
  useEffect(() => {
    if (currentPhotoId) {
      const index = photos.findIndex(photo => photo.id === currentPhotoId)
      if (index !== -1) {
        setCurrentIndex(index)
      }
    }
  }, [currentPhotoId, photos])

  // Navigate to previous photo
  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1
    setCurrentIndex(newIndex)
    onPhotoChange(photos[newIndex].id)
  }, [currentIndex, photos, onPhotoChange])

  // Navigate to next photo
  const goToNext = useCallback(() => {
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    onPhotoChange(photos[newIndex].id)
  }, [currentIndex, photos, onPhotoChange])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          goToPrevious()
          break
        case 'ArrowRight':
          event.preventDefault()
          goToNext()
          break
        case 'Escape':
          event.preventDefault()
          onClose()
          break
        default:
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, goToPrevious, goToNext, onClose])

  // Preload adjacent images for smooth navigation
  useEffect(() => {
    if (!isOpen || photos.length === 0) return

    const preloadImage = (src: string) => {
      const img = new window.Image()
      img.src = src
    }

    // Preload previous and next images
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1
    const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0

    if (photos[prevIndex]) preloadImage(photos[prevIndex].image)
    if (photos[nextIndex]) preloadImage(photos[nextIndex].image)
  }, [currentIndex, photos, isOpen])

  if (!isOpen || !photos[currentIndex]) return null

  const currentPhoto = photos[currentIndex]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Navigation buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full h-12 w-12"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full h-12 w-12"
            onClick={goToNext}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Photo container */}
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPhoto.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative max-w-full max-h-full"
              >
                <Image
                  src={currentPhoto.image}
                  alt={currentPhoto.title}
                  width={1200}
                  height={800}
                  className="object-contain max-w-full max-h-[80vh] rounded-lg"
                  onLoadStart={() => setIsLoading(true)}
                  onLoad={() => setIsLoading(false)}
                  priority
                />
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Photo info */}
          <div className="absolute bottom-4 left-4 right-4 z-50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/70 backdrop-blur-sm rounded-lg p-4 text-white"
            >
              <h3 className="text-xl font-medium mb-1">{currentPhoto.title}</h3>
              <p className="text-white/80 text-sm capitalize mb-2">{currentPhoto.category}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">
                  {currentIndex + 1} of {photos.length}
                </span>
                <div className="text-sm text-white/60">
                  Use ← → arrow keys to navigate
                </div>
              </div>
            </motion.div>
          </div>

          {/* Thumbnail strip */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50">
            <div className="flex space-x-2 bg-black/50 backdrop-blur-sm rounded-lg p-2 max-w-[80vw] overflow-x-auto">
              {photos.map((photo, index) => (
                <button
                  key={photo.id}
                  onClick={() => {
                    setCurrentIndex(index)
                    onPhotoChange(photo.id)
                  }}
                  className={cn(
                    "relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 transition-all",
                    index === currentIndex 
                      ? "ring-2 ring-white scale-110" 
                      : "opacity-60 hover:opacity-80"
                  )}
                >
                  <Image
                    src={photo.image}
                    alt={photo.title}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}