'use client';

import { useOCRStore } from '../store/ocrStore';

export default function UsageAnalytics() {
    const { records } = useOCRStore();

    const totalRuns = records.length;
    const totalCharacters = records.reduce(
        (sum, record) => sum + record.text.length,
        0
    );
    const averageCharacters =
        totalRuns > 0 ? Math.round(totalCharacters / totalRuns) : 0;

    const lastActivity =
        records.length > 0
            ? new Date(records[0].createdAt).toLocaleString()
            : 'No activity yet';

    return (
        <section className="mt-12">
            <h3 className="text-lg font-semibold mb-4">
                Usage Analytics (Session)
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="OCR Runs" value={totalRuns} />
                <StatCard label="Characters Extracted" value={totalCharacters} />
                <StatCard label="Avg. Characters / Run" value={averageCharacters} />
                <StatCard label="Last Activity" value={lastActivity} />
            </div>
        </section>
    );
}

function StatCard({
    label,
    value
}: {
    label: string;
    value: number | string;
}) {
    return (
        <div className="card p-4">
            <p className="text-sm text-neutral-400 mb-1">
                {label}
            </p>
            <p className="text-xl font-semibold text-neutral-100">
                {value}
            </p>
        </div>
    );
}
