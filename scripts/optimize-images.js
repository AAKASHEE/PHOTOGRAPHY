// integrated-image-system.js
const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const os = require('os');

// Configuration
const CONFIG = {
  inputDir: './public/images',
  outputDir: './public/images/optimized',
  maxConcurrency: Math.min(os.cpus().length, 4),
  supportedFormats: /\.(jpg|jpeg|png|webp|avif|tiff?)$/i,
  sizes: [
    { width: 320, suffix: '-mobile', quality: 75 },
    { width: 768, suffix: '-tablet', quality: 80 },
    { width: 1200, suffix: '-desktop', quality: 85 },
    { width: 1920, suffix: '-large', quality: 80 }
  ],
  formats: [
    { ext: 'avif', quality: 70, options: { effort: 4 } },
    { ext: 'webp', quality: 80, options: {} },
    { ext: 'jpg', quality: 85, options: { mozjpeg: true } }
  ],
  generateServiceWorker: true,
  cacheStrategy: 'cache-first',
  maxCacheAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

class ImageProcessor {
  constructor() {
    this.sharp = null;
    this.processedCount = 0;
    this.totalFiles = 0;
    this.manifest = {
      generated: new Date().toISOString(),
      images: {},
      sizes: CONFIG.sizes.map(s => ({ width: s.width, suffix: s.suffix })),
      formats: CONFIG.formats.map(f => f.ext),
      totalProcessed: 0
    };
  }

  async initialize() {
    try {
      this.sharp = require('sharp');
      this.sharp.cache({ items: 100, memory: 100 * 1024 * 1024 });
      this.sharp.concurrency(1);
      return true;
    } catch (error) {
      console.log('Sharp not available:', error.message);
      return false;
    }
  }

  async ensureDirectories() {
    if (!fsSync.existsSync(CONFIG.inputDir)) {
      console.log('Input directory does not exist');
      return false;
    }
    if (!fsSync.existsSync(CONFIG.outputDir)) {
      await fs.mkdir(CONFIG.outputDir, { recursive: true });
    }
    return true;
  }

  async getImageFiles() {
    try {
      const files = await fs.readdir(CONFIG.inputDir);
      return files.filter(file => CONFIG.supportedFormats.test(file));
    } catch (error) {
      console.error('Error reading directory:', error);
      return [];
    }
  }

  async getImageMetadata(inputPath) {
    try {
      const metadata = await this.sharp(inputPath).metadata();
      return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: metadata.size
      };
    } catch (error) {
      console.error(`Metadata error (${inputPath}):`, error.message);
      return null;
    }
  }

  async processImage(file) {
    const inputPath = path.join(CONFIG.inputDir, file);
    const baseName = path.parse(file).name;
    
    try {
      const metadata = await this.getImageMetadata(inputPath);
      if (!metadata) return;

      const originalSize = (await fs.stat(inputPath)).size;
      console.log(`Processing: ${file} (${metadata.width}x${metadata.height}, ${(originalSize / 1024).toFixed(1)}KB)`);

      this.manifest.images[baseName] = {
        original: {
          width: metadata.width,
          height: metadata.height,
          format: metadata.format,
          size: originalSize
        },
        variants: {}
      };

      for (const size of CONFIG.sizes) {
        if (metadata.width <= size.width) {
          if (size === CONFIG.sizes[CONFIG.sizes.length - 1]) {
            await this.generateFormats(inputPath, baseName, size, metadata.width);
          }
          continue;
        }
        await this.generateFormats(inputPath, baseName, size, size.width);
      }

      this.processedCount++;
      const progress = ((this.processedCount / this.totalFiles) * 100).toFixed(1);
      console.log(`✓ Completed ${file} [${progress}%]`);
    } catch (error) {
      console.error(`Error processing ${file}:`, error.message);
    }
  }

  async generateFormats(inputPath, baseName, sizeConfig, targetWidth) {
    const pipeline = this.sharp(inputPath)
      .resize(targetWidth, null, { withoutEnlargement: true, fastShrinkOnLoad: true });

    const variants = {};

    for (const format of CONFIG.formats) {
      const outputFileName = `${baseName}${sizeConfig.suffix}.${format.ext}`;
      const outputPath = path.join(CONFIG.outputDir, outputFileName);

      try {
        let formatPipeline = pipeline.clone();

        switch (format.ext) {
          case 'avif':
            formatPipeline = formatPipeline.avif({ quality: format.quality, ...format.options });
            break;
          case 'webp':
            formatPipeline = formatPipeline.webp({ quality: format.quality, ...format.options });
            break;
          case 'jpg':
            formatPipeline = formatPipeline.jpeg({ quality: format.quality, progressive: true, ...format.options });
            break;
        }

        await formatPipeline.toFile(outputPath);
        const stats = await fs.stat(outputPath);
        variants[`${sizeConfig.suffix.slice(1)}_${format.ext}`] = {
          path: `/images/optimized/${outputFileName}`,
          size: stats.size,
          width: targetWidth
        };
      } catch (error) {
        console.error(`Error generating ${format.ext} for ${baseName}:`, error.message);
      }
    }

    if (!this.manifest.images[baseName].variants[sizeConfig.suffix.slice(1)]) {
      this.manifest.images[baseName].variants[sizeConfig.suffix.slice(1)] = variants;
    }
  }

  async processImagesConcurrently(files) {
    this.totalFiles = files.length;
    console.log(`Processing ${files.length} images with ${CONFIG.maxConcurrency} workers...`);
    const batches = [];

    for (let i = 0; i < files.length; i += CONFIG.maxConcurrency) {
      batches.push(files.slice(i, i + CONFIG.maxConcurrency));
    }

    for (const batch of batches) {
      const promises = batch.map(file => this.processImage(file));
      await Promise.all(promises);
    }
  }

  async generateManifest() {
    try {
      this.manifest.totalProcessed = this.processedCount;
      this.manifest.cacheStrategy = CONFIG.cacheStrategy;
      this.manifest.maxCacheAge = CONFIG.maxCacheAge;

      await fs.writeFile(
        path.join(CONFIG.outputDir, 'manifest.json'),
        JSON.stringify(this.manifest, null, 2)
      );
      console.log('Generated enhanced manifest.json');
    } catch (error) {
      console.error('Manifest generation error:', error.message);
    }
  }

  async generateServiceWorker() {
    if (!CONFIG.generateServiceWorker) return;

    const swContent = `
// Auto-generated Service Worker for Image Caching
const CACHE_NAME = 'images-v${Date.now()}';
const CACHE_STRATEGY = '${CONFIG.cacheStrategy}';
const MAX_CACHE_AGE = ${CONFIG.maxCacheAge};

const IMAGE_PATHS = [
${Object.values(this.manifest.images).map(img =>
  Object.values(img.variants).map(variants =>
    Object.values(variants).map(variant => `  '${variant.path}'`).join(',\n')
  ).join(',\n')
).join(',\n')}
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(IMAGE_PATHS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.map(name =>
        name !== CACHE_NAME ? caches.delete(name) : null
      ))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.destination === 'image') {
    event.respondWith(handleImageRequest(event.request));
  }
});

async function handleImageRequest(request) {
  const cache = await caches.open(CACHE_NAME);
  if (CACHE_STRATEGY === 'cache-first') {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      const cacheDate = new Date(cachedResponse.headers.get('date'));
      const isExpired = Date.now() - cacheDate.getTime() > MAX_CACHE_AGE;
      if (!isExpired) return cachedResponse;
    }
  }
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response('Image not found', { status: 404 });
  }
}`;

    try {
      await fs.writeFile('./public/sw-images.js', swContent);
      console.log('Generated service worker for image caching');
    } catch (error) {
      console.error('Service worker generation error:', error.message);
    }
  }
}

function generateEnhancedPictureElement(imageName, alt = '', className = '', width = 1200, height = 800, preload = false, eager = false) {
  const baseName = path.parse(imageName).name;
  const loading = eager ? 'eager' : 'lazy';
  const decoding = eager ? 'sync' : 'async';
  const fetchPriority = preload ? 'high' : 'auto';

  let preloadLinks = '';
  if (preload) {
    preloadLinks = `
<link rel="preload" as="image" href="/images/optimized/${baseName}-desktop.avif" type="image/avif">
<link rel="preload" as="image" href="/images/optimized/${baseName}-desktop.webp" type="image/webp">`;
  }

  return preloadLinks + `
<picture${className ? ` class="${className}"` : ''}>
  <source media="(max-width: 320px)" srcset="/images/optimized/${baseName}-mobile.avif" type="image/avif">
  <source media="(max-width: 768px)" srcset="/images/optimized/${baseName}-tablet.avif" type="image/avif">
  <source media="(max-width: 1200px)" srcset="/images/optimized/${baseName}-desktop.avif" type="image/avif">
  <source srcset="/images/optimized/${baseName}-large.avif" type="image/avif">

  <source media="(max-width: 320px)" srcset="/images/optimized/${baseName}-mobile.webp" type="image/webp">
  <source media="(max-width: 768px)" srcset="/images/optimized/${baseName}-tablet.webp" type="image/webp">
  <source media="(max-width: 1200px)" srcset="/images/optimized/${baseName}-desktop.webp" type="image/webp">
  <source srcset="/images/optimized/${baseName}-large.webp" type="image/webp">

  <img src="/images/optimized/${baseName}-desktop.jpg" alt="${alt}" class="${className}"
       loading="${loading}" decoding="${decoding}" fetchpriority="${fetchPriority}"
       width="${width}" height="${height}" style="max-width: 100%; height: auto;" crossorigin="anonymous">
</picture>`;
}

async function optimizeImages() {
  const startTime = Date.now();
  const processor = new ImageProcessor();

  try {
    console.log('🚀 Starting enhanced image optimization with caching...');
    if (!(await processor.initialize())) return;
    if (!(await processor.ensureDirectories())) return;

    const files = await processor.getImageFiles();
    if (files.length === 0) {
      console.log('No images found');
      return;
    }

    await processor.processImagesConcurrently(files);
    await processor.generateManifest();
    await processor.generateServiceWorker();

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Completed ${processor.processedCount} images in ${duration}s`);

    if (files.length > 0) {
      console.log('\n📝 Example HTML usage (preload):\n');
      console.log(generateEnhancedPictureElement(files[0], 'Hero Image', 'hero-image', 1200, 800, true, true));
      console.log('\n📝 Example HTML usage (lazy):\n');
      console.log(generateEnhancedPictureElement(files[0], 'Gallery Image', 'gallery-image'));
    }

    console.log('\n🔧 To enable the service worker, add this to your HTML:');
    console.log(`<script>
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw-images.js')
    .then(reg => console.log('Image SW registered'))
    .catch(err => console.log('Image SW registration failed'));
}
</script>`);
  } catch (error) {
    console.error('❌ Optimization error:', error.message);
  }
}

module.exports = {
  optimizeImages,
  generateEnhancedPictureElement,
  ImageProcessor,
  CONFIG
};

if (require.main === module) {
  optimizeImages().catch(console.error);
}
