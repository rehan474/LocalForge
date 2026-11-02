import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'LocalForge | Zero-Server Privacy-First Developer & Media Utilities',
  description:
    'Convert, compress, merge, and format sensitive files 100% locally in your browser using Web Workers & WebAssembly. Zero cloud uploads.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  const enableAds = process.env.NEXT_PUBLIC_ENABLE_ADS === 'true';

  return (
    <html lang="en" className="dark">
      <head>
        {enableAds && publisherId && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
