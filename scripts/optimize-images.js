const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const os = require('os');

// Configuration
const CONFIG = {
  publicDir: './public',
  outputBaseDir: './public/optimized',
  maxConcurrency: Math.min(os.cpus().length, 4),
  supportedFormats: /\.(jpg|jpeg|png|webp|tiff?)$/i,
  sizes: [
    { width: 320, suffix: '-mobile', quality: 75 },
    { width: 768, suffix: '-tablet', quality: 80 },
    { width: 1200, suffix: '-desktop', quality: 85 },
    { width: 1920, suffix: '-large', quality: 80 }
  ],
  formats: [
    { ext: 'webp', quality: 80, options: {} },
    { ext: 'jpg', quality: 85, options: { mozjpeg: true } }
  ],
  generateServiceWorker: true,
  cacheStrategy: 'cache-first',
  maxCacheAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

async function getFilesRecursively(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(dirents.map((dirent) => {
    const res = path.resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      // Ignore output/cache/metadata directories
      if (
        dirent.name === 'optimized' ||
        dirent.name === '.next' ||
        dirent.name === 'node_modules' ||
        dirent.name === '.git'
      ) {
        return [];
      }
      return getFilesRecursively(res);
    } else {
      return res;
    }
  }));
  return files.flat();
}

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
    if (!fsSync.existsSync(CONFIG.publicDir)) {
      console.log('Public directory does not exist');
      return false;
    }
    if (!fsSync.existsSync(CONFIG.outputBaseDir)) {
      await fs.mkdir(CONFIG.outputBaseDir, { recursive: true });
    }
    return true;
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

  async processImage(filePath) {
    const relativePath = path.relative(CONFIG.publicDir, filePath);
    const outputRelDir = path.dirname(relativePath);
    const outputDir = path.join(CONFIG.outputBaseDir, outputRelDir);
    const baseName = path.parse(filePath).name;

    try {
      const originalStats = await fs.stat(filePath);
      const originalMtime = originalStats.mtimeMs;

      const metadata = await this.getImageMetadata(filePath);
      if (!metadata) return;

      this.manifest.images[relativePath.replace(/\\/g, '/')] = {
        original: {
          width: metadata.width,
          height: metadata.height,
          format: metadata.format,
          size: originalStats.size
        },
        variants: {}
      };

      for (const size of CONFIG.sizes) {
        if (metadata.width <= size.width) {
          if (size === CONFIG.sizes[CONFIG.sizes.length - 1]) {
            await this.generateFormats(filePath, outputDir, baseName, size, metadata.width, originalMtime, relativePath);
          }
          continue;
        }
        await this.generateFormats(filePath, outputDir, baseName, size, size.width, originalMtime, relativePath);
      }

      this.processedCount++;
      const progress = ((this.processedCount / this.totalFiles) * 100).toFixed(1);
      console.log(`✓ Completed ${relativePath} [${progress}%]`);
    } catch (error) {
      console.error(`Error processing ${relativePath}:`, error.message);
    }
  }

  async generateFormats(inputPath, outputDir, baseName, sizeConfig, targetWidth, originalMtime, relativePath) {
    await fs.mkdir(outputDir, { recursive: true });
    const pipeline = this.sharp(inputPath)
      .resize(targetWidth, null, { withoutEnlargement: true, fastShrinkOnLoad: true });

    const variants = {};
    const keyPath = relativePath.replace(/\\/g, '/');

    for (const format of CONFIG.formats) {
      const outputFileName = `${baseName}${sizeConfig.suffix}.${format.ext}`;
      const outputPath = path.join(outputDir, outputFileName);

      // Cache check
      let shouldProcess = true;
      try {
        const stats = await fs.stat(outputPath);
        if (stats.mtimeMs >= originalMtime && stats.size > 0) {
          shouldProcess = false;
        }
      } catch (err) {
        // Output file doesn't exist
      }

      try {
        if (shouldProcess) {
          let formatPipeline = pipeline.clone();

          switch (format.ext) {
            case 'webp':
              formatPipeline = formatPipeline.webp({ quality: format.quality, ...format.options });
              break;
            case 'jpg':
              formatPipeline = formatPipeline.jpeg({ quality: format.quality, progressive: true, ...format.options });
              break;
          }

          await formatPipeline.toFile(outputPath);
        }

        const stats = await fs.stat(outputPath);
        const manifestRelativePath = '/optimized/' + path.relative(CONFIG.outputBaseDir, outputPath).replace(/\\/g, '/');

        variants[`${sizeConfig.suffix.slice(1)}_${format.ext}`] = {
          path: manifestRelativePath,
          size: stats.size,
          width: targetWidth
        };
      } catch (error) {
        console.error(`Error generating ${format.ext} for ${baseName}:`, error.message);
      }
    }

    if (!this.manifest.images[keyPath].variants[sizeConfig.suffix.slice(1)]) {
      this.manifest.images[keyPath].variants[sizeConfig.suffix.slice(1)] = variants;
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
        path.join(CONFIG.outputBaseDir, 'manifest.json'),
        JSON.stringify(this.manifest, null, 2)
      );
      console.log('Generated enhanced manifest.json');
    } catch (error) {
      console.error('Manifest generation error:', error.message);
    }
  }

  async generateServiceWorker() {
    if (!CONFIG.generateServiceWorker) return;

    const imagePaths = [];
    for (const img of Object.values(this.manifest.images)) {
      for (const sizeVariants of Object.values(img.variants)) {
        for (const variant of Object.values(sizeVariants)) {
          if (variant.path) {
            imagePaths.push(variant.path);
          }
        }
      }
    }

    const swContent = `// Auto-generated Service Worker for Image Caching
const CACHE_NAME = 'images-v${Date.now()}';
const CACHE_STRATEGY = '${CONFIG.cacheStrategy}';
const MAX_CACHE_AGE = ${CONFIG.maxCacheAge};

const IMAGE_PATHS = [
${imagePaths.map(p => `  '${p}'`).join(',\n')}
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
      await fs.writeFile(path.join(CONFIG.publicDir, 'sw-images.js'), swContent);
      console.log('Generated service worker for image caching at public/sw-images.js');
    } catch (error) {
      console.error('Service worker generation error:', error.message);
    }
  }
}

async function optimizeImages() {
  const startTime = Date.now();
  const processor = new ImageProcessor();

  try {
    console.log('🚀 Starting recursive image optimization with caching...');
    if (!(await processor.initialize())) return;
    if (!(await processor.ensureDirectories())) return;

    const allFiles = await getFilesRecursively(CONFIG.publicDir);
    const files = allFiles.filter(file => {
      const ext = path.extname(file);
      return CONFIG.supportedFormats.test(ext);
    });

    if (files.length === 0) {
      console.log('No images found');
      return;
    }

    await processor.processImagesConcurrently(files);
    await processor.generateManifest();
    await processor.generateServiceWorker();

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`✅ Completed ${processor.processedCount} images in ${duration}s`);
  } catch (error) {
    console.error('❌ Optimization error:', error.message);
  }
}

module.exports = {
  optimizeImages,
  ImageProcessor,
  CONFIG
};

if (require.main === module) {
  optimizeImages().catch(console.error);
}
