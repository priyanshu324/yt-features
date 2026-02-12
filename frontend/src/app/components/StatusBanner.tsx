interface StatusBannerProps {
    message: string;
    type: 'error' | 'info';
}

export default function StatusBanner({
    message,
    type
}: StatusBannerProps) {
    const styles =
        type === 'error'
            ? 'bg-red-950 border-red-800 text-red-300'
            : 'bg-neutral-900 border-neutral-800 text-neutral-300';

    return (
        <div
            className={`border rounded p-3 text-sm ${styles}`}
            role="alert"
        >
            {message}
        </div>
    );
}
