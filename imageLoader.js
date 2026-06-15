export default function customLoader({ src, width, quality }) {
  if (process.env.NODE_ENV === 'development') {
    return src;
  }

  if (
    src.startsWith('http://') ||
    src.startsWith('https://') ||
    src.startsWith('data:') ||
    src.startsWith('blob:')
  ) {
    return src;
  }

  let cleanSrc = src;
  if (src.startsWith('/')) {
    cleanSrc = src.substring(1);
  }

  // Map requested width to responsive suffix
  let suffix = '-desktop';
  if (width <= 320) {
    suffix = '-mobile';
  } else if (width <= 768) {
    suffix = '-tablet';
  } else if (width <= 1200) {
    suffix = '-desktop';
  } else {
    suffix = '-large';
  }

  const lastDot = cleanSrc.lastIndexOf('.');
  const pathWithoutExt = lastDot !== -1 ? cleanSrc.substring(0, lastDot) : cleanSrc;
  
  return `/optimized/${pathWithoutExt}${suffix}.webp`;
}