'use client';

import { useOCRStore } from '../store/ocrStore';

export default function OCRHistory() {
    const { records, clearRecords } = useOCRStore();

    if (!records.length) {
        return (
            <p className="text-sm text-neutral-500">
                No OCR history yet.
            </p>
        );
    }

    return (
        <section className="mt-10 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                    OCR History
                </h3>

                <button
                    onClick={clearRecords}
                    className="text-sm text-red-400 hover:underline"
                >
                    Clear All
                </button>
            </div>

            <ul className="space-y-3">
                {records.map((item) => (
                    <div key={item._id} className="card p-4 text-sm">
                        <div className="text-neutral-400 mb-1">
                            {new Date(item.createdAt).toLocaleString()}
                        </div>
                        <div className="line-clamp-3">{item.text}</div>
                    </div>
                ))}

            </ul>
        </section>
    );
}
