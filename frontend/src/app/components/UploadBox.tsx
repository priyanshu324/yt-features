'use client';

interface UploadBoxProps {
    onSelect: (files: FileList) => void;
}

export default function UploadBox({ onSelect }: UploadBoxProps) {
    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files.length) {
            onSelect(e.dataTransfer.files);
        }
    };

    return (
        <label
            className="block card p-6 border-dashed cursor-pointer hover:border-neutral-700 transition"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
        >
            <input
                type="file"
                multiple
                accept="image/*,application/pdf"
                className="hidden"
                onChange={(e) => e.target.files && onSelect(e.target.files)}
            />

            <p className="text-center text-sm text-neutral-400">
                Drag & drop images or PDFs here, or click to upload
            </p>
        </label>
    );
}
