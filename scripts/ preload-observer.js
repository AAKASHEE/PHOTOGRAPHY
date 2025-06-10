// enhanced-image-loader.js
class EnhancedImageLoader {
  constructor(options = {}) {
    this.config = {
      rootMargin: options.rootMargin || '200px 0px',
      threshold: options.threshold || 0.01,
      cacheImages: options.cacheImages !== false, // Default to true
      preloadDistance: options.preloadDistance || 300, // pixels
      ...options
    };
    
    this.imageCache = new Map(); // Store loaded images
    this.loadingPromises = new Map(); // Track loading promises
    this.observer = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    
    document.addEventListener('DOMContentLoaded', () => {
      this.setupIntersectionObserver();
      this.observeImages();
      this.preloadCriticalImages();
    });
    
    this.isInitialized = true;
  }

  setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          // Keep observing to handle scroll back scenarios
        }
      });
    }, this.config);
  }

  observeImages() {
    const images = document.querySelectorAll('img[loading="lazy"], picture img[loading="lazy"]');
    images.forEach(img => {
      this.observer.observe(img);
      
      // Set up error handling
      img.addEventListener('error', (e) => {
        console.warn('Image failed to load:', e.target.src);
        this.handleImageError(e.target);
      });
    });
  }

  async loadImage(imgElement) {
    const imageId = this.getImageId(imgElement);
    
    // Check if already cached
    if (this.imageCache.has(imageId)) {
      this.applyImageFromCache(imgElement, imageId);
      return;
    }

    // Check if already loading
    if (this.loadingPromises.has(imageId)) {
      await this.loadingPromises.get(imageId);
      this.applyImageFromCache(imgElement, imageId);
      return;
    }

    // Start loading process
    const loadingPromise = this.fetchAndCacheImage(imgElement, imageId);
    this.loadingPromises.set(imageId, loadingPromise);
    
    try {
      await loadingPromise;
      this.applyImageFromCache(imgElement, imageId);
    } catch (error) {
      console.error('Failed to load image:', error);
      this.handleImageError(imgElement);
    } finally {
      this.loadingPromises.delete(imageId);
    }
  }

  async fetchAndCacheImage(imgElement, imageId) {
    const sources = this.getImageSources(imgElement);
    
    // Create preload links for better browser caching
    sources.forEach(src => this.createPreloadLink(src));
    
    if (this.config.cacheImages) {
      // Pre-fetch images into memory cache
      const cachePromises = sources.map(src => this.fetchImageToCache(src));
      await Promise.allSettled(cachePromises);
      
      // Store the sources in our cache
      this.imageCache.set(imageId, {
        sources,
        timestamp: Date.now(),
        element: imgElement.cloneNode(true) // Store element state
      });
    }
  }

  async fetchImageToCache(src) {
    try {
      const response = await fetch(src, {
        mode: 'cors',
        cache: 'force-cache' // Use browser cache aggressively
      });
      
      if (response.ok) {
        // Read the blob to ensure it's cached
        await response.blob();
      }
    } catch (error) {
      console.warn('Failed to pre-cache image:', src, error);
    }
  }

  getImageSources(imgElement) {
    const sources = [];
    
    // Handle picture element
    const picture = imgElement.closest('picture');
    if (picture) {
      const sourceElements = picture.querySelectorAll('source');
      sourceElements.forEach(source => {
        const srcset = source.getAttribute('srcset');
        if (srcset) {
          // Extract URLs from srcset
          const urls = srcset.split(',').map(s => s.trim().split(' ')[0]);
          sources.push(...urls);
        }
      });
    }
    
    // Add img src
    if (imgElement.src) sources.push(imgElement.src);
    if (imgElement.getAttribute('data-src')) sources.push(imgElement.getAttribute('data-src'));
    
    return [...new Set(sources)]; // Remove duplicates
  }

  getImageId(imgElement) {
    // Create unique ID based on src and srcset
    const picture = imgElement.closest('picture');
    if (picture) {
      const sources = Array.from(picture.querySelectorAll('source'))
        .map(s => s.getAttribute('srcset') || '')
        .join('|');
      return `picture_${btoa(sources + imgElement.src).slice(0, 16)}`;
    }
    return `img_${btoa(imgElement.src || imgElement.getAttribute('data-src') || '').slice(0, 16)}`;
  }

  createPreloadLink(src) {
    if (!src || document.querySelector(`link[href="${src}"]`)) return;
    
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.crossOrigin = 'anonymous'; // Handle CORS properly
    document.head.appendChild(link);
  }

  applyImageFromCache(imgElement, imageId) {
    const cached = this.imageCache.get(imageId);
    if (!cached) return;

    // Apply loading class for smooth transitions
    imgElement.classList.add('image-loading');
    
    // Set up load event listener
    const handleLoad = () => {
      imgElement.classList.remove('image-loading');
      imgElement.classList.add('image-loaded');
      imgElement.removeEventListener('load', handleLoad);
    };
    
    imgElement.addEventListener('load', handleLoad);
    
    // Trigger the actual image load if not already set
    if (imgElement.getAttribute('data-src')) {
      imgElement.src = imgElement.getAttribute('data-src');
      imgElement.removeAttribute('data-src');
    }
  }

  handleImageError(imgElement) {
    imgElement.classList.add('image-error');
    // Could implement fallback image logic here
  }

  preloadCriticalImages() {
    // Preload images that are likely to be viewed soon
    const criticalImages = document.querySelectorAll('img[loading="eager"], .hero img, .above-fold img');
    criticalImages.forEach(img => {
      if (!img.src && img.getAttribute('data-src')) {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
      }
    });
  }

  // Method to preload images in a specific container
  preloadContainer(container) {
    const images = container.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => this.loadImage(img));
  }

  // Clean up old cache entries
  cleanupCache(maxAge = 5 * 60 * 1000) { // 5 minutes default
    const now = Date.now();
    for (const [key, value] of this.imageCache.entries()) {
      if (now - value.timestamp > maxAge) {
        this.imageCache.delete(key);
      }
    }
  }

  // Get cache statistics
  getCacheStats() {
    return {
      cached: this.imageCache.size,
      loading: this.loadingPromises.size,
      memory: this.estimateCacheSize()
    };
  }

  estimateCacheSize() {
    // Rough estimation of cache size
    return this.imageCache.size * 0.1; // Assume average 100KB per entry
  }
}

// Enhanced version of the picture element generator with better caching attributes
function generateOptimizedPictureElement(imageName, alt = '', className = '', width = 1200, height = 800, eager = false) {
  const baseName = imageName.replace(/\.[^/.]+$/, ''); // Remove extension
  const loading = eager ? 'eager' : 'lazy';
  const decoding = eager ? 'sync' : 'async';
  
  return `<picture${className ? ` class="${className}"` : ''}>
  <source media="(max-width: 320px)" 
          srcset="/images/optimized/${baseName}-mobile.avif" 
          type="image/avif">
  <source media="(max-width: 768px)" 
          srcset="/images/optimized/${baseName}-tablet.avif" 
          type="image/avif">
  <source media="(max-width: 1200px)" 
          srcset="/images/optimized/${baseName}-desktop.avif" 
          type="image/avif">
  <source srcset="/images/optimized/${baseName}-large.avif" 
          type="image/avif">

  <source media="(max-width: 320px)" 
          srcset="/images/optimized/${baseName}-mobile.webp" 
          type="image/webp">
  <source media="(max-width: 768px)" 
          srcset="/images/optimized/${baseName}-tablet.webp" 
          type="image/webp">
  <source media="(max-width: 1200px)" 
          srcset="/images/optimized/${baseName}-desktop.webp" 
          type="image/webp">
  <source srcset="/images/optimized/${baseName}-large.webp" 
          type="image/webp">

  <img src="/images/optimized/${baseName}-desktop.jpg" 
       alt="${alt}" 
       class="${className}"
       loading="${loading}" 
       decoding="${decoding}" 
       width="${width}" 
       height="${height}" 
       style="max-width: 100%; height: auto;"
       crossorigin="anonymous">
</picture>`;
}

// Initialize the enhanced loader
const imageLoader = new EnhancedImageLoader({
  rootMargin: '300px 0px', // Start loading earlier
  threshold: 0.01,
  cacheImages: true
});

// Auto-initialize
imageLoader.init();

// Clean up cache periodically
setInterval(() => {
  imageLoader.cleanupCache();
}, 60000); // Every minute

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EnhancedImageLoader,
    generateOptimizedPictureElement,
    imageLoader
  };
}

// Add CSS for smooth loading transitions
const style = document.createElement('style');
style.textContent = `
  .image-loading {
    opacity: 0.7;
    transition: opacity 0.3s ease;
  }
  
  .image-loaded {
    opacity: 1;
  }
  
  .image-error {
    opacity: 0.5;
    background-color: #f5f5f5;
  }
  
  /* Prevent layout shift during loading */
  img[loading="lazy"] {
    min-height: 200px;
    background-color: #f8f9fa;
  }
`;
document.head.appendChild(style);