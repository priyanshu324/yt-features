'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactClient() {
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            // Backend integration will be added later
            // Simulated request
            await new Promise((resolve) => setTimeout(resolve, 1200));

            setStatus('success');
        } catch {
            setErrorMessage('Something went wrong. Please try again.');
            setStatus('error');
        }
    };

    return (
        <>
            <Header />

            <main className="section flex justify-center py-20">
                <div className="card w-full max-w-md p-8">
                    <h1 className="text-2xl font-semibold mb-2">
                        Contact us
                    </h1>

                    <p className="text-sm text-neutral-400 mb-6">
                        Have questions, feedback, or ideas? We’d love to hear from you.
                    </p>

                    {/* SUCCESS STATE */}
                    {status === 'success' && (
                        <div className="mb-6 rounded border border-green-800 bg-green-950 p-4 text-sm text-green-300">
                            Your message has been sent successfully. We’ll get back to you soon.
                        </div>
                    )}

                    {/* ERROR STATE */}
                    {status === 'error' && (
                        <div className="mb-6 rounded border border-red-800 bg-red-950 p-4 text-sm text-red-300">
                            {errorMessage}
                        </div>
                    )}

                    {/* FORM */}
                    {status !== 'success' && (
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Your name"
                                required
                                className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded"
                            />

                            <input
                                type="email"
                                placeholder="Your email"
                                required
                                className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded"
                            />

                            <textarea
                                placeholder="Your message"
                                rows={5}
                                required
                                className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded resize-none"
                            />

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-indigo-600 py-3 rounded hover:bg-indigo-500 transition disabled:opacity-50"
                            >
                                {status === 'loading' ? 'Sending…' : 'Send message'}
                            </button>
                        </form>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}
