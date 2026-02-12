'use client';

interface OptionsPanelProps {
    language: string;
    setLanguage: (lang: string) => void;
}

export default function OptionsPanel({
    language,
    setLanguage
}: OptionsPanelProps) {
    return (
        <details className="mt-4 card p-4">
            <summary className="cursor-pointer font-medium text-neutral-200">
                OCR Options
            </summary>

            <div className="mt-4">
                <label className="block text-sm text-neutral-400 mb-1">
                    Language
                </label>

                <select
                    className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="auto">Auto Detect</option>
                    <option value="eng">English</option>
                    <option value="hin">Hindi</option>
                </select>
            </div>
        </details>
    );
}
