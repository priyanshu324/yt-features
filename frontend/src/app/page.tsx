import type { Metadata } from 'next';
import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Creator OCR – Creator Productivity Platform',
  description:
    'A creator productivity platform offering OCR, AI summarization, script generation, and editor tools.',
  keywords: [
    'OCR tool',
    'image to text',
    'PDF OCR',
    'creator tools',
    'content automation'
  ]
};
export default function HomePage() {
  return (
    <>
      <Header />

      <main className="section py-16 space-y-20">
        {/* INTRO */}
        <section className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Build faster. Create smarter.
          </h1>
          <p className="text-neutral-400 text-lg">
            Creator OCR is a modular productivity platform designed to eliminate
            repetitive content work, starting with powerful server-side OCR.
          </p>
        </section>

        {/* DETAILS */}
        <section className="max-w-4xl space-y-6">
          <h2 className="text-2xl font-semibold">
            Platform capabilities
          </h2>

          <ul className="space-y-3 text-neutral-300 list-disc pl-5">
            <li>Secure image & PDF text extraction</li>
            <li>Batch processing with progress feedback</li>
            <li>Multi-language OCR support</li>
            <li>Session-based OCR history</li>
            <li>AI-ready architecture</li>
          </ul>
        </section>

        {/* FEATURE CARDS */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">
            Features
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="OCR Text Extraction"
              description="Extract text from images and PDFs using server-side OCR."
              status="Live"
              href="/ocr"
            />

            <FeatureCard
              title="AI Summarization"
              description="Turn extracted text into concise summaries."
              status="Planned"
            />

            <FeatureCard
              title="Script Generation"
              description="Generate scripts for videos, reels, or posts."
              status="Planned"
            />

            <FeatureCard
              title="Editor Tools"
              description="Edit, refine, and organize extracted content."
              status="Planned"
            />

            <FeatureCard
              title="Cloud Storage"
              description="Save and manage your OCR results securely."
              status="Planned"
            />

            <FeatureCard
              title="Authentication"
              description="Access your workspace across devices."
              status="Live"
              href="/login"
            />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

function FeatureCard({
  title,
  description,
  status,
  href
}: {
  title: string;
  description: string;
  status: 'Live' | 'Planned';
  href?: string;
}) {
  const badgeStyle =
    status === 'Live'
      ? 'text-green-400'
      : 'text-neutral-500';

  const card = (
    <div className="card p-6 h-full flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold mb-2">
          {title}
        </h3>
        <p className="text-sm text-neutral-400">
          {description}
        </p>
      </div>

      <div className={`mt-4 text-sm font-medium ${badgeStyle}`}>
        {status}
      </div>
    </div>
  );

  return href ? (
    <Link href={href} className="transition hover:scale-[1.01]">
      {card}
    </Link>
  ) : (
    card
  );
}
