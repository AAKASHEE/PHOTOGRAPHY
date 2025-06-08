import { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, className, priority = false, ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef();

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  return (
    <div ref={imgRef} className={className}>
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;