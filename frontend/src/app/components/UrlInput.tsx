'use client';

interface UrlInputProps {
    value: string;
    onChange: (value: string) => void;
}

export default function UrlInput({ value, onChange }: UrlInputProps) {
    return (
        <input
            type="url"
            placeholder="Paste image URL"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded p-3 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
    );
}
