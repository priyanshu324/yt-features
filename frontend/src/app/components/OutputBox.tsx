'use client';

import { useState } from 'react';

interface OutputBoxProps {
    text: string;
}

export default function OutputBox({ text }: OutputBoxProps) {
    const [copied, setCopied] = useState(false);
    const hasText = text && text.trim().length > 0;

    const handleCopy = async () => {
        if (!hasText) return;

        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);

            // Reset feedback after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
            alert('Copy failed. Please try manually.');
        }
    };

    return (
        <section className="space-y-2">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-neutral-300">
                    Extracted Text
                </h3>

                <button
                    onClick={handleCopy}
                    disabled={!hasText}
                    className={`
                        text-xs px-3 py-1.5 rounded
                        transition
                        ${hasText
                            ? 'bg-neutral-800 hover:bg-neutral-700 text-neutral-100'
                            : 'bg-neutral-900 text-neutral-500 cursor-not-allowed'
                        }
                    `}
                >
                    {copied ? 'Copied ✓' : 'Copy'}
                </button>
            </div>

            {/* Output Area */}
            <div className="relative">
                <textarea
                    readOnly
                    value={text}
                    placeholder="Extracted text will appear here..."
                    className="
                        w-full min-h-55
                        p-4
                        rounded
                        bg-neutral-950
                        border border-neutral-800
                        text-sm text-neutral-200
                        resize-y
                        focus:outline-none
                    "
                />
            </div>
        </section>
    );
}
