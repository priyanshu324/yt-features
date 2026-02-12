interface BatchInfoProps {
    fileCount: number;
}

export default function BatchInfo({ fileCount }: BatchInfoProps) {
    return (
        <p className="text-sm text-neutral-400">
            {fileCount} file{fileCount > 1 ? 's' : ''} selected for processing
        </p>
    );
}
