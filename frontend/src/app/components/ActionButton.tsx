'use client';

interface ActionButtonProps {
    onClick: () => void;
    loading: boolean;
    disabled?: boolean;
}

export default function ActionButton({
    onClick,
    loading,
    disabled
}: ActionButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={loading || disabled}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
            {loading ? 'Processing…' : 'Extract Text'}
        </button>
    );
}
