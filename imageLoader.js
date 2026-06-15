export default function customLoader({ src, width, quality }) {
  // In development, always use original
  if (process.env.NODE_ENV === 'development') {
    return src;
  }

  // External URLs — pass through unchanged
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
  const optimizedPath = `/optimized/${pathWithoutExt}${suffix}.webp`;

  // If we know the optimized file exists (set by build step), use it.
  // Otherwise fall back to the original src to avoid 404s on Vercel.
  if (process.env.NEXT_PUBLIC_USE_OPTIMIZED_IMAGES === 'true') {
    return optimizedPath;
  }

  // Default: serve original — still benefits from correct `sizes` in components
  return src;
}