import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="border-t border-neutral-800 bg-neutral-950">
            <div className="section py-8 flex flex-col sm:flex-row justify-between gap-4 text-sm text-neutral-400">
                <p>
                    © {new Date().getFullYear()} Creator OCR. All rights reserved.
                </p>

                <div className="flex gap-6">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/ocr">OCR</Link>
                    <Link href="/faq">FAQ</Link>
                    <Link href="/contact">Contact</Link>
                    <Link href="/login">Login</Link>
                </div>
            </div>
        </footer>
    );
}
