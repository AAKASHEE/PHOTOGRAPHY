const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  try {
    // Try to load sharp, skip if not available
    const sharp = require('sharp');
    
    const inputDir = './public/images';
    const outputDir = './public/images/optimized';
    
    if (!fs.existsSync(inputDir)) {
      console.log('Input directory does not exist, skipping optimization');
      return;
    }
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const files = fs.readdirSync(inputDir);
    
    for (const file of files) {
      if (file.match(/\.(jpg|jpeg|png)$/i)) {
        const inputPath = path.join(inputDir, file);
        const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
        
        await sharp(inputPath)
          .resize(1920, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);
        
        console.log(`Optimized: ${file}`);
      }
    }
    
    console.log('Image optimization completed');
  } catch (error) {
    console.log('Sharp not available or error during optimization:', error.message);
    console.log('Skipping image optimization...');
  }
}

optimizeImages().catch(console.error);