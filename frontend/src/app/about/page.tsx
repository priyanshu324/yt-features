import type { Metadata } from 'next';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
    title: 'About – Creator OCR',
    description:
        'Learn about the founder, platform features, and long-term vision behind Creator OCR.'
};

export default function AboutPage() {
    return (
        <>
            <Header />

            <main className="section py-16 space-y-24 max-w-4xl">
                {/* SECTION 1: ABOUT YOU */}
                <section>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                        About the Founder
                    </h1>

                    <p className="text-neutral-400 text-lg leading-relaxed">
                        Creator OCR was founded by a developer and content creator who
                        experienced first-hand how repetitive text extraction slows down
                        creative workflows.
                    </p>

                    <p className="text-neutral-400 mt-4 leading-relaxed">
                        Instead of relying on disconnected tools and manual steps, the goal
                        was to build a single, scalable platform that removes friction from
                        everyday creator tasks.
                    </p>
                </section>

                {/* SECTION 2: FEATURES */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6">
                        Platform Capabilities
                    </h2>

                    <ul className="space-y-4 text-neutral-300">
                        <li>
                            <strong>OCR for Images & PDFs:</strong> Server-side text extraction
                            with batch processing support.
                        </li>
                        <li>
                            <strong>Multi-language Support:</strong> Designed to scale across
                            languages and regions.
                        </li>
                        <li>
                            <strong>Session-Based History:</strong> Track extracted content
                            during active sessions.
                        </li>
                        <li>
                            <strong>Future-Ready Architecture:</strong> Built to integrate AI
                            features without rewriting the core.
                        </li>
                    </ul>
                </section>

                {/* SECTION 3: FOUNDER TIMELINE / ROADMAP */}
                <section>
                    <h2 className="text-2xl font-semibold mb-8">
                        Founder Timeline & Roadmap
                    </h2>

                    <div className="space-y-6 border-l border-neutral-800 pl-6">
                        <div>
                            <h3 className="font-semibold">Phase 1 — Problem Discovery</h3>
                            <p className="text-neutral-400 text-sm mt-1">
                                Identified repetitive OCR needs during real content creation
                                workflows.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">Phase 2 — OCR Core Development</h3>
                            <p className="text-neutral-400 text-sm mt-1">
                                Built a secure, server-side OCR engine with batch support and
                                multi-language capability.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">Phase 3 — Productivity Expansion</h3>
                            <p className="text-neutral-400 text-sm mt-1">
                                Planned AI summarization, script generation, and editor tools to
                                extend creator workflows.
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold">Phase 4 — Platform Growth</h3>
                            <p className="text-neutral-400 text-sm mt-1">
                                Cloud storage, authentication, and collaboration features for
                                long-term scalability.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: COMPANY */}
                <section>
                    <h2 className="text-2xl font-semibold mb-6">
                        About Creator OCR
                    </h2>

                    <p className="text-neutral-400 leading-relaxed">
                        Creator OCR is a creator-first productivity company focused on
                        eliminating repetitive tasks through intelligent automation.
                    </p>

                    <p className="text-neutral-400 mt-4 leading-relaxed">
                        The company is built on principles of performance, privacy, and
                        long-term maintainability — ensuring creators can rely on the
                        platform as it evolves.
                    </p>
                </section>
            </main>

            <Footer />
        </>
    );
}
