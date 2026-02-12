import Link from 'next/link';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    stat?: string;
    href?: string;
}

export default function FeatureCard({
    title,
    description,
    icon,
    stat,
    href
}: FeatureCardProps) {
    const content = (
        <div className="card p-6 h-full flex flex-col justify-between">
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div className="text-indigo-400">
                        {icon}
                    </div>
                    <h3 className="text-lg font-semibold">
                        {title}
                    </h3>
                </div>

                <p className="text-sm text-neutral-400 leading-relaxed">
                    {description}
                </p>
            </div>

            {stat && (
                <p className="mt-4 text-xs text-neutral-500">
                    {stat}
                </p>
            )}
        </div>
    );

    return href ? (
        <Link href={href} className="hover:scale-[1.01] transition">
            {content}
        </Link>
    ) : (
        content
    );
}
