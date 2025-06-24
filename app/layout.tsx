import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import CustomCursor from '@/components/CustomCursor';

const IMAGE_PATH = '/img/b.png';

export const metadata: Metadata = {
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Theme and Tiles */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

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
      </head>
      <body className="font-sans">
        {/* 👇 Custom Cursor Active Across All Pages */}
        <CustomCursor />

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
