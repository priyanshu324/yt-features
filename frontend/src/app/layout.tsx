import './globals.css';
import { AdminProvider } from './store/adminStore';
import { AuthProvider } from './store/authStore';
import { OCRStoreProvider } from './store/ocrStore';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),

  title: {
    default: 'Creator OCR – Creator Productivity Platform',
    template: '%s | Creator OCR'
  },

  description:
    'A creator productivity platform offering OCR, AI summarization, script generation, and content tools.',

  openGraph: {
    title: 'Creator OCR',
    description:
      'Extract text from images and PDFs, then turn it into meaningful content.',
    url: 'http://localhost:3000',
    siteName: 'Creator OCR',
    images: [
      {
        url: '/og-ocr.png',
        width: 1200,
        height: 630,
        alt: 'Creator OCR – Productivity Platform'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Creator OCR',
    description:
      'Extract text from images and PDFs with a creator-first productivity platform.',
    images: ['/og-ocr.png']
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
  }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        <AuthProvider>
          <OCRStoreProvider>
            <AdminProvider>
              {children}
            </AdminProvider>
        </OCRStoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
