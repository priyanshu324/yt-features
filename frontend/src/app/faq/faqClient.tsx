import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
    title: 'FAQ – Creator OCR',
    description:
        'Frequently asked questions about Creator OCR, OCR processing, privacy, and future features.'
};

export default function FAQPage() {
    return (
        <>
            <Header />

            <main className="section py-16 max-w-4xl space-y-12">
                <header>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-neutral-400">
                        Answers to common questions about Creator OCR and how it works.
                    </p>
                </header>

                <section className="space-y-6">
                    <FAQItem
                        question="What is Creator OCR?"
                        answer="Creator OCR is a creator-focused productivity platform that helps you extract text from images and PDFs securely using server-side OCR."
                    />

                    <FAQItem
                        question="Does Creator OCR store my files?"
                        answer="No. Files are processed temporarily on the server for OCR and are not permanently stored on the client. Long-term storage will be optional in future versions."
                    />

                    <FAQItem
                        question="What file types are supported?"
                        answer="Currently, Creator OCR supports image files (JPG, PNG, WebP) and PDF documents, including batch uploads."
                    />

                    <FAQItem
                        question="Is multi-language OCR supported?"
                        answer="Yes. Creator OCR supports multiple languages, including English and Hindi, with the ability to add more languages in future updates."
                    />

                    <FAQItem
                        question="Is this an AI-powered tool?"
                        answer="The current version focuses on OCR only. AI features such as summarization, script generation, and editor tools are planned and will be added without redesigning the system."
                    />

                    <FAQItem
                        question="Do I need an account to use OCR?"
                        answer="At the moment, basic OCR functionality is available without authentication. Accounts will be required for cloud storage and advanced features in future versions."
                    />

                    <FAQItem
                        question="How is Creator OCR different from other OCR tools?"
                        answer="Creator OCR is built as a workflow-first platform, not just an OCR utility. It is designed to scale into a complete creator productivity system."
                    />
                </section>
            </main>

            <Footer />
        </>
    );
}

function FAQItem({
    question,
    answer
}: {
    question: string;
    answer: string;
}) {
    return (
        <div className="card p-6">
            <h3 className="text-lg font-semibold mb-2">
                {question}
            </h3>
            <p className="text-neutral-400">
                {answer}
            </p>
        </div>
    );
}
