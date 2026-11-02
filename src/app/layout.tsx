import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LocalForge | Zero-Server Privacy-First Developer & Media Utilities',
  description: 'Convert, compress, merge, and format files 100% locally in your browser.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
