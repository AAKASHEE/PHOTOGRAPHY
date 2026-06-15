import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import CustomCursor from '@/components/CustomCursor';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import PageTransition from '@/components/PageTransition';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const IMAGE_PATH = '/img/b.png';

export const metadata: Metadata = {
  metadataBase: new URL('https://snapdart.vercel.app'),
  title: 'SNapDart - Photography',
  description:
    'Professional photography portfolio showcasing breathtaking moments captured through the lens',
  openGraph: {
    title: 'SNapDart - Photography',
    description:
      'Professional photography portfolio showcasing breathtaking moments captured through the lens',
    url: IMAGE_PATH,
    siteName: 'SNapDart Photography',
    images: [
      {
        url: IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: 'SNapDart Photography Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SNapDart - Photography',
    description:
      'Professional photography portfolio showcasing breathtaking moments captured through the lens',
    images: [IMAGE_PATH],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Theme and Tiles */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: 'SNapDart Photography',
              description:
                'Professional photography portfolio showcasing breathtaking moments captured through the lens',
              url: 'https://phweb.vercel.app/img/b.png',
              logo: IMAGE_PATH,
              image: IMAGE_PATH,
              serviceType: 'Photography Services',
              areaServed: 'Global',
            }),
          }}
        />

        {/* Service Worker for Image Caching */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.location.hostname !== 'localhost') {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw-images.js')
                    .then(function(reg) { console.log('Image SW registered'); })
                    .catch(function(err) { console.log('Image SW registration failed', err); });
                });
              }
            `
          }}
        />
      </head>
      <body className="font-sans" suppressHydrationWarning>
        <SmoothScrollProvider>
          {/* 👇 Custom Cursor Active Across All Pages */}
          <CustomCursor />

          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="min-h-screen">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </ThemeProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
