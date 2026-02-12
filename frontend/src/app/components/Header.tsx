'use client'

import Link from 'next/link';
import { useAuth } from '../store/authStore';
import { ADMIN_EMAIL } from '../store/adminStore';

/* inside component */


export default function Header() {
    const { user } = useAuth();

    return (
        <header className="border-b border-neutral-800 bg-neutral-950">
            <div className="section flex h-16 items-center justify-between">
                <Link href="/" className="text-lg font-semibold">
                    Creator OCR
                </Link>

                <nav className="hidden md:flex gap-6 text-sm text-neutral-300">
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/ocr">OCR</Link>
                    <Link href="/faq">FAQ</Link>
                    <Link href="/contact">Contact</Link>

                    {user?.role === 'admin' && (
                        <Link href="/admin">Admin</Link>
                    )}
                </nav>

                {user ? (
                    <Link
                        href="/profile"
                        className="text-sm bg-neutral-800 px-4 py-2 rounded"
                    >
                        Profile
                    </Link>
                ) : (
                    <Link
                        href="/login"
                        className="text-sm bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-500"
                    >
                        Login
                    </Link>
                )}
            </div>
        </header>
    );
}
