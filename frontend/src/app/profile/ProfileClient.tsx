'use client';

import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../store/authStore';
import { useRouter } from 'next/navigation';

export default function ProfileClient() {
    const { user, logout, loading } = useAuth();
    const router = useRouter();

    // ✅ Redirect as a side effect, not during render
    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [loading, user, router]);

    if (loading || !user) {
        return null;
    }

    return (
        <>
            <Header />

            <main className="section flex justify-center py-20">
                <div className="card w-full max-w-md p-8">
                    <h1 className="text-2xl font-semibold mb-4">
                        Your Profile
                    </h1>

                    <div className="space-y-2 text-sm">
                        <p>
                            <strong>Name:</strong> {user.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {user.email}
                        </p>
                    </div>

                    <button
                        onClick={() => {
                            logout();
                            router.push('/');
                        }}
                        className="mt-6 w-full bg-red-600 py-3 rounded hover:bg-red-500 transition"
                    >
                        Logout
                    </button>
                </div>
            </main>

            <Footer />
        </>
    );
}
